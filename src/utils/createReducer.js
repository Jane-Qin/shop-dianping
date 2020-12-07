import { createStore } from "redux";

const createReducer=(name)=>{
    return (state={},action)=>{
        if(action.response&&action.response[name]){   //eg. action中有product,那这个是调用api成功后返回的product数据
            return {...state,...action.response[name]}
        };
        return state;
    }
}
export default createReducer;