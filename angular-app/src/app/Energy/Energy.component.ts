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


  constructor(private serviceEnergy:EnergyService, fb: FormBuilder) {
    this.myForm = fb.group({
          energyID:this.energyID,
          units:this.units,
          value:this.value,
          ownerID:this.ownerID,
          ownerEntity:this.ownerEntity

    });
  };

  ngOnInit(): void {
    this.loadAll();

		// this.addDDoS(this.myForm);

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


	addDDoS(form: any): Promise<any> {

    this.asset = {
      $class: "org.decentralized.energy.network.Energy",
          "energyID":"11",
          "units":"kwh",
          "value":234,
          "ownerID":"q11",
          "ownerEntity":"Resident"
    };

    this.myForm.setValue({
          "energyID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null
    });

    return this.serviceEnergy.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "energyID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null

      });
			console.log("created ddos");
			location.reload();
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

	// //create coins, energy and cash assets associated with the Resident, followed by the Resident
  // createAssetsResident(): Promise<any> {
	//
  //   this.coins = {
  //     $class: "org.decentralized.energy.network.Coins",
  //         "coinsID":"CO_" + this.residentID.value,
  //         "value":this.coinsValue.value,
  //         "ownerID":this.residentID.value,
  //         "ownerEntity":'Resident'
  //   };
	//
  //   this.energy = {
  //     $class: "org.decentralized.energy.network.Energy",
  //         "energyID":"EN_" + this.residentID.value,
  //         "units":this.energyUnits.value,
  //         "value":this.energyValue.value,
  //         "ownerID":this.residentID.value,
  //         "ownerEntity":'Resident'
  //   };
	//
  //   this.cash = {
  //     $class: "org.decentralized.energy.network.Cash",
  //         "cashID":"CA_" + this.residentID.value,
  //         "currency":this.cashCurrency.value,
  //         "value":this.cashValue.value,
  //         "ownerID":this.residentID.value,
  //         "ownerEntity":'Resident'
  //   };
	//
  //   this.resident = {
  //     $class: "org.decentralized.energy.network.Resident",
  //         "residentID":this.residentID.value,
  //         "firstName":this.firstName.value,
  //         "lastName":this.lastName.value,
	//
  //         "coins":"CO_" + this.residentID.value,
  //         "cash":"CA_" + this.residentID.value,
  //         "energy":"EN_" + this.residentID.value,
	//
  //     };
	//
  //   return this.serviceResident.addCoins(this.coins)
  //   .toPromise()
	// 	.then(() => {
  //     console.log("create energy");
	// 		this.serviceResident.addEnergy(this.energy)
  //     .toPromise()
	// 	  .then(() => {
  //       console.log("create cash");
  //       this.serviceResident.addCash(this.cash)
  //       .toPromise()
  //       .then(() => {
  //         console.log("create residents");
  //         this.serviceResident.addResident(this.resident)
  //         .toPromise()
  //         .then(() => {
  //          console.log("created assets");
  //          location.reload();
  //           });
  //       });
	// 	  });
	// 	});
  // }
  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.decentralized.energy.network.Energy",
          "energyID":this.energyID.value,
          "units":this.units.value,
          "value":this.value.value,
          "ownerID":this.ownerID.value,
          "ownerEntity":this.ownerEntity.value
    };

    this.myForm.setValue({
          "energyID":null,
          "units":null,
          "value":null,
          "ownerID":null,
          "ownerEntity":null
    });

    return this.serviceEnergy.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "energyID":null,
          "units":null,
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
      $class: "org.decentralized.energy.network.Energy",
            "units":this.units.value,
            "value":this.value.value,
            "ownerID":this.ownerID.value,
            "ownerEntity":this.ownerEntity.value
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
            "ownerEntity":null
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
          "ownerEntity":null
      });
  }

}
