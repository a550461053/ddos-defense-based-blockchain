import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { Resident } from '../org.decentralized.energy.network';
import { UtilityCompany } from '../org.decentralized.energy.network';

import { DDoS } from '../org.decentralized.energy.network';
import { Energy } from '../org.decentralized.energy.network';
import { Cash } from '../org.decentralized.energy.network';
import { Coins } from '../org.decentralized.energy.network';

import { EnergyToDDoS } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TransactionDDOSService {

	  private RESIDENT: string = 'Resident';
    private UTILITYCOMPANY: string = 'UtilityCompany';
    private ENERGY: string = 'Energy';
    private DDOS: string = 'DDoS';
    private ENERGY_TO_DDOS: string = 'EnergyToDDoS';

    constructor(private residentService: DataService<Resident>,
			private utilityCompanyService: DataService<UtilityCompany>,
			private ddosService: DataService<DDoS>,
			private energyService: DataService<Energy>,
			private energyToDDoSService: DataService<EnergyToDDoS>) {
    };

    //get all Residents
    public getAllResidents(): Observable<Resident[]> {
        return this.residentService.getAll(this.RESIDENT);
    }

    //get all Utility Companies
    public getAllUtilityCompanys(): Observable<UtilityCompany[]> {
        return this.utilityCompanyService.getAll(this.UTILITYCOMPANY);
    }

    //get Energy asset
    public getEnergy(id: any): Observable<Energy> {
      return this.energyService.getSingle(this.ENERGY, id);
    }
		//get all Energy asset
    public getAllEnergy(): Observable<Energy[]> {
      return this.energyService.getAll(this.ENERGY);
    }
    //get DDoS asset
    public getDDoS(id: any): Observable<DDoS> {
      return this.ddosService.getSingle(this.DDOS, id);
    }
		//get all DDoS asset
    public getAllDDoS(): Observable<DDoS[]> {
      return this.ddosService.getAll(this.DDOS);
    }
    //create Energy to DDoS transaction
    public energyToDDoS(itemToAdd: any): Observable<EnergyToDDoS> {
      return this.energyToDDoSService.add(this.ENERGY_TO_DDOS, itemToAdd);
    }


		//add ddos functions

    public addDDoS(itemToAdd: any): Observable<DDoS> {
      return this.ddosService.add(this.DDOS, itemToAdd);
    }


}
