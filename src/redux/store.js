import {createStore,applyMiddleware,compose} from 'redux';
import thunk from "redux-thunk";  //使redux可以处理异步action的中间件
import api from "./middleware/api";
import rootReducer from './modules';
//开发环境集成调试redux的插件
//window.__REDUX_DEVTOOLS_EXTENSION__判断浏览器是否安装redux-devtools插件,
//           存在的话将window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__作为store增强器
let store;
if(process.env.NODE_ENV!=="production"&&window.__REDUX_DEVTOOLS_EXTENSION__){
    const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk,api)));
}else{
    store =createStore(rootReducer,applyMiddleware(thunk));
}
export default store;
