export const leatestOrderData = (orderData) => async (dispatch) => {

    dispatch({
      type: "orderDataStore",
      payload: orderData,
    });
   

};
