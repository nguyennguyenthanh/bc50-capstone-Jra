import { RegisterState, UserRegister, Action } from './types';
import * as ActionTypes from './constants';


const registerState: RegisterState<UserRegister> = {
    loading: false,
    data: null,
    error: null,
}

const registerReducer = (state = registerState, action: Action) => {
    switch (action.type) {
        case ActionTypes.USER_REGISTER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        case ActionTypes.USER_REGISTER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }
        }
        case ActionTypes.USER_REGISTER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
export default registerReducer;