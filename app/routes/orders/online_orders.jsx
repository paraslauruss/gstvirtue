import { useFetcher, useLoaderData } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Card, Divider, FooterHelp, Text, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useRef, useState } from "react";
import ic_close from '../../assets/images/ic_close.png';
import ic_refresh_line from '../../assets/images/ic_refresh_line.png';
import searchIcon from '../../assets/images/searchIcon.png';
import ic_date from '../../assets/images/ic_date.png';
import ic_download from '../../assets/images/ic_download.png';
import ic_edit from '../../assets/images/ic_edit.png';
import ic_swap from '../../assets/images/ic_swap.png';
import ic_print from '../../assets/images/ic_print.png';
import ic_email from '../../assets/images/ic_email.png';
import ic_calculator from '../../assets/images/ic_calculator.png';
import Vector from '../../assets/images/Vector.png'
import pickUp from '../../assets/images/pickUp.png'   //for transport img 
import CustomBadge from "../../custom_badge";
import NoData from '../../assets/images/Group 138.png'
import { XIcon } from '@shopify/polaris-icons';
import Editmodal from "./Editmodal";
import { DownloadZip } from "./DownloadZip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Standard } from "../templates/invoice/standard";
import { Modern } from "../templates/invoice/modern";
import { Minimal } from "../templates/invoice/minimal";
import { Informatinve } from "../templates/invoice/informative";
import { Classic } from "../templates/invoice/classic";
import htmlToPdfmake from "html-to-pdfmake";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export function OnlineOrders() {

    const fetcher = useFetcher();
    const shopify = useAppBridge();
    const data = useLoaderData();

    const [formData, setFormData] = useState({});
    const orderList = data.orders.data.orders.edges;
    const productList = data.orders.data.orders.edges;

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [shopUrl, setShopUrl] = useState(null);
    useEffect(() => {
        if (shopify) {
            setShopUrl(shopify.config.shop);
        }
    }, [shopify]);


    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0'); // Pad single digit days with leading zero

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (!storeName || !accessToken) {
            console.warn("Missing storeName or accessToken");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/customize-label', {
                    method: 'GET',
                    headers: {
                        'store-name': storeName,
                        'api-version': '2025-01',
                        'access-token': accessToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data) {
                    console.log("Cuastomize Invoice Data : ", JSON.stringify(data.data.customize_store_labels.tax_invoice))
                    setFormData(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const loadPdfMake = async () => {
        if (typeof window !== "undefined" && !window.pdfMake) {
            const pdfMakeModule = await import("pdfmake/build/pdfmake");
            const pdfFonts = await import("pdfmake/build/vfs_fonts");
            pdfMakeModule.default.vfs = pdfFonts.default.pdfMake.vfs;
            window.pdfMake = pdfMakeModule.default;
        }
    };

    async function getBase64Image(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Handle CORS issues
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                try {
                    const dataURL = canvas.toDataURL("image/png"); // Convert to Base64
                    resolve(dataURL);
                } catch (error) {
                    reject(new Error(`Error converting image to Base64: ${url}`));
                }
            };
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            img.src = url;
        });
    }

    const handleDownload = async () => {
        const fileName = "invoice";

        try {
            // PDF content generate karna
            const htmlContent = generateInvoiceHtml();

            // Create a new PDF document
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            // Add the HTML content as text
            pdf.html(htmlContent, {
                callback: (doc) => {
                    doc.save(`${fileName}.pdf`);
                },
                x: 2,
                y: 2,
                html2canvas: {
                    scale: 0.2,
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

    // HTML content ko string ke roop me return kiya
    const generateInvoiceHtml = () => {
        // React component ko HTML string me convert kiya
        return ReactDOMServer.renderToString(
            <div style={{ width: "270mm", padding: "1mm", lineHeight: "1.0", textAlign: "center" }}>
                <Classic
                    formData={formData}
                    orderData={downloadOrder}
                    storeData={storeData}
                    type="order"
                    logo={logo}
                    signature={signature}
                />
            </div>
        );
    };

    const [value, setValue] = useState('');
    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );


    const [active, setActive] = useState(false);

    const toggleModal = useCallback(() => setActive((active) => !active), []);

    const [ordersList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // Fetch order data on component mount from backend API
    // useEffect(() => {
    //     fetch("http://localhost:3001/api/orders", {
    //         method:'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "store-name": session.storeName,
    //             "api-version": "2025-01",
    //             "access-token": session.accessToken
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setOrderList(data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching orders:", error);
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session.storeName || !session.accessToken) {
                console.error("Missing storeName or accessToken");
                return;
            }
            try {
                const response = await fetch("http://localhost:3001/api/orders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "store-name": session.storeName,
                        "api-version": "2025-01",
                        "access-token": session.accessToken
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching orders:", response.status, errorData);
                    return;
                }
                const data = await response.json();
                setOrderList(data);
                setFilteredOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleEditClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true); // Just open the modal, the modal itself will handle the initialization of state
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleSubmit = (formData) => {
        const updatedOrderList = ordersList.map(order => {
            if (order.order_number === selectedOrder.order_number) {
                return {
                    ...order,
                    ...formData,
                };
            }
            return order;
        });

        setOrderList(updatedOrderList);

        console.log('Form submitted', formData); // Log the form data

        closeModal();
    };

    //   DATE PICKER
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [isOpen, setIsOpen] = useState(false);
    const handleDateChange = (update) => {
        setDateRange(update);
        if (update[0] && update[1]) {
            setIsOpen(false); // Close dialog only after selecting both start and end dates
        }
    };

    // SERACH ORDER
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [productName, setProductName] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [fulfillmentStatus, setFulfillmentStatus] = useState("");

    const handleSearchOrder = () => {
        console.log("Filtering Orders...");

        const filtered = ordersList.filter(order => {
            const orderData = order.node ? order.node : order;

            // ✅ Ensure order date is handled safely
            const orderDate = orderData.createdAt || orderData.date
                ? new Date(orderData.createdAt || orderData.date)
                : null;

            // ✅ Prevent modifying state values directly
            const isDateInRange = startDate && endDate && orderDate
                ? orderDate >= new Date(new Date(startDate).setHours(0, 0, 0, 0)) &&
                orderDate <= new Date(new Date(endDate).setHours(23, 59, 59, 999))
                : !startDate && !endDate; // If no date filter is set, allow all

            console.log("isDateInRange:", isDateInRange);

            // ✅ Fix Order Number Search
            const matchesSearch = searchTerm
                ? (
                    orderData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Shopify's order name
                    orderData.customer?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    orderData.customer_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                    orderData.order_number?.toString().includes(searchTerm) ||  // Fix: Check order_number
                    orderData.id?.toString().includes(searchTerm) // Fix: Check order ID
                )
                : true;

            console.log("matchesSearch:", matchesSearch);

            // ✅ Check if order matches payment status
            const matchesPaymentStatus = paymentStatus
                ? (orderData.displayFinancialStatus?.toLowerCase() === paymentStatus.toLowerCase() ||
                    orderData.payment_status?.toLowerCase() === paymentStatus.toLowerCase())
                : true;

            console.log("matchesPaymentStatus:", matchesPaymentStatus);

            // ✅ Check if order matches fulfillment status
            const matchesFulfillmentStatus = fulfillmentStatus
                ? (orderData.displayFulfillmentStatus?.toLowerCase() === fulfillmentStatus.toLowerCase() ||
                    orderData.fulfillment_status?.toLowerCase() === fulfillmentStatus.toLowerCase())
                : true;

            console.log("matchesFulfillmentStatus:", matchesFulfillmentStatus);

            // ✅ Return if ANY entered filter matches
            return isDateInRange && matchesSearch && matchesPaymentStatus && matchesFulfillmentStatus;
        });

        console.log("Filtered Orders:", filtered);
        setFilteredOrders(filtered);
    };

    // Function to clear filters
    const handleClear = () => {
        setSearchTerm("");
        setProductName("");
        setPaymentStatus("");
        setFulfillmentStatus("");
        setDateRange([null, null]);
        setFilteredOrders(ordersList);
    };
    // ZIP ICON NEW PAGE
    const [showNoData, setShowNoData] = useState(false);
    // Mail Icon
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrderForDialog, setSelectedOrderForDialog] = useState(null);

    const handleOpenDialog = (order) => {
        setSelectedOrderForDialog(order);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedOrderForDialog(null);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const popupRef = useRef(null);
    const buttonRefs = useRef([]);

    const [downloadOrder, setDownloadOrder] = useState(null);

    const handleButtonClick = ({ order, index }) => {
        const buttonRef = buttonRefs.current[index];
        if (buttonRef) {
            setDownloadOrder(order);
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

    const handlePreview = () => {
        // Implement your preview logic here
        console.log('Preview clicked');
    };

    const [storeData, setStoreData] = useState(null);
    useEffect(() => {
        const fetchStoreData = async () => {
            if (storeName) { // Check if session.storeName exists
                setLoading(true); // Set loading to true before fetching
                try {
                    const response = await fetch(`http://localhost:3001/api/settings/${storeName}`);
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
                    setLoading(false); // Set loading to false after fetching, regardless of success or failure
                }
            }
        };
        fetchStoreData(); // Call the async function inside the effect
    }, [storeName]);

    // Template Details APIs
    const [templateData, setTemplateData] = useState(null);
    useEffect(() => {
        const fetchTempateData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/template/", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "store-name": storeName,
                        "api-version": "2025-01",
                        "access-token": accessToken
                    },
                });
                const data = await response.json();
                setTemplateData(data);
                //shopify.toast.show("Template data fetched successfully");
                console.log("Template Data : ", data);
            } catch (error) {
                // shopify.toast.show("Template data fetched successfully");
                console.error('Error fetching orders:', error);
            }
        };

        fetchTempateData(); // Call the async function inside the effect
    }, []);


    // Logo Image For Invoice
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

    // Signature Image For Invoice
    const signature = (
        <div>
            <input type="file" accept="image/*" id="signatureInput" style={{ display: "none" }} />
            {storeData?.signature_image ? (
                <img
                    src={`http://localhost:3001/${storeData?.signature_image}`}
                    alt="Signature"
                    id="signatureImage"
                    style={{ cursor: 'pointer', width: "150px", height: "80px", marginTop: "10px" }}
                />
            ) : null}
        </div>
    );

    // Checked List
    return (
        <div style={{ backgroundColor: '#ffffff', padding: '30px' }}>

            <div style={{ marginTop: 30 }}>
                <Card padding={400}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: '15px',
                                    height: '15px',
                                    backgroundColor: '#74A535',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                }}
                            ></div>
                            <div style={{ fontSize: '18px', color: '#000000', fontWeight: 'bold' }}>
                                <Text>
                                    Introducing Shipping Labels & Packing Slips!
                                </Text>
                            </div>
                        </div>
                        <div>
                            <img src={ic_close} alt="Close Icon" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <Text>Easily print shipping labels and packing slips directly from your order list. streamline your packing process ans ensure accuracy in just a few clicks.</Text>


                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            padding: '5px 10px',
                            marginTop: '10px',
                            border: '1px solid #828282',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                        onClick={() => alert('Button clicked!')}
                    >
                        <Text as="p" tone="subdued">Learn More</Text>
                    </div>
                </Card>

                <div style={{ display: 'flex', marginTop: '60px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant="headingXl" as="h4">Online Orders</Text>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                padding: '5px 10px',
                                marginTop: '10px',
                                border: '1px solid #828282',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={() => alert('Button clicked!')}
                        >
                            <Text as="p" tone="subdued">Bulk Order Update</Text>
                        </div>

                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                padding: '5px 10px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                border: '1px solid #828282',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={() => alert('Button clicked!')}
                        >
                            <Text as="p" tone="subdued">Reset Invoice Number</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: '10px',
                                height: '100%',
                            }}
                        >
                            <img src={ic_refresh_line} alt="Refresh" style={{ height: '24px' }} />
                        </div>
                    </div>

                </div>
                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', width: '100%' }}>
                                {/* ORDER  */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    borderRadius: 'px',
                                    padding: '5px 10px',
                                    height: '33px',
                                    backgroundColor: '#F8F8F8',
                                    width: '300px'
                                }}>
                                    <img
                                        src={searchIcon}
                                        alt="Search"
                                        style={{ height: '18px', marginRight: '8px' }}
                                    />
                                    <input

                                        placeholder="Order No, Invoice No, Customer"
                                        style={{
                                            flex: 1,
                                            border: 'none',
                                            outline: 'none',
                                            height: '100%',
                                            backgroundColor: 'transparent',
                                            fontSize: '14px',
                                            padding: '0 5px'
                                        }}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                {/*NAME PRODUCT  */}
                                <div style={{ width: '14%', marginLeft: '16px' }}>
                                    <input
                                        placeholder="Product Name"
                                        style={{
                                            width: '100%',
                                            height: '33px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            backgroundColor: '#F8F8F8',
                                        }}
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                {/* PAYMENT */}
                                <div style={{ width: '15%', marginLeft: '16px' }}>
                                    <select
                                        style={{
                                            width: '100%',
                                            height: '33px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            backgroundColor: '#F8F8F8',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontFamily: 'Inter',
                                            fontWeight: '400',
                                            color: '#202020'
                                        }}
                                        value={paymentStatus}
                                        onChange={(e) => setPaymentStatus(e.target.value)}
                                    >
                                        <option value=""> Payment Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="authorized">Authorized</option>
                                        <option value="partially_paid">Partially Paid</option>
                                        <option value="paid">Paid</option>
                                        <option value="partially_refunded">Partially Refunded</option>
                                        <option value="refunded">Refunded</option>
                                        <option value="voided">Voided</option>
                                    </select>
                                </div>
                                {/* FULFILLEMENT */}
                                <div style={{ display: 'flow', width: '16%', marginLeft: '16px' }}>
                                    <select

                                        style={{
                                            width: '100%',
                                            height: '33px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            backgroundColor: '#F8F8F8',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontFamily: 'Inter',
                                            fontWeight: '400',
                                            color: '#202020'
                                        }}
                                        value={fulfillmentStatus}
                                        onChange={(e) => setFulfillmentStatus(e.target.value)}
                                    >
                                        <option value="">Fullfillement Status</option>
                                        <option value="fullfilled">Fullfilled</option>
                                        <option value="not fullfilled">Not Fullfilled</option>
                                        <option value="partially filled">Partially Fullfilled</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                {/* DATE  */}
                                <div style={{ display: "flex", width: "15%", marginLeft: "16px" }}>
                                    {/* Clickable Input Field */}
                                    <div
                                        onClick={() => setIsOpen(!isOpen)}
                                        style={{
                                            padding: "8px",
                                            height: "33px",
                                            display: "flex",
                                            alignItems: "center",
                                            width: "100%",
                                            border: "1px solid #000",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            background: "#fff",
                                        }}
                                    >
                                        <img src={ic_date} alt="Calendar" style={{ height: "15px", marginRight: "10px" }} />
                                        <span>
                                            {startDate && endDate
                                                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                                : "Select Date"}
                                        </span>
                                    </div>
                                    {/* Date Range Picker */}
                                    {isOpen && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "40px",
                                                left: '68%',
                                                zIndex: 2,
                                                background: "#fff",
                                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleDateChange}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsRange
                                                inline
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* BUTTONS SEARCH AND CLEAR */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#74A535',
                                        color: '#ffffff',
                                        padding: '5px',
                                        width: '100px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleSearchOrder}
                                ><Text>Search</Text></div>
                            </div>
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    padding: '5px',
                                    width: '100px',
                                    marginLeft: '10px',
                                    border: '1px solid #828282',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={handleClear}
                            >
                                <Text as="p" tone="subdued">Clear</Text>
                            </div>
                        </div>


                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Divider />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h1>Actions on 0 selected</h1>
                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <select style={{
                                        width: '300px', height: '33px', border: '1px solid #ccc', borderRadius: '4px',
                                        padding: '6px', fontSize: '14px', fontFamily: 'Inter', marginTop: '7px', backgroundColor: '#F0F0F0'
                                    }}>
                                        <option value="">Select Invoice Type</option>
                                        <option value="original">Download Original</option>
                                        <option value="duplicate">Download Duplicate</option>
                                        <option value="triplicate">Download Triplicate</option>
                                    </select>
                                    <button style={{ marginLeft: '20px', width: '50px', padding: '8px', backgroundColor: '#74A535', border: '1px solid #ccc', borderRadius: '3px' }}
                                        onClick={() => setShowNoData(true)}
                                    >
                                        <img src={Vector} alt="download zip"
                                            style={{
                                                width: '20px',   // Or any other size you want
                                                height: '20px',  // Ensure height is also set to maintain aspect ratio,
                                                verticalAlign: 'middle', cursor: 'pointer'
                                            }}
                                        />
                                    </button>
                                    {showNoData && <DownloadZip onClose={() => setShowNoData(false)} />}
                                    <button style={{ marginLeft: '20px', width: '50px', padding: '8px', backgroundColor: '#74A535', border: '1px solid #ccc', borderRadius: '3px' }}>
                                        <img src={pickUp} alt="download zip"
                                            style={{
                                                width: '17px',   // Or any other size you want
                                                height: '17px',  // Ensure height is also set to maintain aspect ratio,
                                                verticalAlign: 'middle', cursor: 'pointer'
                                            }}
                                        />
                                    </button>
                                </div>
                                <select style={{
                                    width: '190px', height: '33px', padding: '4px', fontSize: '14px', fontFamily: 'Inter',
                                    backgroundColor: '#E8E8E8', border: '1px solid #ccc', borderRadius: '4px'
                                }}>
                                    <option value=''>Result 50 per page</option>
                                    <option value='100'>Result 100 per page</option>
                                </select>
                            </div>
                        </div>

                        <div style={{
                            borderRadius: '4px', fontSize: '16px',
                            padding: '10px 20px', color: '#ffffff', backgroundColor: '#565656',
                            flexDirection: 'row', display: 'flex'
                        }}>

                            <div style={{ width: '12.5%' }}>
                                <Text>Order</Text>
                            </div>
                            <div style={{ width: '12.5%' }}>
                                <Text>Invoice No.</Text>
                            </div>
                            <div style={{ width: '12.5%' }}>
                                <Text>Date</Text>
                            </div>
                            <div style={{ width: '12.5%' }}>
                                <Text>Customer</Text>
                            </div>
                            <div style={{ width: '12.5%' }}>
                                <Text>Total</Text>
                            </div>
                            <div style={{ width: '12.5%' }}>
                                <Text>Status</Text>
                            </div>
                            <div style={{ width: '12.5%' }}>
                                <Text>Fulfilment</Text>
                            </div>
                            <div style={{ width: '30%' }}>
                                <Text>Action</Text>
                            </div>
                        </div>
                        {
                            filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => {
                                    const orderData = order.node ? order.node : order;
                                    // Log the orderData to confirm the structure
                                    // console.log("Order Data", orderData);

                                    if (!orderData) {
                                        console.warn("Order data is undefined for order:", order); // Log if orderData is missing
                                        return null; // Skip rendering this order
                                    }
                                    const customerName = orderData.customer?.displayName || orderData.customer_name;
                                    const hasCustomerName = !!customerName
                                    const orderId = orderData.id || orderData._id
                                    return (
                                        <div key={orderId} style={{
                                            borderRadius: '4px', fontSize: '14px', padding: '10px 20px', color: '#000000', backgroundColor: '#ffffff', flexDirection: 'row', display: 'flex'
                                        }}>
                                            <div style={{ width: '12.5%' }}>
                                                <a href={`https://${shopUrl}/admin/orders/${orderId.split('/').pop()}`} target="_blank" rel="noopener noreferrer">
                                                    {orderData.name || orderData.order_number}
                                                </a>
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{(index + 1).toString().padStart(3, '0')}</Text>
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{new Intl.DateTimeFormat("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }).format(new Date(orderData.date || orderData.date))}</Text>
                                            </div>
                                            <div style={{ width: '12.5%', alignItems: 'cemter', alignContent: 'center' }}>
                                                {hasCustomerName ? (
                                                    <Text>{customerName}</Text>
                                                ) : '-'} {/* Show only customer name, no mail icon here */}
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: orderData.totalPriceSet?.shopMoney?.currencyCode || 'INR', //Replace USD with default curency
                                                }).format(orderData.current_subtotal_price)}</Text>
                                            </div>

                                            {/* Payment */}
                                            <div style={{ width: '12.5%' }}>
                                                {orderData.payment_status === 'paid' ? (
                                                    <span style={{ backgroundColor: '#74A535', color: 'white', padding: '5px', borderRadius: '50px' }}>Paid</span>
                                                ) : orderData.payment_status === 'pending' ? (
                                                    <span style={{ backgroundColor: 'orange', color: 'white', padding: '5px', borderRadius: '50px' }}>Pending</span>
                                                ) : orderData.payment_status === 'authorized' ? (
                                                    <span style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '50px' }}>Authorized</span>
                                                ) : (
                                                    <span style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '50px' }}>Unpaid</span>
                                                )}
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{orderData.displayFulfillmentStatus === "UNFULFILLED" ? "Not Fulfilled" : "Fulfilled" || orderData.fulfillment_status}</Text>
                                            </div>

                                            <div style={{ width: '30%' }}>
                                                {/* Download */}
                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                    <img
                                                        src={ic_download}
                                                        ref={el => buttonRefs.current[index] = el}
                                                        style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                                                        alt="Swap"
                                                        onClick={() => handleButtonClick({ order: order, index: index })}
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
                                                        Download Invoice
                                                    </div>
                                                </div>
                                                {/* Update */}
                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                    <img
                                                        src={ic_edit}
                                                        style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                                                        alt="Swap"
                                                        onClick={() => handleEditClick(order)}
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
                                                        Update Invoice
                                                    </div>
                                                </div>
                                                {/* swap order img hover  */}
                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                    <img
                                                        src={ic_swap}
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
                                                        Swap Order
                                                    </div>
                                                </div>
                                                {/* Invoice print */}
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
                                                        Print Invoice
                                                    </div>
                                                </div>
                                                {/* POS */}
                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                    <img
                                                        src={ic_calculator}
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
                                                        Print POS Reciept
                                                    </div>
                                                </div>

                                                {/* Mail */}
                                                {!hasCustomerName && (
                                                    <div style={{ position: "relative", display: "inline-block" }}>
                                                        <img
                                                            src={ic_email}
                                                            style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }}
                                                            alt="Send Mail"
                                                            onClick={() => handleOpenDialog(order)}
                                                            onMouseEnter={(e) => e.currentTarget.nextSibling.style.visibility = "visible"}
                                                            onMouseLeave={(e) => e.currentTarget.nextSibling.style.visibility = "hidden"}
                                                        />
                                                        <div style={{
                                                            position: "absolute",
                                                            bottom: "120%",
                                                            left: "50%",
                                                            transform: "translateX(-50%)",
                                                            backgroundColor: "#333",
                                                            color: "#fff",
                                                            padding: "5px 10px",
                                                            borderRadius: "4px",
                                                            fontSize: "12px",
                                                            border: "1px solid #555",
                                                            whiteSpace: "nowrap",
                                                            visibility: "hidden",
                                                            opacity: 1,
                                                            transition: "opacity 0.2s",
                                                            zIndex: 1000
                                                        }}>
                                                            Send Mail
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '60vh', // Adjust to ensure vertical centering
                                    flexDirection: 'column',
                                    textAlign: 'center'
                                }}>
                                    <img src={NoData} alt="no-data" style={{ marginBottom: '20px', width: '150px' }} />
                                    <p style={{
                                        fontSize: '20px',
                                        fontFamily: 'Inter',
                                        fontWeight: '500',
                                        color: '#000'
                                    }}>No Data Found</p>
                                    <p style={{
                                        fontSize: '14px',
                                        fontFamily: 'Inter',
                                        color: '#000',
                                        maxWidth: '400px' // Keeps text readable and centered
                                    }}>
                                        You can find orders by changing your search or filtering options.
                                    </p>
                                </div>
                            )
                        }
                        {/* Dialog Box */}
                        {isDialogOpen && (
                            <>
                                {/* Background Blur Overlay */}
                                <div style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly dark overlay

                                    zIndex: 999 // Below the dialog
                                }}></div>

                                {/* Dialog Box */}
                                <div style={{
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                                    zIndex: 1000, // Above the overlay
                                    minWidth: '300px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <h2 style={{ marginBottom: '20px', fontSize: '18px', fontFamily: 'Inter' }}>
                                        Customer name not found!
                                    </h2>
                                    <button onClick={handleCloseDialog} style={{
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        padding: '10px 15px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        width: '70px',
                                    }}>
                                        OK
                                    </button>
                                </div>
                            </>
                        )}
                    </Card>

                    <Editmodal
                        isOpen={isModalOpen}
                        order={selectedOrder}
                        onClose={closeModal}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
            <FooterHelp>
                @2024 Virtue. All Rights Reserved.
            </FooterHelp>

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
                    }}
                >
                    <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={handleDownload}
                        >
                            Download Original
                        </li>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={handlePreview}
                        >
                            Download Duplicate
                        </li>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={() => setIsPopupOpen(false)}
                        >
                            Download Triplicate
                        </li>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={() => setIsPopupOpen(false)}
                        >
                            Download All Types
                        </li>
                    </ul>
                </div>
            )}
            {/* <div style={{ visibility: "hidden" }}>
                {templateData?.template_type === "Minimal" && <Informatinve formData={formData} orderData={downloadOrder} storeData={storeData} logo={logo} signature={signature} />}
                {templateData?.template_type === "Informative" && <Minimal formData={formData} orderData={downloadOrder} storeData={storeData} logo={logo} signature={signature} />}
                {templateData?.template_type === "Modern" && <Modern formData={formData} orderData={downloadOrder} storeData={storeData} logo={logo} signature={signature} />}
                {templateData?.template_type === "Classic" && <Classic formData={formData} orderData={downloadOrder} storeData={storeData} type="order" logo={logo} signature={signature} />}
                {templateData?.template_type === "Standard" && <Standard formData={formData} orderData={downloadOrder} storeData={storeData} logo={logo} signature={signature} />}
            </div> */}

            {/* <Informatinve formData={formData} orderData={downloadOrder} storeData={storeData} /> */}
            {/* <Minimal formData = {formData} orderData={downloadOrder} storeData={storeData} /> */}
            {/* {templateData?.template_type === "Minimal" && <Informatinve formData={formData} orderData={downloadOrder} storeData={storeData} />}
            {templateData?.template_type === "Informative" && <Minimal formData={formData} orderData={downloadOrder} storeData={storeData} />}
            {templateData?.template_type === "Modern" && <Modern formData={formData} orderData={downloadOrder} storeData={storeData} />}
            {templateData?.template_type === "Classic" && <Classic formData={formData} orderData={downloadOrder} storeData={storeData} />}
            {templateData?.template_type === "Standard" && <Standard formData={formData} orderData={downloadOrder} storeData={storeData} />} */}

        </div>
    );
}