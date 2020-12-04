import React, { Component } from 'react';
import Category from './components/Category'; 
import Headline from './components/Headline';
import Discount from './components/Discount';
import LikeList from './components/LikeList';
import HomeHeader from "./components/HomeHeader";
import Activity from "./components/Activity";
import Banner from "./components/Banner";

class Home extends Component {
    render() {
        return (
            <div>
                <HomeHeader/>
                <Banner/>
                <Category/>
                <Headline/>   
                <Activity/>            
                <Discount/>
                <LikeList/>
            </div>
        );
    }
}

export default Home;