const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/paginated", productController.getProductsByPagination);
router.post("/filter", productController.getFilterProducts);
router.get("/:id", validateObjectId, productController.getSingleProduct);

module.exports = router;
