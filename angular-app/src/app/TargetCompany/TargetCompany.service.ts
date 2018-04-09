import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { TargetCompany } from '../org.decentralized.energy.network';

import { Coins } from '../org.decentralized.energy.network';
import { Energy } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TargetCompanyService {


		private TARGETCOMPANY: string = 'TargetCompany';
    private COINS: string = 'Coins';
    private ENERGY: string = 'Energy';

    constructor(private TargetCompanyService: DataService<TargetCompany>, private coinsService: DataService<Coins>, private energyService: DataService<Energy>) {
    };

    //TargetCompany functions
    public getAllTargetCompany(): Observable<TargetCompany[]> {
        return this.TargetCompanyService.getAll(this.TARGETCOMPANY);
    }

    public getTargetCompany(id: any): Observable<TargetCompany> {
      return this.TargetCompanyService.getSingle(this.TARGETCOMPANY, id);
    }

    public addTargetCompany(itemToAdd: any): Observable<TargetCompany> {
      return this.TargetCompanyService.add(this.TARGETCOMPANY, itemToAdd);
    }

    public deleteTargetCompany(id: any): Observable<TargetCompany> {
      return this.TargetCompanyService.delete(this.TARGETCOMPANY, id);
    }

    public updateTargetCompany(id: any, itemToUpdate: any): Observable<TargetCompany> {
      return this.TargetCompanyService.update(this.TARGETCOMPANY, id, itemToUpdate);
    }


    //coins functions
    public getAllCoins(): Observable<Coins[]> {
        return this.coinsService.getAll(this.COINS);
    }

    public getCoins(id: any): Observable<Coins> {
      return this.coinsService.getSingle(this.COINS, id);
    }

    public addCoins(itemToAdd: any): Observable<Coins> {
      return this.coinsService.add(this.COINS, itemToAdd);
    }

    public updateCoins(id: any, itemToUpdate: any): Observable<Coins> {
      return this.coinsService.update(this.COINS, id, itemToUpdate);
    }

    public deleteCoins(id: any): Observable<Coins> {
      console.log(id)
      return this.coinsService.delete(this.COINS, id);
    }


    //energy functions
    public getAllEnergy(): Observable<Energy[]> {
        return this.energyService.getAll(this.ENERGY);
    }

    public getEnergy(id: any): Observable<Energy> {
      return this.energyService.getSingle(this.ENERGY, id);
    }

    public addEnergy(itemToAdd: any): Observable<Energy> {
      return this.energyService.add(this.ENERGY, itemToAdd);
    }

    public updateEnergy(id: any, itemToUpdate: any): Observable<Energy> {
      return this.energyService.update(this.ENERGY, id, itemToUpdate);
    }

    public deleteEnergy(id: any): Observable<Energy> {
      return this.energyService.delete(this.ENERGY, id);
    }

}
