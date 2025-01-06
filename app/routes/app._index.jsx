import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  Bleed,
  LegacyCard,
  LegacyStack,
  Icon,
  Divider,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import myImage from '../assets/images/hello.png';
import ic_support_document from '../assets/images/ic_support_document.png';
import ic_faqs from '../assets/images/ic_faqs.png';
import ic_get_started from '../assets/images/ic_get_started.png';

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <div style={{ backgroundColor: '#ffffff', height: '100%' }}>
      <Page>
        <BlockStack gap="500">
          <BlockStack gap="200">
            <InlineStack wrap={false} gap="500">
              <img src={myImage} width='24px' height='24px' />
              <Text variant="headingLg" as="h5">Hello Paras!</Text>
            </InlineStack>
            <Text variant="headingLg" as="h5">Welcome to Virtue,</Text>
          </BlockStack>

          <Layout>
            <Layout.Section>
              <Card padding={400}>
                <BlockStack gap="600">
                  <Text as="p" fontWeight="bold">
                    Virtue app, Generate GST-ready invoices.
                  </Text>
                  <Text as="p" fontWeight="semibold">
                    No need to import your order data into third-party software. The app Fetches order data and generates GST-ready invoices automatically.
                  </Text>
                </BlockStack>


              </Card>
            </Layout.Section>
            <Layout.Section variant="oneThird">

              <BlockStack gap="200">
                <Card>
                  <InlineStack wrap={false} gap="500">
                    <img src={ic_support_document} height='24px' />
                    <Text as="p" fontWeight="bold">
                      Support Documents
                    </Text>
                  </InlineStack>
                </Card>
                <Card>
                  <InlineStack wrap={false} gap="500">
                    <img src={ic_faqs} height='24px' />
                    <Text as="p" fontWeight="bold">
                      FAQS
                    </Text>
                  </InlineStack>
                </Card>
              </BlockStack>
            </Layout.Section>
          </Layout>
          <Card>
            <BlockStack gap="500" >
              <Text as="p" fontWeight="bold">Go To Dashboard</Text>
              <Divider />
              <div style={{ padding: '40px' }}>
                <InlineStack align="center">
                  <BlockStack align="center" gap={300}>
                    <Text as="p" tone="subdued">For your GST-ready invoices click here to get started.</Text>
                    <Bleed align="center">
                      <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#74A535', // Custom background
                            color: '#ffffff', // Text color
                            padding: '10px 20px',
                            borderRadius: '4px', // Rounded corners
                            cursor: 'pointer',
                          }}
                          onClick={() => alert('Button clicked!')} // Add your button logic here
                        >
                          Get Started
                          <img
                            src={ic_get_started}
                            alt="Custom Icon"
                            style={{ width: '16px', height: '16px', marginLeft: '8px' }}
                          />
                        </div>
                      </div>
                    </Bleed>
                  </BlockStack>
                </InlineStack>
              </div>
            </BlockStack>

          </Card>
        </BlockStack>
      </Page>
    </div>
  );
}
