import { get } from "../../utils/request"
import url from "../../utils/url";
import {schema} from  "./entities/products";
import {FETCH_DATA} from "../middleware/api"

//请求参数使用到的常量对象
export const params={
    PATH_LIKES:"likes",
    PATH_DISCOUNTS:"discounts",
    PAGE_SIZE_LIKES:5,
    PAGE_SIZE_DISCOUNTS:3
};
export const types={
    FETCH_LIKES_REQUEST:"HOME/FETCH_LIKES_REQUEST",//获取猜你喜欢请求
    FETCH_LIKES_SUCCESS:"HOME/FETCH_LIKES_SUCCESS",//获取猜你喜欢请求-成功
    FETCH_LIKES_FAILURE:"HOME/FETCH_LIKES_FAILURE",//获取猜你喜欢请求-失败
    FETCH_DISCOUNTS_REQUEST:"HOME/FETCH_DISCOUNTS_REQUEST",//获取特惠数据请求
    FETCH_DISCOUNTS_SUCCESS:"HOME/FETCH_DISCOUNTS_SUCCESS",//获取特惠数据请求-成功
    FETCH_DISCOUNTS_FAILURE:"HOME/FETCH_DISCOUNTS_FAILURE",//获取特惠数据请求-失败
}
 
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
});
const fetchDiscounts=(endpoint,params)=>({
    [FETCH_DATA]:{
        types:[
            types.FETCH_DISCOUNTS_REQUEST,
            types.FETCH_DISCOUNTS_SUCCESS,
            types.FETCH_DISCOUNTS_FAILURE
        ],
        endpoint,
        schema
    },
    params
})
export const actions={
    //猜你喜欢的数据
    loadLikes:()=>{
        return (dispatch,getState)=>{
            const {pageCount}=getState().home.likes;
            const rowIndex=pageCount*params.PAGE_SIZE_LIKES;
            const endpoint=url.getProductList(
                params.PATH_LIKES,
                rowIndex,
                params.PAGE_SIZE_LIKES);
            return dispatch(fetchLikes(endpoint))
        }
    },
    //加载特惠商品
    loadDiscount:()=>{
        return (dispatch,getState)=>{
            const endPoint=url.getProductList(
                params.PATH_DISCOUNTS,
                0,
                params.PAGE_SIZE_DISCOUNTS
            );
            return dispatch(fetchDiscounts(endpoint));
        }
    }
};
const initialState={
    likes:{
        isFetching:false,
        pageCount:0,
        ids:[]
    },
    discount:{
        isFetching:false,
        ids:[]
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