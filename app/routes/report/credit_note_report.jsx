
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import icEmpty from '../../assets/images/ic_empty.png'

export default function CreditNoteReport({onClick}) {
    return (
        <div style={{ padding: '50px 100px', backgroundColor: "#ffffff" }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{cursor:'pointer'}} onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                        <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <Text variant="headingLg">Credit Note Report</Text>
            </div>
            <div style={{ marginTop: '20px' }} />
            <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
                    <div
                        style={{ padding: '10px', display: 'flex', width: '200px', flexDirection: 'row', gap: '10px', border: '1px solid #000', borderRadius: '5px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path d="M16.5 6.5H1.5V5C1.5 4.60218 1.65804 4.22064 1.93934 3.93934C2.22064 3.65804 2.60218 3.5 3 3.5H15C15.3978 3.5 15.7794 3.65804 16.0607 3.93934C16.342 4.22064 16.5 4.60218 16.5 5V6.5Z" fill="#74A535" stroke="#74A535" />
                            <path d="M13 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V7H1V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H5M13 3V1M13 3H5M5 3V1M1 7.5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V7.5" stroke="#74A535" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Text>Select Start Date</Text>
                    </div>

                    <div
                        style={{ padding: '10px', display: 'flex', width: '200px', flexDirection: 'row', gap: '10px', border: '1px solid #000', borderRadius: '5px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path d="M16.5 6.5H1.5V5C1.5 4.60218 1.65804 4.22064 1.93934 3.93934C2.22064 3.65804 2.60218 3.5 3 3.5H15C15.3978 3.5 15.7794 3.65804 16.0607 3.93934C16.342 4.22064 16.5 4.60218 16.5 5V6.5Z" fill="#74A535" stroke="#74A535" />
                            <path d="M13 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V7H1V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H5M13 3V1M13 3H5M5 3V1M1 7.5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V7.5" stroke="#74A535" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Text>Select End Date</Text>
                    </div>

                    <div
                        style={{ justifyContent: 'space-between', padding: '10px', display: 'flex', width: '200px', flexDirection: 'row', gap: '10px', border: '1px solid #000', borderRadius: '5px' }}>

                        <Text>Select Location</Text>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="16" viewBox="0 0 11 16" fill="none">
                            <path d="M1.00001 5.11765L5.52943 1L10.0588 5.11765" stroke="#858585" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.0588 10.8824L5.52941 15L1 10.8824" stroke="#858585" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div
                        style={{ color: 'white', backgroundColor: '#74A535', justifyContent: 'center', padding: '10px 20px', display: 'flex', flexDirection: 'row', gap: '10px', borderRadius: '5px' }}>
                        <Text>Search</Text>
                    </div>
                </div>
                <div
                    style={{ color: 'black', justifyContent: 'center', padding: '10px 20px', display: 'flex', flexDirection: 'row', gap: '10px', border: '1px solid #000', borderRadius: '5px' }}>
                    <Text>Clear</Text>
                </div>
            </div>
            <div style={{marginTop:'20px'}}>
            <Divider />
            </div>
            
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