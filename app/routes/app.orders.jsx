import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { Text, Divider } from "@shopify/polaris";
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

  const productResponseJson = await productResponse.json();
  return {
    orders: variantResponseJson,
    products: productResponseJson,
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

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  // const data = useLoaderData();
  // const orderList = data.orders.data.orders.edges;
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
      {selected === 1 && <OfflineOrders />}
      {selected === 2 && <CreditNotes />}
      {selected === 3 && <GenerateEInvoice />}
      {selected === 4 && <ECreditNotes />}
    </div>
  );
}