const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Category = require("../Modal/category");
const slugify = require("slugify");
const Errorhandeler = require("../utils/Errorhandeler");

function createCategoryList(category, parentId = null) {
  const categoryList = [];
  let categories;
  if (parentId == null) {
    categories = category.filter((cat) => cat.parentId == undefined);
  } else {
    categories = category.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of categories) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategoryList(category, cate._id),
    });
  }
  return categoryList;
}

const createCategory = CatchAsyncError(async (req, res,next) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return next(new Errorhandeler(error.message, 500));
  }

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  try {
    const cat = new Category(categoryObj);
    const category = await cat.save();
    res.status(201).json({ category });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

// const createCategory= CatchAsyncError( async (req,res,next)=>{
//     try {
//         const categoryObj={
//             name:req.body.name,
//             slug:slugify(req.body.name)
//          }

//          if(req.body.parentId){
//             categoryObj.parentId=req.body.parentId;
//          }

//           const cat=new Category(categoryObj);

//          await cat.save();
//          res.status(201).json({
//             success: true,
//             message: 'category added successfully',
//             cat,
//           })
//     } catch (error) {
//         return next(new Errorhandeler(error, 400))
//     }

// })

const getCategory = CatchAsyncError(async (req, res, next) => {
  try {
    const category = await Category.find();
    let categoryList;
    if (category) {
      categoryList = createCategoryList(category);
    }

    res.status(201).json({
      success: true,
      categoryList,
    });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

module.exports = { createCategory, getCategory };
