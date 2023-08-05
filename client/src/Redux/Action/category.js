import axios from "axios";

// create event

import { server } from "../../serverUrl";

export const addCategory = (form) => async (dispatch) => {
  try {
    dispatch({
      type: "CategoryCreateRequest",
    });

    const config = {
      headers: { "Content-Type": "Multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/category/create`,
      form,
      config
    );

    dispatch({
      type: "CategoryCreateSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "CategoryCreateFail",
      payload: error.response.data.message, // The server's error message may be "invalid category name"
    });
  }
};

//get all event

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoryRequest",
    });

    const { data } = await axios.get(`${server}/category/get-all-category`);

    dispatch({
      type: "getAllCategorySuccess",
      payload: { categories: data.categoryList },
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoryFailed",
      payload: error.response.data.message,
    });
  }
};
