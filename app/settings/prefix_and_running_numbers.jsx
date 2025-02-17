import {
    Text,
    Card,
    Divider,
    Page,
} from "@shopify/polaris";
import ic_info from '../assets/images/ic_info.png'
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export function PrefixAndRunningNumbers() {

    const [formValues, setFormValues] = useState({
        invoice_prefix: "",
        invoice_number: 0,
        credit_note_prefix: "",
        credit_note_number: 0,
        estimate_prefix: "",
        estimate_number: 0,
        offline_prefix: "",
        offline_number: 0,
        bill_prefix: "",
        bill_number: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [prefixRunningNumbers, setPrefixRunningNumbers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrefixRunningNumbers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://localhost:3001/api/prefix-running-numbers/${storeName}`,
                    {
                        method: "GET",
                        headers: {
                            "store-name": storeName,
                            "api-version": "2025-01",
                            "access-token": accessToken,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }

                const data = await response.json();
                setPrefixRunningNumbers(data);
                setFormValues({
                    invoice_prefix: data.invoice_prefix,
                    invoice_number: data.invoice_number,
                    credit_note_prefix: data.credit_note_prefix,
                    credit_note_number: data.credit_note_number,
                    estimate_prefix: data.estimate_prefix,
                    estimate_number: data.estimate_number,
                    offline_prefix: data.offline_prefix,
                    offline_number: data.offline_number,
                    bill_prefix: data.bill_prefix,
                    bill_number: data.bill_number,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (storeName && accessToken) {
            fetchPrefixRunningNumbers();
        } else {
            setError("Missing storeName or accessToken");
        }
    }, [storeName, accessToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const requestBody = {
            invoice_prefix: formValues.invoice_prefix,
            invoice_number: formValues.invoice_number,
            credit_note_prefix: formValues.credit_note_prefix,
            credit_note_number: formValues.credit_note_number,
            estimate_prefix: formValues.estimate_prefix,
            estimate_number: formValues.estimate_number,
            offline_prefix: formValues.offline_prefix,
            offline_number: formValues.offline_number,
            bill_prefix: formValues.bill_prefix,
            bill_number: formValues.bill_number,
        };

        try {
            const response = await fetch("http://localhost:3001/api/prefix-running-numbers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "store-name": storeName,
                    "api-version": "2025-01",
                    "access-token": accessToken,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("API Response:", data);
            shopify.toast.show('Setting saved!');
        } catch (error) {
            console.error("API Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {prefixRunningNumbers && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text variant="headingXl" as="h4">Prefix & Running Numbers</Text>
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
                            <Text variant="headingLg" fontWeight="bold">Invoice Number</Text>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', marginRight: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Invoice Prefix
                                    </div>

                                    <input
                                        type="text"
                                        name="invoice_prefix"
                                        value={formValues.invoice_prefix}
                                        onChange={handleChange}
                                        placeholder="Enter Invoice Prefix"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Invoice Number
                                    </div>

                                    <input
                                        type="number"
                                        name="invoice_number"
                                        value={formValues.invoice_number}
                                        onChange={handleChange}
                                        placeholder="Enter Invoice Number"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                            </div>

                            <div style={{ alignItems: 'center', marginTop: '20px', borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                                <div style={{ marginTop: '5px', marginRight: '20px' }}>
                                    <img src={ic_info} style={{ width: '20px', height: '20px', }} />
                                </div>
                                <Text variant="bodyLg" as="p">To setup location wise invoice series Click her</Text>
                            </div>
                        </Card>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Card>
                            <Text variant="headingLg" fontWeight="bold">Credit Note</Text>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', marginRight: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Credit Note Prefix
                                    </div>

                                    <input
                                        type="text"
                                        name="credit_note_prefix"
                                        value={formValues.credit_note_prefix}
                                        onChange={handleChange}
                                        placeholder="Enter Credit Note Prefix"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Credit Note Number
                                    </div>

                                    <input
                                        type="number"
                                        name="credit_note_number"
                                        value={formValues.credit_note_number}
                                        onChange={handleChange}
                                        placeholder="Enter Credit Note Number"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                            </div>
                        </Card>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Card>
                            <Text variant="headingLg" fontWeight="bold">Estimate</Text>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', marginRight: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Estimate Prefix
                                    </div>

                                    <input
                                        type="text"
                                        name="estimate_prefix"
                                        value={formValues.estimate_prefix}
                                        onChange={handleChange}
                                        placeholder="Enter Estimate Prefix"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Estimate Number
                                    </div>

                                    <input
                                        type="number"
                                        name="estimate_number"
                                        value={formValues.estimate_number}
                                        onChange={handleChange}
                                        placeholder="Enter Estimate Number"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                            </div>
                        </Card>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Card>
                            <Text variant="headingLg" fontWeight="bold">Offline Invoice</Text>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', marginRight: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Estimate Number
                                    </div>

                                    <input
                                        type="text"
                                        name="offline_prefix"
                                        value={formValues.offline_prefix}
                                        onChange={handleChange}
                                        placeholder="Enter Offline Prefix"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Estimate Number
                                    </div>

                                    <input
                                        type="number"
                                        name="offline_number"
                                        value={formValues.offline_number}
                                        onChange={handleChange}
                                        placeholder="Enter Estimate Number"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                            </div>
                        </Card>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Card>
                            <Text variant="headingLg" fontWeight="bold">Bill</Text>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', marginRight: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Bill Prefix
                                    </div>

                                    <input
                                        type="text"
                                        name="bill_prefix"
                                        value={formValues.bill_prefix}
                                        onChange={handleChange}
                                        placeholder="Enter Bill Prefix"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Bill Number
                                    </div>

                                    <input
                                        type="number"
                                        name="bill_number"
                                        value={formValues.bill_number}
                                        onChange={handleChange}
                                        placeholder="Enter Bill Number"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}


        </Page>
    );
}
