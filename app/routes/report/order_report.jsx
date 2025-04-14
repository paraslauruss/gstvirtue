import React, { useState, useEffect, useCallback } from "react";
import { Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { Card, Text } from "@shopify/polaris";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerDialog.css";
import ic_date from '../../assets/images/ic_date.png';
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export default function OrderReport({ onClick }) {

       const [startDate , setStartDate] = useState(null);
       const [endDate, setEndDate] = useState(null);
       const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
       const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
       const [reportData, setReportData] = useState(null);
       const session = useLoaderData();
       const storeName = session?.storeName;
       const accessToken = session?.accessToken;

       const handleClear = () => {
        setReportData(null); 
        setShowReport(false); 
        // setStartDate(null);
        // setEndDate(null);
        };

       const handleStartDateChange = (date) => {
           setStartDate(date);
           setIsStartDatePickerOpen(false);
       };
   
       const handleEndDateChange = (date) => {
           setEndDate(date);
           setIsEndDatePickerOpen(false);
       };

       //fetch data from backend 
       const fetchReportData = async () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
        console.log("Session Data:", storeName);
        if (!session) {
            console.error("Session is NULL or UNDEFINED. Check authentication.");
            return;
        }
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];
    
        console.log("Formatted Start Date:", formattedStartDate);
        console.log("Formatted End Date:", formattedEndDate);
    
        try {
            const response = await fetch(
            `http://localhost:3001/api/orderReport?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, 
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "store-name": storeName,
                    "api-version": "2025-01",
                    "access-token": accessToken
                }
            }
        );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();    
            setReportData({
                total_sgst: data.total_sgst || "₹ 0.00",
                total_cgst: data.total_cgst || "₹ 0.00",
                total_igst: data.total_igst || "₹ 0.00",
                total_cess: data.total_cess || "₹ 0.00",
                total_shipping_amount: data.total_shipping_amount || "₹ 0.00",
                total_subtotal_price: data.total_subtotal_price || "₹ 0.00",  
            });
    
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
     
    //file download csv json xml 
    const [fileType, setFileType] = useState("csv");

    // Function to convert JSON to CSV format
    const convertToCSV = (data) => {
        const headers = Object.keys(data).join(",") + "\n";
        const values = Object.values(data).join(",") + "\n";
        return headers + values;
    };

    // Function to convert JSON to XML format
    const convertToXML = (data) => {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<report>\n`;
        Object.keys(data).forEach((key) => {
            xml += `  <${key}>${data[key]}</${key}>\n`;
        });
        xml += `</report>`;
        return xml;
    };

    // Function to trigger file download
    const downloadFile = (content, fileName, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to handle export based on selected file type
    const handleExport = () => {
        if (!reportData) {
            alert("No data available to export!");
            return;
        }

        let fileContent, fileName, mimeType;

        if (fileType === "csv") {
            fileContent = convertToCSV(reportData);
            fileName = "report.csv";
            mimeType = "text/csv";
        } else if (fileType === "json") {
            fileContent = JSON.stringify(reportData, null, 2);
            fileName = "report.json";
            mimeType = "application/json";
        } else if (fileType === "xml") {
            fileContent = convertToXML(reportData);
            fileName = "report.xml";
            mimeType = "application/xml";
        }

        downloadFile(fileContent, fileName, mimeType);
    };


    return (
        <div style={{ padding: "50px 100px", backgroundColor: "#ffffff",display: 'flex', justifyContent:'center',height:'100vh'}}>
            <div style={{width: '80%', maxWidth: '1000px', backgroundColor: '#fff'}}>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ cursor: "pointer" }} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <Text variant="headingLg">Order Reports</Text>
            </div>

            <div style={{ marginTop: '20px' }} />

            <div style={{border:'1px solid #ccc', borderRadius:'6px',padding:'12px 12px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '15px', cursor: 'pointer' }} >
                    {/* start date */}
                    <div style={{ display: "flex", position: "relative", width:'33%'}}>
                        {/* Start Date Clickable Input Field */}
                        <div onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}
                            style={{
                                padding: "12px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                border: "1px solid #000",
                                borderRadius: "5px",
                                cursor: "pointer",
                                background: "#fff",
                            }}>
                            <img src={ic_date} alt="Calendar" style={{ height: "15px", marginRight: "10px" }} />
                            <span>{startDate ? startDate.toLocaleDateString("en-US") : "Select Start Date"}</span>
                        </div>
                        {isStartDatePickerOpen && (
                            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 1000 }}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    inline
                                />
                            </div>                                   
                        )}
                    </div>
                    {/* end date */}
                    <div style={{ display: "flex", width: "33%", position: "relative" }}>
                        <div onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
                                style={{ padding: "12px",height: "36px",
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                border: "1px solid #000",
                                borderRadius: "5px",
                                cursor: "pointer",
                                background: "#fff",
                                }}>
                                <img src={ic_date} alt="Calendar" style={{ height: "15px", marginRight: "10px" }} />
                                <span>{endDate ? endDate.toLocaleDateString("en-US") : "Select End Date"}</span>
                            </div>
                            {isEndDatePickerOpen && (
                            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 1000 }}>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    inline
                                />
                            </div>
                            )}
                        </div>   
                       {/* location */}
                        <div>
                            <select style={{width:'200px', height:'36px',border:'1px solid #000',borderRadius:'5px',
                                fontSize:'14px', fontFamily:'Inter',padding:'5px',color:'#000'
                            }}>
                                <option value="location">Select a location</option>
                                <option value="shop">Shop Location</option>
                                <option value="office">Office</option>
                            </select>
                        </div>
                        {/* search */}
                        <div>
                         <button style={{ color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px', 
                            display: 'flex', flexDirection: 'row',cursor:'pointer', gap: '10px', borderRadius: '5px',fontSize:'14px',fontFamily:'Inter',border:'1px solid #ccc' }}
                            onClick={fetchReportData}
                            >
                                Search</button>
                        </div>
                    </div>
                    {/* clear */}
                    <div>
                     <button style={{color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px', 
                        display: 'flex', flexDirection: 'row', gap: '10px', borderRadius: '5px',fontSize:'14px',fontFamily:'Inter',border:'1px solid #ccc',cursor:'pointer'}}
                        onClick={handleClear}
                        >
                            Clear</button>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Divider />
                </div>

                <div style={{  marginTop: '30px',display:'flex', flexDirection:'column'}}>
                {reportData && (
                <div>
                    <div style={{display:'flex',gap:'10px'}}>
                        <select style={{width:'200px', height:'33px',border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'#E8E8E8'}}>
                             <option value="default">Default Report Template</option>
                             <option value="report">report</option>
                        </select>

                        <select style={{width:'200px', height:'33px',border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'#E8E8E8'}}
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}  
                        >
                             <option value="csv">CSV file</option>
                             <option value="json">Json file</option>
                             <option value="xml">XML file</option>
                        </select>

                        <button style={{width:'120px',height:'33px',color:'#fff',border:'1px solid #ccc',borderRadius:'5px',
                            backgroundColor:'#74A545',cursor:'pointer',fontSize:'14px',fontFamily:'Inter'}}
                        
                            onClick={handleExport}>
                            Export Report
                        </button>
                        
                    </div>
                    <div style={{width:'100%',marginTop:'20px'}}>
                    <table style={{width: "100%",borderCollapse: "collapse",borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" ,fontSize:'12px',fontFamily:'Inter'}}>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total SGST</td>
                                <td style={{ padding: "10px" }}>₹ {reportData.total_sgst}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total CGST</td>
                                <td style={{ padding: "10px" }}>₹ {reportData.total_cgst}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total IGST</td>
                                <td style={{ padding: "10px" }}>₹ {reportData.total_igst}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total CESS</td>
                                <td style={{ padding: "10px" }}>₹ {reportData.total_cess}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total Shipping Amount</td>
                                <td style={{ padding: "10px" }}>₹ {reportData.total_shipping_amount}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total Orders Amount</td>
                                <td style={{ padding: "10px" }}>₹ {reportData.total_subtotal_price}</td>
                            </tr>    
                        </tbody>
                    </table>
                    </div>
                </div>
                )}
                </div>
            </div>
            </div>
        </div>
    );
}
