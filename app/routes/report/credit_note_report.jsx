
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import icEmpty from '../../assets/images/ic_empty.png'
import { useState , useEffect} from "react";
import ic_date from '../../assets/images/ic_date.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerDialog.css";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};


export default function CreditNoteReport({onClick}) {
        const session = useLoaderData();
        const storeName = session?.storeName;
        const accessToken = session?.accessToken;

        const [startDate , setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
        const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
        const [orderData, setOrderData] = useState(null); // Holds API response
        const [isLoading, setIsLoading] = useState(false);
        const [filterType, setFilterType] = useState("order_date");
        const handleFilterTypeChange = (e) => {
            const selectedValue = e.target.value;
            let backendFilterValue = "";
            if (selectedValue === "order") {
              backendFilterValue = "order_date";
            } else if (selectedValue === "credit") {
              backendFilterValue = "cancellation_date";
            }
            setFilterType(backendFilterValue);
            setOrderData(null);
          };

        const handleStartDateChange = (date) => {
            setStartDate(date);
            setIsStartDatePickerOpen(false);
        };
    
        const handleEndDateChange = (date) => {
            setEndDate(date);
            setIsEndDatePickerOpen(false);
        };

         // Fetch data from API
      const fetchOrders = async () => {
        setIsLoading(true);  
        if (!startDate || !endDate) {
            alert("Please select both Start Date and End Date.");
            return;
        }
        if (!session) {
            console.error("Session is NULL or UNDEFINED. Check authentication.");
            return;
        }
       
        setIsLoading(true);

        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];

        console.log('formatted start date',formattedStartDate);
        console.log('formatted end date',formattedEndDate);

        try {
            const response = await fetch(
                `http://localhost:3001/api/aggregated-refunded-orders?startDate=${formattedStartDate}&endDate=${formattedEndDate}&filterType=${filterType}`,
                {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json",
                        "store-name": storeName,
                        "api-version": "2025-01",
                        "access-token": accessToken
                    },
                }
            );
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            console.log("API Response Data:", data); // Log the entire response
            if (data.message === "No orders found in the given date range") {
                // setOrderData(null); // Clear any previous data
                // alert("No orders found for the selected date range."); // Notify the user
            } else {
               setOrderData({
                    totalSgst: data.totalSgst || " 0.00",
                    totalCgst : data.totalCgst || " 0.00",
                    totalIgst: data.totalIgst || " 0.00",
                    totalCess: data.totalCess || " 0.00",
                    totalShipping: data.totalShipping || "0.00",
                    totalPrice: data.totalPrice || "0.00",
                });
            }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false); // Ensure loading is stopped regardless of success/failure
             }
       };

        // Clear Data
        const handleClear = () => {
            setStartDate(null);
            setEndDate(null);
            setFilterType("order");
            setOrderData(null);
        };

    return (
        <div style={{ padding: '50px 100px', backgroundColor: "#ffffff",display: 'flex', justifyContent:'center',height:'100vh' }}>
           <div style={{width: '80%', maxWidth: '1000px', backgroundColor: '#fff'}}>
             <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{cursor:'pointer'}} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <Text variant="headingLg">Credit Note Report</Text>
            </div>
            <div style={{ marginTop: '20px' }} />
           
            <div style={{border:'1px solid #ccc',borderRadius:'8px',padding:'12px 12px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
                {/* start date */}
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
                    {/* credit note date */}
                     <div>
                        <select   value={filterType === "order_date" ? "order" : "credit"} onChange={handleFilterTypeChange}
                          style={{width:'200px',height:'36px',border:'1px solid #ccc',borderRadius:'5px',fontFamily:'Inter'}}>
                            <option value="order">Order Date</option>
                            <option value="credit">Credit Note Date</option>
                        </select>
                     </div>
                    <div>
                         <button  onClick={fetchOrders}
                         style={{ color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px 12px', display: 'flex', flexDirection: 'row', gap: '10px', 
                            borderRadius: '5px',border:'1px solid #ccc',cursor:'pointer',fontSize:'14px',fontFamily:'Inter' }}>
                            Search</button>
                    </div>
                </div>
                <div>
                    <button onClick={handleClear}
                     style={{ color: '#000', backgroundColor: '#fff', justifyContent: 'center', padding: '10px 12px', display: 'flex', flexDirection: 'row', gap: '10px', 
                    borderRadius: '5px',border:'1px solid #ccc',cursor:'pointer',fontSize:'14px',fontFamily:'Inter' }}>
                       Clear</button>
               </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                 <Divider />
            </div>
            {/* main content */}
            {isLoading ? (
                <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
            ) : orderData ? (
                <div style={{ marginTop: "20px" }}>
                   <div style={{display:'flex',gap:'10px',marginBottom:'25px'}}>
                        <select style={{width:'200px', height:'33px',border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'#E8E8E8'}}>
                             <option value="default">Default Report Template</option>
                             <option value="report">report</option>
                        </select>

                        <select style={{width:'200px', height:'33px',border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'#E8E8E8'}}
                        >
                             <option value="csv">CSV file</option>
                             <option value="json">Json file</option>
                             <option value="xml">XML file</option>
                        </select>

                        <button style={{width:'120px',height:'33px',color:'#fff',border:'1px solid #ccc',borderRadius:'5px',
                            backgroundColor:'#74A545',cursor:'pointer',fontSize:'14px',fontFamily:'Inter'}}
                            >
                            Export Report
                        </button>
                        
                    </div>
                    <table style={{width: "100%",borderCollapse: "collapse",borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" ,fontSize:'12px',fontFamily:'Inter'}}>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total SGST</td>
                                <td style={{ padding: "10px" }}>₹ {orderData.totalSgst}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total CGST</td>
                                <td style={{ padding: "10px" }}>₹ {orderData.totalCgst}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total IGST</td>
                                <td style={{ padding: "10px" }}>₹ {orderData.totalIgst}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total CESS</td>
                                <td style={{ padding: "10px" }}>₹ {orderData.totalCess}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total Shipping Amount</td>
                                <td style={{ padding: "10px" }}>₹ {orderData.totalShipping}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px" }}>Total Orders Amount</td>
                                <td style={{ padding: "10px" }}>₹ {orderData.totalPrice}</td>
                            </tr>    
                        </tbody>
                    </table>
                </div>
            ) : (
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
        </div>
             </div>
        </div>
    );
}