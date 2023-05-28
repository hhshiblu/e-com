import axios from "axios";

// create event

import { server } from "../../serverUrl";

export const addTocart = (cartItems) => async (dispatch) => {
  try {
    dispatch({
      type: "cartCreateRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${server}/cart/add-to-cart`,
      cartItems,
      config
    );
  

    dispatch({
      type: "cartCreateSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "cartCreateFail",
      payload: error.response.data.message,
    });
  }
};







