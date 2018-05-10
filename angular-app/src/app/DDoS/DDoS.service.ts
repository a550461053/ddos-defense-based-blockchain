import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { DDoS } from '../org.decentralized.energy.network';
import { Energy } from '../org.decentralized.energy.network';
import { AbnorConToDDoS } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class DDoSService {


		private NAMESPACE: string = 'DDoS';

    private ENERGY_TO_DDOS: string = 'AbnorConToDDoS';


    constructor(private dataService: DataService<DDoS>, private AbnorConToDDoSService: DataService<AbnorConToDDoS>) {
    };

    public getAll(): Observable<DDoS[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<DDoS> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<DDoS> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<DDoS> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<DDoS> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

		//create Energy to DDoS transaction
    public AbnorConToDDoS(itemToAdd: any): Observable<AbnorConToDDoS> {
      return this.AbnorConToDDoSService.add(this.ENERGY_TO_DDOS, itemToAdd);
    }
}
