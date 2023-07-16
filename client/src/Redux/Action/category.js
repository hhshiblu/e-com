import axios from "axios";

// create event

import { server } from "../../serverUrl";

export const createCategory = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "CategoryCreateRequest",
    });

    const config = { headers: { "Content-Type": "Multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/category/create`,
      newForm,
      config
    );

    dispatch({
      type: "CategoryCreateSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "CategoryCreateFail",
      payload: error.response.data.message,
    });
  }
};

//get all event 

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoryRequest",
    });

    const {data} = await axios.get(`${server}/category/get-all-category`);

    dispatch({
      type: "getAllCategorySuccess",
      payload: data.categoryList,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoryFailed",
      payload: error.response.data.message,
    });
  }
}