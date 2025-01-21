import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import dashboard_ph from "../assets/images/dashboard_ph.png"
import { useCallback, useState } from "react";
import { Product } from "./gsthsn/products";
import { Collection } from "./gsthsn/collection";
import { Customers } from "./gsthsn/customers";
import { ProductImportExport } from "./gsthsn/product_import_export";
import { CollectionImportExport } from "./gsthsn/collection_import_export";
import { MissingGstHsn } from "./gsthsn/missing_gst_hsn";

export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const variantResponse = await admin.graphql(
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
    const variantResponseJson = await variantResponse.json();
    return {
        products: variantResponseJson,
    };
};

export const action = async ({ request }) => {

    return null;
};

export default function GSTHSN() {
    const tabs = [
        {
            id: 'products',
            content: 'Products',
            accessibilityLabel: 'Products',
            panelID: 'products',
        },
        {
            id: 'collection',
            content: 'Collection',
            panelID: 'collection',
        },
        {
            id: 'customers',
            content: 'Customers',
            panelID: 'customers',
        },
        {
            id: 'product-import-export',
            content: 'Product Import/Export',
            panelID: 'product-import-export',
        },
        {
            id: 'collection-import-export',
            content: 'Collection Import/Export',
            panelID: 'collection-import-export',
        },
        {
            id: 'missing-gst-hsn',
            content: 'Missing GST/HSN',
            panelID: 'missing-gst-hsn',
        },
    ];

    const [selected, setSelected] = useState(0);


    // console.log('Variant updated successfully:', data);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

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
            {selected === 0 && <Product />}
            {selected === 1 && <Collection />}
            {selected === 2 && <Customers />}
            {selected === 3 && <ProductImportExport />}
            {selected === 4 && <CollectionImportExport />}
            {selected === 5 && <MissingGstHsn />}
        </div>
    );
}