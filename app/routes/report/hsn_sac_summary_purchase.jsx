
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";

export default function HSNSACSummaryPurchase({ onClick }) {
    return (
        <div style={{ padding: '50px 100px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ cursor: 'pointer' }} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <Text variant="headingLg">HSN/SAC Summary (Purchase)</Text>
            </div>
            <div style={{ marginTop: '20px' }} />
            <Card>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <select style={{ border: '1px solid #000000', borderRadius: '5px', padding: '10px', width: '200px', appearance: 'none', }}>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                    <span
                        style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            fontSize: '12px',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                            <path d="M10.0588 0.99954L5.52941 5.11719L1 0.99954" stroke="#858585" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>
            </Card>

        </div>
    );
}