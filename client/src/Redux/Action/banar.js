import axios from "axios";

// create product

import { server } from "../../serverUrl";

export const createBanar = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "banarCreateRequest",
    });

    const config = { headers: { "Content-Type": "Multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/banar/create-banar`,
      newForm,
      config
    );

    dispatch({
      type: "banarCreateSuccess",
      payload: data.banar,
    });
  } catch (error) {
    dispatch({
      type: "banarCreateFail",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop

export const deleteBanar = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBanarRequest",
    });
    const { data } = await axios.delete(`${server}/banar/delete-banar/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteBanarSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteBanarFailed",
      payload: error.response.data.message,
    });
  }
};

//get all banars
export const getAllBanar = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllBanarRequest",
    });

    const { data } = await axios.get(`${server}/banar/get-all-banar`);
    dispatch({
      type: "getAllBanarSuccess",
      payload: data.banars,
    });
  } catch (error) {
    dispatch({
      type: "getAllBanarFailed",
      // payload: error.response.data.message,
    });
  }
};
