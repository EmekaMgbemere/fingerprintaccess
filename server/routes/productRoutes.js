const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');

router.get('/', ProductController.ProductRegistry);
router.post('/', ProductController.ProductDisplay);
router.get('/:id', ProductController.ProductDelete);
router.put('/:id', ProductController.ProductSearch);
router.delete('/:id', ProductController.ProductUpdate);

module.exports = router;