import { UserState, AllUsers, Action } from './types';
import * as ActionTypes from './constants';



const userState: UserState<AllUsers> = {
  loading: false,
  data: null,
  dataDelete: null,
  dataUpdate: null,  
  error: null,
  infoUser: undefined,
  userSearch: undefined,
}

const allUserReducer = (state = userState, action: Action) => {
  switch (action.type) {
    //fetch list user
    case ActionTypes.ALL_USER_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ALL_USER_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.ALL_USER_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    //Update user
    case ActionTypes.UPDATE_USER_REQUEST: {
      state.loading = true;
      state.dataUpdate = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.UPDATE_USER_SUCCESS: {
      state.loading = false;
      state.dataUpdate = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.UPDATE_USER_FAIL: {
      state.loading = false;
      state.dataUpdate = null;
      state.error = action.payload;
      return { ...state }
    }
    case ActionTypes.SELECT_USER: {
      state.infoUser = action.payload;
      return { ...state }
    }
    //delete user
    case ActionTypes.DELETE_USER_REQUEST: {
      state.loading = true;
      state.dataDelete = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.DELETE_USER_SUCCESS: {
      state.loading = false;
      state.dataDelete = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.DELETE_USER_FAIL: {
      state.loading = false;
      state.dataDelete = null;
      state.error = action.payload;
      return { ...state }
    }
    //GET API USER TO PJpage
    case ActionTypes.GET_USER_SEARCH: {
      state.userSearch = action.payload;
      return { ...state }
    }
    default:
      return { ...state };
  }
}
export default allUserReducer;