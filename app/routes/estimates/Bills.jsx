import React, { useState } from "react";
import "./bills.css";
import groupimage from "../../assets/images/Group@2x.png";
import { Card, Page } from "@shopify/polaris";

export const Bills = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    billNumber: "",
    payeeVendor: "",
    billDate: "",
    dueDate: "",
    paymentDate: "",
    paymentTerms: "Net 15",
    items: [],
    discountType: "",
    discountAmount: 0,
    shippingCharge: 0,
    roundOff: 0,
    memo: "",
  });

  const [item, setItem] = useState({
    product: "",
    hsnCode: "",
    gst: 0,
    cess: 0,
    qty: 1,
    rate: 0,
    amount: 0,
  });

  const handleCreateNewClick = () => {
    setIsFormVisible(true);
  };

  const handleBackClick = () => {
    setIsFormVisible(false);
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    // Add logic to save the data, e.g., an API call
    alert("Bill saved successfully!");
    setIsFormVisible(false);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, item] });
    setItem({
      product: "",
      hsnCode: "",
      gst: 0,
      cess: 0,
      qty: 1,
      rate: 0,
      amount: 0,
    });
  };

  return (
    <Page>
      <div style={{ width: "100%", alignItems: "center", maxWidth:'1300px' }}>
        {isFormVisible ? (
          <div>
            <div className="bill-header">
              <div className="htitle">
                <img src={groupimage} alt="Group Icon" />
                <span>Create New Bills</span>
              </div>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>

            <div className="bill-detail">
              <Card>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Bill Prefix:</h1>
                      <input
                        type="text"
                        value={formData.billNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billNumber: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Bill Number:</h1>
                      <input
                        type="text"
                        value={formData.billNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billNumber: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Payee/Vendor:</h1>
                      <input
                        type="text"
                        value={formData.payeeVendor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            payeeVendor: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* Part2 */}
                <div style={{ display: "flex" }}>
                  <div style={{ width: "100%" }} className="billing-date">
                    <label>
                      <h1 className="heading1">Bill Date:</h1>
                      <input
                        type="date"
                        value={formData.billDate}
                        onChange={(e) =>
                          setFormData({ ...formData, billDate: e.target.value })
                        }
                      />
                    </label>
                  </div>

                  <div style={{ width: "100%" }} className="billing-date">
                    <label>
                      <h1 className="heading1">Due Date:</h1>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, dueDate: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <div style={{ width: "100%" }} className="billing-date">
                    <label>
                      <h1 className="heading1">Payment Date:</h1>
                      <input
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentDate: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                  <div style={{ width: "100%" }} className="pay-term">
                    <label>
                      <h1 className="heading1">Payment Terms:</h1>
                      <select
                        value={formData.paymentTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentTerms: e.target.value,
                          })
                        }
                      >
                        <option value="Net 15">Net 15</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 45">Net 45</option>
                      </select>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            <div className="item-details">
              <h3
                style={{
                  marginTop: "30px",
                  fontSize: "17px",
                  color: "black",
                  marginBottom: "20px",
                }}
              >
                Item Details
              </h3>
              <Card>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: "6px", // Adds consistent spacing between the fields
                  }}
                >
                  <h1 style={{ fontSize: "16px", color: "black", margin: "0" }}>
                    Discount Levels:
                  </h1>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginLeft: "6px",
                        width: "100%",
                      }}
                    >
                      <select
                        style={{
                          width: "250px", // Set the desired width
                          height: "33px", // Set height to 33px
                          padding: "5px", // Adjust padding for better text alignment
                          border: "1px solid #ccc",
                          borderRadius: "1px",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                          marginRight: "150px",
                        }}
                      >
                        <option value="Net 15">At transcation Level</option>
                        <option value="Net 15">Net 15</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 45">Net 45</option>
                      </select>
                    </label>
                  </div>

                  <h1
                    style={{
                      fontSize: "16px",
                      color: "black",
                      margin: "0 8px 0 0",
                    }}
                  >
                    Amount are:
                  </h1>

                  <div>
                    <label>
                      <select
                        style={{
                          width: "250px", // Consistent width
                          height: "33px", // Consistent height
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "1px",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="1000">Inclusive of tax</option>
                        <option value="2000">2000</option>
                        <option value="3000">3000</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* part 2 */}
                <div
                  style={{
                    // border: "1px solid #dcdcdc",
                    // borderRadius: "5px",
                    padding: "10px",
                    width: "100%",
                    // maxWidth: "800px",
                    margin: "20px auto",
                    // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                      gap: "10px",
                      borderBottom: "2px solid #E2E2E2",
                      paddingBottom: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      Product<span style={{ color: "red" }}>*</span>
                    </div>
                    <div style={{ fontWeight: "bold" }}>HSN Code</div>
                    <div style={{ fontWeight: "bold" }}>GST %</div>
                    <div style={{ fontWeight: "bold" }}>Cess %</div>
                    <div style={{ fontWeight: "bold" }}>
                      QTY<span style={{ color: "red" }}>*</span>
                    </div>
                    <div style={{ fontWeight: "bold" }}>
                      Rate<span style={{ color: "red" }}>*</span>
                    </div>
                    <div style={{ fontWeight: "bold" }}>
                      Amount<span style={{ color: "red" }}>*</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* Product Dropdown */}
                    <div>
                      <select
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                        }}
                      >
                        <option value="">Search a Product...</option>
                        <option value="">Item 1.</option>
                        <option value="">Item 1.</option>
                        <option value="">Item 1.</option>
                        <option value="">Item 1.</option>
                      </select>
                    </div>

                    {/* HSN Code */}
                    <div>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>

                    {/* GST Percentage */}
                    <div>
                      <input
                        type="text"
                        defaultValue="0%"
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Cess Percentage */}
                    <div>
                      <input
                        type="text"
                        defaultValue="0%"
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <input
                        type="number"
                        defaultValue="1"
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Rate */}
                    <div>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <input
                        type="text"
                        defaultValue="Rs. 0.00"
                        readOnly
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                          backgroundColor: "#D8D8D8",
                        }}
                      />
                    </div>
                  </div>

                  {/* Add Item Button */}
                  <div style={{ textAlign: "left", marginTop: "15px" }}>
                    <button
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                      onClick={handleItemChange}
                    >
                      + Add Item
                    </button>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h3>Added Items:</h3>
                    {item.length > 0 ? (
                      <ul>
                        {item.map((items, index) => (
                          <li key={index}>
                            {`Product: ${items.product}, HSN Code: ${items.hsnCode}, GST: ${items.gst}, Cess: ${items.cess}, QTY: ${items.quantity}, Rate: ${items.rate}, Amount: ${items.amount}`}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No items added yet.</p>
                    )}
                  </div>
                </div>
              </Card>
              {/* 3rd part  */}
              <div className="main">
                <div>
                  <h1 className="main-title">Memo</h1>
                  <textarea
                    className="custom-textarea"
                    //  placeholder="Type here..."
                  />
                </div>

                <div className="invoice-container">
                  <div className="invoice-form">
                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        Subtotal
                      </label>
                      <input
                        type="text"
                        style={{ backgroundColor: "	#E0E0E0" }}
                      />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        0% CGST on Rs. 0.00
                      </label>
                      <input
                        type="text"
                        value="RS. 0.00"
                        style={{ backgroundColor: "	#E0E0E0" }}
                      />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        0% SGST on Rs. 0.00
                      </label>
                      <input
                        type="text"
                        value="RS. 0.00"
                        style={{ backgroundColor: "	#E0E0E0" }}
                      />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        0% CESS on Rs. 0.00
                      </label>
                      <input
                        type="text"
                        value="RS. 0.00"
                        style={{ backgroundColor: "	#E0E0E0" }}
                      />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        Discount Type
                      </label>
                      <select>
                        <option>Select</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        Discount Amount
                      </label>
                      <input type="text" />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        Shipping Charge
                      </label>
                      <div className="toggle-container">
                        <div className="toggle-switch"></div>
                      </div>
                      <input type="text" />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        Round Off
                      </label>
                      <input
                        type="text"
                        value="0.00"
                        style={{ backgroundColor: "	#E0E0E0" }}
                      />
                    </div>

                    <div className="form-row">
                      <label style={{ fontSize: "13px", color: "black" }}>
                        Total
                      </label>
                      <input
                        type="text"
                        value="RS. 0.00"
                        style={{ backgroundColor: "	#E0E0E0" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="center-container">
                <div className="back-button">
                  <button className="back-btn" onClick={handleBackClick}>
                    Back
                  </button>
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                   <h1
                      style={{
                        fontSize:'14px',
                        fontFamily:'Inter',
                        fontWeight:'500',
                        color:'#707070'
                      }}  
                   >@2024 Virtue. All Rights Reserved.</h1>
            </div>
            </div>
          </div>
        ) : (
          // Main Page Section
          <>
            {/* Header Section */}
            <div className="header">
              <h2 className="header-title">Bills</h2>
              <button className="create-new-btn" onClick={handleCreateNewClick}>
                + Create New
              </button>
            </div>

            {/* Filter and Table Section */}
            <div className="container">
              <div className="filter-bar">
                {/* Filter Section */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="search-input-container">
                    <span className="search-icon">&#128269;</span>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="Estimate No., Customer Name"
                    />
                  </div>
                  <div className="date-input-container">
                    <span className="date-icon">&#x1F4C5;</span>
                    <input
                      type="text"
                      className="filter-date"
                      placeholder="Select Start Date"
                    />
                  </div>
                  <div className="date-input-container">
                    <span className="date-icon">&#x1F4C5;</span>
                    <input
                      type="text"
                      className="filter-date"
                      placeholder="Select End Date"
                    />
                  </div>
                  <button className="search-btn">Search</button>
                </div>
                <button className="clear-btn">Clear</button>
              </div>

              {/* Table Section */}
              <table className="estimates-table">
                <thead>
                  <tr>
                    <th>Bill No.</th>
                    <th>Payee/Vendor</th>
                    <th>Bill Date</th>
                    <th>Due Date</th>
                    <th>Total Tax</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td>001</td>
                      <td>3 Dec 2024</td>
                      <td>3 Dec 2024</td>
                      <td>Paras Virani</td>
                      <td>₹ 20.00</td>
                      <td>₹ 100.00</td>
                      <td className="action-icons">
                        <button title="Download">📥</button>
                        <button title="Edit">🖊️</button>
                        <button title="Delete">🗑️</button>
                        <button title="Email">📧</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </Page>
  );
};
