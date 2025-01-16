

import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import icEmpty from '../../assets/images/ic_empty.png'

export default function HSNSACSummary({onClick}) {
    return (
        <div>
            <div style={{ display: 'flex', gap: '20px' }}>
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
                <div style={{ backgroundColor: '#74A535', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" fill="white" />
                    </svg>
                </div>
            </div>

            <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50px', marginBottom:'50px' }}>
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
        </div>
    );
}