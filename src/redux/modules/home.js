import { get } from "../../utils/request"
import url from "../../utils/url";
import {schema} from  "./entities/products";
import {FETCH_DATA} from "../middleware/api"

export const types={
    FETCH_LIKES_REQUEST:"HOME/FETCH_LIKES_REQUEST",//获取猜你喜欢请求
    FETCH_LIKES_SUCCESS:"HOME/FETCH_LIKES_SUCCESS",//获取猜你喜欢请求-成功
    FETCH_LIKES_FAILURE:"HOME/FETCH_LIKES_FAILURE",//获取猜你喜欢请求-失败
}
const fetchLikesRequest=()=>({
    type:types.FETCH_LIKES_REQUEST
})

const fetchLikesSuccess=()=>({
    type:types.FETCH_LIKES_SUCCESS
})

const fetchLikesFailure=()=>({
    type:types.FETCH_LIKES_FAILURE
})
const fetchLikes=(endpoint,params)=>({
    [FETCH_DATA]:{
        types:[
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endpoint,
        schema
    },
    params
})
export const actions={
    loadLikes:()=>{
        return (dispatch)=>{
            const endpoint=url.getProductList(0,10);
            return dispatch(fetchLikes(endpoint))
        }
    },
    loadLidkes:()=>{
        return (dispatch,getState)=>{
            dispatch(fetchLikesRequest());
            return get(url.getProductList(0,10)).then(data=>{
                dispatch(fetchLikesSuccess(data));
                dispatch(action)
            },
            error=>{
                dispatch(fetchLikesFailure(error))
            })
        }
    }
}
const reducer=(state={},action)=>{
    switch(action.type){
        case types.FETCH_LIKES_REQUEST:
        case types.FETCH_LIKES_SUCCESS:
        case types.FETCH_LIKES_FAILURE:
        default:
        return state;
    }
}
export default reducer;