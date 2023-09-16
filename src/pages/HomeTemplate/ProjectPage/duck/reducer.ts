import { ProjectState, AllProjects, Action } from './types';
import * as ActionTypes from './constants';



const projectState: ProjectState<AllProjects> = {
  loading: false,
  data: null,
  dataDelete: null,
  dataUpdate: null,  
  error: null,
  infoProject: undefined,
  userProject: undefined,
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
    //Update pj
    case ActionTypes.UPDATE_PROJECT_REQUEST: {
      state.loading = true;
      state.dataUpdate = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.UPDATE_PROJECT_SUCCESS: {
      state.loading = false;
      state.dataUpdate = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.UPDATE_PROJECT_FAIL: {
      state.loading = false;
      state.dataUpdate = null;
      state.error = action.payload;
      return { ...state }
    }
    case ActionTypes.SELECT_PROJECT: {
      state.infoProject = action.payload;
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
    //Assign user project
    case ActionTypes.ASSIGN_USER_REQUEST: {
      state.loading = true;
      state.userProject = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ASSIGN_USER_SUCCESS: {
      state.loading = false;
      state.userProject = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ASSIGN_USER_FAIL: {
      state.loading = false;
      state.userProject = null;
      state.error = action.payload;
      return { ...state }
    }
    default:
      return { ...state };
  }
}
export default allProjectReducer;