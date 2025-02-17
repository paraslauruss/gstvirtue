import {
    Divider,
    FooterHelp,
    Page,
    Tabs,
    Text
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useCallback, useState } from "react";
import { StoreInformation } from "../settings/store_information";
import { Locations } from "../settings/locations";
import { PrefixAndRunningNumbers } from "../settings/prefix_and_running_numbers";
import { GSTSettings } from "../settings/gst_settings";
import { EmailSettings } from "../settings/email_settings";
import { Integrations } from "../settings/integrations";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        successMessage: "Success",
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export const action = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        successMessage: "Success"
    };
};

export default function Index() {
    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex), [],
    )

    const tabs = [
        {
            id: 'store-information',
            content: 'Store Information',
            accessibilityLabel: 'Store Information',
            panelID: 'store-information'
        },
        {
            id: 'locations',
            content: 'Locations',
            panelID: 'locations'
        },
        {
            id: 'prefix-and-running-numbers',
            content: 'Prefix & Running Numbers',
            panelID: 'prefix-and-running-numbers'
        },
        {
            id: 'gst-settings',
            content: 'GST Settings',
            panelID: 'gst-settings'
        },
        {
            id: 'email-settings',
            content: 'Email Settings',
            panelID: 'email-settings'
        },
        {
            id: 'integrations',
            content: 'Integrations',
            panelID: 'integrations'
        }
    ];

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
            {selected === 0 && <StoreInformation />}
            {selected === 1 && <Locations />}
            {selected === 2 && <PrefixAndRunningNumbers />}
            {selected === 3 && <GSTSettings />}
            {selected === 4 && <EmailSettings />}
            {selected === 5 && <Integrations />}
        </div>



    );
}