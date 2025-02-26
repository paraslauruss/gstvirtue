import { Card, EmptyState, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import "./product.css";
import { useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import CustomCheckbox from "../utils/custom_check_box";


export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};


export function Collection() {

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');

    const fetchCollections = useCallback(async (query) => {
        // setLoading(true);
        try {
            let url;
            if (selectedCollectionType === "Custom Collections") {
                url = `http://localhost:3001/api/collection?search=${encodeURIComponent(query)}`;
            } else if (selectedCollectionType === "Smart Collections") {
                url = `http://localhost:3001/api/smart-collection?search=${encodeURIComponent(query)}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'store-name': storeName,
                    'api-version': '2025-01',
                    'access-token': accessToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCollections(data);
            } else {
                console.error('Error fetching collections:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            // setLoading(false);
        }
    }, [storeName, accessToken]);

    const debouncedFetchCollections = useCallback(
        debounce((query) => fetchCollections(query), 300),
        [fetchCollections]
    );

    useEffect(() => {
        if (searchQuery) {
            debouncedFetchCollections(searchQuery);
        } else {
            fetchCollections('');
        }
    }, [searchQuery, debouncedFetchCollections, fetchCollections]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const collectionType = [
        "Custom Collections",
        "Smart Collections",
    ];

    const [selectedCollectionType, setSelectedCollectionType] = useState(collectionType[0]);


    const handleChange = (event) => {
        setSelectedCollectionType(event.target.value);
    };



    const handleCollectButton = async () => {
        let url;
        if (selectedCollectionType === "Custom Collections") {
            url = 'http://localhost:3001/api/collection';
        } else if (selectedCollectionType === "Smart Collections") {
            url = 'http://localhost:3001/api/smart-collection';
        }
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'store-name': storeName,
                    'api-version': '2025-01',
                    'access-token': accessToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCollections(data);

                console.error('Collections Data:', data);
            } else {
                console.error('Error fetching logo URL:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching logo URL:', error);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        const fetchLogoUrl = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/collection', {
                    method: 'GET',
                    headers: {
                        'store-name': storeName,
                        'api-version': '2025-01',
                        'access-token': accessToken
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCollections(data);

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

        fetchLogoUrl();
    }, []);


    const [isMyProductGstChecked, setIsMyProductGstChecked] = useState(false);
    const handleMyProductGstCheckboxChange = (event) => {
        setIsMyProductGstChecked(event.target.checked);
    };

    const [isCessChecked, setIsCessChecked] = useState(false);
    const handleCessCheckboxChange = (event) => {
        setIsCessChecked(event.target.checked);
    };


    const [collectionProduct, setCollectionsProduct] = useState([]);
    const [selectedCollectionName, setSelectedCollectionName] = useState([]);
    // const [loading, setLoading] = useState(true);

    const handleClear = async () => {
        setCollectionsProduct([]);
        setSelectedCollectionType("Custom Collections");
        // selectedCollectionType = "Custom Collections";
        handleCollectButton();
    }

    const handleCollectionProductApi = async (order) => {

        setSelectedCollectionName(order.title);
        try {
            const response = await fetch(`http://localhost:3001/api/products/collection?collection_id=${order.id}`, {
                method: 'GET',
                headers: {
                    'store-name': storeName,
                    'api-version': '2025-01',
                    'access-token': accessToken
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
            //setLoading(false);
        }
    }

    const handleUpdate = async (order) => {

        const apiUrl = 'http://localhost:3001/api/products/update-products';
        const headers = {
            'store-name': storeName,
            'api-version': '2025-01',
            'access-token': accessToken,
            'Content-Type': 'application/json'
        };

        const updatedProducts = collectionProduct.map((product) => {
            return {
                id: product.id,
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
                method: 'POST',
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
        } catch (error) {
            console.error('Error updating products:', error);
            // alert('An error occurred while updating products. Please try again.');
            shopify.toast.show('An error occurred while updating products. Please try again.');
        }
    }

    const handleCollectionApi = async (order, index) => {
        let url;
        if (selectedCollectionType === "Custom Collections") {
            url = `http://localhost:3001/api/collection/${order.id}`;
        } else if (selectedCollectionType === "Smart Collections") {
            url = `http://localhost:3001/api/smart-collection/${order.id}`;
        }

        const headers = {
            'store-name': storeName,
            'api-version': '2025-01',
            'access-token': accessToken,
            'Content-Type': 'application/json'
        };

        const data = {
            mini_amount: order.mini_amount,
            mini_gst: order.mini_gst,
            gst: order.gst,
            hsn_code: order.hsn_code,
            cess: order.cess
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error updating collection:', errorData);
                // alert('Failed to update collection. Please try again.');
                shopify.toast.show('Failed to update collection. Please try again.');
                return;
            }

            const result = await response.json();
            console.log('Collection updated successfully:', result);

            // Update the state with the new data
            const updatedCollections = [...collections];
            updatedCollections[index] = {
                ...updatedCollections[index],
                mini_amount: result.mini_amount,
                mini_gst: result.mini_gst,
                gst: result.gst,
                hsn_code: result.hsn_code,
                cess: result.cess
            };
            setCollections(updatedCollections);
            //alert('Collection updated successfully!');
            shopify.toast.show('Collection updated successfully!');
        } catch (error) {
            console.error('Error updating collection:', error);
            // alert('An error occurred while updating collection. Please try again.');
            shopify.toast.show('An error occurred while updating collection. Please try again.');
        }
    };

    function debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (<div style={{ minHeight: "100vh" }}>
                <div style={{ marginTop: '20px', justifyContent: 'space-between', display: 'flex', width: '100%', }}>
                    <Text variant="headingLg">Collections</Text>

                </div>

                <div style={{ marginTop: '20px' }}>
                    <div style={{ width: '100%', border: '1px solid #F1F1F4', borderRadius: '10px', padding: '22px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '20px', }}>

                                <select
                                    name="collectionType"
                                    value={selectedCollectionType}
                                    onChange={handleChange}
                                    style={{
                                        width: '200px',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        appearance: 'none',
                                        position: 'relative',
                                        background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABcSURBVDiN7c7LDUBAFIXhL9GETlRiKTEdyGwoUwNawQIbmYnX1r+79zxy+PlMcbprVBgz/gYlplxhwIyY0Lpda65WdVgwJH79VThV8jh8EG2T573kFQHt2/DPTVb/CBGH2F07RAAAAABJRU5ErkJggg==) no-repeat right 10px center',
                                    }}>

                                    {collectionType.map((collectionType, index) => (
                                        <option key={index} value={collectionType}>
                                            {collectionType}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    style={{ width: '400px', border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                    placeholder="Full Title"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ backgroundColor: '#74A535', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px', cursor: 'pointer' }} onClick={handleCollectButton}>
                                    Get Collections
                                </div>
                                <div style={{ backgroundColor: '#FFFFFF', padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'black', fontSize: '14px', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer' }} onClick={handleClear}>
                                    Clear
                                </div>
                            </div>

                        </div>

                        <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E2E2', marginTop: '20px', marginBottom: '20px', }}></div>
                        {<div>
                            <div style={{ fontSize: '18px', fontWeight: '600', }}>
                                GST/HSN For Collections
                            </div>
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

                            <div style={{ display: 'flex', gap: '20px', backgroundColor: '#565656', color: 'white', fontSize: '16px', fontWeight: '600', marginTop: '20px', padding: '2px 20px', borderRadius: '10px', alignItems: 'center' }}>
                                <div style={{ flex: '2', display: 'flex', alignItems: 'center', justifyContent: 'start', color: '#fff', padding: '8px', borderRadius: '4px' }}>Title</div>
                                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>{isMyProductGstChecked && "Mini Amount"}</div>
                                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>{isMyProductGstChecked && "Mini GST(%)"}</div>
                                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>GST (%)</div>
                                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>HSN Code</div>
                                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>{isCessChecked && "CESS(%)"}</div>
                                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>Actions</div>
                            </div>
                            {collections.map((order, index) => (
                                <>
                                    <div key={index} style={{ display: 'flex', gap: '20px', backgroundColor: '#fff', color: '#000', fontSize: '16px', fontWeight: '400', padding: '10px 20px', borderRadius: '10px', alignItems: 'center' }}>
                                        <div style={{ flex: '2', display: 'flex', alignItems: 'center', justifyContent: 'start', color: '#4AA0B5', cursor: 'pointer' }} onClick={() => handleCollectionProductApi(order)}>{order.title}</div>
                                        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                            {isMyProductGstChecked && <input
                                                style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                type="number"
                                                value={order.mini_amount}
                                                onChange={(e) => {
                                                    const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                    const updatedCollection = { ...order, mini_amount: value };
                                                    const updatedCollectionCollection = [...collections];
                                                    updatedCollectionCollection[index] = updatedCollection;
                                                    setCollections(updatedCollectionCollection);
                                                }}
                                            />}
                                        </div>
                                        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                            {isMyProductGstChecked && <input
                                                style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                type="number"
                                                value={order.mini_gst}
                                                onChange={(e) => {
                                                    const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                                                    const updatedCollection = { ...order, mini_gst: value };
                                                    const updatedCollectionCollection = [...collections];
                                                    updatedCollectionCollection[index] = updatedCollection;
                                                    setCollections(updatedCollectionCollection);
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
                                                    const updatedCollection = { ...order, gst: value };
                                                    const updatedCollectionCollection = [...collections];
                                                    updatedCollectionCollection[index] = updatedCollection;
                                                    setCollections(updatedCollectionCollection);
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                                            <input
                                                style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', width: '100%' }}
                                                type="text"
                                                value={order.hsn_code}
                                                onChange={(e) => {
                                                    const updatedCollection = { ...order, hsn_code: e.target.value };
                                                    const updatedCollectionCollection = [...collections];
                                                    updatedCollectionCollection[index] = updatedCollection;
                                                    setCollections(updatedCollectionCollection);
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
                                                        const updatedCollection = { ...order, cess: value };
                                                        const updatedCollectionCollection = [...collections];
                                                        updatedCollectionCollection[index] = updatedCollection;
                                                        setCollections(updatedCollectionCollection);
                                                    }}
                                                />}
                                        </div>
                                        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}> <img src={ic_refresh} style={{ height: '16px', marginLeft: '15px', cursor: 'pointer' }} onClick={() => handleCollectionApi(order, index)} /></div>
                                    </div>
                                    <div style={{ backgroundColor: '#CCC', height: '1px', marginTop: '5px', marginBottom: '5px' }}></div>
                                </>
                            ))}
                        </div>}


                    </div>
                    <div style={{ marginTop: '20px' }}></div>
                    {collectionProduct.length > 0 ?
                        <div style={{ width: '100%', border: '1px solid #F1F1F4', borderRadius: '10px', padding: '22px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}>
                            <div style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>{`Product List for "${selectedCollectionName}" Collection`}</div>
                            <div style={{ display: 'flex', gap: '20px', backgroundColor: '#E1E1E1', color: 'black', fontSize: '16px', fontWeight: '600', marginTop: '20px', padding: '2px 20px', borderRadius: '10px', alignItems: 'center' }}>
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
                        : null}


                    {/* <div style={{ width: '100%', border: '1px solid #F1F1F4', borderRadius: '10px', padding: '22px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}>


                        <div style={{ fontSize: '18px', fontWeight: '600' }}>
                            Product List for "Glow Up Essentials" Collection
                        </div>


                        <div style={{ backgroundColor: '#E1E1E1', color: 'black', fontSize: '16px', fontWeight: '600', display: 'flex', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', }}>
                            <div style={{ width: '200%', display: 'flex', alignItems: 'flex-start', justifyContent: 'start', }}>Title</div>
                            <div style={{ width: '100%' }}>Mini Amount</div>
                            <div style={{ width: '100%' }}>Mini GST(%)</div>
                            <div style={{ width: '100%' }}>GST (%)</div>
                            <div style={{ width: '100%' }}>HSN Code</div>
                            <div style={{ width: '100%' }}>CESS(%)</div>
                            <div style={{ width: '100%' }}>Actions</div>
                        </div>

                        <div style={{ color: 'black', fontSize: '16px', fontWeight: '400', display: 'flex', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', }}>
                            <div style={{ width: '200%', display: 'flex', alignItems: 'flex-start', justifyContent: 'start', }}>
                                T-shirt
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                /></div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ border: '1px solid #000', borderRadius: '4px', padding: '8px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.09)', }}
                                    type="text"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', }}>
                            <div style={{
                                backgroundColor: '#74A535',
                                padding: '5px 20px', display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px', borderRadius: '4px',
                            }}>
                                Update
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>)}


        </div>
    );
}