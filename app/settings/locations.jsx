import {
    Text,
    Card,
    Divider,
    Page,
} from "@shopify/polaris";
import ic_info from '../assets/images/ic_info.png'
import iv_resync from '../assets/images/iv_resync.png'
import { useCallback, useEffect, useState } from "react";
import Switch from "react-switch";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export function Locations() {


    const handleToggle = (index) => {
        const updatedLocations = [...locations];
        updatedLocations[index].show_location = !updatedLocations[index].show_location;
        setLocations(updatedLocations);
    };





    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedLocations = [...locations];
        updatedLocations[index] = { ...updatedLocations[index], [name]: value };
        setLocations(updatedLocations);
    };

    const [gstSelectedOption, setGstSelectedOption] = useState('gst-store-address');

    const handleGSTChange = (event) => {
        setGstSelectedOption(event.target.value);
    };

    const [posSelectedOption, setPosSelectedOption] = useState('pos-store-address');

    const handlePosChange = (event) => {
        setPosSelectedOption(event.target.value);
    };

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;



    useEffect(() => {
        if (!storeName || !accessToken) {
            console.warn("Missing storeName or accessToken");
            return;
        }
        const fetchLocations = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("Fetching with headers:", { storeName, accessToken });
                const response = await fetch('http://localhost:3001/api/locations', {
                    method: 'GET',
                    headers: {
                        'store-name': storeName,
                        'api-version': '2025-01',
                        'access-token': accessToken
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }

                const data = await response.json();
                setLocations(data.locations);
                setGstSelectedOption(data.invoice_gst);
                setPosSelectedOption(data.pos_order);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [storeName, accessToken]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/locations', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'store-name': storeName,
                    'api-version': '2025-01',
                    'access-token': accessToken
                },
                body: JSON.stringify({
                    invoice_gst: gstSelectedOption,
                    pos_order: posSelectedOption,
                    locations: locations
                })
            });

            if (!response.ok) {
                throw new Error(`Error updating locations: ${response.statusText}`);
            }

            const updatedLocations = await response.json();
            setLocations(updatedLocations.locations);
            shopify.toast.show('Locations updated successfully');
        } catch (error) {
            setError(error.message);
        }
    };

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
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }} onClick={handleSubmit}>Save</div>
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
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && locations.map((location, index) => (<div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingLg" fontWeight="bold">{location.name}</Text>
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
                                    value={location.company_legal_name}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Company Name"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Brand Name
                                </div>

                                <input
                                    type="text"
                                    name="location_brand_name"
                                    value={location.location_brand_name}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Brand Name"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Phone
                                </div>

                                <input
                                    type="text"
                                    name="location_phone"
                                    value={location.location_phone}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Phone"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Email
                                </div>

                                <input
                                    type="text"
                                    name="location_email"
                                    value={location.location_email}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Email"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Address
                                </div>

                                <input
                                    type="text"
                                    name="location_address"
                                    value={location.location_address}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Address"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location City
                                </div>

                                <input
                                    type="text"
                                    name="city"
                                    value={location.city}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location City"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Pincode
                                </div>

                                <input
                                    type="text"
                                    name="zip"
                                    value={location.zip}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Pincode"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location State
                                </div>

                                <input
                                    type="text"
                                    name="province"
                                    value={location.province}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location State"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location State Code
                                </div>

                                <input
                                    type="text"
                                    name="province_code"
                                    value={location.province_code}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location State Code"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Country Name
                                </div>

                                <input
                                    type="text"
                                    name="country_name"
                                    value={location.country_name}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Country Name"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Country Code
                                </div>

                                <input
                                    type="text"
                                    name="country_code"
                                    value={location.country_code}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Country Code"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    disabled
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location GST Number
                                </div>

                                <input
                                    type="text"
                                    name="location_gst_number"
                                    value={location.location_gst_number}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location GST Number"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location PAN Number
                                </div>

                                <input
                                    type="text"
                                    name="location_pan_number"
                                    value={location.location_pan_number}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location PAN Number"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location CIN Number
                                </div>

                                <input
                                    type="text"
                                    name="location_cin_number"
                                    value={location.location_cin_number}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location CIN Number"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Invoice Prefix
                                </div>

                                <input
                                    type="text"
                                    name="location_invoice_prefix"
                                    value={location.location_invoice_prefix}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Invoice Prefix"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginLeft: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Location Invoice Number
                                </div>

                                <input
                                    type="text"
                                    name="location_invoice_number"
                                    value={location.location_invoice_number}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Location Invoice Number"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />

                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={() => handleToggle(index)}
                                    checked={location.show_location}
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
                </div>))}


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
                                                onChange={handleGSTChange}
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
                                            onChange={handleGSTChange}
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
