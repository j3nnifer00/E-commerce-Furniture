const {Category} = require('../models/categoryModel');

const getAllCategories = async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
}


const getSingleCategory = async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
}



const postCategory =  async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        colour: req.body.colour,
        icon: req.body.icon
    })


    if(!category)
        return res.status(400).send('the category cannot be created!')

    try{
        category = await category.save();
        res.send(category);
    }catch (err){
        res.send(err);
    }
}


const updateCategory = async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            colour: req.body.colour,
            icon: req.body.icon || category.icon
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
}

const deleteCategory = (req, res)=>{
    Category.findByIdAndDelete(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

module.exports = {
    getAllCategories, 
    getSingleCategory,
    postCategory,
    updateCategory,
    deleteCategory
};