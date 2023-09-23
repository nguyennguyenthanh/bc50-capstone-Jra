import { Action, CreateProject, ProjectCategory, Result } from './types';
import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import Swal from 'sweetalert2';

export const fetchProjectCategory = () => {
  return (dispatch: any) => {
    dispatch(actProjectCategoryRequest());
    api.get('ProjectCategory')
      .then((result: Result<ProjectCategory>) => {
        dispatch(actProjectCategorySuccess(result.data.content));
      })
      .catch((error: any) => {
        dispatch(actProjectCategoryFail(error));
      })
  }
}
export const actCreateProject = (project: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actCreateProjectRequest());
    api.post('Project/createProjectAuthorize', project)
      .then((result: Result<CreateProject>) => {
        if (result.data.statusCode === 200) {
          dispatch(actCreateProjectSuccess(result.data.content));
          alert(result.data.message);
          navigate('/', { replace: true });
        }
      })
      .catch((error: any) => {
        if (!localStorage.getItem('UserLogin')) {
          dispatch(actCreateProjectFail(error));
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login Please!!!',
          })
          navigate('/user-login/auth', { replace: true });
        }
      })
  }
}

const actProjectCategoryRequest = (): Action => ({ type: ActionTypes.PROJECT_CATEGORY_REQUEST });

const actProjectCategorySuccess = (data: ProjectCategory[]): Action => ({
  type: ActionTypes.PROJECT_CATEGORY_SUCCESS,
  payload: data
});
const actProjectCategoryFail = (error: any) => ({
  type: ActionTypes.PROJECT_CATEGORY_FAIL,
  payload: error
})

const actCreateProjectRequest = (): Action => ({ type: ActionTypes.CREATE_PROJECT_REQUEST });

const actCreateProjectSuccess = (data: CreateProject[]): Action => ({
  type: ActionTypes.CREATE_PROJECT_SUCCESS,
  payload: data
});
const actCreateProjectFail = (error: any) => ({
  type: ActionTypes.CREATE_PROJECT_FAIL,
  payload: error
})