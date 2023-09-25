
import axios from "axios";
import { server } from "../../serverUrl";

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

export const addCategory = (form) => async (dispatch) => {
  try {
    dispatch({
      type: "CategoryCreateRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/category/create`,
      form,
      config
    );

    dispatch({
      type: "CategoryCreateSuccess",
      payload: { category: data.category },
    });
  } catch (error) {
    dispatch({
      type: "CategoryCreateFail",
      payload: error.response.data.message,
    });
  }
};

export const updateCategories = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateCateRequest" });
    const config = {
      withCredentials: true,
    };
    console.log(formData);
    const { data } = await axios.post(
      `${server}/category/update`,
      formData,
      config
    );

    if (data.status === 201) {
      dispatch({ type: "updateCateSuccess" });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: "updateCateFailed",
        payload: { error: data.error },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteCategories = (ids) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCateRequest" });
    console.log("jasjfaj", ids);
    const { data } = await axios.post(`${server}/category/delete`, { ids });

    if (data.status === 201) {
      dispatch(getAllCategory());
      dispatch({ type: "deleteCateSuccess" });
    } else {
      dispatch({
        type: "deleteCateFailed",
        payload: { error: data.error },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
