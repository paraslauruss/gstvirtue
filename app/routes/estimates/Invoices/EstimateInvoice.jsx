import React from 'react'
import numberToWords from 'number-to-words';


export default function EstimateInvoice({logo,estimate,storeData,customLabels,signtuare}) {

  function formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      const formattedDate = isNaN(date.getTime())
        ? new Date().toLocaleDateString("en-GB", options)
        : date.toLocaleDateString("en-GB", options);
      return formattedDate;
    }
    const gstStateCodes = {
      AP: "37",
      AR: "12",
      AS: "18",
      BR: "10",
      CG: "22",
      DL: "07",
      GJ: "24",
      HR: "06",
      HP: "02",
      JK: "01",
      JH: "20",
      KA: "29",
      KL: "32",
      MP: "23",
      MH: "27",
      MN: "14",
      ML: "17",
      MZ: "15",
      NL: "13",
      OD: "21",
      PB: "03",
      RJ: "08",
      SK: "11",
      TN: "33",
      TS: "36",
      TR: "16",
      UP: "09",
      UK: "05",
      WB: "19",
    };
    const calculateExpenseTaxValues = (estimate) => {
      const rate = parseFloat(estimate.rate || 0);
      const quantity = parseFloat(estimate.quantity || 1);
      const gstPercentage = parseFloat(estimate.gst || 0);
      const discountPercent = parseFloat(estimate.discountPercent || 0);
      const discountFlat = parseFloat(estimate.discountFlat || 0);
    
      // Taxable amount before GST and discount
      const baseAmount = rate * quantity;
    
      // Discount calculation
      const discountAmount = discountPercent
        ? (baseAmount * discountPercent) / 100
        : discountFlat;
    
      const taxableAmount = baseAmount - discountAmount;
    
      const gst = (taxableAmount * gstPercentage) / 100;
      const cgstAmount = gst / 2;
      const sgstAmount = gst / 2;
    
      const total = taxableAmount + gst;
     
      return {
        ratePerItem: rate.toFixed(2),
        quantity: quantity,
        baseAmount: baseAmount.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        taxableAmount: taxableAmount.toFixed(2),
        gstPercentage: gstPercentage,
        gstAmount: gst.toFixed(2),
        cgstAmount: cgstAmount.toFixed(2),
        sgstAmount: sgstAmount.toFixed(2),
        total: total.toFixed(2),
      };
    };
    const normalizedExpenses = Array.isArray(estimate) ? estimate : [estimate];
  
    let {
      totalRateSum,
      totalQuantitySum,
      totalTaxableAmountSum,
      totalDiscountSum,
      totalAmountWithTaxSum,
    } = normalizedExpenses.reduce(
      (acc, estimateItem) => {
        const {
          ratePerItem,
          quantity,
          taxableAmount,
          discountAmount,
          total,
        } = calculateExpenseTaxValues(estimateItem);
    
        acc.totalRateSum += parseFloat(ratePerItem);
        acc.totalQuantitySum += parseFloat(quantity);
        acc.totalTaxableAmountSum += parseFloat(taxableAmount);
        acc.totalDiscountSum += parseFloat(discountAmount);
        acc.totalAmountWithTaxSum += parseFloat(total);
    
        return acc;
      },
      {
        totalRateSum: 0,
        totalQuantitySum: 0,
        totalTaxableAmountSum: 0,
        totalDiscountSum: 0,
        totalAmountWithTaxSum: 0,
      }
    );
    
    // Add round-off logic
    const roundedTotal = Math.round(totalAmountWithTaxSum);
    const sign = roundedTotal >= 0 ? "+" : "-";
    const roundOff = (roundedTotal - totalAmountWithTaxSum).toFixed(2);
    
    // Convert total to words
    const totalAmountInWords = numberToWords.toWords(roundedTotal);
    
    // Discount percentage (based on original amount without discount)
    const totalDiscountInPercentage = (totalDiscountSum / totalRateSum) * 100;
  


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
                      {customLabels?.customize_store_labels?.is_gstin && (
                        <strong>
                           <span id='template_store_gstin'>
                             {customLabels?.customize_store_labels?.gstin}
                           </span>
                        </strong>
                      )}
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
                          {customLabels?.store_information?.branch_name}
                       </span>
                    </strong>
              <br/>
               <strong>
                  <span id='template_shop_name'>
                    {customLabels?.store_information?.company_legal_name}
                  </span>
               </strong>
               <br />
               <span id='template_shop_address'>
                  {customLabels?.store_information?.store_address || 'Vraj Antonia, near hare krishna diamond, Sarthana Jakat Naka, Surat, Gujarat 395006'}
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
                        {storeData?.store_email}
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
                       {storeData?.company_legal_name}
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
                    {storeData?.store_phone}
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
                            {estimate?.Estimatenum}
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
                       {estimate?.TransportModel || "Offline"}
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
                              {formatDate(estimate?.estDate) || "20-01-2025"}
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
                       {formatDate(estimate?.supplyDate) || "20-01-2025"}
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
                               {storeData?.store_state || "Gujarat"}
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
                            {gstStateCodes[
                              storeData?.store_state_code
                            ] || "24"}
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
                      {customLabels?.billing_shipping_labels?.bill_to_party || "BILL  TO  PARTY"}
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
                     {customLabels?.billing_shipping_labels?.ship_to_party || "SHIP TO PARTY"}
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
                     {estimate?.Customer || "John Doe"}
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
                    {estimate?.Customer || 'John Doe'}
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
                display: customLabels?.billing_shipping_labels?.hide_show_gstin
                  ? "table-cell"
                  : "none",
              }}>
                 &nbsp;&nbsp;
                 <strong>
                  <span id='template_billing_gstin'>
                      {customLabels?.billing_shipping_labels?.billing_gstin}
                  </span>
                  :
                 </strong>{" "} 
                 {storeData?.gst_number || "22AAAAA0000A1Z5"}
              </td>

              <td align="left" class="label_shipping_on_off"style={{
                padding: "0 5px",
                lineHeight: "30px",
                display: customLabels?.billing_shipping_labels?.hide_show_gstin
                  ? "table-cell"
                  : "none",
              }}>
                 &nbsp;&nbsp;
                 <strong>
                  <span id='template_shipping_gstin'>
                      {customLabels?.billing_shipping_labels?.billing_gstin}
                  </span>
                  :
                 </strong>{" "} 
                   {storeData?.gst_number || "22AAAAA0000A1Z5"}
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
                            {storeData?.store_state || "Gujarat"}
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
                        {
                        gstStateCodes[
                          storeData?.store_state_code
                        ]
                      }
                    </td>
                    <td align="left" width="28%"
                      style={{
                        padding: "0 5px",
                        lineHeight: "30px",
                        border: "0px",
                      }}
                    >
                      &nbsp;&nbsp;<strong>Country:</strong>{" "}
                        {storeData?.store_country || "India"}
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
                         {storeData?.store_state || "Gujarat"}
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
                         {
                        gstStateCodes[
                          storeData?.store_state_code  || '25'
                        ]
                      }
                      </td>
                      <td align="left" width="28%"
                        style={{
                          padding: "0 5px",
                          lineHeight: "30px",
                          border: "0px",
                        }}
                      >
                        &nbsp;&nbsp;<strong>Country:</strong>{" "}
                          {storeData?.store_country || 'India'}
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
                   <span id='template_product_title'>
                      {customLabels?.product_items_labels?.item_sku || "ITEM-SKU"}
                   </span>
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
                        {customLabels?.product_items_labels?.qty || "QTY"}
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
                    {customLabels?.product_items_labels?.rate_per_item || "RATE PER ITEM"}
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
                     {customLabels?.product_items_labels?.texable_item || "TAXABLE ITEM"}
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
                        {customLabels?.product_items_labels?.hsn || "HSN"}
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
                    {customLabels?.product_items_labels?.gst || "GST"}
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
                      {customLabels?.product_items_labels?.cgst || "CGST"}
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
                      {customLabels?.product_items_labels?.sgst || "SGST"}
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
                    {customLabels?.product_items_labels?.cess || "CESS"}
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
                     {customLabels?.product_items_labels?.total || "TOTAL"}
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
                   {estimate?.selectedProduct?.title}
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
                  {(estimate?.rate || "50.00")}
              </td>
              {/* tax item */}
              <td class="cell-1" data-position="4" data-value="taxable_item"  width="120px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                  {estimate?.totalTax || "25.52"}
              </td>
              {/* hsn */}
              <td class="cell-1 product_hsn_on_off_tr"  data-position="5" data-value="hsn"  width="80px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                  {estimate?.selectedProduct?.hsn || " "}
              </td>
              {/* gst */}
              <td class="cell-1" data-position="6" data-value="gst" width="40px"
              style={{ lineHeight: "30px" }} align="center" valign="top">
                  {estimate?.selectedProduct?.gst}
              </td>
              {/* cgst */}
              <td class="gst-type-cgst-sgst" width="80px"
               style={{ lineHeight: "30px" }} align="center" valign="top">
                 {(
                    (estimate?.cgstAmount ?? (
                      (estimate?.selectedProduct?.gst) / 2 /100) * 
                      (estimate?.rate || 0))
                 )}
              </td>
              {/* sgst */}
              <td class="gst-type-cgst-sgst" width="80px"
               style={{ lineHeight: "30px" }} align="center" valign="top">
                   {(
                     ( estimate?.sgstAmount ??
                      ((
                        estimate?.selectedProduct?.gst || 0) / 2 / 100) * 
                         (estimate?.rate || 0))
                    )}
              </td>
              {/* cess */}
              <td width="100px" style={{ lineHeight: "30px" }} align="center" valign="top">
              (
                  {estimate?.selectedProduct?.gst || 0}
                  %
                ){" "}
                {(
                  ((estimate?.rate || 0) * (estimate?.selectedProduct?.cess || 0)) /
                  100
                )}

              </td>
              {/* total */}
              <td width="120px" style={{ lineHeight: "30px" }} align="right" valign="top">
                 {(
                    (estimate?.rate || 0) +
                    (estimate?.cgstAmount ??
                       ((estimate?.gst || 0)/ 2 / 100) * (estimate?.rate || 0)) +
                    (estimate?.sgstAmount ??
                    ((estimate?.gst || 0) / 2 / 100) * (estimate?.rate || 0))
              )}
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
                  1
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
                  <strong>
                  {(
                    (estimate?.rate || 0) +
                    (estimate?.cgstAmount ??
                       ((estimate?.gst || 0) / 2 / 100) * (estimate?.rate || 0)) +
                    (estimate?.sgstAmount ??
                    ((estimate?.gst || 0) / 2 / 100) * (estimate?.rate || 0))
                   )}
                    &nbsp;&nbsp;</strong>
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
                                {customLabels?.others_labels?.term_and_conditions || "Terms And Conditions"}
                              :</span> 
                            </strong>{" "}
                            {
                              customLabels?.others_labels?.is_term_and_conditions
                               && customLabels?.others_labels?.terms_and_conditions
                            }
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
                                 {customLabels?.others_labels?.total_invoice_amount_in_words}
                              </span>
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "5px 0px" }}>
                            {
                              customLabels?.others_labels
                              ?.is_total_invoice_amount_in_words && 
                              "Four Thousand Ruppes Only"
                            }
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
                    {customLabels?.others_labels?.total_invoice_amount_in_words}
                    (₹)
                  </td>
                  <td
                    align="right"
                    height="35"
                    style={{ borderBottom: "1px solid #444444" }}
                  >
                    {totalAmountInWords || ""}&nbsp;&nbsp;
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
                     {" "}
                      {estimate?.totalTax}{" "}
                      &nbsp;&nbsp;
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
                            - &nbsp;&nbsp;
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
                            - &nbsp;&nbsp;
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
                  {(
                    (estimate?.rate || 0) +
                    (estimate?.cgstAmount ??
                      ((estimate?.gst || 0) / 2 / 100) * (estimate?.rate || 0)) +
                    (estimate?.sgstAmount ??
                      ((estimate?.gst || 0) / 2 / 100) * (estimate?.rate || 0))
                  )}&nbsp;&nbsp;
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
                       {estimate?.total}
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
           {customLabels?.others_labels?.e_and_o_e}
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
                 {customLabels?.store_information?.company_legal_name}
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
                {customLabels?.store_information?.shop_domain}&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span id='page_no_on_off_tr' style={{marginLeft:'180px'}}>Page 1 of 1</span>
          </div>
      </div>
      </div>
    </div>
  )
}
