import { combineReducers } from 'redux';
import loginReducer from './../pages/UserLoginTemplate/LoginPage/duck/reducer';
import registerReducer from './../pages/UserLoginTemplate/RegisterPage/duck/reducer';
import createProjectReducer from './../pages/HomeTemplate/CreateProjectPage/duck/reducer';
const rootReducer = combineReducers({
    loginReducer,
    registerReducer,
    createProjectReducer,
})

export default rootReducer;