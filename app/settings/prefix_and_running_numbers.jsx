import {
    Text,
    Card,
    Divider,
    TextField,
    EmptyState,
    IndexTable,
    Badge,
    useIndexResourceState,
    Link,
    Page,
} from "@shopify/polaris";
import Switch from "react-switch";
import { useCallback, useState } from "react";
import ic_info from '../assets/images/ic_info.png'
import iv_resync from '../assets/images/iv_resync.png'

export function PrefixAndRunningNumbers() {

    const [invoicePrefixValue, setInvoicePrefixValue] = useState('');
    const handleInvoicePrefixChange = useCallback(
        (newValue) => setInvoicePrefixValue(newValue),
        [],
    );

    const [invoiceNumberValue, setInvoiceNumberValue] = useState('');
    const handleInvoiceNumberChange = useCallback(
        (newValue) => setInvoiceNumberValue(newValue),
        [],
    );
    
    const [creditNotePrefixValue, setCreditNotePrefixValue] = useState('');
    const handleCreditNotePrefixChange = useCallback(
        (newValue) => setCreditNotePrefixValue(newValue),
        [],
    );
    
    const [creditNoteNumberValue, setCreditNoteNumberValue] = useState('');
    const handleCreditNoteNumberChange = useCallback(
        (newValue) => setCreditNoteNumberValue(newValue),
        [],
    );
    
    const [estimatePrefixValue, setEstimatePrefixValue] = useState('');
    const handleEstimatePrefixChange = useCallback(
        (newValue) => setEstimatePrefixValue(newValue),
        [],
    );
    
    const [estimateNumberValue, setEstimateNumberValue] = useState('');
    const handleEstimateNumberChange = useCallback(
        (newValue) => setEstimateNumberValue(newValue),
        [],
    );
    
    const [offlinePrefixValue, setOfflinePrefixValue] = useState('');
    const handleOfflinePrefixChange = useCallback(
        (newValue) => setOfflinePrefixValue(newValue),
        [],
    );
    
    const [offlineNumberValue, setOfflineNumberValue] = useState('');
    const handleOfflineNumberChange = useCallback(
        (newValue) => setOfflineNumberValue(newValue),
        [],
    );
    
    const [billPrefixValue, setBillPrefixValue] = useState('');
    const handleBillPrefixChange = useCallback(
        (newValue) => setBillPrefixValue(newValue),
        [],
    );
    
    const [billNumberValue, setBillNumberValue] = useState('');
    const handleBillNumberChange = useCallback(
        (newValue) => setBillNumberValue(newValue),
        [],
    );

    return (
        <Page>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="headingXl" as="h4">Prefix & Running Numbers</Text>
                <div
                    style={{
                        backgroundColor: '#74A535',
                        padding: '10px 20px',
                        fontSize: '15px',
                        color: 'white',
                        borderRadius: '10px'
                    }}>Save</div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Invoice Number</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%', marginRight: '20px' }}>
                            <TextField
                                label="Invoice Prefix"
                                value={invoicePrefixValue}
                                onChange={handleInvoicePrefixChange}
                                autoComplete="off"
                            />
                        </div>
                        <div style={{ width: '100%', marginLeft: '20px' }}>
                            <TextField
                                label="Invoice Number"
                                value={invoiceNumberValue}
                                type="number"
                                onChange={handleInvoiceNumberChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div style={{ alignItems: 'center', marginTop: '20px', borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                        <div style={{ marginTop: '5px', marginRight: '20px' }}>
                            <img src={ic_info} style={{ width: '20px', height: '20px', }} />
                        </div>
                        <Text variant="bodyLg" as="p">To setup location wise invoice series Click her</Text>
                    </div>
                </Card>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Credit Note</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%', marginRight: '20px' }}>
                            <TextField
                                label="Credit Note Prefix"
                                value={creditNotePrefixValue}
                                onChange={handleCreditNotePrefixChange}
                                autoComplete="off"
                            />
                        </div>
                        <div style={{ width: '100%', marginLeft: '20px' }}>
                            <TextField
                                label="Credit Note Number"
                                value={creditNoteNumberValue}
                                type="number"
                                onChange={handleCreditNoteNumberChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Estimate</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%', marginRight: '20px' }}>
                            <TextField
                                label="Estimate Prefix"
                                value={estimatePrefixValue}
                                onChange={handleEstimatePrefixChange}
                                autoComplete="off"
                            />
                        </div>
                        <div style={{ width: '100%', marginLeft: '20px' }}>
                            <TextField
                                label="Estimate Number"
                                value={estimateNumberValue}
                                type="number"
                                onChange={handleEstimateNumberChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Offline Invoice</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%', marginRight: '20px' }}>
                            <TextField
                                label="Offline Prefix"
                                value={offlinePrefixValue}
                                onChange={handleOfflinePrefixChange}
                                autoComplete="off"
                            />
                        </div>
                        <div style={{ width: '100%', marginLeft: '20px' }}>
                            <TextField
                                label="Estimate Number"
                                value={offlineNumberValue}
                                type="number"
                                onChange={handleOfflineNumberChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Bill</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%', marginRight: '20px' }}>
                            <TextField
                                label="Bill Prefix"
                                value={billPrefixValue}
                                onChange={handleBillPrefixChange}
                                autoComplete="off"
                            />
                        </div>
                        <div style={{ width: '100%', marginLeft: '20px' }}>
                            <TextField
                                label="Bill Number"
                                value={billNumberValue}
                                type="number"
                                onChange={handleBillNumberChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
