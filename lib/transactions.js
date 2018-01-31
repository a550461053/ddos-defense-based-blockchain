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
    energy_list = getAssetRegistry('org.decentralized.energy.network.Energy');
    energy_object_dict = {};
    for (var i=0; i < energy_list.length; i++){
        if (energy_list[i].ddosDec.value not in energy_object_dict){
          energy_object_dict[energy_list[i].ddosDec.value] = 1;
        }else{
          energy_object_dict[energy_list[i].ddosDec.value] += 1;
        }
    }

    for (var i in energy_object_dict){
      if (energy_object_dict[i] > 3){
        alert(i + ":" + energy_object_dict[i]);
      }
    }

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
    // UpdateValues.ddosInc.value = UpdateValues.ddosInc.value + coinsChange;
    // UpdateValues.ddosDec.value = UpdateValues.ddosDec.value - coinsChange;
    // UpdateValues.energyInc.value = UpdateValues.energyInc.value + UpdateValues.energyValue;
    // UpdateValues.energyDec.value = UpdateValues.energyDec.value - UpdateValues.energyValue;

    return getAssetRegistry('org.decentralized.energy.network.DDoS')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.ddosInc,UpdateValues.ddosDec]);
        })
        .then(function () {
            return  getAssetRegistry('org.decentralized.energy.network.Energy')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.energyInc,UpdateValues.energyDec]);
            });
        });

}
