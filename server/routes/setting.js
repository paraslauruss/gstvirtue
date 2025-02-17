const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Setting = require('../models/setting');
const sharp = require('sharp');


router.post('/', upload.fields([{ name: 'logo_image', maxCount: 1 }, { name: 'signature_image', maxCount: 1 }]), async (req, res) => {
    try {
        const {
            store_name, company_legal_name, brand_name, store_phone, store_email,
            store_address, contact_person, gst_number, iec_code, cin_number, pan_number,
            fssai_lic_number, store_city, store_pincode, store_state, store_state_code,
            store_country, store_country_code
        } = req.body;

        // Validate image sizes
        if (req.files['logo_image']) {
            const logoImagePath = req.files['logo_image'][0].path;
            const metadata = await sharp(logoImagePath).metadata();
            if (metadata.width > 250 || metadata.height > 125) {
                return res.status(400).json({ message: 'Logo image dimensions must be no more than 250px (width) and 125px (height).' });
            }
        }

        if (req.files['signature_image']) {
            const signatureImagePath = req.files['signature_image'][0].path;
            const metadata = await sharp(signatureImagePath).metadata();
            if (metadata.width > 150 || metadata.height > 80) {
                return res.status(400).json({ message: 'Signature image dimensions must be no more than 150px (width) and 80px (height).' });
            }
        }

        // Get file paths for uploaded images
        const logo_image = req.files['logo_image'] ? req.files['logo_image'][0].path : null;
        const signature_image = req.files['signature_image'] ? req.files['signature_image'][0].path : null;

        // Create or update settings
        const settings = await Setting.findOneAndUpdate(
            { store_name },
            {
                store_name,
                company_legal_name,
                brand_name,
                store_phone,
                store_email,
                store_address,
                contact_person,
                gst_number,
                iec_code,
                cin_number,
                pan_number,
                fssai_lic_number,
                store_city,
                store_pincode,
                store_state,
                store_state_code,
                store_country,
                store_country_code,
                logo_image,
                signature_image
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
});

router.get('/:store_name', async (req, res) => {
    try {
        const { store_name } = req.params;

        const shopifyResponse = await fetch('https://gst-virtue-paras.myshopify.com/admin/api/2025-01/shop.json', {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': 'shpua_649d3ab48e3b42cbc6c31b5bd9ad8e89'
            }
        });

        if (!shopifyResponse.ok) {
            return res.status(shopifyResponse.status).json({ message: 'Error fetching data from Shopify' });
        }

        const shopifyData = await shopifyResponse.json();
        const shopDetails = shopifyData.shop;


        const settings = await Setting.findOne({ store_name });

        if (!settings) {
            return res.status(404).json({ message: 'Store not found' });
        }

        settings.store_city = shopDetails.city;
        settings.store_country = shopDetails.country_name;
        settings.store_country_code = shopDetails.country_code;
        settings.store_pincode = shopDetails.zip;
        settings.store_state = shopDetails.province;
        settings.store_state_code = shopDetails.province_code;
        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching store details', error: error.message });
    }
});

module.exports = router;