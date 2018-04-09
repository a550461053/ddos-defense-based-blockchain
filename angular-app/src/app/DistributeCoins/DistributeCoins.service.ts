import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { Resident } from '../org.decentralized.energy.network';
import { TargetCompany } from '../org.decentralized.energy.network';

import { Coins } from '../org.decentralized.energy.network';
import { Cash } from '../org.decentralized.energy.network';

import { DistributeCoins } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class DistributeCoinsService {

	  private RESIDENT: string = 'Resident';
    private TARGETCOMPANY: string = 'TargetCompany';
    private CASH: string = 'Cash';
    private COINS: string = 'Coins';
    private DISTRIBUTE_COINS: string = 'DistributeCoins';

    constructor(private residentService: DataService<Resident>, private TargetCompanyService: DataService<TargetCompany>, private coinsService: DataService<Coins>, private cashService: DataService<Cash>, private DistributeCoinsService: DataService<DistributeCoins>) {
    };

    //get all Residents
    public getAllResidents(): Observable<Resident[]> {
        return this.residentService.getAll(this.RESIDENT);
    }

    //get all Utility Companies
    public getAllTargetCompany(): Observable<TargetCompany[]> {
        return this.TargetCompanyService.getAll(this.TARGETCOMPANY);
    }

    //get Cash asset
    public getCash(id: any): Observable<Cash> {
      return this.cashService.getSingle(this.CASH, id);
    }

    //get Coins asset
    public getCoins(id: any): Observable<Coins> {
      return this.coinsService.getSingle(this.COINS, id);
    }

    //create Cash to Coins transaction
    public DistributeCoins(itemToAdd: any): Observable<DistributeCoins> {
      return this.DistributeCoinsService.add(this.DISTRIBUTE_COINS, itemToAdd);
    }

}
