import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { DistributeCoinsService } from './DistributeCoins.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-DistributeCoins',
	templateUrl: './DistributeCoins.component.html',
	styleUrls: ['./DistributeCoins.component.css'],
  	providers: [DistributeCoinsService]
})
export class DistributeCoinsComponent {

  //defined rate
  private bankCoinsPerCash = 10;
  private bankCashPerCoins = (1 / this.bankCoinsPerCash).toFixed(3);
  private coinsExchanged;
  private cashValue;

  myForm: FormGroup;
  private errorMessage;
  private transactionFrom;

  private allResidents;
  private allUtilityCompanys;

  private resident;
  private utilityCompany;

  private DistributeCoinsObj;
  private transactionID;

  private cashCreditAsset;
  private cashDebitAsset;
  private coinsCreditAsset;
  private coinsDebitAsset;

	private targetCompany;

    formResidentID = new FormControl("", Validators.required);
	  formUtilityID = new FormControl("", Validators.required);

  constructor(private serviceTransaction:DistributeCoinsService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formResidentID:this.formResidentID,
		  formUtilityID:this.formUtilityID,

    });
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllResidents()
    .then(() => {
            this.loadAllUtilityCompanys();
    });
  }

  //get all Residents
  loadAllResidents(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllResidents()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(resident => {
        tempList.push(resident);
      });
      this.allResidents = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  //get all Utility Companies
  loadAllUtilityCompanys(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllUtilityCompanys()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(utilityCompany => {
        tempList.push(utilityCompany);
      });
      this.allUtilityCompanys = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  //execute transaction
  execute(form: any): Promise<any> {

    console.log(this.allResidents);
    console.log(this.allUtilityCompanys);

    //get resident
    for (let resident of this.allResidents) {
      console.log(resident.residentID);
      if(resident.residentID == this.formResidentID.value){
        this.resident = resident;
      }
    }

    //get utility company
    for (let utilityCompany of this.allUtilityCompanys) {
        console.log(utilityCompany.utilityID);
      if(utilityCompany.utilityID == this.formUtilityID.value){
        this.utilityCompany = utilityCompany;
      }
    }

    this.coinsCreditAsset = this.resident.coins;
    this.coinsDebitAsset = this.utilityCompany.coins;
    this.targetCompany = this.utilityCompany;

    console.log('Coins Credit Asset: ' + this.coinsCreditAsset);
    console.log('Coins Debit Asset: ' + this.coinsDebitAsset);
		console.log('target company: ' + this.targetCompany);
    //identify  coins id which will be debited

    var splitted_coinsID = this.coinsDebitAsset.split("#", 2);  // 2表示返回数组的最大长度
    var coinsID = String(splitted_coinsID[1]); // CO_12

    this.coinsExchanged = 1;

    //transaction object
    this.DistributeCoinsObj = {
      $class: "org.decentralized.energy.network.DistributeCoins",

      "coinsInc": this.coinsCreditAsset,
      "coinsDec": this.coinsDebitAsset,
			"targetCompany": this.targetCompany
    };

    //chech coins and cash assets for enough funds before creating transaction
    return this.serviceTransaction.getCoins(coinsID) // Cash没有，targetCompany只存在coin
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      if(result.value) {
        if ((result.value - this.coinsExchanged) < 0 ){
          this.errorMessage = "Insufficient Cash!";
          return false;
        }
        return true;
      }
    })
    .then((checkCash) => {
      console.log('check cash: ' + checkCash)
      if(checkCash)
      {
        this.serviceTransaction.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          if(result.value) {
            if ((result.value - this.coinsExchanged) < 0 ){
              this.errorMessage = "Insufficient Coins!";
              return false;
            }
            return true;
          }
        })
        .then((checkCoins) => {
          console.log('check coins: ' + checkCoins)
          if(checkCoins)
          {
            this.serviceTransaction.DistributeCoins(this.DistributeCoinsObj)
            .toPromise()
            .then((result) => {
              this.errorMessage = null;
              this.transactionID = result.transactionId;
              console.log(result)
            })
            .catch((error) => {
                if(error == 'Server error'){
                    this.errorMessage = "Could not connect to REST server. Please check your configuration details";
                }
                else if(error == '404 - Not Found'){
                this.errorMessage = "404 - Could not find API route. Please check your available APIs."
                }
                else{
                    this.errorMessage = error;
                }
            })
            .then(() => {
              this.transactionFrom = false;
            });
          }
        });
      }
    });
  }

}
