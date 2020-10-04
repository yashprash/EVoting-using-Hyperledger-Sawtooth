import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataAccessService } from 'src/app/services/data-access.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AppState} from '../../store/auth.state';
import { NgRedux, select } from '@angular-redux/store';
import { State } from '../../store/auth.reducers'; 
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../../store/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @select() isAuthenticated;
  @select() voter;
  loginForm = this.fb.group({
    voterId: ['',Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private dataAccess: DataAccessService, private snackbar: MatSnackBar, private router: Router,
    private store: NgRedux<AppState>) { }

  ngOnInit() {
  }

  onSubmit(){
    //console.log(this.loginForm.value);
    this.spinner.show();
    this.dataAccess.login(this.loginForm.value).then(res=>{
      if(res['user']=="voter"){
      this.snackbar.open("Welcome to the e-voting portal", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      //this.store.dispatch(new LogInSuccess({userType: res['user'],voterId: res['voterId'], constituencyId: res['constituencyId']}))
      this.store.dispatch({type: LOGIN_SUCCESS, userType: res['user'],voterId: res['voterId'], constituencyId: res['constituencyId']});
      this.spinner.hide();
      this.isAuthenticated.subscribe(result=>{
        console.log(result);
        this.voter.subscribe(vot=>{
          console.log(vot);
        })
        this.router.navigate(['/voting']);
      }) 
    }
    else if(res['user']=="admin")
    {
      this.snackbar.open("Welcome admin", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      //this.store.dispatch(new LogInSuccess({userType: res['user'],voterId: res['user'], constituencyId: res['constituencyId']}))
      this.store.dispatch({type: LOGIN_SUCCESS, userType: res['user'],voterId: res['voterId'], constituencyId: res['constituencyId']});
      this.spinner.hide();
      this.isAuthenticated.subscribe(res=>{
        console.log(res);
      })
      this.router.navigate(['/admin']);
    }
    else
    {
      this.snackbar.open("Invalid! Please try again", null, {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      //this.store.dispatch(new LogInFailure({userType: null,voterId: null, constituencyId: null}));
      this.store.dispatch({type: LOGIN_FAILURE, userType: null,voterId: null, constituencyId: null});
      this.spinner.hide();
    }
    })
  }
}
