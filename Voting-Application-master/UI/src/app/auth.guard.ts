import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminRouteGuard implements CanActivate {

    constructor(private auth: AuthService) {
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      console.log("In can activate");
    return this.auth.checkAdminAuth();
  }
}

@Injectable()
export class VoterRouteGuard implements CanActivate {

    constructor(private auth: AuthService) {
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("In can activate");
    return this.auth.checkVoterAuth();
  }
}