
import React, { useState, useEffect } from "react";
import ic_delete from '../../assets/images/ic_delete.png';
import ic_edit from '../../assets/images/ic_edit.png';
import ic_warning from '../../assets/images/ic_warning.jpg';
import searchIcon from '../../assets/images/searchIcon.png';
import { useLoaderData } from "@remix-run/react";

export const Payees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    mobile: "",
    displayName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    gstIn: "",
  });
  const state = [
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

  const handleCreateNewClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
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

  const session = useLoaderData();

  const handleSave = async (e) => {
    e.preventDefault();

    try {
        let apiURL = 'http://localhost:3001/api/payees';
        let method = 'POST'; // Default to POST for creating
        let itemToEditId = null;  

        if (isEditing && editingIndex !== null && tableData[editingIndex]?._id) {
            itemToEditId = tableData[editingIndex]._id; 
            apiURL = `http://localhost:3001/api/payees/${itemToEditId}`;
            method = 'PUT';
            console.log("Editing Payee with ID:", itemToEditId);
        }

        // ✅ Define headers before using them
        const headers = {
            'Content-Type': 'application/json',
            'api-version': '2025-01',
            'store-name': session.storeName,
            'access-token': session.accessToken,
        };

        console.log("About to fetch:", apiURL, "with method", method);
        console.log("Headers:", headers);  // Debugging headers

        const response = await fetch(apiURL, {
            method: method,
            headers: headers, // ✅ Use the correctly defined headers
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const newPayee = await response.json();  
            
            // Fetch all payees to update UI
            const fetchResponse = await fetch('http://localhost:3001/api/payees', {
                headers: headers,  // ✅ Use headers here as well
            });

            if (fetchResponse.ok) {
                const fetchedPayees = await fetchResponse.json();
                setTableData(fetchedPayees);
                setFilteredData(fetchedPayees);
            } else {
                console.error('Failed to fetch payees:', fetchResponse.statusText);
                alert(`Failed to fetch payees: ${fetchResponse.statusText}`);
            }
            handleCloseModal();
        } else {
            console.error('Failed to save/update payee:', response.status, response.statusText, await response.text());
            alert(`Failed to save/update payee: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error saving/updating payee:', error);
        alert(`Error saving/updating payee: ${error.message}`);
    }
};
    useEffect(() => {
      const fetchPayees = async () => {
          try {
              const response = await fetch('http://localhost:3001/api/payees', {
                  headers: {
                      'Content-Type': 'application/json',
                      'api-version': '2025-01',
                      'store-name': session.storeName,
                      'access-token': session.accessToken,  // Replace with your actual token
                  }
              });
              if (response.ok) {
                  const data = await response.json();
                  setTableData(data);
                  setFilteredData(data);
              } else {
                  console.error('Failed to fetch payees:', response.statusText);
              }
          } catch (error) {
              console.error('Error fetching payees:', error);
          }
      };

      fetchPayees();
    }, []);

    useEffect(() => {
      if (searchQuery.trim() === "") {
          setFilteredData(tableData);
      }
    }, [tableData, searchQuery]);


    const handleEditClick = async (index) => {
      try {
          // Fetch all payees, then find the one to edit.
          const response = await fetch('http://localhost:3001/api/payees', {
              headers: {
                  'Content-Type': 'application/json',
                  'api-version': '2025-01',
                  'store-name': session.storeName,
                  'access-token': session.accessToken,  // Replace with your actual token
              }
          });
          if (!response.ok) {
              console.error('Failed to fetch payees:', response.statusText);
              alert(`Failed to fetch payees: ${response.statusText}`); // User notification
              return;
          }
          const data = await response.json();
          const entryToEdit = data[index];
          console.log("Entry To Edit:", entryToEdit);
          if (!entryToEdit) {
              console.warn("Payee at index not found.");
              alert("Payee at index not found."); // User notification
              return;
          }

          setFormData(entryToEdit);
          setIsEditing(true);
          setEditingIndex(index);
          setIsModalOpen(true); // Open modal for editing
      } catch (error) {
          console.error('Error fetching payees:', error);
          alert(`Error fetching payees: ${error.message}`); // User notification
      }
  };
  const handleSearchClick = () => {
    const filtered = tableData.filter((entry) =>
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredData(tableData);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // DELETE
  const [showPopup, setShowPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Function to handle opening the popup and setting the item to delete
  const openPopup = (itemId) => {
      setItemToDelete(itemId);
      setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
      setShowPopup(false);
      setItemToDelete(null);
  };

  const deleteItem = async () => {
    if (itemToDelete !== null && tableData[itemToDelete]) {
        try {
            const itemToDeleteId = tableData[itemToDelete]._id;

            if (!itemToDeleteId) {
                console.error("No ID found for item to delete");
                alert("Error: No ID found for item to delete");
                return;
            }

            if (!session || !session.storeName || !session.accessToken) {
                console.error("Session data is missing");
                alert("Error: Session data is missing");
                return;
            }

            const deleteUrl = `http://localhost:3001/api/payees/${itemToDeleteId}`;

            console.log("Deleting item with ID:", itemToDeleteId);

            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'api-version': '2025-01',
                    'store-name': session.storeName,
                    'access-token': session.accessToken,
                }
            });

            const result = await response.json(); // Get response body for errors

            if (response.ok) {
                console.log(`Deleted item with ID: ${itemToDeleteId}`);

                // Fetch updated payees list
                const fetchResponse = await fetch('http://localhost:3001/api/payees', {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-version': '2025-01',
                        'store-name': session.storeName,
                        'access-token': session.accessToken,
                    }
                });

                if (fetchResponse.ok) {
                    const data = await fetchResponse.json();
                    setTableData(data);
                    setFilteredData(data);
                } else {
                    console.error('Failed to fetch updated payees:', fetchResponse.statusText);
                    alert(`Failed to fetch updated payees: ${fetchResponse.statusText}`);
                }
            } else {
                console.error('Failed to delete item:', result.message || response.statusText);
                alert(`Failed to delete item: ${result.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert(`Error deleting item: ${error.message}`);
        }
    } else {
        console.warn("Invalid itemToDelete:", itemToDelete);
        alert("Invalid item selected for deletion");
    }

    if (typeof closePopup === "function") {
        closePopup();
    } else {
        console.warn("closePopup is not defined");
    }
};



  return (
    <div style={{ padding: "12px", backgroundColor: "#ffffff", borderRadius: "5px" }}>
    {/* Header */}
    <div style={{ marginTop: "10px", marginLeft: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px", fontFamily:'Inter' }}>Payees</h2>
      <button
        onClick={handleCreateNewClick}
        style={{
          backgroundColor: "#74a535",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#64b100")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#74a535")}
      >
        + Create New
      </button>
    </div>
  
    <div style={{ padding: "20px", backgroundColor: "#", borderRadius: "5px", border: '1px solid rgba(241, 241, 244, 1)', borderRadius:'5px',
     boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.03)'
     }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          width: "100%",
          borderBottom:'1px solid #ccc',
          paddingBottom:'25px'
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <div style={{ position: "relative", width: "45%", height: "33px" }}>
            <img
              src={searchIcon}
              alt="search"
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                width:'16px',
              }} />                   
                <input
                  type="text"
                  style={{
                    width: "100%",
                    height: "33px",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    padding: "10px 10px 10px 30px", // Add left padding to make space for the icon
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                  placeholder="First Name, Last Name, Email"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
          </div>
            <button onClick={handleSearchClick}           
                style={{
                backgroundColor: "#74a535",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#5c8e29")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#74a535")} >
                     Search
                </button>
              </div>
              <button onClick={handleClearSearch}
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "10px",
              }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#b3b3b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ccc")}>
                   Clear
              </button>
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'15px'}}>
          <select style={{width: '190px', height: '33px', padding: '4px', fontSize: '14px', fontFamily: 'Inter', backgroundColor: '#E8E8E8', border:'1px solid #ccc', borderRadius:'4px'}}>
                <option value=''>Result 50 per page</option>
                <option value='100'>Result 100 per page</option>
            </select>
            </div>
          {/* Table section */}
          <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
          }}>
          <thead>
            <tr>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>First Name</th>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Last Name</th>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Company</th>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Mobile</th>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Display Name</th>
              <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Action</th>
             </tr>
          </thead>
          <tbody >
            {filteredData.map((entry, index) => (
              <tr key={index} style={{ marginBottom: "10px" }}>
                <td style={{ padding: "12px" }}>{entry.firstName}</td>
                <td style={{ padding: "12px" }}>{entry.lastName}</td>
                <td style={{ padding: "12px" }}>{entry.email}</td>
                <td style={{ padding: "12px" }}>{entry.company}</td>
                <td style={{ padding: "12px" }}>{entry.mobile}</td>
                <td style={{ padding: "12px" }}>{entry.displayName}</td>
                <td className="action-icons" style={{ display: "flex", padding:'12px' }}>
                  <div>
                    <img
                      src={ic_delete}
                      alt="delete"
                      style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                      onClick={() => openPopup(1)} />    
                      {showPopup && (
                        <div style={{
                            position: "fixed",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                      }}>
                          <div style={{
                              backgroundColor: "white",
                              padding: "20px",
                              borderRadius: "8px",
                              textAlign: "center",
                              width: "300px",
                            }}>
                              <img
                                  src={ic_warning}
                                  alt="warning"
                                  style={{
                                    width: "73px",
                                    height: "70px",
                                    marginBottom: "20px",
                                  }}
                              />
                          <h3 style={{ fontSize: "16px", alignContent: "center", fontFamily: "Inter" }}>This can't be undone</h3>
                          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                            <button
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                              }} onClick={deleteItem}>
                                    Delete
                          </button>
                        <button
                            style={{
                              backgroundColor: "#C8C8C8",
                              color: "white",
                              padding: "10px 20px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "16px",
                            }} onClick={closePopup}>
                              Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                )}
                </div>
                  <img
                    src={ic_edit}
                    alt="edit"
                    style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                    onClick={() => handleEditClick(index)}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     
    {/* Copy rights */}
    <div className="copy-rigths" style={{ textAlign: "center", fontSize: "12px", marginTop: "20px", color: "#707070" }}>
      <p>@2024 Virtue. All Rights Reserved.</p>
    </div>
  
    {/* Modal for "Create New Payee" */}
    {isModalOpen && (
      <div
        className="modal-overlay"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
        <div
          className="modal-content"
          style={{
            background: "#fff",
            borderRadius: "5px",
            width: "50%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}>
          <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px",
              backgroundColor: "#74A535",
            }}>
            <h3
              style={{
                fontSize: "18px",
                fontFamily: "Inter",
                fontWeight: "500",
                color: "#fff",
              }}>
                Create New Payees
            </h3>
            <button style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingRight: "10px",
            }} onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <form className="create-payee-form"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              padding: "15px",
            }}
            onSubmit={handleSave}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>First Name<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* Add other fields here similarly */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Last Name<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* mail */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Email<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* Company */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Company Name<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="company"
                placeholder="Enter Company Name"
                value={formData.company}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* phone */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Phone<span style={{color:'red'}}>*</span></label>
              <input
                type="number"
                name="phone"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* Mobile */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Mobile Number<span style={{color:'red'}}>*</span></label>
              <input
                type="number"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* display */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Display Name<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="displayName"
                placeholder="Enter Display name"
                value={formData.displayName}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* street */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>Street<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="street"
                placeholder="Enter Street"
                value={formData.street}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* GST */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>GST IN<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="gstIn"
                placeholder="Enter GST"
                value={formData.gstIn}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* city */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>City<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* states */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>
                      States<span style={{ color: 'red' }}>*</span>
                  </label>
                  <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      style={{
                          padding: "8px 10px",
                          fontSize: "14px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                          cursor: "pointer"
                      }}>
                      <option value="" disabled>Select a state</option>
                      {state.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                      ))}
                  </select>
              </div>
            {/* pincde */}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>PinCode<span style={{color:'red'}}>*</span></label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter Pin Code"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          <div>
              <div style={{ display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <button style={{
                    fontSize: "16px",
                    fontFamily: "Inter",
                    backgroundColor: "#74A535",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 20px",
                    borderRadius: "5px",
                }}>
                  Save
                </button>
            </div>
            </div>
          </form>      
        </div>
      </div>
    )}
  </div>
  );
};