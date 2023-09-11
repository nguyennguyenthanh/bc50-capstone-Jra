import { ProjectState, AllProjects, Action } from './types';
import * as ActionTypes from './constants';



const projectState: ProjectState<AllProjects> = {
  loading: false,
  data: null,
  error: null
}

const allProjectReducer = (state = projectState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ALL_PROJECT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ALL_PROJECT_SUCCESS: {
      state.loading = true;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ALL_PROJECT_FAIL: {
      state.loading = true;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    default:
      return { ...state };
  }
}
export default allProjectReducer;