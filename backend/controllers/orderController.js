const {Order} = require('../models/orderModel');
const Product = require('../models/productModel');
const {OrderItem} = require('../models/orderItemsModel');

const getAllOrders = async (req, res) => {
    try {
        const orderList = await Order.find().populate('orderItems').sort('dateOrdered');

        if (!orderList || orderList.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, data: orderList });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};



const getSingleOrder = async(req,res)=>{
    const order = await Order.findById(req.params.id)
    .populate('user')
    .populate({ 
        path: 'orderItems',
        populate: {
                path: 'product', 
                select: 'name'}
    });

    if(!order) {
        return res.status(500).json({message: 'The order with the given ID was not found.'})
    } 
    return res.status(200).send(order);
}



const postOrder =  async (req,res)=>{
    const { orderItems, user, paymentMethod } = req.body;

    if (orderItems.length === 0){
        return res.status('404').json({success: false, message: 'empty order items'})
    }

    try{
        let totalPrice = 0;
        const createdOrderItems = [];

        // 1. Check the product stock for each item if available
        // and calculate the total Price
        for (const item of orderItems) {
            const product = await Product.findById(item.product);

            // check if there is such product
            if (!product) {
                return res.status(404).json({ message: "product not found"});
            }

            // check the stock
            if (item.quantity > product.countInStock) {
                return res.status(400).json({message: `Not enough stock for the ${product.name}`})
            }

            // if good to order calculate the total price
            totalPrice += product.price * item.quantity;

            const orderItem = new OrderItem({
                product: product._id,
                price: product.price,
                quantity: item.quantity,
            });

            const savedOrderItem = await orderItem.save();
            createdOrderItems.push(savedOrderItem._id);

        }



        // 2. save it to the DB
        const newOrder = new Order({
            orderItems: createdOrderItems,
            user,
            totalPrice,
            paymentMethod
            // status and dateOrdered will be added automatically.
        })

        const savedOrder = await newOrder.save();
        
        return res.status(201).json({ success: true, order: savedOrder });

    } catch (error) {
        console.error("Error creating order: ", error);
        return res.status(500).json({ message: "Server error" });
    }
}


const updateOrder = async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
}

const deleteOrder = (req, res)=>{
    Order.findByIdAndDelete(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem);
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}


/// ----------------- admin pannel sales statistic -------------
const getTotalSales =  async (req, res) => {
    try{
        const totalSalesResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            }
        ]);

        const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

        res.send({ totalSales: totalSales });

    } catch(err){
        res.status(500).send({ error: err.message });
    }

}

/// ----------------- customer pannel orders ------------------
const getAllUserOrders = async (req, res) =>{
    try{
        const userId = req.user._id; // req.user에서 사용자 ID 가져오기
        const orderList = await Order.find({ "user.id": userId }).populate({ 
            path: 'orderItems',
            populate: {
                    path: 'product', 
                    select: 'name image'}
        }).sort('dateOrdered');

        res.status(200).json({ success: true, orderList });
    }catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
}


module.exports = {
    getAllOrders, 
    getSingleOrder,
    postOrder,
    updateOrder,
    deleteOrder,
    getTotalSales,
    getAllUserOrders
};