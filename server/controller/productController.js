const {
  Product,
  validatePagination,
  validateFilter,
} = require("../models/product");

const getProductsByPagination = async (req, res, next) => {
  try {
    // throw new Error("all done");
    const { error } = validatePagination(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    //if more than available page and pagesize sent --> err ?
    const { pageSize, pageNo } = req.body;
    const page = pageNo || 1;
    const itemsPerPage = pageSize || 3;
    const products = await Product.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const count = await Product.countDocuments();

    res.status(200).json({
      products,
      pageSize: itemsPerPage,
      pageNo: page,
      totalItems: count,
    });
  } catch (error) {
    //res.status(500).json({ error: "Failed to fetch products" });
    next(error); // Pass error to error handler
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ message: "The product with the given ID was not found." });

    res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};

// sort -price low to high
// sort -price  high to low

// size  s m l
// search
//default sort
//change to sizes
const getFilterProducts = async (req, res, next) => {
  try {
    const { error: errFilter } = validateFilter(req.body);
    if (errFilter)
      return res.status(400).json({ message: errFilter.details[0].message });

    const { pageSize, pageNo, query, sizes } = req.body;

    const page = pageNo || 1;
    const itemsPerPage = pageSize || 3;

    const queryObj = {};

    const pricingOption = ["S", "M", "L"];

    // size 0 is all
    //size 1 is medium
    //array of sizes
    if (sizes && Array.isArray(sizes) && sizes.length) {
      // queryObj.size = size;
      const sizeValues = sizes.map((val) => pricingOption[val - 1]);
      // console.log(sizeValues);
      queryObj.size = { $in: sizeValues };
    }

    // sort price low to high
    // adding sort after limit skip will result in not proper order? but adding sort before limit skip will increase query time

    //uses MongoDB's built-in 'i' flag for case-insensitive matching m
    // "Apple" matches "apple", "APPLE", "ApPlE", etc.
    // if (query) {
    //   const regexp = new RegExp(`^${query}`, "i");
    //   queryObj["$or"] = [{ name: regexp }, { brand: regexp }];
    // }

    if (query) {
      const regexp = new RegExp(`^${query}`, "i");
      queryObj["$or"] = [
        { name: { $regex: regexp } }, //$regex --> Provides regular expression capabilities for pattern matching strings in queries.
        { brand: { $regex: regexp } },
      ];
    }

    const products = await Product.find(queryObj)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const count = await Product.countDocuments(queryObj);

    res.status(200).json({
      products,
      pageSize: itemsPerPage,
      pageNo: page,
      totalItems: count,
      query,
      sizes,
    });
  } catch (error) {
    next(error);
  }
};

//get prodcut by id

module.exports = {
  getProductsByPagination,
  getFilterProducts,
  getSingleProduct,
};
