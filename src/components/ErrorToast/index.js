import React, { Component } from 'react';
import './style.css';
//错误组件，将错误信息显示出来，在一定时间后将错误信息关闭掉
class ErrorToast extends Component {
    render() {
        const {msg}=this.props;
        return (
            <div className="errorToast">
                <div className="errorToast_text">
                    {msg}
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.props.clearError();
        },3000)
    }
    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }
}

export default ErrorToast;