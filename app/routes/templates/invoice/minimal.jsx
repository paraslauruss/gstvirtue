
export const Minimal = ({logo}) => {
    return (
        <div className="card"  style={{ position: "relative", display: "flex", flexDirection: "column", minWidth: "0", wordWrap: "break-word", backgroundColor: "#fff",backgroundClip: "border-box", }}>
        <table
          width="100%"
          border="0"
          cellSpacing="0"
          cellPadding="0"
          align="center"
          style={{ margin: "20px auto" }}>
          <tbody>
            <tr>
              <td>
                {/* logo and tax details */}
                <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td>
                        <table
                          width="100%"
                          border="0"
                          cellSpacing="0"
                          cellPadding="0"
                          style={{ padding: "10px", borderBottom: "solid 1px #ddd" }} >
                          <tbody>
                            <tr style={{ padding: "5px" }}>
                              <td width="50%" style={{ fontSize: "18px" }}>
                                <div
                                  className="crop-element-wrap crop-element-section crop-element-left"
                                  style={{ width: "250px" }}
                                  onClick={() => {
                                    // Handle image cropping modal
                                    console.log("Open modal to change logo");
                                  }}
                                >
                                  <img
                                    src="https://gst.webplanex.biz/images/logo_1739353164.jpg"
                                    alt="Company Logo"
                                    style={{ maxWidth: "250px", maxHeight: "125px" }}
                                  />
                                  <div className="crop-overlay overlay-right-logo justify-content-center">
                                    <div className="crop-overlay-text">
                                      Click to change company logo
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td width="50%" style={{ textAlign: "right", verticalAlign: "top" }}>
                                <div style={{ display: "inline-block", textAlign: "right" }}>
                                    <strong
                                    id="template_invoice_title"
                                    style={{ fontSize: "20px", display: "block", marginBottom: "5px" }}
                                    >
                                    Tax Invoice
                                    </strong>
                                    <table style={{ textAlign: "right" }}>
                                    <tbody>
                                        <tr id="store_pan_no_on_off_tr">
                                        <td>
                                            <strong id="template_store_pan_no">PAN NO.:</strong> ABCDE1234F
                                        </td>
                                        </tr>
                                        <tr id="store_gstin_on_off_tr">
                                        <td>
                                            <strong id="template_store_gstin">GSTIN:</strong> 22ABCDE1234F1Z9
                                        </td>
                                        </tr>
                                        <tr id="store_iec_code_on_off_tr">
                                        <td>
                                            <strong id="template_store_iec_code">IEC CODE:</strong> 1234567890
                                        </td>
                                        </tr>
                                        <tr id="store_cin_on_off_tr">
                                        <td>
                                            <strong id="template_store_cin">CIN:</strong> U12345MH2020PLC678901
                                        </td>
                                        </tr>
                                        <tr id="store_fssai_lic_no_on_off_tr">
                                        <td>
                                            <strong id="template_store_fssai_lic_no">FSSAI LIC NO.:</strong> 10012021000000
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <img
                                            id="storeEmailIcon"
                                            src="https://gst.webplanex.biz/images/mail-icon.png"
                                            alt="Email"
                                            width="16px"
                                            height="16px"
                                            />
                                            <span id="template_store_email"> parasvirani9@gmail.com</span>
                                            <br />
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <img
                                            src="https://gst.webplanex.biz/images/phone-icon.png"
                                            alt="Phone"
                                            width="16px"
                                            height="16px"
                                            />
                                            &nbsp;
                                            <span id="template_contact_person"></span>
                                            <span id="template_shop_phone">+919664938949</span>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        {/* address details */}
        <table width="100%" border="0" cellSpacing="0" cellPadding="0" style={{ margin: "20px 0" }}>
            <tbody>
                <tr>
                <th className="label_shipping_on_off" align="left" valign="top">
                    <strong id="template_shipping_head_title">Shipping Address :</strong>
                </th>
                <th align="left">
                    <strong id="template_billing_head_title">Billing Address :</strong>
                </th>
                </tr>
                <tr>
                <td className="label_shipping_on_off">John Doe</td>
                <td>John Doe</td>
                </tr>
                <tr>
                <td className="label_shipping_on_off">
                    505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev <br />
                    Ahmedabad-500037<br />
                    Gujarat<br />
                </td>
                <td>
                    505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev <br />
                    Ahmedabad-500037<br />
                    Gujarat<br />
                </td>
                </tr>

                <tr className="bill_ship_phone_no_on_off_tr">
                <td className="label_shipping_on_off">9876543210</td>
                <td>9876543210</td>
                </tr>

                <tr className="label_customer_email_on_off_tr" style={{ display: "none" }}>
                <td className="label_shipping_on_off">customer-email@gmail.com</td>
                <td>customer-email@gmail.com</td>
                </tr>

                <tr className="bill_ship_gstin_on_off_tr">
                <td className="label_shipping_on_off">GSTIN124664355478</td>
                <td>GSTIN124664355478</td>
                </tr>
            </tbody>
            </table>
      </div>
    );
}
