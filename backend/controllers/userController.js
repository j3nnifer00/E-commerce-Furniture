// Database logic for users

const {User} = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) =>{
    const userList = await User.find().select('-password');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(userList);
}


const getSingleUser = async(req,res)=>{
    try{
      const userId = req.user._id;

      if(req.params.id !== userId.toString()){
        return res.json({success: false, message: "you don't have access"})
      }
      const user = await User.findById(userId).select('-password');

      if(!user) {
          return res.status(500).json({message: 'The user with the given ID was not found.'})
      } 
      res.status(200).send(user);
    }catch(error){
      return res.status(500).json({success: false, error: error}) 
    }
}



const postUser =  async (req,res)=>{
    let newUser = new User({
      // the left should be the same name as the models'
      // the right should be the same as from the frontend
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip, 
        country: req.body.country,
        isAdmin: req.body.isAdmin,
    })

    try{
        newUser = await newUser.save();
        res.send(newUser);
    }catch (err){
        res.send(err);
    }
}


const updateUser =  async (req, res)=> {
    const user = User.findByIdAndUpdate(
        req.params.id,
        {
          // the left should be the same name as the models'
          // the right should be the same as from the frontend
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            phone: req.body.phone,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip, 
            country: req.body.country,
            isAdmin: req.body.isAdmin,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be updated!')

    res.send(user);
}

const deleteUser = (req, res)=>{
    User.findByIdAndDelete(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user has been deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}



// ------------------ login 
const login = async (req, res) => {
  const user = await User.findOne({email: req.body.email})

  if(! user){
    return res.status(400).json({error: 'user not found'})
  }

  if(user && await bcrypt.compareSync(req.body.password, user.password)){
    //send JWT!
    const token = jwt.sign({
      userId: user.id,
      isAdmin: user.isAdmin}, 
      process.env.JWT_KEY, 
      {expiresIn: '1d'});
    res.status(200).json({email: user.email, token: token})
  } else{
    res.status(401).json({error: 'incorrect password'})
  }


}

module.exports = {
    getAllUsers, 
    getSingleUser,
    postUser,
    updateUser,
    deleteUser,
    login
};





/*
// Required packages
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Define token structure
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// POST Login User
const loginUser = async (req, res) => {
  // Destructure the body
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); // Use the static signup method in model to signup user using the email and password from body
    const token = createToken(user._id); // Create token
    res.status(201).json({ email, token }); // Successful send back email and token object
  } catch (error) {
    res.status(400).json({ error: error.message }); // Unsuccessful send back error message
  }
};

// Post Signup User
const signupUser = async (req, res) => {
  // Destructure the body
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password); // Use the static signup method in model to signup user using the email and password from body
    const token = createToken(user._id); // Create token
    res.status(201).json({ email, token }); // Successful send back email and token object
  } catch (error) {
    res.status(400).json({ error: error.message }); // Unsuccessful send back error message
  }
};

module.exports = {
  loginUser,
  signupUser,
};


*/
