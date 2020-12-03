import {combineReducers} from "redux";
import entities from './entities'
import app from './app';
import detail from './detail';
import home from './home';

//合并成根reducer
export default combineReducers({
    entities,
    home,
    detail,
    app
})
