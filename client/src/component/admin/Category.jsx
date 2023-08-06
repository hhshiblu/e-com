import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../Redux/Action/category";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isloading } = useSelector((state) => state.category);

  const [confirm, setConfirm] = useState(false);
  const [name, setName] = useState("");

  const [parentCategoryId, setParentCateId] = useState("");

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(addCategory({ name, parentId: parentCategoryId }));
      dispatch(getAllCategory());
      window.location.reload(true);
       toast.success("category added successfully!");
    } catch (error) {
      toast.error("category cann't added successfully!");
    }
  };

  const renderCategory = (categories) => {
    let myCaregories = [];
    for (let cate of categories) {
      myCaregories.push(
        <li key={cate.name}>
          {cate.name}
          {cate.children.length > 0 ? (
            <ul className="pl-10 py-1">{renderCategory(cate.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCaregories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
      });
      if (cate.children.length > 0) {
        createCategoryList(cate.children, options);
      }
    }
    return options;
  };

  return (
    <div className="w-full  pt-5 overflow-y-scroll overflow-hidden h-[88vh]">
      <div className="w-[97%] pl-12">
        <div className="flex justify-between items-center md:px-12 sm:px-2 mt-4">
          <h1 className="font-semibold "> All Category</h1>
          <h1
            className="font-semibold "
            onClick={() => {
              setConfirm(true);
            }}
          >
            add Category
          </h1>
        </div>

        {categories && <ul>{renderCategory(categories)}</ul>}
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

              <form onSubmit={handleSubmit}>
                <div>
                  <label className="pb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required // Add the required attribute
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="category name"
                  />
                  <select
                    value={parentCategoryId}
                    name="parentId"
                    onChange={(e) => setParentCateId(e.target.value)}
                  >
                    <option>select categories</option>
                    {createCategoryList(categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />

                <div>
                  <button
                    type="submit"
                    disabled={isloading}
                    className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
                      isloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-800"
                    }`}
                  >
                    {isloading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
