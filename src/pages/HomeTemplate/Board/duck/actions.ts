import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, Board, GetTaskDetail, Result, UpdateTask } from './types';
import Swal from 'sweetalert2';

export const fetchProjectDetail = (id: any) => {
  return (dispatch: any) => {
    dispatch(actBoardRequest());
    api.get(`Project/getProjectDetail?id=${id}`)
      .then((result: Result<Board>) => {
        if (result.data.statusCode === 200) {
          dispatch(actBoardSuccess(result.data.content))
          localStorage.setItem('BoardProject', JSON.stringify(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actBoardFail(error));
      })
  }
}

export const fetchTaskDetail = (id: any) => {
  return (dispatch: any) => {
    dispatch(actTaskDetailRequest());
    api.get(`Project/getTaskDetail?taskId=${id}`)
      .then((result: Result<GetTaskDetail>) => {
        if (result.data.statusCode === 200) {
          dispatch(actTaskDetailSuccess(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actTaskDetailFail(error));
      })
  }
}

export const deleteTask = (id: any, navigate: any) => {
  return (dispatch: any) => {
    dispatch(actDeleteTaskRequest());
    api.delete(`Project/removeTask?taskId=${id}`)
      .then((result: Result<GetTaskDetail>) => {
        if (result.data.statusCode === 200) {
          dispatch(actDeleteTaskSuccess(result.data.content))
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Delete Task Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch((error: any) => {
        dispatch(actDeleteTaskFail(error));
      })
  }
}

export const updateStatusDragDrop = (taskUpdate: any) => {
  return (dispatch: any) => {
    dispatch(actUpdateStatusRequest());
    api.put(`Project/updateStatus`, taskUpdate)
      .then((result: Result<Board>) => {
        if (result.data.statusCode === 200) {
          dispatch(actUpdateStatusSuccess(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actUpdateStatusFail(error));
      })
  }
}

export const assignUserTask = (userTask: any) => {
  return (dispatch: any) => {
    dispatch(actAddUserTaskRequest());
    api.post("Project/assignUserTask", userTask)
      .then((result: Result<GetTaskDetail>) => {
        dispatch(actAddUserTaskSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actAddUserTaskFail(error));
      })
  }
}

export const apiUpdateTask = (task: any) => {
  return (dispatch: any) => {
    dispatch(actUpdateTaskRequest());
    api.post("Project/updateTask", task)
      .then((result: Result<UpdateTask>) => {
        dispatch(actUpdateTaskSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actUpdateTaskFail(error));
      })
  }
}


//Board
const actBoardRequest = (): Action => ({ type: ActionTypes.BOARD_REQUEST })
const actBoardSuccess = (data: Board[]): Action => ({
  type: ActionTypes.BOARD_SUCCESS,
  payload: data
})
const actBoardFail = (error: any) => ({
  type: ActionTypes.BOARD_FAIL,
  payload: error
})

//Task Detail
const actTaskDetailRequest = (): Action => ({ type: ActionTypes.TASK_DETAIL_REQUEST })
const actTaskDetailSuccess = (dataTaskDetail: GetTaskDetail[]): Action => ({
  type: ActionTypes.TASK_DETAIL_SUCCESS,
  payload: dataTaskDetail
})
const actTaskDetailFail = (error: any) => ({
  type: ActionTypes.TASK_DETAIL_FAIL,
  payload: error
})
export const actTaskDetail = (infoTaskDetail: GetTaskDetail[]): Action => ({
  type: ActionTypes.INFO_TASK_DETAIL,
  payload: infoTaskDetail
})

//Delete Task
const actDeleteTaskRequest = (): Action => ({ type: ActionTypes.DELETE_TASK_REQUEST })
const actDeleteTaskSuccess = (dataTaskDetail: GetTaskDetail[]): Action => ({
  type: ActionTypes.DELETE_TASK_SUCCESS,
  payload: dataTaskDetail
})
const actDeleteTaskFail = (error: any) => ({
  type: ActionTypes.DELETE_TASK_FAIL,
  payload: error
})
//Update Status Drag Drop
const actUpdateStatusRequest = (): Action => ({ type: ActionTypes.UPDATE_STATUS_REQUEST })
const actUpdateStatusSuccess = (dataUpdateStatus: Board[]): Action => ({
  type: ActionTypes.UPDATE_STATUS_SUCCESS,
  payload: dataUpdateStatus
})
const actUpdateStatusFail = (error: any) => ({
  type: ActionTypes.UPDATE_STATUS_FAIL,
  payload: error
})
//Add User Task
const actAddUserTaskRequest = (): Action => ({ type: ActionTypes.ADD_USER_TASK_REQUEST })
const actAddUserTaskSuccess = (userTask: GetTaskDetail[]): Action => ({
  type: ActionTypes.ADD_USER_TASK_SUCCESS,
  payload: userTask
})
const actAddUserTaskFail = (error: any) => ({
  type: ActionTypes.ADD_USER_TASK_FAIL,
  payload: error
})
//Update Status Drag Drop
const actUpdateTaskRequest = (): Action => ({ type: ActionTypes.UPDATE_STATUS_REQUEST })
const actUpdateTaskSuccess = (dataUpdateTask: UpdateTask[]): Action => ({
  type: ActionTypes.UPDATE_STATUS_SUCCESS,
  payload: dataUpdateTask
})
const actUpdateTaskFail = (error: any) => ({
  type: ActionTypes.UPDATE_STATUS_FAIL,
  payload: error
})