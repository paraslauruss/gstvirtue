import React from "react";
import { useState, useEffect ,useRef} from "react";
import groupimage from "../../assets/images/Group@2x.png";
import { Card } from "@shopify/polaris";
import {  useLoaderData } from "@remix-run/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ic_edit from '../../assets/images/ic_edit.png';
import ic_info from '../../assets/images/ic_delete.png';
import ic_print from '../../assets/images/ic_print.png';
import ic_download from '../../assets/images/ic_download.png'
import ic_date from '../../assets/images/ic_date.png';
import ic_warning from '../../assets/images/ic_warning.jpg';
import searchIcon from '../../assets/images/searchIcon.png'
import axios from "axios";
import ExpenseInvoice from "./Invoices/ExpenseInvoice";
import { jsPDF } from "jspdf";
import ReactDOMServer from "react-dom/server";
import { arialBase64 } from "../templates/invoice/font/arial_unicode_ms";
import { arialBoldBase64 } from "../templates/invoice/font/arial_unicode_ms_bold";
import { robotoBase64 } from "../templates/invoice/font/roboto_base64";
import { poppinsRegularBase64 } from "../templates/invoice/font/poppins_regular";
import { poppinsBoldBase64 } from "../templates/invoice/font/poppins_bold";
import { rubikRegularBase64 } from "../templates/invoice/font/rubik_regular";
import { rubikBoldBase64 } from "../templates/invoice/font/rubik_bold";
import { calibriBoldBase64 } from "../templates/invoice/font/calibri_bold";
import { calibriRegularBase64 } from "../templates/invoice/font/calibri_regular";
import { helveticaRegularBase64 } from "../templates/invoice/font/helvetica_regular";
import { helveticaBoldBase64 } from "../templates/invoice/font/helvetica_bold";
import { verdanaRegularBase64 } from "../templates/invoice/font/verdana_bold";
import { verdanaBoldBase64 } from "../templates/invoice/font/verdana_regular";
import { ebgaramondRegularBase64 } from "../templates/invoice/font/ebgaramond_regular";
import { ebgaramondBoldBase64 } from "../templates/invoice/font/ebgaramond_bold";



