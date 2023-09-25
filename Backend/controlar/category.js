const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Category = require("../Modal/category");
const slugify = require("slugify");

const shortid = require("shortid");
const Errorhandeler = require("../utils/Errorhandeler");

// function createCategoryList(category, parentId = null) {
//   const categoryList = [];
//   let categories;
//   if (parentId == null) {
//     categories = category.filter((cat) => cat.parentId == undefined);
//   } else {
//     categories = category.filter((cat) => cat.parentId == parentId);
//   }

//   for (let cate of categories) {
//     categoryList.push({
//       _id: cate._id,
//       name: cate.name,
//       slug: cate.slug,
//       parentId: cate.parentId,
//       avatar: cate.avatar,
//       children: createCategoryList(category, cate._id),
//     });
//   }
//   return categoryList;
// }

// const createCategory = CatchAsyncError(async (req, res, next) => {
//   if (!req.body.name || req.body.name.trim() === "") {
//     return next(new Errorhandeler(error.message, 500));
//   }

//   const categoryObj = {
//     name: req.body.name,
//     slug: slugify(req.body.name),
//     avatar: req.file.filename,
//   };

//   if (req.body.parentId) {
//     categoryObj.parentId = req.body.parentId;
//   }

//   try {
//     const cat = new Category(categoryObj);
//     const category = await cat.save();
//     res.status(201).json({ category });
//   } catch (error) {
//     return next(new Errorhandeler(error.message, 500));
//   }
// });

// const getCategory = CatchAsyncError(async (req, res, next) => {
//   try {
//     const category = await Category.find();
//     let categoryList;
//     if (category) {
//       categoryList = createCategoryList(category);
//     }

//     res.status(201).json({
//       success: true,
//       categoryList,
//     });
//   } catch (error) {
//     return next(new Errorhandeler(error.message, 500));
//   }
// });

// module.exports = { createCategory, getCategory };

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.addCategory = async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    // avatar: req.file.filename,
  };

  if (req.file) {
    categoryObj.avatar = req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  // const cat = new Category(categoryObj);
  try {
    const cat = new Category(categoryObj);
    const category = await cat.save();
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (categories) {
      const categoryList = createCategories(categories);
      res.status(201).json({
        success: true,
        categoryList,
      });
    }
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};
// exports.updateCategories = async (req, res) => { 
//   console.log(req.body);
// }
 
exports.deleteCategories = async (req, res) => {
  const { ids } = req.body;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ success: true, message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
