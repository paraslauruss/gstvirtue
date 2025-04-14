import React, { useState, useEffect, useCallback, useRef } from "react";
import groupimage from "../../assets/images/Group@2x.png";
import {
  Backdrop,
  Card,
  Checkbox,
  Divider,
  Scrollable,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import ic_email from '../../assets/images/ic_email.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import searchIcon from "../../assets/images/searchIcon.png";
import { useLoaderData } from "@remix-run/react";
import ic_date from '../../assets/images/ic_date.png';
import ic_edit from '../../assets/images/ic_edit.png';
import ic_info from '../../assets/images/ic_delete.png';
import ic_print from '../../assets/images/ic_print.png';
import ic_download from '../../assets/images/ic_download.png'
import ic_warning from '../../assets/images/ic_warning.jpg';
import RichTextEditor from "../orders/rich_text_editor";
import EstimateInvoice from "./Invoices/EstimateInvoice";


// customer add function
export function Dialog({ active, toggleModal, apiCallback }) {

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    name: "",
    defaultAddressPhone: "",
    address: "",
    apartmentSuit: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formValues.firstName) {
      newErrors.firstName = "Please fill in this field.";
    }
    if (!formValues.lastName) {
      newErrors.lastName = "Please fill in this field.";
    }

    if (!formValues.email) {
      newErrors.email = "Please fill in this field.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formValues.name) {
      newErrors.name = "Please fill in this field.";
    }
    if (!formValues.address) {
      newErrors.address = "Please fill in this field.";
    }
    if (!formValues.city) {
      newErrors.city = "Please fill in this field.";
    }
    if (!formValues.state) {
      newErrors.state = "Please fill in this field.";
    }
    if (!formValues.pincode) {
      newErrors.pincode = "Please fill in this field.";
    }
    console.log("Validation Errors:", newErrors); // This will be helpful for debugging
    return newErrors;
  };

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
  const fetcher = useFetcher();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const customers = useLoaderData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    // If errors exist, show alert and stop form submission
    if (Object.keys(errors).length > 0) {
      console.error("Validation failed:", errors);
      alert("Please fill in all required fields correctly.");
      return;
    }

    const requestData = {
      email: formValues.email,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      phone: formValues.phone,
      company_name: formValues.companyName,
      gst_number: formValues.gstNumber,
      addresses: [
        {
          address1: formValues.address,
          address2: formValues.apartmentSuit,
          city: formValues.city,
          province: formValues.state,
          country: "India",
          zip: formValues.pincode,
          phone: formValues.phone,
          name: formValues.name,
        }
      ]
    };

    try {
      const response = await fetch("http://localhost:3001/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "store-name": customers.storeName,
          "api-version": "2025-01",
          "access-token": customers.accessToken
        },
        body: JSON.stringify(requestData)
      });

      if (response.status !== 201) {
        const errorData = await response.json();
        const apiErrors = errorData.errors || {}; // Extracting errors from the response

        // Map errors from API to the state in a format you can use for display
        const formattedErrors = {};
        for (const [field, messages] of Object.entries(apiErrors)) {
          formattedErrors[field] = messages.join(" "); // Join multiple error messages into a single string
        }

        console.log("Formatted Errors : ", formattedErrors);

        setErrors(formattedErrors);  // Set API errors to state
        return;  // Don't proceed if the API returns an error
      }

      const responseData = await response.json();
      //console.log("✅ Customer created successfully:", response.data);
      //alert("Customer created successfully!");
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        gstNumber: "",
        name: "",
        defaultAddressPhone: "",
        address: "",
        apartmentSuit: "",
        city: "",
        state: "",
        pincode: "",
      });
      toggleModal();
      apiCallback(responseData.newCustomer);
      console.log("Response Data: ", responseData.newCustomer);
      // fetcher.load("/api/customers");
    } catch (error) {
      console.error("🚨 API Error:", error.message);
      // alert(`Error creating customer. Please try again. ${error.message}`);
      setErrors({ apiError: "Error creating customer. Please try again." });
    }
  };

  return (
    <div>
      {/* Backdrop */}
      {active && (
        <Backdrop
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
          onClick={toggleModal}  // Close modal if backdrop is clicked
        />
      )}

      {/* Custom Modal Card */}
      {active && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            zIndex: 9999,
            width: '60%',
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#74A535',
              padding: '15px 20px',
              borderRadius: '8px 8px 0px 0px',
            }}
          >
            <Text variant="headingLg">Create New Customer</Text>
            <div style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.5347 0.465273C18.9142 -0.15509 17.9083 -0.155091 17.2877 0.465273L10 7.75298L2.71229 0.465273C2.09174 -0.155091 1.08583 -0.155091 0.465273 0.465273C-0.155091 1.08582 -0.155091 2.09174 0.465273 2.71229L7.75298 10L0.465273 17.2877C-0.155091 17.9083 -0.15509 18.9142 0.465275 19.5347C1.08583 20.1551 2.09174 20.1551 2.71229 19.5347L10 12.247L17.2877 19.5347C17.9083 20.1551 18.9142 20.1551 19.5347 19.5347C20.1551 18.9142 20.1551 17.9083 19.5347 17.2877L12.247 10L19.5347 2.71229C20.1551 2.09174 20.1551 1.08583 19.5347 0.465273Z" fill="white" />
              </svg>
            </div>
          </div>
          <Scrollable scrollbarWidth="none" style={{ height: '620px' }}>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>First Name</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                    />
                    {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Last Name</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                    {errors.lastName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</p>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Email</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter email address"
                      value={formValues.email}
                      name="email"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Phone</span>

                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={formValues.phone}
                      name="phone"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Company Name</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      value={formValues.companyName}
                      name="companyName"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.companyName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.companyName}</p>}
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>GST Number</span>

                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter GST number"
                      value={formValues.gstNumber}
                      name="gstNumber"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
                <Text variant="headingMd" fontWeight="bold">Item Details</Text>
              </div>
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Name</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={formValues.name}
                      name="name"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Phone</span>

                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={formValues.defaultAddressPhone}
                      name="defaultAddressPhone"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Address</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter address"
                      value={formValues.address}
                      name="address"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.address && <p style={{ color: 'red', fontSize: '12px' }}>{errors.address}</p>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Apartment, suit etc.</span>

                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter apartment name"
                      value={formValues.apartmentSuit}
                      name="apartmentSuit"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>City</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={formValues.city}
                      name="city"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.city && <p style={{ color: 'red', fontSize: '12px' }}>{errors.city}</p>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', padding: '5px 20px' }}>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>State</span>

                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <select
                      name="state"
                      value={formValues.state}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        appearance: 'none',
                        position: 'relative',
                      }}>
                      <option value="">Select State</option> {/* Default option */}
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {/* <input
                                            type="text"
                                            placeholder="Select state"
                                            value={formValues.state}
                                            name="state"
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} /> */}
                    {errors.state && <p style={{ color: 'red', fontSize: '12px' }}>{errors.state}</p>}
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Pincode</span>
                    <span style={{ color: 'red' }}>*</span>
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={formValues.pincode}
                      name="pincode"
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }} />
                    {errors.pincode && <p style={{ color: 'red', fontSize: '12px' }}>{errors.pincode}</p>}
                  </div>
                </div>

              </div>
              <div style={{ margin: '0px 20px' }}>
                {errors.apiError && <p style={{ color: 'red', fontSize: '12px' }}>{errors.apiError}</p>}
              </div>

              <div style={{
                justifyContent: 'end', display: 'flex', padding: '20px'
              }}>

                <button
                  type="submit"
                  // className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{
                    cursor: 'pointer',
                    padding: '10px 30px', backgroundColor: '#74A535', border: 'none', borderRadius: '5px', color: 'white'
                  }}>Save</button>
              </div>
            </form>
          </Scrollable>

        </div>
      )}
    </div>
  );
}

