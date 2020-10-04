import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AddPartyComponent } from './components/add-party/add-party.component';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { VotingScreenComponent } from './components/voting-screen/voting-screen.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreModule } from '@ngrx/store';
//import { reducers } from './store/auth.state';
import { VoterRouteGuard, AdminRouteGuard } from './auth.guard';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { initialState, State, rootReducer} from './store/auth.reducers';
import { AppState, initialAppState } from './store/auth.state';
import { ConfirmComponent } from './components/confirm/confirm.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AddPartyComponent,
    AddCandidateComponent,
    AddVoterComponent,
    VotingScreenComponent,
    AdminDashboardComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatIconModule,
    MatTabsModule,
    //EffectsModule,
    NgReduxModule,
    MatDialogModule
    //StoreModule.forRoot(reducers, {})
  ],
  providers: [AdminRouteGuard,VoterRouteGuard],
  entryComponents: [ConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (ngRedux: NgRedux<State>) {
    console.log("Initializing store");
    ngRedux.configureStore(rootReducer, initialState);
  }
}
