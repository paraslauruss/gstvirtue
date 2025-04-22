import React, { useState,useEffect } from 'react';
import ic_download from '../../assets/images/ic_download.png' 
import ic_delete from '../../assets/images/ic_delete.png'    
import { useLoaderData } from '@remix-run/react';



const B2CSalesReport = () => {

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
      fetchPersistedReport();
    }, []);
  
    const generateMonthOptions = () => {
      const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];
      const now = new Date();
      const currentMonthIndex = now.getMonth(); // 0-indexed
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

    // to persist data 
    const fetchPersistedReport = async () => {
        if (!selectedMonth) return; // Check if a month is selected
      
        const selected = monthsList.find(m => m.label === selectedMonth);
        if (!selected) return; // If selected month is not found, do nothing
      
        try {
          // Making the GET request to fetch the report for the selected month, year, and type
          const res = await fetch(`http://localhost:3001/api/gstr1?month=${selected.value}&type=b2b&year=${selected.year}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'api-version': '2025-01',
              'store-name': storeName,
              'access-token': accessToken,
            }
          });
      
          // Check if the response is successful (status code 200)
          if (res.ok) {
            const savedReport = await res.json(); // Parse the response to get the report data
            if (savedReport && savedReport.length > 0) {
              setReport(savedReport); // Persist the report in state
            } else {
              setPopup('No reports present for this month');
              setTimeout(() => setPopup(''), 3000); // Show a message if no report is found
            }
          } else {
            setPopup('Error fetching report');
            setTimeout(() => setPopup(''), 3000); // Show an error message if fetching fails
          }
        } catch (err) {
          console.error('Could not fetch saved report', err);
          setPopup('Error fetching report');
          setTimeout(() => setPopup(''), 3000); // Show an error message if an exception occurs
        }
      };

    const handleFetchReport = async () => {
      if (!selectedMonth) return;
  
      const selected = monthsList.find(m => m.label === selectedMonth);
      if (!selected) return;
  
      try {
        const res = await fetch(`http://localhost:3001/api/gstr1?month=${selected.value}&type=b2b&year=${selected.year}`, {
          method: 'GET',
          headers
        });
  
        const data = await res.json();
  
        if (data && data.length > 0) {
            const today = new Date().toLocaleDateString('en-GB'); // dd-mm-yyyy
            const newReport = {
              type: 'B2C',
              monthYear: selected.label,
              generatedDate: today,
              rawMonth: selected.value,
              year: selected.year
            };
          
            // Set the report in the frontend
            setReport(newReport);
          
            // Save the report to the backend
            try {
              await fetch('http://localhost:3001/api/gstr1', {
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
          const response = await fetch(`http://localhost:3001/api/gstr1?month=${report.rawMonth}&type=b2b&year=${report.year}`, {
            method: 'GET',
            headers: {
              ...headers,
              'Accept': 'application/json', // Expect JSON response from the backend
            }
          });
      
          const data = await response.json();
      
          // If no data, show an error and return
          if (!data || data.length === 0) {
            console.error("No data available for the selected month/year");
            return;
          }
      
          // Function to convert JSON data into CSV format
          const convertToCSV = (jsonData) => {
            const headers = [
              'Serial Number', 'GST', 'Total Price', 'Total Taxable Amount', 
              'IGST Amount', 'CGST Amount', 'SGST Amount', 'CESS Amount'
            ];
      
            // Convert the JSON array into CSV rows
            const rows = jsonData.map((entry, index) => [
              index + 1, // Serial number
              entry.gst,
              entry.total_price,
              entry.total_taxable_amount,
              entry.igst_amount,
              entry.cgst_amount,
              entry.sgst_amount,
              entry.cess_amount
            ]);
      
            // Combine headers and rows to create the CSV content
            const csvContent = [
              headers.join(','), // Join headers with commas
              ...rows.map(row => row.join(',')) // Join each row's data with commas
            ].join('\n'); // Join everything with new line
      
            return csvContent;
          };
      
          // Convert the report data into CSV format
          const csvContent = convertToCSV(data);
      
          // Create a Blob from the CSV content
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
      
          // Create a link element to trigger the download
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `B2C_Report_${report.rawMonth}_${report.year}.csv`);
          
          // Append the link to the document and simulate a click to start the download
          document.body.appendChild(link);
          link.click();
          link.remove(); // Clean up by removing the link element
        } catch (err) {
          console.error("CSV Download Failed:", err);
        }
      };
  
    const handleDelete = () => {
      setReport(null);
    };
  
    return (
      <div style={{ padding: '20px' }}>
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
  
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
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
              padding: '8   px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <img src={ic_download} alt="Fetch" style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
  
        {report && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f5f5f5' }}>
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
    );
  };

export default B2CSalesReport;
