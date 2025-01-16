import { Card, Page, Text } from "@shopify/polaris";
import ic_info from '../../assets/images/ic_info.png';

export function CollectionImportExport() {
    return (
        <div style={{minHeight:"100vh", padding:'50px 100px'}}>
            <Text variant="headingLg">Collection Import/Export</Text>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ width: '100%' }}>
                    <Card padding={0}>
                        <div style={{ color: 'white', background: '#565656', padding: '10px 20px' }}>
                            <Text variant="headingLg">Steps for Importing Collection Data with HSN & GST %</Text>
                        </div>

                        <div style={{ padding: '10px 20px' }}>
                            <div>
                                <p><b>1. Export the CSV File:</b> Start by exporting the CSV file. Make sure to set the HSN and GST % for the products you need.</p>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <p><b>2. Fill and Validate:</b> After filling out the exported file, review the validation rules required then import the CSV file.</p>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <p><b>3. Error Handling:</b> If there are any errors, they will be displayed. Correct the errors and import the file again.</p>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <p><b>4. Successful Import:</b> If there are no errors, please wait a moment as the file is being imported. The process may take some time.</p>
                            </div>

                        </div>

                    </Card>
                </div>

                <div style={{ width: '100%' }}>
                    <Card>
                        <div >
                            <Text variant="headingLg">Collection Import</Text>
                        </div>

                        <div style={{ alignItems: 'center', borderRadius: '5px', color: 'black', background: '#E2E2E2', display: 'flex', padding: '5px 10px', marginTop: '20px' }}>
                            <img src={ic_info} height={12} style={{ marginRight: '10px' }} />
                            <span>
                                <Text variant="bodySm">Note: Upload Collections CSV File Only.</Text>
                            </span>
                            <span>
                                <Text variant="bodySm" fontWeight="bold">Download Sample CSV file</Text>
                            </span>

                        </div>

                        <div style={{ gap: '20px', display: 'flex', borderRadius: '5px', alignItems: 'center', padding: '5px 10px', marginTop: '20px', border: '1px solid #000', color: '#0000007A' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M8.49023 1.85102C8.87764 1.44643 9.33977 1.1245 9.84981 0.903919C10.3598 0.683334 10.9076 0.568481 11.4614 0.566022C12.0152 0.563563 12.5639 0.673547 13.0758 0.889593C13.5876 1.10564 14.0524 1.42345 14.4432 1.82458C14.834 2.22572 15.1429 2.7022 15.3522 3.22638C15.5614 3.75055 15.6667 4.312 15.6621 4.87814C15.6574 5.44429 15.5429 6.00386 15.325 6.5244C15.1072 7.04495 14.7904 7.5161 14.3931 7.91052L7.8738 14.5503C7.64099 14.7913 7.36382 14.9829 7.05826 15.1138C6.75271 15.2448 6.42482 15.3126 6.09351 15.3134C5.7622 15.3142 5.43402 15.2479 5.12791 15.1183C4.8218 14.9888 4.54381 14.7985 4.30998 14.5586C4.07616 14.3186 3.89111 14.0337 3.76553 13.7203C3.63994 13.4069 3.5763 13.0711 3.57828 12.7324C3.58025 12.3937 3.64781 12.0587 3.77704 11.7468C3.90627 11.4349 4.09462 11.1522 4.33123 10.9151L10.8514 4.27533L12.032 5.48706L5.51181 12.1269C5.43175 12.2056 5.36783 12.2998 5.32378 12.4041C5.27973 12.5084 5.25643 12.6206 5.25524 12.7341C5.25405 12.8477 5.275 12.9604 5.31686 13.0656C5.35872 13.1708 5.42065 13.2664 5.49904 13.3468C5.57744 13.4273 5.67072 13.491 5.77345 13.5342C5.87618 13.5774 5.9863 13.5993 6.09738 13.5985C6.20847 13.5977 6.3183 13.5743 6.42045 13.5297C6.52261 13.4851 6.61505 13.4201 6.69238 13.3386L13.2134 6.69879C13.4469 6.46096 13.6324 6.17844 13.7591 5.86735C13.8859 5.55626 13.9514 5.22269 13.9521 4.8857C13.9528 4.54871 13.8885 4.21489 13.763 3.90331C13.6374 3.59172 13.4531 3.30847 13.2205 3.06972C12.9879 2.83098 12.7116 2.64141 12.4073 2.51186C12.103 2.3823 11.7767 2.31528 11.4471 2.31463C11.1175 2.31398 10.791 2.37972 10.4862 2.50808C10.1814 2.63644 9.90435 2.82492 9.6708 3.06275L3.15066 9.7034C2.38711 10.5085 1.96336 11.5879 1.97069 12.7092C1.97802 13.8305 2.41583 14.904 3.18983 15.6984C3.96384 16.4929 5.0121 16.9447 6.10885 16.9566C7.2056 16.9685 8.26308 16.5395 9.05353 15.762L16.1672 8.51871L17.3478 9.73129L10.2349 16.9746C9.13443 18.0953 7.64357 18.7232 6.09033 18.7202C4.53709 18.7171 3.04871 18.0834 1.95261 16.9583C0.856511 15.8333 0.242482 14.3092 0.245602 12.7212C0.248723 11.1332 0.868737 9.61152 1.96925 8.49081L8.49023 1.85102Z" fill="#74A535" />
                            </svg>
                            <Text variant="bodySm">No file Chosen</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#74A535', color: '#ffffff', padding: '5px', width: '130px', borderRadius: '4px', cursor: 'pointer', }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M5.99997 10L5.29297 10.707L5.99997 11.414L6.70697 10.707L5.99997 10ZM6.99997 1C6.99997 0.734784 6.89461 0.48043 6.70708 0.292893C6.51954 0.105357 6.26518 0 5.99997 0C5.73475 0 5.4804 0.105357 5.29286 0.292893C5.10533 0.48043 4.99997 0.734784 4.99997 1H6.99997ZM0.292969 5.707L5.29297 10.707L6.70697 9.293L1.70697 4.293L0.292969 5.707ZM6.70697 10.707L11.707 5.707L10.293 4.293L5.29297 9.293L6.70697 10.707ZM6.99997 10V1H4.99997V10H6.99997Z" fill="white" />
                                </svg>
                                <div style={{ marginLeft: '10px' }}><Text>Import</Text></div>
                            </div>
                        </div>

                    </Card>

                    <div style={{ marginTop: '20px' }}>
                        <Card>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Text variant="headingLg">Collection Export</Text>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#74A535', color: '#ffffff', padding: '5px', width: '130px', borderRadius: '4px', cursor: 'pointer', }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M8.58966 1.414L7.86453 0.707L8.58966 0L9.31479 0.707L8.58966 1.414ZM9.6153 10.414C9.6153 10.6792 9.50724 10.9336 9.3149 11.1211C9.12255 11.3086 8.86168 11.414 8.58966 11.414C8.31764 11.414 8.05677 11.3086 7.86442 11.1211C7.67208 10.9336 7.56402 10.6792 7.56402 10.414H9.6153ZM2.73633 5.707L7.86453 0.707L9.31479 2.121L4.18658 7.121L2.73633 5.707ZM9.31479 0.707L14.443 5.707L12.9927 7.121L7.86453 2.121L9.31479 0.707ZM9.6153 1.414V10.414H7.56402V1.414H9.6153Z" fill="white" />
                                        <path d="M1.41016 12.4141V13.4141C1.41016 13.9445 1.62627 14.4532 2.01096 14.8283C2.39565 15.2033 2.9174 15.4141 3.46144 15.4141H13.7178C14.2619 15.4141 14.7836 15.2033 15.1683 14.8283C15.553 14.4532 15.7691 13.9445 15.7691 13.4141V12.4141" stroke="white" stroke-width="2" />
                                    </svg>
                                    <div style={{ marginLeft: '10px' }}><Text>Export</Text></div>
                                </div>
                            </div>


                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}