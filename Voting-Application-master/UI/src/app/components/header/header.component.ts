import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { AppState, selectAuthState } from '../../store/auth.state';
import {LOGOUT} from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';
import { State } from '../../store/auth.reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() show;
  @select() isAuthenticated;
  getState: Observable<any>;
  constructor(private router: Router, private store: NgRedux<State>, private snackbar: MatSnackBar, private spinner: NgxSpinnerService) { 
    //this.getState=this.store.select(selectAuthState);
  }

  ngOnInit() {
    console.log(this.isAuthenticated);
    this.isAuthenticated.subscribe(state=>{
      //console.log("Is Authenticated", state);
    })
  }

  logout(){
    this.spinner.show();
    this.store.dispatch({type: LOGOUT});
    this.snackbar.open("Logged out!", null, {
      duration: 5000,
      panelClass: ['green-snackbar']
    });
    this.router.navigate(['/home']);
    this.spinner.hide();
  }

}
