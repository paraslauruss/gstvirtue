import React, { useState, useEffect,useCallback } from "react";
import groupimage from "../../assets/images/Group@2x.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  useLoaderData } from "@remix-run/react";
import searchIcon from '../../assets/images/searchIcon.png'
import ic_date from '../../assets/images/ic_date.png';
import ic_edit from '../../assets/images/ic_edit.png';
import ic_info from '../../assets/images/ic_delete.png';
import ic_print from '../../assets/images/ic_print.png';
import ic_download from '../../assets/images/ic_download.png'
import ic_warning from '../../assets/images/ic_warning.jpg';


export const Bills = () => {

  const session = useLoaderData(); 
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    billPrefix:"",
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
    totalTax: 0, // ADD totalTax
    total: 0,
  });
  
  // bill save
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [apiURL, setApiURL] = useState('http://localhost:3001/api/bills'); // Check this, this can stop all functions from properly working
  const [method, setMethod] = useState("POST");
  
  const handleSave = async () => {
    try {
        let apiURL = 'http://localhost:3001/api/bills';
        let method = 'POST';
        let itemToEditId = null;

        if (isEditing && editIndex !== null && filteredBills[editIndex] && filteredBills[editIndex]._id) {
            itemToEditId = filteredBills[editIndex]._id;
            apiURL = `http://localhost:3001/api/bills/${itemToEditId}`;
            method = 'PUT';
            console.log("Editing Bill with ID:", itemToEditId); //Debugging
        }
        else {
            console.log("Creating new Bill.");
        }

        //Log URL
          console.log("Saving Bill to", apiURL, "with method", method);

        const headers = {
            'Content-Type': 'application/json',
            'api-version': '2025-01',
            'store-name': session.storeName,
            'access-token': session.accessToken,
        };

        const response = await fetch(apiURL, {
            method: method,
            headers: headers,
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            const newBill = await response.json();
            // Fetch all payees to update the UI
            const fetchResponse = await fetch('http://localhost:3001/api/bills', {
                headers: {
                    'Content-Type': 'application/json',
                    'api-version': '2025-01',
                    'store-name': session.storeName,
                    'access-token': session.accessToken,
                }
            });
            if (fetchResponse.ok) {
                const fetchedBills = await fetchResponse.json();
                setBills(fetchedBills);
                setFilteredBills(fetchedBills);
            } else {
                console.error('Failed to fetch bills:', fetchResponse.statusText);
                alert(`Failed to fetch bills: ${fetchResponse.statusText}`);
            }
            resetForm();
            setShowSavePopup(true);
            setIsFormVisible(false)
            setTimeout(() => {
                setShowSavePopup(false);
            }, 2000);
        }
        else {
            // NEW DEBUGGING CODE: Log the full response for detailed analysis
            console.error('Failed to save/update bill:', response.status, response.statusText, await response.text());
            alert(`Failed to save/update bill: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error saving/updating bill:', error);
        alert(`Error saving/updating bill: ${error.message}`);
    }
};
  // useEffect hook to load bills from localStorage on component mount
  useEffect(() => {
    const fetchBills = async () => {
      try {
            const response = await fetch('http://localhost:3001/api/bills', {
                 headers: {
                    'Content-Type': 'application/json',
                    'api-version': '2025-01',
                    'store-name': session.storeName,
                    'access-token': session.accessToken,
                }
            });
        if (response.ok) {
          const data = await response.json();
          setBills(data);
          setFilteredBills(data);
        } else {
          console.error('Failed to fetch bills:', response.statusText);
          alert(`Failed to fetch bills: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching bills:', error);
        alert(`Error fetching bills: ${error.message}`);
      }
    };

    fetchBills();
  }, [isFormVisible]);

  const resetForm = () => {
    setFormData({
        billPrefix: "",
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
    setBillDate(null);
    setDueDate(null);
    setFilteredBills([])
};
  
const handleSaveChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      // Filter bills based on input
      if (name === "payeeVendor" && value.length >= 2) {
        const filtered = bills.filter((bill) =>
          bill.payeeVendor.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBills(filtered);
        setShowDropdown(true);
      } else {
        setFilteredBills([]);
        setShowDropdown(false);
      }
};

  const handleCreateNewClick = () => {
    setIsFormVisible(true);
  };

  const handleImageClick = () => {
    setIsFormVisible(!isFormVisible); // Toggle the visibility
  };
  
   // ADD INPUT 
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

  // DATE FOR DIFFERNT 
  const [isOpen, setIsOpen] = useState(false);
  const [billDate, setBillDate] = useState(null);
  const handleBillDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      billDate: date ? date.toISOString().split('T')[0] : "", 
  }));
  setIsOpen(false);
  };
  // DUE DATE
  const [dueDate, setDueDate] = useState(null);
  const [isDueDateOpen , setIsDueDateOpen] = useState(false);

  const handleDueDateChange = (date) =>{
    setDueDate(date);
    setFormData({
      ...formData,
      dueDate: date, // set the date in your form data
    });
    setIsDueDateOpen(false);
  }
  // PAY DATE
  const [payDate, setPayDate] = useState(null);
  const [isPayDateOpen , setIsPayDateOpen] = useState(false);
  const handlePayDate = (date) =>{
     setPayDate(date);
     setIsPayDateOpen(false);
  }
   // CUSTOMER NAME PAYEE
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  // customer name fetch
    useEffect(() => {
      const fetchCustomers = async () => {
        if (!session?.storeName || !session?.accessToken) {
          console.warn("Missing storeName or accessToken in session (useLoaderData). Not fetching data.");
          return; 
        }
        setIsLoading(true); 
        try {
          const response = await fetch("http://localhost:3001/api/customers", {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "store-name": session.storeName,
              "api-version": "2025-01",
              "access-token": session.accessToken
            },
          });
  
          if (!response.ok) {
            console.error(`Error fetching customer data: ${response.status} ${response.statusText}`);
            setIsLoading(false);
            return;
          } 
         const data = await response.json();
          console.log("API Response:", data);
  
          if (Array.isArray(data)) {
            const extractedCustomers = data.map((customer) => ({
              _id: customer._id, // Keep this if the API returns an _id
              first_name: customer.first_name || "Unknown",
              last_name: customer.last_name || "Unknown",
            }));
            setCustomers(extractedCustomers);
          } else {
            console.error("Unexpected response format:", data);
          }
        } catch (error) {
          console.error("Error fetching customer details:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCustomers();
    }, [session]);
  
    const handlePayeeVendorChange = (e) => {
      const value = e.target.value;

      // 1. Update formData state:
      setFormData((prevFormData) => ({
          ...prevFormData,
          payeeVendor: value,
      }));

      // 2. Filter customers based on input
      if (value.length >= 2) {
          const filtered = customers.filter((customer) =>
              `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredCustomers(filtered);
          setShowDropdown(true);
      } else {
          setFilteredCustomers([]);
          setShowDropdown(false);
      }
  };

  const handleSelectSuggestion = (customer) => {
      setFormData((prevFormData) => ({
          ...prevFormData,
          payeeVendor: `${customer.first_name} ${customer.last_name}`,
      }));
      setFilteredCustomers([]);
      setShowDropdown(false);
  };
  // toggle switch 
  const [isToggled, setIsToggled] = useState(false);
   // Product query Select
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    // State for calculations
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
      console.log("calculateGstAmount: amount =", amount, ", gst =", gst); // Debugging
      const gstAmount = (amount * gst) / 100;
      console.log("calculateGstAmount: gstAmount =", gstAmount); // Debugging
      return gstAmount;
    };
      // Fetch suggestions for main search bar
      useEffect(() => {
        const fetchProducts = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                setShowDropdown(false);
                setSelectedProduct(null);
                return;
            }
    
            setLoading(true);
            setError("");
    
            try {
                // Fetch suggestions
                const suggestionResponse = await fetch("http://localhost:3001/api/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "store-name": session?.storeName || "",
                        "api-version": "2025-01",
                        "access-token": session?.accessToken || "",
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
                    product?.title?.toLowerCase().includes(query.toLowerCase())
                );
    
                setSuggestions(filteredSuggestions);
                setShowDropdown(filteredSuggestions.length > 0);
    
                // Find selected product
                const selected = filteredSuggestions.find(
                    (product) => product?.title?.toLowerCase() === query.toLowerCase()
                );
    
                if (selected?.id) {
                    const detailsResponse = await fetch(
                        `http://localhost:3001/api/products/${selected.id}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "store-name": session?.storeName || "",
                                "api-version": "2025-01",
                                "access-token": session?.accessToken || "",
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
        };
        fetchProducts();
        // Dependency array
    }, [query, session?.storeName, session?.accessToken]);


      // Handle selection for main search input
      const handleSelectMain = async (title) => {
        setQuery(title); // Set the title in the input field
        setShowDropdown(false); // Hide the dropdown
      };

      // useEffect to perform calculations when selectedProduct or qty changes
      useEffect(() => {
        if (selectedProduct) {
          console.log("selectedProduct:", selectedProduct); // Debugging
      
          // Set rate from product price
          const productPrice = parseFloat(selectedProduct.price) || 0;
          setRate(productPrice);
      
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
        totalTax: cgstAmount + sgstAmount, // ✅ Ensure totalTax updates
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

      // DATE PICKER START END
      const [date , setDate] =  useState(null);
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
                setFilteredBills(bills);
            };
            const handleSearchClick = () => {
              let filteredData = [...bills];  
              
              // Filter by payeeVendor
              if (searchName) {
                filteredData = filteredData.filter(bill =>
                  bill.payeeVendor.toLowerCase().includes(searchName.toLowerCase())
                );
              }
              
              // Date validation
              if (date && endDate) {
                filteredData = filteredData.filter(bill => {
                  const billDate = bill.billDate ? new Date(bill.billDate) : null;
                  if (!billDate || isNaN(billDate.getTime())) {
                    console.warn(`Invalid billDate found: ${bill.billDate}. Skipping date filtering for this bill.`);
                    return true;
                }
                const billDateTime = billDate.getTime();
                const startDateTime = date.getTime();
                const endDateTime = endDate.getTime();

                return billDateTime >= startDateTime && billDateTime <= endDateTime;
              });
            }            
            setFilteredBills(filteredData);
            };
            
      // EDIT ICON
      const [isEditing, setIsEditing] = useState(false);
      const [editIndex, setEditIndex] = useState(null);
      const handleEditClick = (index) => {
        setEditIndex(index); // Store the index of the item being edited
        setIsFormVisible(true); // Show the form
      
        const billToEdit = bills[index];
      
        // Ensure billToEdit exists before accessing its properties
        if (billToEdit) {
          setFormData({  // Populate the form with the bill data
            billNumber: billToEdit.billNumber || "",
            payeeVendor: billToEdit.payeeVendor || "",
            totalTax: billToEdit.totalTax || 0,
            total: billToEdit.total || 0,
            paymentTerms: billToEdit.paymentTerms || "Net 15", // Assuming a default 
          });
          console.log("Bill to Edit:", billToEdit.billNumber, " ",  billToEdit.payeeVendor, " "
            ,billToEdit.totalTax, " ",  billToEdit.total
                );
               setTotal(billToEdit.total) // ADDED CODE
               setCgstAmount(billToEdit.totalTax);
               setSgstAmount(billToEdit.totalTax);
         try {
            setBillDate(billToEdit.billDate ? new Date(billToEdit.billDate) : null);
            setDueDate(billToEdit.dueDate ? new Date(billToEdit.dueDate) : null);
          } catch (error) {
            console.error("Error parsing dates:", error);
            setBillDate(null);
            setDueDate(null);
          }    
        } else {
          console.warn(`Bill at index ${index} not found. Check your bills array.`);
          // Optionally, display an error message to the user.
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
        if (expenseToDelete === null || expenseToDelete >= filteredBills.length) {
            console.error("Invalid expenseToDelete index:", expenseToDelete);
            alert("Invalid expense selection. Please try again.");
            return;
        }
    
        try {
            // ✅ Ensure that `_id` exists
            const itemToDelete = filteredBills[expenseToDelete];
            if (!itemToDelete || !itemToDelete._id) {
                console.error("Item to delete not found or missing _id:", itemToDelete);
                alert("Error: Item to delete not found.");
                return;
            }
    
            const itemToDeleteId = itemToDelete._id;
            const deleteUrl = `http://localhost:3001/api/bills/${itemToDeleteId}`;
    
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
            const fetchResponse = await fetch('http://localhost:3001/api/bills', {
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
    
            const updatedBills = await fetchResponse.json();
            setBills(updatedBills);
            setFilteredBills(updatedBills);
    
        } catch (error) {
            console.error("Error deleting item:", error);
            alert(`Error deleting item: ${error.message}`);
        } finally {
            setShowDeletePopup(false);
        }
    };

    // Format date
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = isNaN(date.getTime()) ? new Date().toLocaleDateString('en-GB', options) : date.toLocaleDateString('en-GB', options);;
    return formattedDate;
  }   
    
  return (
   
      <div style={{
        margin: '0',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        {isFormVisible ? (
          <div style={{
            width: '80%',
            maxWidth: '1200px',
            borderRadius: '8px',
            padding: '20px'}} >

            <div style={{
                 display: "flex",
                 justifyContent: "space-between",
                 gap: "10px",
                 marginBottom: "15px",
                marginTop:'30px'
            }}>
              <div style={{display:'flex', alignItems:'center'}}>
              <img src={groupimage} alt="Group Icon" style={{ width: '22px', height: '22px', marginRight: '8px', cursor:'pointer' }} 
                 onClick={handleImageClick}
              />                <span style={{fontSize: '20px', fontWeight: '600'}}>Create New Bills</span>
              </div>
              <button style={{
                   width: "110px",
                   height: "36px",
                   backgroundColor: "#5c8e29",
                   color: "white",
                   fontSize: "17px",
                   border: "1px solid #ccc",
                   borderRadius: "5px",
                   alignItems: "center",
              }} onClick={handleSave}>
                Save
              </button>
              {showSavePopup && (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    zIndex: 1000, // Ensure it's on top of everything
                    textAlign: "center", //Center text
                  }}
                >
                  Data saved successfully!
                </div>
                )}
            </div>

            <div style={{border:'1px solid #ccc',  borderRadius:'8px', padding:'14px 14px'}} >
             
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  {/* Bill prefix */}
                  <div style={{ width: "100%" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black", marginBottom: "8px"}}>Bill Prefix:</h1>
                      <input
                        type="text"
                        name="billPrefix"
                        value={formData.billPrefix}
                        onChange={handleSaveChange}
                        style={{border: "1px solid #ccc",
                        borderRadius: "3px",
                        width: "90%",
                        height: "30px",
                        backgroundColor: "#F0F0F0",}}
                      />
                    </label>
                  </div>
                  {/* Billnum */}
                  <div style={{ width: "100%" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black", marginBottom: "8px"}}>Bill Number:</h1>
                      <input
                        type="text"
                        name="billNumber"
                        value={formData.billNumber}
                        onChange={handleSaveChange}
                        style={{border: "1px solid #ccc",
                        borderRadius: "3px",
                        width: "90%",
                        height: "30px",
                        backgroundColor: "#F0F0F0",}}
                      />
                    </label>
                  </div>
                    {/* Payee */}
                  <div style={{ width: "100%" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black", marginBottom: "8px"}}>Payee/Vendor:</h1>
                      <input
                        type="text"
                        name="payeeVendor"
                        value={formData.payeeVendor} // Fixed typo (previously "payess")
                        onChange={handlePayeeVendorChange}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "90%",
                          height: "35px",
                          backgroundColor: "#F8F8F8",
                          padding: "5px",
                          outline: "none",
                        }}
                      />
                    </label>
                    {/* Dropdown for suggestions */}
                    {showDropdown && (
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "90%",
                          maxHeight: "150px",
                          overflowY: "auto",
                          backgroundColor: "white",
                          position: "absolute",
                          zIndex: 10, // Ensures it stays on top
                          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                          marginTop: "5px",
                        }}
                      >
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <div
                              key={customer._id || `${customer.first_name}${customer.last_name}`} // Ensuring unique key
                              onClick={() => handleSelectSuggestion(customer)}
                              style={{
                                padding: "10px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                transition: "background-color 0.2s ease-in-out",
                              }}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
                            >
                              <strong>{`${customer.first_name} ${customer.last_name}`}</strong>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: "10px", color: "#999", textAlign: "center" }}>
                            No results found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Part2 */}
                <div style={{ display: "flex"}}>
                  {/* bill date */}
                  <div style={{ width: "100%", position: "relative",overflow: "visible"  }}>
                    <label>
                      <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px" }}>
                        Bill Date <span style={{ color: "red" }}>*</span>
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                          <span>{formData.billDate ? new Date(formData.billDate).toLocaleDateString() : "Select Date"}</span>                      </div>
                      {isOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 1000,
                            background: "#fff",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "4px",
                            width: "auto",
                            overflow: 'visible',
                          }}
                        >
                          <DatePicker 
                            selected={formData.billDate ? new Date(formData.billDate) : null} 
                            onChange={handleBillDateChange} 
                            inline 
                          />
                        </div>
                      )}
                    </label>
                  </div>
                    {/* Due date */}
                  <div style={{ width: "100%", position: "relative",overflow: "visible" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black", marginBottom: "8px"}}>Due Date
                      <span style={{ color: "red" }}>*</span>
                      </h1>
                      <div   style={{
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
                           onClick={() => setIsDueDateOpen(!isDueDateOpen)} 
                        >
                           <span>{dueDate ? dueDate.toLocaleDateString() : "Select Date"}</span>
                      </div>
                      {isDueDateOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 1000,
                            background: "#fff",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "4px",
                            width: "auto",
                            overflow: 'visible',
                          }}
                        >
                          <DatePicker 
                            selected={dueDate} 
                            onChange={handleDueDateChange} 
                            inline 
                          />
                        </div>
                      )}
                    </label>
                  </div>
                  {/* Pay date */}
                  <div style={{ width: "100%",position: "relative",overflow: "visible" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black", marginBottom: "8px"}}>Payment Date <span style={{color:'red'}}>*</span></h1>
                         <div style={{
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
                         onClick={() => setIsPayDateOpen(!isPayDateOpen)}
                        >
                        <span>{payDate ? payDate.toLocaleDateString() : "Select Date"}</span>
                      </div>
                      {isPayDateOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 1000,
                            background: "#fff",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "4px",
                            width: "auto",
                            overflow: 'visible',
                          }}
                        >
                          <DatePicker 
                            selected={payDate} 
                            onChange={handlePayDate} 
                            inline 
                          />
                        </div>
                      )}

                    </label>
                  </div>
                  {/* payment terms */}
                  <div style={{ width: "100%" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black", marginBottom: "8px"}}>Payment Terms:</h1>
                      <select
                        value={formData.paymentTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentTerms: e.target.value,
                          })
                        }
                        style={{
                        width: "100%",
                        height: "33px",
                        fontSize: "14px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#F0F0F0",
                        fontFamily:'Inter'
                      }}
                      >
                        <option value="Net 15">Net 15</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 45">Net 45</option>
                        <option value="Net 60">Net 60</option>
                        <option value="Net 75">Net 75</option>

                      </select>
                    </label>
                  </div>
                </div>  
            </div>

            <div style={{marginTop:'50px', border:'1px solid #ccc', borderRadius:'8px'}}>
            <div
                style={{
                  backgroundColor:'#565656',
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // Distribute space evenly
                  gap: "20px", // Equal gap between items
                  flexWrap: "nowrap", 
                  padding:'15px',
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
                      margin: "0 8px 0 0", // Align right with small space
                    }}
                  >
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

                {/* GSTIN part */}
                <div
                  style={{                
                    padding: "10px",
                    width: "100%",                   
                    margin: "20px auto",
                  }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                      gap: "10px",
                      borderBottom: "2px solid #E2E2E2",
                      paddingBottom: "10px",
                      marginBottom: "10px",
                    }}>
                      <div style={{ fontWeight: "bold" }}>Product<span style={{ color: "red" }}>*</span></div>
                      <div style={{ fontWeight: "bold" }}>HSN Code</div>
                      <div style={{ fontWeight: "bold" }}>GST %</div>
                      <div style={{ fontWeight: "bold" }}>Cess %</div>
                      <div style={{ fontWeight: "bold" }}>QTY<span style={{ color: "red" }}>*</span></div>
                      <div style={{ fontWeight: "bold" }}>Rate<span style={{ color: "red" }}>*</span> </div>
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
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px",
                            textAlign:'right'
                          }}
                          readOnly
                        />
                      </div>
                    {/* Cess Percentage */}
                    <div >
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
                        readOnly
                      />
              </div>
                    {/* Quantity */}
                    <div>
                      <input
                        type="number"
                        min={1}
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "1px solid #ccc",
                          appearance: "textfield", // Hide spinner in modern browsers
                          MozAppearance: "textfield", // Hide spinner in Firefox
                          WebkitAppearance: "none", 
                        }}
                        onChange={handleQtyChange} 
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
                        defaultValue="Rs. 0.00"
                        value={`Rs. ${amount.toFixed(2)}`} // Display the amount
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
                          {/* cess */}
                      <div style={{ width: "10%" }}>
                        <input
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

              {/* 3rd part  */}
              <div style={{display: 'flex',
                   border: '1px solid #E0E0E0',
                   padding: '8px 10px',
                   marginTop: '30px',
                   borderRadius: '7px',
                   marginBottom: '30px',}}>
                <div>
                  <h1 style={{fontSize: '16px',
                       fontWeight: 'bold',
                       color: '#000',
                       padding: '24px 8px 12px',
                       marginLeft: '30px',}}>Memo</h1>
                  <textarea
                    style={{width: '400px',
                         height: '230px',
                         marginLeft: '35px',
                         border: '1px solid #ccc',
                         outline: 'none',
                         resize: 'none', /* Prevent resizing */
                         overflowY: 'scroll',
                         marginBottom: '30px',}}
                    //  placeholder="Type here..."
                  />
                </div>

                <div style={{display: 'flex',
                     gap: '20px', /* Gap between form and textarea */
                     alignItems: 'flex-end', /* Align items to the start, to prevent stretching */
                     marginLeft: '100px',
                     marginTop: '30px',}}>
                  <div >
                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                      <label style={{flex: '1',
                           marginRight: '10px',
                           fontSize: '13px', color: 'black'}}>
                        Subtotal
                      </label>
                      <input
                      value={`Rs. ${subtotal.toFixed(2)}`}
                      readOnly
                        type="text"
                        style={{backgroundColor: '#F0F0F0', width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
                      />
                    </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                      <label style={{flex: '1',marginRight: '10px', fontSize: '13px', color: 'black'}}>
                          {selectedProduct?.gst / 2}% CGST on Rs. {subtotal.toFixed(2)}
                      </label>
                      <input
                        type="text"
                        value={`Rs. ${cgstAmount.toFixed(2)}`}
                        readOnly
                        style={{backgroundColor: '#F0F0F0', width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
                      />
                    </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                      <label style={{flex: '1', marginRight: '10px',fontSize: '13px', color: 'black'}}>
                        {selectedProduct?.gst / 2}% SGST on Rs. {subtotal.toFixed(2)}
                      </label>
                      <input
                        type="text"
                        value={`Rs. ${sgstAmount.toFixed(2)}`}
                        readOnly
                        style={{backgroundColor: '#F0F0F0', width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
                      />
                    </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                      <label style={{flex: '1', marginRight: '10px',fontSize: '13px', color: 'black'}}>
                         {selectedProduct?.cess}% CESS on Rs. {subtotal.toFixed(2)}
                      </label>
                      <input
                        type="text"
                        value={`Rs. ${cessAmount.toFixed(2)}`}
                        readOnly                        
                        style={{backgroundColor: '#F0F0F0', width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
                      />
                    </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                        <label style={{flex: '1',
                            marginRight: '10px',
                            fontSize: '13px', color: 'black'}}>
                          Discount Type
                        </label>
                      <select  
                      value={discountType}
                      onChange={handleDiscountTypeChange}
                      style={{width:'200px', height:'30px', fontSize:'12px', fontFamily:'Inter', border:'1px solid #ccc', borderRadius:'3px'}}>
                          <option value="select">Select</option>
                          <option value="percent">Percentage(%)</option>
                          <option value="flat">Flat (Rs.)</option>
                      </select>
                    </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>

                      <label style={{flex: '1',
                           marginRight: '10px',
                           fontSize: '13px', color: 'black'}}>
                        Discount Amount
                      </label>
                      <input 
                          type="text" 
                          value={discountAmount === 0 ? '' : discountAmount}
                          onChange={handleDiscountAmountChange} 
                          style={{width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
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
                           value={shippingCharge === 0 ? '' : shippingCharge}
                           onChange={handleShippingChargeChange}
                           type="text"
                           style={{ width: "200px", height: "30px", marginBottom:'10px', border:'1px solid #ccc', borderRadius:'4px', marginLeft:'10px' }} />
                        </div>

                        {isToggled && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom:'10px'}}>
                            <label>
                                Shipping GST %
                              <input type="text" placeholder="Shipping"
                                value={shippingGstPercent === 0 ? '' : shippingGstPercent}
                                onChange={handleShippingGstPercentChange}
                                style={{ marginLeft:'72px', width: "200px", height: "30px", border:'1px solid #ccc', borderRadius:'4px' }} />
                            </label>

                            <label>
                              Shipping Amount 
                              <input type="text" value={`Rs. ${shippingCharge}`} style={{ marginLeft:'68px',width: "200px", height: "30px", border:'1px solid #ccc', borderRadius:'4px' }} />
                            </label>
                            <label>
                                Shipping GST Amount
                               <input type="text"  
                                 value={`Rs. ${shippingGstAmount.toFixed(2)}`}
                                 readOnly
                                  style={{marginLeft:'37px', width: "200px", height: "30px", border:'1px solid #ccc', borderRadius:'4px' }} />
                            </label>
                          </div>
                        )}
                      </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                      <label style={{flex: '1',
                           marginRight: '10px',
                           fontSize: '13px', color: 'black'}}>
                        Round Off
                      </label>
                      <input
                        type="text"
                        value={roundOff}
                        onChange={handleRoundOffChange}                        
                        style={{backgroundColor: '#F0F0F0', width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
                      />
                    </div>

                    <div style={{display: 'flex',
                         alignItems: 'center',
                         marginBottom: '10px',}}>
                      <label style={{flex: '1',
                           marginRight: '10px',
                           fontSize: '13px', color: 'black'}}>
                        Total
                      </label>
                      <input
                        type="text"
                        value={`Rs. ${formData.total ? formData.total.toFixed(2) : "0.00"}`}
                        readOnly                        
                        style={{backgroundColor: '#F0F0F0', width:'200px', height:'30px', borderRadius:'5px', border:'1px solid #ccc'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
          {/* footer */}
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
        ) : (
          // Main Page Section
          <div style={{ minHeight: "100vh", width: "100%" }}>
          
          <div style={{
                 marginTop: '15px',
                 marginLeft: '5px',
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 marginBottom: '20px',
                 display:'flex'
            }}>
              <h2 style={{fontSize: '20px',
                   fontWeight: 'bold',}}>Bills</h2>
              <button style={{backgroundColor: '#74a535',
                   color: 'white',
                   padding: '10px 15px',
                   border: 'none',
                   borderRadius: '5px',
                   cursor: 'pointer',}} onClick={handleCreateNewClick}>
                + Create New
              </button>
            </div>

            {/* Filter and Table Section */}
            <div style={{padding: '20px',
                 backgroundColor: '#f9f9f9',
                 borderRadius: '10px',
                 height: '60%',
                 width: '100%',}}>
             {isFormVisible ? (
              <BillForm onSave={handleSave} />
             ) : (
              <>
              <div style={{ display: "flex", justifyContent:'space-between', marginBottom:'12px', borderBottom:'1px solid #ccc', paddingBottom:'25px' }}>
                {/* Filter Section */}
                <div style={{ display: "flex", gap: "10px" }}>
                  {/* custoemr name */}
                  <div style={{ position: "relative",
                       display: "inline-block",
                       width: "300px", }}>
                    <img  src={searchIcon}
                     style={{position: "absolute",
                         width:'16px',
                         height:'16px',
                        margin:'8px'}}  alt="searchIcon"/>
                    <input
                      type="text"
                      value={searchName}
                      onChange={handleSearchNameChange}
                      style={{width: "100%",
                           padding: "8px 12px 8px 35px",
                           fontSize: "14px",
                           border: "0.5px solid rgba(0, 0, 0, 1)",
                           borderRadius: "4px",
                           boxSizing: "border-box",
                           color: "rgba(0, 0, 0, 0.87)",}}
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
                        style={{ padding: "12px",height: "33px",
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
                  <button style={{width: '90px',height: '36px',border:'1px solid #ccc', borderRadius:'4px', color:'#fff', backgroundColor:'#74A535', fontSize:'14px', fontFamily:'Inter',fontWeight:'600'}} 
                      onClick={handleSearchClick}>
                      Search
                  </button>
                </div>
                {/* clear */}
                <button style={{width: '90px',height: '36px',border:'1px solid #ccc', borderRadius:'4px', color:'#fff', backgroundColor:'#74A535', fontSize:'14px', fontFamily:'Inter',fontWeight:'600'}}  
                    onClick={handleClearClick}>
                  Clear
                </button>
              </div>
                <div style={{display:'flex', justifyContent:'flex-end',marginTop:'25px', marginBottom:'10px'}}>
                   <select style={{width:'190px', height:'33px', border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'#F0F0F0 '}}>
                      <option value="per 50">Result Per Page 50</option>
                      <option value="per 100">Result Per Page 100</option>
                   </select>
                </div>
              {/* Table Section */}
              <table style={{width: "100%",
                   borderCollapse: "collapse",
                   background: "white",
                   border: "none",}}>
                <thead>
                  <tr style={{ backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Bill Number</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Payee/Vendor</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Bill Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Due Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Total Tax</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Total</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: 'none'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {filteredBills.length > 0 ? (
                filteredBills.map((bill, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', textAlign: 'left'}}>{bill.billNumber}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{bill.payeeVendor}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{formatDate(bill.billDate)}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{formatDate(bill.dueDate)}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{bill.totalTax}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{bill.total}</td>
                    {/* action */}
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
                        }}>
                        <div 
                        style={{
                            backgroundColor: "white",
                            width: "400px", // Increased width
                            height: "200px", // Increased height
                            padding: "20px",
                            borderRadius: "12px",
                            textAlign: "center",
                            border:'1px solid #ccc',
                        }}>
                        <div>
                          <img src={ic_warning} alt="information"
                            style={{
                                width:'73px',
                                height:'70px',
                                marginBottom:'20px'
                            }}/>
                            <div style={{ fontSize: "16px", alignContent:'center', fontFamily:'Inter'  }}>
                              <span>This can't be undone.</span>
                            </div>
                        </div>                
                        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop:'20px' }}>
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
          </div>
        )}
      </div>
  );
};

