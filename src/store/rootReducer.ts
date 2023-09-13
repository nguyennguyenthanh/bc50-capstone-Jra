import { combineReducers } from 'redux';
import loginReducer from './../pages/UserLoginTemplate/LoginPage/duck/reducer';
import registerReducer from './../pages/UserLoginTemplate/RegisterPage/duck/reducer';
import createProjectReducer from './../pages/HomeTemplate/CreateProjectPage/duck/reducer';
import allProjectReducer from '../pages/HomeTemplate/ProjectPage/duck/reducer';
import profileUserReducer from './../pages/HomeTemplate/Profile/duck/reducer';


const rootReducer = combineReducers({
    loginReducer,
    registerReducer,
    createProjectReducer,
    allProjectReducer,
    profileUserReducer,
})

export default rootReducer;