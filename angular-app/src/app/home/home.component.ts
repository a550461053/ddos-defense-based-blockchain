import { Component, OnInit, Input , ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MapOptions } from 'angular2-baidu-map';

// 1. Transactinos
import { HomeService } from './home.service';
import 'rxjs/add/operator/toPromise';

// 2. Energy
// import { Component, OnInit, Input } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EnergyService } from '../Energy/Energy.service';
import { DDoSService } from '../DDoS/DDoS.service';
import { LogService } from '../Log/Log.service';
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// providers: [HomeService]
  providers: [EnergyService, DDoSService, LogService]
})
export class HomeComponent implements OnInit {



	// constructor(){};

	// 1. Transactions
	// private errorMessage;
	// private allTransactions;
	//
	// private systemTransactions = [];
	// private performedTransactions = [];

	// 2. Energy
	myForm: FormGroup;
  public options : MapOptions;  // 百度地图
  private allAssets;  // 此处指代energy
  private asset;
  private currentId;
	private errorMessage;
	private DDoSInfoShow; //什么时候开始显示DDoS分析信息
	private LogInfoShow;

	// 定时器
	private timer;

	private allDDoS;
	private ddos;
	private allLog;
	private log;

	// energyID = new FormControl("", Validators.required);
	// targetIP = new FormControl("", Validators.required);
	// value = new FormControl("", Validators.required);
	// ownerID = new FormControl("", Validators.required);
	// ownerEntity = new FormControl("", Validators.required);

	// constructor(private serviceTransaction:HomeService, fb: FormBuilder,
	constructor(private serviceEnergy:EnergyService, fb: FormBuilder,
							private serviceDDoS:DDoSService,
							private serviceLog:LogService,
							private ref: ChangeDetectorRef) {
							this.myForm = fb.group({
										// energyID:this.energyID,
										// targetIP:this.targetIP,
										// value:this.value,
										// ownerID:this.ownerID,
										// ownerEntity:this.ownerEntity

							});

							this.timer = setInterval(() => {
								this.ref.detectChanges(); // 检测变化
								this.loadAllEnergy();
								this.loadAllDDoS();
								this.loadAllLog();
								// console.log('timer');
							}, 1000);

							// 百度地图配置
							this.options = {
					      centerAndZoom: {
					        lat: 39.920116,
					        lng: 116.403703,
					        zoom: 5
					      },
					      enableKeyboard: true
					    };
	};


	ngOnInit(): void {
    this.DDoSInfoShow = false;
		this.LogInfoShow = false;
		// this.loadAllTransactions();
		this.loadAllEnergy();
		this.loadAllDDoS();
		this.loadAllLog();
	}

	// 销毁组件时，清除定时器
	ngOnDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	// ngOnChanges(changes: SimpleChanges) {
	// 	for (let pName in changes) {
	// 		let ch = changes[pName];
	// 		console.log(pName);
	// 		console.log(ch);
	// 	}
	// 	console.log('noOnChanges');
	// }

	//sort the objects on key
	// sortByKey(array, key): Object[] {
	// 	return array.sort(function(a, b) {
	// 			var x = a[key]; var y = b[key];
	// 			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	// 	});
	// }

	//get all Residents
	// loadAllTransactions(): Promise<any> {
	//
	// 	let tempList = [];
	// 	let systemList = [];
	// 	let performedList = [];
	//
	// 	return this.serviceTransaction.getTransactions()
	// 	.toPromise()
	// 	.then((result) => {
	// 		result = this.sortByKey(result, 'transactionTimestamp');
	// 		this.errorMessage = null;
	// 		result.forEach(transaction => {
	// 			tempList.push(transaction);
	//
	// 			var importClass = transaction["$class"];
	// 			var importClassArray = importClass.split(".");
	//
	// 			if(importClassArray[1] == 'hyperledger'){
	// 				systemList.push(transaction);
	// 			}
	// 			else {
	// 				performedList.push(transaction);
	// 			}
	//
	// 		});
	//
	// 		this.systemTransactions = systemList;
	// 		this.performedTransactions = performedList;
	// 		this.allTransactions = tempList;
	// 		console.log(this.allTransactions)
	// 		console.log(this.performedTransactions)
	// 		console.log(this.systemTransactions)
	// 	})
	// 	.catch((error) => {
	// 			if(error == 'Server error'){
	// 					this.errorMessage = "Could not connect to REST server. Please check your configuration details";
	// 			}
	// 			else if(error == '404 - Not Found'){
	// 			this.errorMessage = "404 - Could not find API route. Please check your available APIs."
	// 			}
	// 			else{
	// 					this.errorMessage = error;
	// 			}
	// 	});
	// }


	loadAllEnergy(): Promise<any> {
		let tempList = [];
		return this.serviceEnergy.getAll()
		.toPromise()
		.then((result) => {
			this.errorMessage = null;
			result.forEach(asset => {
				tempList.push(asset);
			});
			this.allAssets = tempList;
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
	loadAllDDoS(): Promise<any> {
		let tempList = [];
		return this.serviceDDoS.getAll()
		.toPromise()
		.then((result) => {
			if (result.length!=0)
			this.DDoSInfoShow = true;
			this.errorMessage = null;
			result.forEach(ddos => {
				tempList.push(ddos);
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

	loadAllLog(): Promise<any> {
		let tempList = [];
		return this.serviceLog.getAll()
		.toPromise()
		.then((result) => {
			if (result.length!=0)
			this.LogInfoShow = true;
			this.errorMessage = null;
			result.forEach(log => {
				tempList.push(log);
			});
			this.allLog = tempList;
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
}
