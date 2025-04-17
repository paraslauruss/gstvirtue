import { Card, Divider, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
import icEmpty from '../../assets/images/ic_empty.png'
import B2BSales from "./b2b_sales";
import B2CSales from "./b2c_sales";
import HSNSACSummary from "./hsn_sac_summary";
import DocumentSummary from "./document_summary";


export default function GSTR1({ onClick, position }) {

    const tabs = [
        {
            id: 'b2c',
            content: 'B2C',
            accessibilityLabel: 'B2C',
            panelID: 'b2c',
        },
        {
            id: 'b2b',
            content: 'B2B',
            panelID: 'b2b',
        },
        {
            id: 'hsn-sac-summary',
            content: 'HSN/SAC Summary',
            panelID: 'hsn-sac-summary',
        },
        {
            id: 'documents-summary',
            content: 'Documents Summary',
            panelID: 'documents-summary',
        }
    ];

    const [selected, setSelected] = useState(position);


    // console.log('Variant updated successfully:', data);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    return (
        <div style={{ padding: '50px 100px', backgroundColor: '#ffffff' }}>



            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ cursor: 'pointer' }} onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                            <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <Text variant="headingLg">GSTR-1</Text>

                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
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
                    <div style={{ marginTop: '20px' }} />
                    {selected == 0 && <B2CSales />}
                    {selected == 1 && <B2BSales />}
                    {selected == 2 && <HSNSACSummary />}
                    {selected == 3 && <DocumentSummary />}
                </Card>
            </div>


        </div>
    );
}