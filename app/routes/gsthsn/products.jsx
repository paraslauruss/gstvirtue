import { Card, Divider, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import "./product.css";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import CustomCheckbox from "../utils/custom_check_box";
import ProductList from "./product_list";
import axios from "axios";


export function Product() {
    const [showPopup, setShowPopup] = useState(false);
    const data = useLoaderData();
    const productList = data.products.data.products.edges || [];

    const [isCessChecked, setIsCessChecked] = useState(false);
    const handleCessCheckboxChange = (event) => {
        setIsCessChecked(event.target.checked);
    };


    const [isMyProductGstChecked, setIsMyProductGstChecked] = useState(false);
    const handleMyProductGstCheckboxChange = (event) => {
        setIsMyProductGstChecked(event.target.checked);
    };

    const [isMainChecked, setIsMainChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [productValues, setProductValues] = useState({});

    // Handle main checkbox change
    const handleMainCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsMainChecked(isChecked);
        // Update all items' checked state
        const updatedItems = {};
        productList.forEach((item) => {
            updatedItems[item.node.id] = isChecked;
        });
        setCheckedItems(updatedItems);
    };

    // Handle individual checkbox change
    const handleItemCheckboxChange = (productId) => (e) => {
        const checked = e.target.checked;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [productId]: checked,
        }));
    };
    
    const handleInputChange = (productId) => (e) => {
        const { name, value } = e.target;
        setProductValues((prevValues) => ({
            ...prevValues,
            [productId]: {
                ...prevValues[productId],
                [name]: value, // Update the specific field (e.g., miniAmount, gst, etc.)
            },
        }));
    };

      const session = useLoaderData();
    // Count checked items
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const fetchProductDetails = async () => {
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
    
            if (!response.ok) throw new Error(`API returned status ${response.status}`);
    
            const data = await response.json();
            console.log("Fetched Product Data:", data); // Log fetched data
    
            setProductValues(prevValues => ({
                ...prevValues,
                ...data.reduce((acc, product) => ({
                    ...acc,
                    [product.id]: {
                        miniAmount: product.miniAmount || "",
                        miniGst: product.miniGst || "",
                        gst: product.gst || "",
                        hsn: product.hsn || "",
                        cess: product.cess || "",
                    },
                }), {})
            }));
        } catch (error) {
            console.error("🚨 Error fetching products:", error.message);
        }
    };  // Call `fetchProductDetails` when the component mounts
    useEffect(() => {
        fetchProductDetails();
    }, []);
    
    const handleUpdate = async () => {
        try {
            // Iterate through the product values and update the respective fields
            for (const id in productValues) {
                const product = productValues[id];

                const updatedData = {
                    id,
                    title: product?.title || "",
                    gst: product?.gst ? product?.gst.toString() : "", // Ensure gst is a string
                    hsn: product?.hsn || "", // Ensure hsn is a string (it can be treated as a number but stored as string)
                    miniAmount: isMyProductGstChecked ? (isNaN(parseFloat(product?.miniAmount)) ? null : parseFloat(product?.miniAmount)) : null,
                    minGst: isMyProductGstChecked ? (isNaN(parseFloat(product?.miniGst)) ? null : parseFloat(product?.miniGst)) : null,
                    cess: isCessChecked ? (isNaN(parseFloat(product?.cess)) ? null : parseFloat(product?.cess)) : null,
                };
    
                // Send POST request to update the product
                const response = await fetch("http://localhost:3001/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "store-name": session.storeName,
                        "api-version": "2025-01",
                        "access-token": session.accessToken,
                    },
                    body: JSON.stringify(updatedData),
                });
    
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.error || "Failed to update product");
                }
                console.log("Product Updated:", responseData);

            }

            // Fetch updated product details after the update
            fetchProductDetails();  
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
    
        } catch (error) {
            console.error("Error updating products:", error.message);
            alert("Failed to update products. Please check console logs.");
        }
    };

    // Input field
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const [productsList, setProductsList] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Optional: Add loading state
    const [error, setError] = useState(null);   // Optional: Add error state

    const fetchDetails = async () => {
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

            if (!response.ok) throw new Error(`API returned status ${response.status}`);

            const data = await response.json();
            console.log("Fetched Product Data:", data); // Log fetched data

             setProductsList(data.map(product => ({node:product})));
             setFilteredProducts(data.map(product => ({ node: product }))); // Initialize filtered list

             setLoading(false);

                } catch (error) {
                    console.error("🚨 Error fetching products:", error.message);
                    setError(error);
                    setLoading(false);
                }
            };
            useEffect(() => {
                fetchDetails();
            }, []);
            
            const handleChange = (event) => {
                const value = event.target.value;
                setSearchQuery(value);
        
                // Only update suggestions, NOT the filtered product list
                const filteredSuggestions = productList.filter(item =>
                    item.node.title.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
                setShowSuggestions(true);
            };
             // Filter suggestions as user types
            useEffect(() => {
                if (searchQuery) {
                    const filtered = productsList.filter(item =>
                        item.node.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setSuggestions(filtered);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            }, [searchQuery, productsList]);

            const handleSuggestionClick = (suggestion) => {
                setSearchQuery(suggestion);
                setShowSuggestions(false);
            };
            const handleSearch = () => {
                const filtered = productList.filter(item =>
                    item.node.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                console.log("Filtered Products:", filtered); // Debugging line
                setFilteredProducts(filtered);
            };
        
            const handleClear = () => {
                setSearchQuery('');
                setFilteredProducts([...productList]); // Reset to original product list
            };
            if (loading) {
                return <div>Loading products...</div>; // Or your loading indicator
            }
        
            if (error) {
                return <div>Error fetching products: {error.message}</div>;
            }


    return (
        <div style={{ minHeight: "100vh" }}>
            <div style={{ marginTop: '20px', justifyContent: 'space-between', display: 'flex', width: '100%' }} >
                <Text variant="headingLg">Product</Text>
                <img src={ic_refresh} style={{ width: '20px', height: '20px', objectFit: 'contain' }} alt='refresh'/>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ width: '100%', border: '1px solid #F1F1F4', borderRadius: '10px', padding: '22px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ position: 'relative' }} ref={inputRef}>
                            <input
                               style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)' }}
                                type="text"
                                placeholder="Search Product Title"
                                value={searchQuery}
                                onChange={handleChange}

                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: 'white',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    zIndex: 10,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    padding:0,
                                    margin:0,
                                    listStyle:'none'

                                }}>
                                    {suggestions.map(item => (
                                        <li
                                            key={item.node.id}
                                            style={{ padding: '8px', cursor: 'pointer' , borderBottom:'1px solid #eee'}}
                                            onClick={() => handleSuggestionClick(item.node.title)}
                                            >
                                            {item.node.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                            <input
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'%3E%3Cpath d='M13 1L7 7L1 1' stroke='%23858585' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") noRepeat right 10px center`,
                                    backgroundSize: '14px 8px'
                                }}
                                type="text"
                                placeholder="All Collections"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                        <div>
                            <button 
                                style={{
                                    backgroundColor: '#74A535', 
                                    padding: '5px 20px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    color: 'white', 
                                    fontSize: '16px', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer', 
                                    border: 'none'
                                }}
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                            {/* CLEAR */}
                            <div>
                                <button style={{
                                padding: '5px 20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                color: '#000', 
                                fontSize: '16px', 
                                borderRadius: '4px', 
                                cursor: 'pointer', 
                                border: '1px solid #ccc'
                                     }}
                             onClick={handleClear}> 
                                     Clear
                             </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E2E2', marginTop: '20px', marginBottom: '20px' }}></div>

                    <div style={{ fontSize: '18px', fontWeight: '600' }}>
                        GST/HSN For Products
                    </div>
                    <div style={{ marginTop: '20px' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CustomCheckbox
                            id="my-product"
                            isChecked={isMyProductGstChecked}
                            onChange={handleMyProductGstCheckboxChange}
                        />
                        <label htmlFor="my-product" className="checkbox-label">My Products GST rate is dependent on the sale value of the product. Ex. Cloths,Curtains, Bedsheets etc</label>
                    </div>


                    <div style={{ marginTop: '20px' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CustomCheckbox
                            id="cess"
                            isChecked={isCessChecked}
                            onChange={handleCessCheckboxChange}
                        />
                        <label htmlFor="cess" className="checkbox-label">Set GST Compensation CESS % on Products</label>
                    </div>

                    <div style={{ backgroundColor: '#565656', color: 'white', fontSize: '16px', fontWeight: '600', display: 'flex', marginTop: '20px', padding: '10px 20px', borderRadius: '10px' }}>
                        <div style={{ gap: '10px', width: '200%', display: 'flex', alignItems: 'flex-start', justifyContent: 'start' }}>
                            <CustomCheckbox
                                id="main-checkbox"
                                isChecked={isMainChecked}
                                onChange={handleMainCheckboxChange}
                            /><label htmlFor="main-checkbox" style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>Product</label>
                        </div>
                        {isMyProductGstChecked && <div style={{ width: '100%' }}>Mini Amount</div>}
                        {isMyProductGstChecked && <div style={{ width: '100%' }}>Mini GST(%)</div>}
                        <div style={{ width: '70%' }}>GST (%)</div>
                        <div style={{ width: '70%' }}>HSN Code</div>
                        {isCessChecked && <div style={{ width: '100%' }}>CESS(%)</div>}
                    </div>
                    {filteredProducts.map((items) => {
                        return (
                            <div key={items.node.id}>
                                {/* Rest of your product item rendering code */}
                             <div style={{ color: 'black', fontSize: '16px', fontWeight: '400', display: 'flex', marginTop: '10px', padding: '10px 20px', borderRadius: '10px' }}>
                                 <div style={{ width: '140%', display: 'flex', alignItems: 'flex-start', justifyContent: 'start', gap: '10px' }}>
                                     {/* Your checkbox and label code here */}
                                        <CustomCheckbox
                                            id={items.node.id}
                                            isChecked={!!checkedItems[items.node.id]}
                                            onChange={handleItemCheckboxChange(items.node.id)}
                                        />
                                        <label htmlFor={items.node.id} className="checkbox-label">{items.node.title}</label>
                                </div>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start', // Optional: Space them out
                                    width: '100%',
                                }}
                            >
                                {/* Your input fields here */}
                                {isMyProductGstChecked && (
                                    <input
                                        style={{
                                            border: '0.5px solid #000',
                                            borderRadius: '4px',
                                            padding: '5px',
                                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                            color: '#000'
                                        }}
                                        type="number"
                                        name="miniAmount"
                                        min="0" // Ensures the value cannot go below zero
                                        placeholder="Mini Amount"
                                        value={productValues[items.node.id]?.miniAmount || ""}
                                        onChange={handleInputChange(items.node.id)}

                                    />
                                )}
                                {isMyProductGstChecked && (
                                    <input
                                        style={{
                                            border: '0.5px solid #000',
                                            borderRadius: '4px',
                                            padding: '5px',
                                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                        }}
                                        type="number"
                                        name="miniGst"
                                        min="0" // Ensures the value cannot go below zero
                                        value={productValues[items.node.id]?.miniGst || ""}
                                        onChange={handleInputChange(items.node.id)}
                                    />
                                )}
                                <input
                                    style={{
                                        border: '0.5px solid #000',
                                        borderRadius: '4px',
                                        padding: '5px',
                                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                    }}
                                    type="number"
                                    name="gst"
                                    min="0" // Ensures the value cannot go below zero
                                    value={productValues[items.node.id]?.gst || ""}
                                    onChange={handleInputChange(items.node.id)}
                                />
                                <input
                                    style={{
                                        border: '0.5px solid #000',
                                        borderRadius: '4px',
                                        padding: '5px',
                                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                    }}
                                    type="text"
                                    name="hsn"
                                    value={productValues[items.node.id]?.hsn || ""}
                                    onChange={handleInputChange(items.node.id)}
                                />
                                {isCessChecked && (
                                    <input
                                        style={{
                                            border: '0.5px solid #000',
                                            borderRadius: '4px',
                                            padding: '5px',
                                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                        }}
                                        type="number"
                                        name="cess"
                                        min="0" // Ensures the value cannot go below zero
                                        value={productValues[items.node.id]?.cess || ""}
                                        onChange={handleInputChange(items.node.id)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
       
                    <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                        <div
                            style={{
                                backgroundColor: '#74A535',
                                padding: '5px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                fontSize: '14px',
                                borderRadius: '4px'
                            }}
                            onClick={handleUpdate}
                            >
                            Update
                        </div>
                    </div>
                    {showPopup && (
                        <div
                            style={{
                                position: 'fixed',
                                bottom: '20px',
                                right: '20px',
                                background: '#74A535',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                            }}
                        >
                            Products updated successfully!
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}