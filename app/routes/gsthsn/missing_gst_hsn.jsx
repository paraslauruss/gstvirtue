import { Card, EmptyState, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import "./product.css";
import CustomCheckbox from "../utils/custom_check_box";
import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export function MissingGstHsn() {

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [isMyProductGstChecked, setIsMyProductGstChecked] = useState(false);
    const handleMyProductGstCheckboxChange = (event) => {
        setIsMyProductGstChecked(event.target.checked);
    };

    const [isCessChecked, setIsCessChecked] = useState(false);
    const handleCessCheckboxChange = (event) => {
        setIsCessChecked(event.target.checked);
    };

    const [collectionProduct, setCollectionsProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogoUrl = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/products/missing-gst-hsn', {
                method: 'GET',
                headers: {
                    'store-name' : storeName,
                    'api-version' : '2025-01',
                    'access-token' : accessToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCollectionsProduct(data);

                console.error('Collections Data:', data);
            } else {
                console.error('Error fetching logo URL:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching logo URL:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {


        fetchLogoUrl();
    }, []);

    const handleUpdate = async (order) => {

        const apiUrl = 'http://localhost:3001/api/products/update-multiple';
        const headers = {
            'store-name': storeName,
            'api-version': '2025-01',
            'access-token': accessToken,
            'Content-Type': 'application/json'
        };

        const updatedProducts = collectionProduct.map((product) => {
            return {
                handle: product.handle,
                gst: product.gst,
                hsn: product.hsn,
                miniAmount: product.miniAmount,
                minGst: product.minGst,
                cess: product.cess,
            };
        });

        const data = {
            products: updatedProducts
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error updating products:', errorData);
                // alert('Failed to update products. Please try again.');
                shopify.toast.show('Failed to update products. Please try again.');
                return;
            }

            const result = await response.json();
            console.log('Products updated successfully:', result);
            // alert('Products updated successfully!');
            shopify.toast.show('Products updated successfully!');
            fetchLogoUrl();
        } catch (error) {
            console.error('Error updating products:', error);
            // alert('An error occurred while updating products. Please try again.');
            shopify.toast.show('An error occurred while updating products. Please try again.');
        }
    }

    return (
        <div>
            <div style={{
                marginTop: '20px',
                justifyContent: 'space-between',
                display: 'flex',
                width: '100%',
            }}>
                <Text variant="headingLg">Product</Text>
            </div>
            <div style={{ marginTop: '20px' }}>
                <div style={{
                    width: '100%',
                    border: '1px solid #F1F1F4',
                    borderRadius: '10px',
                    padding: '22px',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)',
                }}>

                    <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                    }}>
                        Missing GST/HSN For Products
                    </div>


                    {collectionProduct.length > 0 ?
                        <div>
                            <div style={{ marginTop: '20px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CustomCheckbox
                                    id="my-product"
                                    isChecked={isMyProductGstChecked}
                                    onChange={handleMyProductGstCheckboxChange}
                                />
                                <label htmlFor="my-product" className="checkbox-label">My Products GST rate is dependent on the sale value of the product. Ex. Cloths,Curtains, Bedsheets etc</label>
                            </div>
                            <div style={{ marginTop: '20px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CustomCheckbox
                                    id="cess"
                                    isChecked={isCessChecked}
                                    onChange={handleCessCheckboxChange}
                                />
                                <label htmlFor="cess" className="checkbox-label">Set GST Compensation CESS % on Products</label>
                            </div>
                            <div>
                                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', backgroundColor: '#565656', color: 'white', fontSize: '16px', fontWeight: '600', marginTop: '20px', padding: '2px 20px', borderRadius: '10px', alignItems: 'center' }}>
                                    <div style={{ flex: '2', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '8px', borderRadius: '4px' }}>Title</div>
                                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>{isMyProductGstChecked && "Mini Amount"}</div>
                                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>{isMyProductGstChecked && "Mini GST(%)"}</div>
                                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>GST (%)</div>
                                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>HSN Code</div>
                                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>{isCessChecked && "CESS(%)"}</div>
                                </div>
                                {collectionProduct.map((order, index) => (
                                    <>
                                        <div key={index} style={{ display: 'flex', gap: '20px', backgroundColor: '#fff', color: '#000', fontSize: '16px', fontWeight: '400', padding: '10px 20px', borderRadius: '10px', alignItems: 'center' }}>
                                            <div style={{ flex: '2', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>{order.title}</div>
                                            <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                                {isMyProductGstChecked && <input
                                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                    type="number"
                                                    value={order.miniAmount}
                                                    onChange={(e) => {
                                                        const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                        const updatedProduct = { ...order, miniAmount: value };
                                                        const updatedCollectionProduct = [...collectionProduct];
                                                        updatedCollectionProduct[index] = updatedProduct;
                                                        setCollectionsProduct(updatedCollectionProduct);
                                                    }}
                                                />}
                                            </div>
                                            <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                                {isMyProductGstChecked && <input
                                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                    type="number"
                                                    value={order.minGst}
                                                    onChange={(e) => {
                                                        const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                        const updatedProduct = { ...order, minGst: value };
                                                        const updatedCollectionProduct = [...collectionProduct];
                                                        updatedCollectionProduct[index] = updatedProduct;
                                                        setCollectionsProduct(updatedCollectionProduct);
                                                    }}
                                                />}
                                            </div>
                                            <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                    type="number"
                                                    value={order.gst}
                                                    onChange={(e) => {
                                                        const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                        const updatedProduct = { ...order, gst: value };
                                                        const updatedCollectionProduct = [...collectionProduct];
                                                        updatedCollectionProduct[index] = updatedProduct;
                                                        setCollectionsProduct(updatedCollectionProduct);
                                                    }}
                                                />
                                            </div>
                                            <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                    type="number"
                                                    value={order.hsn}
                                                    onChange={(e) => {
                                                        const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                        const updatedProduct = { ...order, hsn: value };
                                                        const updatedCollectionProduct = [...collectionProduct];
                                                        updatedCollectionProduct[index] = updatedProduct;
                                                        setCollectionsProduct(updatedCollectionProduct);
                                                    }}
                                                />
                                            </div>
                                            <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                                {isCessChecked &&
                                                    <input
                                                        style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                        type="number"
                                                        value={order.cess}
                                                        onChange={(e) => {
                                                            const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                            const updatedProduct = { ...order, cess: value };
                                                            const updatedCollectionProduct = [...collectionProduct];
                                                            updatedCollectionProduct[index] = updatedProduct;
                                                            setCollectionsProduct(updatedCollectionProduct);
                                                        }}
                                                    />}
                                            </div>
                                        </div>


                                    </>
                                ))}
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                    <div style={{ backgroundColor: '#74A535', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px', cursor: 'pointer' }}
                                        onClick={handleUpdate} >
                                        Update
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <EmptyState
                            heading="No products found"

                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                            <p>With missing GST(%) / HSN</p>
                        </EmptyState>}
                </div>
            </div>
        </div>


    );
}