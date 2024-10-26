// Define the routes for the users

// Required objects
const express = require("express");

// middlewares
const authenticator = require('../middleware/requireAuth.js');
const adminAuthoriser = require('../middleware/requireAdmin.js');

// Controller Functions
const {
    getAllUsers, 
    getSingleUser,
    postUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/userController')
//const { loginUser, signupUser } = require("../controllers/userController");


// Create router which is an instance of express
const router = express.Router();

// Routes
router.get('/', getAllUsers);
router.get('/:id', authenticator, getSingleUser);
router.post('/', postUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


router.post('/login', login)

/*
// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);
*/


// Export the router
module.exports = router;
