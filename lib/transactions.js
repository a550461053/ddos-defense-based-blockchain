/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Energy to Coins transaction
 * @param {org.decentralized.energy.network.EnergyToCoins} UpdateValues
 * @transaction
 */
function EnergyToCoins(UpdateValues) {

    //determine change in coins value from the rate
    var coinsChange = (UpdateValues.energyRate * UpdateValues.energyValue);

    //update values of the assets
    UpdateValues.coinsInc.value = UpdateValues.coinsInc.value + coinsChange;
    UpdateValues.coinsDec.value = UpdateValues.coinsDec.value - coinsChange;
    UpdateValues.energyInc.value = UpdateValues.energyInc.value + UpdateValues.energyValue;
    UpdateValues.energyDec.value = UpdateValues.energyDec.value - UpdateValues.energyValue;

    alert('EnergyToCoins finished!');
    console.log('EnergyToCoins hhh!');

    return getAssetRegistry('org.decentralized.energy.network.Coins')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.coinsInc,UpdateValues.coinsDec]);
        })
        .then(function () {
            return  getAssetRegistry('org.decentralized.energy.network.Energy')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.energyInc,UpdateValues.energyDec]);
            });
        });

}


/**
 * Resident to bank transaction
 * @param {org.decentralized.energy.network.CashToCoins} UpdateValues
 * @transaction
 */
function CashToCoins(UpdateValues) {

    //determine change in coins value from the rate
    var coinsChange = (UpdateValues.cashRate * UpdateValues.cashValue);

    //update values of the assets
    UpdateValues.coinsInc.value = UpdateValues.coinsInc.value + coinsChange;
    UpdateValues.coinsDec.value = UpdateValues.coinsDec.value - coinsChange;
    UpdateValues.cashInc.value = UpdateValues.cashInc.value + UpdateValues.cashValue;
    UpdateValues.cashDec.value = UpdateValues.cashDec.value - UpdateValues.cashValue;

    alert('CashToCoins finished!');
    console.log('CashToCoins hhh!');

    return getAssetRegistry('org.decentralized.energy.network.Coins')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.coinsInc,UpdateValues.coinsDec]);
        })
        .then(function () {
            return  getAssetRegistry('org.decentralized.energy.network.Cash')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.cashInc,UpdateValues.cashDec]);
            });
        });
}

/**
 * Energy to DDoS transaction
 * @param {org.decentralized.energy.network.EnergyToDDoS} UpdateValues
 * @transaction
 */
