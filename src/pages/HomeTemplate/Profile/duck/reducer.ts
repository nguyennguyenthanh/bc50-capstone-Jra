import { ProfileState, ProfileUser, Action } from './types';
import * as ActionTypes from './constants';



const profileState: ProfileState<ProfileUser> = {
  loading: false,
  data: null,
  dataUpdate: null,
  error: null,
  profileUser: undefined
}

const profileUserReducer = (state = profileState, action: Action) => {
  switch (action.type) {
    case ActionTypes.PROFILE_USER_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PROFILE_USER_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PROFILE_USER_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    case ActionTypes.PROFILE_USER: {
      state.profileUser = action.payload;
      return { ...state };
    }
    //Update Profile
    case ActionTypes.UPDATE_PROFILE_USER_REQUEST: {
      state.loading = true;
      state.dataUpdate = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.UPDATE_PROFILE_USER_SUCCESS: {
      state.loading = false;
      state.dataUpdate = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.UPDATE_PROFILE_USER_FAIL: {
      state.loading = false;
      state.dataUpdate = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default profileUserReducer;