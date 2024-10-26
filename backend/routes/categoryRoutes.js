const express = require('express');
const router = express.Router();
const {
    getAllCategories, 
    getSingleCategory,
    postCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');


router.get('/', getAllCategories);

router.get('/:id', getSingleCategory);

router.post('/', postCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)


module.exports = router;