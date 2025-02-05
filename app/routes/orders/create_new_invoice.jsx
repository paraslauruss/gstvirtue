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
import searchIcon from "../../assets/images/searchIcon.png";
import { useCallback, useEffect, useState, useRef } from "react";
import Switch from "react-switch";
import { useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { EditDialog } from "./edit_customer_dialog";
import { EditShippingAddressDialog } from "./edit_shipping_address_dialog";

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

export function CreateNewInvoice({ onClose }) {
  const [editOfflineInvoiceNumber, setEditOfflineInvoiceNumber] =
    useState(false);
  const [offlineInvoicePrefix, setOfflineInvoicePrefix] = useState("");
  const [offlineInvoiceNumber, setOfflineInvoiceNumber] = useState("");

  const handleEditOfflineInvoiceNumberChange = (checked) => {
    setEditOfflineInvoiceNumber(checked);
  };

  const handleOfflineInvoicePrefixChange = (value) => {
    setOfflineInvoicePrefix(value);
  };

  const handleOfflineInvoiceNumberChange = (value) => {
    setOfflineInvoiceNumber(value);
  };

  const [discountLevel, setDiscountLevel] = useState("at-transaction-level");

  const handleDiscountLevelChange = useCallback(
    (value) => setDiscountLevel(value),
    [],
  );

  const options = [
    { label: "At transaction Level", value: "at-transaction-level" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];
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
      const handleApiCallbackEdit = async (responseData) => {
        console.log("Response Data: ", responseData);
        setSelectedCustomer(responseData);
      }
  const [exclusiveOfTax, setExclusiveOfTax] = useState("exclusive-of-tax");

  const handleExclusiveOfTaxChange = useCallback(
    (value) => setExclusiveOfTax(value),
    [],
  );
  const amount = [
    { label: "Exclusive of Tax", value: "exclusive-of-tax" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const [shippingCharge, setShippingCharge] = useState(false);

  const handleShippingChargeToggle = () => {
    setShippingCharge(!shippingCharge);
  };
   // Edit Shipping Address
  const [editShippingDialog, setEditShippingDialog] = useState(false);
  const editShippingDialogToggle = () => {
    setEditShippingDialog((prev) => !prev);
  }

  const handleApiCallbackEditShipping = async (responseData) => {
    console.log("Response Data: ", JSON.stringify(responseData));
    setSelectedCustomer(responseData);
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
        setShowAddNew(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const customers = useLoaderData();


  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showAddNew, setShowAddNew] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (value) => {
    setSearchQuery(value);
    setDropdownVisible(true);
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
    setSelectedCustomer(customer)
    setDropdownVisible(false);
    setShowAddNew(false);
    setSearchQuery("");
  };

  const [active, setActive] = useState(false);
  const toggleModal = () => {
    setActive((prev) => !prev); // Toggle the Dialog's visibility
  };
  const handleFocus = () => {
    setShowAddNew(true); // Show Add New button when focused
  };

  

    //  FETCH TITLE FIELD
    const session = useLoaderData();

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


        // Fetch suggestions for main search bar
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

        };
        const [inputs, setInputs] = useState([]);
          // Add new input field
        const addInputField = () => {
          setInputs([
            ...inputs,
            { id: Date.now(), query: "", suggestions: [], showDropdown: false, selectedProduct: null, 
              hsn: "", 
              gst: "", 
              cess: "" },
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
              input.id === id ? { ...input, query: title, showDropdown: false,
                selectedProduct: productDetails, 
                hsn: productDetails.hsn || "", 
                gst: productDetails.gst || "", 
                cess: productDetails.cess || ""  } : input
            )
          );
        };
        

  return (
    <>

      <div >
        {/* {productList[0].node.title} */}
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ cursor: 'pointer' }} onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
              >
                <path
                  d="M6.9375 1L1 6.9375L6.9375 12.875"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div style={{ marginLeft: "20px" }}>
              <Text variant="headingLg" fontWeight="bold">
                Create New Invoice Offline
              </Text>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#74A535",
              color: "#ffffff",
              padding: "5px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <Text>Save</Text>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Card>
            <div>
              <span style={{ fontWeight: "bold" }}>Customer</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div ref={dropdownRef} style={{ marginTop: "15px" }}>
              <TextField
                placeholder="Search a Customer..."
                value={searchQuery}
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
                    <div style={{cursor:'pointer'}} onClick={editDialogToggle}>
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
                    justifyContent:'space-between',
                    display:'flex',
                    
                  }}>
                    <div>Shipping Address</div>
                    
                    <div style={{cursor:'pointer'}} onClick={editShippingDialogToggle}>
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
            <Checkbox
              label="Edit Offline invoice number?"
              checked={editOfflineInvoiceNumber}
              onChange={handleEditOfflineInvoiceNumberChange}
            />
            <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Offline Invoice Prefix
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField
                    placeholder=""
                    disabled={!editOfflineInvoiceNumber}
                    value={offlineInvoicePrefix}
                    onChange={(value) =>
                      handleOfflineInvoicePrefixChange(value)
                    }
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Offline Invoice Number
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField
                    placeholder=""
                    disabled={!editOfflineInvoiceNumber}
                    value={offlineInvoiceNumber}
                    onChange={(value) =>
                      handleOfflineInvoiceNumberChange(value)
                    }
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Purchase Order</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    // placeholder="Purchase Order"
                    style={{
                      width: "300px",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Invoice Date</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY" // Custom format placeholder
                    style={{
                      width: "300px",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Transport Model</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder="Transport Model"
                    style={{
                      width: "350px",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Date of Supply</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px", position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Select a date"
                    style={{
                      width: "350px", // Width adjusted as per your desired style
                      height: "33px", // Height adjusted as per your desired style
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Status</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px", position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Status"
                    style={{
                      width: "350px", // Width adjusted as per your desired style
                      height: "33px", // Height adjusted as per your desired style
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div style={{ marginTop: "20px" }}>
            <Text variant="headingMd" fontWeight="bold">
              Item Details
            </Text>
          </div>
          <div style={{ marginTop: "10px" }}></div>
          <Card padding={0}>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#565656",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ color: "white" }}>
                  <Text variant="headingMd">Discount Level</Text>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Select
                    label=""
                    options={options}
                    onChange={handleDiscountLevelChange}
                    value={discountLevel}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ color: "white" }}>
                  <Text variant="headingMd">Amount are</Text>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Select
                    label=""
                    options={amount}
                    onChange={handleExclusiveOfTaxChange}
                    value={exclusiveOfTax}
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ width: "30%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    Product
                  </span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    HSN Code
                  </span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    GST %
                  </span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    Cess %
                  </span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>QTY</span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>Rate</span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    Amount
                  </span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ width: "30%" }}>
                  {/* Input Field */}
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
                  {/* Variant Input */}
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      placeholder="Variant name"
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
                  </div>
                </div>
                      {/* HSN Code Field */}
                      <div style={{ width: "10%" }}>
                {/* HSN Field */}
                <input
                  type="number"
                  value={selectedProduct?.hsn || ""} // Populate from selectedProduct
                  style={{
                    width: "100%", // Make input take the full width of the container
                    height: "33px", // Set height
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "5px",
                    appearance: "none", // Hide number scroller in modern browsers
                    MozAppearance: "textfield", // Hide number scroller in Firefox
                    WebkitAppearance: "none",
                    textAlign:'right'
                  }}
                />
              </div>
              <div style={{ width: "10%" }}>
                {/* GST Field */}
                <input
                  type="text"
                  placeholder="0%"
                  value={selectedProduct?.gst ? `${selectedProduct.gst}%` : ""}
                  style={{
                    width: "100%", // Make input take the full width of the container
                    height: "33px", // Set height
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "5px",
                    textAlign:'right'
                  }}
                />
              </div>
              <div style={{ width: "10%" }}>
                {/* Cess Field */}
                <input
                  type="text"
                  placeholder="0 %"
                  value={selectedProduct?.cess? `${selectedProduct.cess}%` : ""}
                  style={{
                    width: "100%", // Make input take the full width of the container
                    height: "33px", // Set height
                    border: "1px solid #ccc",
                    alignContent:'center',
                    borderRadius: "6px",
                    padding: "5px",
                    textAlign:'right' 
                  }}
                />
              </div>
                <div style={{ width: "10%" }}>
                  <input
                    type="number"
                    // placeholder="OTY"
                    min={1}
                    style={{
                      textAlign:'right',
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px",
                      appearance: "none", // Hide number scroller in modern browsers
                      MozAppearance: "textfield", // Hide number scroller in Firefox
                      WebkitAppearance: "none",
                    }}
                  />
                </div>

                <div style={{ width: "10%" }}>
                  <input
                    type="number"
                    // placeholder="rate"
                    style={{
                      textAlign:'right',
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px",
                      appearance: "none", // Hide number scroller in modern browsers
                      MozAppearance: "textfield", // Hide number scroller in Firefox
                      WebkitAppearance: "none",
                    }}
                  />
                </div>

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
                              }}
                            >
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
                        <div style={{ marginTop: "10px" }}>
                          <input
                            type="text"
                            placeholder="Variant name"
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
                        </div>
                      </div>
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

                      <div style={{ width: "10%" }}>
                        {/* GST */}
                        <input
                          type="text"
                          placeholder="0%"
                          style={{
                            textAlign:'right',
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

                      <div style={{ width: "10%" }}>
                        <input
                        // CESS
                          type="text"
                          value={input.cess ? `${input.cess}%` : ""}
                          readOnly
                          placeholder="0 %"
                          style={{
                            textAlign:'right',
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="number"
                          // placeholder="OTY"
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
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="number"
                          // placeholder="rate"
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
                        />
                      </div>

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

          </Card>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Card>
            <Text variant="headingMd" fontWeight="bold">
              Payment Terms:
            </Text>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <Card>
                <Text variant="headingMd" fontWeight="regular">
                  Payments can be made via cash, credit/debit card, or UPI at
                  the point of sale. Advance payments may be required for large
                  orders.
                </Text>
                <Text variant="headingMd" fontWeight="bold">
                  Order Modifications:
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  Modifications to offline orders are allowed within 24 hours of
                  placing the order or before processing starts.
                </Text>
                <Text variant="headingMd" fontWeight="bold">
                  Pick-Up Policy:
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  For self-pick-up orders, goods must be collected within 3
                  business days of notification.
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  Unclaimed orders will be subject to cancellation without a
                  refund after 7 days.
                </Text>
                <Text variant="headingMd" fontWeight="bold">
                  Warranty/Guarantee:
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  Claims related to product defects must be reported within the
                  specified warranty period.
                </Text>
              </Card>
              <div style={{ width: "50%" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Subtotal
                    </Text>
                  </div>
                  <input 
                   style={{
                    width:'44%', 
                    height:'33px', color:'#000', 
                    backgroundColor:'#fff', border:'1px solid #ccc', borderRadius:'6px'}}/> </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Discount Type
                    </Text>
                  </div>
                  <select
                    style={{
                      width: "44%",
                      height: "33px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px",
                      backgroundColor: "#fff",
                      fontSize: "14px",
                      cursor: "pointer",
                      padding:'5px 10px'
                    }}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat(Rs.)</option>
                  </select>
                </div>

                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Discount Amount
                    </Text>
                  </div>
                   <input 
                   style={{
                    width:'44%', 
                    height:'33px', color:'#000', 
                    backgroundColor:'#fff', border:'1px solid #ccc', borderRadius:'6px', textAlign:'right'}}/>
                </div>

                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Text variant="headingMd" fontWeight="bold">
                      Shipping Charge
                    </Text>
                    <div style={{ marginLeft: "10px", display: "flex" }}>
                      <Switch
                        onChange={handleShippingChargeToggle}
                        checked={shippingCharge}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={15}
                        width={30}
                        onColor="#E2EBD6"
                        offColor="#F4F4F4"
                        onHandleColor="#74A535"
                        boxShadow="none"
                        activeBoxShadow="none"
                        handleDiameter={12}
                      />
                    </div>
                  </div>
                  <input style={{
                    width:'44%', 
                    height:'33px', color:'#000', 
                    backgroundColor:'#fff', border:'1px solid #ccc', borderRadius:'6px'}}/>
                </div>

                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Round Off
                    </Text>
                  </div>
                  <input style={{
                    width:'44%', 
                    height:'33px', color:'#000', 
                    backgroundColor:'#fff', border:'1px solid #ccc', borderRadius:'6px'}}/>
                </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Total
                    </Text>
                  </div>
                  <input  type="number"
                  placeholder="Rs0.0"
                  style={{
                    width:'44%', 
                    height:'33px', color:'#000',
                    backgroundColor:'#fff', border:'1px solid #ccc', borderRadius:'6px', padding:'5px', WebkitAppearance: "none",
                    overflow:'hidden'
                  }}/>
                </div>
              </div>
            </div>
          </Card>
        </div>  
      </div>
      <Dialog active={active} toggleModal={toggleModal} apiCallback={handleApiCallback} />
      <EditDialog active={editDialog} toggleModal={editDialogToggle} customerDetails={selectedCustomer} apiCallbackEdit={handleApiCallbackEdit}/>
      <EditShippingAddressDialog active={editShippingDialog} toggleModal={editShippingDialogToggle} customerDetails={selectedCustomer} apiCallbackEdit={handleApiCallbackEditShipping}/>
    </>
  );
}
