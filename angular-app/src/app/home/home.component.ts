import { Component, OnInit, Input , ElementRef, ViewChild, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
// import { MapOptions } from 'angular2-baidu-map';

// 1. Transactinos
import { HomeService } from './home.service';
import 'rxjs/add/operator/toPromise';

// 2. Energy
// import { Component, OnInit, Input } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EnergyService } from '../Energy/Energy.service';
import { DDoSService } from '../DDoS/DDoS.service';
import { LogService } from '../Log/Log.service';
import { ResidentService } from '../Resident/Resident.service';
import { TargetCompanyService } from '../TargetCompany/TargetCompany.service';
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// providers: [HomeService]
  providers: [EnergyService, DDoSService, LogService, ResidentService, TargetCompanyService]
})
export class HomeComponent implements OnInit, OnChanges {

	// for canvas
	@ViewChild('myCanvas') canvasRef: ElementRef;
	// @Input() particles: Particle[];
  private running: boolean;

	// constructor(){};

	// 1. Transactions
	// private errorMessage;
	// private allTransactions;
	//
	// private systemTransactions = [];
	// private performedTransactions = [];

	// 2. Energy
	myForm: FormGroup;
  // public options : MapOptions;  // 百度地图
  private allAssets;  // 此处指代energy
  private asset;
  private currentId;
	private errorMessage;
	private DDoSInfoShow; //什么时候开始显示DDoS分析信息
	private LogInfoShow;

	// 定时器
	private timer;

	private allDDoS;
	private ddos;
	private allLog;
	private log;

	// 定义节点和边
	private edges=[];
	private nodes=[];
	private lastNodes=[];
	private lastEdges=[];

	// 定义用户Resident
	private allResidents=[];
	private resident_nodes_numbers = 0;
	private nodeisResident = false;

	// 定义目标TargetCompany
	private allTargetCompany = [];
	private targetcompany_nodes_numbers = 0;
	private nodeisTargetCompany = false;

	// 定义canvas画布
	private canvasRef_width;
	private canvasRef_height;
	// private ctx: CanvasRenderingContext2D;

	// 定义提交异常的数量
	private abnormalNumbers = 0;
	private newAbnormalNumber = 0;
	private lastIndexAbnormal = 0;

	// 定义刷新paint的时间
	private count = 0;
	private reloadPaint = false;

	// energyID = new FormControl("", Validators.required);
	// targetIP = new FormControl("", Validators.required);
	// value = new FormControl("", Validators.required);
	// ownerID = new FormControl("", Validators.required);
	// ownerEntity = new FormControl("", Validators.required);

	// constructor(private serviceTransaction:HomeService, fb: FormBuilder,
	constructor(private serviceEnergy:EnergyService, fb: FormBuilder,
							private serviceDDoS:DDoSService,
							private serviceLog:LogService,
							private serviceResident:ResidentService,
							private serviceTargetCompany:TargetCompanyService,
							private ref: ChangeDetectorRef) {
							this.myForm = fb.group({
										// energyID:this.energyID,
										// targetIP:this.targetIP,
										// value:this.value,
										// ownerID:this.ownerID,
										// ownerEntity:this.ownerEntity

							});

							this.timer = setInterval(() => {
								this.ref.detectChanges(); // 检测变化
								this.loadAllEnergy();
								this.loadAllDDoS();
								this.loadAllLog();
								this.loadAllResident();
								this.loadAllTargetCompany();
								// console.log('timer');

								this.count += 1;
								// console.log('nnnnn');
								if (this.count == 2) {
									// this.loadAllEnergy();
								}

								if (this.count == 10) { // && this.reloadPaint == true) {

									// console.log('count is:' + this.count);
									this.reloadPaint = false;
this.paint();   // this.paint()需要再this.reloadPaint=false之前执行，
								}
								// this.paint();
							}, 1000);


							// this.timer = setInterval(() => {
							// 	// this.ref.detectChanges(); // 检测变化
							// 	// this.loadAllEnergy();
							// 	// this.loadAllDDoS();
							// 	// this.loadAllLog();
							// 	// this.loadAllResident();
							// 	// console.log('timer');
              //
							// 	this.paint();
							// }, 5000);

							// 百度地图配置
							// this.options = {
					    //   centerAndZoom: {
					    //     lat: 39.920116,
					    //     lng: 116.403703,
					    //     zoom: 5
					    //   },
					    //   enableKeyboard: true
					    // };
	};


