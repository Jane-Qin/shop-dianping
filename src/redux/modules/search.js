import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import {schema} from './entities/keywords'

const initialState={
    inputText:'',
    popularKeywords:{
        isFetching:false,
        ids:[]
    },
    relatedKeywords:{
    /**
     * relatedKeywords对象结构：
     * {
     *   '火锅': {
     *       isFetching: false,
     *       ids: []
     *    }
     * }
     */
    },
    historyKeywords:[]  //保留关键词id
}

export const types={
    //获取热门关键词
    FETCH_POPULAR_KEYWORDS_REQUEST:"SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST",
    FETCH_POPULAR_KEYWORDS_SUCCESS:"SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS",
    FETCH_POPULAR_KEYWORDS_FAILURE:"SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE",
    //根据输入的文本获取相关关键词
    FETCH_RELATED_KEYWORDS_REQUEST:"SEARCH/FETCH_RELATED_KEYWORDS_REQUEST",
    FETCH_RELATED_KEYWORDS_SUCCESS:"SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS",
    FETCH_RELATED_KEYWORDS_FAILURE:"SEARCH/FETCH_RELATED_KEYWORDS_FAILURE",
    //设置当前输入
    SET_INPUT_TEXT:"SEARCH/SET_INPUT_TEXT",
    CLEAR_INPUT_TEXT:"SEARCH/CLEAR_INPUT_TEXT",
    //历史记录查询
    ADD_HISTORY_KEYWORD:"SEARCH/ADD_HISTORY_KEYWORD",
    CLEAR_HISTORY_KEYWORDS:"SEARCH/CLEAR_HISTORY_KEYWORDS"
}
const fetchPopularKeywords=(endpoint)=>({
    [FETCH_DATA]:{
        types:[FETCH_POPULAR_KEYWORDS_REQUEST.FETCH_POPULAR_KEYWORDS_SUCCESS,FETCH_POPULAR_KEYWORDS_FAILURE],
        schema,
        endpoint
    }
})
const fetchRelatedKeyword=(text,endpoint)=>({
    [FETCH_DATA]:{
        types:[FETCH_RELATED_KEYWORDS_REQUEST,FETCH_RELATED_KEYWORDS_SUCCESS,FETCH_RELATED_KEYWORDS_FAILURE],
        schema,
        endpoint
    },
    text
})

export const actions={
    //获取热门关键词
    loadPopularKeywords:()=>{
        return (dispatch,getState)=>{
            const {ids}=getState().search.popularKeywords;
            if(ids.length>0){
                return null;
            }
            const endpoint=url.getPopularKeywords();
            return dispatch(fetchPopularKeywords())
        }
    },
    loadRelatedKeyword:(text)=>{
        return (dispatch,getState)=>{
            const {relatedKeywords}=getState().search;
            if(relatedKeywords[text]){
                return null;
            }
            const endpoint=url.getRelatedKeywords(text);
            return dispatch(fetchRelatedKeyword(text,endpoint))
        }
    },
    setInputText:text=>({
        type:types.SET_INPUT_TEXT,
        text
    }),
    clearInputText:()=>({
        type:types.CLEAR_INPUT_TEXT
    }),
    addHistoryKeyword:keywordId=>({
        type:types.ADD_HISTORY_KEYWORD,
        text:keywordId
    }),
    clearHistoryKeywords:()=>({
        type:types.CLEAR_HISTORY_KEYWORDS
    })
}
//reducer
const popularKeywords=(state=initialState.popularKeywords,action)=>{
    switch(action.type){
        case types.FETCH_POPULAR_KEYWORDS_REQUEST:
            return {...state,isFetching:true};
        case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetching:false,
                ids:state.ids.concat(action.response.ids)
            }
        case types.FETCH_POPULAR_KEYWORDS_FAILURE:
            return {
                ...state,
                isFetching:false
            }
        default :
            return state;
    }
} 
const relatedKeywords=(state=initialState.relatedKeywords,action)=>{
    switch(action.type){
        case types.FETCH_RELATED_KEYWORDS_REQUEST:
        case types.FETCH_RELATED_KEYWORDS_SUCCESS:
        case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
            return {
                ...state,
                [action.text]:relatedKeywordsByText(state[action.text],action)
            };
        default :
            return state;
    }
}
const relatedKeywordsByText=(state={
    isFetching:false,
    ids:[]
},action)=>{
    switch(action.type){
        case types.FETCH_RELATED_KEYWORDS_REQUEST:
            return {
                ...state,
                isFetching:true
            }
        case types.FETCH_RELATED_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetching:false,
                ids:state.ids.concat(action.response.ids)
            }
        case types.FETCH_RELATED_KEYWORDS_FAILURE:
            return {
                ...state,
                isFetching:false
            }
        default:
            return state;
    }
}
const inputText=(state=initialState.inputText,action)=>{
    switch(action.type){
        case types.SET_INPUT_TEXT:
            return action.text
        case types.CLEAR_INPUT_TEXT:
            return "";
        default :
            return state;
    }
}
const historyKeywords=(state=initialState.historyKeywords,action)=>{
    switch(action.type){
        case type.ADD_HISTORY_KEYWORD:
            const data=state.filter((item)=>{
                return item!==action.text
            })
            return [action.text, ...data];
        case types.CLEAR_HISTORY_KEYWORDS:
            return [];
        default:
            return state;
    }
}
const reducer = combineReducers({
    popularKeywords,
    relatedKeywords,
    inputText,
    historyKeywords
  })
  
  export default reducer;