const express = require('express');
const { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');
const router = express.Router();

router.route("/products").get(getAllProducts).post(createProduct);
router.route("/products/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;