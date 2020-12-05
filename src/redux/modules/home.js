import { combineReducers } from "redux";
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
    loadDiscounts:()=>{
        return (dispatch,getState)=>{
            const endPoint=url.getProductList(
                params.PATH_DISCOUNTS,
                0,
                params.PAGE_SIZE_DISCOUNTS
            );
            return dispatch(fetchDiscounts(endPoint));
        }
    }
};
const initialState={
    likes:{
        isFetching:false,
        pageCount:0,
        ids:[]
    },
    discounts:{
        isFetching:false,
        ids:[]
    }
}
//猜你喜欢reducer
const likes=(state=initialState.likes,action)=>{
    switch(action.type){
        case types.FETCH_LIKES_REQUEST:
            return {...state,isFetching:true};
        case types.FETCH_LIKES_SUCCESS:
            return {...state,isFetching:false,pageCount:state.pageCount+1,ids:state.ids.concat(action.response.ids)}
        case types.FETCH_LIKES_FAILURE:
            return {...state,isFetching:false}   //错误处理，在app.js中进行了
        default:
            return state;
    }
}
const discounts=(state=initialState.discounts,action)=>{
    switch(action.type){
        case types.FETCH_DISCOUNTS_REQUEST:
            return {...state,isFetching:true};
        case types.FETCH_DISCOUNTS_SUCCESS:
            return {...state,isFetching:false,ids:state.ids.concat(action.response.ids)};
        case types.FETCH_DISCOUNTS_FAILURE:
            return {...state,isFetching:false}
        default:
            return state;
    }
};

export default combineReducers({likes,discounts});

//selectors
//获取猜你喜欢state
export const getLikes=(state)=>{
    return state.home.likes.ids.map(id=>{
        return state.entities.products[id]
    })
}
//获取猜你喜欢的页数
export const getPageCountOfLikes=state=>{
    return state.home.likes.pageCount
};
//获取特惠商品state
export const getDiscounts=(state)=>{
    return state.home.discounts.ids.map(id=>{
        return state.entities.products[id]
    })
}