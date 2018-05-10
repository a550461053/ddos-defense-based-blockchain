import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { Resident } from '../org.decentralized.energy.network';
import { TargetCompany } from '../org.decentralized.energy.network';

import { DDoS } from '../org.decentralized.energy.network';
import { Energy } from '../org.decentralized.energy.network';
import { Cash } from '../org.decentralized.energy.network';
import { Coins } from '../org.decentralized.energy.network';

import { AbnorConToDDoS } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TransactionDDOSService {

	  private RESIDENT: string = 'Resident';
    private TARGETCOMPANY: string = 'TargetCompany';
    private ENERGY: string = 'Energy';
    private DDOS: string = 'DDoS';
    private ENERGY_TO_DDOS: string = 'AbnorConToDDoS';

    constructor(private residentService: DataService<Resident>,
			private TargetCompanyService: DataService<TargetCompany>,
			private ddosService: DataService<DDoS>,
			private energyService: DataService<Energy>,
			private AbnorConToDDoSService: DataService<AbnorConToDDoS>) {
    };

    //get all Residents
    public getAllResidents(): Observable<Resident[]> {
        return this.residentService.getAll(this.RESIDENT);
    }

    //get all Utility Companies
    public getAllTargetCompany(): Observable<TargetCompany[]> {
        return this.TargetCompanyService.getAll(this.TARGETCOMPANY);
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
    public AbnorConToDDoS(itemToAdd: any): Observable<AbnorConToDDoS> {
      return this.AbnorConToDDoSService.add(this.ENERGY_TO_DDOS, itemToAdd);
    }


		//add ddos functions

    public addDDoS(itemToAdd: any): Observable<DDoS> {
      return this.ddosService.add(this.DDOS, itemToAdd);
    }


}
