import React, { useState, useEffect } from "react";

const Editmodal = ({ isOpen, order, onClose, onSubmit }) => {
  // Receive props
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billCustomerName, setBillCustomerName] = useState("");
  const [billGSTIN, setBillGSTIN] = useState("");
  const [billAddress, setBillAddress] = useState("");
  const [billPhone, setBillPhone] = useState("");
  const [shipCustomerName, setShipCustomerName] = useState("");
  const [shipGstin, setShipGstin] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipPhone, setShipPhone] = useState("");

  // Initialize state when the component mounts (or when the order prop changes)
  useEffect(() => {
    if (order) {
      setInvoiceDate(order.date || "");
      setInvoiceNumber(order.invoice_number || "");
      setBillCustomerName(order.bill_customer_name || "");
      setBillGSTIN(order.bill_gstin || "");
      setBillAddress(order.bill_address || "");
      setBillPhone(order.bill_phone || "");
      setShipCustomerName(order.ship_customer_name || "");
      setShipGstin(order.ship_gstin || "");
      setShipAddress(order.ship_address || "");
      setShipPhone(order.ship_phone || "");
    }
  }, [order]); //  Important:  useEffect is ran when order changes.

  if (!isOpen) {
    return null; // Don't render anything if not open
  }

  const handleSubmit = () => {
    const formData = {
      invoiceDate,
      invoiceNumber,
      billCustomerName,
      billGSTIN,
      billAddress,
      billPhone,
      shipCustomerName,
      shipGstin,
      shipAddress,
      shipPhone,
    };
    onSubmit(formData); // Call the onSubmit prop with the data
  };

return (
            <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            >
            <div
                style={{
                backgroundColor: "#fff",
                // padding: "20px",
                borderRadius: "5px",
                width: "500px",
                maxHeight: "95vh", // Limit the height to 90% of the viewport
                overflowY: "auto",
                MozAppearance:'none',
                }}
            >
               <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                    backgroundColor: "#F5F5F5",
                    padding: "10px 16px",  // Add padding to give the content some space
                }}
            >
                <h2 style={{
                    fontSize: '16px',
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    margin: 0  
                }}>   Update Invoice</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        fontFamily: 'Inter',
                        fontWeight: '600',
                        padding: 0  // Reset default padding
                    }}
                >
                    ×
                </button>
            </div>
                <div style={{padding:'10px'}}>
                <div>
                     <h1 style={{fontSize:'14px', fontFamily:'Inter', fontWeight:'bold', marginBottom:'8px'}}>Order Number: #0001</h1>
                 </div>
                 
                <div>
                <label htmlFor="invoiceDate" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Invoice/Supply Date</label>
                <input
                    type="text"
                    id="invoiceDate"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="invoiceNumber" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Invoice Number:</label>
                <input
                    type="text"
                    id="invoiceNumber"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="billCustomerName" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>
                    Bill Customer/Company Name:</label>
                    <span style={{display:'flex',color:'red', fontSize:'10px'}}>(Use customer tab to edit company name)</span>
                <input
                    type="text"
                    id="billCustomerName"
                    value={billCustomerName}
                    onChange={(e) => setBillCustomerName(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>
                <div>

                <label htmlFor="BillGSTIN" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Bill GSTIN:</label>
                <input
                    type="text"
                    id="BillGSTIN"
                    value={billGSTIN}
                    onChange={(e) => setBillGSTIN(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="BillAddress" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Bill Address:</label>
                <input
                    type="text"
                    id="BillAddress"
                    value={billAddress}
                    onChange={(e) => setBillAddress(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="BillPhone" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Bill Phone:</label>
                <input
                    type="text"
                    id="BillPhone"
                    value={billPhone}
                    onChange={(e) => setBillPhone(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="ShipCustomerName"  style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Ship Customer/Company Name:</label>
                <span style={{display:'flex',color:'red', fontSize:'10px'}}>
                    (Use customer tab to edit company name) </span>
                <input
                    type="text"
                    id="ShipCustomerName"
                    value={shipCustomerName}
                    onChange={(e) => setShipCustomerName(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="ShipGSTIN" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Ship GSTIN:</label>
                <input
                    type="text"
                    id="ShipGSTIN"
                    value={shipGstin}
                    onChange={(e) => setShipGstin(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="ShipAddress" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Ship Address:</label>
                <input
                    type="text"
                    id="ShipAddress"
                    value={shipAddress}
                    onChange={(e) => setShipAddress(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>

                <div>
                <label htmlFor="ShipPhone" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Ship Phone:</label>
                <input
                    type="text"
                    id="ShipPhone"
                    value={shipPhone}
                    onChange={(e) => setShipPhone(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                />
                </div>
            {/* TEXT BOX  */}
                 <div>
                    <label htmlFor="Orderterms" style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Order Terms and Condition</label>
                    <textarea
                    style={{
                        width: '100%',
                        padding: '5px',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontFamily: 'Arial, sans-serif', // Or your preferred font
                        fontSize: '14px',
                        resize: 'vertical', // Allows the user to resize the textarea vertically
                        minHeight: '100px',   //Set the intial height of the textarea.
                        boxSizing:'border-box', 
                        color:'#B8B8B8',
                        textAlign: 'left',
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                        lineHeight: '1.5',
                        textIndent:'20px',
                    }}
                    defaultValue={`
                        Order Confirmation:
                        Orders placed through the website are subject to confirmation via email or SMS.
                        Payment must be completed at checkout unless specified otherwise.

                        Cancellation Policy:

                        Customers can cancel online orders within 24 hours of placing the order or before the order is dispatched, whichever comes first.
                        Refunds for cancellations will be processed within 7–10 business days.

                        Delivery Policy:

                        Standard delivery timelines are 5–7 business days.
                        Delays caused by external factors (e.g., weather, strikes) are not the seller's liability.

                        Return/Refund Policy:

                        Returns must be initiated within 7 days of receipt.
                        Refunds will only be processed for items in their original condition, excluding shipping costs.`}
                        />
                    </div>
                 
                 <div>
                    <label htmlFor="orderproduct"style={{fontSize:'14px', fontFamily:'Inter', color:'#000'}}>Order Products Title(250 Max Characters)</label>
                    <input 
                         type="text"
                         placeholder="Products"
                         style={{ width: "100%", padding: "5px", marginBottom: "10px" , height:'36px', borderRadius:'5px', border:'1px solid #ccc'}}
                    />
                 </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start" , padding:'10px'}}>
                <button
                    onClick={handleSubmit}
                    style={{
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                    }} >
                    Submit
                </button>
                <button
                    onClick={onClose}
                    style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    }}
                >
                    Cancel
                </button>
               
                </div>
            </div>
            </div>
        );
        };

export default Editmodal;
