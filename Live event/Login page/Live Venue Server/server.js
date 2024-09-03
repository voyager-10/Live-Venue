const express = require('express');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

const razorpay = new Razorpay({
    key_id: '******',
    key_secret: '******'
});

// Route to create a new order
app.post('/create-order', async (req, res) => {
    const options = {
        amount: 1000, // Amount in paise
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: '1'
    };
    
    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to handle payment success callback
app.post('/payment-success', (req, res) => {
    // Handle payment success here
    res.send('Payment successful');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
