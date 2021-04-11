/**
 * This index file will export combined reducers.
 */
import {combineReducers} from 'redux';

import authReducer from "./authReducer";
import fooReducer from "./fooReducer";


export default combineReducers({
    auth: authReducer,
    foo: fooReducer
});