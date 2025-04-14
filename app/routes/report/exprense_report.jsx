
import React, { useState } from "react";
import { Divider} from "@mui/material";
import { Card, Text } from "@shopify/polaris";
import icEmpty from '../../assets/images/ic_empty.png'
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

export default function ExprenseReport({onClick}) {
   
     const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [startDate , setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
    const [error, setError] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);

    const [expenseReport , setexpneseReport] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setIsStartDatePickerOpen(false);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setIsEndDatePickerOpen(false);
    };
    // Format Date as DD/MM/YYYY
    const formatDate = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const clearData = () => {
        setStartDate(null);
        setEndDate(null);
        setexpneseReport(null);
        setError("");
        setInitialLoad(true);  // Reset to initial state
    };
    const fetchSummary = async () => {
        if (!startDate || !endDate) {
            setError("Please select both Start and End dates.");
            return;
        }
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        setError("");
        setexpneseReport(null);
        setInitialLoad(false);

        console.log('start date', formattedStartDate);
        console.log('end date', formattedEndDate);
        try {

            const response = await fetch(
                `http://localhost:3001/api/expense/summary?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
                { 
                    method: 'GET', 
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

            // Check if the response contains bills data
            if (!data.expenses || data.expenses.length === 0) {
                setError("No data found in the given date range.");
                setexpneseReport(null);
                return;
            };
            let totalAmount = 0;
            let totalCESS = 0;
            let totalCGST = 0;
            let totalSGST = 0;
            let totalIGST = 0; 
            // If there is only one bill, show the individual values for that bill
            if (data.expenses.length === 1) {
                const singleExpense = data.expenses[0];
                totalAmount = parseFloat(singleExpense.amount) || 0;
                totalCESS = parseFloat(singleExpense.cessAmount) || 0;
                totalCGST = parseFloat(singleExpense.cgstAmount) || 0;
                totalSGST = parseFloat(singleExpense.sgstAmount) || 0;
                totalIGST = 0;
                setexpneseReport({
                    totalOrders: 1,
                    totalAmount,
                    totalCESS,
                    totalCGST,
                    totalSGST,
                    totalIGST,
                });
            } else {
                // If multiple bills, calculate totals by adding values for each bill
                data.expenses.forEach((expense) => {
                    totalAmount += parseFloat(expense.amount) || 0;
                    totalCESS += parseFloat(expense.cessAmount) || 0;
                    totalCGST += parseFloat(expense.cgstAmount) || 0;
                    totalSGST += parseFloat(expense.sgstAmount) || 0;
                });
                setexpneseReport({
                    totalOrders: data.expenses.length,
                    totalAmount: totalAmount.toFixed(2),
                    totalCESS: totalCESS.toFixed(2),
                    totalCGST: totalCGST.toFixed(2),
                    totalSGST: totalSGST.toFixed(2),
                    totalIGST: totalIGST.toFixed(2),
                });
            }
        } catch (err) {
            setError("No Data found.");
            setexpneseReport(null);
        }
    };


    return (
        <div style={{ padding: "50px 100px", backgroundColor: "#ffffff",display: 'flex', justifyContent:'center',height:'100vh' }}>
            <div style={{width: '80%', maxWidth: '1000px', backgroundColor: '#fff'}}>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ cursor: "pointer" }} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <Text variant="headingLg">Expense Report</Text>
            </div>
            <div style={{ marginTop: '20px' }} />

             <div style={{border:'1px solid #ccc', borderRadius:'6px',padding:'12px 12px'}}> 
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', gap: '15px', cursor: 'pointer' }}>
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
                         {/* search */}
                        <div>
                         <button style={{ color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px', 
                            display: 'flex', flexDirection: 'row',cursor:'pointer', gap: '10px', borderRadius: '5px',fontSize:'14px',fontFamily:'Inter',border:'1px solid #ccc' }}
                            onClick={fetchSummary}
                            >
                                Search
                            </button>
                        </div>
                          {/* clear */}
                    <div>
                     <button style={{color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px', 
                        display: 'flex', flexDirection: 'row', gap: '10px', borderRadius: '5px',fontSize:'14px',fontFamily:'Inter',border:'1px solid #ccc',cursor:'pointer'}}
                         onClick={clearData}
                        >
                            Clear
                        </button>
                     </div>
                  </div>
                </div>
               <div style={{ marginTop: '20px' }}>
                    <Divider />
                </div>

                <div style={{  marginTop: '30px',display:'flex', flexDirection:'column'}}>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>} 
                 {initialLoad && !error && (
                    <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <img src={icEmpty} width={200} />
                    </div>
                    <div style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Text variant="headingLg">No Data Found</Text>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Text variant="headingMd">You can find orders by changing your search or filtering options</Text>
                        </div>
                    </div>
                    </div>
                </div>
                )}
                {expenseReport && (
                    <div>
                    <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
                        <button style={{width:'120px',height:'33px',color:'#fff',border:'1px solid #ccc',borderRadius:'5px',
                            backgroundColor:'#74A545',cursor:'pointer',fontSize:'14px',fontFamily:'Inter'}}
                            >
                            Export Report
                        </button>        
                    </div>
                 <div style={{width:'100%',marginTop:'20px'}}>
                    <table style={{width: "100%",borderCollapse: "collapse",borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" ,fontSize:'12px',fontFamily:'Inter'}}>
                     <tbody>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>Total SGST</td>
                            <td style={{ padding: "10px" }}>₹ {expenseReport.totalSGST}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>Total CGST</td>
                            <td style={{ padding: "10px" }}>₹ {expenseReport.totalCGST}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>Total IGST</td>
                            <td style={{ padding: "10px" }}>₹ {expenseReport.totalIGST}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>Total CESS</td>
                            <td style={{ padding: "10px" }}>₹ {expenseReport.totalCESS}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>Total Orders Amount</td>
                            <td style={{ padding: "10px" }}>₹ {expenseReport.totalAmount}</td>
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