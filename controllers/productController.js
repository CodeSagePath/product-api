const { Op } = require('sequelize'); // Import Op from Sequelize
const Product = require('../models/product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    if (!name && !description && !category) {
      return res.status(400).json({ error: 'Name, Description and Category are required' });
    }
    const product = await Product.create({ name, price, description, category });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all products (with optional pagination and search)
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, size = 10, search = '' } = req.query;
    const offset = (page - 1) * size;
    const whereClause = search ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
      ],
    } : {};
    const products = await Product.findAll({ where: whereClause, limit: parseInt(size), offset });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
