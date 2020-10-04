// import { Action } from '@ngrx/store';


// export enum AuthActionTypes {
//   LOGIN = '[Auth] Login',
//   LOGIN_SUCCESS = '[Auth] Login Success',
//   LOGIN_FAILURE='[Auth] Login Failure',
//   LOGOUT='[Auth] Logout'
// }

// export class LogIn implements Action {
//   readonly type = AuthActionTypes.LOGIN;
//   constructor(public payload: any) {}
// }

// export class LogInSuccess implements Action {
//   readonly type = AuthActionTypes.LOGIN_SUCCESS;
//   constructor(public payload: any) {}
// }

// export class LogInFailure implements Action{
//     readonly type=AuthActionTypes.LOGIN_FAILURE;
//     constructor(public payload: any){}
// }

// export class Logout implements Action{
//     readonly type=AuthActionTypes.LOGOUT;
// }

// export type All =
//   | LogIn
//   | LogInSuccess
//   | LogInFailure
//   | Logout;

export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const LOGIN_FAILURE='LOGIN_FAILURE';
export const LOGOUT='LOGOUT';