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
import { useCallback, useState } from "react";

export function StoreInformation() {
    const [companyLegalNameValue, setCompanyLegalNameValue] = useState('');
    const [brandNameValue, setBrandNameValue] = useState('');
    const [storePhoneValue, setStorePhoneValue] = useState('');
    const [storeEmailValue, setStoreEmailValue] = useState('');
    const [storeAddressValue, setStoreAddressValue] = useState('');
    const [contactPersonValue, setContactPersonValue] = useState('');
    const [gstNumberValue, setGstNumberValue] = useState('');
    const [exportCodeValue, setExportCodeValue] = useState('');
    const [cinNumberValue, setCinNumberValue] = useState('');
    const [panNumbeValue, setPanNumbeValue] = useState('');
    const [fssaiLicNumberValue, setFssaiLicNumberValue] = useState('');

    const handleCompanyLegalNameChange = useCallback(
        (newValue) => setCompanyLegalNameValue(newValue),
        [],
    );
    const handleBrandNameChange = useCallback(
        (newValue) => setBrandNameValue(newValue),
        [],
    );
    const handleStorePhoneChange = useCallback(
        (newValue) => setStorePhoneValue(newValue),
        [],
    );
    const handleStoreEmailChange = useCallback(
        (newValue) => setStoreEmailValue(newValue),
        [],
    );
    const handleStoreAddressChange = useCallback(
        (newValue) => setStoreAddressValue(newValue),
        [],
    );
    const handleContactPersonChange = useCallback(
        (newValue) => setContactPersonValue(newValue),
        [],
    );
    const handleGstNumberChange = useCallback(
        (newValue) => setGstNumberValue(newValue),
        [],
    );
    const handleExportCodeChange = useCallback(
        (newValue) => setExportCodeValue(newValue),
        [],
    );
    const handleCinNumberChange = useCallback(
        (newValue) => setCinNumberValue(newValue),
        [],
    );
    const handlePanNumbeChange = useCallback(
        (newValue) => setPanNumbeValue(newValue),
        [],
    );
    const handleFssaiLicNumberChange = useCallback(
        (newValue) => setFssaiLicNumberValue(newValue),
        [],
    );

    return (
        <Page>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text variant="headingXl" as="h4">Store Information</Text>
                    <div style={{ backgroundColor: '#74A535', padding: '10px 20px', fontSize: '15px', color: 'white', borderRadius: '10px' }}>Save</div>
                </div>

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
                                <img src={icLogoPlacerholder} style={{ height: '80px' }} />

                            </div>
                            <div style={{ borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <img src={ic_info} style={{ height: '20px' }} />
                                </div>
                                <Text variant="bodyLg" as="p">Image should be in JPEG-JPG/PNG format with No more than 250 pixels of Width and 125 pixels of Height. (max-width:250, max-height:125)</Text>
                            </div>

                        </Card>
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
                                <img src={icLogoPlacerholder} style={{ height: '80px' }} />

                            </div>
                            <div style={{ borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <img src={ic_info} style={{ height: '20px' }} />
                                </div>
                                <Text variant="bodyLg" as="p">Image should be in PNG format with No more than 150 pixels of Width and 80 pixels of Height. (max-width:150, max-height:80)</Text>
                            </div>
                        </Card>
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
                                <TextField
                                    label="Company Legal Name"
                                    value={companyLegalNameValue}
                                    onChange={handleCompanyLegalNameChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Brand Name"
                                    value={brandNameValue}
                                    onChange={handleBrandNameChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Store Phone"
                                    value={storePhoneValue}
                                    onChange={handleStorePhoneChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Store Email"
                                    value={storeEmailValue}
                                    onChange={handleStoreEmailChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Store Address"
                                    value={storeAddressValue}
                                    onChange={handleStoreAddressChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Contact Person"
                                    value={contactPersonValue}
                                    onChange={handleContactPersonChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Store City"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Store Pincode"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Store State"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Store State Code"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Store Country"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Store Country Code"
                                    disabled autoComplete="off"
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
                                <TextField
                                    label="GST Number"
                                    value={gstNumberValue}
                                    onChange={handleGstNumberChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Import Export Code (IEC Code)"
                                    value={exportCodeValue}
                                    onChange={handleExportCodeChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="CIN Number"
                                    value={cinNumberValue}
                                    onChange={handleCinNumberChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="PAN Number"
                                    value={panNumbeValue}
                                    onChange={handlePanNumbeChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="FSSAI LIC Number"
                                    value={fssaiLicNumberValue}
                                    onChange={handleFssaiLicNumberChange}
                                    autoComplete="off"
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