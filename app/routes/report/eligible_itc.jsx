
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { useState,useEffect } from "react";
import ic_download from '../../assets/images/ic_download.png' 
import { useLoaderData } from '@remix-run/react';

export default function EligibleITC({onClick}) {

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
        let startMonth = 0; 
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
        if(!selectedMonth) return;

        const [monthstr , yearstr] = selectedMonth.split('-');
        const month = monthstr.toLowerCase();
        const year = parseInt(yearstr);

        try {
            const response = await fetch(`http://localhost:3001/api/itc-summary?month=${month}&year=${year}`,{
                method: 'GET',
                headers:{
                    ...headers,
                    'Accept':'application/json',
                }
            });

            const data = await response.json();

            if(!data || typeof data !== 'object'){
                console.error("No data available for the selected month/year");
                return;
            }

            const convertToCSV = (entry) => {
                const headers =[
                    "details" , 'month' , 'year','integrated_tax','central_tax',
                    ' state_ut_tax','cess'
                ];

                const rows = [
                    entry.details,
                    entry.month,
                    entry.year,
                    entry.integrated_tax,
                    entry.central_tax,
                    entry.cess,
                    entry.state_ut_tax
                ];
                const csvContent = [
                    headers.join(','),
                    rows.join(',')
                ].join('\n');

                return csvContent;
            };
            const csvContent = convertToCSV(data);

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
      
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `ITC_Eligible_${month}_${year}.csv`);
            
            document.body.appendChild(link);
            link.click();
            link.remove(); 
        } catch (error) {
            console.error("CSV Download Failed:", error);
        }
    }
    
    
    return (
        <div style={{ padding: '50px 100px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ cursor: 'pointer' }} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                    <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <Text variant="headingLg">Eligible ITC</Text>
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
        {popup && 
        (
            <div style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
                {popup}
            </div>
        )}
    </div>
    );
}