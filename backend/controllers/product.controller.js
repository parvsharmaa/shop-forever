import Product from '../models/product.model.js';

const addProduct = async (req, res) => {
  try {
    const { title, price, image } = req.body;

    // Validate inputs
    if (!title || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new product
    const newProduct = new Product({
      title,
      image,
      price,
    });

    // Save product to the database
    const product = await newProduct.save();

    res
      .status(201)
      .json({ success: true, message: 'Product added successfully!', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const removeProduct = async (req, res) => {
  try {
    // find and delete the product
    await Product.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: 'Product removed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
