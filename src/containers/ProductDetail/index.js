import React, { Component } from "react";
import ProductOverview from "./components/ProductOverview";
import ShopInfo from "./components/ShopInfo";
import Detail from "./components/Detail";
import Remark from "./components/Remark";
import BuyButtom from "./components/BuyButton";
import Header from "../../components/Header";
import {actions as detailActions ,getProduct,getRelatedShop} from '../../redux/modules/detail';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';

class ProductDetail extends Component {
  render() {
    const {product,relatedShop}=this.props;
    return (
      <div>
        <Header title="团购详情" onBack={this.handleBack} grey />
        {product && <ProductOverview data={product} />}
        {relatedShop && <ShopInfo data={relatedShop} total={product.shopIds.length}/>}
        {product && 
        (
          <div>
            <Detail data={product} />
            <Remark data={product}/>
            <BuyButtom productId={product.id} />
          </div>
        )}
      </div>
    );
  };
  componentDidMount(){   //首次根据url上的id触发获取商品的action,但获取相关的商铺信息还没得到，在update中获取
    const {product,relatedShop}=this.props;
    if(!product){
      const productId=this.props.match.params.id;
      this.props.detailActions.loadProductDetail(productId);
    }else if(!relatedShop){
      this.props.detailActions.loadShopById(product.nearestShop);
    }
  }
  componentDidUpdata(preProps){   //在update中获取店铺信息
    if(!preProps.product&&this.props.product){
      this.props.detailActions.loadShopById(this.propsproduct.nearestShop);
    }
  }
  handleBack = () => {
    this.props.history.goBack();
  };
}

const mapStateToProps=(state,props)=>{
  const productId=props.match.params.id;
  return {
    product:getProduct(state,productId),
    relatedShop:getRelatedShop(state,productId)
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    detailActions:bindActionCreators(detailActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);
