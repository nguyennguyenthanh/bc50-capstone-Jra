import { UserRegister, Action, Result } from './types';
import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import Swal from 'sweetalert2';

export const registerData = (user: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actRegisterRequest());
    api.post('Users/signup', user)
      .then((result: Result<UserRegister>) => {
        if (result.data.statusCode === 200) {
          dispatch(actRegisterSuccess(result.data.content));
          localStorage.setItem('UserLogin', JSON.stringify(result.data.content));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Create New Account Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/user-login/auth', { replace: true })
        }
      })
      .catch((error: any) => {
        dispatch(actRegisterFail(error));
      })
  }
}


const actRegisterRequest = (): Action => ({
  type: ActionTypes.USER_REGISTER_REQUEST,
})

const actRegisterSuccess = (data: UserRegister[]): Action => ({
  type: ActionTypes.USER_REGISTER_SUCCESS,
  payload: data
})

const actRegisterFail = (error: any) => ({
  type: ActionTypes.USER_REGISTER_FAIL,
  payload: error
})