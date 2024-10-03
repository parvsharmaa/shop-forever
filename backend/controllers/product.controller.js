import Product from '../models/product.model.js';

/*
  addProduct:
  - Adds a new product to the database.
  - Validates that all required fields are provided (title, price, image).
*/
const addProduct = async (req, res) => {
  try {
    const { title, price, image } = req.body;

    // Validate input fields
    if (!title || !price || !image) {
      return res.json({ message: 'All fields are required' });
    }

    // Create a new product instance
    const newProduct = new Product({
      title,
      image,
      price,
    });

    // Save the new product to the database
    const product = await newProduct.save();

    // Return success response with the created product
    res
      .status(201)
      .json({ success: true, message: 'Product added successfully!', product });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  listProduct:
  - Retrieves and returns a list of all products in the database.
*/
const listProduct = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});

    // Send the list of products in the response
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  removeProduct:
  - Deletes a specific product from the database based on its ID.
*/
const removeProduct = async (req, res) => {
  try {
    // Find and delete the product by ID
    await Product.findByIdAndDelete(req.body.id);

    // Send a success message after deletion
    res.json({ success: true, message: 'Product removed successfully!' });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  singleProduct:
  - Retrieves details of a single product based on its ID.
*/
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Fetch the product by its ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.json({ success: false, message: 'Product not found' });
    }

    // Send the product details in the response
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
