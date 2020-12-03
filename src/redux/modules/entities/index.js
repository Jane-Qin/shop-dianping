import {combineReducers} from "redux";
import comments from "./comments";
import orders from "./orders";
import products from "./products";
import shops from './shops';

//合并领域状态
export default combineReducers({
    products,
    comments,
    shops,
    orders
})