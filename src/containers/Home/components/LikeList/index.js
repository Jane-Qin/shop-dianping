import React, { Component } from 'react';
import LikeItem from "../LikeItem";
import Loading from '../../../../components/Loading';
import "./style.css";

class LikeList extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.removeListener=false;   //是否移除事件监听标志位
        this.handleScroll=this.handleScroll.bind(this)
    }
    render() {
        const {data,pageCount}=this.props;
        return (
            <div ref={this.myRef} className="likelist">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item,index)=>{
                            return <LikeItem key={index} data={item}/>
                        })
                    }
                </div>
                {
                    pageCount<3?(
                        <Loading/>
                    ):(
                        <a className="likeList__viewAll">查看更多</a>
                    )
                }
            </div>
        );
    }
    componentDidMount(){
        //利用redux缓存层作用
        if(this.props.pageCount<3){
            document.addEventListener("scroll",this.handleScroll);
        }else{
            this.removeListener=true;
        }
        
        if(this.props.pageCount===0){
            this.props.fetchData();
        }
    }
    componentWillUnmount(){
        //解除事件监听，防止内存泄漏
        if(!this.removeListener){
            document.removeEventListener("scroll",this.handleScroll);
        }

    }
    componentDidUpdate(){
        if(this.props.pageCount>=3&& !this.removeListener){
            //滚动加载3次后，移除事件监听
            document.removeEventListener("scroll",this.handleScroll);
            this.removeListener=true;
        }
    }
    //处理屏幕滚动事件，实现加载更多的效果
    handleScroll(){
        const scrollTop=document.documentElement.scrollTop||document.body.scrollTop; //页面滚动的距离(兼容不同浏览器)获取当前页面滚动条纵坐标的位置：
        const screenHeight=document.documentElement.clientHeight;   //页面可视范围高度
        const likeListTop=this.myRef.current.offsetTop;     //likelist距离顶部的距离
        const likeListHeight=this.myRef.current.offsetHeight;   //lkielist内容的高度
        //滚动距离大于可滚动高度时，加载数据
        if(scrollTop>=(likeListTop+likeListHeight-screenHeight)){
            this.props.fetchData();
        }
    }
}

export default LikeList;
 