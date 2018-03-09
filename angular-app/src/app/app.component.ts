import { Component } from '@angular/core';
// import { MapOptions } from 'angular2-baidu-map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // options : MapOptions;
  title = 'app works!';
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