function EnergyToDDoS(UpdateValues) {

    // wirte logic here

      var energy_list = [];
      var energy_object_dict = [];
      var ip_list = [];
      var k_list = [];
      var count_list = [];
      // var submitterArray = []; // 定义存放提交异常者
      var targetCompany_list = [];
      var targetCompany_object_dict = [];  // k-v: targetcompanyID-targetIP

      var up_vecity = 0.000001; // 1s大约对应时间戳1000
      return  getAssetRegistry('org.decentralized.energy.network.Energy')
        .then(function (assetRegistry){
            return assetRegistry.getAll();
        })
        .then(function (all_assetRegistry){
            // 1. 得到所有的异常
            energy_list = all_assetRegistry;

            // 2. 统计同一目标IP的异常数
            // 分别记录 [出现相同目标IP的异常次数，第一次出现的时间，最新一次出现的时间]
            energy_list.forEach(function(element){
                if (!(element.targetIP in energy_object_dict)){
          			// 记录[出现相同targetIP的次数，第一次出现的时间，最新一次出现的时间]
                    energy_object_dict[element.targetIP] = [element.count, element.value, element.value];
                }else{
          			// 更新记录[出现相同targetIP的次数 + 当前记录的条数，第一次出现的时间，最新一次出现的时间]
                    energy_object_dict[element.targetIP][0] += element.count;
          			energy_object_dict[element.targetIP][2] = element.value;
                }
            });

            // 3. 找出所有满足要求的目标ip -> 发送的当前到所有的energy的速率的阈值判断
            for (var i in energy_object_dict){
                if (energy_object_dict[i][0] > 8){
                    var time = energy_object_dict[i][2] - energy_object_dict[i][1];
                    if (energy_object_dict[i][0] / time > up_vecity){
                        count_list.push(energy_object_dict[i][0]);
                        k_list.push(energy_object_dict[i][0] / time);
                        ip_list.push(i);
                    }
                }
            }

            // 4. 遍历energy列表，修改相应的ddos标志位flag
            energy_list.forEach(function(element){
                if (ip_list.indexOf(element.targetIP) != -1){  // !!!数组包含的写法，不能用in
                    element.flag = "1";
                }
            });
        })
        .then(function () {
            return getParticipantRegistry('org.decentralized.energy.network.TargetCompany')
                .then(function (participantRegistry) {
                    return participantRegistry.getAll();
                })
                .then(function (all_participantRegistry) {
                    // 1. 得到所有的TargetCompany
                    targetCompany_list = all_participantRegistry;

                    // 2. key-value: ID-IP
                    // 分别记录 [出现相同目标IP的异常次数，第一次出现的时间，最新一次出现的时间]
                    targetCompany_list.forEach(function (element) {
                        targetCompany_object_dict[element.targetIP] = element.utilityID;
                    });
                })
        })
        .then(function () {
            // 5. 更新修改后的energy_list
            return getAssetRegistry('org.decentralized.energy.network.Energy')
                .then(function (assetRegistry) {
                      return assetRegistry.updateAll(energy_list);
                })
                .then(function (){
                      return getAssetRegistry('org.decentralized.energy.network.DDoS')
                          .then(function (ddosAssetResident){
                              var index = 0;
                              for (var item in energy_object_dict) {
                                  // 创建factory
                                  var factory = getFactory();
                                  // 创建ddos
                                  // o String ddosID
                                  // o String targetIP
                                  // o String value
                                  // o String ownerID
                                  // o OwnerEntity ownerEntity
                                  var ddos = factory.newResource(
                                      'org.decentralized.energy.network',
                                      'DDoS',
                                      'DDOS_'+index
                                  );

                                  // energy_list.forEach(function(element){
                                  //     if (ip_list.indexOf(element.targetIP) != -1){  // !!!数组包含的写法，不能用in
                                  //         element.flag = "1";
                                  //     }
                                  // });


                                  // ddos.ddosID = 'DDOS_2';
                                  ddos.targetIP = ip_list[index]; //'127.0.0.1';
                                  ddos.time = String(Date.now());
                                  ddos.count = String(count_list[index]);
                                  ddos.k = String(k_list[index]);
                                  // ddos.abnormalsubmitters = String(submitterArray.join(','));
                                  ddos.ownerID = UpdateValues.energyInc.residentID; // "1"
                                  ddos.targetID = targetCompany_object_dict[ip_list[index]]; //"12";
                                  ddos.ownerEntity = 'Resident';


                                  ddosAssetResident.add(ddos); // return ddosAssetResident.add(ddos);
                                  index += 1;
                              }
                              return ;
                          })
                          .catch(function (error){
                              // error handling here
                              console.error(error);
                          });
               });
        });
}


