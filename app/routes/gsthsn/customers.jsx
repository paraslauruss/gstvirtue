import { Card, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import ic_info from '../../assets/images/ic_info.png'
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Papa from 'papaparse';


export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export function Customers() {

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [csvFile, setCsvFile] = useState(null);
    const [csvData, setCsvData] = useState([]);

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleFileParse = async () => {
        if (!csvFile) {
            shopify.toast.show('Please select a CSV file.');
            return;
        }

        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                if (results.errors.length) {
                    setError('Error parsing CSV file.');
                    console.error(results.errors);
                } else {
                    const mappedData = results.data.map((customer) => ({
                        email: customer['Email'],
                        first_name: customer['First Name'],
                        last_name: customer['Last Name'],
                        company_name: customer['Company'],
                        gst_number: customer['GST Number'],
                    }));
                    setCsvData(mappedData);

                    const apiUrl = 'http://localhost:3001/api/customers/bulk';
                    const headers = {
                        'store-name': storeName,
                        'api-version': '2025-01',
                        'access-token': accessToken,
                        'Content-Type': 'application/json',
                    };

                    try {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers,
                            body: JSON.stringify({ customers: mappedData }), // Use mappedData instead of csvData
                        });

                        const result = await response.json();

                        if (!response.ok) {
                            shopify.toast.show(result.message || 'Failed to add customers');
                            return;
                        }

                        console.log('Customers added successfully:', result);
                        shopify.toast.show('Customers added successfully');
                        await handleSearchButton('');
                    } catch (err) {
                        shopify.toast.show(err.message);
                    } finally {
                        setLoading(false);
                    }
                }
            },
        });
    };


    const [searchValue, setSearchvalue] = useState(null);
    const handleChange = (value) => {
        setSearchvalue(value);
    }

    const handleInputChange = (index, field, value) => {
        // Update the state with the new input value
        const updatedCustomers = [...customers];
        updatedCustomers[index][field] = value;
        setCustomers(updatedCustomers);
    };

    const handleClearButton = async () => {
        setSearchvalue('');
        await handleSearchButton('');
    }

    const handleSearchButton = async (query = searchValue) => {
        const apiUrl = `http://localhost:3001/api/customers?search=${encodeURIComponent(query)}`;
        const headers = {
            'store-name': storeName,
            'api-version': '2025-01',
            'access-token': accessToken,
        };

        try {
            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch customers');
            }

            const result = await response.json();
            setCustomers(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchCustomers = async () => {
            const apiUrl = 'http://localhost:3001/api/customers';
            const headers = {
                'store-name': storeName,
                'api-version': '2025-01',
                'access-token': accessToken,
            };

            try {
                const response = await fetch(apiUrl, { headers });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch customers');
                }

                const result = await response.json();
                setCustomers(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // const [csvFile, setCsvFile] = useState(null);

    // const handleFileChange = (event) => {
    //     setCsvFile(event.target.files[0]);
    //   };

    return (
        <div style={{ minHeight: "100vh" }}>


            <div style={{ marginTop: '20px' }}>
                <div style={{ width: '100%', border: '1px solid #F1F1F4', borderRadius: '10px', padding: '22px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}>
                    <div style={{ marginTop: '20px', justifyContent: 'space-between', display: 'flex', width: '100%', }}>
                        <Text variant="headingLg">Upload CSV For Customers Data</Text>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E2E2', marginTop: '20px', marginBottom: '20px', }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <div style={{ display: 'flex', gap: '20px', }}>
                            <input
                                onChange={handleFileChange}
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                                }}
                                type="file"
                                accept=".csv"
                            />
                            {/* <input
                                style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                type="text"
                                placeholder="No file Chosen"
                            /> */}
                            <div
                                style={{ backgroundColor: '#74A535', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={handleFileParse}>
                                Submit CSV
                            </div>
                        </div>



                    </div>

                    <div style={{ alignItems: 'center', marginTop: '20px', borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                        <div style={{ marginTop: '5px', marginRight: '20px' }}>
                            <img src={ic_info} style={{ width: '20px', height: '20px', }} />
                        </div>
                        <Text variant="bodyLg" as="p">Note: Upload Customers CSV File Only.Download Sample CSV file</Text>
                    </div>


                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div style={{ fontSize: '18px', fontWeight: '600', }}>
                    Customers
                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div style={{ width: '100%', border: '1px solid #F1F1F4', borderRadius: '10px', padding: '22px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <div style={{ display: 'flex', gap: '20px', }}>
                            <input
                                style={{ width: '400px', border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                type="text"
                                placeholder="First name,Last name,Email"
                                value={searchValue}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                            <div style={{ backgroundColor: '#74A535', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSearchButton}>
                                Search
                            </div>
                            <div style={{ backgroundColor: '#FFFFFF', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'black', fontSize: '14px', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer' }} onClick={handleClearButton}>
                                Clear
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E2E2', marginTop: '20px', marginBottom: '20px', }}></div>

                    {customers.length > 0 ?
                        <div>
                            <div style={{ backgroundColor: '#565656', color: 'white', fontSize: '16px', fontWeight: '600', display: 'flex', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', }}>
                                <div style={{ width: '100%' }}>First Name</div>
                                <div style={{ width: '100%' }}>Last Name</div>
                                <div style={{ width: '100%' }}>Email</div>
                                <div style={{ width: '100%' }}>Company Name</div>
                                <div style={{ width: '100%' }}>GST Number</div>
                            </div>
                            {customers.map((customer, index) => (<div style={{ color: 'black', fontSize: '16px', fontWeight: '400', display: 'flex', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', }}>
                                <div style={{ width: '100%' }}>
                                    {customer.first_name}
                                </div>
                                <div style={{ width: '100%' }}>
                                    {customer.last_name}
                                </div>
                                <div style={{ width: '100%' }}>
                                    {customer.email}
                                </div>
                                <div style={{ width: '100%' }}>
                                    <input
                                        style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                        type="text"
                                        value={customer.company_name}
                                        onChange={(e) => handleInputChange(index, 'company_name', e.target.value)}
                                    />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <input
                                        style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                        type="text"
                                        value={customer.gst_number}
                                        onChange={(e) => handleInputChange(index, 'gst_number', e.target.value)}
                                    /></div>

                            </div>
                            ))}
                        </div>
                        : null}



                    <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', }}>
                        <div style={{ backgroundColor: '#74A535', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px', }}>
                            Update
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}