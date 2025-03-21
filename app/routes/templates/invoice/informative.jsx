import ic_scanner from '../../../assets/images/ic_scanner.png'

export const Informatinve = ({ logo }) => {

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: 'solid 1px #000',
  };

  const headerRowStyle = {
    padding: 0,
    borderBottom: 'solid 1px #000',
    backgroundColor: '#f0f0f0', // Add a light background for header visibility
  };

  const headerCellStyle = {
    borderRight: 'solid 1px #000',
    padding: '0px 5px',
  };

  const cellStyle = {
    borderRight: 'solid 1px #000',
    padding: '5px 5px',
  };

  const lastCellStyle = {
    borderRight: 'none', // No right border for the last column
    padding: '5px 5px',
  };

  const totalRowStyle = {
    padding: '8px 0px',
    borderTop: 'solid 1px #000',
    fontWeight: 'bold',
  };


  return (
    <div class="card">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            {/* logo element */}
            <td width="33%" valign="bottom" align="left">
              <div
                class="crop-element-wrap crop-element-section crop-element-left"
                style={{ width: "250px" }}
                data-toggle="modal"
                data-target="#imageCropModal">
                <img
                  src="https://gst.webplanex.biz/images/logo_1739353164.jpg"
                  style={{ maxWidth: "250px", maxHeight: "125px" }}
                />
                <div class="crop-overlay overlay-right-logo justify-content-center">
                  <div class="crop-overlay-text">
                    Click to change company logo
                  </div>
                </div>
              </div>
            </td>

            <td width="33%" valign="bottom" align="center" style={{ fontSize: "20px" }} >
              <strong id="template_invoice_title">Tax Invoice</strong>
            </td>

            <td
              width="33%"
              valign="bottom"
              align="right"
              style={{ fontSize: "20px" }}>
              <strong id="template_original">Original</strong>
            </td>
          </tr>
        </tbody>
      </table>
      {/* second table  */}
      <table width="100%" border="0" cellSpacing="0" cellPadding="0" style={{ lineHeight: '22px', border: '1px solid #000' }}>
        <tbody>
          <tr>
            {/* Left Section - Store Details */}
            <td
              rowSpan="3"
              width="590"
              align="left"
              valign="top"
              style={{ padding: '3px 10px', borderRight: '1px solid #000' }}>
              <div>
                <strong id="template_brand_name">Branch Name</strong>
              </div>
              <div>
                <strong id="template_shop_name">paras2806 1</strong>
              </div>
              <div id="template_shop_address">
                Vraj Antonia, near hare krishna diamond, Sarthana Jakat Naka, Surat, Gujarat 395006
              </div>
              <div style={{ paddingTop: '10px' }}>
                <span id="store_gstin_on_off_tr">
                  <strong id="template_store_gstin">GSTIN:</strong> 22ABCDE1234F1Z9
                  <br />
                </span>
                <span id="store_pan_no_on_off_tr">
                  <strong id="template_store_pan_no">PAN NO.:</strong> ABCDE1234F
                  <br />
                </span>
                <span id="store_iec_code_on_off_tr">
                  <strong id="template_store_iec_code">IEC CODE:</strong> 1234567890
                  <br />
                </span>
                <span id="store_cin_on_off_tr">
                  <strong id="template_store_cin">CIN:</strong> U12345MH2020PLC678901
                  <br />
                </span>
                <span id="store_fssai_lic_no_on_off_tr">
                  <strong id="template_store_fssai_lic_no">FSSAI LIC NO.:</strong> 10012021000000
                  <br />
                </span>
                <img
                  id="storeEmailIcon"
                  src="https://gst.webplanex.biz/images/mail-icon.png"
                  alt=""
                  width="16"
                  height="16"
                />{' '}
                <span id="template_store_email">parasvirani9@gmail.com</span>
                <br />
                <img src="https://gst.webplanex.biz/images/phone-icon.png" alt="" width="16" height="16" />
                &nbsp;
                <span id="template_contact_person"></span>
                <span id="template_shop_phone">+919664938949</span>
              </div>
            </td>

            {/* Right Section - Invoice Details */}
            <td width="295" height="24" valign="top" style={{ padding: '5px 10px', border: '1px solid #000' }}>
              <strong id="template_invoice_no">Invoice No:</strong>{' '}
              <span id="invoice_no_on_off_tr">045</span>
            </td>
            <td width="295" height="24" valign="top" style={{ padding: '5px 10px', borderBottom: '1px solid #000' }}>
              <strong id="template_invoice_date">Invoice Date:</strong>{' '}
              <span id="invoice_date_on_off_tr">18-03-2025</span>
            </td>
          </tr>

          {/* Order Details Row */}
          <tr>
            <td valign="top" style={{ padding: '5px 10px', border: '1px solid #000', borderBottom: 0 }}>
              <strong id="template_order_no">Order No:</strong>{' '}
              <span id="order_no_on_off_tr">#1048</span>
            </td>
            <td valign="top" style={{ padding: '5px 10px', borderBottom: 0 }}>
              <strong id="template_transport_mode">Transport Mode:</strong>{' '}
              <span id="transport_mode_on_off_tr">Delhivery</span>
            </td>
          </tr>

          {/* Supply Details Row */}
          <tr>
            <td valign="top" style={{ padding: '5px 10px', border: '1px solid #000', borderBottom: 0 }}>
              <strong id="template_order_date">Order Date: </strong>
              <span id="order_date_on_off_tr">18-03-2025</span>
            </td>
            <td valign="top" style={{ padding: '5px 10px', borderTop: '1px solid #000' }}>
              <strong id="template_date_of_supply">Date of Supply:</strong>{' '}
              <span id="date_of_supply_on_off_tr">18-03-2025</span>
              <br />
              <strong id="template_place_of_supply">Place of Supply:</strong>{' '}
              <span id="place_of_supply_on_off_tr">Rajkot</span>
            </td>
          </tr>
        </tbody>
      </table>
      {/* third table */}
      <table
        width="100%"
        border="0"
        cellSpacing="0"
        cellPadding="0"
        align="center"
        style={{ lineHeight: '22px', border: '1px solid #000' }}>
        <tbody>
          <tr>
            <td>
              <table width="100%" border="0" cellSpacing="0" cellPadding="0" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000', borderCollapse: 'collapse', }}>
                <tbody>
                  <tr>
                    <td width="588" align="left" valign="top" style={{ padding: '5px 5px 5px 10px', lineHeight: '22px', wordBreak: 'break-word', }}>
                      <div>
                        <strong id="template_billing_head_title">
                          BILL TO PARTY
                        </strong>
                        <br />
                        <strong>John Doe</strong>
                        <br />
                        505 Shapath2, Opp. Rajpath Club, SG Highway, 360015,
                        Bodakdev
                        <br />
                        Ahmedabad-500037
                        <br />
                        Gujarat
                        <br />
                        <span style={{ float: 'left' }} className="bill_ship_phone_no_on_off_tr">
                          <strong>
                            <span id="template_billing_phone">Phone</span>:
                          </strong>
                          9876543210
                          <br />
                        </span>

                        <span style={{ paddingLeft: '5px', display: 'none' }}
                          className="label_customer_email_on_off_tr" >
                          <span className="customer_email_pipe_sign">|</span>
                          <span style={{ paddingLeft: '5px' }}>
                            <strong>E:</strong> customer-email@gmail.com
                          </span>
                        </span>
                        <br />
                        <span className="bill_ship_gstin_on_off_tr">
                          <strong id="template_billing_gstin">GSTIN:</strong>
                          GSTIN124664355478
                          <br />
                        </span>
                        <strong>State Name:</strong> Gujarat{' '}
                        <span style={{ paddingLeft: '30px' }}>
                          <strong>Code:</strong> 24
                        </span>{' '}
                        <span style={{ paddingLeft: '30px' }}>
                          <strong>Country:</strong> India
                        </span>
                      </div>
                    </td>

                    <td
                      className="label_shipping_on_off"
                      width="590"
                      align="left"
                      valign="top"
                      style={{
                        padding: '5px 5px 5px 10px',
                        lineHeight: '22px',
                        borderLeft: '2px solid #000',
                        wordBreak: 'break-word',  // Prevent long strings from overflowing
                      }}
                    >
                      <div>
                        <strong id="template_shipping_head_title">
                          SHIP TO PARTY / DELIVERY ADDRESS
                        </strong>
                        <br />
                        <strong>John Doe</strong>
                        <br />
                        505 Shapath2, Opp. Rajpath Club, SG Highway, 360015,
                        Bodakdev
                        <br />
                        Ahmedabad-500037
                        <br />
                        Gujarat
                        <br />
                        <span style={{ float: 'left' }} className="bill_ship_phone_no_on_off_tr">
                          <strong>
                            <span id="template_shipping_phone">Phone</span>:
                          </strong>
                          9876543210
                          <br />
                        </span>

                        <span style={{ paddingLeft: '5px', display: 'none' }} className="label_customer_email_on_off_tr" >
                          <span className="customer_email_pipe_sign">|</span>
                          <span style={{ paddingLeft: '5px' }}>
                            <strong>E:</strong> customer-email@gmail.com
                          </span>
                        </span>
                        <br />
                        <span className="bill_ship_gstin_on_off_tr">
                          <strong id="template_shipping_gstin">GSTIN:</strong>
                          GSTIN124664355478
                          <br />
                        </span>
                        <strong>State Name:</strong> Gujarat{' '}
                        <span style={{ paddingLeft: '30px' }}>
                          <strong>Code:</strong> 24
                        </span>{' '}
                        <span style={{ paddingLeft: '30px' }}>
                          <strong>Country:</strong> India
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* fourth table */}
      <table style={tableStyle} align="center">
        <thead>
          <tr style={headerRowStyle} align="center">
            <th style={headerCellStyle}>
              <strong>S.No</strong>
            </th>
            <th style={headerCellStyle}>
              <strong id="template_product_title">ITEM - SKU</strong>
            </th>
            <th style={headerCellStyle}>
              <strong id="template_product_hsn">HSN</strong>
            </th>
            <th style={headerCellStyle}>
              <strong id="template_product_rate">RATE PER ITEM</strong>
            </th>
            <th style={{ ...headerCellStyle, borderBottom: 'solid 2px #000' }}>
              <strong id="template_product_quantity">QTY</strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_discount">DISCOUNT ITEM</span> (₹)
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_taxable_item">TAXABLE ITEM</span> (₹)
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_gst">GST</span> (%)
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_cgst">CGST</span>
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_sgst">SGST</span>
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_igst">IGST</span>
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_cess">CESS</span>
              </strong>
            </th>
            <th style={headerCellStyle}>
              <strong>
                <span id="template_product_total">TOTAL</span>
              </strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr align="center" valign="top" style={{ padding: '8px 0px' }}>
            <td align="right" style={cellStyle}>
              1
            </td>
            <td align="left" style={cellStyle}>
              40 PCS Double Wall Dinner Set (6 People) Budget JHU 61 - SKU
            </td>
            <td align="left" style={cellStyle}>
              892.86
            </td>
            <td align="right" style={cellStyle}>
              500.00
            </td>
            <td align="right" style={cellStyle}>
              567421
            </td>
            <td align="right" style={cellStyle}>
              2
            </td>
            <td align="right" style={cellStyle}>
              0.00
            </td>
            <td align="right" style={cellStyle}>
              12
            </td>
            <td align="right" style={cellStyle}>
              53.57
            </td>
            <td align="right" style={cellStyle}>
              53.57
            </td>
            <td align="right" style={cellStyle}>
              107.14
            </td>
            <td align="right" style={cellStyle}>
              -
            </td>
            <td align="right" style={cellStyle}>
              1000
            </td>
          </tr>
          {/* Empty Rows */}
          {Array(6).fill(null).map((_, index) => (
            <tr align="center" valign="top" key={index} style={{ padding: '8px 0px' }}>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
              <td style={cellStyle}> </td>
            </tr>
          ))}
          <tr align="center" style={totalRowStyle}>
            <td colSpan="2" align="center" style={cellStyle}>
              Total
            </td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td align="center" style={cellStyle}>
              2
            </td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td style={cellStyle}></td>
            <td align="right" style={cellStyle}>
              1000
            </td>
          </tr>
        </tbody>
      </table>
      {/*  */}
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody><tr>
          <td align="left" style={{ borderLeft: 'solid 1px #000 ', borderBottom: '1px solid #000', padding: '5px 5px 5px 10px' }}>
            <strong id="total_amount_in_words_on_off_tr"><span id="template_total_amount_in_words">Total Invoice Amount in Words</span> - One Thousand Four Hundred Rupees Only</strong>
          </td>
          <td align="right" style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '5px' }}>
            <span id="template_e_and_o_e">E. &amp; O.E</span>
          </td>
        </tr>
        </tbody>
      </table>
      {/* order note */}
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '5px 5px 5px 10px' }}>
              <strong><span id="template_order_note">Order Note</span>: </strong> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            </td>
          </tr>
        </tbody>
      </table>
      {/* payment */}
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '5px 5px 5px 10px' }}>
              <strong><span id="template_order_note">Payment Mode</span>: </strong> Manual
            </td>
          </tr>
        </tbody>
      </table>

      {/* price table */}
      <table width="100%" border="0" cellSpacing="0" cellPadding="0" align="center">
        <tbody>
          <tr>
            <td width="50%" valign="top" align="center" style={{ borderLeft: "solid 1px #000", borderBottom: "solid 1px #000", padding: "10px", }}>
              <table style={{ width: "100%", border: "1px solid #000", borderCollapse: "collapse" }}>
                <tbody>
                  <tr style={{ fontWeight: "bold" }}>
                    <td rowSpan="2" style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>HSN/SAC</td>
                    <td colSpan="2" style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>CENTRAL TAX</td>
                    <td colSpan="2" style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>STATE TAX</td>
                    <td colSpan="2" style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>IGST TAX</td>
                  </tr>
                  <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>Rate</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>Amount</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>Rate</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>Amount</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>Rate</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>Amount</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>567421</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>6%</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>53.57</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>6%</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>53.57</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}>--</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>--</td>
                  </tr>
                  <tr style={{ fontWeight: "bold" }}>
                    <td colSpan="2" style={{ border: "1px solid #000", padding: "5px" }}>Tax Amount</td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>53.57</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}></td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>53.57</td>
                    <td style={{ border: "1px solid #000", padding: "5px" }}></td>
                    <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}></td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="50%" valign="top" style={{ borderRight: "solid 1px #000", borderBottom: "solid 1px #000", padding: "10px 10px 10px 0px", }}>
              <table width="100%" cellSpacing="0" cellPadding="5">
                <tbody>
                  <tr>
                    <td colSpan="2" align="left" style={{ border: "solid 1px #000" }}>
                      Total Amount before Tax(₹)
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}>
                      892.86
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="left" style={{ border: "solid 1px #000" }}>
                      Total Tax Amount(₹)
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}>
                      107.14
                    </td>
                  </tr>
                  <tr>
                    <td width="35%" style={{ border: "solid 1px #000" }}>
                      Discount %
                    </td>
                    <td width="15%" align="right" style={{ border: "solid 1px #000" }}>
                      0
                    </td>
                    <td width="35%" style={{ border: "solid 1px #000" }}>
                      Discount(₹)
                    </td>
                    <td width="15%" align="right" style={{ border: "solid 1px #000" }}></td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ border: "solid 1px #000" }}>
                      Shipping Discount(₹)
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}></td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="left" style={{ border: "solid 1px #000" }}>
                      Shipping Amount(₹)
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}>
                      -
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="left" style={{ border: "solid 1px #000" }}>
                      Total Amount After Tax(₹)
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}>
                      1000.00
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="left" style={{ border: "solid 1px #000" }}>
                      Round Off
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}>
                      -
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="left" style={{ border: "solid 1px #000" }}>
                      <strong>TOTAL(₹)</strong>
                    </td>
                    <td colSpan="2" align="right" style={{ border: "solid 1px #000" }}>
                      <strong>1000.00</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* scan payment section */}
      <table width="100%" border="0" cellSpacing="0" cellPadding="0" style={{ border: "2px solid #000", borderTop: "0px solid #000" }}>
        <tbody>
          <tr align="left">
            <td width="44%" style={{ padding: "5px 10px" }} valign="top">
              <span id="terms_conditions_on_off_tr">
                <strong><span id="template_terms_conditions">Terms and Conditions:</span></strong><br />
                <span id="template_store_terms_conditions"></span>
              </span>
            </td>
            <td width="15%" valign="top">
              <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: "5px 5px 15px 5px" }}>
                      <strong>&nbsp;</strong>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: "0 5px" }}>
                      <img id="financial_status_on_off_tr" width="150" height="70" src="https://gst.webplanex.biz/images/paid_imag.png" alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td id="qr_code_on_off_tr" width="15%" align="center">
              <img src={ic_scanner} alt="scanner" />
              <span style={{ float: "left", width: "100%", fontSize: "10px" }}>Scan to download</span>
            </td>
            <td width="26%" style={{ borderLeft: "2px solid #000" }} valign="top">
              <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: "5px 5px 15px 5px" }}>
                      <strong>For, <span id="template_shop_name_footer">paras2806 1</span></strong>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: "0 5px" }}>
                      <div className="crop-element-wrap" data-toggle="modal" data-target="#signatureCropModal">
                        <input type="button" className="btn btn-primary" value="Add Signature" name="signature_btn" style={{ width: '150px', height: '33px', backgroundColor: '#74A535', color: '#fff', fontSize: '14px', fontFamily: 'Inter', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: "5px" }}>
                      <span id="template_no_signature_text" style={{ fontSize: "12px" }}>
                        This is a computer generated invoice and does not require a signature
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {/* footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '110px 0 5px 0' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#000', fontWeight: 'bold' }}>
          <span id="thanks_for_business_on_off_tr">
            Thank you for your business
          </span>
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#5E5E5E' }}  >
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



