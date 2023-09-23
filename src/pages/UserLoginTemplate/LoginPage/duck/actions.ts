import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, User, Result } from "./types";
import Swal from 'sweetalert2';


export const loginData = (user: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actLoginRequest());
    api.post('Users/signin', user)
      .then((result: Result<User>) => {
        if (result.data.statusCode === 200) {
          dispatch(actLoginSuccess(result.data.content));
          localStorage.setItem('UserLogin', JSON.stringify(result.data.content));
          navigate('/', { replace: true })
        }
      })
      .catch((error: any) => {
        dispatch(actLoginFail(error));
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password or ID is wrong',
        })
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

export const actLogout = (navigate: any) => {
  if (localStorage.getItem('UserLogin')) {
    localStorage.removeItem('UserLogin')
    navigate('/', { replace: true })
  }
  return {
    type: ActionTypes.AUTH_CLEAR
  }
}
