const moongose = require("mongoose");
const Joi = require("joi");

//change to size schema
// const PricingOption = {
//   SMALL: "S",
//   MEDIUM: "M",
//   LARGE: "L",
// };

// const PricingOptionValues = {
//   SMALL: 0,
//   MEDIUM: 1,
//   LARGE: 2,
// };

const productSchema = new moongose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 255,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    min: 1,
  },
  images: {
    type: [
      {
        source: {
          type: String,
          required: true,
        },
      },
    ],
    require: true,
  },
  size: {
    type: String,
    enum: {
      values: ["S", "M", "L"],
      // values : Object.keys(object)
      message: "size {VALUE} is not supported",
    },
  },
  brand: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = moongose.model("Product", productSchema);

function validatePagination(body) {
  const paginateSchema = Joi.object({
    pageSize: Joi.number().min(1).strict(true),
    //.integer().strict(true),
    pageNo: Joi.number().min(1).strict(true),
    //strict -->  enforces number types
  });

  return paginateSchema.validate(body);
}

function validateFilter(body) {
  const filterSchema = Joi.object({
    // size: Joi.number().valid(1, 2, 3).strict(true),
    // size: Joi.string(),
    //.valid("S", "M", "L"), //.required()
    sizes: Joi.array().min(0).items(Joi.number().valid(1, 2, 3)),
    query: Joi.string(),
    pageSize: Joi.number().min(1).strict(true),
    pageNo: Joi.number().min(1).strict(true),
  });

  return filterSchema.validate(body);
}

module.exports = { Product, validatePagination, validateFilter };
