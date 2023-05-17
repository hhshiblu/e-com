import axios from "axios";
import { server } from "../../serverUrl";


// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    if (error.response) {
      // If the error has a response property
      dispatch({
        type: "LoadUserFail",
        payload: error.response.data.message,
      });
    } else {
      // If the error does not have a response property
      dispatch({
        type: "LoadUserFail",
        payload: "An error occurred.",
      });
    }
  }
};

// load seller

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/seller/getseller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};