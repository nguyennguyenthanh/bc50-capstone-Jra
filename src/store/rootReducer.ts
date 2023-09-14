import { combineReducers } from 'redux';
import loginReducer from './../pages/UserLoginTemplate/LoginPage/duck/reducer';
import registerReducer from './../pages/UserLoginTemplate/RegisterPage/duck/reducer';
import createProjectReducer from './../pages/HomeTemplate/CreateProjectPage/duck/reducer';
import allProjectReducer from '../pages/HomeTemplate/ProjectPage/duck/reducer';
import profileUserReducer from './../pages/HomeTemplate/Profile/duck/reducer';
import allUserReducer from './../pages/HomeTemplate/UserPage/duck/reducer';

const rootReducer = combineReducers({
    loginReducer,
    registerReducer,
    createProjectReducer,
    allProjectReducer,
    profileUserReducer,
    allUserReducer,
})

export default rootReducer;