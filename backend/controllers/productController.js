const Product = require('../models/productModel');
const { Category } = require('../models/categoryModel');

const mongoose = require('mongoose');
constpath = require('path');


// get all products
const getProducts = async(req, res) => {
    //localhost:3000/api/v1/products?categories=2424, 98493
    let filter = {};

    if(req.query.categories){
        filter.category = req.query.categories.split(',');
    }

    if(req.query.ids) {
        const ids = req.query.ids.split(',').map(id => id.trim());
        filter._id = { $in: ids }; // MongoDB의 $in 연산자를 사용하여 해당 ID 목록에 있는 상품만 반환
    }


    const totalCount = await Product.countDocuments(filter);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || totalCount;

    try {
        const productList = await Product.find(filter)
        .skip((page - 1) * limit) // 페이지에 맞게 건너뛰기
        .limit(limit)             // 페이지당 아이템 수 제한
        .populate('category');;

        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found.' });
        }

        // 전체 제품 수를 구하여, "더보기" 버튼을 위한 상태 정보 추가

        res.status(200).json({
            products: productList,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}


// get a single product
const getSingleProduct = async(req, res) => {

    /*
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }*/

    const product = await Product.findById(req.params.id).populate('category')

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

const postProduct = async (req, res) => {
    try {
        // Check if the category exists
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        // Handle file uploads (uncomment when you implement image upload)
        // const productImages = req.files.map(file => file.path);

        // Check for required fields
        let emptyFields = [];
        if (!req.body.name) emptyFields.push('name');
        if (!req.body.description) emptyFields.push('description');
        if (!req.body.price) emptyFields.push('price');

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
        }

        // Create the product
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.file ? `ProductImages/${req.file.filename}` : '',
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        });

        return res.status(201).json({ success: true, product: product }); // Use 201 for created
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(400).json({ error: error.message }); // Make sure to return
    }
};

// post(register) a new product
/* const postProduct = async (req, res) => {
    //const productImages = [];
    try{
        
        const category = await Category.findById(req.body.category);
    }catch(error){
        res.status(400).json({ error: error.message });
    }

    /*
    req.files.forEach(file => {
        productImages.push(file.path);
    }); 
    */

    /*
    let emptyFields = [];

    if (!productName) {
        emptyFields.push('productName');
    }
    if (!productDescription) {
        emptyFields.push('productDescription');
    }
    if (!productPrice) {
        emptyFields.push('productPrice');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.file ? `ProductImages/${req.file.filename}` : '',
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        });
        res.status(200).json({success: true, product: product});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}; */

const updateProduct = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
     }
    
    try{
        
        const category = await Category.findById(req.body.category);
    }catch(error){
        res.status(400).json({ error: error.message });
    }

    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        {new: true})
    }catch(err){
        res.status(400).json({ error: error.message });
    }
}


const deleteProduct = async (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if(product) {
            return res.status(200).json({success: true, message:'the product has been deleted'})
        } else{
            return res.status(404).json({success: false, message: 'product not found'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
}

const getProductsCount = async (req, res) => {
    const count = await Product.countDocuments()

    if(!count){
        res.status(500).json({success:false})
    }

    res.send({
        count: count
    })
}

const getFeaturedProudcts = async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count); //enusre count is type Number

    if(!products) {
        res.status(200).json({success: false, message: 'no featured products'})        
    }

    res.send(products)
}
 
const putProductGalleryImages = async (req, res) => {
    return res.json({message: 'put product gallery images API'})
}





module.exports = {
    getProducts,
    getSingleProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    putProductGalleryImages,
    getFeaturedProudcts,
    getProductsCount
};
