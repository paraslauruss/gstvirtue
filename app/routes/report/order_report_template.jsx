
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import icEmpty from '../../assets/images/ic_empty.png'
import { useState } from "react";
import CreateReportTemplate from "./create_report_template";

export default function OrderReportTemplate({ onClick }) {

    const [isCreateTemplate, setCreateTemplate] = useState(false);

    return (
        isCreateTemplate ? <CreateReportTemplate onClick={() => setCreateTemplate(false)} /> : <div style={{ padding: '50px 100px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ cursor: 'pointer' }} onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                            <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <Text variant="headingLg">Order Report Template</Text>
                </div>

                <div
                    style={{ cursor: 'pointer', color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px 20px', display: 'flex', flexDirection: 'row', gap: '10px', borderRadius: '5px' }}
                    onClick={() => setCreateTemplate(true)}>
                    <Text>Create Report Template</Text>
                </div>
            </div>
            <div style={{ marginTop: '20px' }} />
            <Card>
                <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <img src={icEmpty} width={200} />
                    </div>
                    <div style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Text variant="headingLg">No Data Found</Text>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Text variant="headingMd">You can find orders by changing your search or filtering options</Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}