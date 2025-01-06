import {
    Text,
    Card,
    Divider,
    Page,
    TextField,
    RadioButton,
} from "@shopify/polaris";
import ic_info from '../assets/images/ic_info.png'
import iv_resync from '../assets/images/iv_resync.png'
import { useCallback, useState } from "react";
import Switch from "react-switch";

export function Locations() {

    const [companyLegalNameValue, setCompanyLegalNameValue] = useState('');
    const [locationBrandNameValue, setLocationBrandNameValue] = useState('');
    const [locationPhoneValue, setLocationPhoneValue] = useState('');
    const [locationEmailValue, setLocationEmailValue] = useState('');
    const [locationAddressValue, setLocationAddressValue] = useState('');
    const [locationInvoicePrefixValue, setLocationInvoicePrefixValue] = useState('');
    const [locationInvoiceNumberValue, setLocationInvoiceNumberValue] = useState('');

    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const handleCompanyLegalNameChange = useCallback(
        (newValue) => setCompanyLegalNameValue(newValue),
        [],
    );
    const handleLocationBrandNameChange = useCallback(
        (newValue) => setLocationBrandNameValue(newValue),
        [],
    );
    const handleLocationPhoneChange = useCallback(
        (newValue) => setLocationPhoneValue(newValue),
        [],
    );
    const handleLocationEmailChange = useCallback(
        (newValue) => setLocationEmailValue(newValue),
        [],
    );
    const handleLocationAddressChange = useCallback(
        (newValue) => setLocationAddressValue(newValue),
        [],
    );
    const handleLocationInvoicePrefixChange = useCallback(
        (newValue) => setLocationInvoicePrefixValue(newValue),
        [],
    );
    const handleLocationInvoiceNumberChange = useCallback(
        (newValue) => setLocationInvoiceNumberValue(newValue),
        [],
    );


    const [blankaCompanyLegalNameValue, setBlankaCompanyLegalNameValue] = useState('');
    const [blankaLocationBrandNameValue, setBlankaLocationBrandNameValue] = useState('');
    const [blankaLocationPhoneValue, setBlankaLocationPhoneValue] = useState('');
    const [blankaLocationEmailValue, setBlankaLocationEmailValue] = useState('');
    const [blankaLocationAddressValue, setBlankaLocationAddressValue] = useState('');
    const [blankaLocationInvoicePrefixValue, setBlankaLocationInvoicePrefixValue] = useState('');
    const [blankaLocationInvoiceNumberValue, setBlankaLocationInvoiceNumberValue] = useState('');

    const [isBlankaOn, setBlankaIsOn] = useState(false);

    const handleBlankaToggle = () => {
        setBlankaIsOn(!isBlankaOn);
    };

    const handleBlankaCompanyLegalNameChange = useCallback(
        (newValue) => setBlankaCompanyLegalNameValue(newValue),
        [],
    );
    const handleBlankaLocationBrandNameChange = useCallback(
        (newValue) => setBlankaLocationBrandNameValue(newValue),
        [],
    );
    const handleBlankaLocationPhoneChange = useCallback(
        (newValue) => setBlankaLocationPhoneValue(newValue),
        [],
    );
    const handleBlankaLocationEmailChange = useCallback(
        (newValue) => setBlankaLocationEmailValue(newValue),
        [],
    );
    const handleBlankaLocationAddressChange = useCallback(
        (newValue) => setBlankaLocationAddressValue(newValue),
        [],
    );
    const handleBlankaLocationInvoicePrefixChange = useCallback(
        (newValue) => setBlankaLocationInvoicePrefixValue(newValue),
        [],
    );
    const handleBlankaLocationInvoiceNumberChange = useCallback(
        (newValue) => setBlankaLocationInvoiceNumberValue(newValue),
        [],
    );

    const [gstSelectedOption, setGstSelectedOption] = useState('gst-store-address');

    const handleChange = (event) => {
        setGstSelectedOption(event.target.value);
    };

    const [posSelectedOption, setPosSelectedOption] = useState('pos-store-address');

    const handlePosChange = (event) => {
        setPosSelectedOption(event.target.value);
    };

    const [value1, setValue1] = useState('disabled1');


    const handleChange1 = useCallback(
        (_, newValue1) => setValue1(newValue1),
        [],
    );

    return (
        <Page>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="headingXl" as="h4">Store Information</Text>
                <div
                    style={{
                        backgroundColor: '#74A535',
                        padding: '10px 20px',
                        fontSize: '15px',
                        color: 'white',
                        borderRadius: '10px'
                    }}>Save</div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Store Location</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>
                    <div style={{ borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                        <div style={{ marginRight: '20px' }}>
                            <img src={ic_info} style={{ height: '20px' }} />
                        </div>
                        <div>
                            <Text variant="bodyLg" as="p">State code Used for GST Calculation after Fulfillment</Text>
                            <Text variant="bodyLg" as="p">State code Used for GST Calculation base On POS Locations For POS Orders</Text>
                        </div>
                    </div>
                    <div>
                        <div style={{ padding: '10px 20px', width: '200px', display: 'flex', marginTop: '20px', border: '1px solid #000000' }}>
                            <img src={iv_resync} style={{ height: '20px', marginRight: '10px' }} />
                            <Text variant="bodyLg" as="p">Locations Resync</Text>
                        </div>
                    </div>
                </Card>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingLg" fontWeight="bold">Shop location</Text>
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
                                    label="Location Brand Name"
                                    value={locationBrandNameValue}
                                    onChange={handleLocationBrandNameChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Phone"
                                    value={locationPhoneValue}
                                    onChange={handleLocationPhoneChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Email"
                                    value={locationEmailValue}
                                    onChange={handleLocationEmailChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Address"
                                    value={locationAddressValue}
                                    onChange={handleLocationAddressChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location City"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Pincode"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location State"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location State Code"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Country Name"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Country Code"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location GST Number"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location PAN Number"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location CIN Number"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Invoice Prefix"
                                    value={locationInvoicePrefixValue}
                                    onChange={handleLocationInvoicePrefixChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Invoice Number"
                                    value={locationInvoiceNumberValue}
                                    onChange={handleLocationInvoiceNumberChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggle}
                                    checked={isOn}
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
                            <Text as="p" fontWeight="bold" style={{ margin: 0 }}>
                                Show Location Invoice No in Invoice
                            </Text>
                        </div>
                    </Card>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingLg" fontWeight="bold">Blanka</Text>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Divider />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Company Legal Name"
                                    value={blankaCompanyLegalNameValue}
                                    onChange={handleBlankaCompanyLegalNameChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Brand Name"
                                    value={blankaLocationBrandNameValue}
                                    onChange={handleBlankaLocationBrandNameChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Phone"
                                    value={blankaLocationPhoneValue}
                                    onChange={handleBlankaLocationPhoneChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Email"
                                    value={blankaLocationEmailValue}
                                    onChange={handleBlankaLocationEmailChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Address"
                                    value={blankaLocationAddressValue}
                                    onChange={handleBlankaLocationAddressChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location City"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Pincode"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location State"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location State Code"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Country Name"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Country Code"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location GST Number"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location PAN Number"
                                    disabled autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location CIN Number"
                                    disabled autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <TextField
                                    label="Location Invoice Prefix"
                                    value={blankaLocationInvoicePrefixValue}
                                    onChange={handleBlankaLocationInvoicePrefixChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <TextField
                                    label="Location Invoice Number"
                                    value={blankaLocationInvoiceNumberValue}
                                    onChange={handleBlankaLocationInvoiceNumberChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleBlankaToggle}
                                    checked={isBlankaOn}
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
                            <Text as="p" fontWeight="bold" style={{ margin: 0 }}>
                                Show Location Invoice No in Invoice
                            </Text>
                        </div>
                    </Card>


                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingMd" fontWeight="bold">Select Invoice GST Calculation based on Store address or Inventory Fulfillment Location</Text>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ marginRight: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px', }}>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="radio"
                                                value="gst-store-address"
                                                checked={gstSelectedOption === 'gst-store-address'}
                                                style={{
                                                    display: 'none', // Hide default radio button
                                                }}
                                                onChange={handleChange}
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
                                                        backgroundColor: gstSelectedOption === 'gst-store-address' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                                Store Address
                                                </Text>
                                            </div>
                                        </label>

                                    </div>
                                </div>
                            </div>

                            <div style={{ marginLeft: '10px' }}>
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
                                            value="gst-location-address"
                                            checked={gstSelectedOption === 'gst-location-address'}
                                            onChange={handleChange}
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
                                                    backgroundColor: gstSelectedOption === 'gst-location-address' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                                Location Address
                                            </Text>
                                        </div>
                                    </label>


                                </div>
                            </div>


                        </div>
                        <div style={{ marginTop: '20px' }}></div>
                        <Text variant="headingMd" fontWeight="bold">For POS Orders, Select Invoice GST Calculation based on Store address or POS Location</Text>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                        <div style={{ marginRight: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px', }}>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="radio"
                                                value="pos-store-address"
                                                checked={posSelectedOption === 'pos-store-address'}
                                                style={{
                                                    display: 'none', // Hide default radio button
                                                }}
                                                onChange={handlePosChange}
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
                                                        backgroundColor: posSelectedOption === 'pos-store-address' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                                Store Address
                                                </Text>
                                            </div>
                                        </label>

                                    </div>
                                </div>
                            </div>

                            <div style={{ marginLeft: '10px' }}>
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
                                            value="pos-location-address"
                                            checked={posSelectedOption === 'pos-location-address'}
                                            onChange={handlePosChange}
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
                                                    backgroundColor: posSelectedOption === 'pos-location-address' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                            POS Location Address
                                            </Text>
                                        </div>
                                    </label>


                                </div>
                            </div>


                        </div>

                    </Card>
                </div>

            </div>
        </Page>
    );
}
