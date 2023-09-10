import { CreateState, CreateProject, Action, ProjectCategory } from './types';
import * as ActionTypes from './constants';



const createState: CreateState<ProjectCategory | CreateProject> = {
  loading: false,
  data: null,
  error: null,
}

const createProjectReducer = (state = createState, action: Action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_CATEGORY_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PROJECT_CATEGORY_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PROJECT_CATEGORY_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    
    case ActionTypes.CREATE_PROJECT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.CREATE_PROJECT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.CREATE_PROJECT_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
}

export default createProjectReducer;