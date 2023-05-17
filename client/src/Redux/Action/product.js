import axios from "axios";

// create product



import { server } from "../../serverUrl";

export const createProduct=(newForm)=> async(dispatch)=>{
 try {
    
dispatch({
    type:"productCreateRequest",
});

const config={headers:{"Content-Type":"Multipart/form-data"}};

const {data}= await axios.post(`${server}/product/create-product`,newForm,config)

 dispatch({
    type:"productCreateSuccess",
    payload:data.product,
 });

 } catch (error) {
    dispatch({
        type:"productCreateFail",
        payload:error.response.data.message
    })
 }
}


// get all products for shop

export const getAllShopProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllShopProductSuccess",
        })
        const config={headers:{"Content-Type":"Multipart/form-data"}};

const {data}= await axios.get(`${server}/product/get-all-products-shop/${id}`)

 dispatch({
    type:"getAllShopProductSuccess",
    payload:data.products,
 });
    } catch (error) {
         dispatch({
            type:"getAllShopProductFailed",
            payload:error.response.data.message
         })
    }
}


// delete product of a shop

export const deleteProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteProductRequest",
        });
        const {data}=await axios.delete(`${server}/product/delete-shop-product/${id}`,{withCredentials:true})
        dispatch({
            type:"deleteProductSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"deleteProductFailed",
            payload:error.response.data.message
         })
    }
}