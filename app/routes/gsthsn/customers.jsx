import { Card, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import "./product.css";
import ic_info from '../../assets/images/ic_info.png'

export function Customers() {
    return (
        <div style={{minHeight:"100vh"}}>


            <div className="marginDiv">
                <div className="product-box">
                    <div className="main">
                        <Text variant="headingLg">Upload CSV For Customers Data</Text>
                    </div>

                    <div className="divider"></div>
                    <div className="displayFlex">
                        <div className="product-search-div">
                            <input
                                className="text-field"
                                type="text"
                                placeholder="No file Chosen"
                            />
                            <div className="button">
                                Submit CSV
                            </div>
                        </div>



                    </div>

                    <div style={{ alignItems: 'center', marginTop: '20px', borderRadius: '10px', padding: '10px', display: 'flex', backgroundColor: '#E2E2E2' }}>
                        <div style={{ marginTop: '5px', marginRight: '20px' }}>
                            <img src={ic_info} style={{ width: '20px', height: '20px', }} />
                        </div>
                        <Text variant="bodyLg" as="p">Note: Upload Customers CSV File Only.Download Sample CSV file</Text>
                    </div>


                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div className="text-bold-heading-small">
                    Customers
                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div className="product-box">

                    <div className="displayFlex">
                        <div className="product-search-div">
                            <input
                                className="text-field"
                                type="text"
                                placeholder="First name,Last name,Email"
                            />
                            <div className="button">
                                Search
                            </div>
                            <div className="border-button">
                                Clear
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="product-list-title-div">
                        <div className="product-list-div-title">First Name</div>
                        <div className="product-list-div-title">Last Name</div>
                        <div className="product-list-div-title">Email</div>
                        <div className="product-list-div-title">Company Name</div>
                        <div className="product-list-div-title">GST Number</div>
                    </div>

                    <div className="product-list-div">
                        <div className="product-list-div-title">
                            Paras
                        </div>
                        <div className="product-list-div-title">
                            Virani
                        </div>
                        <div className="product-list-div-title">
                            parasvirani96@gmail.com
                        </div>
                        <div className="product-list-div-title">
                            <input
                                className="text-field"
                                type="text"
                            />
                        </div>
                        <div className="product-list-div-title">
                            <input
                                className="text-field"
                                type="text"
                            /></div>

                    </div>

                    <div className="product-bottom-view">
                        <div className="button">
                            Update
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}