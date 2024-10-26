const express = require('express');
const router = express.Router();
const authenticator = require('../middleware/requireAuth.js');

const { getProducts, getSingleProduct, postProduct, updateProduct, deleteProduct, putProductGalleryImages, getFeaturedProudcts, getProductsCount} = require('../controllers/productController');
const upload = require('../middleware/uploadProductImage.js');

// GET all products
router.get('/', getProducts);

// GET a single product
router.get('/:id', getSingleProduct);

// POST a new product with multiple images
//router.post('/upload', upload.array('productImages', 30), postProduct);
router.post('/', upload.single('image', 12), postProduct);

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
