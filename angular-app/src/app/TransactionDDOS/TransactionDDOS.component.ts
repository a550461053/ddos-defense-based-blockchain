import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TransactionDDOSService } from './TransactionDDOS.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-TransactionDDOS',
	templateUrl: './TransactionDDOS.component.html',
	styleUrls: ['./TransactionDDOS.component.css'],
  	providers: [TransactionDDOSService]
})
export class TransactionDDOSComponent {

  //defined rate
  private utilityDDoSPerEnergy = 1;
  private utilityEnergyPerDDoS = (1 / this.utilityDDoSPerEnergy).toFixed(3);
  private ddosExchanged;

  private energyValue;


  myForm: FormGroup;
  private errorMessage;
  private transactionFrom;

  private allResidents;
  private allUtilityCompanys;


  private resident;
  private utiltyCompany;

	private allEnergy;
	private allDDoS;

  private energyToDDoSObj;

  private transactionID;

  private energyReceiverAsset;
  private energyInputAsset;
  private ddosCreditAsset;
  private ddosDebitAsset;

    formResidentID = new FormControl("", Validators.required);
	  formUtilityID = new FormControl("", Validators.required);
    action = new FormControl("", Validators.required);
	  value = new FormControl("", Validators.required);

  constructor(private serviceTransaction:TransactionDDOSService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formResidentID:this.formResidentID,
		  formUtilityID:this.formUtilityID,
      action:this.action,
      value:this.value,

    });

  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllResidents()
    .then(() => {
            this.loadAllUtilityCompanys()
						.then(() => {
										this.loadAllEnergy();
						});
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
	//get all Energy
  loadAllEnergy(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllEnergy()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(energy => {
        tempList.push(energy);
      });
      this.allEnergy = tempList;
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
// // sleep
// 	sleep(d){
// 		for (var t=Date.now();Date.new()-t<=d;);
// 	}

  //execute transaction
  execute(form: any): Promise<any> {

    console.log(this.allResidents)
    console.log(this.allUtilityCompanys)
		console.log(this.allEnergy)

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
        this.utiltyCompany = utilityCompany;
      }
    }

    console.log('Action: ' + this.action.value)

    //depending on action, identify energy and ddos assets to be debited/credited
    // if(this.action.value == 'buyEnergy') {
		//
    //     this.energyValue = this.value.value;
		//
    //     this.energyReceiverAsset = this.resident.energy;
    //     this.energyInputAsset = this.utiltyCompany.energy;
    //     this.ddosCreditAsset = this.utiltyCompany.ddos;
    //     this.ddosDebitAsset = this.resident.ddos;
    // }
    // else if(this.action.value == 'sellEnergy') {
		//
    //     this.energyValue = this.value.value;
		//
    //     this.energyReceiverAsset = this.utiltyCompany.energy;
    //     this.energyInputAsset = this.resident.energy;
    //     this.ddosCreditAsset = this.resident.ddos;
    //     this.ddosDebitAsset = this.utiltyCompany.ddos;
    // }



		// wirte logic here
    // 1. new DDoS
		let energy_list = [];
		for (let item_energy of this.allEnergy) {
        console.log(item_energy.energyID);
				energy_list.push(item_energy);
      // if(utilityCompany.utilityID == this.formUtilityID.value){
      //   this.utiltyCompany = utilityCompany;
      // }
    }

    // let energy_list = this.allEnergy;

    let energy_object_dict = {};
    for (var index=0; index < energy_list.length; index++){
        if (!(energy_list[index].units in energy_object_dict)){
          energy_object_dict[energy_list[index].units] = 1;
        }else{
          energy_object_dict[energy_list[index].units] += 1;
        }
    }

		// 找出所有满足要求的目标ip
		let ip_list = [];
    for (var item_units in energy_object_dict){
      if (energy_object_dict[item_units] > 1){
        console.log(item_units + ":" + energy_object_dict[item_units]);
				ip_list.push(item_units);
      }
    }
		// 找出所有满足要求的目标ip对应的energy条目 -> 用来执行交易，也就是变换该energy的units
		let energyInc_list = []; // 增加units为1的energy
		let energyDec_list = []; // 减少units为0的energy
		for (let item_energy of energy_list){  // var in就报错：item_enrery是string型，不含units属性
				if (ip_list.indexOf(item_energy.units) != -1){  // 不能用in，in只能判断key是否存在。
						energyInc_list.push(item_energy);
				} else {
						energyDec_list.push(item_energy);
				}
		}
		console.log(ip_list);
		// if ("IP" == ip_list[0]){
		// 	console.log('IP == ip_list');
		// }
		// if ("IP" in ip_list){
		// 	console.log('IP in ip_list');
		// }
		console.log(energyInc_list);
		console.log(energyDec_list);
    alert('EnergyToDDoS finished!');
    console.log('EnergyToDDoS hhh!');

    // 2. change Energy
    // for (var i=0; i < energy_list.lenght; i++){
    //     if (energy_list[i].ddosDec.value in energy_object_dict){
    //       getAssetRegistry('org.decentralized.energy.network.Energy')
    //       .then(function (assetRegistry) {
    //           return assetRegistry.updateAll([UpdateValues.cashInc,UpdateValues.cashDec]);
    //       });
    //     }
    // }

		// 固定值
		this.energyValue = this.value.value;

		this.energyReceiverAsset = this.resident.energy;
		this.energyInputAsset = this.utiltyCompany.energy;
		this.ddosCreditAsset = this.energyReceiverAsset;//this.utiltyCompany.ddos;
		this.ddosDebitAsset = this.energyInputAsset;//this.resident.ddos;

    console.log('Input Energy ID ' + this.energyInputAsset);
    console.log('Input DDoS ID ' + this.ddosCreditAsset);
    console.log('Output Energy ID ' + this.energyReceiverAsset);
    console.log('Output DDoS ID ' + this.ddosDebitAsset);

    //identify energy and ddos id which will be debited
    var splitted_energyID = this.energyInputAsset.split("#", 2);
    var energyID = String(splitted_energyID[1]);

    // var splitted_ddosID = this.ddosDebitAsset.split("#", 2);
    // var ddosID = String(splitted_ddosID[1]);

    this.ddosExchanged = this.utilityDDoSPerEnergy * this.energyValue;

		///////////////////////////////		1   	/////////
    // 遍历两种类型的energy list,分配不同的交易对象Obj
		for (let item of energy_list){
			//transaction objects
			this.energyToDDoSObj = {
				$class: "org.decentralized.energy.network.EnergyToDDoS",
				"energyRate": this.utilityDDoSPerEnergy,
				"energyValue": this.energyValue,
				"ddosInc": 'resource:org.decentralized.energy.network.DDoS#21', //this.ddosCreditAsset,
				"ddosDec": 'resource:org.decentralized.energy.network.DDoS#21', //this.ddosDebitAsset,
				"energyInc": 'resource:org.decentralized.energy.network.Energy#EN_1', //this.energyReceiverAsset,
				"energyDec": 'resource:org.decentralized.energy.network.Energy#EN_2', //this.energyInputAsset
			};
			// console.log('start');
			// console.log('start');
			setTimeout(console.log('start'), 5000);


			// sleep(5000);
			// await sleep(3000);
			console.log('end');
			let item_process = "resource:" + item['$class'] + '#' + item['energyID'];
			if (energyInc_list.indexOf(item) != -1){
					this.energyToDDoSObj["energyInc"] = item_process;
			}
			if (energyDec_list.indexOf(item) != -1){
					this.energyToDDoSObj["energyDec"] = item_process;
			}

			//check ddos and energy assets for enough funds before creating transaction
			// return this.serviceTransaction.getEnergy(energyID)
			// .toPromise()
			// .then((result) => {
			//   this.errorMessage = null;
			//   if(result.value) {
			//     if ((result.value - this.energyValue) < 0 ){
			//       this.errorMessage = "Insufficient energy in producer account";
			//       return false;
			//     }
			//     return true;
			//   }
			// })
			// .then((checkInputEnergy) => {
				// console.log('checkEnergy: ' + checkInputEnergy)
				// if(checkInputEnergy)
				// {
				//   this.serviceTransaction.getDDoS(ddosID)
				//   .toPromise()
				//   .then((result) => {
				//     this.errorMessage = null;
				//     if(result.value) {
				//       if ((result.value - this.ddosExchanged) < 0 ){
				//
				//         this.errorMessage = "Insufficient ddos in consumer account";
				//         return false;
				//       }
				//       return true;
				//     }
				//   })
				//   .then((checkOutputDDoS) => {
				//     console.log('checkOutputDDoS: ' + checkOutputDDoS)
						// if(checkOutputDDoS)
						// if (1)
						// {

							 this.serviceTransaction.energyToDDoS(this.energyToDDoSObj)
							.toPromise()
							.then((result) => {
								this.errorMessage = null;
								this.transactionID = result.transactionId;
								console.log(result);
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
							}).then(() => {
								this.transactionFrom = false;
							});
						// }

				//   });
				// }
			// });
		}

		return ;
  }
}
