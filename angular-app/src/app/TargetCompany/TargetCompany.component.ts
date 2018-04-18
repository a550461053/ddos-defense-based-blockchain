import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TargetCompanyService } from './TargetCompany.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-TargetCompany',
	templateUrl: './TargetCompany.component.html',
	styleUrls: ['./TargetCompany.component.css'],
  	providers: [TargetCompanyService]
})
export class TargetCompanyComponent {

  myForm: FormGroup;

  private allTargetCompany;
  private TargetCompany;
  private currentId;
  private errorMessage;

  private coins;
  private energy;

      utilityID = new FormControl("", Validators.required);
      name = new FormControl("", Validators.required);
      targetIP = new FormControl("", Validators.required);

      coinsValue = new FormControl("", Validators.required);
      energyValue = new FormControl("", Validators.required);
      energytargetIP = new FormControl("", Validators.required);

  constructor(private serviceTargetCompany:TargetCompanyService, fb: FormBuilder) {
    this.myForm = fb.group({

          utilityID:this.utilityID,
          name:this.name,
					targetIP:this.targetIP,

          coinsValue:this.coinsValue,
          energyValue:this.energyValue,
          energytargetIP:this.energytargetIP,

    });
  };

  ngOnInit(): void {
    this.loadAll();
  }



  resetForm(): void{
    this.myForm.setValue({
          "utilityID":null,
          "name":null,
					"targetIP":null,

          "coinsValue":null,
          "energyValue":null,
          "energytargetIP":null,
      });
  }

  //allow update name of Utility Company
  updateTargetCompany(form: any): Promise<any> {

    console.log("update check");
    this.TargetCompany = {
      $class: "org.decentralized.energy.network.TargetCompany",
            "name":this.name.value,

             "coins": "resource:org.decentralized.energy.network.Coins#CO_" + form.get("utilityID").value,
             "energy": "resource:org.decentralized.energy.network.Energy#EN_" + form.get("utilityID").value
    };
    console.log(this.TargetCompany);
    return this.serviceTargetCompany.updateTargetCompany(form.get("utilityID").value,this.TargetCompany)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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

  //delete Utility Company and the coins and energy assets associated to it
  deleteTargetCompany(): Promise<any> {

    return this.serviceTargetCompany.deleteTargetCompany(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
      var coinsID = "CO_"+this.currentId;
      this.serviceTargetCompany.deleteCoins(coinsID)
      .toPromise()
      .then(() => {
          this.serviceTargetCompany.deleteEnergy("EN_"+this.currentId)
          .toPromise()
          .then(() => {
              console.log("Deleted")
          });
      });
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceTargetCompany.getTargetCompany(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "utilityID":null,
            "name":null,
						"targetIP":null,

            "coinsValue":null,
            "energyValue":null,
            "energytargetIP":null
      };

        if(result.utilityID){
          formObject.utilityID = result.utilityID;
        }else{
          formObject.utilityID = null;
        }

        if(result.name){
          formObject.name = result.name;
        }else{
          formObject.name = null;
        }

				if(result.targetIP){
					formObject.targetIP = result.targetIP;
				}else{
					formObject.targetIP = null;
				}
      this.myForm.setValue(formObject);

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


  loadAll_OnlyTargetCompany(): Promise<any> {
    let tempList = [];
    return this.serviceTargetCompany.getAllTargetCompany()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(TargetCompany => {
        tempList.push(TargetCompany);
      });
      this.allTargetCompany = tempList;
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

  //load all Utility Companies and the coins and energy assets associated to it
  loadAll(): Promise<any>  {

    //retrieve all TargetCompanys
    let TargetCompanyList = [];
    return this.serviceTargetCompany.getAllTargetCompany()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(TargetCompany => {
        TargetCompanyList.push(TargetCompany);
      });
    })
    .then(() => {

      for (let TargetCompany of TargetCompanyList) {
        console.log("in for loop")
        console.log(TargetCompany.coins)

        var splitted_coinsID = TargetCompany.coins.split("#", 2);
        var coinsID = String(splitted_coinsID[1]);
        this.serviceTargetCompany.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          if(result.value){
            TargetCompany.coinsValue = result.value;
          }
        });

        // var splitted_energyID = TargetCompany.energy.split("#", 2);
        // var energyID = String(splitted_energyID[1]);
        // console.log(energyID);
        // this.serviceTargetCompany.getEnergy(energyID)
        // .toPromise()
        // .then((result) => {
        //   this.errorMessage = null;
        //   if(result.value){
        //     TargetCompany.energyValue = result.value;
        //   }
        //   if(result.targetIP){
        //     TargetCompany.energytargetIP = result.targetIP;
        //   }
        // });

      }
      this.allTargetCompany = TargetCompanyList;
    });

  }

  //add Utility Company participant
  addTargetCompany(form: any): Promise<any> {

    return this.createAssetsUtility()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
            "utilityID":null,
            "name":null,
						"targetIP":null,
            "coinsValue":null,
            "energyValue":null,
            "energytargetIP":null
        });
      })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '500 - Internal Server Error') {
          this.errorMessage = "Input error";
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  //create coins and energy assets associated with the Resident, followed by the Resident
  createAssetsUtility(): Promise<any> {

    this.coins = {
      $class: "org.decentralized.energy.network.Coins",
          "coinsID":"CO_" + this.utilityID.value,
          "value":this.coinsValue.value,
          "ownerID":this.utilityID.value,
          "ownerEntity":'TargetCompany'
    };

    this.energy = {
      $class: "org.decentralized.energy.network.Energy",
          "energyID":"EN_" + this.utilityID.value,
          "targetIP":this.energytargetIP.value,
          "value":this.energyValue.value,
          "ownerID":this.utilityID.value,
          "ownerEntity":'TargetCompany'
    };

    this.TargetCompany = {
      $class: "org.decentralized.energy.network.TargetCompany",
          "utilityID":this.utilityID.value,
          "name":this.name.value,
					"targetIP":this.targetIP.value,

          "coins":"CO_" + this.utilityID.value,
          "energy":"EN_" + this.utilityID.value,
    };

    return this.serviceTargetCompany.addCoins(this.coins)
    .toPromise()
		.then(() => {
      // console.log("create energy");
			// this.serviceTargetCompany.addEnergy(this.energy)
      // .toPromise()
      // .then(() => {
        console.log("create TargetCompanys");
        this.serviceTargetCompany.addTargetCompany(this.TargetCompany)
        .toPromise()
        .then(() => {
          console.log("created assets");
          location.reload();
        })
		  // })
		})

  }


}
