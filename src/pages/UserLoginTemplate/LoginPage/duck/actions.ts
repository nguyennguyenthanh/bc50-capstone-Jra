import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, User, Result } from "./types";

export const loginData = (user: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actLoginRequest());
    api.post('Users/signin', user)
      .then((result: Result<User>) => {
        if (result.data.statusCode === 200) {
          dispatch(actLoginSuccess(result.data.content));
          localStorage.setItem('UserLogin', JSON.stringify(result.data.content));
          alert(result.data.message)
          navigate('/', { replace: true })
        }
      })
      .catch((error: any) => {
        dispatch(actLoginFail(error));
      })
  }
}



const actLoginRequest = (): Action => ({
  type: ActionTypes.USER_LOGIN_REQUEST
});

const actLoginSuccess = (data: User[]): Action => ({
  type: ActionTypes.USER_LOGIN_REQUEST,
  payload: data
})

const actLoginFail = (error: any): Action => ({
  type: ActionTypes.USER_LOGIN_FAIL,
  payload: error
})

