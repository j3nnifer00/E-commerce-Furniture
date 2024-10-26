const express = require('express');
const router = express.Router();

const { 
    getProducts, 
    getSingleProduct, 
    postProduct, 
    updateProduct, 
    deleteProduct, 
    putProductGalleryImages, 
    getFeaturedProudcts, 
    getProductsCount} = require('../controllers/adminController');

// GET all products
router.get('/', getProducts);

// GET a single product
router.get('/:id', authenticator, getSingleProduct);

// POST a new product with multiple images
//router.post('/upload', upload.array('productImages', 30), postProduct);
router.post('/', postProduct);

// UPDATE a product
router.put('/:id', updateProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// PUT gallery-images
router.put('/gallery-images/:id', putProductGalleryImages)

// GET featured products
router.get('/get/featured/:count', getFeaturedProudcts), 

// GET products count
router.get('/get/count', getProductsCount)


module.exports = router;
