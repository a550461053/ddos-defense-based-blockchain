import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DDoSService } from './DDoS.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-DDoS',
	templateUrl: './DDoS.component.html',
	styleUrls: ['./DDoS.component.css'],
  providers: [DDoSService]
})
export class DDoSComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;
  private AbnorConToDDoSObj;

      ddosID = new FormControl("", Validators.required);
      targetIP = new FormControl("", Validators.required);
			time = new FormControl("", Validators.required);
      ownerID = new FormControl("", Validators.required);
      ownerEntity = new FormControl("", Validators.required);


  constructor(private serviceDDoS:DDoSService, fb: FormBuilder) {
    this.myForm = fb.group({
          ddosID:this.ddosID,
          targetIP:this.targetIP,
					time:this.time,
          ownerID:this.ownerID,
          ownerEntity:this.ownerEntity

    });
		//transaction object
		this.AbnorConToDDoSObj = {
				$class: "org.decentralized.energy.network.AbnorConToDDoS",
				"cashRate": 1,
				"cashValue": 1,
				"coinsInc": 1,
				"coinsDec": 1,
				"cashInc": 1,
				"cashDec": 1
		};
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceDDoS.getAll()
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
      $class: "org.decentralized.energy.network.DDoS",
          "ddosID":"DDoS_" + this.ddosID.value,
          "targetIP":this.targetIP.value,
          "time":Date.now(), // this.value.value,
          "ownerID":this.ownerID.value,
          "ownerEntity":this.ownerEntity.value
    };

    this.myForm.setValue({
          "ddosID":null,
          "targetIP":null,
          "time":null,
          "ownerID":null,
          "ownerEntity":null
    });

    return this.serviceDDoS.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
location.reload();
      this.myForm.setValue({
          "ddosID":null,
          "targetIP":null,
          "time":null,
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
      $class: "org.decentralized.ddos.network.DDoS",
            "targetIP":this.targetIP.value,
            "time":this.time.value,
            "ownerID":this.ownerID.value,
            "ownerEntity":this.ownerEntity.value
    };

    return this.serviceDDoS.updateAsset(form.get("ddosID").value,this.asset)
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

    return this.serviceDDoS.deleteAsset(this.currentId)
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

    return this.serviceDDoS.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "ddosID":null,
            "targetIP":null,
            "time":null,
            "ownerID":null,
            "ownerEntity":null
      };

        if(result.ddosID){
          formObject.ddosID = result.ddosID;
        }else{
          formObject.ddosID = null;
        }

        if(result.targetIP){
          formObject.targetIP = result.targetIP;
        }else{
          formObject.targetIP = null;
        }

        if(result.time){
          formObject.time = result.time;
        }else{
          formObject.time = null;
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
          "ddosID":null,
          "targetIP":null,
          "time":null,
          "ownerID":null,
          "ownerEntity":null
      });
  }

	testDDoS(): void{
    // this.myForm.setValue({
    //       "ddosID":null,
    //       "targetIP":null,
    //       "value":null,
    //       "ownerID":null,
    //       "ownerEntity":null
    //   });

			// this.serviceDDoS.getAsset(id)
	    // .toPromise()
	    // .then((result) => {
			// 	this.errorMessage = null;
	    //   let formObject = {
	    //         "ddosID":null,
	    //         "targetIP":null,
	    //         "value":null,
	    //         "ownerID":null,
	    //         "ownerEntity":null
	    //   };

			this.serviceDDoS.AbnorConToDDoS(this.AbnorConToDDoSObj);
  }

}
