import React, { Component } from "react";
import { bindActionCreators } from "redux"; //在组件中通过props调用action，而不需要dispatch才能调用action
import { connect } from "react-redux";
import Category from "./components/Category";
import Headline from "./components/Headline";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList";
import HomeHeader from "./components/HomeHeader";
import Activity from "./components/Activity";
import Banner from "./components/Banner";
import Footer from "../../components/Footer";
import {
  actions as homeActions,
  getDiscounts,
  getLikes,
  getPageCountOfLikes,
} from "../../redux/modules/home";
class Home extends Component {
  render() {
    const {likes,discounts,pageCount}=this.props;
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={discounts}/>
        <LikeList data={likes} pageCount={pageCount}
          fetchData={this.fetchMoreLikes}
        />
        <Footer />
      </div>
    );
  }
  componentDidMount(){
    this.props.homeAction.loadDiscounts();
  }
  fetchMoreLikes=()=>{
    this.props.homeAction.loadLikes()
  }
}
const mapStateToProps = (state, props) => {
  return {
    likes: getLikes(state),
    discounts: getDiscounts(state),
    pageCount: getPageCountOfLikes(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    homeAction: bindActionCreators(homeActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
