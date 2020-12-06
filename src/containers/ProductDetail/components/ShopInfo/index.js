import React, { Component } from "react";
import "./style.css";

class ShopInfo extends Component {
  render() {
    return (
      <div className="shopInfo">
        <div className="shopInfo__header">
          使用商户（4）
          <span className="shopInfo__arrow"></span>
        </div>
        <div className="shopInfo__middle">
          <div className="shopInfo_middleLeft">
            <div className="shopInfo__shopName">院落创意菜</div>
            <div className="shopInfo__starsWrapper">
              <span className="shopInfo__stars">
                <i
                  className="shopInfo__stars--red"
                  style={{ width: "100%" }}
                ></i>
              </span>
              <span className="shopInfo__distance">&gt;1000km</span>
            </div>
          </div>
          <div className="shopInfo__middleRight">
            <i className="shopInfo__phoneIcon"></i>
          </div>
        </div>
        <div className="shopInfo__bottom">
          <i className="shopInfo__licationIcon"></i> 北京市朝阳区
        </div>
      </div>
    );
  }
}

export default ShopInfo;
