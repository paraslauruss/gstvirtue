import { Card, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import "./product.css";

export function Collection() {
    return (
        <div style={{minHeight:"100vh"}}>
            <div className="main">
                <Text variant="headingLg">Collections</Text>
                <img src={ic_refresh} className="images" />
            </div>

            <div className="marginDiv">
                <div className="product-box">
                    <div className="displayFlex">
                        <div className="product-search-div">
                            <input
                                className="drop-down-text-field"
                                type="text"
                                placeholder="Custom Collections"
                            />

                            <input
                                className="text-field"
                                type="text"
                                placeholder="Full Title"
                            />
                        </div>

                        <div className="product-search-div">
                            <div className="button">
                                Get Collections
                            </div>
                            <div className="border-button">
                                Clear
                            </div>
                        </div>

                    </div>

                    <div className="divider"></div>

                    <div className="text-bold-heading-small">
                        GST/HSN For Collections
                    </div>
                    <div style={{ marginTop: '20px' }}></div>
                    <div className="checkbox-div">
                        <input id="myCheckbox" type="checkbox" className="checkbox" />
                        <label htmlFor="myCheckbox" className="checkbox-label">My Products GST rate is dependent on the sale value of the product. Ex. Cloths,Curtains, Bedsheets etc</label>
                    </div>
                    <div style={{ marginTop: '20px' }}></div>
                    <div className="checkbox-div">
                        <input id="myCheckbox2" type="checkbox" className="checkbox" />
                        <label htmlFor="myCheckbox2" className="checkbox-label">Set GST Compensation CESS % on Products</label>
                    </div>

                    <div className="product-list-title-div">
                        <div className="product-list-div-title-extra-space">Title</div>
                        <div className="product-list-div-title">Mini Amount</div>
                        <div className="product-list-div-title">Mini GST(%)</div>
                        <div className="product-list-div-title">GST (%)</div>
                        <div className="product-list-div-title">HSN Code</div>
                        <div className="product-list-div-title">CESS(%)</div>
                        <div className="product-list-div-title">Actions</div>
                    </div>

                    <div className="product-list-div">
                        <div className="product-list-div-title-extra-space">
                            T-shirt
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
                            />
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
                        <div className="product-list-div-title">
                            <input
                                className="text-field"
                                type="text"
                            />
                        </div>
                        <div className="product-list-div-title">
                        <img src={ic_refresh} style={{ height: '16px', marginLeft: '15px' }} />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div className="product-box">
                    

                    <div className="text-bold-heading-small">
                    Product List for "Glow Up Essentials" Collection
                    </div>
                    

                    <div className="product-list-title-div-collection">
                        <div className="product-list-div-title-extra-space">Title</div>
                        <div className="product-list-div-title">Mini Amount</div>
                        <div className="product-list-div-title">Mini GST(%)</div>
                        <div className="product-list-div-title">GST (%)</div>
                        <div className="product-list-div-title">HSN Code</div>
                        <div className="product-list-div-title">CESS(%)</div>
                        <div className="product-list-div-title">Actions</div>
                    </div>

                    <div className="product-list-div">
                        <div className="product-list-div-title-extra-space">
                            T-shirt
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
                            />
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
                            />
                        </div>
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