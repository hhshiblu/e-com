// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   categories: [],
//   isloading: false,
// };

// const buildNewCategories = (parentId, categories, category) => {
//   let myCategories = [];

//   for (let cate of categories) {
//     if (cate._id === parentId) {
//       myCategories.push({
//         ...cate,
//         children:
//           cate.children && cate.children.length > 0
//             ? buildNewCategories(
//                 parentId,
//                 [
//                   ...cate.children,
//                   {
//                     _id: category._id,
//                     name: category.name,
//                     slug: category.slug,
//                     parentId: category.parentId,
//                     children: category.children,
//                   },
//                 ],
//                 category
//               )
//             : [],
//       });
//     } else {
//       myCategories.push({
//         ...cate,
//         children:
//           cate.children && cate.children.length > 0
//             ? buildNewCategories(parentId, cate.children, category)
//             : [],
//       });
//     }
//   }
//   return myCategories;
// };

// export const categoryReducer = createReducer(initialState, {
//   CategoryCreateRequest: (state) => {
//     state.isloading = true;
//   },
//   CategoryCreateSuccess: (state, action) => {
//     const category = action.payload;

//     state.isloading = false;
//     state.category = buildNewCategories(
//       category.parentId,
//       state.category,
//       category
//     );
//     state.category= action.payload;
//     state.success = true;
//   },
//   CategoryCreateFail: (state, action) => {
//     state.isloading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

//   // get all category
//   getAllCategoryRequest: (state) => {
//     state.isloading = true;
//   },
//   getAllCategorySuccess: (state, action) => {
//     state.isloading = false;
//     state.categories = action.payload.categories;
//     console.log(action.payload.categories);
//   },

//   getAllCategoryFailed: (state, action) => {
//     state.isloading = false;
//     state.error = action.payload;
//   },

//   clearErrors: (state) => {
//     state.error = null;
//   },
// });



import { createReducer } from "@reduxjs/toolkit";


const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  return categories.map((cate) => {
    if (cate._id === parentId) {
      return {
        ...cate,
        children: [
          ...(cate.children || []),
          {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
            children: category.children || [],
          },
        ],
      };
    } else {
      return {
        ...cate,
        children: cate.children
          ? buildNewCategories(parentId, cate.children, category)
          : [],
      };
    }
  });
};

export const categoryReducer = createReducer(initialState, {
  CategoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  CategoryCreateSuccess: (state, action) => {
    const category = action.payload.category;

    state.isLoading = false;
    state.categories = buildNewCategories(
      category.parentId,
      state.categories,
      category
    );
  },
  CategoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getAllCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.categories = action.payload.categories;
  },
  getAllCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  updateCateRequest: (state) => {
    state.isLoading = true;
  },
  updateCateSuccess: (state) => {
    state.isLoading = false;
  },
  updateCateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error;
  },

  deleteCateRequest: (state) => {
    state.isLoading = true;
  },
  deleteCateSuccess: (state) => {
    state.isLoading = false;
  },
  deleteCateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
