import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../Redux/Action/category";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
const Category = () => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  // const [categoryImage, setCategoryImage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setConfirm(false);
    }
  }, [category.loading]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("file", avatar);
    dispatch(addCategory(form))
      .then(() => {
        toast.success("category add successfull");
        return dispatch(getAllCategory());
      })
      .catch((error) => {
        toast.error("an error show");
      });

    setCategoryName("");
    setParentCategoryId("");
    setAvatar(null);
    setConfirm(false);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
const updateCategoriesForm = (e) => {
  e.preventDefault();
  const form = new FormData();
  let _id, name, parentId; // Define _id, name, and parentId variables

  expandedArray.forEach((item, index) => {
    ({ value: _id, name, parentId } = item); // Destructure values into variables
    form.append("_id", _id);
    form.append("name", name);
    form.append("parentId", parentId ? parentId : "");
  });

  checkedArray.forEach((item, index) => {
    ({ value: _id, name, parentId } = item); // Destructure values into variables
    form.append("_id", _id);
    form.append("name", name);
    form.append("parentId", parentId ? parentId : "");
  });

  dispatch(updateCategories({ _id, name, parentId })).then(() => { toast.success("category update"); setUpdateCategoryModal(false);  return dispatch(getAllCategory()); });
  setCheckedArray([]);
};




  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then(() => {
        toast.success("delete successfull");
        setDeleteCategoryModal(false);
        return dispatch(getAllCategory());
      });
    }

    setDeleteCategoryModal(false);
  };

  const categoryList = createCategoryList(category.categories);

  return (
    <div className="">
      <div className="flex justify-between w-full px-6 py-3 ">
        <h3 className="text-[21px]  font-semibold text-slate-600">Category</h3>
        <div className="flex  items-center gap-2">
          <span className="mr-2   font-semibold text-slate-600">Actions:</span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
            onClick={() => setConfirm(true)}
          >
            <IoIosAdd size={20} />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={deleteCategory}
          >
            <IoIosTrash size={20} />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            onClick={updateCategory}
          >
            <IoIosCloudUpload size={20} />
          </button>
        </div>
      </div>
      <hr />
      <div className="w-full pl-14 pt-2">
        <CheckboxTree
          nodes={renderCategories(category.categories)}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <IoIosCheckbox />,
            uncheck: <IoIosCheckboxOutline />,
            halfCheck: <IoIosCheckboxOutline />,
            expandClose: <IoIosArrowForward />,
            expandOpen: <IoIosArrowDown />,
          }}
        />
      </div>

      <div>
        {confirm && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[90%] 800px:w-[60%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setConfirm(false)} />
              </div>
              <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
                Add Category
              </h3>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex  flex-col md:flex-row gap-4">
                  <div className="md:w-[50%]">
                    <label className="pb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={categoryName}
                      placeholder={`Category Name`}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="my-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="md:w-[50%]">
                    <label className="pb-2 block">
                      Select Parent Category{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="p-[7px] pl-4 rounded-md w-[100%] "
                      value={parentCategoryId}
                      onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                      <option>select category</option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <br />
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="file"
                      id="file-input"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={category?.loading}
                    className={`group relative mt-4 w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
                      category?.loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-800"
                    }`}
                  >
                    {category?.loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        {deleteCategoryModal && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[90%] 800px:w-[60%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1
                  size={25}
                  onClick={() => setDeleteCategoryModal(false)}
                />
              </div>
              <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
                Confirm Delete
              </h3>

              <h5 className="font-semibold pb-2">Expanded category : </h5>
              {expandedArray.map((item, index) => (
                <span key={index}>
                  {" "}
                  <ul className=" pl-4 text-gray-500 list-disc">
                    <li className="gap-2">{item.name} ,</li>
                  </ul>
                </span>
              ))}
              <h5 className="font-semibold ">Checked for delete : </h5>
              {checkedArray.map((item, index) => (
                <span key={index}>
                  <ul className=" pl-4 text-gray-500 list-disc">
                    <li className="gap-2">{item.name} ,</li>
                  </ul>
                </span>
              ))}

              <div className="flex gap-2  justify-center mt-3">
                <button
                  className=" bg-[#cf3232] text-white px-3 rounded-md text-center "
                  onClick={deleteCategories}
                >
                  yes
                </button>
                <button
                  className=" bg-green-700 text-white px-3 rounded-md"
                  onClick={() => {
                    setDeleteCategoryModal(false);
                    setCheckedArray([]); // Clear checkedArray
                    setExpandedArray([]); // Clear expandedArray
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {updateCategoryModal && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[90%] 800px:w-[60%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1
                  size={25}
                  onClick={() => setUpdateCategoryModal(false)}
                />
              </div>
              <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
                UpdateCategories
              </h3>

              <h5 className="font-semibold pb-2">Expanded category : </h5>
              {expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />

                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    >
                      <option>select category</option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              <h5 className="font-semibold ">Checked for delete : </h5>
              {checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />

                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    >
                      <option>select category</option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

              <div className="flex gap-2  justify-center mt-3">
                <button
                  className=" bg-[#cf3232] text-white px-3 rounded-md text-center "
                  onClick={updateCategoriesForm}
                >
                  yes
                </button>
                <button
                  className=" bg-green-700 text-white px-3 rounded-md"
                  onClick={() => {
                    setDeleteCategoryModal(false);
                    setCheckedArray([]); // Clear checkedArray
                    setExpandedArray([]); // Clear expandedArray
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
