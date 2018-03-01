import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { Log } from '../org.decentralized.energy.network';
import { Energy } from '../org.decentralized.energy.network';
// import { EnergyToLog } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LogService {


		private NAMESPACE: string = 'Log';

    // private ENERGY_TO_LOG: string = 'EnergyToLog';


    constructor(private dataService: DataService<Log>) {
    };

    public getAll(): Observable<Log[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Log> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Log> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Log> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Log> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

		// //create Energy to Log transaction
    // public energyToLog(itemToAdd: any): Observable<EnergyToLog> {
    //   return this.energyToLogService.add(this.ENERGY_TO_LOG, itemToAdd);
    // }
}
