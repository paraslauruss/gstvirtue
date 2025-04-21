const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    const apiVersion = req.headers["api-version"];
    const storeName = req.headers["store-name"];
    const accessToken = req.headers["access-token"];
    const monthQuery = req.query.month;
    const yearQuery = req.query.year ? parseInt(req.query.year) : null;

    if (!apiVersion || !storeName || !accessToken) {
        return res.status(400).json({
            message: "Missing required headers",
            receivedHeaders: req.headers,
        });
    }

    const url = `http://localhost:3001/api/orders`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "access-token": accessToken,
                "Content-Type": "application/json",
                "store-name": storeName,
                "api-version": apiVersion,
            },
        });

        const orders = await response.json();
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        const monthMap = {
            january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
            july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
        };

        const targetMonthIndex = monthQuery ? monthMap[monthQuery.toLowerCase()] : null;

        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.date);
            const matchesMonth = targetMonthIndex !== null ? orderDate.getMonth() === targetMonthIndex : true;
            const matchesYear = yearQuery ? orderDate.getFullYear() === yearQuery : true;
            return matchesMonth && matchesYear;
        });

        const summaryMap = {
            taxable: { label: "Outward taxable supplies (other than zero rated, nil rated and exempted)" },
            zeroRated: { label: "Outward taxable supplies (zero rated)" },
            nilRated: { label: "Other outward supplies (Nil rated, exempted)" }
        };

        for (const key of Object.keys(summaryMap)) {
            summaryMap[key] = {
                ...summaryMap[key],
                total_taxable_value: 0,
                integrated_tax: 0,
                central_tax: 0,
                state_ut_tax: 0,
                cess: 0
            };
        }

        filteredOrders.forEach(order => {
            const lineItems = order.line_items || [];

            lineItems.forEach(item => {
                const price = parseFloat(item.price || 0);
                const quantity = parseFloat(item.current_quantity || 1);
                const gstPercent = parseFloat(item.gst || 0);
                const cessPercent = parseFloat(item.cess || 0);
                const isZeroRated = item.zero_rated === true || /zero[-\s]?rated/i.test(item.title || "");

                const totalTaxPercent = gstPercent + cessPercent;

                const grossAmount = price * quantity;
                const taxableAmount = grossAmount / (1 + totalTaxPercent / 100);

                const igst = gstPercent === 0 ? 0 : (grossAmount - taxableAmount);
                const cgst = gstPercent > 0 ? (gstPercent / 2 / 100) * taxableAmount : 0;
                const sgst = cgst;
                const cess = (cessPercent / 100) * taxableAmount;

                // Classification
                let category = "nilRated";
                if (gstPercent > 0) category = "taxable";
                else if (gstPercent === 0 && isZeroRated) category = "zeroRated";

                summaryMap[category].total_taxable_value += taxableAmount;
                summaryMap[category].integrated_tax += igst;
                summaryMap[category].central_tax += cgst;
                summaryMap[category].state_ut_tax += sgst;
                summaryMap[category].cess += cess;
            });
        });

        const supplySummary = Object.values(summaryMap).map(item => ({
            "Nature of Supply": item.label,
            "Total Taxable Value (Rs.)": item.total_taxable_value.toFixed(2),
            "Integrated Tax (Rs.)": item.integrated_tax.toFixed(2),
            "Central Tax (Rs.)": item.central_tax.toFixed(2),
            "State/UT Tax (Rs.)": item.state_ut_tax.toFixed(2),
            "CESS (Rs.)": item.cess.toFixed(2)
        }));

        return res.json({ supply_summary: supplySummary });

    } catch (err) {
        console.error("Error processing supply summary:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router;