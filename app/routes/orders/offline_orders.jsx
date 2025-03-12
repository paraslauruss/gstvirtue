    import {
    Text,
    Card,
    Divider,
    TextField,
    InlineStack,
    Backdrop,
} from "@shopify/polaris";
import searchIcon from '../../assets/images/searchIcon.png';
import ic_date from '../../assets/images/ic_date.png';
import ic_download from '../../assets/images/ic_download.png';
import ic_edit from '../../assets/images/ic_edit.png';
import ic_email from '../../assets/images/ic_email.png';
import ic_info from '../../assets/images/ic_delete.png';
import ic_print from '../../assets/images/ic_print.png';
import NoData from '../../assets/images/Group 138.png'
import ic_warning from '../../assets/images/ic_warning.jpg';
import ic_back from '../../assets/images/ic_back.webp';
import ic_nodata from '../../assets/images/Group 138.png';
import ic_downloadZIp from '../../assets/images/Vector.png'
import { useCallback, useState, useRef , useEffect} from "react";
import { CreateNewInvoice } from "./create_new_invoice";
// import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
 import RichTextEditor from "./rich_text_editor";
 import DatePicker from "react-datepicker";
 import "react-datepicker/dist/react-datepicker.css";
 import "../report/DatePickerDialog.css";
 import moment from 'moment';
 import axios from 'axios';
import { useLoaderData } from "@remix-run/react";


