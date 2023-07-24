const Product = require('../models/productSchema');
const ApiErrorHandler = require('../utils/ApiErrorHandler');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

const createProduct = async (req, res) => {
    const { name, price, image, description, rating } = req.body;
    // if (!name || !price || !image || !description)
    //     throw new ApiErrorHandler('Please provide all required fields', 400);

    const product = await Product.create({
        description,
        name,
        rating,
        image,
        price,
    });

    res.status(201).json(product);
};

const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    // const product =await Product.findOne({_id:id})
    const product = await Product.findById(id);
    res.status(200).json(product);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
