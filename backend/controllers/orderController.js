
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto';

// Placing using COD

const placeOrder = async (req, res) =>{
    try {
        
        const { userId, items, amount, address } = req.body;
        
        // Generate a unique OrderID using crypto
        const orderId = crypto.randomBytes(12).toString('hex').toUpperCase();
        
        // Generate game keys for each item
        const gameKeys = {};
        items.forEach(item => {
            // Generate a unique game key for each item
            const gameKey = `${item.platform}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
            // Use item._id and platform as the key
            const itemKey = `${item._id}-${item.platform}`;
            gameKeys[itemKey] = gameKey;
        });
        
        const orderData = {
            orderId,
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            gameKeys
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        res.json({success: true, message: "Order Placed", orderId})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}




// Placing using stripe method

const placeOrderStripe = async (req, res) =>{
    
}



// Placing using Razorpay

const placeOrderRazorpay = async (req, res) =>{
    
}





// all orders data for admin panel
const allOrders = async (req, res) => {
    try {
        
        const orders = await orderModel.find({})
        res.json({success: true, orders});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}




// user order data for frontend
const userOrders = async (req, res) => {
    try {
        
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        
        // Process orders to include orderId and gameKeys with each item
        const processedOrders = orders.map(order => {
            const orderObj = order.toObject();
            // Add orderId to each item in the order
            orderObj.items = orderObj.items.map(item => {
                // Add orderId to the item
                item.orderId = orderObj.orderId;
                // Add game key to the item if it exists
                const itemKey = `${item._id}-${item.platform}`;
                if (orderObj.gameKeys && orderObj.gameKeys[itemKey]) {
                    item.gameKey = orderObj.gameKeys[itemKey];
                }
                return item;
            });
            return orderObj;
        });
        
        res.json({success: true, orders: processedOrders});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}




// update order status

const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({success: true, message: "Status Updated"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};
