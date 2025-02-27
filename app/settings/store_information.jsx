import {
    Text,
    Page,
    FooterHelp,
    Card,
    Divider,
    TextField,
    Scrollable,
} from "@shopify/polaris";
import icLogoPlacerholder from '../assets/images/ic_logo_placerholder.png'
import ic_info from '../assets/images/ic_info.png'
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "@remix-run/react";

export function StoreInformation() {


    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const session = useLoaderData();
    const storeName = session.storeName;

    const [formValues, setFormValues] = useState({
        company_legal_name: "",
        brand_name: "",
        store_phone: "",
        store_email: "",
        store_address: "",
        contact_person: "",
        store_city: "",
        store_pincode: "",
        store_state: "",
        store_state_code: "",
        store_country: "",
        store_country_code: "",
        gst_number: "",
        iec_code: "",
        cin_number: "",
        pan_number: "",
        fssai_lic_number: "",
    });

    useEffect(() => {
        const fetchStoreData = async () => {
            if (session.storeName) { // Check if session.storeName exists
                setLoading(true); // Set loading to true before fetching
                try {
                    const response = await fetch(`http://localhost:3001/api/settings/${storeName}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStoreData(data);
                        setFormValues({
                            company_legal_name: data.company_legal_name || "",
                            brand_name: data.brand_name || "",
                            store_phone: data.store_phone || "",
                            store_email: data.store_email || "",
                            store_address: data.store_address || "",
                            contact_person: data.contact_person || "",
                            store_city: data.store_city || "",
                            store_pincode: data.store_pincode || "",
                            store_state: data.store_state || "",
                            store_state_code: data.store_state_code || "",
                            store_country: data.store_country || "",
                            store_country_code: data.store_country_code || "",
                            gst_number: data.gst_number || "",
                            iec_code: data.iec_code || "",
                            cin_number: data.cin_number || "",
                            pan_number: data.pan_number || "",
                            fssai_lic_number: data.fssai_lic_number || "",
                        });
                        console.log("Store data:", data);
                    } else {
                        // Handle the error appropriately, e.g., show an error message
                        console.error("Error fetching store data:", response.status, await response.text());
                    }
                } catch (error) {
                    console.error("Error fetching store data:", error);
                    // Handle the error appropriately
                } finally {
                    setLoading(false); // Set loading to false after fetching, regardless of success or failure
                }
            }
        };

        fetchStoreData(); // Call the async function inside the effect
    }, [session.storeName]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const logoImageRef = useRef(null); // Ref for logo image
    const signatureImageRef = useRef(null); // Ref for signature image
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedLogoImage, setSelectedLogoImage] = useState(null);
    const [selectedSignatureImage, setSelectedSignatureImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorImageMessage, setErrorImageMessage] = useState({});


    const handleLogoImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                if (img.width > 250 || img.height > 125) {
                    setErrorImageMessage(prevErrors => ({ ...prevErrors, logoImage: "Image dimensions should not exceed 250px width and 125px height." }));
                    setSelectedLogoImage(null);
                    logoImageRef.current.src = icLogoPlacerholder;
                } else {
                    setErrorImageMessage({ logoImage: "" });
                    setSelectedLogoImage(file); // Set the selected image as a data URL
                    logoImageRef.current.src = img.src;
                }
            };
        }
    };

    const handleSignatureImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                if (img.width > 150 || img.height > 80) {
                    setErrorImageMessage(prevErrors => ({ ...prevErrors, signatureImage: "Image dimensions should not exceed 150px width and 80px height." }));
                    setSelectedSignatureImage(null);
                    signatureImageRef.current.src = icLogoPlacerholder;
                } else {
                    setErrorImageMessage({ signatureImage: "" });
                    setSelectedSignatureImage(file); // Set the selected image as a data URL
                    signatureImageRef.current.src = img.src;
                }
            };
        }
    };

    const handleSubmit = async () => {
        setErrorMessage(null);  // Clear previous error messages
        setSuccessMessage(null); // Clear previous success messages

        const formData = new FormData();

        // Append text fields to FormData
        for (const key in formValues) {
            formData.append(key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(), formValues[key]);
            console.log("Form Data: ", key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase());
        }

        formData.append('store_name', storeName);
        // Append files to FormData
        if (selectedLogoImage) {
            formData.append('logo_image', selectedLogoImage);
        }

        if (selectedSignatureImage) {
            formData.append('signature_image', selectedSignatureImage);
        }
        try {
            const response = await fetch('http://localhost:3001/api/settings', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Settings saved successfully!');
            } else {
                const errorData = await response.json(); // Assuming your API returns JSON error data

                setErrorMessage(errorData.message || 'An error occurred while saving settings.');


            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('A network error occurred.');
        }
    };

    const getFullImageUrl = (url) => {
        if (!url) return icLogoPlacerholder;
        return url.startsWith('http') ? url : `http://localhost:3001/${url}`;
    };

    return (
        <Page>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text variant="headingXl" as="h4">Store Information</Text>
                    <div style={{ cursor: 'pointer', backgroundColor: '#74A535', padding: '10px 20px', fontSize: '15px', color: 'white', borderRadius: '10px' }} onClick={handleSubmit}>Save</div>
                </div>
                {successMessage && (
                    <Text as="p" variant="positive" style={{ marginTop: '10px' }}>{successMessage}</Text>
                )}
                {errorMessage && (
                    <Text as="p" tone="critical" style={{ color: "red", marginTop: "10px" }}>{errorMessage}</Text>
                )}

                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <Card>
                            <Text as="p" fontWeight="bold">Logo Image</Text>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '20px',
                                marginBottom: '20px',
                                justifyContent: 'center',
                                width: '100%'
                            }}>
                                <img
                                    ref={logoImageRef}
                                    src={selectedLogoImage
                                        ? URL.createObjectURL(selectedLogoImage)
                                        : storeData
                                            ? getFullImageUrl(storeData.logo_image)
                                            : icLogoPlacerholder}
                                    style={{ height: '80px', cursor: 'pointer' }}
                                    onClick={() => document.getElementById('logoImage').click()} // Trigger file input on image click
                                    alt="Logo"
                                />

                            </div>
                            <div style={{ borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <img src={ic_info} style={{ height: '20px' }} />
                                </div>
                                <Text variant="bodyLg" as="p">Image should be in JPEG-JPG/PNG format with No more than 250 pixels of Width and 125 pixels of Height. (max-width:250, max-height:125)</Text>
                            </div>
                            <input
                                id="logoImage"
                                type="file"
                                accept="image/jpeg, image/jpg, image/png" // Allow only JPEG/JPG and PNG files
                                style={{ display: 'none' }}
                                onChange={handleLogoImageChange}
                            />
                        </Card>
                        {errorImageMessage.logoImage && (
                            <Text as="p" tone="critical" style={{ color: "red", marginTop: "10px" }}>
                                {errorImageMessage.logoImage}
                            </Text>
                        )}
                    </div>

                    <div style={{ width: '100%', marginLeft: '10px' }}>
                        <Card>
                            <Text as="p" fontWeight="bold">Signature Image</Text>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '20px',
                                marginBottom: '20px',
                                justifyContent: 'center',
                                width: '100%'
                            }}>
                                <img
                                    ref={signatureImageRef}
                                    src={selectedSignatureImage
                                        ? URL.createObjectURL(selectedSignatureImage)
                                        : storeData
                                            ? getFullImageUrl(storeData.signature_image)
                                            : icLogoPlacerholder}

                                    style={{ height: '80px', cursor: 'pointer' }}
                                    onClick={() => document.getElementById('signatureImage').click()} // Trigger file input on image click
                                    alt="Logo"
                                />

                            </div>
                            <div style={{ borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <img src={ic_info} style={{ height: '20px' }} />
                                </div>
                                <Text variant="bodyLg" as="p">Image should be in PNG format with No more than 150 pixels of Width and 80 pixels of Height. (max-width:150, max-height:80)</Text>
                            </div>
                            <input
                                id="signatureImage"
                                type="file"
                                accept="image/jpeg, image/jpg, image/png" // Allow only JPEG/JPG and PNG files
                                style={{ display: 'none' }}
                                onChange={handleSignatureImageChange}
                            />
                        </Card>
                        {errorImageMessage.signatureImage && (
                            <Text as="p" tone="critical" style={{ color: "red", marginTop: "10px" }}>
                                {errorImageMessage.signatureImage}
                            </Text>
                        )}

                    </div>

                </div>
                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text as="p" fontWeight="bold">Signature Image</Text>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Divider />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Company Legal Name
                                </div>

                                <input
                                    type="text"
                                    name="company_legal_name"
                                    value={formValues.company_legal_name}
                                    onChange={handleChange}
                                    placeholder="Enter Company Name"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Brand Name
                                </div>
                                <input
                                    type="text"
                                    name="brand_name"
                                    value={formValues.brand_name}
                                    onChange={handleChange}
                                    placeholder="Enter Brand Name"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store Phone
                                </div>

                                <input
                                    type="text"
                                    name="store_phone"
                                    value={formValues.store_phone}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store Email
                                </div>

                                <input
                                    type="text"
                                    name="store_email"
                                    value={formValues.store_email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store Address
                                </div>

                                <input
                                    type="text"
                                    name="store_address"
                                    value={formValues.store_address}
                                    onChange={handleChange}
                                    placeholder="Enter Address"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Contact Person
                                </div>

                                <input
                                    type="text"
                                    name="contact_person"
                                    value={formValues.contact_person}
                                    onChange={handleChange}
                                    placeholder="Enter Address"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store City
                                </div>

                                <input
                                    type="text"
                                    name="store_city"
                                    value={formValues.store_city}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store Pincode
                                </div>

                                <input
                                    type="text"
                                    name="store_pincode"
                                    value={formValues.store_pincode}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store State
                                </div>

                                <input
                                    type="text"
                                    name="store_state"
                                    value={formValues.store_state}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store State Code
                                </div>

                                <input
                                    type="text"
                                    name="store_state_code"
                                    value={formValues.store_state_code}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />


                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store Country
                                </div>

                                <input
                                    type="text"
                                    name="store_country"
                                    value={formValues.store_country}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Store Country Code
                                </div>

                                <input
                                    type="text"
                                    name="store_country_code"
                                    value={formValues.store_country_code}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text as="p" fontWeight="bold">GST Store</Text>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Divider />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    GST Number
                                </div>
                                <input
                                    type="text"
                                    name="gst_number"
                                    value={formValues.gst_number}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Import Export Code (IEC Code)
                                </div>
                                <input
                                    type="text"
                                    name="iec_code"
                                    value={formValues.iec_code}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    CIN Number
                                </div>
                                <input
                                    type="text"
                                    name="cin_number"
                                    value={formValues.cin_number}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    PAN Number
                                </div>
                                <input
                                    type="text"
                                    name="pan_number"
                                    value={formValues.pan_number}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    FSSAI LIC Number
                                </div>
                                <input
                                    type="text"
                                    name="fssai_lic_number"
                                    value={formValues.fssai_lic_number}
                                    onChange={handleChange}
                                    placeholder=""
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>

                            </div>
                        </div>
                    </Card>
                </div>

                <div style={{ width: '100%', marginTop: '10px' }}>
                    <Card>
                        <Text as="p" fontWeight="bold">Terms and Conditions</Text>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Divider />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Text variant="headingMd" as="h6">Online Orders</Text>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Card>

                                <Scrollable shadow style={{ height: '100px' }} focusable>
                                    <p>Order Confirmation:</p><br /><br />
                                    <p>Orders placed through the website are subject to confirmation via email or SMS.
                                        Payment must be completed at checkout unless specified otherwise.</p>
                                </Scrollable>


                            </Card>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Text variant="headingMd" as="h6">Offline Orders</Text>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Card>

                                <Scrollable shadow style={{ height: '100px' }} focusable>
                                    <p>Payment Terms:</p><br /><br />
                                    <p>Payments can be made via cash, credit/debit card, or UPI at the point of sale.
                                        Advance payments may be required for large orders.</p>
                                </Scrollable>


                            </Card>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <Text variant="headingMd" as="h6">Estimates</Text>
                        </div>


                        <div style={{ marginTop: '10px' }}>
                            <Card>

                                <Scrollable shadow style={{ height: '100px' }} focusable>
                                    <p>Validity:</p><br /><br />
                                    <p>All estimates are valid for a period of 15 days from the date of issue unless stated otherwise.
                                        Prices in estimates are subject to change based on market conditions.</p>
                                </Scrollable>


                            </Card>
                        </div>
                    </Card>
                </div>

                <FooterHelp>
                    @2024 Virtue. All Rights Reserved.
                </FooterHelp>
            </div>
        </Page>

    );
}