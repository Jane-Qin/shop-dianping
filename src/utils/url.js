export default {
    getProductList:(path,rowIndex,pageSize)=>{
        return `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`
    },
    getProductDetailById:(id)=>{
        return `/mock/product_detail/${id}.json`
    },
    getShopById:(id)=>{
        return `/mock/shops/${id}.json`
    }
}