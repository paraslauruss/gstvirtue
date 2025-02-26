import { useLoaderData } from "@remix-run/react";
import {
    Text,
    Divider,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import {Payees} from "./estimates/payees";
import {Estimates} from "./estimates/Estimates";
import {Expenses} from "./estimates/Expenses";
import {Bills} from './estimates/Bills';


export const loader = async ({request}) => {
    const {admin} = await authenticate.admin(request);
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

    const { session } = await authenticate.admin(request);
  const response = await fetch("http://localhost:3001/api/customers", {
    headers: {
      "store-name": session.shop,
      "api-version": "2025-01",
      "access-token": session.accessToken,
    },
  });
  if (!response.ok) {
    throw new Response("Failed to load customers", { status: response.status });
  }
  const customers = await response.json();
  
    return {
        orders: variantResponseJson,
        accessToken: session.accessToken,
        customers: customers,
        storeName: session.shop,
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


export default function Index() {
    const tabs = [
        {
            id: 'Estimates',
            content: 'Estimates/Quatations',
            accessibilityLabel: 'Estimates',
            panelId: "Estimates",
        },
        {
            id: 'payees',
            content: "Payees",
            panelId: 'payees',
        },
        {
            id: 'expenses',
            content: "Expenses",
            panelId: "expenses",
        },
        {
            id:'Bills',
            content: "Bills",
            panelId: 'Bills',
        },

    ];
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [], 
    );
    const data = useLoaderData();
    const estimates = data.orders.data.orders.edges;
    const shopify = useAppBridge();

    return (
            <div style={{ backgroundColor: "#ffffff", padding: '30px' }}>
                <div style={{ display: "flex" , gap: '30px', textAlign:'center', padding:'5px '}}>
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            style={{
                                position: 'relative',
                                padding: '10px 10px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '500px',
                            }}
                            onClick={() => handleTabChange(index)}
                        >
                            <Text as="p" fontWeight="bold">{tab.content}</Text>
                            {selected === index && (
                                <div style={{
                                    gap: '10px',
                                    position: 'absolute',
                                    bottom: -2,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    backgroundColor: '#74A535',
                                    borderTopLeftRadius: '12px',
                                    borderTopRightRadius: '10px',
                                }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <Divider />
                {selected === 0 && <Estimates />}
                {selected === 1 && <Payees/>}
                {selected === 2 && <Expenses />}
                {selected === 3 && <Bills />}
               
            </div>
        );
    }