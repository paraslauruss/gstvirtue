import { Page, Text, Card, Divider } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import dashboard_ph from "../assets/images/dashboard_ph.png";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const currentMonthStart = new Date(new Date().setDate(1)).toISOString(); // Start of the current month
  const currentMonthEnd = new Date(new Date().setMonth(new Date().getMonth() + 1, 0)).toISOString(); // End of the current month

  const variantResponse = await admin.graphql(
    `#graphql
    query {
  ordersCount(limit: 2000) {
    count
    precision
    }
    productsCount(limit: 2000) {
      count
      precision
    }
    customersCount {
      count
    }
   currentMonthOrders: orders(first: 10, query: "created_at:>=${currentMonthStart} created_at:<=${currentMonthEnd}") {
      edges {
        node {
          id
          name
          createdAt
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }`,
  {
    currentMonthStart,
    currentMonthEnd,
  }
);

  const variantResponseJson = await variantResponse.json();
  return {
    orders: variantResponseJson,
    products: variantResponseJson.data.productsCount,
    customersCount: variantResponseJson.data.customersCount,
    currentMonthOrders: variantResponseJson.data.currentMonthOrders.edges,
    currentMonthOrdersCount: variantResponseJson.data.currentMonthOrders.edges.length, 
  };
};

export const action = async ({ request }) => {
  return null;
};




export default function Dashboard() {
  const data = useLoaderData();
  const orders = data?.orders?.ordersCount || 0;

  const ProgressBar = ({ progress }) => {
    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "#E2EBD6",
          borderRadius: "20px",
          margin: "20px 0",
        }}
      >
       
        <div
          style={{
            width: `${progress}%`,
            height: "20px",
            backgroundColor: "#74A535",
            borderRadius: "20px",
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>
    );
  };

  const steps = [
    "Setup Product GST/HSN",
    "Customize Invoice Template",
    "Fill up Company Details and Legal Informantion ",
  ];
  const Stepper = ({ activeStep }) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
      >
        {steps.map((step, index) => (
          <div>
            <div key={index} style={{ display: "flex", alignItems: "top" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "15px",
                  marginRight: "10px",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor:
                      index <= activeStep ? "#74A535" : "#9B9B9B",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "top",
                    alignItems: "top",
                  }}
                ></div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      height: "20px",
                      backgroundColor:
                        index < activeStep ? "#74A535" : "#9B9B9B",
                    }}
                  ></div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: "normal",
                    color: "#9B9B9B",
                    fontSize: "14px",
                    height: "20px",
                    alignItems: "top",
                  }}
                >
                  {step}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <Page>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text variant="headingXl">Dashboard</Text>
          <div
            style={{
              color: "white",
              backgroundColor: "#74A535",
              alignContent: "center",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            <Text variant="headingMd">Change Plan</Text>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Let’s get started</Text>

              <Stepper activeStep={0} />
            </Card>
          </div>
          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Monthly Order Placed</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">5 out of 100</Text>
              </div>
              <ProgressBar progress={50} />
            </Card>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">All Orders</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">{data.orders.data.ordersCount.count} Orders </Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">{data.orders.data.ordersCount.count}</Text>
              </div>
            </Card>
          </div>

          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Products</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">{data.orders.data.productsCount.count}</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">{data.orders.data.productsCount.count}</Text>
              </div>
            </Card>
          </div>

          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Customers</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">{data.orders.data.customersCount.count}</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">{data.orders.data.customersCount.count}</Text>
              </div>
            </Card>
          </div>

          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Current Month Orders</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">{data.currentMonthOrdersCount}</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">{data.currentMonthOrdersCount}</Text>
              </div>
            </Card>
          </div>
        </div>

        <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Offline Orders</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">2 Offline Orders</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">4</Text>
              </div>
            </Card>
          </div>

          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Estimates</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">20 Estimates</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">20</Text>
              </div>
            </Card>
          </div>

          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Expense</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">1 Expense</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">1</Text>
              </div>
            </Card>
          </div>

          <div style={{ width: "100%" }}>
            <Card>
              <Text variant="headingMd">Bills</Text>
              <div style={{ color: "#919090" }}>
                <Text variant="headingMd">5 Bills</Text>
              </div>
              <div style={{ color: "#74A535", marginTop: "10px" }}>
                <Text variant="heading2xl">5</Text>
              </div>
            </Card>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Card>
            <Text variant="headingMd">Would you like to know more?</Text>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Divider />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={dashboard_ph} width="300px" />
              <Text variant="headingMd" fontWeight="bold">
                Do you have a question? Visit our help center to learn more.
              </Text>
              <Text variant="headingMd" fontWeight="regular">
                With our help center, you can learn everything you need to know
                about our app.
              </Text>
            </div>
          </Card>
        </div>
      </Page>
    </div>
  );
}
