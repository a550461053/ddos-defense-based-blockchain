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
  private allTargetCompany;


  private resident;
  private utiltyCompany;

	private allEnergy;
	private allDDoS;
	private ddos;

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
            this.loadAllTargetCompany()
						.then(() => {
										this.loadAllEnergy()
													.then(() => {
																this.loadAllDDoS();
													});
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
  loadAllTargetCompany(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllTargetCompany()
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

	//get all DDoS
	loadAllDDoS(): Promise<any> {
		let tempList = [];
		return this.serviceTransaction.getAllDDoS()
		.toPromise()
		.then((result) => {
			this.errorMessage = null;
			result.forEach(energy => {
				tempList.push(energy);
			});
			this.allDDoS = tempList;
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
// execute transaction
async execute(form: any): Promise<any> {

	// console.log(this.allResidents)
	// console.log(this.allTargetCompany)
	// console.log(this.allEnergy)

	//	1. get resident
	for (let resident of this.allResidents) {
		console.log(resident.residentID);
		if(resident.residentID == this.formResidentID.value){
			this.resident = resident;
		}
	}

	//get utility company
	for (let TargetCompany of this.allTargetCompany) {
			console.log(TargetCompany.utilityID);

		if(TargetCompany.utilityID == this.formUtilityID.value){
			this.utiltyCompany = TargetCompany;
		}
	}

	// console.log('Action: ' + this.action.value)

	// 2. get all energy
	let energy_list = [];
	for (let item_energy of this.allEnergy) {
			console.log(item_energy.energyID);
			energy_list.push(item_energy);
	}
	// let energy_list = this.allEnergy;

	// 3. counts of each kind of targetIP
	// 分别记录 [出现相同targetIP的次数，第一次出现的时间，最新一次出现的时间]
	let energy_object_dict = {};
	for (var index=0; index < energy_list.length; index++){
			if (!(energy_list[index].targetIP in energy_object_dict)){
				// 记录[出现相同targetIP的次数，第一次出现的时间，最新一次出现的时间]
				energy_object_dict[energy_list[index].targetIP] = [1, energy_list[index].value, energy_list[index].value];
			}else{
				// 更新记录[出现相同targetIP的次数 + 1，第一次出现的时间，最新一次出现的时间]
				energy_object_dict[energy_list[index].targetIP][0] += 1;
				energy_object_dict[energy_list[index].targetIP][2] = energy_list[index].value;
			}
	}
	console.log('energy_object_dict:');
	console.log(energy_object_dict);
	// 4. 找出所有满足要求的目标ip -> 发送的当前到所有的energy的速率的阈值判断
	let ip_list = [];
	let up_vecity = 0.000001; // 1s大约对应时间戳1000
	// 记录最初的时间
	for (var item_targetIP in energy_object_dict){
			let time = energy_object_dict[item_targetIP][2] - energy_object_dict[item_targetIP][1];
			console.log(time);
			if (energy_object_dict[item_targetIP][0] > 1){
					if (energy_object_dict[item_targetIP][0] / time > up_vecity){
						console.log(item_targetIP + ":" + energy_object_dict[item_targetIP]);
						ip_list.push(item_targetIP);
					}
			}
	}

	// 5. 找出所有满足要求的目标ip对应的energy条目 -> 用来执行交易，也就是变换该energy的targetIP
	let energyInc_list = []; // 增加 flag 为1的energy —— 对应智能合约就是改变flag
	let energyDec_list = []; // 减少 flag 为0的energy —— 对应智能合约就是不变
	for (let item_energy of energy_list){  // var in就报错：item_enrery是string型，不含targetIP属性
			if (ip_list.indexOf(item_energy.targetIP) != -1){  // 不能用in，in只能判断key是否存在。
					energyInc_list.push(item_energy);
			} else {
					energyDec_list.push(item_energy);
			}
	}
	console.log('ip_list:');
	console.log(ip_list);
	// if ("IP" == ip_list[0]){
	// 	console.log('IP == ip_list');
	// }
	// if ("IP" in ip_list){
	// 	console.log('IP in ip_list');
	// }
	console.log(energyInc_list);
	console.log(energyDec_list);

	// 调试时候，输入暂时固定
	this.energyValue = this.value.value;

	this.energyReceiverAsset = this.resident.energy;
	// this.energyInputAsset = this.utiltyCompany.energy;
	// this.ddosCreditAsset = this.energyReceiverAsset;//this.utiltyCompany.ddos;
	// this.ddosDebitAsset = this.energyInputAsset;//this.resident.ddos;

	// console.log('Input Energy ID ' + this.energyInputAsset);
	// console.log('Input DDoS ID ' + this.ddosCreditAsset);
	console.log('Output Energy ID ' + this.energyReceiverAsset);
	// console.log('Output DDoS ID ' + this.ddosDebitAsset);

	//identify energy and ddos id which will be debited
	// var splitted_energyID = this.energyInputAsset.split("#", 2);
	// var energyID = String(splitted_energyID[1]);


	// 保存返回结果
	let transactionID_list = [];

	// 6. 分别遍历两种类型的energy list,分配不同的交易对象Obj

	for (let item of energyInc_list){ // energy_list){
		//transaction objects
		this.energyToDDoSObj = {
			$class: "org.decentralized.energy.network.EnergyToDDoS",
			// "energyRate": this.utilityDDoSPerEnergy,
			// "energyValue": this.energyValue,
			// "ddosInc": 'resource:org.decentralized.energy.network.DDoS#21', //this.ddosCreditAsset,
			// "ddosDec": 'resource:org.decentralized.energy.network.DDoS#21', //this.ddosDebitAsset,
			"energyInc": this.energyReceiverAsset
			// "energyDec": 'resource:org.decentralized.energy.network.Energy#EN_2', //this.energyInputAsset
		};

		let item_process = "resource:" + item['$class'] + '#' + item['energyID'];
		if (energyInc_list.indexOf(item) != -1){
				this.energyToDDoSObj["energyInc"] = item_process;
		}
		// if (energyDec_list.indexOf(item) != -1){
		// 		this.energyToDDoSObj["energyDec"] = item_process;
		// }

		// !!! 输入的energyInc为resident，也就是提交者
		let resident_precess = "resource:" + this.resident['$class'] + '#' + this.resident['residentID'];
		this.energyToDDoSObj["energyInc"] = resident_precess;
		// 7. 具体的执行每次交易
		await this.serviceTransaction.energyToDDoS(this.energyToDDoSObj) //this.energyToDDoSObj
	 .toPromise()
	 .then((result) => {
		 this.errorMessage = null;
		 transactionID_list.push(result.transactionId);
		 this.transactionID = transactionID_list;
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

 };
}

//   //execute transaction
//    execute(form: any): Promise<any> {
//
//     // console.log(this.allResidents)
//     // console.log(this.allTargetCompany)
// 		// console.log(this.allEnergy)
//
//     //	1. get resident
//     for (let resident of this.allResidents) {
//       console.log(resident.residentID);
//       if(resident.residentID == this.formResidentID.value){
//         this.resident = resident;
//       }
//     }
//
// 		this.energyReceiverAsset = this.resident.energy;
//
//
//     // 6. 分别遍历两种类型的energy list,分配不同的交易对象Obj
//
//
// 			//transaction objects
// 			this.energyToDDoSObj = {
// 				$class: "org.decentralized.energy.network.EnergyToDDoS",
// 				// "energyRate": this.utilityDDoSPerEnergy,
// 				// "energyValue": this.energyValue,
// 				// "ddosInc": 'resource:org.decentralized.energy.network.DDoS#21', //this.ddosCreditAsset,
// 				// "ddosDec": 'resource:org.decentralized.energy.network.DDoS#21', //this.ddosDebitAsset,
// 				"energyInc": this.energyReceiverAsset
// 				// "energyDec": 'resource:org.decentralized.energy.network.Energy#EN_2', //this.energyInputAsset
// 			};
//
//
//
// 			// 7. 具体的执行每次交易
// 			return this.serviceTransaction.energyToDDoS(this.energyToDDoSObj)
// 		 .toPromise()
// 		 .then((result) => {
// 			 this.errorMessage = null;
// 		 })
// 		 .catch((error) => {
// 				 if(error == 'Server error'){
// 						 this.errorMessage = "Could not connect to REST server. Please check your configuration details";
// 				 }
// 				 else if(error == '404 - Not Found'){
// 				 this.errorMessage = "404 - Could not find API route. Please check your available APIs."
// 				 }
// 				 else{
// 						 this.errorMessage = error;
// 				 }
// 		 }).then(() => {
// 			 this.transactionFrom = false;
// 		 });
//
// }
}
