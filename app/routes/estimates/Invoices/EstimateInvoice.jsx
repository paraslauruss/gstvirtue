import React from 'react'

export default function EstimateInvoice({logo}) {
  return (
    <div id='estimate' style={{fontFamily:'Inter',fontSize:'16px',fontWeight:'normal'}}>
      <div class='card' style={{position:'relative', display:'flex',flexDirection:'column',backgroundClip:'border-box',backgroundColor:'#fff'}}>
        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
              <tr>
                <td align='left' valign='top' width="35%" 
                  style={{borderTop:'solid 1px #444444',
                          borderLeft:'solid 1px #444444',
                          padding:'8px 0px 0px 5px'
                  }}>
                    <h2>
                       &nbsp;
                       <span id='template_invoice_title' style={{fontSize:'26px',fontFamily:'Inter',fontWeight:'bold'}}>
                          Estimate
                       </span>
                    </h2>
                    <br />
                    <span id='store_gstin_on_off_tr'>
                      &nbsp;
                       <strong>GSTIN:  22ABCDE1234F1Z9 </strong>
                    </span>
                </td>
                {/* logo */}
                <td align="center" valign="top" width="30%"
                  style={{
                    borderTop: "solid 1px #444444",
                    padding: "10px 0px 0px",
                  }}>
                <div class="crop-element-wrap" data-toggle="modal"
                  data-target="#imageCropModal" >
                  {logo}
                </div>
              </td>
               {/* empty space for border top and right */}
            <td
              align="right"
              width="35%"
              valign="top"
              style={{
                fontSize: "18px",
                borderTop: "solid 1px #444444",
                borderRight: "solid 1px #444444",
                lineHeight: "22px",
                padding: "8px 5px 0px 0px",
              }}
            >
              <strong id="template_original">
                 {"  "}
              </strong>
            </td>
            </tr>
            {/* Store Info */}
            <tr>
              <td colSpan="3" align='center'
                 style={{borderLeft:'1px solid #444444',borderRight: "solid 1px #444444",paddingBottom: "10px",lineHeight:'25px'}}>
                    <strong>
                       <span id='template_branch_name'>
                          Branch Name
                       </span>
                    </strong>
              <br/>
               <strong>
                  <span id='template_shop_name'>
                     Paras2806
                  </span>
               </strong>
               <br />
               <span id='template_shop_address'>
                 Vraj Antonia, near hare krishna diamond, Sarthana Jakat Naka, Surat, Gujarat 395006
               </span>
              </td>
            </tr>
            {/* mail shop name numberphone */}
            <tr>
              <td align='left' style={{borderLeft:'1px solid #444444',lineHeight:'25px',padding:'0px 0px 8px 8px'}}>
                  &nbsp;
                  <img 
                   width="12px"
                   height="12px"
                   id="storeEmailIcon"
                   src="https://gst.webplanex.biz/images/mail-icon.png" alt="" 
                  />
                  &nbsp;
                  <strong>
                    <span id='template_shop_email'>
                       parasvirani@gmail.com
                    </span>
                  </strong>
              </td>

              <td style={{lineHeight:'25px',paddingBottom:'8px',textAlign:'center '}}>
                 <span id='store_domain_on_off_tr'>
                    <img 
                      width="10px"
                      height="10px"
                      src="https://gst.webplanex.biz/images/web-icon.png" alt="" 
                    />
                    &nbsp;
                    <strong id='template_store_domain'>
                       VirtueGst
                    </strong>
                 </span>
              </td>

              <td align='right' style={{borderRight: "solid 1px #444444",borderRight: "solid 1px #444444",borderRight: "solid 1px #444444"}}>
                 &nbsp;
                 <img
                    src="https://gst.webplanex.biz/images/phone-icon.png"
                    alt=""
                    width="12px"
                    height="12px"
                  />
                  &nbsp;
                  <strong>
                <span id="template_contact_person"></span>
                <span></span>
                <span id="template_shop_phone">
                  +91987654431
                </span>
              </strong> 
              &nbsp;
              </td>
            </tr>
           </tbody>
        </table>

        {/* estimate num and other details */}
        <table width="100%" border="0" cellspacing="0" cellpadding="0" id="table-top">
           <tbody>
             <tr>
               <td align="left" width="591"
               style={{
                padding: "0 5px",
                borderTop: "solid 1px #444444",
                borderLeft: "solid 1px #444444",
                lineHeight: "30px",
              }}> 
                <table>
                   <tbody>
                    <tr>
                      {/* estimate no */}
                      <td align='left' width="300" style={{ lineHeight: "30px" }}>
                         &nbsp;&nbsp;
                         <span id='template_invoice_number'>
                            Estimate No.
                         </span>: {" "}
                         <strong id='invoice_no_on_off_tr'>
                            EST/400001
                         </strong>
                      </td>
                    </tr>
                   </tbody>
                </table>
               </td>
                {/*transport model*/}
                <td align="left" width="591" style={{
                  padding: "0 5px",
                  border: "solid 1px #444444",
                  lineHeight: "30px",
                }}>
                  &nbsp;
                  <span>
                    <span id="template_transport_mode">
                       Transport Mode
                    </span>
                    :{" "}
                    <strong id="transport_mode_on_off_tr">
                      Offline
                      &nbsp;&nbsp;
                </strong>
              </span>
              </td>
             </tr>

             <tr>
                <td align='left' width="591"  style={{
                padding: "0 5px",
                border: "solid 1px #444444",
                lineHeight: "30px",
              }}>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                       <tr>
                        {/* date estimate */}
                        <td align="left" width="295" style={{ lineHeight: "30px" }}>
                           &nbsp;&nbsp;
                           <span id='template_invoice_date'>
                              Estimate Date
                           </span>:{" "}
                           <strong id='invoice_date_on_off_tr'>
                              20-01-2025
                           </strong>
                        </td>
                        {/*empty box*/}
                        <td align="left" width="296" style={{
                            borderLeft: "solid 1px #444444",
                            lineHeight: "30px",
                          }}>
                            &nbsp;&nbsp;
                            <span id='template_order_date'>
                                &nbsp;
                            </span>  
                            <strong>
                               &nbsp;
                            </strong>
                        </td>
                       </tr>
                    </tbody>
                  </table>
              </td>
              {/* date of supply */}
              <td align="left" width="591" style={{
                padding: "0 5px",
                borderRight:'1px solid #444444',
                borderBottom:'1px solid #444444',
                lineHeight: "30px",
              }}>
                  &nbsp;
                  <span>
                    <span id="template_date_of_supply">
                      Date of Supply:
                    </span>:{" "}
                    <strong >
                      20-01-2025
                    </strong>
                  </span>
              </td>
             </tr>

             <tr>
               <td align="left" style={{ borderLeft: "solid 1px #444444" }} >
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        {/* state */}
                        <td  align="left" width="68%" style={{
                            padding: "0 5px",
                            lineHeight: "30px",
                            fontSize: "14px",
                          }}>
                            &nbsp;&nbsp;State:{" "}
                            <strong>
                               Gujarat
                            </strong>
                        </td>
                        {/* code */}
                        <td width="16%" style={{
                            borderLeft: "solid 1px #444444",
                            lineHeight: "30px",
                          }}
                          align="center">
                               &nbsp;&nbsp;Code
                        </td>
                        <td  width="16%"
                          style={{
                            borderLeft: "solid 1px #444444",
                            lineHeight: "30px",
                          }}
                          align="center">
                            <strong>
                               24
                            </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
               </td>
               {/* empty space as shown in estimate template */}
               <td align="left" style={{
                padding: "0 5px",
                borderLeft: "solid 1px #444444",
                borderRight: "solid 1px #444444",
                lineHeight: "30px",
              }}>   
                 &nbsp;
                 <span>
                   <span> {" "} </span>
                   <strong>
                      {" "}
                   </strong>
                 </span>
               </td>
             </tr>
           </tbody>
        </table>

        {/* second part shipping and billing details */}
        <table class="td-gray" width="100%" border="1" cellspacing="0" cellpadding="0" id="table-top2">
           <tbody>
             <tr>
               <td colspan="2" style={{ padding: "20px 10px" }}>
                  &nbsp;
               </td>
             </tr>

             {/* BILL TO PARTY SHIP TO PARTY */}
             <tr>
              <td align="center" bgcolor="#eeeeee" class="label_billing_on_off  custom_bg_text_color"
                style={{ padding: "0 5px", lineHeight: "30px" }}
              >
                <strong>
                   <span id='template_billing_head_title'>
                      BILL TO PARTY
                   </span>
                </strong>
              </td>

              <td align="center" bgcolor="#eeeeee" class="label_shipping_on_off custom_bg_text_color"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                }}
              > 
                <strong>
                   <span id='template_shipping_head_title'>
                     SHIP TO PARTY
                   </span>
                </strong>
              </td>
             </tr>

             <tr>
              {/* name of customer */}
               <td align="left"  class="label_billing_on_off" width="50%"
                 style={{ padding: "0 5px", lineHeight: "30px" }}
               >
                 &nbsp;&nbsp;
                  <strong>
                    John
                    Doe
                  </strong>
               </td>
               {/* name - ship */}
               <td align="left" class="label_shipping_on_off"  width="50%"
               style={{
                padding: "0 5px",
                lineHeight: "30px",
              }}>
                 &nbsp;&nbsp;
                 <strong>
                   John 
                   Doe 
                </strong>    
               </td>
             </tr>
             {/* addresses bill and ship */}
             <tr>
              <td align="left" class="label_billing_on_off" valign="top"
                style={{ padding: "0 14px", lineHeight: "30px" }}
              >
                P-603, Swaminarayan Green city, Surat, 394180, Gujarat, India
              </td>

              <td  align="left" class="label_shipping_on_off" valign="top"
              style={{
                padding: "0 14px",
                lineHeight: "30px",
              }}>
                 P-603, Swaminarayan Green city, Surat, 394180, Gujarat, India
              </td>
             </tr>
             {/* GSTIN */}
             <tr class="bill_ship_gstin_on_off_tr">
              <td align="left" class="label_billing_on_off"style={{
                padding: "0 5px",
                lineHeight: "30px",
              }}>
                 &nbsp;&nbsp;
                 <strong>
                  <span id='template_billing_gstin'>
                      GSTIN
                  </span>
                  :
                 </strong>{" "} 
                 22AAAAA0000A1Z5
              </td>

              <td align="left" class="label_shipping_on_off"style={{
                padding: "0 5px",
                lineHeight: "30px",
              }}>
                 &nbsp;&nbsp;
                 <strong>
                  <span id='template_shipping_gstin'>
                      GSTIN
                  </span>
                  :
                 </strong>{" "} 
                 22AAAAA0000A1Z5
              </td>
             </tr>
             {/* state code bill  */}
              <tr>
                <td align="left" class="label_billing_on_off">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td align="left" width="40%"  style={{
                          padding: "0 5px",
                          lineHeight: "30px",
                          border: "0px",
                        }}>
                            &nbsp;&nbsp;<strong>State:</strong>{" "}
                            Gujarat
                        </td>
                      <td width="16%" align="center"
                      style={{
                        borderLeft: "solid 1px #444444",
                        borderRight: "solid 1px #444444",
                        borderTop: "0px",
                        borderBottom: "0px",
                        lineHeight: "30px",
                      }}>
                          <strong>Code</strong>
                      </td>
                      <td
                      width="16%"
                      style={{
                        borderLeft: "solid 1px #444444",
                        borderRight: "solid 1px #444444",
                        borderTop: "0px",
                        borderBottom: "0px",
                        lineHeight: "30px",
                      }}
                      align="center"
                    >
                       25
                    </td>
                    <td align="left" width="28%"
                      style={{
                        padding: "0 5px",
                        lineHeight: "30px",
                        border: "0px",
                      }}
                    >
                      &nbsp;&nbsp;<strong>Country:</strong>{" "}
                       India
                    </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                {/* ship state coed */}
                <td
                align="left"
                class="label_shipping_on_off">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td
                        align="left"
                        width="40%"
                        style={{
                          padding: "0 5px",
                          lineHeight: "30px",
                          border: "0px",
                        }}>
                        &nbsp;&nbsp;<strong>State:</strong>{" "}
                         Gujarat
                      </td>
                      <td
                        width="16%"
                        style={{
                          borderLeft: "solid 1px #444444",
                          borderRight: "solid 1px #444444",
                          borderTop: "0px",
                          borderBottom: "0px",
                          lineHeight: "30px",
                        }}
                        align="center">
                        <strong>Code</strong>
                      </td>
                      <td width="16%"
                        style={{
                          borderLeft: "solid 1px #444444",
                          borderRight:'solid 1px #444444',
                          borderTop: "0px",
                          borderBottom: "0px",
                          lineHeight: "30px",
                        }}
                        align="center">
                         24
                      </td>
                      <td align="left" width="28%"
                        style={{
                          padding: "0 5px",
                          lineHeight: "30px",
                          border: "0px",
                        }}
                      >
                        &nbsp;&nbsp;<strong>Country:</strong>{" "}
                         India
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              </tr>
           </tbody>
        </table>

        {/* product details */}
        <table  width="100%" border="1"cellspacing="0" cellpadding="0"class="td-gray"
         style={{ marginTop: "-1px" }}>
          <tbody>
             <tr>
               <td colspan="2" style={{ padding: "20px 10px",border:'none'}}>
                  &nbsp;
               </td>
             </tr>
             <tr class='sortable-row ui-sortable'>
              <td  class="custom_bg_text_color" width="38px"  valign="top"  align="center" bgcolor="#eeeeee"
              style={{ padding: "0 5px", lineHeight: "30px" }}>
                  <strong>#</strong>
              </td> 
              {/* item-sku */}
              <td class="custom_bg_text_color" width="280px" valign="top" align="center"  bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                }}>
                 <strong>
                   <span id='template_product_title'>Item-SKU</span>
                 </strong>
              </td> 
              {/* qty */}
                <td  class="draggable-cell custom_bg_text_color ui-sortable-handle"
                    data-value="qty"
                    width="40px"
                    align="center"
                    valign="top"
                    bgcolor="#eeeeee"
                    style={{
                      padding: "0 5px",
                      lineHeight: "30px",
                      textTransform: "uppercase",
                    }}>
                  <strong>
                      <span id='template_product_quantity'>
                        QTY
                      </span>
                  </strong>
                </td>
                {/* rate per item */}
                <td
                class="draggable-cell custom_bg_text_color ui-sortable-handle"
                data-value="rate_per_item"
                width="120px"
                align="center"
                valign="top"
                bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                <strong>
                  <span id="template_product_rate">
                    Rate Per Item
                  </span>
                  (₹)
                </strong>
            </td>
            {/* taxable item */}
            <td data-value="taxable_item" width="120px" align="center" valign="top" bgcolor="#eeeeee"
            style={{
              padding: "0 5px",
              lineHeight: "30px",
              textTransform: "uppercase",
            }}> 
                <strong>
                  <span id='template_product_taxable_item'>
                     Taxable Item
                  </span>
                  (₹)
                </strong>
            </td>
            {/* hsn */}
            <td class="draggable-cell custom_bg_text_color product_hsn_on_off_tr ui-sortable-handle"
            data-value="hsn"  width="80px" align="center" valign="top" bgcolor="#eeeeee"
            style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                }}>
                  {" "}
                  <strong>
                    <span id='template_product_hsn'>
                        HSN
                    </span>
                </strong>
            </td>
            {/* gst */}
            <td class="draggable-cell custom_bg_text_color ui-sortable-handle"
             data-value="gst" width="40px" align="center" valign="top" bgcolor="#eeeeee"
             style={{
              padding: "0 5px",
              lineHeight: "30px",
              textTransform: "uppercase",
            }}>
                {" "}
                <strong>
                  <span id='template_product_gst'>
                    GST
                  </span>{" "}
                  <br/>
                  (%)
                </strong>
            </td>
            {/* cgst */}
            <td width="80px" valign="top" align="center" bgcolor="#eeeeee"
            class="gst-type-cgst-sgst custom_bg_text_color"
            style={{
              padding: "0 5px",
              lineHeight: "30px",
              textTransform: "uppercase",
            }}>
                {" "}
                <strong>
                  <span id='template_product_cgst'>
                      CGST
                  </span>{" "}
                  <br />
                  (₹)
                </strong>
            </td>
            {/* sgst */}
            <td  width="80px" valign="top" align="center" bgcolor="#eeeeee"
              style={{
                padding: "0 5px",
                lineHeight: "30px",
                textTransform: "uppercase",
              }}>
                  {" "}
                  <strong>
                    <span id='template_product_sgst'>
                      SGST
                    </span>{" "}
                    <br />
                    (₹)
                </strong>
             </td>
             {/* cess */}
             <td width="100px" align="center" valign="top" bgcolor="#eeeeee"
              style={{
                padding: "0 5px",
                lineHeight: "30px",
                textTransform: "uppercase",
              }}>
                {" "}
                <strong>
                  <span id='template_product_cess'>
                    Cess
                  </span>{" "}
                  <br />
                  (%)(₹)
                </strong>
             </td>
             {/* total */}
             <td class="custom_bg_text_color"
                width="120px" align="center" valign="top" bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                }}>
                &nbsp;&nbsp;{" "}
                <strong>
                  <span id='template_product_total'>
                     Total
                  </span>{" "}
                  <br /> (₹)
                </strong>
             </td>
            </tr>

            {/* product details */}
            <tr>
              <td  width="38px" style={{ lineHeight: "30px" }} align="center" valign="top">
                  1
              </td>
              {/* product name */}
              <td
                width="280px"
                style={{ padding: "0 5px", lineHeight: "30px" }}
                align="left"
                valign="top"
              >
                <span class="product_title_on_off_tr">
                  All in one body wash
                </span>
                
                <span class="product_sku_on_off_tr">
                  {" "}
                  {/* {formData?.product_items_labels
                    ?.hide_show_product_title &&
                    formData?.product_items_labels
                      ?.hide_show_product_sku && <span> - </span>}{" "}
                  {formData?.product_items_labels
                    ?.hide_show_product_sku && item?.sku} */}
                </span>
              </td>
              {/* qty */}
              <td class='cell-1' data-position="1" data-value="qty" width="44px"
              style={{ lineHeight: "30px" }} align="center" valign="top"
               > 
                  1
              </td>
              {/* rate per item */}
              <td class="cell-1" data-position="2" data-value="rate_per_item"  width="120px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                  50.00
              </td>
              {/* tax item */}
              <td class="cell-1" data-position="4" data-value="taxable_item"  width="120px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                  50.00
              </td>
              {/* hsn */}
              <td class="cell-1 product_hsn_on_off_tr"  data-position="5" data-value="hsn"  width="80px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                  18
              </td>
              {/* gst */}
              <td class="cell-1" data-position="6" data-value="gst" width="40px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                18
              </td>
              {/* cgst */}
              <td class="gst-type-cgst-sgst" width="80px"
               style={{ lineHeight: "30px" }} align="center" valign="top">
                 3.31
              </td>
              {/* sgst */}
              <td class="gst-type-cgst-sgst" width="80px"
               style={{ lineHeight: "30px" }} align="center" valign="top">
                 3.31
              </td>
              {/* cess */}
              <td width="100px" style={{ lineHeight: "30px" }} align="center" valign="top">
                 (18) 6.62
              </td>
              {/* total */}
              <td width="120px" style={{ lineHeight: "30px" }} align="right" valign="top">
                 50.00
              </td>
            </tr>
            {/* Generate 3 empty rows */}
              {[2, 3, 4].map((id) => (
                <tr key={id}>
                  <td width="38px" style={{ lineHeight: "30px" }} align="center" valign="top">{id}</td>
                  <td width="280px" style={{ padding: "0 5px", lineHeight: "30px" }} align="left" valign="top">
                    <span className="product_title_on_off_tr"></span>
                    <span className="product_sku_on_off_tr"></span>
                  </td>
                  <td className="cell-1" data-position="1" data-value="qty" width="44px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td className="cell-1" data-position="2" data-value="rate_per_item" width="120px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td className="cell-1" data-position="4" data-value="taxable_item" width="120px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td className="cell-1 product_hsn_on_off_tr" data-position="5" data-value="hsn" width="80px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td className="cell-1" data-position="6" data-value="gst" width="40px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td className="gst-type-cgst-sgst" width="80px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td className="gst-type-cgst-sgst" width="80px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td width="100px" style={{ lineHeight: "30px" }} align="center" valign="top"></td>
                  <td width="120px" style={{ lineHeight: "30px" }} align="right" valign="top"></td>
                </tr>
              ))}

              {/* final total */}
              <tr>
                <td
                  colSpan="2"
                  width="362px"
                  className="custom_bg_text_color"
                  bgcolor="#eeeeee"
                  style={{
                    textAlign: "center",
                    padding: "0 5px",
                    lineHeight: "30px",
                    textTransform: "uppercase"
                  }}
                >
                  <strong>Total</strong>
                </td>
                <td
                  className="cell-3"
                  data-position="1"
                  data-value="qty"
                  width="44px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  8
                </td>
                <td
                  className="cell-3"
                  data-position="2"
                  data-value="rate_per_item"
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                ></td>
                <td
                  className="cell-3 product_discount_on_off_tr"
                  data-position="3"
                  data-value="discount_item"
                  width="80px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                ></td>
                <td
                  className="cell-3"
                  data-position="4"
                  data-value="taxable_item"
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                ></td>
                <td
                  className="cell-3 product_hsn_on_off_tr"
                  data-position="5"
                  data-value="hsn"
                  width="80px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                ></td>
                <td
                  className="cell-3"
                  data-position="6"
                  data-value="gst"
                  width="40px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                ></td>
                <td
                  className="gst-type-cgst-sgst"
                  width="80px"
                  style={{ lineHeight: "30px" }}
                >
                  &nbsp;
                </td>
                <td
                  width="100px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                ></td>
                <td
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="right"
                  valign="top"
                >
                  <strong>4000.00&nbsp;&nbsp;</strong>
                </td>
              </tr>
          </tbody>
        </table>
        {/* terms and conditions and other details */}
        <table width="100%"  border="0" cellspacing="0" cellpadding="0" class="td-gray"style={{ marginTop: "-1px" }} >
        <tbody>
        <tr>
          <td align="left" valign="top"
            style={{
              borderTop: "1px solid #444444",
              borderLeft: "1px solid #444444",
              borderRight: "1px solid #444444",
            }}
          >
            <table width="100%" cellSpacing="0" cellPadding="0" border="0">
              <tbody>
                <tr id="template_terms_and_conditions">
                  <td
                    style={{ padding: "8px 0px", borderBottom: "1px solid #444444" }}
                    valign="bottom"
                  >
                    <table width="100%" cellSpacing="0" cellPadding="0" border="0" align="left">
                      <tbody>
                        <tr>
                          <td style={{ paddingLeft: "15px" }}>
                            <strong>
                              <span id="template_terms_condition">
                                Terms and Conditions
                              :</span> 
                            </strong>{" "}
                            Loreum ipsum
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr id="total_amount_in_words_on_off_tr" >
                  <td style={{ padding: "5px 15px" }} valign="bottom">
                    <table width="100%" cellSpacing="0" cellPadding="0" border="0" align="left">
                      <tbody>
                        <tr>
                          <td>
                            <strong>
                              <span id="template_total_amount_in_words">
                                  Total amount in words
                              </span>
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "5px 0px" }}>
                            Four thousand only
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td
            width="50%"
            align="left"
            valign="top"
            style={{
              borderRight: "1px solid #444444",
              borderTop: "1px solid #444444",
              lineHeight: "35px",
            }}>
            <table width="100%" cellSpacing="0" cellPadding="0" border="0">
              <tbody>
                <tr>
                  <td
                    align="left"
                    height="35"
                    style={{
                      borderRight: "1px solid #444444",
                      borderBottom: "1px solid #444444",
                    }}
                  >
                    total invoice amount in words
                    (₹)
                  </td>
                  <td
                    align="right"
                    height="35"
                    style={{ borderBottom: "1px solid #444444" }}
                  >
                    3243
                  </td>
                </tr>

                <tr>
                  <td
                    align="left"
                    height="35"
                    style={{
                      borderRight: "1px solid #444444",
                      borderBottom: "1px solid #444444",
                    }}
                  >
                    &nbsp;&nbsp;Total Tax Amount(₹)
                  </td>
                  <td
                    align="right"
                    height="35"
                    style={{ borderBottom: "1px solid #444444" }}
                  >
                    50
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      borderRight: "1px solid #444444",
                      borderBottom: "1px solid #444444",
                    }}
                  >
                    <table
                      width="100%"
                      cellSpacing="0"
                      cellPadding="0"
                      border="0"
                      style={{ borderCollapse: "collapse" }}
                    >
                      <tbody>
                        <tr>
                          <td height="35" align="left" width="60%">
                            &nbsp;&nbsp;Discount %
                          </td>
                          <td
                            align="right"
                            style={{ borderLeft: "1px solid #444444" }}
                          >
                            -&nbsp;&nbsp;
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td style={{ borderBottom: "1px solid #444444" }}>
                    <table
                      width="100%"
                      cellSpacing="0"
                      cellPadding="0"
                      border="0"
                      style={{ borderCollapse: "collapse" }}
                    >
                      <tbody>
                        <tr>
                          <td height="35" align="left" width="50%">
                            &nbsp;&nbsp;Discount(₹)
                          </td>
                          <td
                            align="right"
                            style={{
                              width: "100px",
                              borderLeft: "1px solid #444444",
                            }}
                          >
                            -&nbsp;&nbsp;
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              
                <tr>
                  <td
                    align="left"
                    height="35"
                    style={{
                      borderRight: "1px solid #444444",
                      borderBottom: "1px solid #444444",
                    }}
                  >
                    &nbsp;&nbsp;Total Amount After Tax(₹)
                  </td>
                  <td align="right" style={{ borderBottom: "1px solid #444444" }}>
                    4592
                  </td>
                </tr>

                <tr>
                  <td
                    align="left"
                    height="35"
                    style={{
                      borderRight: "1px solid #444444",
                      borderBottom: "1px solid #444444",
                    }}
                  >
                    &nbsp;&nbsp;Round Off
                  </td>
                  <td align="right" style={{ borderBottom: "1px solid #444444" }}>
                    -&nbsp;&nbsp;
                  </td>
                </tr>

                <tr>
                  <td
                    align="left"
                    height="35"
                    style={{
                      borderRight: "1px solid #444444",
                      borderBottom: "1px solid #444444",
                      textTransform: "uppercase",
                    }}
                  >
                    <strong>&nbsp;&nbsp;Total(₹)</strong>
                  </td>
                  <td align="right" style={{ borderBottom: "1px solid #444444" }}>
                    <strong> 
                      454
                      &nbsp;&nbsp;</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      {/* e & eo */}
        <tr>
            <td  colSpan="2" align='left'
                style={{borderTop:'1px solid #000',padding:'5px',borderLeft:'1px solid #000',borderRight:'1px solid #000'}} >
           E. & EO.
          </td> 
        </tr>
      {/* signtaure */}
        <tr>
          <td
            align="left"
            style={{
              borderLeft: 'solid 1px #444444',
              borderBottom: 'solid 1px #444444',
              lineHeight: '30px',
            }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
          </td>
          <td
            align="right"
            style={{
              padding: '0 10px 20px',
              borderBottom: 'solid 1px #444444',
              borderRight: 'solid 1px #444444',
              lineHeight: '30px',         
            }}>
            <strong>
              For, 
              <span id="template_shop_name_footer">
                 paras2806
              </span>
            </strong>{" "}
            &nbsp;&nbsp;
            <br />      
            <span
              id="template_no_signature_text"
              style={{ fontSize: '12px' }}
            >
              This is a computer generated invoice and does not require a signature
            </span>
          </td>
        </tr>
        </tbody>
      </table>
      {/* footer */}
      <div style={{display:'flex',justifyContent:'space-between',margin:'110px 0 5px 0'}}>
          <div style={{fontFamily:'Inter',fontSize:'14px',color:'#000',fontWeight:'bold'}}>
              <span id='thanks_for_buisness_on_off_tr'>
                  Thank you for your buisness
              </span>
          </div>
          <div style={{fontFamily:'Inter',fontSizeL:'12px',color: '#5E5E5E',textAlign:'center'}}>
              <span id='generate_from_on_off_tr'>
                Genearate from:
                Paras2806&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span id='page_no_on_off_tr' style={{marginLeft:'180px'}}>Page 1 of 1</span>
          </div>
      </div>
      </div>
    </div>
  )
}
