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
import {Expenses} from "./estimates/expenses";
import {Bills} from "./estimates/bills";


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
    return {
        orders: variantResponseJson,
    };
};

export const action = async ({request}) => {
    const {admin } =  await authenticate.admin(request);

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
            id:'bills',
            content: "Bills",
            panelId: 'bills',
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