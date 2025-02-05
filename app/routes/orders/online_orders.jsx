import { useFetcher, useLoaderData } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Card, Divider, FooterHelp, Text, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import ic_close from '../../assets/images/ic_close.png';
import ic_refresh_line from '../../assets/images/ic_refresh_line.png';
import searchIcon from '../../assets/images/searchIcon.png';
import ic_date from '../../assets/images/ic_date.png';
import ic_download from '../../assets/images/ic_download.png';
import ic_edit from '../../assets/images/ic_edit.png';
import ic_swap from '../../assets/images/ic_swap.png';
import ic_print from '../../assets/images/ic_print.png';
import ic_email from '../../assets/images/ic_email.png';
import ic_calculator from '../../assets/images/ic_calculator.png';
import ic_pick_up from '../../assets/images/ic_pick_up.png';
import ic_fulfillment from '../../assets/images/ic_fulfillment.png';
import ic_refresh from '../../assets/images/ic_refresh.png';
import CustomBadge from "../../custom_badge";
import { XIcon } from '@shopify/polaris-icons';

export function OnlineOrders() {

    const fetcher = useFetcher();
    // const data = fetcher.data;
    const shopify = useAppBridge();
    const data = useLoaderData();
    const orderList = data.orders.data.orders.edges;
    const productList = data.orders.data.orders.edges;
    

    const [shopUrl, setShopUrl] = useState(null);
    useEffect(() => {
        if (shopify) {
            setShopUrl(shopify.config.shop);
        }
    }, [shopify]);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0'); // Pad single digit days with leading zero

        return `${year}-${month}-${day}`;
    };

    const handleDownload = (order, invoiceNumber) => {
        if (typeof window !== 'undefined') {
            import('html2pdf.js').then((html2pdf) => {
                fetch('/invoice1.html')
                    .then(response => response.text())
                    .then(html => {
                        let updatedHtml = html;

                        updatedHtml = updatedHtml.replace('{{invoiceNo}}', invoiceNumber);
                        updatedHtml = updatedHtml.replace('{{orderID}}', order.node.name);
                        updatedHtml = updatedHtml.replace('{{invoiceDate}}', getCurrentDate());
                        updatedHtml = updatedHtml.replace('{{paymentGatewayNames}}', order.node.paymentGatewayNames);
                        updatedHtml = updatedHtml.replace('{{builedToName}}', order.node.billingAddress.name);
                        updatedHtml = updatedHtml.replace('{{builedToAddress}}', [
                            order.node.billingAddress.address1,
                            order.node.billingAddress.address2,
                            order.node.billingAddress.city,
                            order.node.billingAddress.zip,
                            order.node.billingAddress.province,
                            order.node.billingAddress.country
                        ].filter(Boolean) // Filter out any null, undefined, or empty values
                            .join(', '));
                        updatedHtml = updatedHtml.replace('{{builedToPhone}}', order.node.billingAddress.phone);

                        updatedHtml = updatedHtml.replace('{{shipToName}}', order.node.shippingAddress.name);
                        updatedHtml = updatedHtml.replace('{{shipToAddress}}', [
                            order.node.shippingAddress.address1,
                            order.node.shippingAddress.address2,
                            order.node.shippingAddress.city,
                            order.node.shippingAddress.zip,
                            order.node.shippingAddress.province,
                            order.node.shippingAddress.country
                        ].filter(Boolean) // Filter out any null, undefined, or empty values
                            .join(', '));
                        updatedHtml = updatedHtml.replace('{{shipToPhone}}', order.node.shippingAddress.phone);

                        let itemsHtml = '';
                        order.node.lineItems.edges.forEach(item => {
                            itemsHtml += `
                                <div class="text-small" style="display: flex; padding: 10px 0px;">
                                    <p style="width: 30%;">${item.node.name}</p>
                                    <p style="width: 5%;">${item.node.quantity}</p>
                                    <div style="width: 10%;">
                    <p style="text-decoration: line-through; color: #96ADCB;">RS. ${(item.node.product.compareAtPriceRange.minVariantCompareAtPrice.amount)}</p>
                    <p>RS. ${(item.node.product.priceRangeV2.maxVariantPrice.amount)}</p>
                </div>

                <p style="width: 20%;">RS. ${(item.node.taxLines[0].priceSet.shopMoney.amount)}</p>
                <p style="width: 5%;">5%</p>
                <p style="width: 5%;">5%</p>
                <p style="width: 10%;">RS. 44.90</p>
                <p style="width: 15%;">RS. ${(parseFloat(item.node.product.priceRangeV2.maxVariantPrice.amount) + parseFloat(item.node.taxLines[0].priceSet.shopMoney.amount)).toFixed(2)}</p>
                                </div>`;
                        });

                        updatedHtml = updatedHtml.replace('{{orderItems}}', itemsHtml);
                        const element = document.createElement('div');
                        element.innerHTML = updatedHtml;

                        const options = {
                            filename: 'invoice.pdf',
                            margin: 20,
                            html2canvas: { scale: 2 },
                            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                        };

                        html2pdf.default().from(element).set(options).save();
                    })
                    .catch(error => {
                        console.error('Error loading HTML file:', error);
                    });
            });
        }

    };
    const [value, setValue] = useState('');
    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

    const [active, setActive] = useState(false);

    const toggleModal = useCallback(() => setActive((active) => !active), []);

    
    return(
        <div style={{ backgroundColor: '#ffffff', padding: '30px' }}>
            
                <div style={{ marginTop: 30 }}>
                    <Card padding={400}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    style={{
                                        width: '15px',
                                        height: '15px',
                                        backgroundColor: '#74A535',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                    }}
                                ></div>
                                <div style={{ fontSize: '18px', color: '#000000', fontWeight: 'bold' }}>
                                    <Text>
                                        Introducing Shipping Labels & Packing Slips!
                                    </Text>
                                </div>
                            </div>
                            <div>
                                <img src={ic_close} alt="Close Icon" style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Divider />
                        </div>

                        <Text>Easily print shipping labels and packing slips directly from your order list. streamline your packing process ans ensure accuracy in just a few clicks.</Text>


                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                padding: '5px 10px',
                                marginTop: '10px',
                                border: '1px solid #828282',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={() => alert('Button clicked!')}
                        >
                            <Text as="p" tone="subdued">Learn More</Text>
                        </div>
                    </Card>

                    <div style={{ display: 'flex', marginTop: '60px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="headingXl" as="h4">Online Orders</Text>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    padding: '5px 10px',
                                    marginTop: '10px',
                                    border: '1px solid #828282',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => alert('Button clicked!')}
                            >
                                <Text as="p" tone="subdued">Bulk Order Update</Text>
                            </div>

                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    padding: '5px 10px',
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                    border: '1px solid #828282',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => alert('Button clicked!')}
                            >
                                <Text as="p" tone="subdued">Reset Invoice Number</Text>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '10px',
                                    height: '100%',
                                }}
                            >
                                <img src={ic_refresh_line} alt="Refresh" style={{ height: '24px' }} />
                            </div>
                        </div>

                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Card>
                           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                               <div style={{ display: 'flex', width: '100%' }}>
                                {/* ORDER  */}
                                   <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc',borderRadius: '8xpx', 
                                        padding: '5px 10px', 
                                        height: '33px', backgroundColor:'#F8F8F8',
                                    }}>
                                       <img src={searchIcon} 
                                            alt="Search" 
                                            style={{ height: '15px', marginRight: '8px' }} />
                                        <input
                                            value={value}
                                            onChange={handleChange}
                                            placeholder="Order No, Invoice No, Customer"
                                            style={{
                                            border: 'none',
                                            outline: 'none',
                                            flex: 1,
                                        }}/>
                                    </div>
                                    {/*NAME PRODUCT  */}
                                    <div style={{ width: '14%', marginLeft: '16px' }}>
                                        <input
                                            value={value}
                                            onChange={handleChange}
                                            placeholder="Product Name"
                                            style={{
                                            width: '100%',
                                            height: '33px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            backgroundColor:'#F8F8F8',
                                            }}
                                        />
                                        </div>
                                    {/* PAYMENT */}
                                    <div style={{ width: '15%', marginLeft: '16px' }}>
                                        <select
                                            value={value}
                                            onChange={handleChange}
                                            style={{
                                            width: '100%',
                                            height: '33px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            backgroundColor:'#F8F8F8',
                                            cursor: 'pointer',
                                            fontSize:'14px',
                                            fontFamily:'Inter',
                                            fontWeight:'400',
                                            color:'#202020'
                                            }}>
                                            <option value=""> Payment Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="authorized">Authorized</option>
                                            <option value="partially_paid">Partially Paid</option>
                                            <option value="paid">Paid</option>
                                            <option value="partially_refunded">Partially Refunded</option>
                                            <option value="refunded">Refunded</option>
                                            <option value="voided">Voided</option>
                                        </select>
                                        </div>
                                        {/* FULFILLEMENT */}
                                    <div style={{ display: 'flow', width: '16%', marginLeft: '16px' }}>
                                        <select 
                                           value={value}
                                           onChange={handleChange}
                                           style={{
                                             width:'100%',
                                             height:'33px',
                                             border:'1px solid #ccc',
                                             borderRadius:'8px',
                                             backgroundColor:'#F8F8F8',
                                             cursor:'pointer',
                                             fontSize:'14px',
                                             fontFamily:'Inter',
                                             fontWeight:'400',
                                             color:'#202020'
                                            }}
                                        >
                                            <option value="">Fullfillement Status</option>
                                            <option value="fullfilled">Fullfilled</option>
                                            <option value="not fullfilled">Not Fullfilled</option>
                                            <option value="partially filled">Partially Fullfilled</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    {/* DATE  */}
                                    <div style={{ display: 'flow', width: '14%', marginLeft: '16px' }}>
                                        <TextField
                                            value={value}
                                            onChange={handleChange}
                                            placeholder="Select Date"
                                            prefix={<div style={{ display: 'flex', alignItems: 'center' }}><img src={ic_date} style={{ height: '15px' }} /></div>}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {/* BUTTONS SEARCH AND CLEAR */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#74A535',
                                            color: '#ffffff',
                                            padding: '5px',
                                            width: '100px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => alert('Button clicked!')}
                                    ><Text>Search</Text></div>
                                </div>
                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                        padding: '5px',
                                        width: '100px',
                                        marginLeft: '10px',
                                        border: '1px solid #828282',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => alert('Button clicked!')}
                                >
                                    <Text as="p" tone="subdued">Clear</Text>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Divider />
                            </div>
                            <div style={{
                                borderRadius: '4px', fontSize: '16px', padding: '10px 20px', color: '#ffffff', backgroundColor: '#565656', flexDirection: 'row', display: 'flex'
                            }}>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Order</Text>
                                </div>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Invoice No.</Text>
                                </div>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Date</Text>
                                </div>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Customer</Text>
                                </div>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Total</Text>
                                </div>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Status</Text>
                                </div>
                                <div style={{ width: '12.5%' }}>
                                    <Text>Fulfilment</Text>
                                </div>
                                <div style={{ width: '30%' }}>
                                    <Text>Action</Text>
                                </div>
                            </div>
                            {  
                                orderList.map((order, index) => {
                                    return (
                                        <div style={{
                                            borderRadius: '4px', fontSize: '14px', padding: '10px 20px', color: '#000000', backgroundColor: '#ffffff', flexDirection: 'row', display: 'flex'
                                        }}>
                                            <div style={{ width: '12.5%' }}>
                                                <a href={`https://${shopUrl}/admin/orders/${order.node.id.split('/').pop()}`} target="_blank" rel="noopener noreferrer">
                                                    {order.node.name}
                                                </a>
                                                {/* <Link url={`https://admin.shopify.com/store/gst-paras/orders/${order.node.id.split('/').pop()}`}>{order.node.name}</Link> */}
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{(index + 1).toString().padStart(3, '0')}</Text>
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{new Intl.DateTimeFormat("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }).format(new Date(order.node.createdAt))}</Text>
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{order.node.customer?.displayName}</Text>
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: order.node.totalPriceSet.shopMoney.currencyCode,
                                                }).format(order.node.totalPriceSet.shopMoney.amount)}</Text>
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <CustomBadge status={order.node.displayFinancialStatus} />
                                            </div>
                                            <div style={{ width: '12.5%' }}>
                                                <Text>{order.node.displayFulfillmentStatus === "UNFULFILLED" ? "Not Fulfilled" : "Fulfilled"}</Text>
                                            </div>
                                            <div style={{ width: '30%' }}>
                                                <img src={ic_download} style={{ height: '16px', cursor: 'pointer' }} alt="Download" onClick={() => handleDownload(order, (index + 1).toString().padStart(3, '0'))} />
                                                <img src={ic_edit} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_swap} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_print} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_email} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_calculator} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_pick_up} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_fulfillment} style={{ height: '16px', marginLeft: '15px' }} />
                                                <img src={ic_refresh} style={{ height: '16px', marginLeft: '15px' }} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Card>


                    </div>

                </div>
                <FooterHelp>
                    @2024 Virtue. All Rights Reserved.
                </FooterHelp>
            </div>
    );
}