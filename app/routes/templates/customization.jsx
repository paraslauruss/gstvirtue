import { Page } from "@shopify/polaris";
import './customization.css'
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import getCroppedImg from "../utils/cropImage";
import ImageCropper from "./ImageCropper";
import PopupDialog from '../utils/PopupDialog';
import { createRoot } from 'react-dom/client';
import invoice_ph from '../../assets/images/invoice_ph.png';
import { CustomizationLabel } from "./customization_label";
import { useLoaderData } from "@remix-run/react";
import ColorPickerModal from "../components/ColorPickerModal";
import { Standard } from "./invoice/standard";
import { Classic } from "./invoice/classic";
import { Modern } from "./invoice/modern";
import { Minimal } from "./invoice/minimal";
import { Informatinve } from "./invoice/Informative";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export const Customization = ({ onClick }) => {

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;
    // Open Logo Image Popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Open Signature Image Popup
    const [isSignaturePopupOpen, setIsSignaturePopupOpen] = useState(false);

    const openSignaturePopup = () => {
        setIsSignaturePopupOpen(true);
    };

    const closeSignaturePopup = () => {
        setIsSignaturePopupOpen(false);
    };

    const [htmlContent, setHtmlContent] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [signatureUrl, setSignatureLogoUrl] = useState(null);

    const [isBgModalOpen, setIsBgModalOpen] = useState(false);
    const [bgColor, setBgColor] = useState("#ccc");
    const [templateType, setTemplateType] = useState("Standard");

    const handleBgSave = (bg, text) => {
        setBgColor(bg);
        setIsBgModalOpen(false);
    };

    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [textColor, setTextColor] = useState("#000");

    const handleTextSave = (bg, text) => {
        setTextColor(bg);
        setIsTextModalOpen(false);
    };

    const states = [
        "Roboto",
        "Poppins",
        "Rubik",
        "Calibri",
    ];

    const [formValues, setFormValues] = useState({
        state: "Roboto"
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Fetch Logo
    useEffect(() => {
        const fetchLogoUrl = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/template/', {
                    method: 'GET',
                    headers: {
                        'store-name': 'gst-virtue-paras.myshopify.com',
                        'api-version': '2025-01',
                        'access-token': 'shpua_649d3ab48e3b42cbc6c31b5bd9ad8e89'
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.signatureUrl != null) {
                        setSignatureLogoUrl(`http://localhost:3001${data.signatureUrl}`);
                    }

                    if (data.fontStyle != null) {
                        setFormValues({
                            state: `${data.fontStyle}`
                        });
                    }

                    if (data.textColor != null) {
                        setTextColor(`${data.textColor}`);
                    }

                    if (data.backgroundColor != null) {
                        setBgColor(`${data.backgroundColor}`);
                    }

                    if (data.template_type != null) {
                        setTemplateType(`${data.template_type}`);
                    }

                } else {
                    console.error('Error fetching logo URL:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching logo URL:', error);
            }
        };

        fetchLogoUrl();
    }, []);

    const handleSaveStyle = () => {
        console.log("Save and Preview", JSON.stringify(formData));
        fetch('http://localhost:3001/api/template/change-style', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'store-name': storeName,
                'api-version': '2025-01',
                'access-token': accessToken
            },
            body: JSON.stringify({
                fontStyle: formValues.state,
                textColor: textColor,
                backgroundColor: bgColor
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                closeChangeStylePopup();
                shopify.toast.show("Success");
            })
            .catch((error) => {
                console.error('Error:', error);
                shopify.toast.show("Error");
            });
    };
    const handleResetStyle = () => {
        console.log("Save and Preview", JSON.stringify(formData));
        fetch('http://localhost:3001/api/template/reset-style', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'store-name': storeName,
                'api-version': '2025-01',
                'access-token': accessToken
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.fontStyle != null) {
                    setFormValues({
                        state: `${data.fontStyle}`
                    });
                }

                if (data.textColor != null) {
                    setTextColor(`${data.textColor}`);
                }

                if (data.backgroundColor != null) {
                    setBgColor(`${data.backgroundColor}`);
                }
                closeChangeStylePopup();
                shopify.toast.show("Success");
            })
            .catch((error) => {
                console.error('Error:', error);
                shopify.toast.show("Error");
            });
    };



    // Get HTML Template
    useEffect(() => {
        const fetchHtmlContent = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/html/standard');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                console.error('Failed to fetch HTML content:', error);
            }
        };

        fetchHtmlContent();
    }, []);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const logo = (<div>
        <input type="file" accept="image/*" id="logoInput" style={{ display: "none" }} />
        {logoUrl ? (
            <img
                src={logoUrl}
                alt="Logo"
                id="logoImage"
                onClick={openPopup}
                onError={() => setLogoUrl(null)}
                style={{ cursor: 'pointer', width: "250px", height: "125px", marginTop: "10px" }}
            />
        ) : (
            <button
                style={{
                    backgroundColor: "#74A535",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    color: "white",
                    cursor: "pointer",
                }}
                type="button"
                onClick={openPopup}
            >
                Add Logo
            </button>
        )}
    </div>);

    const signature = (
        <div>
            <input type="file" accept="image/*" id="signatureInput" style={{ display: "none" }} />
            {signatureUrl ? (
                <img
                    src={signatureUrl}
                    alt="Signature"
                    id="signatureImage"
                    onClick={openSignaturePopup}
                    style={{ cursor: 'pointer', width: "150px", height: "80px", marginTop: "10px" }}
                />
            ) : (
                <button
                    style={{
                        backgroundColor: "#74A535",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        color: "white",
                        cursor: "pointer",
                    }}
                    type="button"
                    onClick={openSignaturePopup}
                >
                    Add Signature
                </button>
            )}
        </div>
    );


    useEffect(() => {
        const addLogoButton = document.getElementById('addLogoButton');
        const logoInput = document.getElementById('logoInput');
        const logoImage = document.getElementById('logoImage');

        const triggerFileInput = () => {
            logoInput.click();
        };

        if (addLogoButton) {
            addLogoButton.addEventListener('click', triggerFileInput);
        }

        if (logoImage) {
            logoImage.addEventListener('click', triggerFileInput);
        }

        if (logoInput) {
            logoInput.addEventListener('change', handleLogoChange);
        }

        return () => {
            if (addLogoButton) {
                addLogoButton.removeEventListener('click', triggerFileInput);
            }

            if (logoImage) {
                logoImage.removeEventListener('click', triggerFileInput);
            }

            if (logoInput) {
                logoInput.removeEventListener('change', handleLogoChange);
            }
        };
    }, [htmlContent]);

    useEffect(() => {
        const addSignatureButton = document.getElementById('addSignatureButton');
        const signatureInput = document.getElementById('signatureInput');
        const signatureImage = document.getElementById('signatureImage');

        const triggerFileInput = () => {
            signatureInput.click();
        };

        if (addSignatureButton) {
            addSignatureButton.addEventListener('click', triggerFileInput);
        }

        if (signatureImage) {
            signatureImage.addEventListener('click', triggerFileInput);
        }

        if (signatureInput) {
            signatureInput.addEventListener('change', handleSignatureFileChange);
        }

        return () => {
            if (addSignatureButton) {
                addSignatureButton.removeEventListener('click', triggerFileInput);
            }

            if (signatureImage) {
                signatureImage.removeEventListener('click', triggerFileInput);
            }

            if (signatureInput) {
                signatureInput.removeEventListener('change', handleSignatureFileChange);
            }
        };
    }, []);

    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Signature File
    const [imageSignatureSrc, setImageSignatureSrc] = useState(null);
    const [croppedSignatureImage, setCroppedSignatureImage] = useState(null);
    const [selectedSignatureFile, setSelecteSignaturedFile] = useState(null);

    const [isCropLogoPopupOpen, setIsCropLogoPopupOpen] = useState(false);

    const openCropLogoPopup = () => {
        setIsCropLogoPopupOpen(true);
    };

    const closeCropLogoPopup = () => {
        setIsCropLogoPopupOpen(false);
    };

    // Signature Crop Logo Popup
    const [isSignatureCropLogoPopupOpen, setIsSignatureCropLogoPopupOpen] = useState(false);

    const openSignatureCropLogoPopup = () => {
        setIsSignatureCropLogoPopupOpen(true);
    };

    const closeSignatureCropLogoPopup = () => {
        setIsSignatureCropLogoPopupOpen(false);
    };

    // Change Style Popup
    const [isChangeStylePopupOpen, setIsChangeStylePopupOpen] = useState(false);

    const openChangeStylePopup = () => {
        setIsChangeStylePopupOpen(true);
    };

    const closeChangeStylePopup = () => {
        setIsChangeStylePopupOpen(false);
    };

    // logo file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);

            };
            reader.readAsDataURL(file);
            openCropLogoPopup();
        }
    };

    // singature file change
    const handleSignatureFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelecteSignaturedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSignatureSrc(e.target.result);

            };
            reader.readAsDataURL(file);
            openSignatureCropLogoPopup();
        }
    };

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropImage = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 250, 125);
            handleCropComplete(croppedImage);
            closeCropLogoPopup();
        } catch (e) {
            console.error(e);
        }
    };

    const onCropSignatureImage = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSignatureSrc, croppedAreaPixels, 150, 80);
            handleSignatureCropComplete(croppedImage);
            closeSignatureCropLogoPopup();
        } catch (e) {
            console.error(e);
        }
    };

    // Upload Logo
    const uploadLogo = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('store_name', storeName);
            formData.append('logo_image', selectedFile);

            try {
                const response = await fetch('http://localhost:3001/api/settings', {
                    method: 'POST',
                    headers: {
                        'store-name': storeName,
                        'api-version': '2025-01',
                        'access-token': accessToken
                    },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    setLogoUrl(`http://localhost:3001/${data?.settings?.logo_image}`);
                    closePopup();
                    //shopify.toast.show("Logo uploaded successfully:");
                    console.log('Logo uploaded successfully:', data?.settings?.logo_image);
                } else {
                    console.error('Error uploading logo:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading logo:', error);
            }
        } else {
            shopify.toast.show("Please select a file to upload");
        }

    };

    const uploadSignature = async () => {
        if (selectedSignatureFile) {
            const formData = new FormData();
            formData.append('store_name', storeName);
            formData.append('signature_image', selectedSignatureFile);

            try {
                const response = await fetch('http://localhost:3001/api/settings', {
                    method: 'POST',
                    headers: {
                        'store-name': storeData,
                        'api-version': '2025-01',
                        'access-token': accessToken
                    },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    setSignatureLogoUrl(`http://localhost:3001/${data?.settings?.signature_image}`);
                    closeSignaturePopup();
                    shopify.toast.show("Signature uploaded successfully:");
                    console.log('Signature uploaded successfully:', data?.settings?.signature_image);
                } else {
                    console.error('Error uploading signature:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading signature:', error);
            }
        } else {
            shopify.toast.show("Please select a file to upload");
        }

    };

    const handleCropComplete = (croppedImage) => {
        const fileExtension = selectedFile.name.split('.').pop();
        // shopify.toast.show(selectedFile.name);
        const croppedImageUrl = URL.createObjectURL(croppedImage);
        const croppedImageFile = new File([croppedImage], `croppedImage.${fileExtension}`, { type: selectedFile.type });
        setCroppedImage(croppedImageUrl);
        setSelectedFile(croppedImageFile);
    };

    const handleSignatureCropComplete = (croppedImage) => {
        const fileExtension = selectedSignatureFile.name.split('.').pop();
        // shopify.toast.show(selectedSignatureFile.name);
        const croppedImageUrl = URL.createObjectURL(croppedImage);
        const croppedImageFile = new File([croppedImage], `croppedSignatureImage.${fileExtension}`, { type: selectedSignatureFile.type });
        setCroppedSignatureImage(croppedImageUrl);
        setSelecteSignaturedFile(croppedImageFile);
        //setSignatureLogoUrl(croppedImageUrl);
    };

    // logo file reference
    const fileInputRef = useRef(null);
    const handleLogoClick = () => {
        // Trigger file input when div is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // signature file reference
    const fileSignatureInputRef = useRef(null);
    const handleSignatureLogoClick = () => {
        // Trigger file input when div is clicked
        if (fileSignatureInputRef.current) {
            fileSignatureInputRef.current.click();
        }
    };

    const [page, setPage] = useState('customization');

    const [formData, setFormData] = useState({});

    const handleFormDataChange = (updatedData) => {
        setFormData(updatedData);
    };
    const handleSaveAndPreview = () => {
        // API call
        console.log("Save and Preview", JSON.stringify(formData));
        fetch('http://localhost:3001/api/customize-label', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'store-name': storeName,
                'api-version': '2025-01',
                'access-token': accessToken
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                shopify.toast.show("Success");
            })
            .catch((error) => {
                console.error('Error:', error);
                shopify.toast.show("Error");
            });
    };





    const googleFonts = {
        "Roboto": "Roboto:wght@300;400;500;600;700",
        "Poppins": "Poppins:wght@300;400;500;600;700",
        "Rubik": "Rubik:wght@300;400;500;600;700",
        "EB Garamond": "EB+Garamond:wght@400;500;600;700",
        "Open Sans": "Open+Sans:wght@300;400;500;600;700",
        "Calibri": "Calibri", // Google Fonts me nahi hai, system font rahega
    };

    useEffect(() => {
        // Agar font Google Fonts me hai to load karo
        if (googleFonts[formValues.state]) {
            const link = document.createElement("link");
            link.href = `https://fonts.googleapis.com/css2?family=${googleFonts[formValues.state]}&display=swap`;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    }, [formValues.state]);

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

    // Fetch Store Data
    const [storeData, setStoreData] = useState(null);
    useEffect(() => {
        const fetchStoreData = async () => {

            try {
                const response = await fetch(`http://localhost:3001/api/settings/${storeName}`);
                if (response.ok) {
                    const data = await response.json();
                    setStoreData(data);
                    setLogoUrl(`http://localhost:3001/${data.logo_image}`);
                    setSignatureLogoUrl(`http://localhost:3001/${data?.signature_image}`);
                    // shopify.toast.show("Store data fetched successfully:");
                    console.log("Store data:", data);
                } else {
                    // Handle the error appropriately, e.g., show an error message
                    // shopify.toast.show("Error fetching store data:");
                    console.error("Error fetching store data:", response.status, await response.text());
                }
            } catch (error) {
                // shopify.toast.show("Error fetching store data:");
                console.error("Error fetching store data:", error);
                // Handle the error appropriately
            } finally {
                setLoading(false); // Set loading to false after fetching, regardless of success or failure

            }
        };

        fetchStoreData(); // Call the async function inside the effect
    }, [storeName]);

    return (
        <Page>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ cursor: 'pointer' }} onClick={onClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                                <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div style={{ fontSize: '18px', marginLeft: '10px', fontWeight: 'bold' }}>
                            Customization
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ fontSize: '14px', backgroundColor: '#74A535', borderRadius: '4px', padding: '5px 10px', color: 'white', cursor: 'pointer' }} onClick={() => {


                            if (page == "customization_label") {
                                handleSaveAndPreview();
                                setPage('customization')
                            } else {
                                setPage('customization_label')
                            }
                        }}>
                            {page == "customization" ? "Customize Labels" : "Save & Preview"}
                        </div>
                        <div style={{ fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px', padding: '5px 10px', color: 'black', cursor: 'pointer' }} onClick={openChangeStylePopup}>
                            Change Style
                        </div>
                        <div style={{ fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px', padding: '5px 10px', color: 'black', cursor: 'pointer' }} onClick={handleResetStyle}>
                            Reset
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '500',
                        fontSize: '18px',
                        color: 'white',
                        padding: '10px 20px',
                        backgroundColor: '#565656',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px'
                    }}>
                        Now customize the order of your some of the product item columns!
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                <path d="M16.5522 0.394235C16.0263 -0.131411 15.174 -0.131411 14.6482 0.394235L8.47319 6.56925L2.29818 0.394235C1.77237 -0.131411 0.920041 -0.131412 0.394235 0.394235C-0.131412 0.92004 -0.131411 1.77237 0.394235 2.29818L6.56925 8.47319L0.394235 14.6482C-0.131411 15.174 -0.131411 16.0263 0.394236 16.5522C0.920043 17.0778 1.77237 17.0778 2.29818 16.5522L8.47319 10.3771L14.6482 16.5522C15.174 17.0778 16.0263 17.0778 16.5522 16.5522C17.0778 16.0263 17.0778 15.174 16.5522 14.6482L10.3771 8.47319L16.5522 2.29818C17.0778 1.77237 17.0778 0.920041 16.5522 0.394235Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <div style={{
                        padding: '10px 20px',
                        border: '1px solid #ccc',
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}>
                        <div style={{
                            fontSize: '16px'
                        }}>
                            You can easily rearrange the following columns using drag and drop:
                        </div>
                        <div style={{
                            marginTop: '5px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            QTY, RATE PER ITEM (₹), DISCOUNT ITEM (₹), TAXABLE ITEM (₹), HSN, GST (%)
                        </div>
                        <div style={{
                            display: 'flex',
                            marginTop: '10px',
                        }}>
                            <button style={{
                                fontSize: '14px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '5px 10px',
                                color: 'black',
                                background: 'none',
                                cursor: 'pointer',
                            }} onClick={onClick}>Try Now</button>
                        </div>
                    </div>
                </div>
                {page == "customization_label" && <CustomizationLabel onFormDataChange={handleFormDataChange} />}
                {page == "customization" && (
                    <div>

                        {storeData && <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
                            {templateType === "Standard" && <Standard bgColor={bgColor} textColor={textColor} fontFamily={formValues.state} logo={logo} signature={signature} formData={formData} storeData={storeData} type="customization" />}
                            {templateType === "Classic" && <Classic bgColor={bgColor} textColor={textColor} fontFamily={formValues.state} logo={logo} signature={signature} formData={formData} storeData={storeData} type="customization" />}
                            {templateType === "Modern" && <Modern bgColor={bgColor} textColor={textColor} fontFamily={formValues.state} logo={logo} signature={signature} formData={formData} storeData={storeData} type="customization" />}
                            {templateType === "Minimal" && <Minimal bgColor={bgColor} textColor={textColor} fontFamily={formValues.state} logo={logo} signature={signature} formData={formData} storeData={storeData} type="customization" />}
                            {templateType === "Informatinve" && <Informatinve bgColor={bgColor} textColor={textColor} fontFamily={formValues.state} logo={logo} signature={signature} formData={formData} storeData={storeData} type="customization" />}
                        </div>}

                    </div>

                )}

            </div>
            {/* Company Logo Popup */}
            <PopupDialog isOpen={isPopupOpen} onClose={closePopup} title="Change Company Logo">

                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} onClick={handleLogoClick}>
                        <img style={{ cursor: 'pointer' }} src={croppedImage ? croppedImage : logoUrl ? logoUrl : invoice_ph} />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }} // Hide input
                        />
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', marginTop: '20px', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'end' }}>
                        <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#74A535', padding: '5px 10px', borderRadius: '5px', }} onClick={uploadLogo}>
                            Save
                        </div>
                        <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#000', padding: '5px 10px', borderRadius: '5px' }} onClick={closePopup}>
                            Cancel
                        </div>
                    </div>

                </div>
            </PopupDialog>

            <PopupDialog isOpen={isSignaturePopupOpen} onClose={closeSignaturePopup} title="Change Signature">

                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} onClick={handleSignatureLogoClick}>
                        <img style={{ cursor: 'pointer' }} src={croppedSignatureImage ? croppedSignatureImage : signatureUrl ? signatureUrl : invoice_ph} />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileSignatureInputRef}
                            onChange={handleSignatureFileChange}
                            style={{ display: "none" }} // Hide input
                        />
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', marginTop: '20px', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'end' }}>
                        <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#74A535', padding: '5px 10px', borderRadius: '5px', }} onClick={uploadSignature}>
                            Save
                        </div>
                        <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#000', padding: '5px 10px', borderRadius: '5px' }} onClick={closeSignaturePopup}>
                            Cancel
                        </div>
                    </div>

                </div>
            </PopupDialog>

            <PopupDialog isOpen={isCropLogoPopupOpen} onClose={closeCropLogoPopup} title="Crop Image">
                {imageSrc && (
                    <div>
                        <div style={{ position: 'relative', width: '100%', height: '400px', background: '#333' }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '400px',
                                background: '#333',
                            }}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={250 / 125}
                                    onCropChange={onCropChange}
                                    onZoomChange={onZoomChange}
                                    onCropComplete={onCropCompleteCallback}
                                />
                            </div>

                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => onZoomChange(zoom)}
                            />
                            <div style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'end' }}>
                                <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#74A535', padding: '5px 10px', borderRadius: '5px' }} onClick={onCropImage}>
                                    Crop Image
                                </div>
                                <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#000', padding: '5px 10px', borderRadius: '5px' }} onClick={closeCropLogoPopup}>
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </PopupDialog>
            <PopupDialog isOpen={isSignatureCropLogoPopupOpen} onClose={closeSignatureCropLogoPopup} title="Crop Signature Image">
                {imageSignatureSrc && (
                    <div>
                        <div style={{ position: 'relative', width: '100%', height: '400px', background: '#333' }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '400px',
                                background: '#333',
                            }}>
                                <Cropper
                                    image={imageSignatureSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={250 / 125}
                                    onCropChange={onCropChange}
                                    onZoomChange={onZoomChange}
                                    onCropComplete={onCropCompleteCallback}
                                />
                            </div>

                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => onZoomChange(zoom)}
                            />
                            <div style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'end' }}>
                                <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#74A535', padding: '5px 10px', borderRadius: '5px' }} onClick={onCropSignatureImage}>
                                    Crop Image
                                </div>
                                <div style={{ cursor: 'pointer', color: 'white', backgroundColor: '#000', padding: '5px 10px', borderRadius: '5px' }} onClick={closeSignatureCropLogoPopup}>
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </PopupDialog>

            <PopupDialog isOpen={isChangeStylePopupOpen} onClose={closeChangeStylePopup} title="Change Style">
                <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                    <div style={{ flex: '1' }}>
                        <div style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>Background Color</div>
                        <div style={{ marginTop: '20px', height: '50px', border: '1px solid #000', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setIsBgModalOpen(true)}>
                            <div style={{ backgroundColor: bgColor, width: '100%', height: '100%', borderRadius: '5px' }}></div>
                        </div>

                    </div>
                    <div style={{ flex: '1' }}>
                        <div style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>Text Color</div>


                        <div style={{ marginTop: '20px', height: '50px', border: '1px solid #000', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setIsTextModalOpen(true)}>
                            <div style={{ backgroundColor: textColor, width: '100%', height: '100%', borderRadius: '5px' }}></div>
                        </div>

                    </div>
                    <div style={{ flex: '1' }}>
                        <div style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>Font Style</div>

                        <select
                            name="state"
                            value={formValues.state}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                height: '50px',
                                marginTop: '20px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                appearance: 'none',
                                position: 'relative',
                            }}>
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>
                <div style={{ display: 'flex', justifyContent: 'end', gap: '20px', padding: '10px' }}>
                    <div style={{ display: 'flex', backgroundColor: '#74A535', padding: '10px 20px', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={handleSaveStyle}>
                        Save
                    </div>
                    <div style={{ display: 'flex', border: '1px solid #000', padding: '10px 20px', color: 'black', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={handleResetStyle}>
                        Reset
                    </div>
                </div>
                <div>
                    <ColorPickerModal isOpen={isBgModalOpen} onClose={() => setIsBgModalOpen(false)} onSave={handleBgSave} />
                    <ColorPickerModal isOpen={isTextModalOpen} onClose={() => setIsTextModalOpen(false)} onSave={handleTextSave} />
                </div>
            </PopupDialog>
        </Page >
    );
}