import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, AllProjects, Result } from './types';


export const fetchAllProject = () => {
  return (dispatch: any) => {
    dispatch(actAllProjectRequest());
    api.get("Project/getAllProject")
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
