import React, { useState,useEffect } from 'react';
import ic_download from '../../assets/images/ic_download.png' 
import ic_delete from '../../assets/images/ic_delete.png'    
import { useLoaderData } from '@remix-run/react';
import ic_back from '../../assets/images/ic_back.webp';

export default function HSNSACSummaryPurchase({ onClick }) {
      
        const session = useLoaderData(); 
        const storeName = session?.storeName;
        const accessToken = session?.accessToken;
        
        const [selectedMonth, setSelectedMonth] = useState('');
        const [monthsList, setMonthsList] = useState([]);
        const [report, setReport] = useState(null);
        const [popup, setPopup] = useState('');
        
        const headers = {
            'Content-Type': 'application/json',
            'api-version': '2025-01',
            'store-name': storeName,
            'access-token': accessToken,
        };
        useEffect(() => {
          generateMonthOptions();
          fetchSavedReports(); 
        }, []);
    
        const fetchSavedReports = async () => {
            try {
              const res = await fetch('http://localhost:3001/api/hsn-summary-purchase/saved', { headers });
              const saved = await res.json();
          
              if (saved.length > 0) {
                // Just load the latest one or allow listing if you want
                const latest = saved[saved.length - 1];
                setReport(latest);
              }
            } catch (err) {
              console.error('Failed to fetch saved reports:', err);
            }
          };
    
        const generateMonthOptions = () => {
            const monthNames = [
              'january', 'february', 'march', 'april', 'may', 'june',
              'july', 'august', 'september', 'october', 'november', 'december'
            ];
            const now = new Date();
            const currentMonthIndex = now.getMonth();
            const currentYear = now.getFullYear();
        
            const list = [];
        
            // Start from April of last financial year
            let startMonth = 0; // April = index 3
            let year = currentMonthIndex >= 3 ? currentYear : currentYear - 2;
        
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
    
          const handleFetchReport = async () => {
            if (!selectedMonth) return;
        
            const selected = monthsList.find(m => m.label === selectedMonth);
            if (!selected) return;
        
            try {
              const res = await fetch(`http://localhost:3001/api/hsn-summary-purchase?month=${selected.value}&year=${selected.year}`, {
                method: 'GET',
                headers
              });
        
              const data = await res.json();
        
              if (data && data.length > 0) {
                  const today = new Date().toLocaleDateString('en-GB'); // dd-mm-yyyy
                  const newReport = {
                    type: 'HSN',
                    monthYear: selected.label,
                    generatedDate: today,
                    rawMonth: selected.value,
                    year: selected.year
                  };
                
                  // Set the report in the frontend
                  setReport(newReport);
                
                  // Save the report to the backend
                  try {
                      if (!selectedMonth) return;
      
                      const selected = monthsList.find(m => m.label === selectedMonth);
                      if (!selected) return;
      
                     await fetch('http://localhost:3001/api/hsn-summary-purchase', {
                      method: 'POST',
                      headers,
                      body: JSON.stringify(newReport),
                    });
                  } catch (err) {
                    console.error("Error saving report:", err);
                  }
                } else {
                  setPopup('No reports present for this month');
                  setTimeout(() => setPopup(''), 3000);
                }
            } catch (err) {
              console.error("Fetch report failed:", err);
              setPopup('Error fetching report');
              setTimeout(() => setPopup(''), 3000);
            }
          };
      
          const handleDownloadCSV = async () => {
            if (!report) return;
            try {
              // Fetch the report data from your backend API
              const response = await fetch(`http://localhost:3001/api/hsn-summary-purchase?month=${report.rawMonth}&year=${report.year}`, {
                method: 'GET',
                headers: {
                  ...headers,
                  'Accept': 'application/json', 
                }
              });
          
              const data = await response.json();
              console.log("API response:", data);

              const summary = Array.isArray(data) ? data : data.hsn_summary;

              if (!Array.isArray(summary) || summary.length === 0) {
                console.error("No data available for the selected month/year");
                return;
              }
              const convertToCSV = (dataArray) => {
                const headers = [
                  "Serial Number",
                  "HSN",
                  "Total Qty",
                  "Total Value (Rs.)",
                  "Rate (%)",
                  "Taxable value (Rs.)",
                  "Integrated Tax (Rs.)",
                  "Central Tax (Rs.)",
                  "State/UT Tax (Rs.)",
                  "CESS (Rs.)",
                ];
          
                const rows = dataArray.map((item, index) => [
                  index + 1,
                  item["HSN"],
                  item["Total Qty"],
                  item["Total Value (Rs.)"],
                  item["Rate (%)"],
                  item["Taxable value (Rs.)"],
                  item["Integrated Tax (Rs.)"],
                  item["Central Tax (Rs.)"],
                  item["State/UT Tax (Rs.)"],
                  item["CESS (Rs.)"]
                ]);
          
                const csvLines = [
                  headers.join(","), // headers
                  ...rows.map(row => row.join(",")) // data rows
                ];
          
                return csvLines.join("\n");
              };
          
              const csv = convertToCSV(summary);
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
          
              const link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute("download", `HSN_Purchase_Report_${report.rawMonth}_${report.year}.csv`);
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          
            } catch (error) {
              console.error("CSV Download Failed:", error);
            }
          };
      
        const handleDelete = () => {
          setReport(null);
        };


    return (
        <div style={{ padding: '20px',
            maxWidth: '1000px',
            margin: '0 auto',  // Centers the div horizontally
            width: '100%',
            paddingTop:'40px',
           }}>
            {/* header title  */}
            <div style={{display:'flex',marginBottom:'20px'}} >
                <img src={ic_back} alt="back" style={{width:'25px',height:'25px',cursor:'pointer'}} onClick={onClick} />
                <h1 style={{fontSize:'20px',fontFamily:'Inter',fontWeight:'bold',marginLeft:'10px'}}>HSN/SAC Purhcase Sales</h1>
            </div>
         
        <div style={{border:'1px solid #ccc',padding:'10px',borderRadius:'10px'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', marginTop:'30px' }}>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', width: '220px' }}
          >
            <option value="">Select Month-Year</option>
            {monthsList.map(month => (
              <option key={month.label} value={month.label}>
                {month.label}
              </option>
            ))}
          </select>
  
          <button
            onClick={handleFetchReport}
            style={{
              backgroundColor: '#74A545',
              padding: '8px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <img src={ic_download} alt="Fetch" style={{ width: '20px', height: '20px'}} />
          </button>
        </div>
            {popup && (
            <div style={{
                backgroundColor: '#ffcccc',
                padding: '10px',
                marginBottom: '10px',
                color: '#900',
                borderRadius: '5px',
                fontWeight: 'bold'
            }}>
                {popup}
            </div>
            )}
    
        {report && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#ddd' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left' }}>Report Type</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Month-Year of Orders</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Generated Date</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>{report.type}</td>
                <td style={{ padding: '10px' }}>{report.monthYear}</td>
                <td style={{ padding: '10px' }}>{report.generatedDate}</td>
                <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                  <img
                    src={ic_download}
                    alt="Download CSV"
                    onClick={handleDownloadCSV}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <img
                    src={ic_delete}
                    alt="Delete"
                    onClick={handleDelete}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        </div>
      </div>
    );
}