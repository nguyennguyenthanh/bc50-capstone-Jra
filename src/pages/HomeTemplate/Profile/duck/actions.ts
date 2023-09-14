import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, ProfileUser, Result } from './types';
import Swal from 'sweetalert2';


export const fetchProfileUser = () => {
  return (dispatch: any) => {
    dispatch(actProfileUserRequest());
    api.get(`Users/getUser`)
      .then((result: Result<ProfileUser>) => {
        if (result.data.statusCode === 200) {
          dispatch(actProfileUserSuccess(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actProfileUserFail(error));
      })
  }
}

export const actGetProfileUser = (profile: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actUpdateProfileUserRequest());
    api.put(`Users/editUser`, profile)
      .then((result: Result<ProfileUser>) => {
        if (result.data.statusCode === 200) {
          dispatch(actUpdateProfileUserSuccess(result.data.content));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Profile Update Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch((error: any) => {
        dispatch(actUpdateProfileUserFail(error));
      })
  }
}



const actProfileUserRequest = (): Action => ({ type: ActionTypes.PROFILE_USER_REQUEST });
const actProfileUserSuccess = (data: ProfileUser[]): Action => ({
  type: ActionTypes.PROFILE_USER_SUCCESS,
  payload: data
});
const actProfileUserFail = (error: any) => ({
  type: ActionTypes.PROFILE_USER_FAIL,
  payload: error
});

export const actProfileUser = (data: ProfileUser): Action => ({
  type: ActionTypes.PROFILE_USER,
  payload: data
});

//Update Profile

const actUpdateProfileUserRequest = (): Action => ({ type: ActionTypes.UPDATE_PROFILE_USER_REQUEST });
const actUpdateProfileUserSuccess = (dataUpdate: ProfileUser[]): Action => ({
  type: ActionTypes.UPDATE_PROFILE_USER_SUCCESS,
  payload: dataUpdate
});
const actUpdateProfileUserFail = (error: any) => ({
  type: ActionTypes.UPDATE_PROFILE_USER_FAIL,
  payload: error
});
