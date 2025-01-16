import { Card, Text, TextField } from "@shopify/polaris";
import ic_refresh from '../../assets/images/ic_refresh.png';
import "./product.css";

export function MissingGstHsn() {
    return(
        <div>
<div className="main">
                <Text variant="headingLg">Product</Text>
                <img src={ic_refresh} className="images" />
            </div>
            <div className="marginDiv">
                <div className="product-box">

                    <div className="text-bold-heading-small">
                    Missing GST/HSN For Products
                    </div>
                    <div style={{marginTop:'20px'}}></div>
                    <div className="checkbox-div">
                        <input id="myCheckbox" type="checkbox" className="checkbox" />
                        <label htmlFor="myCheckbox" className="checkbox-label">My Products GST rate is dependent on the sale value of the product. Ex. Cloths,Curtains, Bedsheets etc</label>
                    </div>
                    <div style={{marginTop:'20px'}}></div>
                    <div className="checkbox-div">
                        <input id="myCheckbox2" type="checkbox" className="checkbox" />
                        <label htmlFor="myCheckbox2" className="checkbox-label">Set GST Compensation CESS % on Products</label>
                    </div>

                    <div className="product-list-title-div">
                        <div className="product-list-div-title-extra-space">Product</div>
                        <div className="product-list-div-title">Mini Amount</div>
                        <div className="product-list-div-title">Mini GST(%)</div>
                        <div className="product-list-div-title">GST (%)</div>
                        <div className="product-list-div-title">HSN Code</div>
                        <div className="product-list-div-title">CESS(%)</div>
                    </div>

                    <div className="product-list-div">
                        <div className="product-list-div-title-extra-space">
                            <div className="checkbox-div">
                                <input id="myCheckbox2" type="checkbox" className="checkbox" />
                                <label htmlFor="myCheckbox2" className="checkbox-label">Set GST Compensation CESS % on Products</label>
                            </div>
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