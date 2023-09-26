import { Board, BoardState, Action, GetTaskDetail } from './types';
import * as ActionTypes from './constants';


const boardState: BoardState<Board | GetTaskDetail> = {
  loading: false,
  data: null,
  dataTaskDetail: null,
  dataDeleteTask: null,
  dataUpdateStatus: null,
  error: null,
  infoTaskDetail: undefined,
}

const boardReducer = (state = boardState, action: Action) => {
  switch (action.type) {
    case ActionTypes.BOARD_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.BOARD_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.BOARD_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    //Task detail
    case ActionTypes.TASK_DETAIL_REQUEST: {
      state.loading = true;
      state.dataTaskDetail = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.TASK_DETAIL_SUCCESS: {
      state.loading = false;
      state.dataTaskDetail = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.TASK_DETAIL_FAIL: {
      state.loading = false;
      state.dataTaskDetail = null;
      state.error = action.payload;
      return { ...state }
    }
    case ActionTypes.INFO_TASK_DETAIL: {
      state.infoTaskDetail = action.payload;
      return { ...state }
    }
    //Delete Task
    case ActionTypes.DELETE_TASK_REQUEST: {
      state.loading = true;
      state.dataDeleteTask = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.DELETE_TASK_SUCCESS: {
      state.loading = false;
      state.dataDeleteTask = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.DELETE_TASK_FAIL: {
      state.loading = false;
      state.dataDeleteTask = null;
      state.error = action.payload;
      return { ...state }
    }
    //Update Status Drag Drop
    case ActionTypes.UPDATE_STATUS_REQUEST: {
      state.loading = true;
      state.dataUpdateStatus = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.UPDATE_STATUS_SUCCESS: {
      state.loading = false;
      state.dataUpdateStatus = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.UPDATE_STATUS_FAIL: {
      state.loading = false;
      state.dataUpdateStatus = null;
      state.error = action.payload;
      return { ...state }
    }
    default:
      return { ...state }
  }
}
export default boardReducer;