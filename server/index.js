
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoute = require('./routes/products');
const customerRoute = require('./routes/customer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Use the product routes
app.use('/api/products', productRoute);
app.use('/api/customers', customerRoute);

// Connect to MongoDB

require('dotenv').config(); // This will load the variables from the .env file
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));



// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));