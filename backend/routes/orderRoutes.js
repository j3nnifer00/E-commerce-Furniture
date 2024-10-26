const express = require('express');
const router = express.Router();

const authenticator = require('../middleware/requireAuth.js');
const adminAuthoriser = require('../middleware/requireAdmin.js');

const {
    getAllOrders, 
    getSingleOrder,
    postOrder,
    updateOrder,
    deleteOrder,
    getTotalSales,
    getAllUserOrders
} = require('../controllers/orderController');


router.get('/', getAllOrders);

router.get('/:id', getSingleOrder);

router.post('/', postOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

router.get('/get/totalSales', getTotalSales);

router.get('/get/userOrders/', authenticator, getAllUserOrders);


module.exports = router;