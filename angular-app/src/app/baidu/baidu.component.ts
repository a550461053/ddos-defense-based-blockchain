import { Component, OnInit } from '@angular/core';
// import { ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { MapOptions } from 'angular2-baidu-map';
@Component({
  selector: 'map-presentation',
  templateUrl: "./baidu.component.html",
  styleUrls: []
  // styles: [`
  //     baidu-map{
  //       width: 100%;
  //       height: 500px;
  //       display: block;
  //     }
  //   `]
})

export class BaiduComponent  {// implements OnInit {
  // opts: any;
  // offlineOpts: OfflineOptions;
  options: MapOptions;
  constructor() {
    this.options = {
      centerAndZoom: {
        lat: 39.92,
        lng: 116.40,
        zoom: 16
      },
      enableKeyboard: true
    };
  }
  // ngOnInit() {
  //   // 配置地图，参考百度api
  //   this.opts = {
  //     //地图中心坐标
  //     center: {
  //     logitude: 116.417,
  //     latitude: 40.06
  //     },
  //     zoom: 17,
  //     // 地图上的坐标
  //     markers: [{
  //       logitude: 116.417,
  //       latitude: 40.06,
  //       title: '北京',
  //       content: '朝阳区',
  //       autoDisplayInfoWindow: true
  //     }],
  //     geolocationCtrl: {
  //       anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
  //     },
  //     scaleCtrl: {
  //       anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
  //     },
  //     overviewCtrl: {
  //       isOpen: true
  //     },
  //     navCtrl: {
  //       type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
  //     }
  //
  // };
  //   // this.offlineOpts = {
  //   //   retryInterval: 5000,
  //   //   txt: '没有网络'
  //   // };
  //
  // }
  //
  // // 刚加载地图信息
  // loadMap(e:any){
  //   console.log(e);
  // }
  //
  // // 单击地图坐标
  // clickMarker(marker: any) {
  //   console.log(marker);
  // }

}
