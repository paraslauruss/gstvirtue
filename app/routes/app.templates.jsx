import { useLoaderData } from "@remix-run/react";
import {
  Text,
  Divider,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { Invoice } from "./templates/Invoice";
import { OnlineEmail } from "./templates/OnlineEmail";
import { OfflineEmail } from "./templates/OfflineEmail";
import { Smtp } from "./templates/Smtp";
import { EstimatesEmail } from "./templates/EstimatesEmail";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  return {
    successMessage: "Success",
    accessToken: session.accessToken,
    storeName: session.shop
  };
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  return {
    successMessage: "Success",
  };
};

export default function Index() {
  const tabs = [
    {
      id: 'Invoice',
      content: 'Invoice',
      accessibilityLabel: 'Invoice',
      panelId: "Invoice",
    },
    {
      id: 'OnlineEmail',
      content: "Online Orders Email",
      panelId: 'Online Orders Email',
    },
    {
      id: 'OfflineEmail',
      content: "Offline Orders Email",
      panelId: "Offline Orderss Email",
    },
    {
      id: 'EstimatesEmail',
      content: "Estimates Email",
      panelId: 'Estimates Email',
    },
    {
      id: 'Smtp',
      content: 'SMTP',
      panelId: 'SMTP configurations'
    },

  ];
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  // const data = useLoaderData();
  // const estimates = data.orders.data.orders.edges;
  const shopify = useAppBridge();

  return (
    <div style={{ backgroundColor: "#ffffff", padding: '30px' }}>
      <div style={{ display: "flex", gap: '25px', textAlign: 'center', padding: '5px ' }}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            style={{
              position: 'relative',
              padding: '8px 8px',
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
      {selected === 0 && <Invoice />}
      {selected === 1 && <OnlineEmail />}
      {selected === 2 && <OfflineEmail />}
      {selected === 3 && <EstimatesEmail />}
      {selected === 4 && <Smtp />}
    </div>
  );
}