const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js')

router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      
      res.json({
        success: true,
        count: products.length,
        data: products
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Товар не найден'
        });
      }
      
      res.json({
        success: true,
        data: product
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl
      });
      
      const savedProduct = await product.save();
      
      res.status(201).json({
        success: true,
        data: savedProduct
      });
      
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Проверьте правильность полей',
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  module.exports = router;