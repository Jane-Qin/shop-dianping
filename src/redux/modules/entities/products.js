export const schema={
    name:"products",
    id:"id"
}
const reducer=(state={},action)=>{
    if(action.response&&action.response.products){  //action中有product,那这个是调用api成功后返回的product数据
        return {...state,...action.response.products}
    }   
    return state;
}
export default reducer;