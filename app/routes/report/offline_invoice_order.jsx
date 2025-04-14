import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import icEmpty from '../../assets/images/ic_empty.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerDialog.css";
import {useState} from 'react';
import ic_date from '../../assets/images/ic_date.png';

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};


export default function OfflineInvoiceOrder({onClick}) {
    const [startDate , setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);  // New state to track initial load


    const handleStartDateChange = (date) => {
        setStartDate(date);
        setIsStartDatePickerOpen(false);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setIsEndDatePickerOpen(false);
    };
    const clearData = () => {
        setStartDate(null);
        setEndDate(null);
        setSummary(null);
        setError("");
        setInitialLoad(true);  // Reset to initial state
    };
    // Format Date as DD/MM/YYYY
    const formatDate = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchSummary = async () => {
        if (!startDate || !endDate) {
            setError("Please select both Start and End dates.");
            return;
        }
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        setError("");
        setSummary(null);
        setInitialLoad(false); // Data is being fetched, not initial load

        try {
            const response = await fetch(
                `http://localhost:3001/api/offlineData/summary?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
            );
            const data = await response.json();

            if (!data.summary || data.orders.length === 0) {
                setError("No data found in the given date range.");
                setSummary(null);
                return 
            } 
            if (data.summary.totalOrders === 1) {
                const singleOrder = data.orders[0];
                setSummary({
                    totalOrders: 1,
                    totalSubtotalPrice: singleOrder.total,
                    totalCess: (singleOrder.rate * parseFloat(singleOrder.cess || 0)) / 100,
                    totalCGST: (singleOrder.rate * parseFloat(singleOrder.gst || 0)) / 200,
                    totalSGST: (singleOrder.rate * parseFloat(singleOrder.gst || 0)) / 200,
                    totalIGST: (singleOrder.rate * parseFloat(singleOrder.gst || 0)) / 100,
                    totalShipping: parseFloat(singleOrder.shippingCharge || 0),
                });
            } else {
                // ✅ If multiple orders, use the backend's computed summary
                setSummary(data.summary);
            }
        } catch (err) {
            setError("No Data found.");
            setSummary(null); // Clear summary if error occurred
        }
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
                <Text variant="headingLg">Offline Order Reports</Text>
            </div>

            <div style={{ marginTop: '20px' }} />
            <div style={{border:'1px solid #ccc', borderRadius:'6px',padding:'12px 12px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '15px', cursor: 'pointer', alignItems: 'center' }} >
                            {/* Start Date */}
                            <div style={{ display: "flex", position: "relative", flex: 1 }}>
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
                            {/* End Date */}
                            <div style={{ display: "flex", position: "relative", flex: 1 }}>
                                <div onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
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
                        {/* Search Button */}
                        <div>
                            <button style={{
                                color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px 15px',
                                display: 'flex', alignItems: 'center', cursor: 'pointer', borderRadius: '5px',
                                fontSize: '14px', fontFamily: 'Inter', border: '1px solid #ccc', whiteSpace: 'nowrap'
                            }}
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
                                Clear</button>
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
                    {summary && (
                        <div>
                        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
                            <button style={{width:'120px',height:'33px',color:'#fff',border:'1px solid #ccc',borderRadius:'5px',
                                backgroundColor:'#74A545',cursor:'pointer',fontSize:'14px',fontFamily:'Inter'}}
                                // onClick={handleExport}
                                >
                                Export Report
                            </button>        
                        </div>
                     <div style={{width:'100%',marginTop:'20px'}}>
                        <table style={{width: "100%",borderCollapse: "collapse",borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" ,fontSize:'12px',fontFamily:'Inter'}}>
                         <tbody>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total SGST</td>
                                <td style={{ padding: "10px" }}>₹ {summary.totalSGST}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total CGST</td>
                                <td style={{ padding: "10px" }}>₹ {summary.totalCGST}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total IGST</td>
                                <td style={{ padding: "10px" }}>₹ {summary.totalIGST}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total CESS</td>
                                <td style={{ padding: "10px" }}>₹ {summary.totalCess}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total Shipping Amount</td>
                                <td style={{ padding: "10px" }}>₹ {summary.totalShipping}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total Orders Amount</td>
                                <td style={{ padding: "10px" }}>₹ {summary.totalSubtotalPrice}</td>
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