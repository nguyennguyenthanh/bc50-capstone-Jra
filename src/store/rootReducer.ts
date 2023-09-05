import { combineReducers } from 'redux';
import loginReducer from './../pages/UserLoginTemplate/LoginPage/duck/reducer';
import registerReducer from './../pages/UserLoginTemplate/RegisterPage/duck/reducer';

const rootReducer = combineReducers({
    loginReducer,
    registerReducer,
})

export default rootReducer;