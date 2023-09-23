import { Action, AllTask, HeaderState, Priority, Status, TaskType } from './types';
import * as ActionTypes from './constants';


const headerState: HeaderState<TaskType | Priority | Status | AllTask> = {
  loading: false,
  data: null,
  dataCreateTask: null,
  error: null,
  Priority: [],
  Status: [],
  infoTask: undefined
}

const headerReducer = (state = headerState, action: Action) => {
  switch (action.type) {
    //task type
    case ActionTypes.TASK_TYPE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.TASK_TYPE_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.TASK_TYPE_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    //Priority
    case ActionTypes.PRIORITY_REQUEST: {
      state.loading = true;
      state.Priority = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.PRIORITY_SUCCESS: {
      state.loading = false;
      state.Priority = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.PRIORITY_FAIL: {
      state.loading = false;
      state.Priority = null;
      state.error = action.payload;
      return { ...state }
    }
    //Status
    case ActionTypes.STATUS_REQUEST: {
      state.loading = true;
      state.Status = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.STATUS_SUCCESS: {
      state.loading = false;
      state.Status = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.STATUS_FAIL: {
      state.loading = false;
      state.Status = null;
      state.error = action.payload;
      return { ...state }
    }
    //ifo task
    case ActionTypes.CREATE_TASK_REQUEST: {
      state.loading = true;
      state.dataCreateTask = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.CREATE_TASK_SUCCESS: {
      state.loading = false;
      state.dataCreateTask = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.CREATE_TASK_FAIL: {
      state.loading = false;
      state.dataCreateTask = null;
      state.error = action.payload;
      return { ...state }
    }
    case ActionTypes.INFO_TASK: {
      state.infoTask = action.payload;
      return { ...state }
    }
    default:
      return { ...state }
  }
}
export default headerReducer;