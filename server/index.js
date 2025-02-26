
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoute = require('./routes/products');
const customerRoute = require('./routes/customer');
const productRoutes = require('./routes/productRoutes');
const settingRoutes = require('./routes/setting');
const locationsRoute = require('./routes/location');
const prefixRunningNumbersRoute = require('./routes/prefix_running_numbers');
const gstSettingsRoute = require('./routes/gst_settings');
const emailSettingsRoute = require('./routes/email_settings');
const htmlRoutes = require('./routes/htmlRoutes');
const templateRoutes = require('./routes/template');
const customizeLabelRoutes = require('./routes/customize_label');
const emailFormateRoutes = require('./routes/email_formate');
const collectionRoutes = require('./routes/collection');
const smartCollectionRoutes = require('./routes/smart_collection');
const path = require('path');

const app = express();
app.use(bodyParser.json());
const port = 3001;

app.use(cors({
  origin: "https://generally-vertex-variety-isa.trycloudflare.com",  // Aapke frontend ka URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,store-name,api-version,access-token"
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the product routes
app.use('/api/products', productRoute);
app.use('/api/customers', customerRoute);
app.use('/api/all-products', productRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/locations', locationsRoute);
app.use('/api/prefix-running-numbers', prefixRunningNumbersRoute);
app.use('/api/gst-settings', gstSettingsRoute);
app.use('/api/email-settings', emailSettingsRoute);
app.use('/api/html', htmlRoutes);
app.use('/api/template', templateRoutes);
app.use('/api/customize-label', customizeLabelRoutes);
app.use('/api/email-formate', emailFormateRoutes);
app.use('/api/collection', collectionRoutes);
app.use('/api/smart-collection', smartCollectionRoutes);

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