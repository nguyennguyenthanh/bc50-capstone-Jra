import { ProjectState, AllProjects, Action } from './types';
import * as ActionTypes from './constants';



const projectState: ProjectState<AllProjects> = {
  loading: false,
  data: null,
  dataDelete: null,
  dataEdit: null,
  error: null,
}

const allProjectReducer = (state = projectState, action: Action) => {
  switch (action.type) {
    //fetch list pj
    case ActionTypes.ALL_PROJECT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ALL_PROJECT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ALL_PROJECT_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    //delete pj
    case ActionTypes.DELETE_PROJECT_REQUEST: {
      state.loading = true;
      state.dataDelete = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.DELETE_PROJECT_SUCCESS: {
      state.loading = false;
      state.dataDelete = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.DELETE_PROJECT_FAIL: {
      state.loading = false;
      state.dataDelete = null;
      state.error = action.payload;
      return { ...state }
    }
    default:
      return { ...state };
  }
}
export default allProjectReducer;