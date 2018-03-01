import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogService } from './Log.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Log',
	templateUrl: './Log.component.html',
	styleUrls: ['./Log.component.css'],
  providers: [LogService]
})
export class LogComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;
  private energyToLogObj;

      logID = new FormControl("", Validators.required);
      targetIP = new FormControl("", Validators.required);
      value = new FormControl("", Validators.required);
      ownerID = new FormControl("", Validators.required);
      ownerEntity = new FormControl("", Validators.required);


  constructor(private serviceLog:LogService, fb: FormBuilder) {
    this.myForm = fb.group({
          logID:this.logID,
          targetIP:this.targetIP,
          value:this.value,
          ownerID:this.ownerID,
          ownerEntity:this.ownerEntity

    });
		//transaction object
		// this.energyToLogObj = {
		// 		$class: "org.decentralized.energy.network.EnergyToLog",
		// 		"cashRate": 1,
		// 		"cashValue": 1,
		// 		"coinsInc": 1,
		// 		"coinsDec": 1,
		// 		"cashInc": 1,
		// 		"cashDec": 1
		// };
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLog.getAll()
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

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.decentralized.energy.network.Log",
          "logID":"Log_" + this.logID.value,
          "targetIP":this.targetIP.value,
          "value":Date.now(), // this.value.value,
          "ownerID":this.ownerID.value,
          "ownerEntity":this.ownerEntity.value
    };

    this.myForm.setValue({
          "logID":null,
          "targetIP":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null
    });

    return this.serviceLog.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
location.reload();
      this.myForm.setValue({
          "logID":null,
          "targetIP":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null

      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });

  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.decentralized.log.network.Log",
            "targetIP":this.targetIP.value,
            "value":this.value.value,
            "ownerID":this.ownerID.value,
            "ownerEntity":this.ownerEntity.value
    };

    return this.serviceLog.updateAsset(form.get("logID").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceLog.deleteAsset(this.currentId)
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLog.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "logID":null,
            "targetIP":null,
            "value":null,
            "ownerID":null,
            "ownerEntity":null
      };

        if(result.logID){
          formObject.logID = result.logID;
        }else{
          formObject.logID = null;
        }

        if(result.targetIP){
          formObject.targetIP = result.targetIP;
        }else{
          formObject.targetIP = null;
        }

        if(result.value){
          formObject.value = result.value;
        }else{
          formObject.value = null;
        }

        if(result.ownerID){
          formObject.ownerID = result.ownerID;
        }else{
          formObject.ownerID = null;
        }

        if(result.ownerEntity){
          formObject.ownerEntity = result.ownerEntity;
        }else{
          formObject.ownerEntity = null;
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

  resetForm(): void{
    this.myForm.setValue({
          "logID":null,
          "targetIP":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null
      });
  }

	testLog(): void{
    // this.myForm.setValue({
    //       "logID":null,
    //       "targetIP":null,
    //       "value":null,
    //       "ownerID":null,
    //       "ownerEntity":null
    //   });

			// this.serviceLog.getAsset(id)
	    // .toPromise()
	    // .then((result) => {
			// 	this.errorMessage = null;
	    //   let formObject = {
	    //         "logID":null,
	    //         "targetIP":null,
	    //         "value":null,
	    //         "ownerID":null,
	    //         "ownerEntity":null
	    //   };

			// this.serviceLog.energyToLog(this.energyToLogObj);
  }

}
