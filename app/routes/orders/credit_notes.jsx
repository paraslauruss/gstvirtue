import { useState , useEffect} from 'react';
import downloadZip from '../../assets/images/ic_download.png'
import download from '../../assets/images/Vector.png'
import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import ic_print from '../../assets/images/ic_print.png';
import ic_edit from '../../assets/images/ic_edit.png';
import DatePicker from 'react-datepicker'; // Install: npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css';
import ic_date from '../../assets/images/ic_date.png';
import warning from '../../assets/images/ic_warning.jpg'
import ic_back from '../../assets/images/ic_back.webp';

const CustomDateInput = ({ value, onClick }) => (
  <input
      type="text"
      value={value}
      onClick={onClick}
      placeholder="Select a date"
      style={{
          width: '100%',
          height: '35px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginTop: '5px',
          marginBottom: '5px',
          paddingLeft: '10px', // Optional for better spacing
          cursor: 'pointer'
      }}
      readOnly
  />
);


export function CreditNotes() {

    //for checkbox
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);

   // Handle checkbox toggle
   const toggleSelectOrder = (order) => {
    setSelectedOrders((prev) => (prev?._id === order._id ? null : order)); 
    };
    // backend data fetches all refunded orders 
    const session = useLoaderData();
    useEffect(() => {
      const fetchRefundedOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/refunded", {
            headers: {
              "Content-Type": "application/json",
              "api-version":"2025-01",
              'store-name': session.storeName,
              'access-token': session.accessToken,
            }
          });
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching refunded orders:", error);
        }
      };
      fetchRefundedOrders();
    }, []);

    // Edit icon popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleEditClick = (order) => {
      setSelectedOrders(order); 
      setCnPrefix(order.cn_prefix || ""); 
      setCnSuffix(order.cn_suffix || ""); 
      setCancellationDate(order.cancellation_date ? new Date(order.cancellation_date) : null);
      setIsPopupOpen(true);
  };

    const handlePopupClose = () => {
      setIsPopupOpen(false);
    };
    // CN edit icon change
    const [cnPrefix, setCnPrefix] = useState("");
    const [cnSuffix, setCnSuffix] = useState("");
    const [cancellationDate, setCancellationDate] = useState(null);
      // fetching selected order detauls with particular order number
      useEffect(() => {
        const fetchRefundedOrderDetails = async () => {
            if (!selectedOrders || !selectedOrders.order_number) return; // Ensure order_number is available
            try {
                const response = await fetch(`http://localhost:3001/api/refunded/${selectedOrders.order_number}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "api-version": "2025-01",
                        "store-name": session.storeName,
                        "access-token": session.accessToken,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched order details:", data);
                    setCnPrefix(data.cn_prefix || "");
                    setCnSuffix(data.cn_suffix || "");
                    setCancellationDate(data.cancellation_date ? new Date(data.cancellation_date) : null);
                } else {
                    console.error("Error fetching order details:", await response.json());
                }
            } catch (error) {
                console.error("Error fetching refunded order details:", error);
            }
        };
        fetchRefundedOrderDetails();
    }, [selectedOrders]);
  
    // Handle input changes
    const handlePrefixChange = (e) => setCnPrefix(e.target.value);
    const handleSuffixChange = (e) => setCnSuffix(e.target.value);
    const handleDateChange = (date) => setCancellationDate(date);
    // Function to update values in the backend
    const handleUpdate = async () => {
      if (!selectedOrders || !selectedOrders.order_number) {
        alert("No order selected or order_number is missing!");
        return;
      }
      const updatedCnNumber = `${cnPrefix}${cnSuffix}`; // Combine prefix & suffix
      const dataToUpdate = {
        cn_prefix: cnPrefix,
        cn_suffix: cnSuffix,
        cn_number: updatedCnNumber,
        cancellation_date: cancellationDate ? cancellationDate.toISOString() : null,
      };
    
      try {
        const response = await fetch(`http://localhost:3001/api/refunded/${selectedOrders.order_number}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "api-version": "2025-01",
            "store-name": session.storeName,
            "access-token": session.accessToken,
          },
          body: JSON.stringify(dataToUpdate),
        });
    
        if (response.ok) {
          setIsPopupOpen(false); // Close the edit popup
          setShowSuccessPopup(true); // Show success popup
          // Fetch updated order list immediately
          await fetchOrders();
          // Automatically hide success popup after 2 seconds
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 1000);
        } else {
          const errorData = await response.json();
          console.error("Error updating:", errorData);
        }
      } catch (error) {
        console.error("Error updating:", error);
      }
    };

  // search function
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [startDate , setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/refunded", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api-version":"2025-01",
            'store-name': session.storeName,
            'access-token': session.accessToken,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data); // Update state with latest data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    useEffect(() => {
      if (filteredOrders.length === 0 || filteredOrders.length === orders.length) {
        setFilteredOrders(orders);
      }
    }, [orders]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setIsStartDatePickerOpen(false);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setIsEndDatePickerOpen(false);
    };

    const parseDate = (dateStr) => {
      if (!dateStr || typeof dateStr !== "string") return null; // Ensure valid input
      const parts = dateStr.split("/").map(Number);
      if (parts.length !== 3) return null; // Ensure correct format
      return new Date(parts[2], parts[0] - 1, parts[1]); // MM/DD/YYYY → Date object
    };

    const handleSearch = () => {  
      if (!orders.length) {
        console.log("No orders to filter.");
        return;
      }
        let filtered = [...orders];
        if (orderNumber) {
          console.log("Filtering by order number:", orderNumber);
          filtered = filtered.filter((order) => {
            const orderNumberMatch = order.order_number?.toString().includes(orderNumber) ||
                                      (order.customer_name && order.customer_name.toLowerCase().includes(orderNumber.toLowerCase()));
            console.log(`Order ${order.order_number}: Order Number Match - ${orderNumberMatch}`);
            return orderNumberMatch;
          });
          console.log("Orders after order number filter:", filtered);
        }
      
        // Filter by payment status
        if (paymentStatus) {
          console.log("Filtering by payment status:", paymentStatus);
          filtered = filtered.filter((order) => {
            const statusMatch = order.status && order.status.trim().toLowerCase() === paymentStatus.trim().toLowerCase();
            console.log(`Order ${order.order_number}: Status Match - ${statusMatch}`);
            return statusMatch;
          });
          console.log("Orders after payment status filter:", filtered);
        }
        // Convert input dates to Date objects
        const startDateObj = startDate ? new Date(startDate) : null;
        const endDateObj = endDate ? new Date(endDate) : null;
      
        if (startDateObj) startDateObj.setHours(0, 0, 0, 0);
        if (endDateObj) endDateObj.setHours(23, 59, 59, 999);
      
        // Filter by date range (order_date OR cancellation_date)
        if (startDateObj || endDateObj) {
          console.log("Filtering by date range. Start:", startDateObj, " End:", endDateObj);
          filtered = filtered.filter((order) => {
            const orderDate = order.order_date ? new Date(order.order_date) : null;
            const cancelDate = order.cancellation_date ? new Date(order.cancellation_date) : null;

            console.log(`Order ${order.order_number}: orderDate - ${orderDate}, cancelDate - ${cancelDate}`);

            let isValid = false;
      
            if (orderDate) {
              if ((!startDateObj || orderDate >= startDateObj) && (!endDateObj || orderDate <= endDateObj)) {
                isValid = true;
              }
            }
            if (cancelDate) {
              if ((!startDateObj || cancelDate >= startDateObj) && (!endDateObj || cancelDate <= endDateObj)) {
                isValid = true;
              }
            }
            console.log(`Order ${order.order_number}: Date range match - ${isValid}`);
            return isValid;
          });
          console.log("Orders after date range filter:", filtered);
        }
        console.log("Final filtered orders:", filtered);
        setFilteredOrders(filtered);
      };


    const handleClear = () => {
      setOrderNumber("");
      setPaymentStatus("");
      setStartDate(null);
      setEndDate(null);
      setFilteredOrders(orders);
    };
  
    const [showBlankPage, setShowBlankPage] = useState(false);

    if (showBlankPage) {
      // This completely replaces the page when showBlankPage is true
      return (
        <div style={{
          display: "flex",
          flexDirection: "column", /* Changed to column */
          boxSizing: "border-box",
          width: "1000px",
          height: "auto",
          marginLeft: "100px",
          marginTop: "20px",
          background: "#ffffff",
          padding: "20px",
          gap: "8px",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
              }}
                onClick={() => setShowBlankPage(false)}>
                    <img src={ic_back } alt='back'style={{width:'25px',height:'25px',backgroundColor:'transparent'}}/>
              </button>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                Download Invoice (Zip)
              </span>
            </div>
             {/* warning */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "#F0F8FF", 
                padding: "10px", 
                border:'1px solid #ccc',
                borderRadius: "4px",
                marginTop: "10px",
              }} >
                <img
                  src={warning}  /* Replace with the actual path */
                  alt="Warning Icon"
                  style={{ width: "16px", height: "16px", marginRight: "5px" }}
                />
                <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.4", fontFamily:'Inter',fontWeight:'600' }}>
                  Please note that the ZIP file will be available for download for one day
                  only. After this period, it will be automatically removed.
                  Additionally, once the ZIP file is downloaded, it will no longer appear
                  in the list.
                </p>
            </div>
            {/*border with status*/}
            <div style={{marginTop:'15px', border:'1px solid #ccc', borderRadius:'8px', backgroundColor:'#ffffff',padding:'12px 8px'}}>
            <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "45% 15% 15% 5%", 
                  padding: "6px",
                  borderBottom: "1px solid #e0e0e0", 
                  fontWeight: "bold", 
                  color: "#555", 
                  fontSize: "14px",
                  fontFamily:'Inter'
                }}>
                <div>Date and Time</div>
                <div>Status</div>
                <div>Type</div>
                <div>Action</div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "45% 15% 15% 5%",
                  padding: "10px",
                  fontSize: "14px",
                  color: "#666",
                  fontFamily:'Inter'
                }}>
                <div>2025-03-10 12:46:05</div>
                <div>Done</div>
                <div>CreditNote</div>
                <div>
                  <a
                    href="#"
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#000", 
                      textDecoration: "none", 
                    }}>
                    ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
      );
    }

  return (
    <div>
      <div style={{
        width: "158px",
        height: "21px",
        marginLeft: "28px",
        marginTop: "33px",
        fontFamily: "Inter, sans-serif",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "19px",
        lineHeight: "21px",
        display: "flex",
        alignItems: "center",
        color: "#000000"
      }}>Credit Notes</div>
      
            <div style={{
              boxSizing: "border-box",
              width: "1190px",
              height: "450px",
              marginLeft: "28px",
              marginTop: "20px",
              background: "#ffffff",
              border: "1px solid #f1f1f4",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.03)",
              borderRadius: "13px",
              padding: "20px"
            }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {/* customer name */}
                <div>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Order No, Invoice No, Customer"
                    style={{
                      width:'300px',
                      height:'33px',
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      fontSize:'14px',
                      fontFamily:'Inter'
                    }}
                  />
                </div>
                {/* payment */}
                <select 
                 value={paymentStatus}
                 onChange={(e) => setPaymentStatus(e.target.value)}
                style={{
                  width:'250px',
                  height:'33px',
                  padding: "6px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize:'14px',
                  fontFamily:'Inter'
                }}>
                  <option value="">Payment Status</option>
                  <option value="partially refunded">partially refunded</option>
                  <option value="refunded">refunded</option>
                  <option value="voided">voided</option>
                </select>
                {/* start date */}
                <div style={{ display: "flex", position: "relative", width:'30%'}}>
                    <div
                        onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}
                        style={{
                            padding: "12px",
                            height: "35px",
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
                <div style={{ display: "flex", width: "30%", position: "relative" }}>
                  <div onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
                        style={{ padding: "12px",
                                 height: "35px",
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
                <button  onClick={handleSearch}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#28a745",
                  color: "white",
                  fontSize:'14px',
                  fontFamily:'Inter'
                }}>Search</button>

                {/* clear */}
                <button onClick={handleClear}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#f8f9fa",
                  color: "#000",
                  fontSize:'14px',
                  fontFamily:'Inter'
                }}>Clear</button>
              </div>
              
              <div style={{
                    display: "flex",
                      padding: "10px",
                      justifyContent:'space-between'
                  }}>
                  <div style={{display:'flex', }}>
                      <p style={{
                        fontSize:'14px',
                        fontFamily:'Inter',
                        fontWeight:'500',
                        marginRight:'40px',
                        marginTop:'10px'
                      }}> Action on 0 Selected</p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* donwload */}
                    <div>
                      <button style={{
                          backgroundColor: "#74A535",
                          border: "none",
                          padding: "8px 10px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          width:'50px'
                        }}>
                        <img src={downloadZip}  alt="donwload " style={{width:'20px', height:'20px'}}/>
                      </button>
                    </div>
                      {/* zip */}
                     <div>
                        <button onClick={() => setShowBlankPage(true)}
                         style={{
                            backgroundColor: "#74A535",
                            border: "none",
                            padding: "8px 10px",
                            borderRadius: "3px",
                            cursor: "pointer",   
                            width:'50px' 
                          }}>
                          <img src={download} alt='zip' style={{ width:'20px',height:'20px'}}/>
                        </button>
                     </div>
                  </div>

                  </div>
                  {/* result per page */}
                  <div style={{ display: "flex", alignItems: "center", marginTop:'10px' }}>
                    <select
                      id="results-per-page"
                      style={{
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        width:'250px',
                        height:'33px',
                        fontSize:'14px',
                        fontFamily:'Inter'
                      }}>
                      <option value="result50">Results per page 50</option>
                      <option value="result100">Results per page 100</option>
                    </select>
                  </div> 
                </div>

            <div style={{marginTop:'20px'}}>
                {/* Table Header */}
                <div
                  style={{
                    backgroundColor: "#565656",
                    display: "flex",
                    padding: "10px",
                    marginTop: "20px",
                    borderRadius: "4px",
                    color: "white",
                    fontWeight: "bold",
                    position: "sticky",
                    top: "0",
                    zIndex: "10",
                  }}>
                    <div style={{ width: "5%" }}></div>
                    <div style={{ width: "13%" }}>Order</div>
                    <div style={{ width: "13%" }}>Order Date</div>
                    <div style={{ width: "13%" }}>CN No.</div>
                    <div style={{ width: "13%" }}>CN Date</div>
                    <div style={{ width: "13%" }}>Customer</div>
                    <div style={{ width: "13%" }}>Total Tax</div>
                    <div style={{ width: "10%" }}>Total</div>
                    <div style={{ width: "10%" }}>Status</div>
                    <div style={{ width: "10%" }}>Action</div>
                </div>
                      
            <div style={{height:'auto'}}>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      style={{
                        display: "flex",
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        alignItems: "center",
                        background: "#fff",
                      }}>
                      <div style={{ width: "5%" }}>
                        <input
                          type="checkbox"
                          checked={selectedOrders?._id === order._id}
                          onChange={() => toggleSelectOrder(order._id)}
                        />
                      </div>
                      <div style={{ width: "13%" }}>{order.order_number}</div>
                      <div style={{ width: "13%" }}>
                        {order.order_date
                          ? new Date(order.order_date).toLocaleDateString()
                          : "-"}
                      </div>
                      <div style={{ width: "13%" }}>{order.cn_number || "-"}</div>
                      <div style={{ width: "13%" }}>
                        {order.cancellation_date
                          ? new Date(order.cancellation_date).toLocaleDateString()
                          : "-"}
                      </div>
                      <div style={{ width: "13%" }}>{order.customer_name || "-"}</div>
                      <div style={{ width: "13%" }}>₹ {order.tax_amount || "0.00"}</div>
                      <div style={{ width: "10%" }}>₹ {order.total_price || "0.00"}</div>
                      <div style={{ width: "10%" }}>
                      <span
                          style={{
                            backgroundColor: "#b2e5b2",
                            padding: "5px 10px",
                            borderRadius: "10px",
                          }}>
                          {order.status}
                        </span>
                      </div>
                      {/* action icon */}
                      <div style={{ width: "10%", display: "flex", gap: "10px" }}>
                        {/* print */}
                      <div style={{ position: "relative", display: "inline-block" }}>
                          <img 
                              src={ic_print} 
                              style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }} 
                              alt="Swap"
                              onMouseEnter={(e) => e.currentTarget.nextSibling.style.visibility = "visible"}
                              onMouseLeave={(e) => e.currentTarget.nextSibling.style.visibility = "hidden"}
                          />
                          <div style={{
                              position: "absolute",
                              bottom: "120%", // Position tooltip above the image
                              left: "50%",
                              transform: "translateX(-50%)",
                              backgroundColor: "#333", // Light black background
                              color: "#fff",
                              padding: "5px 10px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              border: "1px solid #555", // Border for tooltip
                              whiteSpace: "nowrap",
                              visibility: "hidden",
                              opacity: 1,
                              transition: "opacity 0.2s",
                              zIndex: 1000
                          }}>
                          Print Credit Note
                          </div>
                      </div>
                          {/* edit icone */}
                        <div style={{ position: "relative", display: "inline-block" }}>
                              <img 
                                  src={ic_edit} 
                                  style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }} 
                                  alt="Edit" 
                                  onClick={() => handleEditClick(order)} 
                                  onMouseEnter={(e) => e.currentTarget.nextSibling.style.visibility = "visible"}
                                  onMouseLeave={(e) => e.currentTarget.nextSibling.style.visibility = "hidden"}
                                  />
                              <div style={{
                                  position: "absolute",
                                  bottom: "120%", // Position tooltip above the image
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  backgroundColor: "#333", // Light black background
                                  color: "#fff",
                                  padding: "5px 10px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  border: "1px solid #555", // Border for tooltip
                                  whiteSpace: "nowrap",
                                  visibility: "hidden",
                                  opacity: 1,
                                  transition: "opacity 0.2s",
                                  zIndex: 1000
                              }}>
                                  Update Credit Note
                              </div>
                              {isPopupOpen && (
                                  <div style={{
                                      position: "fixed",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      backgroundColor: "rgba(0, 0, 0, 0.5)", 
                                      zIndex: 999, 
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}>
                                    <div style={{
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        width: "500px",
                                        border:'1px solid #ccc',
                                      }}>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            backgroundColor:'#E8E8E8',
                                            padding:'10px',
                                            border:'1px solid #ccc',
                                            borderRadius:'11px'
                                        }}>
                                            <h2 style={{fontSize:'16px', fontFamily:'Inter', fontWeight:'500', color:'#000', marginLeft:'9px'}}>Update Credit Note</h2>
                                            <button onClick={handlePopupClose} aria-label="Close" style={{fontSize:'20px', fontFamily:'Inter', color:'#A8A8A8',fontWeight:'500',borderRadius:'0',border:'none',outline:'none',background:'transparent',cursor:'pointer'  }}>
                                                X
                                            </button>
                                        </div>

                                        <div style={{padding:'15px', fontSize:'14px', fontFamily:'Inter',fontWeight:'500', color:'#000'}}>
                                            <p style={{fontWeight:'bold'}}>Order Number: #{order.order_number}</p>

                                              <div style={{marginTop:'6px'}}>
                                                  <p>Credit Note Date: </p>
                                                  <DatePicker
                                                    selected={cancellationDate}
                                                    onChange={handleDateChange}
                                                    dateFormat="dd-MM-yyyy" 
                                                    placeholderText="Select a date"
                                                    customInput={<CustomDateInput />}
                                                  />
                                              </div>
                                              {/* prefix */}
                                                <div style={{marginTop:'5px'}}>
                                                    <p>Credit Note Prefix(Max Characters 50)</p>
                                                    <input 
                                                      type="text" 
                                                      value={cnPrefix}
                                                      onChange={handlePrefixChange}
                                                        maxLength={50}
                                                      style={{
                                                        width:'100%',
                                                        height:'35px',
                                                        borderRadius:'5px',
                                                        border:'1px solid #ccc',
                                                        marginTop:'5px',
                                                        marginBottom:'5px'
                                                      }}
                                                      />
                                                </div>
                                                {/* CNnumber  */}
                                                <div style={{marginTop:'5px'}}>
                                                    <p>Credit Note Number(Max Characters 50)</p>
                                                    <input 
                                                      type="text"
                                                      maxLength={50}
                                                      value={cnSuffix}
                                                      onChange={handleSuffixChange}
                                                      style={{
                                                        width:'100%',
                                                        height:'35px',
                                                        borderRadius:'5px',
                                                        border:'1px solid #ccc',
                                                        marginTop:'5px',
                                                        marginBottom:'5px'
                                                      }}
                                                      />
                                                </div>
                                                
                                              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                                                  <button onClick={handleUpdate}
                                                    style={{
                                                      backgroundColor: '#74A545',
                                                      color: 'white',
                                                      padding: '10px 15px',
                                                      borderRadius: '5px',
                                                      border: 'none',
                                                      cursor: 'pointer',
                                                      marginRight: '10px',
                                                      fontSize:'14px', fontFamily:'Inter', fontWeight:'500'
                                                    }} >
                                                        Submit
                                                  </button>
                                                  <button onClick={handlePopupClose} style={{
                                                      backgroundColor: 'transparent',
                                                      color: 'black',
                                                      padding: '10px 15px',
                                                      borderRadius: '5px',
                                                      border: '1px solid #ced4da',
                                                      cursor: 'pointer',
                                                      fontSize:'14px', fontFamily:'Inter', fontWeight:'500'
                                                    }}>
                                                      Cancel
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                )}
                          </div>
                          {showSuccessPopup && (
                            <div
                              style={{
                                position: "fixed",
                                top: "20px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#74A545",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                border:'1px solid #ccc',
                                zIndex: 1000,
                                fontSize: "14px",
                                fontWeight: "bold",
                                fontFamily:'Inter'
                              }}
                            >
                              Refund Status Updated
                            </div>
                          )}
                      </div>
                    </div>
                  ))
              ) : (
                <p style={{ textAlign: "center", padding: "10px",fontSize:'14px',fontFamily:'Inter',marginTop:'20px',fontWeight:'500' }}>
                  No Refunded Orders...</p>
              )}
            </div>
         </div>
                <div style={{
                  position: "relative",
                  marginTop: "19px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "#707070"
                }}>
                   <p>@2024 Virtue. All Rights Reserved.</p>
            </div>
        </div>
     </div>
  );
}

export default CreditNotes;
