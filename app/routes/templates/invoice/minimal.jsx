export const Minimal = ({ logo }) => {

  const headerStyle = {
    padding: '0 5px',
    border: '2px solid black', // Solid black border
    borderStyle: 'dashed', 
    padding:'0 5px'
  };


  return (
    <div
      className="card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        backgroundColor: "#fff",
        backgroundClip: "border-box",
      }}
    >
      <table
        width="100%"
        border="0"
        cellSpacing="0"
        cellPadding="0"
        align="center"
        style={{ margin: "20px auto" }}
      >
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
                        style={{
                          padding: "10px",
                          borderBottom: "solid 1px #ddd",
                        }}
                      >
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
                                  style={{
                                    maxWidth: "250px",
                                    maxHeight: "125px",
                                  }}
                                />
                              </div>
                            </td>
                            <td
                              width="50%"
                              style={{
                                textAlign: "right",
                                verticalAlign: "top",
                              }}
                            >
                              <div
                                style={{
                                  display: "inline-block",
                                  textAlign: "right",
                                }}
                              >
                                <strong
                                  id="template_invoice_title"
                                  style={{
                                    fontSize: "20px",
                                    display: "block",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Tax Invoice
                                </strong>
                                <table style={{ textAlign: "right" }}>
                                  <tbody>
                                    <tr id="store_pan_no_on_off_tr">
                                      <td>
                                        <strong id="template_store_pan_no">
                                          PAN NO.:
                                        </strong>{" "}
                                        ABCDE1234F
                                      </td>
                                    </tr>
                                    <tr id="store_gstin_on_off_tr">
                                      <td>
                                        <strong id="template_store_gstin">
                                          GSTIN:
                                        </strong>{" "}
                                        22ABCDE1234F1Z9
                                      </td>
                                    </tr>
                                    <tr id="store_iec_code_on_off_tr">
                                      <td>
                                        <strong id="template_store_iec_code">
                                          IEC CODE:
                                        </strong>{" "}
                                        1234567890
                                      </td>
                                    </tr>
                                    <tr id="store_cin_on_off_tr">
                                      <td>
                                        <strong id="template_store_cin">
                                          CIN:
                                        </strong>{" "}
                                        U12345MH2020PLC678901
                                      </td>
                                    </tr>
                                    <tr id="store_fssai_lic_no_on_off_tr">
                                      <td>
                                        <strong id="template_store_fssai_lic_no">
                                          FSSAI LIC NO.:
                                        </strong>{" "}
                                        10012021000000
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
                                        <span id="template_store_email">
                                          {" "}
                                          parasvirani9@gmail.com
                                        </span>
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
                                        <span id="template_shop_phone">
                                          +919664938949
                                        </span>
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
      <table
        width="100%"
        border="0"
        cellSpacing="0"
        cellPadding="0"
        style={{ margin: "20px 0" }}
      >
        <tbody>
          <tr>
            <th
              className="label_shipping_on_off"
              align="left"
              valign="top"
              style={{ fontSize: "16px", fontFamily: "Inter" }}
            >
              <strong id="template_shipping_head_title">
                SHIP TO PARTY / DELIVERY ADDRESS :
              </strong>
            </th>
            <th align="left" style={{ fontSize: "16px", fontFamily: "Inter" }}>
              <strong id="template_billing_head_title">Bill To Party:</strong>
            </th>
          </tr>

          <tr>
            <td className="label_shipping_on_off">John Doe</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td className="label_shipping_on_off">
              505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev{" "}
              <br />
              Ahmedabad-500037
              <br />
              Gujarat
              <br />
            </td>
            <td>
              505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev{" "}
              <br />
              Ahmedabad-500037
              <br />
              Gujarat
              <br />
            </td>
          </tr>

          <tr className="bill_ship_phone_no_on_off_tr">
            <td className="label_shipping_on_off">9876543210</td>
            <td>9876543210</td>
          </tr>

          <tr
            className="label_customer_email_on_off_tr"
            style={{ display: "none" }}
          >
            <td className="label_shipping_on_off">customer-email@gmail.com</td>
            <td>customer-email@gmail.com</td>
          </tr>

          <tr className="bill_ship_gstin_on_off_tr">
            <td className="label_shipping_on_off">GSTIN124664355478</td>
            <td>GSTIN124664355478</td>
          </tr>
        </tbody>
      </table>
        {/* order details */}
      <table>
        <tr>
          <td>
            <strong id="template_order_no">Order No :</strong>
            <span id="order_no_on_off_tr">#1048</span>
          </td>
        </tr>

        <tr>
          <td>
            <strong id="template_order_date">Order Date :</strong>
            <span id="order_date_on_off_tr">21 Mar, 2025</span>
          </td>
        </tr>

        <tr>
          <td>
            <strong id="template_invoice_no">Invoice No :</strong>
            <span id="invoice_no_on_off_tr">045</span>
          </td>
        </tr>

        <tr>
          <td>
            <strong id="template_invoice_date">Invoice Date:</strong>
            <span id="invoice_date_on_off_tr">21-03-2025</span>
          </td>
        </tr>
      </table>
        {/* products price details */}
      <table width="100%" border="1" cellspacing="0" cellpadding="0" align="center" style={{ margin: '0px auto', borderColor: '#ddd', borderCollapse: 'collapse' , marginTop:'30px'}}>
      <tbody>
        <tr className="sortable-row ui-sortable" style={{height:'60px'}}>
          <th className="custom_bg_text_color" width="38px" style={{ padding: '0 5px' }}>#</th>
          <th className="custom_bg_text_color" width="280px" style={{ padding: '0 5px' }}>ITEM - SKU</th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="qty" width="40px" style={headerStyle}>
            <strong id="template_product_quantity">QTY</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="rate_per_item" width="120px" style={headerStyle}>
            <strong><span id="template_product_rate">RATE PER ITEM</span>(₹)</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color product_discount_on_off_tr ui-sortable-handle" data-value="discount_item" width="80px"style={headerStyle}>
            <strong><span id="template_product_discount">DISCOUNT ITEM</span> (₹)</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="taxable_item" width="120px" style={headerStyle}>
            <strong><span id="template_product_taxable_item">TAXABLE ITEM</span> (₹)</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color product_hsn_on_off_tr ui-sortable-handle" data-value="hsn" width="80px" style={headerStyle}>
            <strong id="template_product_hsn">HSN</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="gst" width="40px" style={headerStyle}>
            <strong><span id="template_product_gst">GST</span>(%) </strong>
          </th>
          <th className="gst-type-cgst-sgst custom_bg_text_color" width="80px" style={{ padding: '0 5px' }}>
            <strong><span id="template_product_cgst">CGST</span> (₹) </strong>
          </th>
          <th className="gst-type-cgst-sgst custom_bg_text_color" width="80px" style={{ padding: '0 5px' }}>
            <strong><span id="template_product_sgst">SGST</span> (₹) </strong>
          </th>
          <th className="gst-type-igst custom_bg_text_color" width="80px" style={{ padding: '0px 5px', display: 'none' }}>
            <strong><span id="template_product_igst">IGST</span> (₹) </strong>
          </th>
          <th className="custom_bg_text_color" width="80px" style={{ padding: '0 5px' }}>
            <strong><span id="template_product_cess">CESS</span> (₹) </strong>
          </th>
          <th className="custom_bg_text_color" width="100px" style={{ padding: '0 5px' }} align="right">
            <strong><span id="template_product_total">TOTAL</span> (₹) </strong>
          </th>
        </tr>

        <tr style={{height:'40px'}}>
          <td width="38px" style={{ padding: '0 5px' }}>1</td>
          <td width="280px" style={{ padding: '0 5px' }}>
            <span className="product_title_on_off_tr">14k Dangling Pendant</span>
            <span className="product_sku_on_off_tr"> - SKU</span>
          </td>
          <td className="cell-1" data-position="1" data-value="qty" width="40px" style={{ padding: '0 5px' }}>1</td>
          <td className="cell-1" data-position="2" data-value="rate_per_item" width="120px" style={{ padding: '0 5px' }}>672.41</td>
          <td className="cell-1 product_discount_on_off_tr" data-position="3" data-value="discount_item" width="80px" style={{ padding: '0 5px' }}>0.00</td>
          <td className="cell-1" data-position="4" data-value="taxable_item" width="120px" style={{ padding: '0 5px' }}>600.37</td>
          <td className="cell-1 product_hsn_on_off_tr" data-position="5" data-value="hsn" width="80px" style={{ padding: '0 5px' }}>122501</td>
          <td className="cell-1" data-position="6" data-value="gst" width="40px" style={{ padding: '0 5px' }}>12</td>
          <td className="gst-type-cgst-sgst" width="80px" style={{ padding: '0 5px' }}>36.02</td>
          <td className="gst-type-cgst-sgst" width="80px" style={{ padding: '0 5px' }}>36.02</td>
          <td className="gst-type-igst" width="80px" style={{ padding: '0px 5px', display: 'none' }}>75.04</td>
          <td width="80px" style={{ padding: '0 5px' }}>-</td>
          <td width="100px" style={{ padding: '0 5px' }} align="right">672.41</td>
        </tr>

        <tr></tr>
      </tbody>
    </table>

    <table width="100%" border="1" cellSpacing="0" cellPadding="0" style={{ margin: '0px auto', borderColor: '#ddd', borderCollapse: 'collapse', borderTop: '0',}}>
      <tbody>
        <tr>
          <td width="50%"  style={{ verticalAlign: 'top', padding: '5px 10px' }} >
            <div id="order_note_on_off_tr">
              <strong>
                <span id="template_order_note">Order Note: </span>
              </strong>
              Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
              ipsum
            </div>

            <div id="payment_mode_on_off_tr">
              <strong style={{ marginTop: '5px' }}>
                <span id="template_payment_mode">Payment Mode</span>:
              </strong>
              Manual
            </div>

            <div id="terms_conditions_on_off_tr" style={{ padding: '5px 0' }}>
              <strong style={{ marginTop: '5px' }}>
                <span id="template_terms_conditions">Terms and Conditions</span>
              </strong>
              <br />
              <span id="template_store_terms_conditions"></span>
            </div>

            <div id="total_amount_in_words_on_off_tr">
              <strong>
                <span id="template_total_amount_in_words">
                  Total Invoice Amount in Words
                </span>
              </strong>
              <br />
              Six Hundred Seventy-Two Rupees Only
            </div>
          </td>

          <td width="50%" align="right" style={{ verticalAlign: 'top', padding: '5px 10px' }} >
            <div>
              <strong>Total Amount before Tax(₹):</strong> 600.37
            </div>
            <div>
              <strong>Total Tax Amount(₹):</strong> 72.04
            </div>
            <div>
              <strong>Discount %:</strong> 0
              <br />
              <strong>Discount (₹):</strong>
            </div>
            <div>
              <strong>Shipping Discount (₹):</strong>
            </div>
            <div>
              <strong>Shipping Amount(₹):</strong> -
            </div>
            <div>
              <strong>Total Amount After Tax(₹):</strong> 672.41
            </div>
            <div>
              <strong>Round Off:</strong> (-)0.41
            </div>
            <div>
              <strong>TOTAL(₹):</strong> <strong>672.00</strong>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table  width="100%" border="0" cellSpacing="0" cellPadding="0" style={{ margin: '20px auto' }} >
    <tbody>
      <tr>
        <td width="33.33%" style={{ verticalAlign: 'top' }}>
          <strong style={{ fontWeight: 'bold' }}>
            For, <span id="template_shop_name_footer">paras2806 1</span>
          </strong>
          <br />
          <div className="crop-element-wrap"  data-toggle="modal" data-target="#signatureCropModal">
            <input
              type="button"
              className="btn btn-primary"
              value="Add Signature"
              name="signature_btn"
              style={{
                width:'120px',
                height:'33px',
                backgroundColor: '#74A545',
                color: '#fff',
                border: '1px solid #ccc',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius:'5px',
                fontSize:'14px',
                fontFamily:'Inter'
              }}
            />
          </div>
            <br />
            <span id="template_no_signature_text" style={{ fontSize: '12px', display: 'block' }} >
              This is a computer generated invoice and does not require a
              signature
            </span>
          </td>
          <td width="33.33%" align="center" style={{ textAlign: 'center' }}>
            <div id="qr_code_on_off_tr" style={{ width: '100px', textAlign: 'center' }}>
              <img
                src="data:image/png;base64, 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"
                alt="QR Code"
              />
              <br />
              <span style={{ fontSize: '11px', display: 'block' }}>
                Scan to download
              </span>
            </div>
          </td>
          <td  width="33.33%"  align="right" style={{ verticalAlign: 'top', textAlign: 'right' }} >
            <span id="template_e_and_o_e">E. & O.E</span>
            <br />
            <img
              id="financial_status_on_off_tr"
              width="150"
              height="70"
              src="https://gst.webplanex.biz/images/paid_imag.png"
              alt=""
              style={{ display: 'none' }}
            />
            <br />
          </td>
        </tr>
      </tbody>
    </table>
      {/* footer */}
    <div class="footer-text" style={{display:'flex', justifyContent:'space-between',margin:'110px 0 5px 0'}}>
      <div style={{fontFamily:'Inter', fontSize:'14px', color:'#000',fontWeight:'bold'}}>
          <span id="thanks_for_business_on_off_tr">
              Thank you for your business
          </span>
      </div>
      <div style={{fontFamily:'Inter', fontSize:'14px', color:'#ccc'}}>
          <span id="generated_from_on_off_tr">
              Generated from:
              VirtueGst&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span id="page_no_on_off_tr">Page 1 of 1</span>&nbsp;
      </div>
   </div>
    </div>
  );
};