export function Dialog({ active, toggleModal }) {


    const [invoiceOption, setInvoiceOption] = useState('original');

    const handleInvoiceChange = (event) => {
        setInvoiceOption(event.target.value);
    };

    const [downloadOption, setDownloadOption] = useState('single-pdf');

    const handleDownloadChange = (event) => {
        setDownloadOption(event.target.value);
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
                        borderRadius: '10px',
                    }}
                >
                    <div
                        style={{
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#74A535',
                            padding: '10px 20px',
                            borderRadius: '8px 8px 0px 0px',
                        }}
                    >
                        <Text variant="headingLg">Bulk Invoice Download</Text>
                        <div style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19.5347 0.465273C18.9142 -0.15509 17.9083 -0.155091 17.2877 0.465273L10 7.75298L2.71229 0.465273C2.09174 -0.155091 1.08583 -0.155091 0.465273 0.465273C-0.155091 1.08582 -0.155091 2.09174 0.465273 2.71229L7.75298 10L0.465273 17.2877C-0.155091 17.9083 -0.15509 18.9142 0.465275 19.5347C1.08583 20.1551 2.09174 20.1551 2.71229 19.5347L10 12.247L17.2877 19.5347C17.9083 20.1551 18.9142 20.1551 19.5347 19.5347C20.1551 18.9142 20.1551 17.9083 19.5347 17.2877L12.247 10L19.5347 2.71229C20.1551 2.09174 20.1551 1.08583 19.5347 0.465273Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginRight: '20px', marginLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '50%' }}>
                            <Text as="p" fontWeight="semibold">Invoice Type</Text>
                        </div>
                        <div style={{ width: '50%' }}>
                            <Text as="p" fontWeight="semibold">Download Type</Text>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Divider />
                    </div>
                    <div style={{ display: 'flex', marginRight: '10px', marginLeft: "10px" }}>
                        <div style={{ width: '50%' }}>
                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}>
                                        <input
                                            type="radio"
                                            style={{
                                                display: 'none', // Hide default radio button
                                            }}
                                            value="original"
                                            checked={invoiceOption === 'original'}
                                            onChange={handleInvoiceChange}
                                        />
                                        <span
                                            style={{
                                                width: '18px',  // Outer circle size
                                                height: '18px',  // Outer circle size
                                                border: '2px solid #74A535',  // Border color
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                position: 'relative',
                                                backgroundColor: '#fff', // Set the outer background to white
                                                transition: 'background-color 0.3s, border-color 0.3s',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                    height: '10px',  // Inner circle size
                                                    borderRadius: '50%',
                                                    backgroundColor: invoiceOption === 'original' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)', // Center the inner circle
                                                    transition: 'background-color 0.3s',
                                                }}
                                            ></span>
                                        </span>
                                        <div style={{ marginLeft: "5px" }}>
                                            <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                Original
                                            </Text>
                                        </div>
                                    </label>


                                </div>
                            </div>

                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}>
                                        <input
                                            type="radio"
                                            style={{
                                                display: 'none', // Hide default radio button
                                            }}
                                            value="duplicate"
                                            checked={invoiceOption === 'duplicate'}
                                            onChange={handleInvoiceChange}
                                        />
                                        <span
                                            style={{
                                                width: '18px',  // Outer circle size
                                                height: '18px',  // Outer circle size
                                                border: '2px solid #74A535',  // Border color
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                position: 'relative',
                                                backgroundColor: '#fff', // Set the outer background to white
                                                transition: 'background-color 0.3s, border-color 0.3s',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                    height: '10px',  // Inner circle size
                                                    borderRadius: '50%',
                                                    backgroundColor: invoiceOption === 'duplicate' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)', // Center the inner circle
                                                    transition: 'background-color 0.3s',
                                                }}
                                            ></span>
                                        </span>
                                        <div style={{ marginLeft: "5px" }}>
                                            <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                Duplicate
                                            </Text>
                                        </div>
                                    </label>


                                </div>
                            </div>

                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}>
                                        <input
                                            type="radio"
                                            style={{
                                                display: 'none', // Hide default radio button
                                            }}
                                            value="triplicate"
                                            checked={invoiceOption === 'triplicate'}
                                            onChange={handleInvoiceChange}
                                        />
                                        <span
                                            style={{
                                                width: '18px',  // Outer circle size
                                                height: '18px',  // Outer circle size
                                                border: '2px solid #74A535',  // Border color
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                position: 'relative',
                                                backgroundColor: '#fff', // Set the outer background to white
                                                transition: 'background-color 0.3s, border-color 0.3s',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                    height: '10px',  // Inner circle size
                                                    borderRadius: '50%',
                                                    backgroundColor: invoiceOption === 'triplicate' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)', // Center the inner circle
                                                    transition: 'background-color 0.3s',
                                                }}
                                            ></span>
                                        </span>
                                        <div style={{ marginLeft: "5px" }}>
                                            <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                Triplicate
                                            </Text>
                                        </div>
                                    </label>


                                </div>
                            </div>
                        </div>
                        <div style={{ width: '50%' }}>
                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}>
                                        <input
                                            type="radio"
                                            style={{
                                                display: 'none', // Hide default radio button
                                            }}
                                            value="original"
                                            checked={downloadOption === 'single-pdf'}
                                            onChange={handleDownloadChange}
                                        />
                                        <span
                                            style={{
                                                width: '18px',  // Outer circle size
                                                height: '18px',  // Outer circle size
                                                border: '2px solid #74A535',  // Border color
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                position: 'relative',
                                                backgroundColor: '#fff', // Set the outer background to white
                                                transition: 'background-color 0.3s, border-color 0.3s',
                                            }}>
                                            <span
                                                style={{
                                                    width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                    height: '10px',  // Inner circle size
                                                    borderRadius: '50%',
                                                    backgroundColor: downloadOption === 'single-pdf' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)', // Center the inner circle
                                                    transition: 'background-color 0.3s',
                                                }}
                                            />
                                        </span>
                                        <div style={{ marginLeft: "5px" }}>
                                            <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                Single PDF
                                            </Text>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}>
                                        <input
                                            type="radio"
                                            style={{
                                                display: 'none', // Hide default radio button
                                            }}
                                            value="individual-pdf"
                                            checked={downloadOption === 'individual-pdf'}
                                            onChange={handleDownloadChange}
                                        />
                                        <span
                                            style={{
                                                width: '18px',  // Outer circle size
                                                height: '18px',  // Outer circle size
                                                border: '2px solid #74A535',  // Border color
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                position: 'relative',
                                                backgroundColor: '#fff', // Set the outer background to white
                                                transition: 'background-color 0.3s, border-color 0.3s',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                    height: '10px',  // Inner circle size
                                                    borderRadius: '50%',
                                                    backgroundColor: downloadOption === 'individual-pdf' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)', // Center the inner circle
                                                    transition: 'background-color 0.3s',
                                                }}
                                            ></span>
                                        </span>
                                        <div style={{ marginLeft: "5px" }}>
                                            <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                Individual PDF
                                            </Text>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'end', marginRight: '20px', marginBottom: '20px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                padding: '5px 20px',
                                border: '1px solid #828282',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={() => alert('Button clicked!')}
                        >
                            <Text as="p" tone="subdued">Download</Text>
                            <div style={{ marginLeft: '10px', paddingTop: '5px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" fill="#828282" />
                                </svg>
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export function SendEmailInvoiceDialog({ active, toggleModal, selectedInvoice }) {
    const defaultEditorContent = `
           <div style="font-family: 'Inter', sans-serif; width: 100%; margin: 0 auto; background: #ffffff; padding: 20px;">
                <!-- Header Section -->
                <div style="text-align: center; padding-bottom: 10px;">
                    <a href="https://admin.shopify.com/store/gst-paras/apps/gst-virtue/app" 
                    style="color: #74A535; text-decoration: none; font-size: 18px; font-weight: bold;">
                    VirtueGst
                    </a>
                </div>

                <hr style="border: none; border-top: 3px solid #003366; width: 100%;" />

                <!-- Body Section -->
                <p style="font-size: 16px; text-align: center;">Hi <strong>{customerName}</strong>,</p>

                <h2 style="color: #333333; text-align: center;">Thank you for your purchase!</h2>
                <p style="color: #555555; font-size: 14px; text-align: center;">
                    We're getting your order ready to be shipped. We will notify you when it has been sent.
                </p>

                <p style="font-size: 16px; text-align: center;">
                    Kindly download your invoice for your order <strong>{invoiceNumber}</strong>
                </p>

                <!-- Button Section (Left-Aligned) -->
                <div style="margin: 20px 0; text-align: left;">
                    <a href="YOUR_INVOICE_LINK" 
                    style="background: #74A535; color: #ffffff; padding: 12px 20px; text-decoration: none; 
                            font-weight: bold; border-radius: 5px; display: inline-block;">
                    Download Invoice
                    </a>
                </div>
                </div>
      `;
    const [editorContent, setEditorContent] = useState(defaultEditorContent);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [emailStatus, setEmailStatus] = useState(''); 

    useEffect(() => {
        if (selectedInvoice) {
             // Construct the full email content, replacing the placeholders
             const customerName = selectedInvoice.Customer || selectedInvoice.customerName || 'N/A';
             const invoiceNumber = selectedInvoice.invoiceNumber || 'N/A';
             const customerEmail = selectedInvoice.customerEmail || '';  //  Still might need to be explicit
             // Default invoice link
             const invoiceLink = selectedInvoice.invoiceLink || '#';
 
            //Replace the Values In editor content
            let updatedEditorContent = defaultEditorContent
            .replace('{customerName}', customerName)
            .replace('{invoiceNumber}', invoiceNumber);
           
            console.log("selectedInvoice:", selectedInvoice);
            console.log("customerName:", customerName);
            console.log("invoiceNumber:", invoiceNumber);

            setEditorContent(updatedEditorContent);
            setEmailTo(customerEmail);
            setEmailSubject(`Copy of Invoice Number ${invoiceNumber}`);
        } else {
            setEditorContent(defaultEditorContent);
              setEmailSubject('');
              setEmailTo('');
        }
    }, [selectedInvoice]);

    const handleEditorChange = (value) => {
        setEditorContent(value);
    };
  
    const [invoiceOption, setInvoiceOption] = useState('original');

    const handleInvoiceChange = (event) => {
        setInvoiceOption(event.target.value);
    };

    const [downloadOption, setDownloadOption] = useState('single-pdf');

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
            const response = await fetch('http://localhost:3001/send-email', { // Replace with your backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailStatus('Email sent successfully!');
                console.log('Email sent:', data);
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
                         <h1 style={{fontFamily:'Inter', fontSize:'14px', color:'#000', marginBottom:'5px'}}>Subject :</h1>
                        <input 
                           placeholder="Invoice Number"
                           style={{
                             width:'100%',
                             height:'33px',
                             border:'1px solid #ccc',
                             borderRadius:'4px',
                             padding:'7px'
                           }}
                           value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        />
                    </div>

                    <div style={{ marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
                         <h1 style={{fontFamily:'Inter', fontSize:'14px', color:'#000', marginBottom:'5px'}}>To:</h1>
                        <input 
                           placeholder="Custoemr_Name"
                           style={{
                             width:'100%',
                             height:'33px',
                             border:'1px solid #ccc',
                             borderRadius:'4px',
                             padding:'7px'
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

                    <div style={{fontSize:'12px',marginTop: '10px', marginRight: '20px', marginLeft: '20px' }}>
                        <span style={{color:'red', fontWeight:'bold',paddingRight:'5px'}}>Note:</span> 
                        Do Not Remove the <span style={{fontWeight:'bold'}}>"Customer_Name"</span> and 
                       <span style={{fontWeight:'bold'}}> "Invoice_Number"</span>. These will be replaced with dynamic values of the invoice.
                   </div>

                   <div style={{display:'flex', justifyContent:'flex-end', alignContent:'center',marginTop: '10px', marginRight: '20px', marginLeft: '20px'}}>
                      <button
                        style={{
                            width:'90px',
                            height:'33px',
                            backgroundColor:'#74A535',
                            border:'1px solid #ccc',
                            borderRadius:'4px',
                            fontSize:'16px',
                            color:'#fff',
                            fontFamily:'Inter',
                            cursor:'pointer'
                        }}
                      onClick={handleSendEmail}
                      >Send</button>
                   </div>

                </div>
            )}
        </div>
    );
}


export function OfflineOrders() {
    const [createInvoice, setCreateInvoice] = useState(false);
    const [active, setActive] = useState(false);
    const toggleModal = useCallback(() => setActive((prev) => !prev), []);
    const onCloseHandle = useCallback(() => setCreateInvoice((prev) => !prev), []);
    const [emailActive, setEmailActive] = useState(false);
    const toggleEmailActiveModal = useCallback(() => setEmailActive((prev) => !prev), []);
    const [content, setContent] = useState('');
  
    const editorRef = useRef(null);
    
    if (typeof window === 'undefined') {
      return <div>Loading editor...</div>; // Fallback for SSR
    }
    // OFFLINE DATA 
    const [invoiceData, setInvoiceData] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [invoices, setInvoices] = useState([]);

    const session = useLoaderData();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                // Define headers
                const headers = {
                    'Content-Type': 'application/json',
                    'api-version': '2025-01',
                    'store-name': session.storeName,
                    'access-token': session.accessToken,
                };

                const response = await axios.get('http://localhost:3001/api/offlineData', { headers: headers });
                const data = response.data; // Store the response data
                console.log("Fetched data:", data); // Very important for debugging

                setInvoices(data);          // Set all invoices
                setSearchResults(data); 
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setInvoices([]);
                setSearchResults([]);
            }
        };
        fetchInvoices();
        const handleInvoiceSaved = () => {
            console.log("Invoice saved event received. Refreshing data...");
            fetchInvoices(); // Refresh invoices when a new one is saved
        };
        window.addEventListener("invoiceSaved", handleInvoiceSaved);
        return () => {
            window.removeEventListener("invoiceSaved", handleInvoiceSaved);
        };
    }, []);

    const handleSearchTermChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filter the invoices array based on the search term
        const filteredInvoices = invoices.filter(invoice => {
            const searchTermLower = term.toLowerCase();
            const invoiceNumberLower = (invoice.invoiceNumber || '').toLowerCase();
            const customerNameLower = (invoice.customerName || '').toLowerCase();

            // Check if the search term is found in any of the relevant fields
            return (
                invoiceNumberLower.includes(searchTermLower) ||
                customerNameLower.includes(searchTermLower)
                // Add more fields as needed
            );
        });

        setSearchResults(filteredInvoices);
    };

      const handleSearch = () => {
        const startDateTimestamp = startDate ? startDate.getTime() : null;
        const endDateTimestamp = endDate ? endDate.getTime() : null;

        const filteredResults = invoiceData.filter(invoice => {
            const searchTermMatch = searchTerm === '' ||
                invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (invoice.customerName && invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()));

            let dateRangeMatch = true;
            if (startDateTimestamp && endDateTimestamp) {
                // Use moment to parse the invoiceDate with the correct format
                const invoiceDateTimestamp = moment(invoice.invoiceDate, "DD/MM/YYYY").valueOf();
                dateRangeMatch = invoiceDateTimestamp >= startDateTimestamp && invoiceDateTimestamp <= endDateTimestamp;
            } else if (startDateTimestamp) {
                // Use moment to parse the invoiceDate with the correct format
                const invoiceDateTimestamp = moment(invoice.invoiceDate, "DD/MM/YYYY").valueOf();
                dateRangeMatch = invoiceDateTimestamp >= startDateTimestamp;
            } else if (endDateTimestamp) {
                // Use moment to parse the invoiceDate with the correct format
                const invoiceDateTimestamp = moment(invoice.invoiceDate, "DD/MM/YYYY").valueOf();
                dateRangeMatch = invoiceDateTimestamp <= endDateTimestamp;
            }

            return searchTermMatch && dateRangeMatch;
        });

        setSearchResults(filteredResults);
    };

    const handleClear = () => {
        setStartDate(null);
        setSearchTerm('');
        setSearchResults(invoiceData);
    };
    //   DELTE THE ENTRY
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    const handleDeleteClick = (invoice) => {
        setInvoiceToDelete(invoice);
        setShowDeletePopup(true);
    };
    // Fetch updated invoice data from backend
    const fetchInvoices = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/offlineData"); // Replace with actual API endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch invoices");
            }
            const data = await response.json();
            setInvoiceData(data);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };
    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleConfirmDelete = async () => {
        if (!invoiceToDelete) return; 
        console.log("Deleting invoice with ID:", invoiceToDelete); //debugging

        try {
            const response = await fetch(`http://localhost:3001/api/offlineData/${invoiceToDelete._id}`, {
                method: "DELETE",
                headers: {
                     "Content-Type": "application/json",
                     "api-version":"2025-01",
                     'store-name': session.storeName,
                     'access-token': session.accessToken,
                 },
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete invoice");
            }
            setInvoiceData((prevData) => prevData.filter(inv => inv._id !== invoiceToDelete._id));
            
            setShowDeletePopup(false);
            fetchInvoices();
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };
       
    //   EMAIL FUNCTION
    // Function to open the email modal with a selected invoice
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
    // DATE PICKER
    const [startDate , setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setIsStartDatePickerOpen(false);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setIsEndDatePickerOpen(false);
    };
    // download icon
    const handleDownload = (order, invoiceNumber) => {
        if (typeof window !== 'undefined') {
            import('html2pdf.js').then((html2pdf) => {
                fetch('/invoice1.html')
                    .then(response => response.text())
                    .then(html => {
                        let updatedHtml = html;

                        updatedHtml = updatedHtml.replace('{{invoiceNo}}', invoiceNumber);
                        updatedHtml = updatedHtml.replace('{{orderID}}', order.node.name);
                        updatedHtml = updatedHtml.replace('{{invoiceDate}}', getCurrentDate());
                        updatedHtml = updatedHtml.replace('{{paymentGatewayNames}}', order.node.paymentGatewayNames);
                        updatedHtml = updatedHtml.replace('{{builedToName}}', order.node.billingAddress.name);
                        updatedHtml = updatedHtml.replace('{{builedToAddress}}', [
                            order.node.billingAddress.address1,
                            order.node.billingAddress.address2,
                            order.node.billingAddress.city,
                            order.node.billingAddress.zip,
                            order.node.billingAddress.province,
                            order.node.billingAddress.country
                        ].filter(Boolean) // Filter out any null, undefined, or empty values
                            .join(', '));
                        updatedHtml = updatedHtml.replace('{{builedToPhone}}', order.node.billingAddress.phone);

                        updatedHtml = updatedHtml.replace('{{shipToName}}', order.node.shippingAddress.name);
                        updatedHtml = updatedHtml.replace('{{shipToAddress}}', [
                            order.node.shippingAddress.address1,
                            order.node.shippingAddress.address2,
                            order.node.shippingAddress.city,
                            order.node.shippingAddress.zip,
                            order.node.shippingAddress.province,
                            order.node.shippingAddress.country
                        ].filter(Boolean) // Filter out any null, undefined, or empty values
                            .join(', '));
                        updatedHtml = updatedHtml.replace('{{shipToPhone}}', order.node.shippingAddress.phone);

                        let itemsHtml = '';
                        order.node.lineItems.edges.forEach(item => {
                            itemsHtml += `
                                <div class="text-small" style="display: flex; padding: 10px 0px;">
                                    <p style="width: 30%;">${item.node.name}</p>
                                    <p style="width: 5%;">${item.node.quantity}</p>
                                    <div style="width: 10%;">
                    <p style="text-decoration: line-through; color: #96ADCB;">RS. ${(item.node.product.compareAtPriceRange.minVariantCompareAtPrice.amount)}</p>
                    <p>RS. ${(item.node.product.priceRangeV2.maxVariantPrice.amount)}</p>
                </div>

                <p style="width: 20%;">RS. ${(item.node.taxLines[0].priceSet.shopMoney.amount)}</p>
                <p style="width: 5%;">5%</p>
                <p style="width: 5%;">5%</p>
                <p style="width: 10%;">RS. 44.90</p>
                <p style="width: 15%;">RS. ${(parseFloat(item.node.product.priceRangeV2.maxVariantPrice.amount) + parseFloat(item.node.taxLines[0].priceSet.shopMoney.amount)).toFixed(2)}</p>
                                </div>`;
                        });

                        updatedHtml = updatedHtml.replace('{{orderItems}}', itemsHtml);
                        const element = document.createElement('div');
                        element.innerHTML = updatedHtml;

                        const options = {
                            filename: 'invoice.pdf',
                            margin: 20,
                            html2canvas: { scale: 2 },
                            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                        };

                        html2pdf.default().from(element).set(options).save();
                    })
                    .catch(error => {
                        console.error('Error loading HTML file:', error);
                    });
            });
        }

    };
    //zip icon 
    const [showBlankPage, setShowBlankPage] = useState(false);
    if (showBlankPage) {
        return (
          <div style={{
            display: "flex",
            flexDirection: "column", /* Changed to column */
            boxSizing: "border-box",
            width: "1000px",
            height: "100vh",
            marginLeft: "100px",
            marginTop: "20px",
            backgroundColor: "#fff",
            padding: "20px",
            gap: "8px",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                  }} 
                onClick={() => setShowBlankPage(false)}>
                    <img src={ic_back} alt="go-back" style={{width:'25px',height:'25px',backgroundColor:'transparent'}}/>
                </button>
                <h2 style={{ color: "#000", fontSize: "16px",fontFamily:'Inter',fontWeight:'600' }}>Download Invoice (Zip)</h2>
            </div>
            <div style={{marginBottom:'30px',marginTop:'20px', border:'1px solid #ccc',borderRadius:'8px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'auto'}}>
                  <img src={ic_nodata} alt="no-data" style={{marginTop:'50px'}}/>
                  <p style={{fontSize:'16px', fontFamily:'Inter', fontWeight:'bold',marginBottom:'30px'}}>No Files Found</p>
            </div>

            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'auto'}}>
                <p>© 2025 VirtueGst. All Rights Reserved.</p>
            </div>
          </div>
        );
      };

    return (
      <>
        <Dialog active={active} toggleModal={toggleModal} />
        <SendEmailInvoiceDialog
                 active={emailActive}
                 toggleModal={closeEmailModal}
                 selectedInvoice={selectedInvoice}
                 fetchInvoices={fetchInvoices}
            />        
            <div>
                {createInvoice ? (<CreateNewInvoice onClose={onCloseHandle}/>) : (<div>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text variant="headingLg" fontWeight="bold">Offline Orders</Text>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#74A535', color: '#ffffff', padding: '5px', width: '130px', borderRadius: '4px', cursor: 'pointer', }}
                            onClick={() => setCreateInvoice(!createInvoice)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path d="M12.0714 7.42857H7.42857V12.0714C7.42857 12.3177 7.33074 12.5539 7.1566 12.728C6.98246 12.9022 6.74627 13 6.5 13C6.25373 13 6.01754 12.9022 5.8434 12.728C5.66926 12.5539 5.57143 12.3177 5.57143 12.0714V7.42857H0.928571C0.682299 7.42857 0.446113 7.33074 0.271972 7.1566C0.0978315 6.98246 0 6.74627 0 6.5C0 6.25373 0.0978315 6.01754 0.271972 5.8434C0.446113 5.66926 0.682299 5.57143 0.928571 5.57143H5.57143V0.928571C5.57143 0.682299 5.66926 0.446113 5.8434 0.271972C6.01754 0.0978311 6.25373 0 6.5 0C6.74627 0 6.98246 0.0978311 7.1566 0.271972C7.33074 0.446113 7.42857 0.682299 7.42857 0.928571V5.57143H12.0714C12.3177 5.57143 12.5539 5.66926 12.728 5.8434C12.9022 6.01754 13 6.25373 13 6.5C13 6.74627 12.9022 6.98246 12.728 7.1566C12.5539 7.33074 12.3177 7.42857 12.0714 7.42857Z" fill="white" />
                            </svg>
                            <div style={{ marginLeft: '10px' }}>
                                <Text>Create New</Text>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ display: 'flow', width: '45%' }}>
                                        <input
                                            placeholder="Order No,Invoice No,Customer"
                                            prefix={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={searchIcon}
                                                        style={{ height: '15px' }} />
                                                </div>
                                            }
                                            style={{
                                                width:'300px',
                                                height:'33px',
                                                border:'1px solid #ccc',
                                                borderRadius:'4px',
                                                backgroundColor:'#F0F0F0',
                                                color:'#000',
                                                padding:'4px'
                                            }}
                                            value={searchTerm}
                                            onChange={handleSearchTermChange}
                                        />
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "16px", position: "relative", width:'35%'}}>
                                    {/* Start Date Clickable Input Field */}
                                    <div
                                        onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}
                                        style={{
                                            padding: "12px",
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
                                        <span>{startDate ? startDate.toLocaleDateString("en-US") : "Select Start Date"}</span>
                                    </div>

                                    {/* Start Date Picker (Appears Below the Input) */}
                                    {isStartDatePickerOpen && (
                                        <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 1000 }}>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                inline
                                            />
                                        </div>
                                    )}
                           </div>
                     {/* END Start DATE */}
                            <div style={{ display: "flex", width: "33%", marginLeft: "16px", position: "relative" }}>
                                <div onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
                                     style={{ padding: "12px",height: "33px",
                                                display: "flex",
                                                alignItems: "center",
                                                width: "100%",
                                                border: "1px solid #000",
                                                borderRadius: "5px",
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
                                      
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#74A535',
                                    color: '#ffffff',
                                    padding: '5px',
                                    width: '100px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginLeft: '16px'
                                    }}
                                    onClick={handleSearch}>
                                    <Text>
                                        Search
                                    </Text>
                                </div>
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
                                    onClick={handleClear} >
                                    <Text as="p" tone="subdued">Clear</Text>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text variant="headingMd" fontWeight="regular">Actions on 0 selected</Text>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                        padding: '5px',
                                        marginLeft: '20px',
                                        border: '1px solid #828282',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => toggleModal()}>
                                        <Text as="p" tone="subdued">Bulk Download</Text>
                                    </div>
                                    {/* zip icon */}
                                    <div>
                                    {/* Button that leads to the new blank page */}
                                    <button style={{
                                        backgroundColor: "#74A535",
                                        border: "none",
                                        padding: "8px 10px",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        width: "50px",
                                        marginLeft:'15px    '
                                    }} onClick={() => setShowBlankPage(true)}>
                                        <img src={ic_downloadZIp} alt="Download Zip" style={{ width: "20px", height: "20px" }} />
                                    </button>
                                 </div>
                             </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                        padding: '5px 20px',
                                        border: '1px solid #828282',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => alert('Button clicked!')}>
                                    <Text as="p" tone="subdued">Result per page 50</Text>
                                    <div style={{ marginLeft: '10px', paddingTop: '5px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                            <path d="M8.73458 10.9249C8.81844 11.0075 8.88498 11.1056 8.93038 11.2136C8.97578 11.3216 8.99915 11.4374 8.99915 11.5544C8.99915 11.6713 8.97578 11.7872 8.93038 11.8952C8.88498 12.0032 8.81844 12.1013 8.73458 12.1839L5.13642 15.7386C5.05285 15.8215 4.95355 15.8872 4.84421 15.9321C4.73487 15.9769 4.61764 16 4.49925 16C4.38086 16 4.26363 15.9769 4.15429 15.9321C4.04495 15.8872 3.94565 15.8215 3.86208 15.7386L0.263925 12.1839C0.0949367 12.0169 -3.56117e-09 11.7905 0 11.5544C3.56117e-09 11.3183 0.0949367 11.0918 0.263925 10.9249C0.432914 10.7579 0.662112 10.6642 0.901098 10.6642C1.14008 10.6642 1.36928 10.7579 1.53827 10.9249L4.5 13.8494L7.46173 10.9227C7.54542 10.8402 7.64475 10.7748 7.75403 10.7303C7.86331 10.6858 7.98041 10.6629 8.09862 10.6631C8.21683 10.6633 8.33384 10.6866 8.44297 10.7315C8.55209 10.7764 8.65118 10.8421 8.73458 10.9249ZM1.53827 5.07437L4.5 2.14836L7.46173 5.07511C7.63072 5.24206 7.85992 5.33585 8.0989 5.33585C8.33789 5.33585 8.56709 5.24206 8.73607 5.07511C8.90506 4.90816 9 4.68172 9 4.44562C9 4.20952 8.90506 3.98308 8.73607 3.81613L5.13792 0.261382C5.05435 0.178533 4.95505 0.112797 4.84571 0.0679427C4.73637 0.0230889 4.61914 0 4.50075 0C4.38236 0 4.26513 0.0230889 4.15579 0.0679427C4.04645 0.112797 3.94715 0.178533 3.86358 0.261382L0.265425 3.81613C0.0964363 3.98308 0.00149898 4.20952 0.00149898 4.44562C0.00149898 4.68172 0.0964363 4.90816 0.265425 5.07511C0.434414 5.24206 0.663612 5.33585 0.902598 5.33585C1.14158 5.33585 1.37078 5.24206 1.53977 5.07511L1.53827 5.07437Z" fill="#858585" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#565656', display: 'flex', padding: '10px', marginTop: '20px', borderRadius: '4px' }}>
                                <div style={{ color: 'white', width: '10%' }}>
                                    <Text>Invoice No.</Text>
                                </div>
                                <div style={{ color: 'white', width: '15%' }}>
                                    <Text>Customer</Text>
                                </div>
                                <div style={{ color: 'white', width: '15%' }}>
                                    <Text>Invoice Date</Text>
                                </div>
                                <div style={{ color: 'white', width: '10%' }}>
                                    <Text>Total Tax</Text>
                                </div>
                                <div style={{ color: 'white', width: '10%' }}>
                                    <Text>Total</Text>
                                </div>
                                <div style={{ color: 'white', width: '10%' }}>
                                    <Text>Status</Text>
                                </div>
                                <div style={{ color: 'white', width: '20%' }}>
                                    <Text>Action</Text>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    {searchResults.length > 0 ? (
                                        searchResults.map((invoice, index) => (
                                            <div key={index} style={{ display: 'flex', padding: '8px', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '4px', marginBottom: '5px' }}>
                                                <div style={{ width: '10%', padding: '4px' }}>
                                                    <span>{invoice.invoiceNumber || "N/A"}</span>
                                                </div>
                                                <div style={{ width: '15%', padding: '4px' }}>
                                                    <span>{invoice.customerName || "N/A"}</span>
                                                </div>
                                                <div style={{ width: '15%', padding: '4px' }}>
                                                    <span>{invoice.invoiceDate || "N/A"}</span>
                                                </div>
                                                <div style={{ width: '10%', padding: '4px' }}>
                                                    <span>{invoice.totalTax !== undefined ? invoice.totalTax : invoice.igstAmount || "N/A"}</span>
                                                </div>
                                                <div style={{ width: '10%', padding: '4px' }}>
                                                    <span>{invoice.total || "N/A"}</span>
                                                </div>
                                                <div style={{ width: '10%', padding: '4px' }}>
                                                    <span style={{ color:'#000' }}>
                                                        {invoice.Status || "N/A"}
                                                    </span>
                                                </div>
                                                {/* action buttons */}
                                                <div style={{ width: '20%', padding: '4px', display: 'flex', gap: '10px' }}>

                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                        <img 
                                                            src={ic_download} 
                                                            style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }} 
                                                            alt="Swap"
                                                            onClick={() => handleDownload(order, (index + 1).toString().padStart(3, '0'))}
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
                                                            onClick={() => setCreateInvoice(!createInvoice)}
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
                                                            Edit Invoice
                                                        </div>
                                                    </div>
                                                    {/* delete order  */}
                                              <div style={{ position: "relative", display: "inline-block" }}>
                                                    <img 
                                                    src={ic_info} 
                                                    style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }} 
                                                    alt="Swap"
                                                    onMouseEnter={(e) => e.currentTarget.nextSibling.style.visibility = "visible"}
                                                    onMouseLeave={(e) => e.currentTarget.nextSibling.style.visibility = "hidden"}
                                                    onClick={() => handleDeleteClick(invoice)}
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
                                                        Delete Invoice
                                                    </div>
                                                </div>
                                                   {showDeletePopup && (
                                                <div  style={{
                                                    position: "fixed", 
                                                    top: 0, left: 0, width: "100%", height: "100%",
                                                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    zIndex: 1000
                                                    }}>
                                                    <div  style={{
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
                                                    {/* MAIL */}
                                                    <div style={{ position: "relative", display: "inline-block" }}>
                                                        <img 
                                                            src={ic_email} 
                                                            style={{ height: "16px", marginLeft: "15px", cursor: "pointer" }} 
                                                            alt="Swap"
                                                            onClick={() => openEmailModal(invoice)}
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
                                                        Email Invoice
                                                        </div>
                                                    </div>                           
                                                </div>
                                            </div>
                                    ))
                                ): (<div style={{
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
                                        )}
                                    </div>       
                                </div>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                                <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                        padding: '5px 20px',
                                        width: '200px',
                                        border: '1px solid #828282',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }} onClick={() => alert('Button clicked!')}>
                                    <Text as="p" tone="subdued">Result per page 50</Text>
                                    <div style={{ marginLeft: '10px', paddingTop: '5px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                            <path d="M8.73458 10.9249C8.81844 11.0075 8.88498 11.1056 8.93038 11.2136C8.97578 11.3216 8.99915 11.4374 8.99915 11.5544C8.99915 11.6713 8.97578 11.7872 8.93038 11.8952C8.88498 12.0032 8.81844 12.1013 8.73458 12.1839L5.13642 15.7386C5.05285 15.8215 4.95355 15.8872 4.84421 15.9321C4.73487 15.9769 4.61764 16 4.49925 16C4.38086 16 4.26363 15.9769 4.15429 15.9321C4.04495 15.8872 3.94565 15.8215 3.86208 15.7386L0.263925 12.1839C0.0949367 12.0169 -3.56117e-09 11.7905 0 11.5544C3.56117e-09 11.3183 0.0949367 11.0918 0.263925 10.9249C0.432914 10.7579 0.662112 10.6642 0.901098 10.6642C1.14008 10.6642 1.36928 10.7579 1.53827 10.9249L4.5 13.8494L7.46173 10.9227C7.54542 10.8402 7.64475 10.7748 7.75403 10.7303C7.86331 10.6858 7.98041 10.6629 8.09862 10.6631C8.21683 10.6633 8.33384 10.6866 8.44297 10.7315C8.55209 10.7764 8.65118 10.8421 8.73458 10.9249ZM1.53827 5.07437L4.5 2.14836L7.46173 5.07511C7.63072 5.24206 7.85992 5.33585 8.0989 5.33585C8.33789 5.33585 8.56709 5.24206 8.73607 5.07511C8.90506 4.90816 9 4.68172 9 4.44562C9 4.20952 8.90506 3.98308 8.73607 3.81613L5.13792 0.261382C5.05435 0.178533 4.95505 0.112797 4.84571 0.0679427C4.73637 0.0230889 4.61914 0 4.50075 0C4.38236 0 4.26513 0.0230889 4.15579 0.0679427C4.04645 0.112797 3.94715 0.178533 3.86358 0.261382L0.265425 3.81613C0.0964363 3.98308 0.00149898 4.20952 0.00149898 4.44562C0.00149898 4.68172 0.0964363 4.90816 0.265425 5.07511C0.434414 5.24206 0.663612 5.33585 0.902598 5.33585C1.14158 5.33585 1.37078 5.24206 1.53977 5.07511L1.53827 5.07437Z" fill="#858585" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}