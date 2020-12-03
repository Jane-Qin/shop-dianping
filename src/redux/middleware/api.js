import { get } from "../../utils/request"; 
//代表使用redux-thunk进行一次网络请求的过程
// {
//     FETCH_DATA:{
//         types:['request','success','fail'],
//         endpoint:url,
//         schema: {   //代表领域实体的结构  定义在每个领域实体中  转成扁平化数据结构
//             id:"product_id"  //那个属性代表id值
//             name: 。。。           //让中间件知道当前处理的是哪一个领域实体
//         }
//     },
//     params
// }

//定义中间件处理上面的action,将redux-thunk处理网络请求的模板方法的调用进行进一步的简化和封装
//经过中间件处理的action所具有的标识
export const FETCH_DATA = "FETCH DATA";

export default (store) => (next) => (action) => {
  const callAPI = action[FETCH_DATA];
  if (typeof callAPI === "undefined") {
    return next(action);
  }
  const { endpoint, schema, types } = callAPI;
  if (typeof endpoint !== "string") {
    throw new Error("endPoint必须为字符串类型的URL");
  }
  if (!schema) {
    throw new Error("必须指定领域实体的schema");
  }
  if (!Array.isArray(tyeps) && types.length !== 3) {
    throw new Error("需要指定一个包含了3个action type的数组");
  }
  if (!types.every((type) => typeof type === "string")) {
    throw new Error("action type必须为字符串类型");
  }
  const actionWith=data=>{    //增强action，保证action原有param传递下去
      const finalAction={...action,...data};
      delete finalAction[FETCH_DATA];
      return finalAction
  }
  const [requestType, successType, failureType] = types;

  next( actionWith({ type: requestType }) );
  return fetchData(endpoint, schema).then(
    (response) =>
      next(actionWith({
        type: successType,
        response,
      })),
    (error) =>
      next(actionWith({
        type: failureType,
        error: error.message || "获取数据失败",
      }))
  );
};
//执行网络请求
const fetchData = (endpoint, schema) => {
  return get(endpoint).then((data) => {
    return normalizeData(data, schema);
  });
};
//根据schema，将获取的数据扁平化处理
const normalizeData = (data, schema) => {
  const { id, name } = schema;
  let keyValueObj = {
    //存储扁平化数据
  };
  let ids = []; //存储获取到的id
  if (Array.isArray(data)) {
    data.forEach((item) => {
      keyValueObj[item[id]] = item;
      ids.push(item[id]);
    });
  } else {
    keyValueObj[data[id]] = data;
    ids.push(data[id]);
  }
  return {
    [name]: keyValueObj,
    ids,
  };
};
