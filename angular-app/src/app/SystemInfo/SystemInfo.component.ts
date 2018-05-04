import { Component } from '@angular/core';
import 'rxjs/add/operator/toPromise';
// import { MapOptions } from 'angular2-baidu-map';
declare var $:any;
@Component({
	selector: 'app-SystemInfo',
	templateUrl: './SystemInfo.component.html'
	,
	styleUrls: ['../../assets/css/master.css',
		'../../../node_modules/bootstrap/dist/css/bootstrap.css'
		// '../../assets/css/bootstrap.css'
	]
})

export class SystemInfoComponent {
	// options : MapOptions;
	title = '123 works!';
	constructor() {
		// this.options = {
		//   centerAndZoom: {
		//     lat: 39.92,
		//     lng: 116.40,
		//     zoom: 16
		//   },
		//   enableKeyboard: true
		// };
	}
}