export const Expenses = () => {
      const session = useLoaderData();
      const storeName = session?.storeName;
      const accessToken = session?.accessToken;

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    expenseDate: "",
    status: "",
    dueDate: "",
    paymentMethod: "",
    RefNumber: "",
    items: [], 
    payees:"",
    billNumber: "",
    total: 0,
    totalTax: 0,
    expenseCategoryValue: "",
    gstPercentage:"",
    rate:0,
  });

    const [expense, setExpense] = useState([]);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [apiURL, setApiURL] = useState('http://localhost:3001/api/expense'); // Check this, this can stop all functions from properly working
    const [method, setMethod] = useState("POST");

    const handleSave = async () => {
        try {
            let apiURL = 'http://localhost:3001/api/expense';
            let method = 'POST';
            let itemToEditId = null;
    
            if (isEditing && editIndex !== null && filteredExpenses[editIndex] && filteredExpenses[editIndex]._id) {
                itemToEditId = filteredExpenses[editIndex]._id;
                apiURL = `http://localhost:3001/api/expense/${itemToEditId}`;
                method = 'PUT';
                console.log("Editing Bill with ID:", itemToEditId); //Debugging
            }
            else {
                console.log("Creating new Bill.");
            }
    
            const expenseData = {
              ...formData,  
              amount,       
              cgstAmount,  
              sgstAmount,
              rate: rate,
              discountPercent: formData.discountPercent,
              discountFlat: formData.discountFlat,
              gstPercentage: gstPercentage ,
              expenseCategoryValue: formValues.expenseCategoryValue,
          };

          console.log("Saving Expense:", expenseData); // Debugging
            const headers = {
                'Content-Type': 'application/json',
                'api-version': '2025-01',
                'store-name': storeName,
                'access-token': accessToken,
            };
    
            const response = await fetch(apiURL, {
                method: method,
                headers: headers,
                body: JSON.stringify(expenseData),
            });
            if (response.ok) {
                const newExpense = await response.json();
                // Fetch all payees to update the UI
                const fetchResponse = await fetch('http://localhost:3001/api/expense', {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-version': '2025-01',
                        'store-name': storeName,
                        'access-token':accessToken,
                    }
                });
                if (fetchResponse.ok) {
                    const fetchedExpense = await fetchResponse.json();
                    setExpense(fetchedExpense);
                    setFilteredExpenses(fetchedExpense);
                } else {
                    console.error('Failed to fetch expesne:', fetchResponse.statusText);
                    alert(`Failed to fetch expense: ${fetchResponse.statusText}`);
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
                console.error('Failed to save/update expense:', response.status, response.statusText, await response.text());
                alert(`Failed to save/update expense: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error saving/updating expense:', error);
            alert(`Error saving/updating expense: ${error.message}`);
        }
    };
      // useEffect hook to load expense from localStorage on component mount
      useEffect(() => {
        const fetchExpense = async () => {
          try {
                const response = await fetch('http://localhost:3001/api/expense', {
                     headers: {
                        'Content-Type': 'application/json',
                        'api-version': '2025-01',
                        'store-name': session.storeName,
                        'access-token': session.accessToken,
                    }
                });
            if (response.ok) {
              const data = await response.json();
              setExpense(data);
              setFilteredExpenses(data);
            } else {
              console.error('Failed to fetch Expense:', response.statusText);
              alert(`Failed to fetch Expense: ${response.statusText}`);
            }
          } catch (error) {
            console.error('Error fetching Expense:', error);
            alert(`Error fetching Expense: ${error.message}`);
          }
        };
    
        fetchExpense();
      }, [isFormVisible]);
    

      const resetForm = () => {
        setFormData({
          expenseDate: "",
          status: "",
          dueDate: "",
          paymentMethod: "",
          RefNumber: "",
          items: [],
          payess:"",
          billNumber: "",
        });
        setDate(null);
        setFilteredExpenses([])
  };  
    const handleSaveChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
          // Filter bills based on input
          if (name === "payees" && value.length >= 2) {
            const filtered = expense.filter((expense) =>
              expense.payees.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredExpenses(filtered);
            setShowDropdown(true);
          } else {
            setFilteredExpenses([]);
            setShowDropdown(false);
          }
    };

    const handleCreateNewClick = () => {
      setIsFormVisible(true);
    };

  const handleImageClick = () => {
    setIsFormVisible(!isFormVisible); // Toggle the visibility
  };
  
  // FETCH CUSTOMER NAMES 
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

        // Log to debug API response structure
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
          payees: value,
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
  // SUGGESTIONS
  const handleSelectSuggestion = (customer) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payees: `${customer.first_name} ${customer.last_name}`, // Fix: Update payess
    }));
    setFilteredCustomers([]);
    setShowDropdown(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // expense DATE
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDateChange = (date) => {
    if (!date) return;
  
  // Convert to local date without time shift
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() // Ensures only date is stored
  );

  setFormData((prevData) => ({
    ...prevData,
    expenseDate: localDate.toISOString().split("T")[0], // Store only date part
  }));
  setIsOpen(false);
  };
  // expense type selection
  const expenseOptions = [
    { value: "", label: "Search Expense..." },
    { value: "marketing", label: "Advertising And Marketing" },
    { value: "automobile", label: "Automobile Expense" },
    { value: "debt", label: "Bad Debt" },
    { value: "bank", label: "Consultant Expense" },
    { value: "Contract", label: "Contract Assets" },
    { value: "credit", label: "Credit Card Charges" },
    { value: "depreciation", label: "Depreciation And Amortisation" },
    { value: "expense", label: "Depreciation Expense" },
    { value: "IT", label: "It And Internet Expense" },
    { value: "jamotorial", label: "Janitorial Expense" },
    { value: "meals", label: "Meals And Entertainment" },
    { value: "mech", label: "Merchandise" },
    { value: "office", label: "Office Supplies" },
    { value: "other", label: "Other Expenses" },
    { value: "post", label: "Postage" },
    { value: "print", label: "Printing And Stationery" },
    { value: "raw", label: "Raw materials And Consumables" },
    { value: "rent", label: "Rent Expense" },
    { value: "repairs", label: "Repairs And Maintainence" },
    { value: "salary", label: "Salaries And Employee Wages" },
    { value: "tele", label: "Telephone Expense" },
    { value: "tranport", label: "Transportation Expense" },
    { value: "travel", label: "Travel Expense" },
  ];

  const [formValues, setFormValues] = useState({
    expenseCategoryValue: "", // this is what gets saved to backend
    // add other form fields if needed
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Find the selected option's label
    const selectedOption = expenseOptions.find(option => option.value === value);
    const selectedLabel = selectedOption ? selectedOption.label : "";
  
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedLabel, // Save the LABEL instead of value
    }));
  };

  // AMOUNT CALCULATIONS
  const [gstPercentage, setGstPercentage] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [discountType, setDiscountType] = useState('select');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [total, setTotal] = useState(0);

   // GST Change Handler
   const handleGstChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (!isNaN(value)) {
      setGstPercentage(value);
      updateAmount(rate, value);
  }
  };

  // Function to calculate GST, CGST, SGST
  const calculateGST = () => {
    const gstValue = parseFloat(gstPercentage) || 0;
    const halfGst = gstValue / 2;
    setCgstAmount(amount * (halfGst / 100));
    setSgstAmount(amount * (halfGst / 100));
  };
    // Rate change handler
    const handleRateChange = (e) => {
      const value = e.target.value;
      if (!isNaN(value)) {
          setRate(value);
          updateAmount(value, gstPercentage);
      }
  };
    // Amount change handler
    const handleAmountChange = (e) => {
      const newAmount = parseFloat(e.target.value) || 0;
      setAmount(newAmount);
    };
      // Discount Type Change Handler
      const handleDiscountTypeChange = (e) => {
        setDiscountType(e.target.value);
      };
  // Discount Amount Change Handler
    const handleDiscountAmountChange = (e) => {
      const value = parseFloat(e.target.value) || 0;
      setDiscountAmount(value);
    };
  // Function to calculate subtotal, discount, total, and GST when rate or amount changes
      useEffect(() => {
        calculateSubtotal();
        calculateGST(); //Recalculate GST
      }, [rate, amount,discountType, discountAmount, gstPercentage]);


      const calculateSubtotal = () => {
        let newSubtotal = amount;

        // Calculate discount
        if (discountType === 'percent') {
          newSubtotal = amount - (amount * (discountAmount / 100));
        } else if (discountType === 'flat') {
          newSubtotal = amount - discountAmount;
        }

        setSubtotal(newSubtotal > 0 ? newSubtotal : 0); // Ensure subtotal is not negative
      };

      useEffect(() => {
        calculateTotal();
      }, [subtotal, cgstAmount, sgstAmount, discountType, discountAmount]);

      const calculateTotal = () => {
        let newTotal = subtotal + cgstAmount + sgstAmount;
        setTotal(newTotal);
        setFormData(prevFormData => ({
          ...prevFormData,
          total: newTotal,
          totalTax: cgstAmount + sgstAmount
      }));
      };

      // ADD ITEMS
      const [showItemFields, setShowItemFields] = useState(false);
      const [itemFields, setItemFields] = useState([]);
  
      const updateAmount = (newRate, newGst) => {
          const rateValue = parseFloat(newRate) || 0;
          const gstValue = parseFloat(newGst) || 0;
          setAmount(rateValue * (1 + (gstValue / 100)));
      };

      const handleAddItemClick = () => {
          setItemFields([...itemFields, { id: Date.now() }]);
      };

      const handleRemoveItem = (id) => {
          setItemFields(itemFields.filter(item => item.id !== id));
      };
      
      //   DELTE THE ENTRY
       const [showDeletePopup, setShowDeletePopup] = useState(false);
            const [expenseToDelete, setExpenseToDelete] = useState(null);
            const handleDeleteClick = (index) => {
              setExpenseToDelete(index);
              setShowDeletePopup(true);
            };
            const handleConfirmDelete = async () => {
              if (expenseToDelete === null || expenseToDelete >= filteredExpenses.length) {
                  console.error("Invalid expenseToDelete index:", expenseToDelete);
                  alert("Invalid expense selection. Please try again.");
                  return;
              }
          
              try {
                  const itemToDelete = filteredExpenses[expenseToDelete];
                  if (!itemToDelete || !itemToDelete._id) {
                      console.error("Item to delete not found or missing _id:", itemToDelete);  
                      return;
                  }
                  const itemToDeleteId = itemToDelete._id;
                  const deleteUrl = `http://localhost:3001/api/expense/${itemToDeleteId}`;
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
                  const fetchResponse = await fetch('http://localhost:3001/api/expense', {
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
          
                  const updatedExpense = await fetchResponse.json();
                  setExpense(updatedExpense);
                  setFilteredExpenses(updatedExpense);
          
              } catch (error) {
                  console.error("Error deleting item:", error);
              } finally {
                  setShowDeletePopup(false);
              }
          };
      // EDIT ICON
            const [isEditing, setIsEditing] = useState(false);
            const [editIndex, setEditIndex] = useState(null);
            const handleEditClick = (index) => {
              setEditIndex(index); // Store the index of the item being edited
              setIsFormVisible(true); // Show the form
              setIsEditing(true);
              const expenseToEdit = filteredExpenses[index]; // Correct array!
              // Ensure expenseToEdit exists before accessing its properties
              if (expenseToEdit) {
                  setFormData((prevFormData) => ({  // Update formData correctly
                      ...prevFormData, // Include this line
                      expenseDate: expenseToEdit.expenseDate || "",
                      RefNumber: expenseToEdit.RefNumber || "",
                      payees: expenseToEdit.payees || "", // Correct field name!
                      totalTax: expenseToEdit.totalTax || 0, //Initialize to be 0 if no value
                      total: expenseToEdit.total || 0, //Initialize to be 0 if no value
                      status: expenseToEdit.status || "",
                      paymentMethod: expenseToEdit.paymentMethod || "Net 15", // Assuming a default
                  }));
          
                  try {
                      setStartDate(expenseToEdit.startDate ? new Date(expenseToEdit.startDate) : null);
                  } catch (error) {
                      console.error("Error parsing dates:", error);
                      setStartDate(null);
                  }
              } else {
                  console.warn(`Expense at index ${index} not found. Check your expenses array.`);
              }
          };

      // DATE PICKER
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
      const [filteredExpenses, setFilteredExpenses] = useState([]);  

      const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
      };
  
      // Function to clear input fields and reset data to original expenses
      const handleClearClick = () => {
          setSearchName('');
          setDate(null);
          setEndDate(null);
          setFilteredExpenses(expense) // set filtered expenses back to all expenses
      };
      const handleSearchClick = () => {
        let filteredData = [...expense];
  
        // filter to name
        if (searchName) {
            filteredData = filteredData.filter(expense =>
              expense.payees && expense.payees.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        //Date validation
        if (date && endDate) {
          filteredData = filteredData.filter(exp => {
            const expenseDate = exp.expenseDate ? new Date(exp.expenseDate) : null;
            if(!expenseDate || isNaN(expenseDate.getTime())){
              console.warn(`Invalid date found:${exp.expenseDate}. Skipping data filetering for this...` );
              return true;
            }
            const expenseDateTime = expenseDate.getTime();
            const startDatemtime = date.getTime();
            const endDateTime = endDate.getTime();

            return expenseDateTime >= startDatemtime && expenseDateTime <= endDateTime;
          })
        }
        setFilteredExpenses(filteredData) // Update the filteredData
    };
     //date format
  function formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const date = new Date(dateString);
      const formattedDate = isNaN(date.getTime()) ? new Date().toLocaleDateString('en-GB', options) : date.toLocaleDateString('en-GB', options);;
      return formattedDate;
  }  

  const [storeData, setStoreData] = useState(null);
  useEffect(() => {
    const fetchStoreData = async () => {
        if (storeName) { 
            setIsLoading(true); 
            try {
                const response = await fetch(`http://localhost:3001/api/settings/${storeName}`,{
                  headers:{
                      "api-version":'2025-01',
                      "access-token":accessToken,
                      "store-name":storeName
                  }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStoreData(data);
                    console.log("Store data:", data);
                } else {
                    console.error("Error fetching store data:", response.status, await response.text());
                }
            } catch (error) {
                console.error("ErrorHandle fetching store data:", error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching, regardless of success or failure
            }
        }
    };
    fetchStoreData(); // Call the async function inside the effect
    }, [storeName]);

    useEffect(() => {
      const fetchExpenseData = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/expense", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "api-version":'2025-01',
              "access-token":accessToken,
              "store-name":storeName
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setExpense(data); 
        } catch (error) {
          console.error("Failed to fetch expenses:", error);
        }
      };
  
      fetchExpenseData();
    }, []);

      const handleDownload = async () => {
          const fileName = "Expense";
          try {
              // PDF content generate karna
              const htmlContent = generateInvoiceHtml();
              // Create a new PDF document
              const pdf = new jsPDF({
                  orientation: "portrait",
                  unit: "mm",
                  format: "a4",
              });
  
              // pdf.addFileToVFS("ArialUnicodeMS-Bold.ttf", arialBoldBase64);
              // pdf.addFont("ArialUnicodeMS-Bold.ttf", "ArialUnicodeMS", "bold");
              // // Normal font add karna
              // pdf.addFileToVFS("ArialUnicodeMS.ttf", arialBase64);
              // pdf.addFont("ArialUnicodeMS.ttf", "ArialUnicodeMS", "normal");
              // pdf.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
              // pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  
              // pdf.addFileToVFS("Roboto-Bold.ttf", robotoBase64);
              // pdf.addFont("Roboto-Bold.ttf", "Roboto", "bold");
              // // Normal font set karna
              // pdf.setFont("ArialUnicodeMS", "normal");
              // // Bold text set karna
              // pdf.setFont("ArialUnicodeMS", "bold");
  
              // pdf.setFont("Roboto", "normal");
              // pdf.setFont("Roboto", "bold");
              // // Poppins Regular
              // pdf.addFileToVFS("Poppins-Regular.ttf", poppinsRegularBase64);
              // pdf.addFont("Poppins-Regular.ttf", "Poppins", "normal");
  
              // // Poppins Bold
              // pdf.addFileToVFS("Poppins-Bold.ttf", poppinsBoldBase64);
              // pdf.addFont("Poppins-Bold.ttf", "Poppins", "bold");
              // pdf.setFont("Poppins", "normal");
              // pdf.setFont("Poppins", "bold");
  
              // // Rubik Regular
              // pdf.addFileToVFS("Rubik-Regular.ttf", rubikRegularBase64);
              // pdf.addFont("Rubik-Regular.ttf", "Rubik", "normal");
  
              // // Rubik Bold
              // pdf.addFileToVFS("Rubik-Bold.ttf", rubikBoldBase64);
              // pdf.addFont("Rubik-Bold.ttf", "Rubik", "bold");
  
              // pdf.setFont("Rubik", "normal");
              // pdf.setFont("Rubik", "bold");
  
              // // Calibri Regular
              // pdf.addFileToVFS("Calibri.ttf", calibriRegularBase64);
              // pdf.addFont("Calibri.ttf", "Calibri", "normal");
  
              // // Calibri Bold
              // pdf.addFileToVFS("Calibri-Bold.ttf", calibriBoldBase64);
              // pdf.addFont("Calibri-Bold.ttf", "Calibri", "bold");
  
              // pdf.setFont("Calibri", "normal");
              // pdf.setFont("Calibri", "bold");
  
              // pdf.addFileToVFS("Helvetica.ttf", helveticaRegularBase64);
              // pdf.addFont("Helvetica.ttf", "Helvetica", "normal");
  
              // pdf.addFileToVFS("Helvetica-Bold.ttf", helveticaBoldBase64);
              // pdf.addFont("Helvetica-Bold.ttf", "Helvetica", "bold");
  
              // pdf.setFont("Helvetica", "normal");
              // pdf.setFont("Helvetica", "bold");
  
              // // Verdana Normal Font
              // pdf.addFileToVFS("Verdana.ttf", verdanaRegularBase64);
              // pdf.addFont("Verdana.ttf", "Verdana", "normal");
  
              // // Verdana Bold Font
              // pdf.addFileToVFS("Verdana-Bold.ttf", verdanaBoldBase64);
              // pdf.addFont("Verdana-Bold.ttf", "Verdana", "bold");
  
              // pdf.setFont("Verdana", "normal");
              // pdf.setFont("Verdana", "bold");
  
              // // EB Garamond Normal Font
              // pdf.addFileToVFS("EBGaramond-Regular.ttf", ebgaramondRegularBase64);
              // pdf.addFont("EBGaramond-Regular.ttf", "EBGaramond", "normal");
  
              // // EB Garamond Bold Font
              // pdf.addFileToVFS("EBGaramond-Bold.ttf", ebgaramondBoldBase64);
              // pdf.addFont("EBGaramond-Bold.ttf", "EBGaramond", "bold");
  
              // pdf.setFont("EBGaramond", "normal");
              // pdf.setFont("EBGaramond", "bold");
  
              // Add the HTML content as text
              pdf.html(htmlContent, {
                  callback: (doc) => {
                      doc.save(`${fileName}.pdf`);
                  },
                  x: 2,
                  y: 2,
                  html2canvas: {
                      scale: 0.2 ,
                      allowTaint: true,
                      useCORS: true,
                  },
                  width: 210,
                  windowWidth: 1500,
              });
          } catch (error) {
              console.error("PDF generation failed:", error);
          }
      };
      // customize labels code
      const [customLabels, setCustomLabels] = useState(null);
      useEffect(() => {
        const fetchCustomizeLabels = async () => {
          try {
            const response = await fetch('http://localhost:3001/api/customize-label', {
              headers: {
                "api-version": '2025-01',
                "store-name": storeName,
                "access-token": accessToken
              }
            });
            const data = await response.json();
            setCustomLabels(data);
          } catch (error) {
            console.error("Failed to fetch customize labels:", error);
          }
        };

       fetchCustomizeLabels();
      }, []);
  
  // HTML content ko string ke roop me return kiya
    const generateInvoiceHtml = () => {
        // React component ko HTML string me convert kiya
        return ReactDOMServer.renderToString(
            <div style={{ width: "270mm", padding: "1mm", lineHeight: "1.0", textAlign: "center", }}>
               { <ExpenseInvoice
                  expense={selectedExpense}
                  customLabels={customLabels}
                  storeData={storeData}
                  logo={logo}
                />
              }
            </div>
         );
      };
        const [isPopupOpen, setIsPopupOpen] = useState(false);
        const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
        const [activeButtonIndex, setActiveButtonIndex] = useState(null);
        const buttonRefs = useRef([]);
        const [downloadOrder, setDownloadOrder] = useState(null);
        const popupRef = useRef(null);
        const [selectedExpense, setSelectedExpense] = useState(null);

        const handleButtonClick = ({ expense, index }) => {
            const buttonRef = buttonRefs.current[index];
            console.log("Expense Invoice", expense);
            setSelectedExpense(expense);
            if (buttonRef) {
                setDownloadOrder(expense);
                const rect = buttonRef.getBoundingClientRect();
                setPopupPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX
                });
                setActiveButtonIndex(index);
            }
            setIsPopupOpen((prev) => !prev);
        };
    
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    popupRef.current &&
                    !popupRef.current.contains(event.target) &&
                    !buttonRefs.current.some(ref => ref && ref.contains(event.target))
                ) {
                    setIsPopupOpen(false);
                }
            };
    
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
    
        const logo = (<div>
          <input type="file" accept="image/*" id="logoInput" style={{ display: "none" }} />
          {storeData?.logo_image ? (
              <img
                  src={`http://localhost:3001/${storeData?.logo_image}`}
                  alt="Logo"
                  id="logoImage"
                  style={{ cursor: 'pointer', width: "250px", height: "125px" }}
              />
          ) : null}
      </div>);

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
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '10px',
            marginTop: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={groupimage} alt="Group Icon" style={{ width: '22px', height: '22px', marginRight: '8px', cursor:'pointer' }} 
                 onClick={handleImageClick}
              />
              <span style={{ fontSize: '20px', fontWeight: '600' }}>Create New Expenses</span>
            </div>
            <button style={{
              width: '100px',
              height: '33px',
              backgroundColor: '#5c8e29',
              color: 'white',
              fontSize: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer'
            }} onClick={handleSave}>
              Save
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
          
          <div style={{border:'1px solid #ccc', borderRadius:'5px',padding:'12px 12px'}}>
          <div style={{ display: "flex", marginBottom: "20px" }}>
                {/* PAYESS */}
              <div style={{ width: "100%", position: "relative" }}>
                    <label>
                      <h1 style={{fontSize: "15px", color: "black",marginBottom: "8px",}} >
                        Payees/Vendor <span style={{color:'red'}}>*
                        </span>
                      </h1>
                      <input
                        type="text"
                        name="payees"
                        value={formData.payees}
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
                  {/* DATE */}
                 <div style={{ width: "100%",position:'relative',overflow: "visible"}}>
                      <label>
                        <h1 style={{ fontSize: "15px", color: "black", marginBottom: "8px" }}>
                          Expense Date
                          <span style={{color:'red'}}>*</span>
                        </h1>
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
                              position: "relative",
                          }}
                            onClick={() => setIsOpen(!isOpen)}>
                            <span>{formData.expenseDate ? new Date(formData.expenseDate).toLocaleDateString() : "Select Date"}</span>
                          </div>
                          {/* DatePicker Component */}
                          {isOpen && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: '0',
                                zIndex: 2, // Ensures it's above everything
                                background: "#fff",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                borderRadius: "4px",
                                overflow: "visible", 
                                width:'auto'
                              }}>
                              <DatePicker
                                selected={formData.expenseDate ? new Date(formData.expenseDate) : null}
                                onChange={handleDateChange}
                                inline 
                              />
                            </div>
                          )} 
                      </label>  
                  </div>
                  {/* Status */}
                <div style={{ width: "100%" }}>
                  <label>
                    <h1 style={{ fontSize: '15px', color: 'black', marginBottom: '8px' }}>
                        Status <span style={{color:'red'}}>*
                      </span></h1>
                    <select
                      style={{
                        width: '94%',
                        height: '33px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        appearance: 'none',
                        backgroundColor: "#F8F8F8",
                        padding:'8px',
                        fontSize:'14px',
                        fontFamily:'Inter'
                      }}
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="select">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                    </select>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex" }}>
                {/* Payment Method */}
                <div style={{ width: "100%" }}>
                  <label>
                    <h1 style={{ fontSize: '15px', color: 'black', marginBottom: '8px' }}>Payement Method:</h1>
                    <select style={{
                      width: '90%',
                      height: '30px',
                      border: '1px solid #ccc',
                      borderRadius: '3px',
                      appearance: 'none',
                      backgroundColor: '#F8F8F8',
                      padding:'6px',
                      fontSize:'14px',
                      fontFamily:'Inter',
                    }}
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                    >
                      <option value="select">Select Payment Method</option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="credit">Credit Card</option>
                    </select>
                  </label>
                </div>
                {/* Reference Number */}
                <div style={{ width: "100%" }}>
                  <label>
                    <h1 style={{ fontSize: '15px', color: 'black', marginBottom: '8px' }}>Ref Number:</h1>
                    <input
                      type="text"
                      name="RefNumber"
                      value={formData.RefNumber}
                      onChange={handleInputChange}
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        width: '90%',
                        height: '30px',
                        backgroundColor: '#F8F8F8'
                      }}
                    />
                  </label>
                </div>
              </div>
          </div>
           
          </div>               
                {/* Item Details */}
          <div style={{
             border:'1px solid #ccc',
             borderRadius:'10px',
          }}>
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

              <div
                style={{
                  padding: "10px",
                  width: "100%",
                  padding:'20px',
                  margin:'20px auto'
                }}
              >
                {/* Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr ",
                    gap: "10px",
                    borderBottom: "1px solid #E2E2E2",
                    paddingBottom: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize:'14px', fontFamily:'Inter' }}>
                    Expense Type<span style={{ color: "red" }}>*</span>
                  </div>

                  <div style={{ fontWeight: "bold",fontSize:'14px', fontFamily:'Inter' }}>GST %</div>
                  <div style={{ fontWeight: "bold",fontSize:'14px', fontFamily:'Inter' }}>
                    Rate<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ fontWeight: "bold",fontSize:'14px', fontFamily:'Inter' }}>
                    Amount<span style={{ color: "red" }}>*</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    gap: "6px",
                    alignItems: "center",
                    borderBottom:'1px solid #ccc',
                    paddingBottom:'10px'
                  }}
                >
                  <div>
                    <select   
                      name="expenseCategoryValue"
                      value={expenseOptions.find(option => option.label === formValues.expenseCategoryValue)?.value || ""}
                      onChange={handleChange}
                    style={{
                        width: "95%",
                        padding: "5px",
                        borderRadius: "3px",
                        border: "1px solid #ccc",
                        fontSize: '14px',
                        fontFamily: 'Inter',
                        height:'33px',
                        maxHeight: '198px',  
                        overflowY: 'auto',   
                        boxSizing: 'border-box',
                      }}
                    >
                      {expenseOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      {/* <option value="">Search Expense...</option>
                      <option value="marketing">Advertising And Marketing</option>
                      <option value="automobile">Automobile Expense</option>
                      <option value="debt">Bad Debt</option>
                      <option value="bank">Consultant Expense</option>
                      <option value="Contract">Contract Assets</option>
                      <option value="credit">Credit Card Charges</option>
                      <option value="depreciation">Depreciation And Amortisation</option>
                      <option value="expense">Depreciation Expense</option>
                      <option value="IT">It And Internet Expense</option>
                      <option value="jamotorial">Janitorial Expense</option>
                      <option value="meals">Meals And Entertainment</option>
                      <option value="mech">Merchandise</option>
                      <option value="office">Office Supplies</option>
                      <option value="other">Other Expenses</option>
                      <option value="post">Postage</option>
                      <option value="print">Printing And Stationery</option>
                      <option value="raw">Raw materials And Consumables</option>
                      <option value="rent">Rent Expense</option>
                      <option value="repairs">Repairs And Maintainence</option>
                      <option value="salary">Salaries And Employee Wages</option>
                      <option value="tele">Telephone Expense</option>
                      <option value="tranport">Transportation Expense</option>
                      <option value="travel">Travel Expense</option> */}
                    </select>
                  </div>
                  {/* GST */}
                  <div>
                    <input
                      type="text"
                      placeholder="0"
                      style={{
                        width: "70%",
                        height:'33px',
                        padding: "5px",
                        borderRadius: "3px",
                        border: "1px solid #ccc",
                        textAlign:'right'
                      }}
                      value={gstPercentage + "%"}
                      onChange={handleGstChange}
                      onBlur={(e) => {
                        if (e.target.value && !e.target.value.endsWith('%')) {
                            setGstPercentage(gstPercentage)
                        }
                      }}
                    />
                  </div>
                   {/* RATE */}
                  <div>
                    <input
                      type="text"
                      style={{
                        width: "60%",
                        height:'33px',
                        padding: "5px",
                        borderRadius: "3px",
                        border: "1px solid #ccc",
                       
                      }}
                      value={rate}
                      onChange={handleRateChange}
                    />
                  </div>
                    {/* AMount */}
                  <div>
                    <input
                      type="text"
                      placeholder="Rs.0.0"
                      style={{
                        width: "80%",
                        height:'33px',
                        padding: "5px",
                        borderRadius: "3px",
                        border: "1px solid #ccc",
                        backgroundColor: "#F8F8F8",
                      }}
                      value={`Rs. ${amount.toFixed(2)}`}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>
                <div>
    
                  {itemFields.map((item) => (
                      <div key={item.id} style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 1fr 1fr 0.2fr",
                          gap: "6px",
                          alignItems: "center",
                          borderBottom: '1px solid #ccc',
                          paddingBottom: '10px',
                          marginTop: '10px'
                      }}>
                          <div>
                              <select
                             
                                  style={{
                                      width: "100%",
                                      padding: "5px",
                                      borderRadius: "3px",
                                      border: "1px solid #ccc",
                                      fontSize: '14px',
                                      fontFamily: 'Inter',
                                      height: '33px',
                                      maxHeight: '198px',
                                      overflowY: 'auto',
                                      boxSizing: 'border-box',
                                  }}
                              >
                                  <option value="">Search Expense...</option>
                                  <option value="marketing">Advertising And Marketing</option>
                                  <option value="automobile">Automobile Expense</option>
                                  <option value="debt">Bad Debt</option>
                                  <option value="bank">Consultant Expense</option>
                                  <option value="Contract">Contract Assets</option>
                                  <option value="credit">Credit Card Charges</option>
                                  <option value="depreciation">Depreciation And Amortisation</option>
                                  <option value="expense">Depreciation Expense</option>
                                  <option value="IT">It And Internet Expense</option>
                                  <option value="jamotorial">Janitorial Expense</option>
                                  <option value="meals">Meals And Entertainment</option>
                                  <option value="mech">Merchandise</option>
                                  <option value="office">Office Supplies</option>
                                  <option value="other">Other Expenses</option>
                                  <option value="post">Postage</option>
                                  <option value="print">Printing And Stationery</option>
                                  <option value="raw">Raw materials And Consumables</option>
                                  <option value="rent">Rent Expense</option>
                                  <option value="repairs">Repairs And Maintainence</option>
                                  <option value="salary">Salaries And Employee Wages</option>
                                  <option value="tele">Telephone Expense</option>
                                  <option value="tranport">Transportation Expense</option>
                                  <option value="travel">Travel Expense</option>
                              </select>
                          </div>
                          {/* GST */}
                          <div>
                              <input
                                  type="text"
                                  placeholder="0"
                                  style={{
                                      width: "72%",
                                      height: '33px',
                                      padding: "5px",
                                      borderRadius: "3px",
                                      border: "1px solid #ccc",
                                      textAlign: 'right',
                                      marginLeft:'18px'
                                  }}
                                  value={gstPercentage + "%"}
                                  onChange={handleGstChange}
                                  onBlur={(e) => {
                                      if (e.target.value && !e.target.value.endsWith('%')) {
                                          setGstPercentage(gstPercentage)
                                      }
                                  }}
                              />
                          </div>
                          {/* RATE */}
                          <div>
                              <input
                                  type="text"
                                  style={{
                                      width: "65%",
                                      height: '33px',
                                      padding: "5px",
                                      borderRadius: "3px",
                                      border: "1px solid #ccc",
                                      marginLeft:'20px'
                                  }}
                                  value={rate}
                                  onChange={handleRateChange}
                              />
                          </div>
                          {/* AMount */}
                          <div>
                              <input
                                  type="text"
                                  placeholder="Rs.0.0"
                                  style={{
                                      width: "84%",
                                      height: '33px',
                                      padding: "5px",
                                      borderRadius: "3px",
                                      border: "1px solid #ccc",
                                      backgroundColor: "#F8F8F8",
                                      marginLeft:'30px'
                                  }}
                                  value={`Rs. ${amount.toFixed(2)}`}
                                  onChange={handleAmountChange}
                              />
                          </div>
                          <div>
                              <button onClick={() => handleRemoveItem(item.id)} 
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
                              }}>
                                  X
                              </button>
                          </div>              
                      </div>
                  ))}
                  </div>
                <div style={{ textAlign: "left", marginTop: "15px" }}>
                    <button
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#74A535",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: '14px',
                        fontFamily: 'Inter'
                      }}
                      onClick={handleAddItemClick}
                    >
                      + Add Item
                    </button>
                  </div>
             </div>
           </div>
               {/* MEMO PART */}
               <div style={{
                    display: 'flex',
                    border: '1px solid #E0E0E0',
                    padding: '8px 10px',
                    marginTop: '30px',
                    borderRadius: '7px',
                    marginBottom: '30px',
                    justifyContent: 'space-between', // Ensures the two sections are spread out evenly
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
                            height: '100px',
                            marginLeft: '35px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            resize: 'vertical',
                            overflowY: 'scroll',
                            marginBottom: '30px'
                          }}
                        />
                    </div>      

                    <div style={{
                      width: '48%', // Equal width for both textarea and subtotal divs
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: '10px',
                      marginTop: '50px',
                      marginBottom:'10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{
                          flex: '0 0 120px', 
                          textAlign: 'left', 
                          marginRight: '10px', 
                          fontSize: '13px', 
                          color: 'black'
                        }}>
                          Subtotal
                        </label>
                        <input 
                          type="text" 
                          placeholder="Rs 0.0" 
                          value={`Rs. ${subtotal.toFixed(2)}`}
                          style={{
                            backgroundColor: '#E0E0E0', 
                            flex: '1', 
                            padding: '5px', 
                            border: '1px solid #ddd', 
                            borderRadius: '2px', 
                            fontSize: '13px', 
                            height: '30px',
                          }} 
                          readOnly
                        />
                      </div>
                      {gstPercentage && (
                            <>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <label style={{
                                  flex: '0 0 120px',
                                  textAlign: 'left',
                                  marginRight: '10px',
                                  fontSize: '13px',
                                  color: 'black'
                                }}>
                                  CGST
                                </label>
                                <input
                                  type="text"
                                  value={`Rs. ${cgstAmount.toFixed(2)}`}
                                  style={{
                                    backgroundColor: '#E0E0E0',
                                    flex: '1',
                                    padding: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '2px',
                                    fontSize: '13px',
                                    height: '30px'
                                  }}
                                  readOnly
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <label style={{
                                  flex: '0 0 120px',
                                  textAlign: 'left',
                                  marginRight: '10px',
                                  fontSize: '13px',
                                  color: 'black'
                                }}>
                                  SGST
                                </label>
                                <input
                                  type="text"
                                  value={`Rs. ${sgstAmount.toFixed(2)}`}
                                  style={{
                                    backgroundColor: '#E0E0E0',
                                    flex: '1',
                                    padding: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '2px',
                                    fontSize: '13px',
                                    height: '30px'
                                  }}
                                  readOnly
                                />
                              </div>
                            </>
                          )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{
                          flex: '0 0 120px', 
                          textAlign: 'left', 
                          marginRight: '10px', 
                          fontSize: '13px', 
                          color: 'black'
                        }}>
                          Discount Type
                        </label>
                        <select 
                          style={{
                            flex: '1', 
                            padding: '5px', 
                            border: '1px solid #ddd', 
                            fontSize: '13px', 
                            height: '30px'
                          }}
                          value={discountType}
                          onChange={handleDiscountTypeChange}
                        >
                          <option value="select">Select</option>
                          <option value="percent">Percentage(%)</option>
                          <option value="flat">Flat(Rs)</option>

                        </select>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{
                          flex: '0 0 120px', 
                          textAlign: 'left', 
                          marginRight: '10px', 
                          fontSize: '13px', 
                          color: 'black'
                        }}>
                          Discount Amount
                        </label>
                        <input 
                          type="text" 
                          style={{
                            flex: '1', 
                            padding: '5px', 
                            border: '1px solid #ddd', 
                            borderRadius: '2px', 
                            fontSize: '13px', 
                            height: '30px'
                          }} 
                          value={discountAmount}
                          onChange={handleDiscountAmountChange}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{
                          flex: '0 0 120px', 
                          textAlign: 'left', 
                          marginRight: '10px', 
                          fontSize: '13px', 
                          color: 'black'
                        }}>
                          Round Off
                        </label>
                        <input
                          type="text"
                          value="0.00"
                          style={{
                            backgroundColor: '#E0E0E0', 
                            flex: '1', 
                            padding: '5px', 
                            border: '1px solid #ddd', 
                            borderRadius: '2px', 
                            fontSize: '13px', 
                            height: '30px'
                          }}
                          readOnly
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{
                          flex: '0 0 120px', 
                          textAlign: 'left', 
                          marginRight: '10px', 
                          fontSize: '13px', 
                          color: 'black'
                        }}>
                          Total
                        </label>
                        <input
                          value={`RS. ${total.toFixed(2)}`}
                          name="total"
                          type="text"
                          style={{
                            backgroundColor: '#E0E0E0', 
                            flex: '1', 
                            padding: '5px', 
                            border: '1px solid #ddd', 
                            borderRadius: '2px', 
                            fontSize: '13px', 
                            height: '30px'
                          }}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  {/* FOOTER */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1
                style={{
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  color: '#707070'
                }}
              >@2024 Virtue. All Rights Reserved.</h1>
            </div>        
        </div>
      ) : (
        <div
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <div style={{
            marginTop: '15px',
            marginLeft: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Expenses</h2>
            <button style={{
              backgroundColor: '#74a535',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }} onClick={handleCreateNewClick}>
              + Create New
            </button>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            height: '60%',
            width: '100%'
          }}>
             {isFormVisible ? (
              <ExpenseForm onSave={handleSave} />
            ) : (
              <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',borderBottom:'1px solid #ccc', paddingBottom:'25px' }}>
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Name cusotmer */}
                <div style={{ position: 'relative', display: 'flex', width: '300px' }}>
                      <input
                          type="text"
                          placeholder="Estimate No., Customer Name"
                          value={searchName}
                          onChange={handleSearchNameChange}
                          style={{
                              width: '100%',
                              padding: '8px 12px 8px 35px', // Left padding increased for icon space
                              fontSize: '14px',
                              border: '0.5px solid rgba(0, 0, 0, 1)',
                              borderRadius: '4px',
                              boxSizing: 'border-box',
                              color: 'rgba(0, 0, 0, 0.87)',
                              position: 'relative'
                          }}
                      />
                      <img 
                          src={searchIcon} 
                          alt="search-icon" 
                          style={{
                              width: '16px',
                              position: 'absolute',
                              left: '10px', // Position inside input
                              top: '50%',
                              transform: 'translateY(-50%)'
                          }} 
                      />
                  </div>

                {/* start date */}
                <div style={{ position: 'relative', display: 'inline-block', width: '180px', height: '36px' }}>
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
                          borderRadius:'5px'
                      }} >
                      <img src={ic_date} alt="Calendar" style={{ height: "15px", marginRight: "10px" }} />
                      <span>{date ? date.toLocaleDateString("en-US") : "Select Start Date"}</span>
                 </div>
                    {isDatePickerOpen && (
                        <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 1000 }}>
                         <DatePicker
                            selected={date}
                            onChange={handleStartDateChange}
                            dateFormat="dd/MM/yyyy" 
                            inline
                            />
                        </div>
                    )}
                </div>
                {/* End date */}
                <div style={{ position: 'relative', display: 'inline-block', width: '180px', height: '36px' }}>
                <div onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
                    style={{ padding: "12px",height: "33px",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              border: "1px solid #000",
                              cursor: "pointer",
                              background: "#fff",
                              borderRadius:'5px'
                      }}>
                      <img src={ic_date} alt="Calendar" style={{ height: "15px", marginRight: "10px" }} />
                      <span>{endDate ? endDate.toLocaleDateString("en-US") : "Select End Date"}</span>
                </div>
                {isEndDatePickerOpen && (
                    <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 1000 }}>
                          <DatePicker
                              selected={endDate}
                              onChange={handleEndDateChange}
                              dateFormat="dd/MM/yyyy" 
                              inline
                          />
                    </div>
                  )}
                </div>

                <button style={{cursor:'pointer', width: '100px', height: '36px', border:'1px solid #ccc', borderRadius:'4px', color:'#fff', backgroundColor:'#74A535',fontWeight:'600' }} 
                  onClick={handleSearchClick} >
                  Search
                </button>
              </div>
              <button style={{cursor:'pointer',width: '100px', height: '36px', border:'1px solid #ccc', borderRadius:'4px', color:'#fff', backgroundColor:'#74A535',fontWeight:'600' }}
               onClick={handleClearClick}
              >
                Clear
              </button>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end',marginTop:'25px', marginBottom:'10px'}}>
                   <select style={{width:'190px', height:'33px', border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'#F0F0F0 '}}>
                      <option value="per 50">Result Per Page 50</option>
                      <option value="per 100">Result Per Page 100</option>
                   </select>
           </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: 'none' }}>
              <thead>
                <tr style={{ backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Payee/Vendor</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Expense Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Payement Method</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Ref. Number</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Total Tax</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Total</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: 'none'}}>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', textAlign: 'left'}}>{expense.payees}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{formatDate(expense.expenseDate)}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{expense.paymentMethod}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{expense.RefNumber}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{expense.totalTax}</td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>{expense.total}</td>
                    <td style={{ padding: '12px', textAlign: 'left'}}>{expense.status}</td>
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
                              border:'1px solid #ccc',
                          }}
                          >
                          <div>
                               <img src={ic_warning} alt="information"
                                  style={{
                                      width:'73px',
                                      height:'70px',
                                      marginBottom:'20px'
                                  }}
                               />
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
                                  ref={el => buttonRefs.current[index] = el}
                                  style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }} 
                                  alt="Swap"
                                  onClick={() => handleButtonClick({ expense: expense, index: index })}
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
                         {isPopupOpen && activeButtonIndex !== null && (
                          <div  
                          ref={popupRef}
                          style={{
                              position: 'absolute',
                              top: `${popupPosition.top}px`,
                              left: `${popupPosition.left}px`,
                              background: 'white',
                              border: '1px solid #ccc',
                              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                              borderRadius: '4px',
                              zIndex: 1000
                          }}>
                             <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                               <li  style={{ padding: '5px 10px', cursor: 'pointer' }}
                                  onClick={handleDownload}>
                                   Download Expense
                               </li>
                             </ul>
                          </div>
                         )}
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
          
          {/* <ExpenseInvoice expense={expense} storeData={storeData}/> */}
        </div>
      )}
    </div>
  );
};
