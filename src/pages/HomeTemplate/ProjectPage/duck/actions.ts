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


const actAllProjectRequest = (): Action => ({ type: ActionTypes.ALL_PROJECT_REQUEST });
const actAllProjectSuccess = (data: AllProjects[]): Action => ({
  type: ActionTypes.ALL_PROJECT_SUCCESS,
  payload: data
});
const actAllProjectFail = (error: any) => ({
  type: ActionTypes.ALL_PROJECT_FAIL,
  payload: error
});