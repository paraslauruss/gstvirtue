
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";

export default function SupplySummary({onClick}) {
    return (
        <div style={{ padding: '50px 100px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{cursor:'pointer'}} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <Text variant="headingLg">Supply Summary</Text>
            </div>

        </div>
    );
}