
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { useState,useEffect } from "react";
import ic_download from '../../assets/images/ic_download.png' 
import ic_delete from '../../assets/images/ic_delete.png'   
import { useLoaderData } from '@remix-run/react';


export default function SupplySummary({onClick}) {

    const session = useLoaderData(); 
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [selectedMonth, setSelectedMonth] = useState('');
    const [monthsList, setMonthsList] = useState([]);
    const [popup, setPopup] = useState('');

    const headers = {
        'Content-Type': 'application/json',
        'api-version': '2025-01',
        'store-name': storeName,
        'access-token': accessToken,
    };

    useEffect(() => {
        generateMonthOptions();
    }, []);

    const generateMonthOptions = () => {
        const monthNames = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        const now = new Date();
        const currentMonthIndex = now.getMonth();
        const currentYear = now.getFullYear();

        const list = [];
        let startMonth = 0; // April
        let year = currentMonthIndex >= 3 ? currentYear : currentYear - 1;

        for (let i = 0; i < 13; i++) {
            const monthIndex = (startMonth + i) % 12;
            const itemYear = year + Math.floor((startMonth + i) / 12);
            list.push({
                label: `${monthNames[monthIndex].charAt(0).toUpperCase() + monthNames[monthIndex].slice(1)}-${itemYear}`,
                value: monthNames[monthIndex],
                year: itemYear
            });
        }

        setMonthsList(list);
    };

    const handleDownload = async () => {
        if (!selectedMonth) return;
    
        const [monthStr, yearStr] = selectedMonth.split('-');
        const month = monthStr.toLowerCase();
        const year = parseInt(yearStr);
    
        try {
            // Fetch the report data from your backend API
            const response = await fetch(`http://localhost:3001/api/supply-summary?month=${month}&year=${year}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Accept': 'application/json',
                }
            });
    
            const data = await response.json();
    
            // Check if the response has the 'supply_summary' array
            if (!data.supply_summary || !Array.isArray(data.supply_summary)) {
                console.error('Response data is not in expected format:', data);
                setPopup('Error: No orders found for this Month.');
                setTimeout(() => setPopup(''), 3000);
                return;
            }
    
            const supplyData = data.supply_summary;
    
            // If no data, show an error and return
            if (supplyData.length === 0) {
                setPopup('No data found for this Month.');
                setTimeout(() => setPopup(''), 3000);
                return;
            }
    
            // Function to convert JSON data into CSV format
            const convertToCSV = (jsonData) => {
                const headers = [
                     'Nature of Supply', 'Total Taxable Value (Rs.)', 'Integrated Tax (Rs.)', 'Central Tax (Rs.)', 'State/UT Tax (Rs.)', 'CESS (Rs.)'
                ];
    
                // Convert the JSON array into CSV rows with serial number
                const rows = jsonData.map((entry, index) => [
                    
                    entry['Nature of Supply'],
                    entry['Total Taxable Value (Rs.)'],
                    entry['Integrated Tax (Rs.)'],
                    entry['Central Tax (Rs.)'],
                    entry['State/UT Tax (Rs.)'],
                    entry['CESS (Rs.)'],
                ]);
    
                const csvContent = [
                    headers.join(','), // Join headers with commas
                    ...rows.map(row => row.join(',')) // Join each row's data with commas
                ].join('\n'); // Join everything with new line
    
                return csvContent;
            };
    
            // Convert the report data into CSV format
            const csvContent = convertToCSV(supplyData);
    
            // Create a Blob from the CSV content
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
    
            // Create a link element to trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `supply_summary_${month}_${year}.csv`);
    
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
            setPopup('Error downloading report.');
            setTimeout(() => setPopup(''), 3000);
        }
    };
    
    

    return (
        <div style={{ padding: '50px 100px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ cursor: 'pointer' }} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <Text variant="headingLg">Supply Summary</Text>
            </div>

            <div style={{ marginTop: '20px' }} />
            <div style={{ display: 'flex', gap: '20px', border: '1px solid #ccc', borderRadius: '15px', padding: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', marginTop: '30px' }}>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', width: '220px' }}
                    >
                        <option value="">Select Month-Year</option>
                        {monthsList.map((month) => (
                            <option key={month.label} value={month.label}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                
                    <button
                        onClick={handleDownload}
                        style={{
                            backgroundColor: '#74A545',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                    >
                        <img src={ic_download} alt="Fetch" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div> 
            </div>
            {popup && (
                <div style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
                    {popup}
                </div>
            )}
            
        </div>
    );
};
