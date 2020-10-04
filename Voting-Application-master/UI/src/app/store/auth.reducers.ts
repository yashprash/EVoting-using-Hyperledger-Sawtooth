import { Voter } from './auth.model';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
    voter: Voter | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    voter: null,
    errorMessage: null
  };

 
export function rootReducer(state = initialState, action): State {
    switch (action.type) {
      case LOGIN_SUCCESS: {
        console.log("login success");
        return {
          ...state,
          isAuthenticated: true,
          voter: {
              userType: action.userType,
            voterId: action.voterId,
            constituency: action.constituencyId
          },
          errorMessage: null
        };
      }
      case LOGIN_FAILURE: {
          return {
              ...state,
              isAuthenticated: false,
              voter: null,
              errorMessage: "Incorrect voter Id/ password"
          };
      }
      case LOGOUT: {
          return initialState;
      }
      default: {
        return state;
      }
    }
  }