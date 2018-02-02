import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EnergyService } from './Energy.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Energy',
	templateUrl: './Energy.component.html',
	styleUrls: ['./Energy.component.css'],
  providers: [EnergyService]
})
export class EnergyComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;


      energyID = new FormControl("", Validators.required);
      units = new FormControl("", Validators.required);
      value = new FormControl("", Validators.required);
      ownerID = new FormControl("", Validators.required);
      ownerEntity = new FormControl("", Validators.required);
			flag = new FormControl("", Validators.required);
      description = new FormControl("", Validators.required);


  constructor(private serviceEnergy:EnergyService, fb: FormBuilder) {
    this.myForm = fb.group({
          energyID:this.energyID,
          units:this.units,
          value:this.value,
          ownerID:this.ownerID,
          ownerEntity:this.ownerEntity,
					flag:this.flag,
          description:this.description
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
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

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.decentralized.energy.network.Energy",
          "energyID":"EN_" + this.energyID.value,
          "units":this.units.value,
          "value":Date.now(), // this.value.value,
          "ownerID":this.ownerID.value,
          "ownerEntity":this.ownerEntity.value,
					"flag":0, //this.flag.value,
					"description":this.description.value
    };

    this.myForm.setValue({
          "energyID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null,
					"flag":null,
					"description":null
    });

    return this.serviceEnergy.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
location.reload();
      this.myForm.setValue({
          "energyID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null,
					"flag":null,
					"description":null

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
      $class: "org.decentralized.energy.network.Energy",
            "units":this.units.value,
            "value":this.value.value,
            "ownerID":this.ownerID.value,
            "ownerEntity":this.ownerEntity.value,
						"flag":this.flag.value,
						"description":this.description.value
    };

    return this.serviceEnergy.updateAsset(form.get("energyID").value,this.asset)
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

    return this.serviceEnergy.deleteAsset(this.currentId)
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

    return this.serviceEnergy.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "energyID":null,
            "units":null,
            "value":null,
            "ownerID":null,
            "ownerEntity":null,
						"flag":null,
						"description":null
      };

        if(result.energyID){
          formObject.energyID = result.energyID;
        }else{
          formObject.energyID = null;
        }

        if(result.units){
          formObject.units = result.units;
        }else{
          formObject.units = null;
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

				if(result.flag){
					formObject.flag = result.flag;
				}else{
					formObject.flag = null;
				}

				if(result.description){
          formObject.description = result.description;
        }else{
          formObject.description = null;
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
          "energyID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null,
					"flag":null,
					"description":null
      });
  }

}
