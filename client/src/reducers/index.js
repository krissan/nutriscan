import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import meallist from './meallist';
import ddate from './ddate';
import edtiToggle from './editToggle';

export default combineReducers({
    alert,
    auth,
    meallist,
    ddate,
    edtiToggle
});