import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isloading: false,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  for (let cate of categories) {
    if (cate._id === parentId) {
      myCategories.push({
        ...cate,
        children:
          cate.children && cate.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cate.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cate,
        children:
          cate.children && cate.children.length > 0
            ? buildNewCategories(parentId, cate.children, category)
            : [],
      });
    }
  }
  return myCategories;
};

export const categoryReducer = createReducer(initialState, {
  CategoryCreateRequest: (state) => {
    state.isloading = true;
  },
  CategoryCreateSuccess: (state, action) => {
    const category = action.payload;

    state.isloading = false;
    // state.category = buildNewCategories(
    //   category.parentId,
    //   state.category,
    //   category
    // );
    state.category= action.payload;
    state.success = true;
  },
  CategoryCreateFail: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all category
  getAllCategoryRequest: (state) => {
    state.isloading = true;
  },
  getAllCategorySuccess: (state, action) => {
    state.isloading = false;
    state.categories = action.payload.categories;
  },

  getAllCategoryFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
