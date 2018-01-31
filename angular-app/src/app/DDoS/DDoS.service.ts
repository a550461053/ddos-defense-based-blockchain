import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { DDoS } from '../org.decentralized.energy.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class DDoSService {


		private NAMESPACE: string = 'DDoS';




    constructor(private dataService: DataService<DDoS>) {
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

}
