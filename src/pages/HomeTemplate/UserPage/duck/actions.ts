import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, AllUsers, Result } from './types';


export const fetchAllUser = (keyword: any = 0) => {
  return (dispatch: any) => {
    dispatch(actAllUserRequest());
    if (keyword !== 0 && keyword > 0) {
      return api.get(`Users/getUser?keyword=${keyword}`, keyword)
        .then((result: Result<AllUsers>) => {  
          dispatch(actAllUserSuccess(result.data.content));
        })
        .catch((error) => {
          dispatch(actAllUserFail(error));
        })
    }
    return api.get("Users/getUser")
      .then((result: Result<AllUsers>) => {
        dispatch(actAllUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actAllUserFail(error));
      })
  }
}

export const DeleteUser = (id: any) => {
  return (dispatch: any) => {
    dispatch(actDeleteUserRequest());
    api.delete(`Users/deleteUser?id=${id}`)
      .then((result: Result<AllUsers>) => {
        dispatch(actDeleteUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDeleteUserFail(error));
      })
  }
}

export const UpdateUser = (user: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actUpdateUserRequest());
    const formatUser = { ...user, id: user.userId }
    api.put('Users/editUser', formatUser)
      .then((result: Result<AllUsers>) => {
        if (result.data.statusCode === 200) {
          dispatch(actUpdateUserSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actUpdateUserFail(error));
      })
  }
}

// Get Api User to ProjectPage
export const getApiUser = (keyword: any = 0) => {
  return (dispatch: any) => {
    dispatch(actAllUserRequest());
    api.get(`Users/getUser?keyword=${keyword}`, keyword)
      .then((result: Result<AllUsers>) => {
        dispatch(actGetApiUser(result.data.content));
      })
      .catch((error) => {
        dispatch(actAllUserFail(error));
      })
  }
}

//FETCH LIST US
const actAllUserRequest = (): Action => ({ type: ActionTypes.ALL_USER_REQUEST });
const actAllUserSuccess = (data: AllUsers[]): Action => ({
  type: ActionTypes.ALL_USER_SUCCESS,
  payload: data
});
const actAllUserFail = (error: any) => ({
  type: ActionTypes.ALL_USER_FAIL,
  payload: error
});

//UPDATE US
const actUpdateUserRequest = (): Action => ({ type: ActionTypes.UPDATE_USER_REQUEST });
const actUpdateUserSuccess = (dataUpdate: AllUsers[]): Action => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload: dataUpdate
});
const actUpdateUserFail = (error: any) => ({
  type: ActionTypes.UPDATE_USER_FAIL,
  payload: error
});

export const actUpdateSelectUser = (dataUpdate: AllUsers[]): Action => {
  return {
    type: ActionTypes.SELECT_USER,
    payload: dataUpdate
  }
}

//DELETE US
const actDeleteUserRequest = (): Action => ({ type: ActionTypes.DELETE_USER_REQUEST });
const actDeleteUserSuccess = (dataDelete: AllUsers[]): Action => ({
  type: ActionTypes.DELETE_USER_SUCCESS,
  payload: dataDelete
});
const actDeleteUserFail = (error: any) => ({
  type: ActionTypes.DELETE_USER_FAIL,
  payload: error
});

//GET USER API TO PJPage

export const actGetApiUser = (data: AllUsers[]): Action => {
  return {
    type: ActionTypes.GET_USER_SEARCH,
    payload: data
  }
}
