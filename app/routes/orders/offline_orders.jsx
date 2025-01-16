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
import ic_swap from '../../assets/images/ic_swap.png';
import ic_print from '../../assets/images/ic_print.png';
import ic_email from '../../assets/images/ic_email.png';
import ic_calculator from '../../assets/images/ic_calculator.png';
import ic_pick_up from '../../assets/images/ic_pick_up.png';
import ic_fulfillment from '../../assets/images/ic_fulfillment.png';
import ic_refresh from '../../assets/images/ic_refresh.png';
import { useCallback, useState } from "react";
import { CreateNewInvoice } from "./create_new_invoice";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Editor } from '@tinymce/tinymce-react';

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

export function SendEmailInvoiceDialog({ active, toggleModal }) {


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
                        <Text variant="headingLg">Send Invoice Email</Text>
                        <div style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19.5347 0.465273C18.9142 -0.15509 17.9083 -0.155091 17.2877 0.465273L10 7.75298L2.71229 0.465273C2.09174 -0.155091 1.08583 -0.155091 0.465273 0.465273C-0.155091 1.08582 -0.155091 2.09174 0.465273 2.71229L7.75298 10L0.465273 17.2877C-0.155091 17.9083 -0.15509 18.9142 0.465275 19.5347C1.08583 20.1551 2.09174 20.1551 2.71229 19.5347L10 12.247L17.2877 19.5347C17.9083 20.1551 18.9142 20.1551 19.5347 19.5347C20.1551 18.9142 20.1551 17.9083 19.5347 17.2877L12.247 10L19.5347 2.71229C20.1551 2.09174 20.1551 1.08583 19.5347 0.465273Z" fill="white" />
                            </svg>
                        </div>
                    </div>

                    <div style={{ marginTop: '10px', marginRight: '10px', marginLeft: '10px' }}>
                        <TextField
                            label="Subject"
                            placeholder="Invoice_Number"
                        />
                    </div>

                    <div style={{ marginTop: '10px', marginRight: '10px', marginLeft: '10px' }}>
                        <TextField
                            label="To"
                            placeholder="Customer_Name"
                        />
                    </div>

                    <div style={{ marginTop: '10px', marginRight: '10px', marginLeft: '10px' }}>
                        <Text as="p" fontWeight="regular">
                            Content
                        </Text>
                    </div>

                    <div>
                        {/* <RichText /> */}

                    </div>

                </div>
            )}
        </div>
    );
}


