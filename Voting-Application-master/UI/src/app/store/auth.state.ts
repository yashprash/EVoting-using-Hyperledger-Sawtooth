import * as auth from './auth.reducers';
import { createFeatureSelector } from '@ngrx/store';
import {initialState} from './auth.reducers';

export interface AppState{
    authState: auth.State;
}

export const initialAppState={
    authState: initialState
};

// export const reducers={
//     auth: auth.rootReducer
// }

//export const selectAuthState = createFeatureSelector<auth.State>('auth');
