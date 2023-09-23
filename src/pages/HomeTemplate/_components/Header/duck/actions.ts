import * as ActionTypes from './constants';
import api from '../../../../../utils/api';
import { Action, TaskType, Result, Priority, Status, AllTask } from './types';
import Swal from 'sweetalert2';

export const fetchTaskType = () => {
  return (dispatch: any) => {
    dispatch(actTaskTypeRequest());
    api.get(`TaskType/getAll`)
      .then((result: Result<TaskType>) => {
        if (result.data.statusCode === 200) {
          dispatch(actTaskTypeSuccess(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actTaskTypeFail(error));
      })
  }
}

export const fetchPriority = () => {
  return (dispatch: any) => {
    dispatch(actPriorityRequest());
    api.get(`Priority/getAll`)
      .then((result: Result<Priority>) => {
        if (result.data.statusCode === 200) {
          dispatch(actPrioritySuccess(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actPriorityFail(error));
      })
  }
}

export const fetchStatus = () => {
  return (dispatch: any) => {
    dispatch(actStatusRequest());
    api.get(`Status/getAll`)
      .then((result: Result<Status>) => {
        if (result.data.statusCode === 200) {
          dispatch(actStatusSuccess(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actStatusFail(error));
      })
  }
}

export const actCreateTask = (infoTask: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actCreateTaskRequest());
    api.post(`Project/createTask`, infoTask)
      .then((result: Result<AllTask>) => {
        if (result.data.statusCode === 200) {
          dispatch(actCreateTaskSuccess(result.data.content))
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Create Task Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/board', { replace: true });
        }
      })
      .catch((error: any) => {
        dispatch(actCreateTaskFail(error));
      })
  }
}


//Task Type
const actTaskTypeRequest = (): Action => ({ type: ActionTypes.TASK_TYPE_REQUEST })
const actTaskTypeSuccess = (dataTask: TaskType[]): Action => ({
  type: ActionTypes.TASK_TYPE_SUCCESS,
  payload: dataTask
})
const actTaskTypeFail = (error: any) => ({
  type: ActionTypes.TASK_TYPE_FAIL,
  payload: error
})
//Priority
const actPriorityRequest = (): Action => ({ type: ActionTypes.PRIORITY_REQUEST })
const actPrioritySuccess = (Priority: Priority[]): Action => ({
  type: ActionTypes.PRIORITY_SUCCESS,
  payload: Priority
})
const actPriorityFail = (error: any) => ({
  type: ActionTypes.PRIORITY_FAIL,
  payload: error
})
//Priority
const actStatusRequest = (): Action => ({ type: ActionTypes.STATUS_REQUEST })
const actStatusSuccess = (Status: Status[]): Action => ({
  type: ActionTypes.STATUS_SUCCESS,
  payload: Status
})
const actStatusFail = (error: any) => ({
  type: ActionTypes.STATUS_FAIL,
  payload: error
})
//Info task
const actCreateTaskRequest = (): Action => ({ type: ActionTypes.CREATE_TASK_REQUEST })
const actCreateTaskSuccess = (dataCreateTask: AllTask[]): Action => ({
  type: ActionTypes.CREATE_TASK_SUCCESS,
  payload: dataCreateTask
})
const actCreateTaskFail = (error: any) => ({
  type: ActionTypes.CREATE_TASK_FAIL,
  payload: error
})
export const actInfoTask = (infoTask: AllTask[]): Action => ({
  type: ActionTypes.INFO_TASK,
  payload: infoTask
})