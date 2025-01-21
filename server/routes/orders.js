const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET all orders with optional search, date filter and pagination
router.get('/', async (req, res) => {
    try {
        const { search, startDate, endDate, page = 1, limit = 50 } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                { orderId: { $regex: search, $options: 'i' } },
                { customerName: { $regex: search, $options: 'i' } }
            ];
        }

         if (startDate && endDate) {
              query.invoiceDate = {
                  $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                  $lte: new Date(new Date(endDate).setHours(23, 59, 59))
             }
         } else if (startDate) {
            query.invoiceDate = { $gte: new Date(new Date(startDate).setHours(0, 0, 0))}
        }

        const options = {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          sort: { invoiceDate: -1 } // Sort by invoice date descending by default
        };

        const orders = await Order.paginate(query, options);

        res.json(orders);

    } catch (err) {
      console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// GET one order
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// POST a new order
router.post('/', async (req, res) => {
    const order = new Order({
       orderId: req.body.orderId,
      customerName: req.body.customerName,
       customerEmail: req.body.customerEmail,
        items: req.body.items,
      totalTax: req.body.totalTax,
       totalAmount: req.body.totalAmount,
      paymentMode: req.body.paymentMode,
      notes: req.body.notes
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an order
 router.patch('/:id', getOrder, async (req, res) => {
     if (req.body.orderStatus != null) {
        res.order.orderStatus = req.body.orderStatus;
     }
  if (req.body.notes != null) {
     res.order.notes = req.body.notes;
  }

try{
   const updatedOrder = await res.order.save();
    res.json(updatedOrder);
} catch (err) {
     res.status(400).json({ message: err.message });
    }
});

// DELETE an order
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.deleteOne();
        res.json({ message: 'Order deleted' });
    } catch (err) {
       res.status(500).json({ message: err.message });
    }
});

// Middleware to get an order
async function getOrder(req, res, next) {
    let order;
    try {
       order = await Order.findById(req.params.id);
        if (order == null) {
          return res.status(404).json({ message: 'Cannot find order' });
        }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}
module.exports = router;