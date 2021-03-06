import { combineReducers } from "redux";
import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import { getProductById, getProductDetail, schema as productSchema } from "./entities/products";
import { getShopById, schema as shopSchema } from "./entities/shops";

export const types = {
  //获取产品详情
  FETCH_PRODUCT_DETAIL_REQUEST: "DETAIL/FETCH_PRODUCT_DETAIL_REQUEST",
  FETCH_PRODUCT_DETAIL_SUCCESS: "DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS",
  FETCH_PRODUCT_DETAIL_FAILURE: "DETAIL/FETCH_PRODUCT_DETAIL_FAILURE",
  //获取关联商铺信息
  FETCH_SHOP_DETAIL_REQUEST: "DETAIL/FETCH_SHOP_DETAIL_REQUEST",
  FETCH_SHOP_DETAIL_SUCCESS: "DETAIL/FETCH_SHOP_DETAIL_SUCCERR",
  FETCH_SHOP_DETAIL_FAILURE: "DETAIL/FETCH_SHOP_DETAIL_FAILURE",
};
const initialState = {
  product: {
    isFetching: false,
    id: null,
  },
  relatedShop: {
    isFetching: false,
    id: null,
  },
};
export const actions = {
  loadProductDetail: (id) => {
    return (dispatch, getState) => {
      //从state缓存中读取数据
      const product = getProductDetail(getState(), id);
      if (product) {
        return dispatch(fetchProductDetailSuccess(id));
      }
      const endPoint = url.getProductDetailById(id);
      return dispatch(fetchProductDetail(endPoint, id));
    };
  },
  loadShopDetail: (id) => {
    return (dispatch, getState) => {
      //从state缓存中读取数据
      const shop = getShopById(getState(), id);
      if (shop) {
        return dispatch(fetchShopDetailSuccess(id));
      }
      const endPoint = url.getShopById(id);
      return dispatch(fetchShopDetail(endPoint, id));
    };
  },
};

const fetchProductDetail = (endpoint, params) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILURE,
    ],
    endpoint,
    schema:productSchema,
  },
  params,
});
const fetchShopDetail = (endpoint, params) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOP_DETAIL_REQUEST,
      types.FETCH_SHOP_DETAIL_SUCCESS,
      types.FETCH_SHOP_DETAIL_FAILURE,
    ],
    endpoint,
    schema:shopSchema,
  },
  params,
});
const fetchProductDetailSuccess = (id) => ({
  type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
  id: id,
});
const fetchShopDetailSuccess = (id) => ({
  type: types.FETCH_SHOP_DETAIL_SUCCESS,
  id: id,
});

const product = () => (state = initialState.productSchema, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_DETAIL_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_PRODUCT_DETAIL_SUCCESS:
      return { ...state, isFetching: false, id: action.id };
    case types.FETCH_PRODUCT_DETAIL_FAILURE:
      return { ...state, isFetching: false, id: null };
    default:
      return state;
  }
};
const relatedShop = (state = initialState.relatedShop, action) => {
  switch (action.type) {
    case types.FETCH_SHOP_DETAIL_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_SHOP_DETAIL_SUCCESS:
      return { ...state, isFetching: false, id: action.id };
    case types.FETCH_SHOP_DETAIL_FAILURE:
      return { ...state, isFetching: false, id: null };
    default:
      return state;
  }
};
const reducer = combineReducers({
  product,
  relatedShop,
});
export default reducer;

//selector
//获取商品详情
export const getProduct=(state,id)=>{
    return getProductDetail(state,id);
}
//获取关联店铺的信息
export const getRelatedShop=(state,productId)=>{
    const product=getProductById(state,productId);
    let shopId=product?product.nearestShop:null;
    if(shopId){
        return getShopById(state,shopId);
    }
    return null;
}