export function OfflineOrders() {

    const [textEditor, setTextEditor] = useState("")

    const [createInvoice, setCreateInvoice] = useState(false)



    const shopify = useAppBridge();

    const [active, setActive] = useState(false);
    const toggleModal = useCallback(() => setActive((active) => !active), []);

    const [emailActive, setEmailActive] = useState(false);
    const toggleEmailActiveModal = useCallback(() => setEmailActive((active) => !emailActive), []);


    const [content, setContent] = useState('');

    const handleEditorChange = (content) => {
        setContent(content);
        console.log('Editor Content:', content); // Use this to debug or save the content
    };

    const handleChange = (value) => {
        setContent(value);
    };

    if (typeof window === "undefined") {
        return <div>Loading editor...</div>; // Fallback for SSR
    }

    return (
        <>
            <Dialog active={active} toggleModal={toggleModal} />
            <SendEmailInvoiceDialog active={emailActive} toggleModal={toggleEmailActiveModal} />
            <div>
                <Editor
                    apiKey="your-api-key" // Replace with your valid API key
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 500,
                        menubar: true, // Show the menu bar for debugging purposes
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <div>
                {createInvoice ? (<CreateNewInvoice />) : (<div>
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
                                    <div style={{ display: 'flow', width: '35%' }}>
                                        <TextField
                                            placeholder="Order No,Invoice No,Customer"
                                            prefix={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={searchIcon}
                                                        style={{ height: '15px' }} />
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div style={{ display: 'flow', width: '20%', marginLeft: '16px' }}>
                                        <TextField
                                            placeholder="Select Date"
                                            prefix={<div style={{ display: 'flex', alignItems: 'center' }}><img src={ic_date} style={{ height: '15px' }} /></div>}
                                        />
                                    </div>
                                    <div style={{ display: 'flow', width: '20%', marginLeft: '16px' }}>
                                        <TextField
                                            placeholder="Select End Date"
                                            prefix={<div style={{ display: 'flex', alignItems: 'center' }}><img src={ic_date} style={{ height: '15px' }} /></div>}
                                        />
                                    </div>
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
                                            marginLeft: '16px'
                                        }}
                                        onClick={() => alert('Button clicked!')}
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
                                    onClick={() => alert('Button clicked!')}
                                >
                                    <Text as="p" tone="subdued">Clear</Text>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text variant="headingMd" fontWeight="regular">Actions on 0 selected</Text>
                                    <div
                                        style={{
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
                                        onClick={() => toggleModal()}
                                    >
                                        <Text as="p" tone="subdued">Bulk Download</Text>
                                    </div>
                                    <div style={{ backgroundColor: '#74A535', padding: '5px 20px', marginLeft: '20px', borderRadius: '4px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                            <path d="M13.1143 21C13.7281 21 14.3167 20.7511 14.7507 20.308C15.1847 19.865 15.4286 19.2641 15.4286 18.6375V17.8563H16.4571C16.8663 17.8563 17.2588 17.6904 17.5481 17.395C17.8375 17.0996 18 16.699 18 16.2813V11.8125C18 11.3948 17.8375 10.9942 17.5481 10.6988C17.2588 10.4034 16.8663 10.2375 16.4571 10.2375H6.17143C5.76224 10.2375 5.36981 10.4034 5.08046 10.6988C4.79112 10.9942 4.62857 11.3948 4.62857 11.8125V16.2813C4.62857 16.699 4.79112 17.0996 5.08046 17.395C5.36981 17.6904 5.76224 17.8563 6.17143 17.8563H13.8857V18.6375C13.8857 18.8464 13.8044 19.0467 13.6598 19.1943C13.5151 19.342 13.3189 19.425 13.1143 19.425H2.31429C2.10969 19.425 1.91347 19.342 1.7688 19.1943C1.62413 19.0467 1.54286 18.8464 1.54286 18.6375V8.1375H5.65714C5.96123 8.1375 6.26234 8.07632 6.54326 7.95746C6.82417 7.83861 7.07939 7.6644 7.29432 7.4448C7.50925 7.2252 7.67967 6.96451 7.79586 6.67763C7.91204 6.39076 7.9717 6.08332 7.97143 5.7729L7.9704 1.575H13.1153C13.3199 1.575 13.5161 1.65797 13.6608 1.80565C13.8055 1.95334 13.8867 2.15364 13.8867 2.3625V10.2249H15.4296V2.3625C15.4296 2.05216 15.3697 1.74487 15.2533 1.45817C15.137 1.17147 14.9664 0.910981 14.7514 0.691589C14.5364 0.472197 14.2811 0.298198 14.0002 0.179533C13.7193 0.0608685 13.4183 -0.000137694 13.1143 2.33354e-07H7.83566C7.5315 -2.54051e-06 7.23032 0.0612015 6.94934 0.180112C6.66837 0.299023 6.41311 0.473308 6.19817 0.693L0.678857 6.3315C0.463648 6.55092 0.29292 6.81149 0.176436 7.09832C0.059952 7.38515 -2.71716e-06 7.6926 0 8.0031V18.6375C0 19.2641 0.243826 19.865 0.677839 20.308C1.11185 20.7511 1.7005 21 2.31429 21H13.1143ZM6.42754 2.68695L6.4296 5.77395C6.42974 5.87745 6.40988 5.97997 6.37117 6.07564C6.33247 6.1713 6.27567 6.25824 6.20402 6.33148C6.13237 6.40471 6.04728 6.46281 5.95362 6.50245C5.85996 6.5421 5.75956 6.5625 5.65817 6.5625H2.63314L6.42754 2.68695ZM14.1603 11.8251C14.4552 11.8251 14.7141 11.8864 14.9369 12.0089C15.1611 12.1279 15.3333 12.2993 15.4533 12.5233C15.5781 12.7438 15.6405 12.9976 15.6405 13.2846C15.6405 13.5681 15.576 13.818 15.4471 14.0343C15.3177 14.2511 15.1298 14.4254 14.9061 14.5362C14.6736 14.6538 14.4062 14.713 14.1038 14.7137H13.4455C13.4249 14.7137 13.4143 14.7241 13.4136 14.7451V16.1731C13.4141 16.1989 13.4053 16.2239 13.3889 16.2435C13.3697 16.2602 13.3452 16.2692 13.32 16.2687H12.3377C12.3125 16.2692 12.288 16.2602 12.2688 16.2435C12.2526 16.2242 12.2439 16.1996 12.2441 16.1742V11.9196C12.2439 11.8942 12.2526 11.8696 12.2688 11.8503C12.288 11.8336 12.3125 11.8246 12.3377 11.8251H14.1603ZM10.6354 16.2435C10.6189 16.2244 10.6098 16.1997 10.6097 16.1742V11.9196C10.6095 11.8942 10.6182 11.8696 10.6344 11.8503C10.6536 11.8336 10.6781 11.8246 10.7033 11.8251H11.6856C11.7108 11.8246 11.7353 11.8336 11.7545 11.8503C11.7707 11.8696 11.7794 11.8942 11.7792 11.9196V16.1742C11.7794 16.1996 11.7707 16.2242 11.7545 16.2435C11.7353 16.2602 11.7108 16.2692 11.6856 16.2687H10.7033C10.6784 16.269 10.6543 16.26 10.6354 16.2435ZM7.11771 16.2687C7.09249 16.2692 7.06797 16.2602 7.0488 16.2435C7.03264 16.2242 7.02387 16.1996 7.02412 16.1742V15.2534C7.02387 15.211 7.0393 15.1701 7.06732 15.1389L8.8776 12.8856C8.88583 12.8765 8.88789 12.8677 8.88377 12.8593C8.87966 12.8509 8.87143 12.8467 8.85909 12.8467H7.11771C7.09249 12.8473 7.06797 12.8383 7.0488 12.8216C7.03264 12.8023 7.02387 12.7776 7.02412 12.7523V11.9196C7.02387 11.8942 7.03264 11.8696 7.0488 11.8503C7.06797 11.8336 7.09249 11.8246 7.11771 11.8251H10.1088C10.134 11.8246 10.1585 11.8336 10.1777 11.8503C10.1939 11.8696 10.2027 11.8942 10.2024 11.9196V12.8342C10.2032 12.8563 10.1997 12.8783 10.1921 12.899C10.1845 12.9198 10.173 12.9387 10.1582 12.9549L8.33657 15.2093C8.32834 15.2177 8.32629 15.2261 8.3304 15.2345C8.33451 15.2429 8.34274 15.2471 8.35509 15.2471H10.1088C10.134 15.2465 10.1585 15.2555 10.1777 15.2723C10.1939 15.2915 10.2027 15.3162 10.2024 15.3415V16.1742C10.2027 16.1996 10.1939 16.2242 10.1777 16.2435C10.1585 16.2602 10.134 16.2692 10.1088 16.2687H7.11771Z" fill="white" />
                                        </svg>
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
                                    onClick={() => alert('Button clicked!')}
                                >
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
                                <div style={{ color: 'white', width: '10%' }}>
                                    <Text>Customer</Text>
                                </div>
                                <div style={{ color: 'white', width: '10%' }}>
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
                                <div style={{ color: 'white', width: '10%' }}>
                                    <Text>Action</Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div style={{ color: 'black', width: '10%' }}>
                                    <Text>001</Text>
                                </div>
                                <div style={{ color: 'black', width: '10%' }}>
                                    <Text>Paras Virani</Text>
                                </div>
                                <div style={{ color: 'black', width: '10%' }}>
                                    <Text>3 Dec 2024</Text>
                                </div>
                                <div style={{ color: 'black', width: '10%' }}>
                                    <Text>0.00</Text>
                                </div>
                                <div style={{ color: 'black', width: '10%' }}>
                                    <Text>100.00</Text>
                                </div>
                                <div style={{ color: 'black', width: '10%' }}>
                                    <div style={{ display: 'flex', width: '50px', backgroundColor: '#EDF7DF', color: "#74A535", justifyContent: 'center', borderRadius: '50px' }}>
                                        <Text>Paid</Text>
                                    </div>

                                </div>
                                <div style={{ width: '30%' }}>
                                    <img src={ic_download} style={{ height: '16px', cursor: 'pointer' }} alt="Download" />
                                    <img src={ic_edit} style={{ height: '16px', marginLeft: '15px' }} />
                                    <img src={ic_swap} style={{ height: '16px', marginLeft: '15px' }} />
                                    <img src={ic_print} style={{ height: '16px', marginLeft: '15px' }} />
                                    <img src={ic_email} style={{ height: '16px', marginLeft: '15px', cursor: 'pointer' }} onClick={toggleEmailActiveModal} />
                                    <img src={ic_calculator} style={{ height: '16px', marginLeft: '15px' }} />
                                    <img src={ic_pick_up} style={{ height: '16px', marginLeft: '15px' }} />
                                    <img src={ic_fulfillment} style={{ height: '16px', marginLeft: '15px' }} />
                                    <img src={ic_refresh} style={{ height: '16px', marginLeft: '15px' }} />
                                </div>
                            </div>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                        padding: '5px 20px',
                                        width: '200px',
                                        border: '1px solid #828282',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => alert('Button clicked!')}
                                >
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


                </div>)}
            </div>
        </>

    );
}