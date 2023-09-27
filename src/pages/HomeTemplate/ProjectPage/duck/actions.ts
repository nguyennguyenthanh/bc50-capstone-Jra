import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, AllProjects, Result } from './types';
import Swal from 'sweetalert2';

export const fetchAllProject = (id: any = 0) => {
  return (dispatch: any) => {
    dispatch(actAllProjectRequest());
    if (id !== 0 && id > 0) {
      return api.get(`Project/getAllProject?keyword=${id}`, id)
        .then((result: Result<AllProjects>) => {
          dispatch(actAllProjectSuccess(result.data.content));
        })
        .catch((error) => {
          dispatch(actAllProjectFail(error));
        })
    }
    return api.get("Project/getAllProject")
      .then((result: Result<AllProjects>) => {
        dispatch(actAllProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actAllProjectFail(error));
      })
  }
}

export const DeleteProject = (id: any) => {
  return (dispatch: any) => {
    dispatch(actDeleteProjectRequest());
    api.delete(`Project/deleteProject?projectId=${id}`)
      .then((result: Result<AllProjects>) => {
        dispatch(actDeleteProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDeleteProjectFail(error));
      })
  }
}

export const UpdateProject = (value: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actUpdateProjectRequest());
    api.put(`Project/updateProject?projectId=${value.id}`, value)
      .then((result: Result<AllProjects>) => {
        dispatch(actUpdateProjectSuccess(result.data.content));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Update Project Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/", { replace: true });
      })
      .catch((error) => {
        dispatch(actUpdateProjectFail(error));
      })
  }
}

export const assignUserProject = (userProject: any) => {
  return (dispatch: any) => {
    dispatch(actassignUserProjectRequest());
    api.post("Project/assignUserProject", userProject)
      .then((result: Result<AllProjects>) => {
        dispatch(actassignUserProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actassignUserProjectFail(error));
      })
  }
}

//FETCH LIST PJ
const actAllProjectRequest = (): Action => ({ type: ActionTypes.ALL_PROJECT_REQUEST });
const actAllProjectSuccess = (data: AllProjects[]): Action => ({
  type: ActionTypes.ALL_PROJECT_SUCCESS,
  payload: data
});
const actAllProjectFail = (error: any) => ({
  type: ActionTypes.ALL_PROJECT_FAIL,
  payload: error
});

//UPDATE PJ
const actUpdateProjectRequest = (): Action => ({ type: ActionTypes.UPDATE_PROJECT_REQUEST });
const actUpdateProjectSuccess = (dataUpdate: AllProjects[]): Action => ({
  type: ActionTypes.UPDATE_PROJECT_SUCCESS,
  payload: dataUpdate
});
const actUpdateProjectFail = (error: any) => ({
  type: ActionTypes.UPDATE_PROJECT_FAIL,
  payload: error
});

export const actUpdateSelectProject = (dataUpdate: AllProjects[]): Action => {
  return {
    type: ActionTypes.SELECT_PROJECT,
    payload: dataUpdate
  }
}

//DELETE PJ
const actDeleteProjectRequest = (): Action => ({ type: ActionTypes.DELETE_PROJECT_REQUEST });
const actDeleteProjectSuccess = (dataDelete: AllProjects[]): Action => ({
  type: ActionTypes.DELETE_PROJECT_SUCCESS,
  payload: dataDelete
});
const actDeleteProjectFail = (error: any) => ({
  type: ActionTypes.DELETE_PROJECT_FAIL,
  payload: error
});

//DELETE PJ
const actassignUserProjectRequest = (): Action => ({ type: ActionTypes.ASSIGN_USER_REQUEST });
const actassignUserProjectSuccess = (userProject: AllProjects[]): Action => ({
  type: ActionTypes.ASSIGN_USER_SUCCESS,
  payload: userProject
});
const actassignUserProjectFail = (error: any) => ({
  type: ActionTypes.ASSIGN_USER_FAIL,
  payload: error
});
