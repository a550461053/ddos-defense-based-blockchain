import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { CountdownTimerComponent } from './countdown-timer.component'

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { CoinsComponent } from './Coins/Coins.component';
import { EnergyComponent } from './Energy/Energy.component';
import { CashComponent } from './Cash/Cash.component';
import { DDoSComponent } from './DDoS/DDoS.component';

import { ResidentComponent } from './Resident/Resident.component';
import { BankComponent } from './Bank/Bank.component';
import { UtilityCompanyComponent } from './UtilityCompany/UtilityCompany.component';

import { TransactionRRComponent } from './TransactionRR/TransactionRR.component';
import { TransactionRUComponent } from './TransactionRU/TransactionRU.component';
import { TransactionRBComponent } from './TransactionRB/TransactionRB.component';
import { TransactionDDOSComponent } from './TransactionDDOS/TransactionDDOS.component';
import { DistributeCoinsComponent } from './DistributeCoins/DistributeCoins.component';

import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,

    TransactionRRComponent,
    TransactionRUComponent,
    TransactionRBComponent,
    TransactionDDOSComponent,
    DistributeCoinsComponent,
    AllTransactionsComponent,

    ResidentComponent,
    BankComponent,
    UtilityCompanyComponent,

    CoinsComponent,
		EnergyComponent,
    CashComponent,
    DDoSComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
