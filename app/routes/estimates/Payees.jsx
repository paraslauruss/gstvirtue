import React, { useState } from 'react';
import './payees.css';

export const Payees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Manually defined states
  const states = [
    "Andhra Pradesh",  "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa","Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh","Maharashtra",
    "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
    "West Bengal",  "Andaman and Nicobar Islands","Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir",
    "Ladakh","Lakshadweep","Puducherry"
  ];

  const handleCreateNewClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSearchClick = () => {
    alert("Search button clicked");
  };
  const handleClearClick = () => {
    alert('Clear the data ')
  }

  return (
    <div className='payees-container' >
      {/* Header */}
      <div className='header'>
        <h2 className='header-title'>Payees</h2>
        <button className="create-new-btn" onClick={handleCreateNewClick}>
          + Create New
        </button>
      </div>

      <div className='container'>
        <div className='filter-bar'>
          <div style={{display:'flex', gap:'13px'}}>
            <div className='search-input-container'>
            <span className="search-icon">&#128269;</span> 
              <input
                type='text'
                className='filter-input'
                placeholder='First Name, Last Name, Email'
              />
            </div>
          <button className="search-btn" onClick={handleSearchClick}>Search</button>
          </div>
          
          <button className='clear-btn' onClick={handleClearClick}>Clear</button>
        </div>

        {/* Table section */}
        <table className='payees-table'>
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
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>paras</td>
                <td>virani</td>
                <td>paras@gmail.com</td>
                <td>shrenath technology</td>
                <td>90331026432</td>
                <td>paras</td>
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
      <div className='copy-rigths'>
        <p>@2024 Virtue. All Rights Reserved.</p>
      </div>

      {/* Modal for "Create New Payee" */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <div className='modal-title'>   
                 <h3>Create New Payee</h3>
            </div>
            <form className='create-payee-form'>
              <div>
                <label>First Name*</label>
                <input type="text" placeholder="Enter first name" />
              </div>
              <div>
                <label>Last Name*</label>
                <input type="text" placeholder="Enter last name" />
              </div>
              <div>
                <label>Email*</label>
                <input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <label>Company Name</label>
                <input type="text" placeholder="Enter company name" />
              </div>
              <div>
                <label>Phone</label>
                <input type="text" placeholder="Enter phone number" />
              </div>
              <div>
                <label>Mobile*</label>
                <input type="text" placeholder="Enter mobile number" />
              </div>
              <div>
                <label>Display Name*</label>
                <input type="text" placeholder="Enter display name" />
              </div>
              <div>
                <label>Street*</label>
                <input type="text" placeholder="Enter street" />
              </div>
              <div>
                <label>City*</label>
                <input type="text" placeholder="Enter city" />
              </div>
              <div>
                <label>State*</label>
                <select>
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
                <input type="text" placeholder="Enter pincode" />
              </div>
              <div>
                <label>GST IN</label>
                <input type="text" placeholder="Enter GST number" />
              </div>
              <div className='modal-buttons'>
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
