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

    //determine change in coins value from the rate
    // var coinsChange = (UpdateValues.energyRate * UpdateValues.energyValue);

    // wirte logic here
    // 1. new DDoS
    // var energy_list = getAssetRegistry('org.decentralized.energy.network.Energy');
    // var energy_object_dict = {};
    // for (var i=0; i < energy_list.length; i++){
    //     if (!(energy_list[i].units in energy_object_dict)){
    //       energy_object_dict[energy_list[i].units] = 1;
    //     }else{
    //       energy_object_dict[energy_list[i].units] += 1;
    //     }
    // }
    UpdateValues.energyInc.flag = "1"; //String(666);
    // if (energy_list.lenght > 1){
    //     UpdateValues.energyInc.flag = String(energy_list.length);
    // }
    //
    // if (energy_object_dict.length > 1){
    //     UpdateValues.energyInc.flag = String(energy_object_dict.length * 10);
    // }
    // for (var i in energy_object_dict){
    //     if (energy_object_dict[i] > 1){
    //         // alert(i + ":" + energy_object_dict[i]);
    //         UpdateValues.energyInc.flag = String(2);//Date.now(); //"1";
    //     }
    //     UpdateValues.energyInc.flag = String(3);
    // }

// UpdateValues.energyInc.flag = Date.now();
    // alert('EnergyToDDoS finished!');
    // console.log('EnergyToDDoS hhh!');

    // 2. change Energy
    // for (var i=0; i < energy_list.lenght; i++){
    //     if (energy_list[i].ddosDec.value in energy_object_dict){
    //       getAssetRegistry('org.decentralized.energy.network.Energy')
    //       .then(function (assetRegistry) {
    //           return assetRegistry.updateAll([UpdateValues.cashInc,UpdateValues.cashDec]);
    //       });
    //     }
    // }

    //update values of the assets
    // UpdateValues.energyInc.flag = "5";
    // UpdateValues.energyInc.flag = "1";
    // UpdateValues.energyDec.flag = UpdateValues.energyDec.flag; // - UpdateValues.energyValue;

    // return getAssetRegistry('org.decentralized.energy.network.DDoS')
    //     .then(function (assetRegistry) {
    //         return assetRegistry.updateAll([UpdateValues.ddosInc,UpdateValues.ddosDec]);
    //     })
    //     .then(function () {
            return  getAssetRegistry('org.decentralized.energy.network.Energy')
              // .then(function (assetRegistry){
                // var energy_list = assetRegistry;
                // var energy_object_dict = {};
                // for (var i=0; i < energy_list.length; i++){
                //     if (!(energy_list[i].units in energy_object_dict)){
                //       energy_object_dict[energy_list[i].units] = 1;
                //     }else{
                //       energy_object_dict[energy_list[i].units] += 1;
                //     }
                // }
                // UpdateValues.energyInc.flag = String(666);
                // if (energy_list.lenght > 1){
                //     UpdateValues.energyInc.flag = String(energy_list.length);
                // }
                //
                // if (energy_object_dict.length > 1){
                //     UpdateValues.energyInc.flag = String(energy_object_dict.length * 10);
                // }
                // var ip_list = [];
                // for (var i in energy_object_dict){
                //     if (energy_object_dict[i] > 1){
                //         // alert(i + ":" + energy_object_dict[i]);
                //         // UpdateValues.energyInc.flag = String(222);//Date.now(); //"1";
                //         ip_list.push(i);
                //     }
                //     // UpdateValues.energyInc.flag = String(333);
                // }
                //
                // energy_inc_list = [];
                // if (ip_list.length < 1){
                //     energy_inc_list = [1, 2, 4];
                // }
                // for (var i; i < energy_list.length; i++){
                //     if (!(energy_list[i].units in ip_list)){
                //         // energy_list[i].flag = "888";
                //         // energy_inc_list.push(energy_list[i]);
                //     }else{
                //         energy_list[i].flag = "888";
                //         energy_inc_list.push(energy_list[i]);
                //     }
                //     energy_list[i].flag = "888";
                //     energy_inc_list.push(energy_list[i]);
                // }
              //   return energy_inc_list;
              // })
              .then(function (assetRegistry) {
                    return assetRegistry.updateAll([UpdateValues.energyInc]);
              });
        // });

}


/**
 * distribute coin from the target company to hub
 * @param {org.decentralized.energy.network.DistributeCoins} UpdateValues
 * @transaction
 */
function DistributeCoins(UpdateValues) {



    //update values of the assets
    UpdateValues.coinsInc.value = UpdateValues.coinsInc.value + 1;
    UpdateValues.coinsDec.value = UpdateValues.coinsDec.value - 1;


    return getAssetRegistry('org.decentralized.energy.network.Coins')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.coinsInc,UpdateValues.coinsDec]);
        });


}
