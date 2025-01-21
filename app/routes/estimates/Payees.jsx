
import React, { useState, useEffect } from "react";
import "./payees.css";

export const Payees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    mobile: "",
    displayName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    gstIn: "",
  });
  const [tableData, setTableData] = useState([]);
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTableData = localStorage.getItem("payees");
    if (savedTableData) {
      setTableData(JSON.parse(savedTableData));
    }
  }, []);

  // Save data to localStorage whenever tableData changes
  useEffect(() => {
    localStorage.setItem("payees", JSON.stringify(tableData));
  }, [tableData]);

  const handleCreateNewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      mobile: "",
      displayName: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      gstIn: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newTableData = [...tableData, formData];
    setTableData(newTableData);
    localStorage.setItem("payees", JSON.stringify(newTableData));
    handleCloseModal();
  };

  const handleSearchClick = () => {
    alert("Search button clicked");
  };

  return (
    <div className="payees-container">
      {/* Header */}
      <div className="header">
        <h2 className="header-title">Payees</h2>
        <button className="create-new-btn" onClick={handleCreateNewClick}>
          + Create New
        </button>
      </div>

      <div className="container">
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input"
            placeholder="First Name, Last Name, Email"
          />
          <button className="search-btn" onClick={handleSearchClick}>
            Search
          </button>
          <button className="clear-btn">Clear</button>
        </div>

        {/* Table section */}
        <table className="payees-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Mobile</th>
              <th>Display Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.email}</td>
                <td>{entry.company}</td>
                <td>{entry.mobile}</td>
                <td>{entry.displayName}</td>
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

      {/* Copy rights */}
      <div className="copy-rigths">
        <p>@2024 Virtue. All Rights Reserved.</p>
      </div>

      {/* Modal for "Create New Payee" */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                backgroundColor: "#74A535",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  color: "#fff",
                  marginBottom: "20px",
                  margin: "0",
                }}
              >
                Create New Payee
              </h3>
            </div>

            <form className="create-payee-form" onSubmit={handleSave}>
              <div>
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            
              <div>
                <label>Phone*</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Mobile*</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Display Name*</label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Enter display name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Street*</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Enter street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>GST IN</label>
                <input
                  type="text"
                  name="gstIn"
                  placeholder="Enter GST number"
                  value={formData.gstIn}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>City*</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>State*</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Pincode*</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
             
              <div className="modal-buttons">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