	ngOnInit(): void {
		this.running = true;
		// canvas test

this.paint();
    this.DDoSInfoShow = false;
		this.LogInfoShow = false;
		// this.loadAllTransactions();

		// this.loadAllEnergy();
		// this.loadAllDDoS();
		// this.loadAllLog();
		this.loadAllResident();
		this.loadAllTargetCompany();
	}

	// 销毁组件时，清除定时器
	ngOnDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
		}
		this.running = false;
	}

	ngOnChanges() {

	}
	// ngOnChanges(changes: SimpleChanges) {
	// 	for (let pName in changes) {
	// 		let ch = changes[pName];
	// 		console.log(pName);
	// 		console.log(ch);
	// 	}
	// 	console.log('noOnChanges');
	// }

	//sort the objects on key
	// sortByKey(array, key): Object[] {
	// 	return array.sort(function(a, b) {
	// 			var x = a[key]; var y = b[key];
	// 			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	// 	});
	// }

	//get all Residents
	// loadAllTransactions(): Promise<any> {
	//
	// 	let tempList = [];
	// 	let systemList = [];
	// 	let performedList = [];
	//
	// 	return this.serviceTransaction.getTransactions()
	// 	.toPromise()
	// 	.then((result) => {
	// 		result = this.sortByKey(result, 'transactionTimestamp');
	// 		this.errorMessage = null;
	// 		result.forEach(transaction => {
	// 			tempList.push(transaction);
	//
	// 			var importClass = transaction["$class"];
	// 			var importClassArray = importClass.split(".");
	//
	// 			if(importClassArray[1] == 'hyperledger'){
	// 				systemList.push(transaction);
	// 			}
	// 			else {
	// 				performedList.push(transaction);
	// 			}
	//
	// 		});
	//
	// 		this.systemTransactions = systemList;
	// 		this.performedTransactions = performedList;
	// 		this.allTransactions = tempList;
	// 		console.log(this.allTransactions)
	// 		console.log(this.performedTransactions)
	// 		console.log(this.systemTransactions)
	// 	})
	// 	.catch((error) => {
	// 			if(error == 'Server error'){
	// 					this.errorMessage = "Could not connect to REST server. Please check your configuration details";
	// 			}
	// 			else if(error == '404 - Not Found'){
	// 			this.errorMessage = "404 - Could not find API route. Please check your available APIs."
	// 			}
	// 			else{
	// 					this.errorMessage = error;
	// 			}
	// 	});
	// }

	// requestAnimationFrame(function() {
	// 	ctx.fillRect(getX(), getY(), 10, 10);
	// });

	// function paintLoop() {
  //
	// 	// Paint current frame
	// 	ctx.fillRect(getNextX(), getNextY(), 10, 10);
  //
	// 	// Schedule next frame
	// 	requestAnimationFrame(paintLoop);
	// }

	// // Start loop
	// paintLoop();

	private paint() {
	  // Check that we're still running.
	  if (!this.running) {
	    return;
	  }
		console.log('paint');
	  // Paint current frame
	  let ctx: CanvasRenderingContext2D =
	    this.canvasRef.nativeElement.getContext('2d');
		let canvasRef = this.canvasRef.nativeElement;
		this.canvasRef_width = canvasRef.width;
		this.canvasRef_height = canvasRef.height;

	  // // Draw background (which also effectively clears any previous drawing)
	  // ctx.fillStyle = 'rgb(221, 0, 49)';
	  // ctx.fillRect(0, 0, 800, 500);
    //
	  // // Advance flock. This updates the positions of all objects.
	  // // this.flock.tick();
    //
	  // // Draw flock
	  // ctx.beginPath();
	  // ctx.fillStyle = `rgb(255,255,255)`;

		var mousePos = [0, 0];
		var warningColor = '#e4e819';
		var ddosColor = '#d60a11';
		var myblue1 = '#42b6f4';
		var myblue2 = '#42f4ce';
		var myblackblue1 = '#12233d';
		var mygrey1 = '#8884c9';
	  var easingFactor = 5.0;
		var black = '#000';
	  var backgroundColor = mygrey1; //mygrey1; //myblue1; // '#155';
	  var nodeColor = '#fff';
	  var edgeColor = '#fff';//'#000';
		var edgeWidth = 4.5;
		var nodeSize = 2;
		var vecMax = 0.5;
		var node_speed = 0.1;  					//
		var canvasRef_limit_left = 0.2;  // 限定canvas显示的边界
		var canvasRef_limit_right = 0.8;
		var nodes = [];
		var edges = [];
		// nodes = Object.create(this.nodes);
		// edges = Object.create(this.edges);
		nodes = this.nodes;
		edges = this.edges;
		let resident_nodes_numbers = this.allResidents.length;
		let targetcompany_nodes_numbers = this.allTargetCompany.length;
		let nodes_numbers = resident_nodes_numbers + targetcompany_nodes_numbers;

		let idRequestAnimationFrame = 0;
		// console.log(nodes_numbers, abnormalNumbers, this.abnormalNumbers);

		function addEdge(edge) {
	    var ignore = false;

	    edges.forEach(function (e) {
	      if (e.from == edge.from && e.to == edge.to) {
	        ignore = true;
	      }

	      if (e.to == edge.from && e.from == edge.to) {
	        ignore = true;
	      }
	    });

	    if (!ignore) {
	      edges.push(edge);
	    }
	  }

		// function constructNodes() {
			if (nodes_numbers < 2) {
				 // nodes_numbers = 2;
			}
			let nodeisResident = this.nodeisResident;
			if (this.nodes.length < nodes_numbers) {
				for (let i = this.nodes.length; i < nodes_numbers; i++) {
					var node = {
						id: i+1,
						nodeisResident:  nodeisResident ? true : false, //"resident" : "targetcompany",
						representobject: nodeisResident ? this.allResidents[i-this.resident_nodes_numbers] : this.allTargetCompany[i-this.targetcompany_nodes_numbers],
						drivenByMouse: i == 0,
						abnormalNumbers: 0,
						x: Math.random() * canvasRef.width * 0.9 + canvasRef.width * 0.1,
						y: Math.random() * canvasRef.height * 0.9 + canvasRef.height * 0.1,
						vx: (Math.random() * 1 - 0.5) * node_speed,
						vy: (Math.random() * 1 - 0.5) * node_speed,
						radius: Math.random() > 0.6 ? 3 + Math.random() * nodeSize : 4 + Math.random() * nodeSize,
						nodeColor: '#fff'
					};

					nodes.push(node);
				}
			}
			let abnormalNumbers = this.abnormalNumbers;  //子函数内部访问不了最外层的this
			let newAbnormalNumber = this.newAbnormalNumber;

			let lastNodes = [];
			lastNodes = this.lastNodes;
			// nodes.forEach(function (e) {
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].nodeisResident) {
					// nodes[i].nodeColor = abnormalNumbers >= newAbnormalNumber ? '#fff' : '#641';
					// if (lastNodes.length < nodes.length) {
					// 		nodes[i].nodeColor = abnormalNumbers >= newAbnormalNumber ? '#fff' : warningColor; //'#641';
					// }
					if(lastNodes.length == nodes.length && nodes[i].abnormalNumbers > lastNodes[i]) {
						nodes[i].nodeColor = warningColor; //'#641';
						// console.log(lastNodes.length + ' ' + nodes[i].abnormalNumbers + ' ' + lastNodes[i]);
					}
					if (this.reloadPaint == false && lastNodes.length == nodes.length && nodes[i].abnormalNumbers == lastNodes[i]) {
						nodes[i].nodeColor = '#fff';  // 恢复白色
					}



					if (lastNodes.length > 0) {
						console.log(lastNodes.length + ' ' + nodes.length + ' ' +
							nodes[i].abnormalNumbers + ' ' + lastNodes[i]
							+ ' ' + this.reloadPaint + ' ' + this.count);
					}
					// nodes[i].vx = Math.random() * 1 - 0.5;
					// nodes[i].vy = Math.random() * 1 - 0.5;
				}

			}
			// console.log(lastNodes.length + ' ' + nodes.length + ' ' + this.abnormalNumbers + ' ' + this.newAbnormalNumber + ' ' + this.lastIndexAbnormal);
			console.log('this:' + lastNodes.length + ' ' +
				this.lastIndexAbnormal + ' ' +
			  this.abnormalNumbers)
			// 更新上次异常值
			if (this.newAbnormalNumber >= this.abnormalNumbers) {
				this.abnormalNumbers = this.newAbnormalNumber;
			}
			// 更新上次各个节点数量
			this.resident_nodes_numbers = resident_nodes_numbers;
			this.targetcompany_nodes_numbers = targetcompany_nodes_numbers;

			nodes.forEach(function (e) {
				nodes.forEach(function (e2) {
					if (e == e2) {
						return;
					}

					var edge = {
						from: e,
						to: e2
					}

					addEdge(edge);
				});
			});
		// }
		// constructNodes();

		function step() {

			nodes.forEach(function (e) {
				if (e.drivenByMouse) {
					// return;
				}

				e.x += e.vx;
				e.y += e.vy;

				function clamp(min, max, value) {
					if (value > max) {
						return max;
					} else if (value < min) {
						return min;
					} else {
						return value;
					}
				}

				if (e.x <= canvasRef.width * canvasRef_limit_left || e.x >= canvasRef.width * canvasRef_limit_right) {
					e.vx *= -1;
					e.x = clamp(canvasRef.width * canvasRef_limit_left, canvasRef.width * canvasRef_limit_right, e.x)
				}

				if (e.y <= canvasRef.height * canvasRef_limit_left || e.y >= canvasRef.height * canvasRef_limit_right) {
					e.vy *= -1;
					e.y = clamp(canvasRef.height * canvasRef_limit_left, canvasRef.height * canvasRef_limit_right, e.y)
				}
			});

			// adjustNodeDrivenByMouse();
			render();


			idRequestAnimationFrame = window.requestAnimationFrame(step);
		}

		// function adjustNodeDrivenByMouse() {
	  //   nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor;
	  //   nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor;
	  // }

	  function lengthOfEdge(edge) {
	    return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2));
	  }

		function render() {
	    ctx.fillStyle = backgroundColor;
	    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

			// 创建图例
			ctx.font = "20px Georgia";
			ctx.fillStyle = myblue2;
			ctx.fillText("Gateway", 30, 50);

			ctx.fillStyle = "#fff";
			// ctx.beginPath();
			ctx.arc(10, 40, 5, 0, 2 * Math.PI);
			ctx.fill();  // 带填充的实心图形
			// ctx.fillStyle = "#fff";
			// ctx.beginPath();
			ctx.rect(5, 90, 10, 10);
			ctx.fill();  // 带填充的实心图形
			// var gradient = ctx.createLinearGradient(0, 0, 200, 0);
			// gradient.addColorStop(0, "magenta");
			// gradient.addColorStop(0.5, "blue");
			// gradient.addColorStop(1.0, "red");
			ctx.fillStyle = myblue2; //gradient;
			ctx.fillText("TargetCompany", 20, 100);

	    edges.forEach(function (e) {
	      var l = lengthOfEdge(e);
	      var threshold = canvasRef.width / 4;

	      if (l > threshold) {
	        return;
	      }

	      ctx.strokeStyle = edgeColor;
	      ctx.lineWidth = (1.0 - l / threshold) * edgeWidth;
	      ctx.globalAlpha = 1.0 - l / threshold;
	      ctx.beginPath();
	      ctx.moveTo(e.from.x, e.from.y);
	      ctx.lineTo(e.to.x, e.to.y);
	      ctx.stroke();
	    });
	    ctx.globalAlpha = 1.0;

	    nodes.forEach(function (e) {
	      if (e.drivenByMouse) {
	        // return;

	      }

	      ctx.fillStyle = e.nodeColor;
	      ctx.beginPath();
	      if (e.nodeisResident) {  // 判断点的类型，绘制不同形状
					ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
				} else {
					ctx.rect(e.x-e.radius, e.y-e.radius, 2*e.radius, 2*e.radius);
				}
	      ctx.fill();  // 带填充的实心图形
	    });
	  }
		window.onresize = resize;
		function resize() {
			canvasRef.width = canvasRef.clientWidth; //document.body.clientWidth;
			canvasRef.height = canvasRef.clientHeight;

			render();
		};
		// window.onmousemove = function (e) {
		// 	mousePos[0] = e.clientX;
		// 	mousePos[1] = e.clientY;
		// };

		// this.nodes = nodes;  // 直接赋值不是拷贝，只是让nodes获得了this.nodes的内存地址，所以不需要再重新赋值来更新了。
		// this.edges = edges;
		// this.lastNodes = Object.create(nodes);


		resize();

		//window.onresize(); // trigger the event manually.
		nodes_numbers = this.allResidents.length;

		// window.requestAnimationFrame(step); //() => step);
		step();
		if (this.reloadPaint == true) {
			window.cancelAnimationFrame(idRequestAnimationFrame);
			for (var i = 0; i < nodes.length; i++) {
				// 仅仅保存每个node的abnormalNumbers即可。
				if (this.lastNodes.length < i + 1) {
					this.lastNodes.push(nodes[i].abnormalNumbers);
				} else {
					this.lastNodes[i] = nodes[i].abnormalNumbers;
				}
			}
			// this.lastNodes = Object.create(this.nodes);

			// window.requestAnimationFrame(step);
			// this.reloadPaint = false;
		} else {
			if (this.count > 4) {window.cancelAnimationFrame(idRequestAnimationFrame);}
		}
		console.log('idRequestAnimationFrame is:' + idRequestAnimationFrame + this.reloadPaint);
	  // Schedule next
	  // requestAnimationFrame(() => this.paint());
	}


	loadAllEnergy(): Promise<any> {
		let tempList = [];
		return this.serviceEnergy.getAll()
		.toPromise()
		.then((result) => {
			this.errorMessage = null;
			result.forEach(asset => {
				tempList.push(asset);
			});
			this.allAssets = tempList;
			console.log('tempList length:'+tempList.length + ' ' + this.abnormalNumbers +
				' ' + (tempList.length > this.abnormalNumbers));
			if (tempList.length > this.abnormalNumbers) {
				console.log('into if');
					this.newAbnormalNumber = tempList.length;
					this.reloadPaint = true;
					// this.paint();
					console.log('longlong before loadAllEnergy' + this.nodes[0].abnormalNumbers );//+ ' ' + this.lastNodes[0].abnormalNumbers);

					for (let i = 0; i < tempList.length; i++) {
						if (this.lastIndexAbnormal < parseInt(tempList[i].energyID)) {
							this.nodes[parseInt(tempList[i].ownerID)-1].abnormalNumbers += 1;
							this.lastIndexAbnormal += 1;
						}
					}
					// this.reloadPaint = true;
					// console.log('tempList[0] is:' + tempList[0]);

					// $class:"org.decentralized.energy.network.Energy"
					// description:"TCP中SYN握手未完成"
					// energyID:"1"
					// flag:"0"
					// ownerEntity:"Resident"
					// ownerID:"1"
					// targetIP:"210.73.64.1"
					// value:1521785737
					console.log('before ...');
					console.log('before loadAllEnergy' + this.nodes[0].abnormalNumbers )
					console.log(this.lastNodes[0]);
					this.paint();
					// this.lastNodes = this.nodes;
					this.count = 0;  // 重新开始计数
					// this.reloadPaint = false;
					console.log('after ...');
					console.log('after loadAllEnergy' + this.nodes[0].abnormalNumbers + ' ' + this.lastNodes[0]);
			}
			// console.log(tempList);
		})
		.catch((error) => {
				if(error == 'Server error'){
						this.errorMessage = "Could not connect to REST server. Please check your configuration details";
				}
				else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
				}
				else{
						this.errorMessage = error;
				}
		});
	}
	loadAllDDoS(): Promise<any> {
		let tempList = [];
		return this.serviceDDoS.getAll()
		.toPromise()
		.then((result) => {
			if (result.length!=0)
			this.DDoSInfoShow = true;
			this.errorMessage = null;
			result.forEach(ddos => {
				tempList.push(ddos);
			});
			this.allDDoS = tempList;
		})
		.catch((error) => {
				if(error == 'Server error'){
						this.errorMessage = "Could not connect to REST server. Please check your configuration details";
				}
				else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
				}
				else{
						this.errorMessage = error;
				}
		});
	}

	loadAllLog(): Promise<any> {
		let tempList = [];
		return this.serviceLog.getAll()
		.toPromise()
		.then((result) => {
			if (result.length!=0)
			this.LogInfoShow = true;
			this.errorMessage = null;
			result.forEach(log => {
				tempList.push(log);
			});
			this.allLog = tempList;
		})
		.catch((error) => {
				if(error == 'Server error'){
						this.errorMessage = "Could not connect to REST server. Please check your configuration details";
				}
				else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
				}
				else{
						this.errorMessage = error;
				}
		});
	}

	loadAllResident(): Promise<any> {
		let tempList = [];
		return this.serviceResident.getAllResidents()
		.toPromise()
		.then((result) => {
			if (result.length!=0)
			// this.LogInfoShow = true;
			this.errorMessage = null;
			result.forEach(resident => {
				tempList.push(resident);
			});
			this.allResidents = tempList;
			// this.addNode(); // 添加节点
			if (tempList.length > this.resident_nodes_numbers) {
					this.reloadPaint = true;
					this.nodeisResident = true;
					this.paint();
					console.log('after loadAllResident' + this.nodes[0].abnormalNumbers + ' ' + this.lastNodes[0]);
					// this.count = 0;
			}
			this.nodeisResident = false;
			// this.reloadPaint = false;

			// console.log(this.allResidents);
		})
		.catch((error) => {
				if(error == 'Server error'){
						this.errorMessage = "Could not connect to REST server. Please check your configuration details";
				}
				else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
				}
				else{
						this.errorMessage = error;
				}
		});
	}


	loadAllTargetCompany(): Promise<any> {
		let tempList = [];
		return this.serviceTargetCompany.getAllTargetCompany()
			.toPromise()
			.then((result) => {
				if (result.length!=0)
				// this.LogInfoShow = true;
					this.errorMessage = null;
				result.forEach(TargetCompany => {
					tempList.push(TargetCompany);
				});
				this.allTargetCompany = tempList;
				// this.addNode(); // 添加节点
				if (tempList.length > this.targetcompany_nodes_numbers) {
					this.reloadPaint = true;
					this.nodeisTargetCompany = true;
					this.paint();
					//console.log('after loadAllResident' + this.nodes[0].abnormalNumbers + ' ' + this.lastNodes[0]);
					// this.count = 0;
				}
				this.nodeisTargetCompany = false;
				// this.reloadPaint = false;

				// console.log(this.allResidents);
			})
			.catch((error) => {
				if(error == 'Server error'){
					this.errorMessage = "Could not connect to REST server. Please check your configuration details";
				}
				else if(error == '404 - Not Found'){
					this.errorMessage = "404 - Could not find API route. Please check your available APIs."
				}
				else{
					this.errorMessage = error;
				}
			});
	}
}