// mail 
export function SendEmailInvoiceDialog({ active, toggleModal, selectedInvoice }) {
  const defaultEditorContent = `
           <div style="font-family: 'Inter', sans-serif; width: 100%; margin: 0 auto; background: #ffffff; padding: 20px;">
                <!-- Header Section -->
                <div style=" padding-bottom: 10px;">
                    <a href="https://admin.shopify.com/store/gst-paras/apps/gst-virtue/app" 
                    style="color:rgb(11, 13, 14); text-decoration: none; font-size: 18px; font-weight: bold;">
                    VirtueGst
                    </a>
                </div>

                <hr style="border: none; border-top: 3px solid #003366; width: 100%;" />

                <!-- Body Section -->
                <p style="font-size: 14px;">Hi <strong>{{customerName}}</strong>,</p>

                <h2 style="color: #333333;"><strong>Greetings From storeName</strong></h2>
                <p style="color: #555555; font-size: 14px;">
                    Thank you for contacting us.
                </p>

                <p style="font-size: 14px;">
                   Here is your estimate. Kindly Download from the link below..
                </p>

                <!-- Button Section (Left-Aligned) -->
                <div style="margin: 20px 0; text-align: left;">
                    <a href="YOUR_INVOICE_LINK" 
                    style="background: #74A545; color: #ffffff; padding: 12px 20px; text-decoration: none; 
                            font-weight: bold; border-radius: 5px; display: inline-block; font-size: 14px;">
                    Download Invoice
                    </a>
                </div>
                </div>
      `;
  const [editorContent, setEditorContent] = useState(defaultEditorContent);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [invoiceOption, setInvoiceOption] = useState('original');
  const [downloadOption, setDownloadOption] = useState('single-pdf');

  const storeName = "Gst Paras"; // Hardcoded store name

  useEffect(() => {
    if (selectedInvoice) {
      // Get customer details
      const customerName = selectedInvoice.Customer || selectedInvoice.customerName || 'N/A';
      const customerEmail = selectedInvoice.customerEmail || '';
      const invoiceLink = selectedInvoice.invoiceLink || '#';
      const estimateNumber = selectedInvoice.Estimatenum || selectedInvoice.estimate?.Estimatenum || 'N/A'; // Access Estimatenum
      //const estimateNumber = selectedInvoice.estimateNumber || 'N/A';

      // Perform all replacements in one go for efficiency and clarity
      let updatedEditorContent = defaultEditorContent
        .replace('{{customerName}}', customerName)
        .replace('storeName', storeName)

      setEditorContent(updatedEditorContent);
      setEmailTo(customerEmail);
      setEmailSubject(`Copy of Estimate Number ${estimateNumber} `);

      console.log("selectedInvoice:", selectedInvoice); // ADDED LOG
      console.log("customerName:", customerName);
      console.log("estimateNumber:", estimateNumber); // ADDED LOG

    } else {
      setEditorContent(defaultEditorContent);
      setEmailSubject('');
      setEmailTo('');
    }
  }, [selectedInvoice]);

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleInvoiceChange = (event) => {
    setInvoiceOption(event.target.value);
  };

  const handleDownloadChange = (event) => {
    setDownloadOption(event.target.value);
  };

  const handleSendEmail = async () => {
    setEmailStatus('Sending...'); // Indicate sending status

    const emailData = {
      to: emailTo,
      subject: emailSubject,
      content: editorContent,
    };
    console.log('email', emailData);
    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailStatus('Email sent successfully!');
        toggleModal();
      } else {
        setEmailStatus(`Error sending email: ${data.message}`);
        console.error('Error sending email:', data);
      }
    } catch (error) {
      setEmailStatus(`Error sending email: ${error.message}`);
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      {/* Backdrop */}
      {active && (
        <Backdrop
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
          onClick={toggleModal}  // Close modal if backdrop is clicked
        />
      )}
      {active && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            zIndex: 9999,
            width: '35%',
            borderRadius: '6px',
            paddingBottom: '20px'
          }}
        >
          <div
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#74A535',
              padding: '10px 20px',
              borderRadius: '6px 6px 0px 0px',
            }}
          >
            <Text variant="headingLg">Send Invoice Email</Text>
            <div style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.5347 0.465273C18.9142 -0.15509 17.9083 -0.155091 17.2877 0.465273L10 7.75298L2.71229 0.465273C2.09174 -0.155091 1.08583 -0.155091 0.465273 0.465273C-0.155091 1.08582 -0.155091 2.09174 0.465273 2.71229L7.75298 10L0.465273 17.2877C-0.155091 17.9083 -0.15509 18.9142 0.465275 19.5347C1.08583 20.1551 2.09174 20.1551 2.71229 19.5347L10 12.247L17.2877 19.5347C17.9083 20.1551 18.9142 20.1551 19.5347 19.5347C20.1551 18.9142 20.1551 17.9083 19.5347 17.2877L12.247 10L19.5347 2.71229C20.1551 2.09174 20.1551 1.08583 19.5347 0.465273Z" fill="white" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
            <h1 style={{ fontFamily: 'Inter', fontSize: '14px', color: '#000', marginBottom: '5px' }}>Subject :</h1>
            <input
              placeholder="Copy of Estimate Number Estimate_Number "
              style={{
                width: '100%',
                height: '33px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '7px'
              }}
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
            <h1 style={{ fontFamily: 'Inter', fontSize: '14px', color: '#000', marginBottom: '5px' }}>To:</h1>
            <input
              placeholder="Customer Email"
              style={{
                width: '100%',
                height: '33px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '7px'
              }}
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
            <Text as="p" fontWeight="regular">
              Content
            </Text>
            <div>
              <RichTextEditor
                text={editorContent}
                onChange={handleEditorChange}
              />
            </div>
          </div>

          <div style={{ fontSize: '12px', marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
            <span style={{ color: 'red', fontWeight: 'bold', paddingRight: '5px' }}>Note:</span>
            Do Not Remove the <span style={{ fontWeight: 'bold' }}>"Customer_Name"</span> and
            <span style={{ fontWeight: 'bold' }}> "Estimate_Number"</span>. These will be replaced with dynamic values of the invoice.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'center', marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
            <button
              style={{
                width: '90px',
                height: '33px',
                backgroundColor: '#74A535',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#fff',
                fontFamily: 'Inter',
                cursor: 'pointer'
              }}
              onClick={handleSendEmail}
            >Send</button>
          </div>

        </div>
      )}
    </div>
  );
}



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
    total: 0,
    totalTax: 0,
    rate: 0,
    qty: 1,
    amount: 0,
    subtotal: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    cessAmount: 0,
  });

  const session = useLoaderData();

  const [isToggled, setIsToggled] = useState(false);

  const handleCreateNewClick = () => {
    setIsFormVisible(true);
  };

  const handleImageClick = () => {
    setIsFormVisible(!isFormVisible); // Toggle the visibility
  };

  //  estimate date
  const [estimateDate, setEstimateDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleEstimateDate = (date) => {
    setEstimateDate(date);
    setFormData({ ...formData, estDate: date ? date.toISOString().split('T')[0] : null });
    setIsOpen(false);
  };
  // supply date
  const [supplyDate, setSupplyDate] = useState(null);
  const [isSupplyOpne, setIsSupplyOpen] = useState(false);
  const handleSupplyDate = (date) => {
    setSupplyDate(date);
    setIsSupplyOpen(false);
  }
  //expiry date
  const [expiryDate, setExpiryDate] = useState(null);
  const [isExpiryDateOpen, setIsExpiryDateOpen] = useState(false);
  const handleExpiryDate = (date) => {
    setExpiryDate(date);
    setFormData({ ...formData, ExpiryDate: date ? date.toISOString().split('T')[0] : null });
    setIsExpiryDateOpen(false);
  }

  //product suggestion
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchProducts = async () => {
        if (query.length >= 2) {
          setLoading(true);
          setError("");
          try {
            // Fetch suggestions
            const suggestionResponse = await fetch("http://localhost:3001/api/products", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "store-name": session.storeName,
                "api-version": "2025-01",
                "access-token": session.accessToken,
              },
            });

            if (!suggestionResponse.ok) {
              throw new Error(`HTTP error! Status: ${suggestionResponse.status}`);
            }

            const suggestionData = await suggestionResponse.json();

            if (!Array.isArray(suggestionData)) {
              throw new Error("Invalid response format: Expected an array");
            }

            const filteredSuggestions = suggestionData.filter((product) =>
              product.title.toLowerCase().includes(query.toLowerCase())
            );

            setSuggestions(filteredSuggestions);
            setShowDropdown(filteredSuggestions.length > 0);

            // Find selected product
            const selected = filteredSuggestions.find(
              (product) => product.title.toLowerCase() === query.toLowerCase()
            );

          // console.log("Shopify ID: ", selected.id);
            if (selected) {
              const detailsResponse = await fetch(
                `http://localhost:3001/api/products/${selected.id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "store-name": session.storeName,
                    "api-version": "2025-01",
                    "access-token": session.accessToken,
                  },
                }
              );

              if (!detailsResponse.ok) {
                throw new Error(`HTTP error! Status: ${detailsResponse.status}`);
              }

              const productDetails = await detailsResponse.json();
              setSelectedProduct(productDetails);
            } else {
              setSelectedProduct(null);
            }
          } catch (err) {
            console.error("Error fetching products:", err);
            setError("Error fetching products");
            setShowDropdown(false);
            setSelectedProduct(null);
          } finally {
            setLoading(false);
          }
        } else {
          setSuggestions([]);
          setShowDropdown(false);
          setSelectedProduct(null);
        }
      };
      fetchProducts();
    }, [query]);

    // Handle selection for main search input
    const handleSelectMain = async (title) => {
      setQuery(title); // Set the title in the input field
      setShowDropdown(false); // Hide the dropdown
    
      const selected = suggestions.find((p) => p.title === title);
    
      if (selected) {
        setSelectedProduct(selected); // Optional: for displaying product details
    
        // Add selected product to `inputs` array (not directly in formData)
        setInputs((prevInputs) => [
          ...prevInputs,
          {
            query: title, // Store the title
            selectedProduct: selected, // Store the whole product object
            hsn: selected.hsn,
            gst: selected.gst,
            cess: selected.cess,
          }
        ]);
      }
    };

    //ADD INPUT
    const [inputs, setInputs] = useState([]);
    // Add new input field
    const addInputField = () => {
      setInputs([
        ...inputs,
        {
          id: Date.now(), query: "", suggestions: [], showDropdown: false, selectedProduct: null,
          hsn: "",
          gst: "",
          cess: ""
        },
      ]);
    };
    // Remove input field
    const removeInputField = (id) => {
      setInputs(inputs.filter((input) => input.id !== id));
    };

    // Handle input change for dynamic fields
    const handleInputChange = async (id, value) => {
      setInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id
            ? {
              ...input,
              query: value,
              showDropdown: value.length >= 2,
              ...(value === "" ? { hsn: "", gst: "", cess: "", selectedProduct: null } : {})
            }
            : input
        )
      );

      if (value.length >= 2) {
        try {
          const response = await fetch("http://localhost:3001/api/products", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "store-name": session.storeName,
              "api-version": "2025-01",
              "access-token": session.accessToken,
            },
          });

          const data = await response.json();
          console.log("API Response:", data); // Debugging step

          if (Array.isArray(data)) {
            const filteredSuggestions = data.filter((product) =>
              product.title.toLowerCase().includes(value.toLowerCase())
            );

            console.log("Filtered Suggestions:", filteredSuggestions); // Debugging step

            setInputs((prevInputs) =>
              prevInputs.map((input) =>
                input.id === id
                  ? { ...input, suggestions: filteredSuggestions, showDropdown: filteredSuggestions.length > 0 }
                  : input
              )
            );
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.id === id ? { ...input, suggestions: [], showDropdown: false } : input
          )
        );
      }
    };

    const handleSelect = (id, title, productDetails) => {
      setInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id ? {
            ...input, query: title, showDropdown: false,
            selectedProduct: productDetails,
            hsn: productDetails.hsn || "",
            gst: productDetails.gst || "",
            cess: productDetails.cess || ""
          } : input
        )
      );
    };

  // CALCULARIONS
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [cessAmount, setCessAmount] = useState(0);
  const [discountType, setDiscountType] = useState('select');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [shippingGstPercent, setShippingGstPercent] = useState(0);
  const [shippingGstAmount, setShippingGstAmount] = useState(0);
  const [roundOff, setRoundOff] = useState(0.00);
  const [total, setTotal] = useState(0);

  const calculateGstAmount = (amount, gst) => {
    const gstAmount = (amount * gst) / 100;
    return gstAmount;
  };

  // useEffect to perform calculations when selectedProduct or qty changes
  useEffect(() => {
    if (selectedProduct) {
      console.log("selectedProduct:", selectedProduct); // Debugging

      const productPrice = parseFloat(selectedProduct.price) || 0;
      setRate(productPrice);
      setAmount(productPrice);

      let updatedSubtotal = 0;

      if (qty === 1) {
        updatedSubtotal = productPrice;
      } else {
        updatedSubtotal = parseFloat(selectedProduct.apiSubtotal) || 0;
      }

      setSubtotal(updatedSubtotal);
      console.log("Updated Subtotal:", updatedSubtotal);

      // Get GST and Cess rates
      const gst = parseFloat(selectedProduct.gst) || 0;
      const cess = parseFloat(selectedProduct.cess) || 0;
      const cgst = gst / 2;
      const sgst = gst / 2;

      // ✅ Call `calculateGstAmount` only **after** `subtotal` is updated
      const calculatedCgstAmount = calculateGstAmount(updatedSubtotal, cgst);
      const calculatedSgstAmount = calculateGstAmount(updatedSubtotal, sgst);
      const calculatedCessAmount = calculateGstAmount(updatedSubtotal, cess);

      // ✅ Update state
      setCgstAmount(calculatedCgstAmount);
      setSgstAmount(calculatedSgstAmount);
      setCessAmount(calculatedCessAmount);

      console.log("GST and cess calculations:", {
        gst,
        cess,
        cgst,
        sgst,
        calculatedCgstAmount,
        calculatedSgstAmount,
        calculatedCessAmount,
      });
    }
  }, [selectedProduct, qty]);

  // Function to calculate total   
  const calculateTotal = useCallback(() => {
    let calculatedTotal = subtotal + cgstAmount + sgstAmount + cessAmount;

    // Apply discount
    if (discountType === 'percent') {
      calculatedTotal -= (subtotal * discountAmount) / 100;
    } else if (discountType === 'flat') {
      calculatedTotal -= discountAmount;
    }

    // Add shipping charge if toggled on
    if (isToggled) {
      calculatedTotal += shippingCharge + shippingGstAmount;
    }

    calculatedTotal += roundOff;

    return calculatedTotal.toFixed(2);
  }, [subtotal, cgstAmount, sgstAmount, cessAmount, discountType, discountAmount, isToggled, shippingCharge, shippingGstAmount, roundOff]);

  // Update total whenever relevant state changes
  useEffect(() => {
    setTotal(calculateTotal());
    setFormData(prevFormData => ({
      ...prevFormData,
      rate: rate,
      qty: qty,
      amount: amount,
      subtotal: subtotal,
      cgstAmount: cgstAmount,
      sgstAmount: sgstAmount,
      cessAmount: cessAmount,
      discountType: discountType,
      discountAmount: discountAmount,
      shippingCharge: shippingCharge,
      shippingGstPercent: shippingGstPercent,
      shippingGstAmount: shippingGstAmount,
      roundOff: roundOff,
      totalTax: cgstAmount + sgstAmount,
      total: parseFloat(calculateTotal()),
    }));
  }, [subtotal, cgstAmount, sgstAmount, discountType, discountAmount, isToggled, shippingCharge, shippingGstAmount, roundOff]);

  // Handle Quantity change
  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    setQty(isNaN(newQty) ? 1 : newQty);
  };

  // Handle Discount Type change
  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  // Handle Discount Amount change
  const handleDiscountAmountChange = (e) => {
    const newDiscountAmount = parseFloat(e.target.value);
    setDiscountAmount(isNaN(newDiscountAmount) ? 0 : newDiscountAmount);
  };

  // Handle Shipping Charge change
  const handleShippingChargeChange = (e) => {
    const newShippingCharge = parseFloat(e.target.value);
    setShippingCharge(isNaN(newShippingCharge) ? 0 : newShippingCharge);
  };

  // Handle Shipping GST Percent change
  const handleShippingGstPercentChange = (e) => {
    const newShippingGstPercent = parseFloat(e.target.value);
    setShippingGstPercent(isNaN(newShippingGstPercent) ? 0 : newShippingGstPercent);
    // Calculate shipping GST amount
    const calculatedShippingGstAmount = calculateGstAmount(shippingCharge, newShippingGstPercent);
    setShippingGstAmount(calculatedShippingGstAmount);
  };

  // Handle Round Off change
  const handleRoundOffChange = (e) => {
    const newRoundOff = parseFloat(e.target.value);
    setRoundOff(isNaN(newRoundOff) ? 0 : newRoundOff);
  };

  // customer nam save
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showAddNew, setShowAddNew] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const customers = useLoaderData();

  const [customerName, setCustomerName] = useState(""); // Add this line
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);

  const handleSearchChange = async (value) => {
    setSearchQuery(value);
    setCustomerName(value);
    setDropdownVisible(true);
    setIsCustomerSelected(false);

    const response = await fetch(`http://localhost:3001/api/customers?search=${value}`, {
      headers: {
        "Content-Type": "application/json",
        "store-name": customers.storeName,
        "api-version": "2025-01",
        "access-token": customers.accessToken
      },
    });

    const responseData = await response.json();
    console.log("Search Result: ", responseData);
    setSearchResults(responseData);
  };

  const handleOptionSelect = (customer) => {
    //alert(`You selected: ${customer.first_name}`);
    setSelectedCustomer(customer);
    if (customer && customer.first_name && customer.last_name) {
      const customerName = `${customer.first_name} ${customer.last_name}`;
      setCustomerName(customerName);
      setFormData(prevFormData => ({
        ...prevFormData,
        Customer: customerName,
      }));
      setDropdownVisible(false);
      setShowAddNew(false);
      setSearchQuery("");
      setIsCustomerSelected(true);
    };
  }
  const [active, setActive] = useState(false);
  const toggleModal = () => {
    setActive((prev) => !prev); // Toggle the Dialog's visibility
  };
  const handleFocus = () => {
    setShowAddNew(true); // Show Add New button when focused
  };
  const handleApiCallback = async (responseData) => {
    const response = await fetch("http://localhost:3001/api/customers", {
      headers: {
        "store-name": customers.storeName,
        "api-version": "2025-01",
        "access-token": customers.accessToken,
      },
    });
    const data = await response.json();
    customers.customers = data
    setSelectedCustomer(responseData);
  }
  const [editDialog, setEditDialog] = useState(false);
  const editDialogToggle = () => {
    setEditDialog((prev) => !prev);
  }
  // Edit Shipping Address
  const [editShippingDialog, setEditShippingDialog] = useState(false);
  const editShippingDialogToggle = () => {
    setEditShippingDialog((prev) => !prev);
  }

  // SAVE DATA BACKEND
  const [estimate, setEstimate] = useState([]);
  const [filteredEstimate, setFilteredEstimate] = useState([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [apiURL, setApiURL] = useState('http://localhost:3001/api/estimate'); // Check this, this can stop all functions from properly working
  const [method, setMethod] = useState("POST");

  const handleSave = async () => {
    try {
      let apiURL = 'http://localhost:3001/api/estimate';
      let method = 'POST';
      let itemToEditId = null;

      const itemsArray = inputs.map((input) => ({
        title: input.query,
        hsn: input.hsn,
        gst: input.gst,
        cess: input.cess,
      }));
  
      const updatedFormData = {
        ...formData,
        items: itemsArray, 
      };

      if (isEditing && editIndex !== null && filteredEstimate[editIndex] && filteredEstimate[editIndex]._id) {
        itemToEditId = filteredEstimate[editIndex]._id;
        apiURL = `http://localhost:3001/api/estimate/${itemToEditId}`;
        method = 'PUT';
        console.log("Editing Estimate with ID:", itemToEditId);
      } else {
        console.log("Creating new Estimate.");
      }
      console.log("Saving estimate to", apiURL, "with method", method, "data:", updatedFormData); // Log the data!

      const headers = {
        'Content-Type': 'application/json',
        'api-version': '2025-01',
        'store-name': session.storeName,
        'access-token': session.accessToken,
      };

      //console.log("Form Data :" ,JSON.stringify(formData));

      const response = await fetch(apiURL, {
        method: method,
        headers: headers,
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const newEstimate = await response.json();
        console.log("Save successful, response:", newEstimate);

        // Fetch updated list after save
        const fetchResponse = await fetch('http://localhost:3001/api/estimate', {
          headers: {
            'Content-Type': 'application/json',
            'api-version': '2025-01',
            'store-name': session.storeName,
            'access-token': session.accessToken,
          }
        });

        if (fetchResponse.ok) {
          const updatedEstimate = await fetchResponse.json();
          setEstimate(updatedEstimate);
          setFilteredEstimate(updatedEstimate);
        } else {
          console.error('Failed to fetch updated estimates:', fetchResponse.statusText);
          alert(`Failed to fetch updated estimates: ${fetchResponse.statusText}`);
        }

        resetForm();
        setIsEditing(false);
        setEditIndex(null);
        setShowSavePopup(true);
        setIsFormVisible(false);
        setTimeout(() => {
          setIsFormVisible(false)
          setShowSavePopup(false);
        }, 2000);
      } else {
        console.error('Failed to save/update estimate:', response.status, response.statusText, await response.text());
        alert(`Failed to save/update estimate: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error saving/updating estimate:', error);
      alert(`Error saving/updating estimate: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
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
      total: 0,
      totalTax: 0,
    });
    setEstimateDate(null);
    setExpiryDate(null);
    setFilteredEstimate([]);
  };
  // useEffect hook to load bills from localStorage on component mount
  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/estimate', {
          headers: {
            'Content-Type': 'application/json',
            'api-version': '2025-01',
            'store-name': session.storeName,
            'access-token': session.accessToken,
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEstimate(data);
          setFilteredEstimate(data);
        } else {
          console.error('Failed to fetch bills:', response.statusText);
          alert(`Failed to fetch bills: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching bills:', error);
        alert(`Error fetching bills: ${error.message}`);
      }
    };

    fetchEstimate();
  }, [isFormVisible, session]);

  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const handleStartDateChange = (date) => {
    setDate(date);
    setIsDatePickerOpen(false);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setIsEndDatePickerOpen(false);
  };
  // SEARCH FILTER 
  const [searchName, setSearchName] = useState("");
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  // Function to clear input fields and reset data to original expenses
  const handleClearClick = () => {
    setSearchName('');
    setDate(null);
    setEndDate(null);
    setFilteredEstimate(estimate);
  };

  const isValidDate = (dateString) => {
    return !isNaN(new Date(dateString));
  };
  const handleSearchClick = () => {
    let filteredData = [...estimate];

    // Filter by customerName
    if (searchName) {
      filteredData = filteredData.filter(bill =>
        bill.Customer.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Date validation
    if (date && endDate) {
      filteredData = filteredData.filter(bill => {
        const estimateDate = bill.estDate ? new Date(bill.estDate) : null;
        const estimateExpiryDate = bill.ExpiryDate ? new Date(bill.ExpiryDate) : null;

        if (!isValidDate(bill.estDate)) {
          console.warn(`Invalid billDate found: ${bill.estDate}. Skipping date filtering for this bill.`);
          return true;
        }
        if (!isValidDate(bill.ExpiryDate)) {
          console.warn(`Invalid expiryDate found: ${bill.ExpiryDate}. Skipping date filtering for this bill.`);
          return true;
        }
        const startDateTime = date.getTime();
        const endDateTime = endDate.getTime();
        if (estimateDate && estimateExpiryDate) {
          const estimateDateTime = estimateDate.getTime();
          const expiryDateTime = estimateExpiryDate.getTime();

          return (
            estimateDateTime >= startDateTime &&
            estimateDateTime <= endDateTime &&
            expiryDateTime >= startDateTime &&
            expiryDateTime <= endDateTime
          );
        }
        return false;
      });
    }
    setFilteredEstimate(filteredData);
  };

  // EDIT ICON
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const handleEditClick = (index) => {
    setEditIndex(index);
    setIsFormVisible(true);

    const estimateToEdit = filteredEstimate[index];

    if (estimateToEdit) {
      setEditIndex(index);
      setIsEditing(true);
      setIsFormVisible(true);

      setFormData({
        ...estimateToEdit,
      });

      // Correct date parsing and setting
      try {
        const estDate = estimateToEdit.estDate ? new Date(estimateToEdit.estDate) : null;
        const expiryDate = estimateToEdit.ExpiryDate ? new Date(estimateToEdit.ExpiryDate) : null;

        setEstimateDate(estDate);
        setExpiryDate(expiryDate);
        setDate(estDate)
        setEndDate(expiryDate)
      } catch (error) {
        console.error("Error parsing dates:", error);
        setEstimateDate(null);
        setExpiryDate(null);
        setDate(null);
        setEndDate(null);
      }
      setTotal(estimateToEdit.total);
      setCgstAmount(estimateToEdit.totalTax);
      setSgstAmount(estimateToEdit.totalTax);

      // **Manually trigger recalculations after loading data**
      setQty(estimateToEdit.qty) // Assuming you have qty property
      setRate(estimateToEdit.rate)
      //Recalculate the totals
    } else {
      console.warn(`Estimate at index ${index} not found.`);
    }
  };
  //   DELTE THE ENTRY
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const handleDeleteClick = (index) => {
    setExpenseToDelete(index);
    setShowDeletePopup(true);
  };
  const handleConfirmDelete = async () => {
    if (expenseToDelete === null || expenseToDelete >= filteredEstimate.length) {
      console.error("Invalid expenseToDelete index:", expenseToDelete);
      alert("Invalid expense selection. Please try again.");
      return;
    }
    try {
      // ✅ Ensure that `_id` exists
      const itemToDelete = filteredEstimate[expenseToDelete];
      if (!itemToDelete || !itemToDelete._id) {
        console.error("Item to delete not found or missing _id:", itemToDelete);
        alert("Error: Item to delete not found.");
        return;
      }

      const itemToDeleteId = itemToDelete._id;
      const deleteUrl = `http://localhost:3001/api/estimate/${itemToDeleteId}`;

      console.log(`Attempting to delete item with ID: ${itemToDeleteId}`);
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'api-version': '2025-01',
          'store-name': session.storeName,
          'access-token': session.accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.statusText}`);
      }

      console.log(`Successfully deleted item with ID: ${itemToDeleteId}`);

      // ✅ Fetch updated list after deletion
      const fetchResponse = await fetch('http://localhost:3001/api/estimate', {
        headers: {
          'Content-Type': 'application/json',
          'api-version': '2025-01',
          'store-name': session.storeName,
          'access-token': session.accessToken,
        }
      });

      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch updated bills: ${fetchResponse.statusText}`);
      }

      const updatedEstimate = await fetchResponse.json();
      setEstimate(updatedEstimate);
      setFilteredEstimate(updatedEstimate);

    } catch (error) {
      console.error("Error deleting item:", error);
      alert(`Error deleting item: ${error.message}`);
    } finally {
      setShowDeletePopup(false);
    }
  };
  // mail 
  const [emailActive, setEmailActive] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const openEmailModal = (invoice) => {
    setSelectedInvoice(invoice);
    setEmailActive(true);
  };

  // Function to close the email modal
  const closeEmailModal = () => {
    setSelectedInvoice(null);
    setEmailActive(false);
  };

  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = isNaN(date.getTime()) ? new Date().toLocaleDateString('en-GB', options) : date.toLocaleDateString('en-GB', options);;
    return formattedDate;
}

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
      {isFormVisible ? (
        // Form View
        <div
          style={{
            width: "80%",
            maxWidth: "1200px",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "10px",
              marginTop: "35px",
            }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={groupimage}
                alt="Group Icon"
                onClick={handleImageClick}
                style={{ width: "22px", height: "22px", marginRight: "8px", cursor: 'pointer' }}
              />
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Create New Estimates/Quotations
              </span>
            </div>
            <div>
              <button
                style={{
                  width: "100px",
                  height: "33px",
                  backgroundColor: "#5c8e29",
                  color: "white",
                  fontSize: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleSave}>
                Save
              </button>
            </div>
            {showSavePopup &&  (
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              }}> 
                Data Saved!
              </div>
            )}
          </div>


          {/* Estimate Details */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{border:'1px solid #ccc', borderRadius:'5px', padding:'12px 12px'}}>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ width: "100%" }}>
                  <span style={{ fontWeight: "bold" }}>Customer</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div ref={dropdownRef} style={{ marginTop: "15px" }}>
                  <TextField
                    placeholder="Search a Customer..."
                    value={isCustomerSelected ? customerName : searchQuery}
                    autoComplete="off"
                    onChange={handleSearchChange}
                    onFocus={handleFocus}
                    prefix={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={searchIcon} style={{ height: "15px" }} />
                      </div>
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      zIndex: 1000,
                      left: 20,
                      right: 20,
                      overflowY: "auto",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >

                    {dropdownVisible && searchResults.length > 0 && (
                      <div>
                        {searchResults.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#f9f9f9")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "#fff")
                            }
                          >
                            <span style={{ fontSize: "14px" }}>{option.first_name} {option.last_name}</span>
                          </div>
                        ))}
                      </div>
                    )}


                    {showAddNew && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#74A535",
                          color: "#ffffff",
                          padding: "5px",
                          width: "130px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "10px",
                          marginBottom: "10px",
                          marginLeft: "10px",
                        }}
                        onClick={toggleModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                        >
                          <path
                            d="M12.0714 7.42857H7.42857V12.0714C7.42857 12.3177 7.33074 12.5539 7.1566 12.728C6.98246 12.9022 6.74627 13 6.5 13C6.25373 13 6.01754 12.9022 5.8434 12.728C5.66926 12.5539 5.57143 12.3177 5.57143 12.0714V7.42857H0.928571C0.682299 7.42857 0.446113 7.33074 0.271972 7.1566C0.0978315 6.98246 0 6.74627 0 6.5C0 6.25373 0.0978315 6.01754 0.271972 5.8434C0.446113 5.66926 0.682299 5.57143 0.928571 5.57143H5.57143V0.928571C5.57143 0.682299 5.66926 0.446113 5.8434 0.271972C6.01754 0.0978311 6.25373 0 6.5 0C6.74627 0 6.98246 0.0978311 7.1566 0.271972C7.33074 0.446113 7.42857 0.682299 7.42857 0.928571V5.57143H12.0714C12.3177 5.57143 12.5539 5.66926 12.728 5.8434C12.9022 6.01754 13 6.25373 13 6.5C13 6.74627 12.9022 6.98246 12.728 7.1566C12.5539 7.33074 12.3177 7.42857 12.0714 7.42857Z"
                            fill="white"
                          />
                        </svg>
                        <div style={{ marginLeft: "10px" }}>
                          <Text>Add New</Text>
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedCustomer.default_address && <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '50px' }}>
                      <div style={{
                        backgroundColor: 'white', width: '100%', border: '1px solid #ccc', borderRadius: '5px'
                      }}>
                        <div style={{
                          backgroundColor: '#565656',
                          color: 'white',
                          padding: '10px 20px',
                          borderTopLeftRadius: '5px',
                          borderTopRightRadius: '5px',
                          overflow: 'hidden',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <div>Billing Address</div>
                          <div style={{ cursor: 'pointer' }} onClick={editDialogToggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                              <path d="M13.475 3.40783L15.592 5.52483M14.836 1.54283L9.109 7.26983C8.81221 7.56467 8.61024 7.94144 8.529 8.35183L8 10.9998L10.648 10.4698C11.058 10.3878 11.434 10.1868 11.73 9.89083L17.457 4.16383C17.6291 3.99173 17.7656 3.78742 17.8588 3.56256C17.9519 3.33771 17.9998 3.09671 17.9998 2.85333C17.9998 2.60994 17.9519 2.36895 17.8588 2.14409C17.7656 1.91923 17.6291 1.71492 17.457 1.54283C17.2849 1.37073 17.0806 1.23421 16.8557 1.14108C16.6309 1.04794 16.3899 1 16.1465 1C15.9031 1 15.6621 1.04794 15.4373 1.14108C15.2124 1.23421 15.0081 1.37073 14.836 1.54283Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16 13V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>

                        </div>
                        <div style={{ padding: '10px 20px', }}>
                          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {selectedCustomer.default_address.name}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.default_address.address1}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.default_address.address2}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.default_address.city}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.default_address.province}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.default_address.country}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        backgroundColor: 'white', width: '100%', border: '1px solid #ccc', borderRadius: '5px'
                      }}>
                        <div style={{
                          backgroundColor: '#565656',
                          color: 'white',
                          padding: '10px 20px',
                          borderTopLeftRadius: '5px',
                          borderTopRightRadius: '5px',
                          overflow: 'hidden',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          justifyContent: 'space-between',
                          display: 'flex',

                        }}>
                          <div>Shipping Address</div>

                          <div style={{ cursor: 'pointer' }} onClick={editShippingDialogToggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                              <path d="M13.475 3.40783L15.592 5.52483M14.836 1.54283L9.109 7.26983C8.81221 7.56467 8.61024 7.94144 8.529 8.35183L8 10.9998L10.648 10.4698C11.058 10.3878 11.434 10.1868 11.73 9.89083L17.457 4.16383C17.6291 3.99173 17.7656 3.78742 17.8588 3.56256C17.9519 3.33771 17.9998 3.09671 17.9998 2.85333C17.9998 2.60994 17.9519 2.36895 17.8588 2.14409C17.7656 1.91923 17.6291 1.71492 17.457 1.54283C17.2849 1.37073 17.0806 1.23421 16.8557 1.14108C16.6309 1.04794 16.3899 1 16.1465 1C15.9031 1 15.6621 1.04794 15.4373 1.14108C15.2124 1.23421 15.0081 1.37073 14.836 1.54283Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16 13V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div style={{ padding: '10px 20px', }}>
                          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {selectedCustomer.shipping_address.name}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.shipping_address.address1}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.shipping_address.address2}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.shipping_address.city}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.shipping_address.province}
                          </div>
                          <div style={{ fontSize: '14px', marginTop: '10px' }}>
                            {selectedCustomer.shipping_address.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Divider />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "30px", flexWrap: "wrap" }}>
                  {/* prefix */}
                  <div style={{ width: "48%", marginBottom: "10px", marginRight: '20px' }}>
                    <label>
                      <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px", }}>
                        Estimate Prefix
                      </h1>
                      <input
                        type="text"
                        value={formData.Estimateprefix}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Estimateprefix: e.target.value,
                          })
                        }
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                          width: "100%",
                          height: "30px",
                          backgroundColor: "#F0F0F0",
                        }}
                      />
                    </label>
                  </div>
                  {/* number */}
                  <div style={{ width: "48%", marginBottom: "10px" }}>
                    <label>
                      <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px", }}>
                        Estimate Number
                      </h1>
                      <input
                        type="text"
                        value={formData.Estimatenum}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Estimatenum: e.target.value,
                          })
                        }
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                          width: "100%",
                          height: "30px",
                          backgroundColor: "#F0F0F0",
                        }}
                      />
                    </label>
                  </div>
                  {/* estimate date */}
                  <div style={{ width: "48%", overflow: "visible", marginRight: '20px', position: 'relative' }}>
                    <label>
                      <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px", }} >
                        Estimate Date <span style={{ color: "red" }}>*</span>
                      </h1>
                      <div
                        style={{
                          width: "100%",
                          height: "33px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "5px",
                          cursor: "pointer",

                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <span>{estimateDate ? estimateDate.toLocaleDateString("en-GB") : "Select Date"}</span>
                      </div>
                      {/* DatePicker Component */}
                      {isOpen && (
                        <div style={{
                          position: "absolute",
                          top: "50px",
                          left: 0,
                          zIndex: 1000,
                          background: "#fff",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "4px",
                          overflow: "visible",
                          width: "auto",
                        }}>
                          <DatePicker
                            selected={estimateDate}
                            onChange={handleEstimateDate}
                            inline
                          // portalId="root"
                          // popperPlacement="bottom-start" 
                          // popperContainer={document.body} 
                          />
                        </div>
                      )}
                    </label>
                  </div>
                  {/* expiry date */}
                  <div style={{ width: "48%", marginBottom: "10px", position: 'relative' }}>
                    <label>
                      <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px", }} >
                        Expiry Date <span style={{ color: "red" }}>*</span>
                      </h1>
                        <div
                          style={{
                            width: "90%",
                            height: "33px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "5px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                          onClick={() => setIsExpiryDateOpen(!isExpiryDateOpen)}>
                          <span>{expiryDate ? expiryDate.toLocaleDateString() : "Select Date"}</span>
                        </div>
                        {/* DatePicker Component */}
                        {isExpiryDateOpen && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50px",
                              left: 0,
                              zIndex: 2, // Ensures it's above everything
                              background: "#fff",
                              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                              borderRadius: "4px",
                              width: 'auto'
                            }}
                          >
                            <DatePicker
                              selected={expiryDate}
                              onChange={handleExpiryDate}
                              inline
                            />
                          </div>
                        )}
                      </label>
                    </div>
                </div>
              </div>

              {/* Part2 */}
              <div style={{ display: "flex" }}>
                {/* transport model */}
                <div style={{ width: "100%" }}>
                  <label>
                    <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px", }}>
                      Transport Model:
                    </h1>
                    <input
                      type="text"
                      value={formData.TransportModel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          TransportModel: e.target.value,
                        })
                      }
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "3px",
                        width: "90%",
                        height: "30px",
                        backgroundColor: "#F0F0F0",
                      }}
                    />
                  </label>
                </div>
                {/* date of supply */}
                <div style={{ width: "100%", position: 'relative', overflow: 'visible' }}>
                  <label>
                    <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px" }}>
                      Supply Date
                      <span style={{ color: 'red' }}>*
                      </span>
                    </h1>
                    <div
                      style={{
                        width: "90%",
                        height: "33px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsSupplyOpen(!isSupplyOpne)}
                    >
                      <span>{supplyDate ? supplyDate.toLocaleDateString() : "Select Date"}</span>
                    </div>
                    {/* DatePicker Component */}
                    {isSupplyOpne && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: '35%',
                          zIndex: 2, // Ensures it's above everything
                          background: "#fff",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "4px",
                          overflow: "visible",
                          width: 'auto'
                        }}
                      >
                        <DatePicker
                          selected={supplyDate}
                          onChange={handleSupplyDate}
                          inline
                        />
                      </div>
                    )}
                  </label>
                </div>
                {/* status */}
                <div style={{ width: "100%" }}>
                  <label>
                    <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px", }}>
                      Status:
                    </h1>
                    <select
                      value={formData.Status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Status: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        height: "33px",
                        fontSize: "14px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <option value="select">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="void">Void</option>
                    </select>
                  </label>
                </div>
              </div>
              </div>
          
          </div>

          {/* Item Details */}
          <div style={{ border: '1px solid #ccc', borderRadius: '10px', }}>
            <div
              style={{
                backgroundColor: '#565656',
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Distribute space evenly
                gap: "20px", // Equal gap between items
                flexWrap: "nowrap",
                padding: '15px',
              }}
            >
              {/* Item Details */}
              <h3
                style={{
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "Inter",
                  margin: 0, // Remove default margin
                }}
              >
                Item Details
              </h3>

              {/* Discount Levels */}
              <div
                style={{
                  display: "flex", // Ensure label and select are on the same line
                  alignItems: "center", // Align items vertically in the center
                }}
              >
                <h1
                  style={{
                    fontSize: "14px",
                    color: "white",
                    margin: "0", // Ensure no extra margins
                  }}
                >
                  Discount Levels:
                </h1>
                <label
                  style={{
                    display: "block",
                    marginLeft: "6px",
                  }}
                >
                  <select
                    style={{
                      width: "250px",
                      height: "33px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "1px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="transction">At transaction Level</option>
                    <option value="item">At Item Levels</option>
                  </select>
                </label>
              </div>

              {/* Amount are */}
              <div style={{ display: "flex", alignItems: "center", }}>
                <h1 style={{ fontSize: "14px", color: "white", margin: "0 8px 0 0", }}>
                  Amount are:
                </h1>
                <label>
                  <select
                    style={{
                      width: "250px",
                      height: "33px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "1px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="in">Inclusive of Tax</option>
                    <option value="ex">Exlusive of Tax</option>
                    <option value="out">Out of Scope</option>
                  </select>
                </label>
              </div>
            </div>

            <div style={{ padding: "10px", width: "100%", margin: "20px auto" }}>
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
                <div style={{ fontWeight: "bold" }}> Product<span style={{ color: "red" }}>*</span></div>
                <div style={{ fontWeight: "bold" }}>HSN Code</div>
                <div style={{ fontWeight: "bold" }}>GST %</div>
                <div style={{ fontWeight: "bold" }}>Cess %</div>
                <div style={{ fontWeight: "bold" }}>QTY<span style={{ color: "red" }}>*</span> </div>
                <div style={{ fontWeight: "bold" }}> Rate<span style={{ color: "red" }}>*</span> </div>
                <div style={{ fontWeight: "bold" }}>Amount<span style={{ color: "red" }}>*</span></div>
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
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={query} // Make input field controlled
                    onChange={(e) => setQuery(e.target.value)} // Update input state
                    placeholder="Search a Product..."
                    style={{
                      width: "100%",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "6px",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  />
                  {query.length > 0 && query.length < 2 && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "38px",
                        left: "0",
                        width: "100%",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        listStyle: "none",
                        padding: "5px",
                        margin: "0",
                        zIndex: 1000,
                      }}
                    >
                      <li style={{ padding: "8px", color: "#666" }}>Write two or more letters</li>
                    </ul>
                  )}
                  {showDropdown && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "38px",
                        left: "0",
                        width: "100%",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        listStyle: "none",
                        padding: "5px",
                        margin: "0",
                        zIndex: 1000,
                        maxHeight: "300px", // Max height for the dropdown
                        overflowY: "auto",
                      }}
                    >
                      {loading ? (
                        <li style={{ padding: "8px", color: "#666" }}>Loading...</li>
                      ) : suggestions.length > 0 ? (
                        suggestions.map((product) => (
                          <li
                            key={product.id}
                            onClick={() => handleSelectMain(product.title)}
                            style={{
                              padding: "8px",
                              cursor: "pointer",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            {product.title}
                          </li>
                        ))
                      ) : (
                        <li style={{ padding: "8px", color: "#666" }}>No products found</li>
                      )}
                    </ul>
                  )}

                </div>

                {/* HSN Code */}
                <div>
                  <input
                    type="text"
                    value={selectedProduct?.hsn || ""}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                      padding: "5px",
                      appearance: "none", // Hide number scroller in modern browsers
                      MozAppearance: "textfield", // Hide number scroller in Firefox
                      WebkitAppearance: "none",
                      textAlign: 'right'
                    }}
                    readOnly
                  />
                </div>

                {/* GST Percentage */}
                <div>
                  <input
                    type="text"
                    placeholder="0%"
                    value={selectedProduct?.gst ? `${selectedProduct.gst}%` : ""}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                      padding: "5px",
                      textAlign: 'right'
                    }}
                    readOnly
                  />
                </div>

                {/* Cess Percentage */}
                <div>
                  <input
                    type="text"
                    placeholder="0 %"
                    value={selectedProduct?.cess ? `${selectedProduct.cess}%` : ""} style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                      alignContent: 'center',
                      padding: "5px",
                      textAlign: 'right'
                    }}
                    readOnly
                  />
                </div>

                {/* Quantity */}
                <div>
                  <input
                    type="number"
                    value={qty} // changed value to qty
                    onChange={handleQtyChange}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                      appearance: "textfield", // Hide spinner in modern browsers
                      MozAppearance: "textfield", // Hide spinner in Firefox
                      WebkitAppearance: "none",
                    }}
                  />
                </div>

                {/* Rate */}
                <div>
                  <input
                    type="text"
                    value={rate}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                    readOnly
                  />
                </div>

                {/* Amount */}
                <div>
                  <input
                    type="text"
                    value={`Rs. ${amount.toFixed(2)}`} // Display the amount
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                      backgroundColor: "#D8D8D8",
                    }}
                  />
                </div>
                {/* variant Name */}
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

              <div>
                {inputs.map((input) => (
                  <div
                    key={input.id}
                    style={{ marginBottom: "10px", marginTop: "20px" }}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{ width: "30%" }}>
                        {/* Input Field */}
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            value={input.query}
                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                            placeholder="Search a Product..."
                            style={{
                              width: "100%",
                              height: "33px",
                              border: "1px solid #ccc",
                              backgroundColor: "#F0F0F0",
                              borderRadius: "6px",
                              padding: "5px",
                              boxSizing: "border-box",
                            }}
                          />
                          {input.query.length > 0 && input.query.length < 2 && (
                            <ul
                              style={{
                                position: "absolute",
                                top: "38px",
                                left: "0",
                                width: "100%",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                listStyle: "none",
                                padding: "5px",
                                margin: "0",
                                zIndex: 1000,
                                maxHeight: "300px",
                                overflowY: "auto",
                              }}>
                              <li style={{ padding: "8px", color: "#666" }}>Write two or more letters</li>
                            </ul>
                          )}
                          {input.showDropdown && (
                            <ul
                              style={{
                                position: "absolute",
                                top: "38px",
                                left: "0",
                                width: "100%",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                listStyle: "none",
                                padding: "5px",
                                margin: "0",
                                zIndex: 1000,
                                maxHeight: "300px",
                                overflowY: "auto",
                              }}
                            >
                              {input.suggestions.map((product) => (
                                <li key={product.id} onClick={() => handleSelect(input.id, product.title, product)}>{product.title}</li>
                              ))}
                            </ul>
                          )}
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
                              marginTop: '10px'
                            }} />
                        </div>
                      </div>
                      {/* hsn */}
                      <div style={{ width: "15%" }}>
                        {/* HSN */}
                        <input
                          type="text"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                          value={input.hsn || ""}
                          readOnly
                        />
                      </div>
                      {/* gst */}
                      <div style={{ width: "10%" }}>
                        <input
                          type="text"
                          placeholder="0%"
                          style={{
                            textAlign: 'right',
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                          value={input.gst ? `${input.gst}%` : ""}
                          readOnly
                        />
                      </div>
                      {/* cess */}
                      <div style={{ width: "10%" }}>
                        <input
                          type="text"
                          value={input.cess ? `${input.cess}%` : ""}
                          readOnly
                          placeholder="0 %"
                          style={{
                            textAlign: 'right',
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                        />
                      </div>
                      {/* oty */}
                      <div style={{ width: "10%" }}>
                        <input
                          type="number"
                          min={1}
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px",
                            appearance: "none", // Hide number scroller in modern browsers
                            MozAppearance: "textfield", // Hide number scroller in Firefox
                            WebkitAppearance: "none",
                          }}
                          onChange={handleQtyChange}
                        />
                      </div>
                      {/* rate */}
                      <div style={{ width: "10%" }}>
                        <input
                          type="number"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px",
                            appearance: "none", // Hide number scroller in modern browsers
                            MozAppearance: "textfield", // Hide number scroller in Firefox
                            WebkitAppearance: "none",
                          }}
                          readOnly
                          value={input.rate || ''}
                        />
                      </div>
                      {/* amount */}
                      <div style={{ width: "10%" }}>
                        <input
                          type="text"
                          placeholder="RS 0.0"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            backgroundColor: "#F0F0F0",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                          readOnly
                          value={input.amount || ''}
                        />
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeInputField(input.id)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          width: "33px",
                          height: "33px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
                {/* Add Item Button */}
                <div
                  onClick={addInputField}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#74A535",
                    color: "#ffffff",
                    padding: "5px",
                    width: "130px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ marginLeft: "10px" }}>Add Item</div>
                </div>
              </div>
            </div>
          </div>

          {/* memo */}
          <div style={{
            display: 'flex',
            border: '1px solid #E0E0E0',
            padding: '8px 10px',
            marginTop: '30px',
            borderRadius: '7px',
            marginBottom: '30px',
          }}>
            <div>
              <h1 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#000',
                padding: '24px 8px 12px',
                marginLeft: '30px',
              }}>Memo</h1>
              <textarea
                style={{
                  width: '400px',
                  height: '200px',
                  marginLeft: '35px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  resize: 'vertical',
                  overflowY: 'scroll',
                  marginBottom: '30px',
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '20px', /* Gap between form and textarea */
              alignItems: 'flex-end', /* Align items to the start, to prevent stretching */
              marginLeft: '100px',
              marginTop: '30px',
            }}>
              <div >
                {/* subtotal */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    Subtotal
                  </label>
                  <input
                    type="text"
                    value={`Rs. ${subtotal.toFixed(2)}`}
                    readOnly
                    style={{ backgroundColor: '#F0F0F0', width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>
                {/* cgst */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    {selectedProduct?.gst / 2}% CGST on Rs.{subtotal.toFixed(2)}
                  </label>
                  <input
                    type="text"
                    value={`Rs. ${cgstAmount.toFixed(2)}`}
                    readOnly
                    style={{ backgroundColor: '#F0F0F0', width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>
                {/* sgst */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    {selectedProduct?.gst / 2}% SGST on Rs. {subtotal.toFixed(2)}
                  </label>
                  <input
                    type="text"
                    value={`Rs. ${sgstAmount.toFixed(2)}`}
                    readOnly
                    style={{ backgroundColor: '#F0F0F0', width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>
                {/* cess */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    {selectedProduct?.cess}% CESS on Rs. {subtotal.toFixed(2)}
                  </label>
                  <input
                    type="text"
                    value={`Rs. ${cessAmount.toFixed(2)}`}
                    readOnly
                    style={{ backgroundColor: '#F0F0F0', width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>
                {/* discount */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={handleDiscountTypeChange}
                    style={{ width: '200px', height: '30px', fontSize: '12px', fontFamily: 'Inter', border: '1px solid #ccc', borderRadius: '3px' }}>
                    <option value="select">Select</option>
                    <option value="percent">Percentage(%)</option>
                    <option value="flat">Flat (Rs.)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    Discount Amount
                  </label>
                  <input
                    type="text"
                    value={discountAmount === 0 ? '' : discountAmount}
                    onChange={handleDiscountAmountChange}
                    style={{ width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        color: "black",
                        marginRight: "10px",
                      }}
                    >
                      Shipping Charge
                    </label>
                    <div
                      onClick={() => setIsToggled(!isToggled)}
                      style={{
                        width: "40px",
                        height: "20px",
                        backgroundColor: isToggled ? "green" : "#ccc",
                        borderRadius: "10px",
                        position: "relative",
                        marginRight: "10px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "2px",
                          left: isToggled ? "22px" : "2px",
                          transition: "left 0.3s ease",
                        }}
                      ></div>
                    </div>

                    <input
                      type="text"
                      value={shippingCharge === 0 ? '' : shippingCharge}
                      onChange={handleShippingChargeChange}
                      style={{ width: "200px", height: "30px", marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '10px' }} />
                  </div>

                  {isToggled && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: '10px' }}>
                      <label>
                        Shipping GST %
                        <input type="text" placeholder="Shipping"
                          value={shippingGstPercent === 0 ? '' : shippingGstPercent}
                          onChange={handleShippingGstPercentChange}
                          style={{ marginLeft: '72px', width: "200px", height: "30px", border: '1px solid #ccc', borderRadius: '4px' }} />
                      </label>

                      <label>
                        Shipping Amount
                        <input type="text"
                          value={`Rs. ${shippingCharge}`}
                          style={{ marginLeft: '68px', width: "200px", height: "30px", border: '1px solid #ccc', borderRadius: '4px' }} />
                      </label>
                      <label>
                        Shipping GST Amount
                        <input type="text"
                          value={`Rs. ${shippingGstAmount.toFixed(2)}`}
                          readOnly
                          style={{ marginLeft: '37px', width: "200px", height: "30px", border: '1px solid #ccc', borderRadius: '4px' }} />
                      </label>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    Round Off
                  </label>
                  <input
                    type="text"
                    value={roundOff}
                    onChange={handleRoundOffChange}
                    style={{ backgroundColor: '#F0F0F0', width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
                  <label style={{ flex: '1', marginRight: '10px', fontSize: '13px', color: 'black' }}>
                    Total
                  </label>
                  <input
                    type="text"
                    value={`Rs. ${formData.total ? formData.total.toFixed(2) : "0.00"}`}
                    readOnly
                    style={{ backgroundColor: '#F0F0F0', width: '200px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1 style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "500", color: "#707070" }}>@2024 Virtue. All Rights Reserved.</h1>
          </div>

        </div>
      ) : (
        <div style={{ minHeight: "100vh", width: "100%" }}>

          <div style={{
            marginTop: '15px',
            marginLeft: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            display: 'flex'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
            }}>Estimates/Quatations</h2>
            <button style={{
              backgroundColor: '#74a535',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }} onClick={handleCreateNewClick}>
              + Create New
            </button>
          </div>

          {/* Filter and Table Section */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            height: '60%',
            width: '100%',
          }}>
            {isFormVisible ? (
              < estimateForm onSave={handleSave} />
            ) : (
              <>
                <SendEmailInvoiceDialog
                  active={emailActive}
                  toggleModal={closeEmailModal}
                  selectedInvoice={selectedInvoice}
                />
                <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #ccc', paddingBottom: '25px' }}>
                  {/* Filter Section */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* custoemr name */}
                    <div style={{
                      position: "relative",
                      display: "inline-block",
                      width: "300px",
                    }}>
                      <img src={searchIcon}
                        style={{
                          position: "absolute",
                          width: '16px',
                          height: '16px',
                          margin: '8px'
                        }} alt="searchIcon" />
                      <input
                        type="text"
                        value={searchName}
                        onChange={handleSearchNameChange}
                        style={{
                          width: "100%",
                          padding: "8px 12px 8px 35px",
                          fontSize: "14px",
                          border: "0.5px solid rgba(0, 0, 0, 1)",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                        placeholder="Estimate No., Customer Name"
                      />
                    </div>
                    {/* start date */}
                    <div style={{ position: 'relative', display: 'inline-block', border: '1px solid #ccc', width: '180px', height: '36px' }}>
                      {/* Start Date Clickable Input Field */}
                      <div
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        style={{
                          padding: "12px",
                          height: "33px",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          border: "1px solid #000",
                          cursor: "pointer",
                          background: "#fff",
                        }}
                      >
                        <img src={ic_date} alt="Calendar" style={{ height: "15px", marginRight: "10px" }} />
                        <span>{date ? date.toLocaleDateString("en-US") : "Select Start Date"}</span>
                      </div>
                      {/* Start Date Picker (Appears Below the Input) */}
                      {isDatePickerOpen && (
                        <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 1000 }}>
                          <DatePicker
                            selected={date}
                            onChange={handleStartDateChange}
                            inline
                          />
                        </div>
                      )}
                    </div>
                    {/* end date */}
                    <div style={{ position: 'relative', display: 'inline-block', border: '1px solid #ccc', width: '180px', height: '36px' }}>
                      <div onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
                        style={{
                          padding: "12px", height: "33px",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          border: "1px solid #000",
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
                    <button style={{ width: '90px', height: '36px', border: '1px solid #ccc', borderRadius: '4px', color: '#fff', backgroundColor: '#74A535', fontSize: '14px', fontFamily: 'Inter' }}
                      onClick={handleSearchClick}>
                      Search
                    </button>
                  </div>
                  {/* clear */}
                  <button style={{ width: '90px', height: '36px', border: '1px solid #ccc', borderRadius: '4px', color: '#fff', backgroundColor: '#74A535', fontSize: '14px', fontFamily: 'Inter' }}
                    onClick={handleClearClick}>
                    Clear
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '25px', marginBottom: '10px' }}>
                  <select style={{ width: '190px', height: '33px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#F0F0F0 ' }}>
                    <option value="per 50">Result Per Page 50</option>
                    <option value="per 100">Result Per Page 100</option>
                  </select>
                </div>
                {/* Table Section */}
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "white",
                  border: "none",
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Estimate Number</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Estimate Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Expiry Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Customer Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Total Tax</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Total</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEstimate.length > 0 ? (
                      filteredEstimate.map((estimate, index) => (
                        <tr key={index}>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{estimate.Estimatenum}</td>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{formatDate(estimate.estDate)}</td>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{formatDate(estimate.ExpiryDate)}</td>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{estimate.Customer}</td>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{estimate.totalTax}</td>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{estimate.total}</td>
                          <td style={{ padding: '12px', textAlign: 'left' }}>{estimate.Status}</td>
                          <td style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>

                            {/* EDIT */}
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <img
                                src={ic_edit}
                                style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                                alt="Swap"
                                onMouseEnter={(e) => e.currentTarget.nextSibling.style.visibility = "visible"}
                                onMouseLeave={(e) => e.currentTarget.nextSibling.style.visibility = "hidden"}
                                onClick={() => handleEditClick(index)}
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
                                Edit Expense
                              </div>
                            </div>
                            {/* DELTE  */}
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <img
                                src={ic_info}
                                style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                                alt="Swap"
                                onMouseEnter={(e) => e.currentTarget.nextSibling.style.visibility = "visible"}
                                onMouseLeave={(e) => e.currentTarget.nextSibling.style.visibility = "hidden"}
                                onClick={() => handleDeleteClick(index)}
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
                                Delete Expense
                              </div>
                            </div>
                            {showDeletePopup && (
                              <div
                                style={{
                                  position: "fixed",
                                  top: 0, left: 0, width: "100%", height: "100%",
                                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  zIndex: 1000
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    width: "400px", // Increased width
                                    height: "200px", // Increased height
                                    padding: "20px",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    border: '1px solid #ccc',
                                  }}
                                >
                                  <div>
                                    <img src={ic_warning} alt="information"
                                      style={{
                                        width: '73px',
                                        height: '70px',
                                        marginBottom: '20px'
                                      }}
                                    />
                                    <div style={{ fontSize: "16px", alignContent: 'center', fontFamily: 'Inter' }}>
                                      <span>This can't be undone.</span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: '20px' }}>
                                    <button
                                      style={{ backgroundColor: "red", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px" }}
                                      onClick={handleConfirmDelete} >
                                      Delete
                                    </button>

                                    <button
                                      style={{ backgroundColor: "#C8C8C8", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px" }}
                                      onClick={() => setShowDeletePopup(false)}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            {/*Print  */}
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
                                Print Expense
                              </div>
                            </div>
                            {/* Donwlaod */}
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <img
                                src={ic_download}
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
                                Download Expense
                              </div>
                            </div>

                            {/* mail */}
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <img
                                src={ic_email}
                                style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                                alt="Swap"
                                onClick={() => openEmailModal(estimate)}
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
                                Download Estimate
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ padding: '20px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold', color: '#999' }}>
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px', color: '#707070' }}>
            <p>@2024 Virtue. All Rights Reserved.</p>
          </div>
          
           <EstimateInvoice />
        </div>
      )}
    </div>
  );
};