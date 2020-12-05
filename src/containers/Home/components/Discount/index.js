import React, { Component } from "react";
import "./style.css";

class Discount extends Component {
  render() {
    const data = this.props.data;
    return (
      <div className="discount">
        <a className="discount__header">
          <span className="discount__title">超值特惠</span>
          <span className="discount__more">更多优惠</span>
          <span className="discount__arrow"></span>
        </a>
        <div className="discount__content">
          {data.map((item, index) => {
            return (
              <a className="discount__item" key={item.id}>
                <div className="discount__itemPic">
                  <img width="100%" height="100%" src={item.picture} />
                </div>
                <div className="discount__itemTitle">{item.shop}</div>
                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="dicsount__itemOldPrice">{item.oldPrice}</del>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Discount;