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
                    energy_object_dict[element.targetIP] = [1, element.value, element.value];
                }else{
          					// 更新记录[出现相同targetIP的次数 + 1，第一次出现的时间，最新一次出现的时间]
                    energy_object_dict[element.targetIP][0] += 1;
          					energy_object_dict[element.targetIP][2] = element.value;
                }
            });

            // 3. 找出所有满足要求的目标ip -> 发送的当前到所有的energy的速率的阈值判断
            for (var i in energy_object_dict){
                if (energy_object_dict[i][0] > 1){
                    var time = energy_object_dict[i][2] - energy_object_dict[i][1];
                    if (energy_object_dict[i][0] / time > up_vecity){
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
            // 5. 更新修改后的energy_list
            return getAssetRegistry('org.decentralized.energy.network.Energy')
                .then(function (assetRegistry) {
                      return assetRegistry.updateAll(energy_list);
                })
                .then(function (){
                      return getAssetRegistry('org.decentralized.energy.network.DDoS')
                          .then(function (ddosAssetResident){
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
                                  'DDOS_2'
                              );

                              // energy_list.forEach(function(element){
                              //     if (ip_list.indexOf(element.targetIP) != -1){  // !!!数组包含的写法，不能用in
                              //         element.flag = "1";
                              //     }
                              // });


                              // ddos.ddosID = 'DDOS_2';
                              ddos.targetIP = ip_list[0]; //'127.0.0.1';
                              ddos.value = String(Date.now());
                              ddos.ownerID = UpdateValues.energyInc.residentID; // "1"
                              ddos.targetID = "12";
                              ddos.ownerEntity = 'Resident';

                              return ddosAssetResident.add(ddos);
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
     var count = 0;
     var submitterArray =[];
     var CoinsArray=[];
     return getAssetRegistry ('org.decentralized.energy.network.Energy')
         .then (function(assetRegistry){
           return assetRegistry.getAll();
         })
         .then(function(all){
           // 遍历所有的Energy异常，判断是否为真正异常flag，判断TargetIP是否属于Target
           all.forEach(function (one){
             if (one.targetIP == UpdateValues.targetCompany.targetIP) { // 判断TargetIP是否属于Target
               if(one.flag == "1") {  // 判断energy是否为真正的异常flag
                 count = count + 1;
                 if (submitterArray.indexOf(one.ownerID) == -1){  // 判断ownerID是否已经存在
                    submitterArray.push(one.ownerID);
                 }
               }
             }
           });
         })
         .then(function(){

          return getAssetRegistry ('org.decentralized.energy.network.Coins')
           .then(function(assetRegistry){
               return assetRegistry.getAll();
          })
         .then(function(allCoins){
           CoinsArray = allCoins;
           CoinsArray.forEach(function (oneCoin){
             if(oneCoin.coinsID == "CO_12")
              oneCoin.value = oneCoin.value - count;
             if(submitterArray.indexOf(oneCoin.ownerID)!=-1){
               oneCoin.value = oneCoin.value + 1;
             }
           });

         })
        }).then (function(){
          return getAssetRegistry('org.decentralized.energy.network.Coins')
            .then(function (assetRegistry) {
              return assetRegistry.updateAll(CoinsArray);
         })
         .then(function (){
               return getAssetRegistry('org.decentralized.energy.network.Log')
                   .then(function (logAssetResident){
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
                           'LOG_2'
                       );

                       // energy_list.forEach(function(element){
                       //     if (ip_list.indexOf(element.targetIP) != -1){  // !!!数组包含的写法，不能用in
                       //         element.flag = "1";
                       //     }
                       // });


                       // log.logID = 'LOG_2';
                       log.targetIP = "192.168.1.1"; //'127.0.0.1';
                       log.value = String(submitterArray.join(','));
                       log.ownerID = UpdateValues.targetCompany.utilityID; // "1"
                       log.targetID = "12";
                       log.ownerEntity = 'TargetCompany';

                       return logAssetResident.add(log);
                   })
                   .catch(function (error){
                       // error handling here
                       console.error(error);
                   });
        });
 });
 }
