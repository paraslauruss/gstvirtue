const express = require('express');
const router = express.Router();
const CustomizeLabel = require('../models/customize_label');

// Create or Update Customize Labels
router.post('/', async (req, res) => {
    const storeName = req.headers['store-name'];
    if (!storeName) {
        return res.status(400).send('Store name is required.');
    }

    const {
        customize_store_labels,
        store_information,
        billing_shipping_labels,
        product_items_labels,
        others_labels,
        footer_labels
    } = req.body;

    try {
        let label = await CustomizeLabel.findOne({ storeName });

        if (label) {
            // Update existing labels
            label.customize_store_labels = customize_store_labels;
            label.store_information = store_information;
            label.billing_shipping_labels = billing_shipping_labels;
            label.product_items_labels = product_items_labels;
            label.others_labels = others_labels;
            label.footer_labels = footer_labels;
        } else {
            // Create new labels
            label = new CustomizeLabel({
                storeName,
                customize_store_labels: customize_store_labels,
                store_information: store_information,
                billing_shipping_labels: billing_shipping_labels,
                product_items_labels: product_items_labels,
                others_labels: others_labels,
                footer_labels: footer_labels
            });
        }

        await label.save();

        res.status(200).json({
            message: 'Labels saved successfully',
            data: label
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    const storeName = req.headers['store-name'];
    if (!storeName) {
        return res.status(400).send('Store name is required.');
    }

    try {
        const label = await CustomizeLabel.findOne({ storeName });
        if (!label) {
            return res.status(404).send('Labels not found.');
        }

        res.status(200).json({
            message: 'Labels fetched successfully',
            data: label
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;