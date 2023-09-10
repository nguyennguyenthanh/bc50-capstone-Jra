import * as ActionTypes from './constants';
import { AppState, User, Action } from './types';



const loginState: AppState<User> = {
  loading: false,
  data: null,
  error: null,
}

const loginReducer = (state = loginState, action: Action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.USER_LOGIN_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.USER_LOGIN_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    case ActionTypes.AUTH_CLEAR: {
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    default:
      return { ...state }
  }
}

export default loginReducer;