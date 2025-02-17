import {
    Text,
    Card,
    Divider,
    TextField,
    EmptyState,
    IndexTable,
    Badge,
    useIndexResourceState,
    Link,
    Page,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import ic_info from '../assets/images/ic_info.png'
import Switch from "react-switch";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export function GSTSettings() {


    const [isOnGstIsIncludedInProductPrice, setIsOnGstIsIncludedInProductPrice] = useState(false);

    const handleToggleGstIsIncludedInProductPrice = () => {
        setIsOnGstIsIncludedInProductPrice(!isOnGstIsIncludedInProductPrice);
    };

    const [isOnGstIsIncludedInShippingPrice, setIsOnGstIsIncludedInShippingPrice] = useState(false);

    const handleToggleGstIsIncludedInShippingPrice = () => {
        setIsOnGstIsIncludedInShippingPrice(!isOnGstIsIncludedInShippingPrice);
    };

    const [isOnShowGstOnShipping, setIsShowGstOnShipping] = useState(false);

    const handleToggleShowGstOnShipping = () => {
        setIsShowGstOnShipping(!isOnShowGstOnShipping);
    };

    const [isOnChargeIgstOnExportOrders, setIsChargeIgstOnExportOrders] = useState(false);

    const handleToggleChargeIgstOnExportOrders = () => {
        setIsChargeIgstOnExportOrders(!isOnChargeIgstOnExportOrders);
    };

    const [isOnApplyGstWhenProductWithFullDiscount, setIsApplyGstWhenProductWithFullDiscount] = useState(false);

    const handleToggleApplyGstWhenProductWithFullDiscount = () => {
        setIsApplyGstWhenProductWithFullDiscount(!isOnApplyGstWhenProductWithFullDiscount);
    };

    const [isOnSellingServices, setIsSellingServices] = useState(false);

    const handleToggleSellingServices = () => {
        setIsSellingServices(!isOnSellingServices);
    };

    const [formValues, setFormValues] = useState({
        shipping_gst: "",
        sac_code: 0
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

    const [gstSettings, setGSTSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGSTSettings = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://localhost:3001/api/gst-settings/${storeName}`,
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
                setGSTSettings(data);
                setFormValues({
                    shipping_gst: data.shipping_gst,
                    sac_code: data.sac_code,
                });
                setIsOnGstIsIncludedInProductPrice(data.gst_include_product_price);
                setIsOnGstIsIncludedInShippingPrice(data.gst_include_shipping_price);
                setIsShowGstOnShipping(data.gst_on_shipping);
                setIsChargeIgstOnExportOrders(data.igst_on_export_order);
                setIsApplyGstWhenProductWithFullDiscount(data.apply_gst_when_product_with_full_discount);
                setIsSellingServices(data.selling_services);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (storeName && accessToken) {
            fetchGSTSettings();
        } else {
            setError("Missing storeName or accessToken");
        }
    }, [storeName, accessToken]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const requestBody = {
            shipping_gst: formValues.shipping_gst,
            sac_code: formValues.sac_code,
            gst_include_product_price: isOnGstIsIncludedInProductPrice,
            gst_include_shipping_price: isOnGstIsIncludedInShippingPrice,
            gst_on_shipping: isOnShowGstOnShipping,
            igst_on_export_order: isOnChargeIgstOnExportOrders,
            apply_gst_when_product_with_full_discount: isOnApplyGstWhenProductWithFullDiscount,
            selling_services: isOnSellingServices,
        };

        try {
            const response = await fetch("http://localhost:3001/api/gst-settings", {
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
            {gstSettings && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text variant="headingXl" as="h4">GST Settings</Text>
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
                            <Text variant="headingLg" fontWeight="bold">Product Price</Text>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', marginRight: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        Shipping GST
                                    </div>

                                    <input
                                        type="number"
                                        name="shipping_gst"
                                        value={formValues.shipping_gst}
                                        onChange={handleChange}
                                        placeholder="Enter Shipping GST"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />


                                </div>
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                        SAC Code
                                    </div>

                                    <input
                                        type="number"
                                        name="sac_code"
                                        value={formValues.sac_code}
                                        onChange={handleChange}
                                        placeholder="Enter SAC Code"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                    />

                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                        <Switch
                                            onChange={handleToggleGstIsIncludedInProductPrice}
                                            checked={isOnGstIsIncludedInProductPrice}
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
                                    <Text as="p" fontWeight="regular" style={{ margin: 0 }}>GST is included in product price</Text>
                                </div>
                                <div style={{ marginLeft: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                        <Switch
                                            onChange={handleToggleGstIsIncludedInShippingPrice}
                                            checked={isOnGstIsIncludedInShippingPrice}
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
                                    <Text as="p" fontWeight="regular" style={{ margin: 0 }}>GST is included in shipping price</Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                        <Switch
                                            onChange={handleToggleShowGstOnShipping}
                                            checked={isOnShowGstOnShipping}
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
                                    <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Show GST on shipping</Text>
                                </div>
                                <div style={{ marginLeft: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                        <Switch
                                            onChange={handleToggleChargeIgstOnExportOrders}
                                            checked={isOnChargeIgstOnExportOrders}
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
                                    <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Charge IGST On Export Orders</Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                        <Switch
                                            onChange={handleToggleApplyGstWhenProductWithFullDiscount}
                                            checked={isOnApplyGstWhenProductWithFullDiscount}
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
                                    <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Apply GST when product with full discount</Text>
                                </div>
                                <div style={{ marginLeft: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                        <Switch
                                            onChange={handleToggleSellingServices}
                                            checked={isOnSellingServices}
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
                                    <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Selling Services</Text>
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            )}

        </Page>
    );
}
