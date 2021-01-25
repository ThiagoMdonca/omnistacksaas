import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token'],
  signOut: null,
  signUpRequest: ['name', 'email', 'password'],
  getPermissionsSuccess: ['roles', 'permissions'],
});

export const AuthTypes = Types;

export default Creators;

export const INITIAL_STATE = Immutable({
  signedIn: !!localStorage.getItem('@Omni:token'),
  token: localStorage.getItem('@Omni:token') || null,
  roles: [],
  permissions: [],
});

export const success = (state, { token }) => {
  return state.merge({ signedIn: true, token });
};
export const logout = state => state.merge({ signedIn: false, token: null });

export const permissionsSuccess = (state, { roles, permissions }) => {
  return state.merge({ roles, permissions });
};
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_OUT]: logout,
  [Types.GET_PERMISSIONS_SUCCESS]: permissionsSuccess,
});
