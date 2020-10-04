import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppState, selectAuthState } from '../store/auth.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { State } from '../store/auth.reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //getState: Observable<any>;
  @select() isAuthenticated;
  @select() voter;
  constructor(private store: NgRedux<State>, private router: Router) { }

  checkAdminAuth(): Observable<boolean>{
    return this.isAuthenticated.flatMap(res=>{
      if(res==true)
      {
        return this.voter.map(res=>{
          if(res.userType=='admin')
          {
            return true;
          }
          else
          {
            this.router.navigate(['/home']);
            return false;
          }
        })
      }
      else
      {
        this.router.navigate(['/home']);
        return false;
      }
    });
    // this.getState=this.store.select(selectAuthState);
    // return this.getState.map(state=>{
    //     if(state.isAuthenticated==true && state.voter.userType=='admin')
    //     {
    //         return true;
    //     }
    //     else    
    //     {
    //       this.router.navigate(['/home']);
    //       return false;
    //     }
    // });
    // this.store.select(selectAuthState).toPromise().then(state=>{
    //   if(state.authState.isAuthenticated==true && state.authState.voter.userType=='admin')
    //   {
    //     console.log("in true");
    //     return true;
    //   }
    //   else{
    //     console.log("false");
    //     // this.router.navigate(['/home']);
    //     return false;
    //     //return this.router.createUrlTree(['/home']);
    //   }
    // })
  }

  checkVoterAuth(): Observable<boolean> {
    return this.isAuthenticated.flatMap(res1=>{
      //console.log(res1);
      if(res1==true)
      {
        //console.log("before second map")
        return this.voter.map(res2=>{
          //console.log(res2);
          if(res2.userType=='voter')
          {
            //console.log("true in checkVoterAuth");
            return true;
          }
          else
          {
            this.router.navigate(['/home']);
            return false;
          }
        })
      }
      else
      {
        this.router.navigate(['/home']);
        return false;
      }
    });
    // this.getState=this.store.select(selectAuthState);
    // return this.getState.map(state=>{
    //     if(state.isAuthenticated==true && state.voter.userType=='voter')
    //     {
    //         return true;
    //     }
    //     else    
    //     {
    //       this.router.navigate(['/home']);   
    //         return false;
    //     }
    // });
  //   this.store.select(selectAuthState).toPromise().then(state=>{
  //     if(state.authState.isAuthenticated==true && state.authState.voter.userType=='voter')
  //     {
  //       console.log("in true");
  //       return true;
  //     }
  //     else{
  //       console.log("false");
  //       // this.router.navigate(['/home']);
  //       return false;
  //       //return this.router.createUrlTree(['/home']);
  //     }
  //   })
  }
}
