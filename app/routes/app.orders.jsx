import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import {
    Text,
    Divider,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { OfflineOrders } from "./orders/offline_orders";
import { GenerateEInvoice } from "./orders/generate_e_invoice";
import { CreditNotes } from "./orders/credit_notes";
import { ECreditNotes } from "./orders/e_credit_notes";
import { OnlineOrders } from "./orders/online_orders";

export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const variantResponse = await admin.graphql(
        `#graphql
    query {
  orders(first: 10) {
    edges {
      node {
        id
        name
        lineItems(first:250){
          edges{
            node{
              name
              quantity
              product{
                priceRangeV2{
                  maxVariantPrice{
                    amount
                  }
                }
                compareAtPriceRange{
                  minVariantCompareAtPrice{
                    amount
                  }
                }
              }
              taxable
              
              taxLines{
                priceSet{
                  shopMoney{
                    amount
                  }
                }
              }
            }
          }
        }
        totalPriceSet{
          shopMoney{
            amount
            currencyCode
          }
        }
        __typename
        customer {
          displayName
        }
        createdAt
        updatedAt
        displayFinancialStatus
        displayFulfillmentStatus
        paymentGatewayNames
        billingAddress {
          address1
          address2
          city
          country
          province
          zip
          name
          phone
        }
          shippingAddress {
          address1
          address2
          phone
          city
          country
          province
          zip
          name
        }
      }
    }
  }
}`
    );
    const variantResponseJson = await variantResponse.json();

    const productResponse = await admin.graphql(
                `#graphql
            query Product { 
              products(first:50){
                edges{
                  node{
                    id
                    handle
                    productType
                    title
                  }
                }
              }
          }`
        );
  const productResponseJson = await productResponse.json();
    return {
        orders: variantResponseJson,
        products:productResponseJson
    };
};

export const action = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();
    console.log("Form data submitted:", Object.fromEntries(formData));
    return {
        successMessage: "Success",
    };
};

// export function Dialog() {
//     const [active, setActive] = useState(false);
//     const [orders, setOrders] = useState([]);

//     const toggleModal = useCallback(() => setActive((active) => !active), []);

//     useEffect(() => {
//         // Automatically shows the modal when the component mounts
//         setActive(true);

//         // Fetch the orders data here (or use the loader data if available)
//         async function fetchOrders() {
//             const response = await fetch("/path/to/orders"); // Update with correct endpoint
//             const data = await response.json();
//             setOrders(data.orders); // Assuming the data structure
//         }

//         fetchOrders();
//     }, []);

//     return (
//         <div>
//             {/* Backdrop */}
//             {active && (
//                 <Backdrop
//                     style={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                         zIndex: 1,
//                     }}
//                     onClick={toggleModal}  // Close modal if backdrop is clicked
//                 />
//             )}

//             {/* Custom Modal Card */}
//             {active && (
//                 <div
//                     style={{
//                         position: 'fixed',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         backgroundColor: 'white',
//                         zIndex: 9999,
//                         borderRadius: '10px',
//                     }}
//                 >
//                     <div
//                         style={{
//                             color: 'white',
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             backgroundColor: '#74A535',
//                             padding: '10px 20px',
//                             borderRadius: '8px 8px 0px 0px',
//                         }}
//                     >
//                         <Text variant="headingLg">App Setup Instructions</Text>
//                         <div style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={toggleModal}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                 <path d="M19.5347 0.465273C18.9142 -0.15509 17.9083 -0.155091 17.2877 0.465273L10 7.75298L2.71229 0.465273C2.09174 -0.155091 1.08583 -0.155091 0.465273 0.465273C-0.155091 1.08582 -0.155091 2.09174 0.465273 2.71229L7.75298 10L0.465273 17.2877C-0.155091 17.9083 -0.15509 18.9142 0.465275 19.5347C1.08583 20.1551 2.09174 20.1551 2.71229 19.5347L10 12.247L17.2877 19.5347C17.9083 20.1551 18.9142 20.1551 19.5347 19.5347C20.1551 18.9142 20.1551 17.9083 19.5347 17.2877L12.247 10L19.5347 2.71229C20.1551 2.09174 20.1551 1.08583 19.5347 0.465273Z" fill="white" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* Orders Section */}
//                     <div style={{ margin: '10px 20px' }}>
//                         <Card>
//                             <Text variant="headingMd">Order List</Text>
//                             {orders.length > 0 ? (
//                                 <div>
//                                     {orders.map((order) => (
//                                         <div key={order.id} style={{ marginBottom: '10px' }}>
//                                             <Text variant="bodyMd">Order ID: {order.id}</Text>
//                                             {/* Render other order details as needed */}
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <Text variant="bodyMd">No orders found.</Text>
//                             )}
//                         </Card>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

export default function Index() {
    const tabs = [
        {
            id: 'online-orders',
            content: 'Online Orders',
            accessibilityLabel: 'Online Orders',
            panelID: 'online-orders',
        },
        {
            id: 'offline-orders',
            content: 'Offline Orders',
            panelID: 'offline-orders',
        },
        {
            id: 'credit-notes',
            content: 'Credit Notes',
            panelID: 'credit-notes',
        },
        {
            id: 'generate-e-invoices',
            content: 'Generate e-Invoices',
            panelID: 'generate-e-invoices',
        },
        {
            id: 'e-credit-notes',
            content: 'e-Credit Notes',
            panelID: 'e-credit-notes',
        },
    ];

    const [selected, setSelected] = useState(0);


    // console.log('Variant updated successfully:', data);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const data = useLoaderData();
    const orderList = data.orders.data.orders.edges;
    const shopify = useAppBridge();

    return (
        <div style={{ backgroundColor: "#ffffff", padding: '30px' }}>
            <div style={{ display: "flex" }}>
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        style={{
                            position: 'relative',
                            padding: '10px 10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleTabChange(index)}
                    >
                        <Text as="p" fontWeight="regular">{tab.content}</Text>
                        {selected === index && (
                            <div style={{
                                position: 'absolute',
                                bottom: -2,
                                left: 0,
                                right: 0,
                                height: '4px',
                                backgroundColor: '#74A535',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <Divider />
            {selected === 0 && <OnlineOrders />}
            {selected === 1 && <OfflineOrders/>}
            {selected === 2 && <CreditNotes />}
            {selected === 3 && <GenerateEInvoice />}
            {selected === 4 && <ECreditNotes />}
        </div>
    );
}