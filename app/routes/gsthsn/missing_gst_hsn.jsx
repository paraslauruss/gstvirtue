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
                    "Content-Type": "application/json",
                    'store-name' : storeName,
                    'api-version' : '2025-01',
                    'access-token' : accessToken
                }
            });
            if (response.ok) {
                const data = await response.json();
                //setCollectionsProduct(data);  // Incorrect!
                setCollectionsProduct(data.updatedProducts); // Corrected:  Use updatedProducts array
                console.log('Collections Data:', data);
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

    const handleUpdate = async () => {

         //Optimized product update function
        const apiUrl = 'http://localhost:3001/api/products/update-multiple';

        const updatedProducts = collectionProduct.map(product => ({
            handle: product.handle,
            gst: product.gst,
            hsn: product.hsn,
            miniAmount: product.miniAmount,
            minGst: product.minGst,
            cess: product.cess,
        }));

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'store-name': storeName,
                    'api-version': '2025-01',
                    'access-token': accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products: updatedProducts })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Products updated successfully:', result);
                fetchLogoUrl(); // 🔄 Re-fetch updated data
            } else {
                const errorData = await response.json();  // Get the error message from the response
                console.error('Error updating products:', errorData);
            }
        } catch (error) {
            console.error('Error updating products:', error);
        }

    };


      const updateProductField = (index, field, value) => {
        const updatedProducts = [...collectionProduct];
        updatedProducts[index][field] = value;
        setCollectionsProduct(updatedProducts);
    };

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
                    {collectionProduct.length > 0 ? (
                        <div>
                            {/* GST and CESS Checkboxes */}
                            <div style={{ marginTop: '20px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CustomCheckbox
                                id="my-product"
                                isChecked={isMyProductGstChecked}
                                onChange={handleMyProductGstCheckboxChange}
                            />
                            <label htmlFor="my-product" className="checkbox-label">
                                My Products GST rate is dependent on the sale value of the product. Ex. Clothes, Curtains, Bedsheets, etc.
                            </label>
                            </div>

                            <div style={{ marginTop: '20px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CustomCheckbox
                                id="cess"
                                isChecked={isCessChecked}
                                onChange={handleCessCheckboxChange}
                            />
                            <label htmlFor="cess" className="checkbox-label">
                                Set GST Compensation CESS % on Products
                            </label>
                            </div>

                            {/* Table Header */}
                            <div style={{ marginTop: '20px', display: 'flex', gap: '20px', backgroundColor: '#565656', color: 'white', fontSize: '16px', fontWeight: '600', padding: '2px 20px', borderRadius: '10px', alignItems: 'center' }}>
                            <div style={{ flex: '2', padding: '8px' }}>Title</div>
                            {isMyProductGstChecked && <div style={{ flex: '1' }}>Mini Amount</div>}
                            {isMyProductGstChecked && <div style={{ flex: '1' }}>Mini GST (%)</div>}
                            <div style={{ flex: '1' }}>GST (%)</div>
                            <div style={{ flex: '1' }}>HSN Code</div>
                            {isCessChecked && <div style={{ flex: '1' }}>CESS (%)</div>}
                            </div>

                            {/* Table Data */}
                            {collectionProduct.map((product, index) => (
                            <div
                                key={product.handle || index}
                                style={{ display: 'flex', gap: '20px', backgroundColor: '#fff', color: '#000', fontSize: '16px', fontWeight: '400', padding: '10px 20px', borderRadius: '10px', alignItems: 'center' }}
                            >
                                {/* Title */}
                                <div style={{ flex: '2' }}>{product.title}</div>

                                {/* Mini Amount (if applicable) */}
                                {isMyProductGstChecked && (
                                <div style={{ flex: '1' }}>
                                    <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                    type="number"
                                    value={product.miniAmount || ''}
                                    onChange={(e) => {
                                        const value = Math.max(0, Number(e.target.value) || 0);
                                        updateProductField(index, 'miniAmount', value);
                                    }}
                                    />
                                </div>
                                )}

                                {/* Mini GST (if applicable) */}
                                {isMyProductGstChecked && (
                                <div style={{ flex: '1' }}>
                                    <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                    type="number"
                                    value={product.minGst || ''}
                                    onChange={(e) => {
                                        const value = Math.max(0, Number(e.target.value) || 0);
                                        updateProductField(index, 'minGst', value);
                                    }}
                                    />
                                </div>
                                )}

                                {/* GST Input */}
                                <div style={{ flex: '1' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                    type="number"
                                    value={product.gst || ''}
                                    onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value) || 0);
                                    updateProductField(index, 'gst', value);
                                    }}
                                />
                                </div>

                                {/* HSN Code Input */}
                                <div style={{ flex: '1' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                    type="number"
                                    value={product.hsn || ''}
                                    onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value) || 0);
                                    updateProductField(index, 'hsn', value);
                                    }}
                                />
                                </div>

                                {/* CESS Input (if applicable) */}
                                {isCessChecked && (
                                <div style={{ flex: '1' }}>
                                    <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                    type="number"
                                    value={product.cess || ''}
                                    onChange={(e) => {
                                        const value = Math.max(0, Number(e.target.value) || 0);
                                        updateProductField(index, 'cess', value);
                                    }}
                                    />
                                </div>
                                )}
                            </div>
                            ))}

                            {/* Update Button */}
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            <div
                                style={{ backgroundColor: '#74A535', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={handleUpdate}>
                                Update
                            </div>
                            </div>
                        </div>
                        ) : (
                        <EmptyState
                            heading="No products found"
                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                            <p>With missing GST(%) / HSN</p>
                        </EmptyState>
                        )}

                </div>
            </div>
        </div>
    );
}