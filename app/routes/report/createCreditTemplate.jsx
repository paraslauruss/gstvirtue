import React from 'react'
import ic_back from '../../assets/images/Group@2x.png';
import { useState ,useEffect} from 'react'


export default function createCreditTemplate({onBack}) {

      const [availableFields, setAvailableFields] = useState([
            "Order_Name", "Order_ID", "Order_Date", "Invoice_Date", "Invoice_Number",
            "Gstin", "Customer_Full_Name", "Customer_Phone", "Customer_Email",
            "Customer_Billing_Address", "Customer_Shipping_Address", "Customer_GSTIN",
            "Product_Name", "Product_Sku", "HSN", "Quantity", "Display_Price",
            "Discount_Per_Product", "Discount_Percentage_Per_Product", "Discount_Coupon_Code",
            "Amount_Before_Tax", "Amount_After_Tax", "SGST_%", "CGST_%", "IGST_%",
            "CESS_%", "SGST", "CGST","IGST","CESS","Total_tax","Ship_Amount_Before_Gst","Ship_SGST","Ship_CGST",
            "ship_IGST","Ship_SGST%","Ship_CGST%","ship_IGST%","Ship_CESS","Ship_CESS%","Ship_Amount_After_Gst",
            "Bill_City","Bill_Pincode","Bill_To_State","Bill_State_Code","Bill_State_No","Bill_Country","Ship_City",
            "Ship_Pincode","Ship_To_State","Ship_State_Code","Ship_State_No","Ship_Country","Payment_mode","Order_Note",
            "Status","Fulfillement_Status","Fulfill_Location_Id","Fulfill_Location_State_Code","Fullfillement_Tracking_Company",
            "Fullfillement_Tracking_Number","Fulfillement_Tracking_Url","Refund_Amount","Total_Amount"
          ]);
          const [selectedFields, setSelectedFields] = useState([]);
          const [selectedAvailableField, setSelectedAvailableField] = useState(null);
          const [selectedSelectedField, setSelectedSelectedField] = useState(null);
          const [renamedFieldValue, setRenamedFieldValue] = useState(''); // Track the input value
          const [reportTitle, setReportTitle] = useState("");
          const [savedTemplates, setSavedTemplates] = useState([]);

          const [popupMessage, setPopupMessage] = useState("");
          const [showPopup, setShowPopup] = useState(false);

           const saveTemplate = async () => {
            // Check if reportTitle and selectedFields are valid
            if (!reportTitle.trim() || selectedFields.length === 0) {
                setPopupMessage("Please enter a report title and select fields.");
                setShowPopup(true);
                return;
            }
        
            const templateData = { 
                title: reportTitle.trim(),  // Title as a string
                fields: selectedFields      // fields as an array of selected fields
            };
        
            try {
                const response = await fetch("http://localhost:3001/api/templates/save", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Add headers if necessary
                    },
                    body: JSON.stringify(templateData),  
                });
        
                if (response.ok) {
                    setPopupMessage("Template saved successfully!");
                    fetchSavedTemplates();  
                } else {
                    const errorData = await response.json();
                    setPopupMessage(errorData.message || "Failed to save template.");
                }
                setShowPopup(true);
            } catch (error) {
                console.error("Error saving template:", error);
                setPopupMessage("Error connecting to server.");
                setShowPopup(true);
            }
        };
        const fetchSavedTemplates = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/templates");
                if (response.ok) {
                    const templates = await response.json();
                    setSavedTemplates(templates);
                } else {
                    console.error("Failed to fetch saved templates.");
                }
            } catch (error) {
                console.error("Error fetching saved templates:", error);
            }
        };
          const moveFieldRight = () => {
            if (selectedAvailableField) {
                setSelectedFields([...selectedFields, selectedAvailableField]);
                setAvailableFields(availableFields.filter(field => field !== selectedAvailableField));
                setSelectedAvailableField(null); // Clear selection after moving
            }
          };
        
          const moveFieldLeft = () => {
            if (selectedSelectedField) {
                setAvailableFields([...availableFields, selectedSelectedField]);
                setSelectedFields(selectedFields.filter(field => field !== selectedSelectedField));
                setSelectedSelectedField(null); // Clear selection after moving
            }
          };
        
          const moveAllRight = () => {
            setSelectedFields([...selectedFields, ...availableFields]);
            setAvailableFields([]);
          };
          const moveAllLeft = () => {
            setAvailableFields([...availableFields, ...selectedFields]);
            setSelectedFields([]);
          };
        
          const renameField = (newName) => {
            setRenamedFieldValue(newName); // Update the renamed field value state
        };
    
        const confirmRename = () => {
            if (selectedSelectedField && renamedFieldValue) {
                const updatedSelectedFields = selectedFields.map(field =>
                    field === selectedSelectedField ? renamedFieldValue : field
                );
                setSelectedFields(updatedSelectedFields);
                setSelectedSelectedField(null);
                setRenamedFieldValue(''); // Clear the input field
            }
        };
      

  return (
    <div style={{margin:'0',padding:'0',display:'flex',alignItems:'flex-start',justifyContent:'center',height:'100vh'}}>
           <div style={{width:'80%',maxWidth:'1100px',borderRadius:'11px',padding:'20px'}}>
            {/* header section */}
            <div style={{  display: "flex", alignItems: "center",gap: "8px", padding: "16px" }}>
                <img src={ic_back} alt='goback' style={{width:'20px', height:'20px',cursor:'pointer'}} onClick={onBack}/>
                <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#000" }}>Create Reports Template</h2>
             </div>

                {/* main content */}
                <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '20px', display: 'flex', gap: '20px' }}>
                    {/* Available Fields */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{fontSize:'14px',fontFamily:'Inter',color:'#000',marginBottom:'20px',fontWeight:'500'}}>Select Report Fields</h3>
                        <select multiple size={10} 
                            style={{ width: '80%', height: '500px',fontFamily:'Inter' }} 
                            value={selectedAvailableField || ''}
                            onChange={(e) => setSelectedAvailableField(e.target.value)}
                        >
                          {availableFields.map((field, index) => (
                            <option key={index} value={field}>{field}</option>
                          ))}
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px',marginTop:'50px',}}>
                        <button onClick={moveAllRight}>&#x21D2;</button>
                        <button onClick={moveFieldRight}>&#x2192;</button>
                        <button onClick={moveFieldLeft}> &#x2190;</button>
                        <button onClick={moveAllLeft}>&#x21D0;</button>
                    </div>
                    
                    {/* Selected Fields */}
                    <div style={{ flex: 1 }}>
                         {/* Rename & Save */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px',marginBottom:'12px' }}>
                            <input
                                type="text"
                                placeholder="Select and Rename Field"
                                value={renamedFieldValue}
                                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
                                onChange={(e) => renameField(e.target.value)}
                            />
                            <button style={{width:'100px',height:'33px',border:'1px solid #ccc',borderRadius:'5px',color:'#000',backgroundColor:'#fff',fontSize:'14px',fontFamily:'Inter'}}
                               onClick={confirmRename}>
                                Rename
                            </button>
                        </div>
                        <select multiple size={10} 
                            style={{ width: '80%', height: '500px' }} 
                            onChange={(e) => setSelectedSelectedField(e.target.value)}
                            value={selectedSelectedField || ''}
                            >
                            {selectedFields.map((field, index) => (
                                <option key={index} value={field}>{field}</option>
                            ))}
                        </select>

                         {/* Report Title */}
                        <div style={{ marginTop: '10px' }}>
                            <input
                                type="text"
                                placeholder="Enter Report Title"
                                value={reportTitle}
                                onChange={(e) => setReportTitle(e.target.value)}
                                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px', width: '200px',height:'36px' }}
                            />
                            {/* popup for report title */}
                             {showPopup && (
                                <div style={{
                                    position: "fixed",
                                    top: "20px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "#ffcccc",
                                    color: "#000",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                                    zIndex: 1000
                                }}>
                                    {popupMessage}
                                    <button 
                                        onClick={() => setShowPopup(false)} 
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor: "red",
                                            color: "#fff",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                            fontSize:'14px',
                                            fontFamily:'Inter'
                                        }}>
                                            ✖
                                    </button>
                                </div>
                            )}
                            <button onClick={saveTemplate} style={{border:'1px solid #ccc', backgroundColor: '#74A545', color: 'white', padding: '8px 10px', borderRadius: '6px',marginLeft:'14px'}}>
                                Save Tempalte
                            </button>
                        </div>
                    </div>
                </div>
                {/* footer */}
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'}}>
                    <p style={{fontSize:'13px',fontFamily:'Inter',color:'#000'}}>© 2025 VirtueGst. All Rights Reserved.</p>
                </div>
            </div>
        </div>
  )
}
