import React, { useState } from "react";
import "./estimates.css";
import groupimage from "../../assets/images/Group@2x.png";
import { Card } from "@shopify/polaris";
export const Estimates = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    Customer: "",
    Estimateprefix: "",
    Estimatenum: "",
    estDate: "",
    ExpiryDate: "",
    TransportModel: "",
    SupplyDate: "",
    Status: "",
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

  const handleSearchClick = () => {
    alert("Search Button Clicked");
  };

  const handleClearClick = () => {
    alert("Clear Button Clicked");
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
  };

  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {" "}
      {isFormVisible ? (
        <div className="estimate-container">
          <div className="estimate-header">
            <div className="Etitle">
              <img src={groupimage} alt="Group Icon" />
              <span>Create New Bills</span>
            </div>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>

          <div className="estimate-detail">
            <Card>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ width: "100%" }}>
                  <label>
                    <h1
                      style={{
                        fontSize: "14px",
                        color: "black",
                        fontWeight: "normal",
                      }}
                    >
                      Customer <span style={{ color: "red" }}>*</span>
                    </h1>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        height: "26px",
                        borderRadius: "4px",
                      }}
                    />
                  </label>
                </div>

                <div style={{ display: "flex", marginTop: "30px" }}>
                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Estimate Prefix:</h1>
                      <input
                        type="text"
                        value={formData.Estimateprefix}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Estimateprefix: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Estimate Number:</h1>
                      <input
                        type="text"
                        value={formData.Estimatenum}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Estimatenum: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Estimate Date:</h1>
                      <input
                        type="date"
                        value={formData.estDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estDate: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div style={{ width: "100%" }} className="label1">
                    <label>
                      <h1 className="heading1">Expiry Date:</h1>
                      <input
                        type="date"
                        value={formData.ExpiryDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ExpiryDate: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Part2 */}
              <div style={{ display: "flex" }}>
                <div style={{ width: "100%" }} className="billing-date">
                  <label>
                    <h1 className="heading1">Transport Model:</h1>
                    <input
                      type="text"
                      value={formData.TransportModel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          TransportModel: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div style={{ width: "100%" }} className="billing-date">
                  <label>
                    <h1 className="heading1">Date of Supply:</h1>
                    <input
                      type="date"
                      value={formData.SupplyDate}
                      onChange={(e) =>
                        setFormData({ ...formData, SupplyDate: e.target.value })
                      }
                    />
                  </label>
                </div>

                <div style={{ width: "100%" }} className="pay-term">
                  <label>
                    <h1 className="heading1">Status:</h1>
                    <select
                      value={formData.Status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Status: e.target.value,
                        })
                      }
                    >
                      <option value="paid">Paid</option>
                      <option value="un">Unpaid</option>
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
                  backgroundColor:'#565656',
                  width: '100%',
                  height:'65px',
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  gap: "3px", // Adds consistent spacing between the fields
                }}
              >
                <h1 style={{ fontSize: "16px", color: "white", marginLeft:'10px' }}>
                  Discount Levels:
                </h1>

                <div>
                  <label
                    style={{
                      display: "block",
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
                    color: "white",
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

                  <div>
                    <input
                      type="text"
                      placeholder="Variant name"
                      style={{
                        width: "100%",
                        padding: "10px",
                        height: "30px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
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
                {/* <div style={{ marginTop: "20px" }}>
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
                </div> */}
              </div>
            </Card>
            {/* 3rd part  */}
            <div className="main">
              <div>
                <h1 className="main-title">Payment Terms:</h1>
                <textarea
                  className="custom-textarea"
                  defaultValue=" Validity:
                   Payments can be made via cash, credit/debit card, or UPI at the point of sale. Advance payments may be required for large orders.
                    Order Modifications:Modifications to offline orders are allowed within 24 hours of placing the order or before processing starts.
                    Pick-Up Policy: For self-pick-up orders, goods must be collected within 3 business days of notification. Unclaimed orders will be subject to cancellation without a refund after 7 days.
                    Warranty/Guarantee:Claims related to product defects must be reported within the specified warranty period."
                  //  placeholder="Type here..."
                />
              </div>

              <div className="invoice-container">
                <div className="invoice-form">
                  <div className="form-row">
                    <label style={{ fontSize: "13px", color: "black" }}>
                      Subtotal
                    </label>
                    <input type="text" style={{ backgroundColor: "	#E0E0E0" }} />
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  color: "#707070",
                }}
              >
                @2024 Virtue. All Rights Reserved.
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="estimates-container"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          {/* Header Section */}
          <div className="header">
            <h2 className="header-title">Estimates/Quotations</h2>
            <button className="create-new-btn" onClick={handleCreateNewClick}>
              + Create New
            </button>
          </div>

          {/* Table section */}

          <div className="container">
            {/* Filter Section */}
            <div className="filter-bar">
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="search-input-container">
                  <span className="search-icon">&#128269;</span>{" "}
                  {/* Unicode for search icon */}
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

                {/* End Date Input with Calendar Icon */}
                <div className="date-input-container">
                  <span className="date-icon">&#x1F4C5;</span>{" "}
                  {/* Calendar Icon */}
                  <input
                    type="text"
                    className="filter-date"
                    placeholder="Select End Date"
                  />
                </div>
                <button className="search-btn" onClick={handleSearchClick}>
                  Search
                </button>
              </div>
              <button className="clear-btn" onClick={handleClearClick}>
                Clear
              </button>
            </div>

            {/* Table Section */}
            <table className="estimates-table">
              <thead>
                <tr>
                  <th>Estimate No.</th>
                  <th>Estimate Date</th>
                  <th>Expiry Date</th>
                  <th>Customer Name</th>
                  <th>Total Tax</th>
                  <th>Total</th>
                  <th>Status</th>
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
                    <td>
                      <span
                        className={`status ${
                          index % 3 === 0
                            ? "paid"
                            : index % 3 === 1
                              ? "unpaid"
                              : "pending"
                        }`}
                      >
                        {index % 3 === 0
                          ? "Paid"
                          : index % 3 === 1
                            ? "Unpaid"
                            : "Pending"}
                      </span>
                    </td>
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

          <div className="copy-rigths">
            <p>@2024 Virtue. All Rights Reserved.</p>
          </div>
        </div>
      )}
    </div>
  );
};