/**
 * distribute coin from the target company to hub
 * @param {org.decentralized.energy.network.DistributeCoins} UpdateValues
 * @transaction
 */
 function DistributeCoins(UpdateValues) {
     var count = 0; // 一共需要奖励多少钱
     var curEnergyCount = 0; // 当前访问到的energy数
     var lastEnergyCount = 0; // 记录分析完之后最后访问到的energy数
     var submitterArray =[];
     var CoinsArray=[];
     var log_length = 0;

    // 1. 得到所有的历史Log
    return getAssetRegistry('org.decentralized.energy.network.Log')
        .then(function (assetRegistry) {
            return assetRegistry.getAll();
        })
        .then(function (allLog) {
            log_length = allLog.length;
            if (log_length >=1 ) {
                lastEnergyCount = parseInt(allLog[log_length-1].lastEnergyCount);  // !访问某个区块链资产元素，是否只能用forEach
            }
        })
         .then (function () {
            return getAssetRegistry('org.decentralized.energy.network.Energy')
                .then (function(assetRegistry){
                    return assetRegistry.getAll();
                })
         })
         .then(function(all){
            // 2. 遍历所有的Energy异常，判断是否为真正异常flag，判断TargetIP是否属于Target
            all.forEach(function (one){
               curEnergyCount += 1;
               if (curEnergyCount >= lastEnergyCount) {
                   if (one.targetIP == UpdateValues.targetCompany.targetIP) { // 判断TargetIP是否属于Target
                       if(one.flag == "1") {  // 判断energy是否为真正的异常flag
                         count = count + 1;
                         if (submitterArray.indexOf(one.ownerID) == -1){  // 判断ownerID是否已经存在
                             submitterArray.push(one.ownerID);
                         }
                       }
                   }
               }
            });
         })
         .then(function(){
            // 3. coin的交易处理
            return getAssetRegistry ('org.decentralized.energy.network.Coins')
                .then(function(assetRegistry){
                return assetRegistry.getAll();
                })
                .then(function(allCoins){
                    CoinsArray = allCoins;
                    CoinsArray.forEach(function (oneCoin){
                    //targetCompany.coins为字符串："coins": "resource:org.decentralized.energy.network.Coins#CO_12"
                        if(oneCoin.coinsID == UpdateValues.coinsDec.coinsID) { // 等于 发起者的coinid, "CO_12"
                            oneCoin.value = oneCoin.value - count;
                        }
                        if(submitterArray.indexOf(oneCoin.ownerID)!=-1){  // 等于 提交者的coinid
                            oneCoin.value = oneCoin.value + 1;
                        }
                    });
                })
         })
         .then (function(){
             // 4. 创建Log记录资产
              return getAssetRegistry('org.decentralized.energy.network.Coins')
                .then(function (assetRegistry) {
                  return assetRegistry.updateAll(CoinsArray);
              })
              .then(function (){  // 处理log数据，并分析
                   return getAssetRegistry('org.decentralized.energy.network.Log')
                       .then(function (logAssetResident){
                           var index = 0;
                           // for (index) { // 暂时不需要写循环实现，因为一次只需要提交一个奖励交易
                               // 创建factory
                               var factory = getFactory();
                               // 创建log
                               // o String logID
                               // o String targetIP
                               // o String value
                               // o String ownerID
                               // o OwnerEntity ownerEntity
                               var log = factory.newResource(
                                   'org.decentralized.energy.network',
                                   'Log',
                                   'LOG_'+(log_length+index) // 2
                               );

                               // energy_list.forEach(function(element){
                               //     if (ip_list.indexOf(element.targetIP) != -1){  // !!!数组包含的写法，不能用in
                               //         element.flag = "1";
                               //     }
                               // });


                               // log.logID = 'LOG_2';
                               log.targetIP = UpdateValues.targetCompany.targetIP; //"192.168.1.1"; //'127.0.0.1';
                               log.value = String(submitterArray.join(','));
                               log.time = String(Date.now());
                               log.ownerID = UpdateValues.targetCompany.utilityID; // "1"
                               log.targetID = UpdateValues.targetCompany.utilityID; //"12";
                               log.lastEnergyCount = '0'; //用0效率很低，String(curEnergyCount);
                               log.ownerEntity = 'TargetCompany';

                               return logAssetResident.add(log); //return logAssetResident.add(log);
                               // index += 1;
                           // }

                           // return ;
                       })
                       .catch(function (error){
                           // error handling here
                           console.error(error);
                       });
              });
         });
 }
