import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { CoinsComponent } from './Coins/Coins.component';
import { EnergyComponent } from './Energy/Energy.component';
import { CashComponent } from './Cash/Cash.component';
import { DDoSComponent } from './DDoS/DDoS.component';
import { LogComponent } from './Log/Log.component';

import { ResidentComponent } from './Resident/Resident.component';
import { BankComponent } from './Bank/Bank.component';
import { TargetCompanyComponent } from './TargetCompany/TargetCompany.component';

import { TransactionRRComponent } from './TransactionRR/TransactionRR.component';
import { TransactionRUComponent } from './TransactionRU/TransactionRU.component';
import { TransactionRBComponent } from './TransactionRB/TransactionRB.component';
import { TransactionDDOSComponent } from './TransactionDDOS/TransactionDDOS.component';
import { DistributeCoinsComponent } from './DistributeCoins/DistributeCoins.component';

import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

// import { BaiduMapModule } from "angular2-baidu-map";

// import { BaiduComponent } from './baidu/baidu.component';

// import { SystemInfoComponent } from "./SystemInfo/SystemInfo.component";

const routes: Routes = [
	// {path: '', component: SystemInfoComponent},
    {path: '', component: HomeComponent},

    // {path: 'Baidu', component: BaiduComponent},

    {path: 'About', component: AboutComponent},

		{ path: 'Coins', component: CoinsComponent},
		{ path: 'Energy', component: EnergyComponent},
		{ path: 'Cash', component: CashComponent},
    { path: 'DDoS', component: DDoSComponent},
    { path: 'Log', component: LogComponent},

    { path: 'Resident', component: ResidentComponent},
    { path: 'Bank', component: BankComponent},
    { path: 'TargetCompany', component: TargetCompanyComponent},

    { path: 'TransactionRR', component: TransactionRRComponent },
    { path: 'TransactionRU', component: TransactionRUComponent },
    { path: 'TransactionRB', component: TransactionRBComponent },
    { path: 'TransactionDDOS', component: TransactionDDOSComponent },
    { path: 'DistributeCoins', component: DistributeCoinsComponent },
    { path: 'AllTransactions', component: AllTransactionsComponent },

		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
