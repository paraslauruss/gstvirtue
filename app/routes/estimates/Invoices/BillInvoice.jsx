import numberToWords from 'number-to-words';
import React from 'react'

export default function BillInvoice({ expense, logo, signtuare, storeData, customLabels }) {

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
  const calculateExpenseTaxValues = (expense) => {
    const rate = parseFloat(expense?.rate || 0);
    const quantity = parseFloat(expense?.quantity || 1);
    const gstPercentage = parseFloat(expense?.gstPercentage || 0);
    const discountPercent = parseFloat(expense?.discountPercent || 0);
    const discountFlat = parseFloat(expense?.discountFlat || 0);

    // Taxable amount before GST and discount
    const baseAmount = rate * quantity;

    // Discount calculation
    const discountAmount = discountPercent
      ? (baseAmount * discountPercent) / 100
      : discountFlat;

    const taxableAmount = baseAmount - discountAmount;

    const gstAmount = (taxableAmount * gstPercentage) / 100;
    const cgstAmount = gstAmount / 2;
    const sgstAmount = gstAmount / 2;

    const total = taxableAmount + gstAmount;

    return {
      ratePerItem: rate.toFixed(2),
      quantity: quantity,
      baseAmount: baseAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      taxableAmount: taxableAmount.toFixed(2),
      gstPercentage: gstPercentage,
      gstAmount: gstAmount.toFixed(2),
      cgstAmount: cgstAmount.toFixed(2),
      sgstAmount: sgstAmount.toFixed(2),
      total: total.toFixed(2),
    };
  };
  const normalizedExpenses = Array.isArray(expense) ? expense : [expense];

  let {
    totalRateSum,
    totalQuantitySum,
    totalTaxableAmountSum,
    totalDiscountSum,
    totalAmountWithTaxSum,
  } = normalizedExpenses.reduce(
    (acc, expenseItem) => {
      const {
        ratePerItem,
        quantity,
        taxableAmount,
        discountAmount,
        total,
      } = calculateExpenseTaxValues(expenseItem);

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
    <div id='invoice' style={{ fontFamily: 'Inter', fontWeight: "normal" }}>
      <div class='card' style={{ position: 'relative', display: 'flex', flexDirection: 'column', backgroundClip: 'border-box', backgroundColor: '#fff' }}>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td align="left" valign="top" width="35%"
                style={{
                  borderTop: "solid 1px #444444",
                  borderLeft: "solid 1px #444444",
                  padding: "15px 0px 0px 19px",
                }}>

                <h2>&nbsp;
                  <span id='template_invoice_title' style={{ fontSize: '30px', fontFamily: 'Inter', fontWeight: '700' }}>
                    Expense
                  </span>
                </h2>
                <br />
                {/* gst */}
                <span id="store_gstin_on_off_tr" >
                  &nbsp;
                  {customLabels?.customize_store_labels?.is_gstin && (
                    <strong>
                      <span id="template_store_gstin">
                        {customLabels?.customize_store_labels?.gstin}
                      </span>{" "}
                      :22ABCDE1234F1Z9
                    </strong>
                  )}
                </span>
              </td>
              {/* logo part */}
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
            {/* STORE INFO  */}
            <tr >
              <td colspan="3"
                style={{
                  borderLeft: "solid 1px #444444",
                  borderRight: "solid 1px #444444",
                  lineHeight: "25px",
                  paddingBottom: "10px",
                }}
                align="center">
                <strong>
                  <span id="template_brand_name">
                    {customLabels?.store_information?.branch_name}
                  </span>
                </strong>
                <br />
                <strong>
                  <span id="template_shop_name">
                    {customLabels?.store_information?.company_legal_name}
                  </span>
                </strong>
                <br />
                <span id="template_shop_address">
                  {customLabels?.store_information?.store_address}
                </span>
              </td>
            </tr>

            {/* other details below logo */}
            <tr>
              <td
                style={{

                  borderLeft: "solid 1px #444444",
                  lineHeight: "25px",
                  padding: "0px 0px 8px 8px",
                }}
                align="left">
                &nbsp;
                <img
                  id="storeEmailIcon"
                  src="https://gst.webplanex.biz/images/mail-icon.png"
                  alt=""
                  width="12px"
                  height="12px"
                />
                &nbsp;
                <strong>
                  <span id="template_store_email">
                    {storeData?.store_information?.store_email}
                  </span>
                </strong>
              </td>
              <td style={{ lineHeight: "25px", paddingBottom: "8px" }} align="center">
                <span id="store_domain_on_off_tr">
                  &nbsp;
                  <img
                    src="https://gst.webplanex.biz/images/web-icon.png"
                    alt=""
                    width="10px"
                    height="10px"
                  />
                  &nbsp;
                  <strong id="template_store_domain">
                    {storeData?.store_information?.shop_domain}
                  </strong>
                </span>
              </td>
              <td
                style={{
                  borderRight: "solid 1px #444444",
                  borderRight: "solid 1px #444444",
                  borderRight: "solid 1px #444444",
                }}
                align="right">
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
                    {storeData?.store_information?.store_phone}
                  </span>
                </strong>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>

        {/* second part  */}
        <table
          className="template_"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
          }}>
          <tbody>
            {/* Ref Number Row */}
            <tr>
              <td colSpan="3" style={{ border: "1px solid black", padding: "4px" }}>
                <span id='template_refNumber'>
                  Reference Number
                </span> :{" "}
                <strong id='refNumber_on_off_tr'>
                  {expense?.RefNumber || "37t2348348r494d"}
                </strong>
              </td>
            </tr>

            {/* Expense Date & Payment Method Row */}
            <tr>
              {/* date */}
              <td style={{ border: "1px solid black", padding: "4px", width: "50%" }}>
                <span id='template_expenseDate'>
                  Expense Date
                </span>:{" "}
                <strong id='expenseDate_on_off_tr'>
                  {formatDate(expense?.expenseDate || "2024-12-06")}
                </strong>
              </td>

              <td style={{ border: "1px solid black", padding: "4px", width: "50%", textAlign: 'left' }} colSpan="2">
                <span id='template_payment_method'>
                  Payment Method
                </span>:{" "}
                <strong id='payment_menthod_tr'>
                  {expense?.paymentMethod || "Credit Card"}
                </strong>
              </td>
            </tr>

            {/* State, Country, Code Row */}
            <tr>
              <td style={{ border: "1px solid black", padding: "4px", width: '60%', textAlign: 'left' }}>
                &nbsp;State:{" "}
                <strong>
                  {storeData?.store_state || "Gujarat"}
                </strong>
              </td>

              <td style={{ border: "1px solid black", padding: "0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          padding: "4px",
                          textAlign: "center",
                        }}
                      >
                        <strong>Code</strong>
                      </td>
                      <td
                        style={{
                          padding: "4px",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}>
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
            </tr>
          </tbody>
        </table>

        <table class='td-gray' width="100%" border="1" cellspacing="0" cellpadding="0" id='table-top2'>
          <tbody>
            <tr>
              <td colSpan="2" style={{ padding: '20px 10px' }}>
                &nbsp;
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#eeeeee" class="label_billing_on_off  custom_bg_text_color" style={{ padding: "0 5px", lineHeight: "30px" }}>
                <strong>
                  <span id='template_billing_head_title'>
                    {customLabels?.billing_shipping_labels?.bill_to_party}
                  </span>
                </strong>
              </td>
            </tr>
            {/* name of customer */}
            <tr>
              <td align="left" class="label_billing_on_off" width="50%"
                style={{ padding: "0 5px", lineHeight: "30px" }}>
                &nbsp;&nbsp;
                <strong>
                  <span id='template_shipping_label_title'>
                    {expense?.payees}
                  </span>
                </strong>
              </td>
            </tr>
            {/* bill address */}
            <tr>
              <td align="left" class="label_billing_on_off" valign="top" style={{ padding: "0 14px", lineHeight: "30px" }}>
                {customLabels?.store_information?.store_address ||
                  "505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054"}
              </td>
            </tr>
            {/* phone no*/}
            <tr>
              <td align="left" class="label_billing_on_off" valign="top" style={{ padding: "0 14px", lineHeight: "30px" }}>
                &nbsp;
                <strong>
                  <span id='template_billing_phone'>
                    Phone
                  </span>:
                </strong>{" "}
                {storeData?.store_phone || "9876543210"}
              </td>
            </tr>
            {/* state other details */}
            <tr>
              <td class="label_billing_on_off">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style={{ border: "1px solid black", padding: "4px", width: '60%', textAlign: 'left', fontSize: '16px' }}>
                        &nbsp;State:{" "}
                        <strong>
                          {storeData?.store_state || "Gujarat"}
                        </strong>
                      </td>

                      <td width="16%"
                        style={{
                          padding: '5px',
                          borderLeft: "solid 1px #444444",
                          borderRight: "solid 1px #444444",
                          borderTop: "0px",
                          borderBottom: "0px",
                          lineHeight: "30px",
                          padding: '5px',
                          textAlign: 'center'
                        }}>
                        <strong>Code</strong>
                      </td>

                      <td width="16%" style={{
                        padding: '5px',
                        borderLeft: "solid 1px #444444",
                        borderRight: "solid 1px #444444",
                        borderTop: "0px",
                        borderBottom: "0px",
                        lineHeight: "30px",
                        textAlign: 'center'
                      }}>
                        <strong>
                          {gstStateCodes[
                            storeData?.store_state_code
                          ] || "24"}
                        </strong>
                      </td>

                      <td width="25%"
                        style={{
                          padding: '5px',
                          borderLeft: "solid 1px #444444",
                          borderRight: "solid 1px #444444",
                          borderTop: "0px",
                          borderBottom: "0px",
                          lineHeight: "30px",
                          textAlign: 'left'
                        }}>
                        &nbsp;<strong>Country:</strong>{" "}
                        {storeData?.store_country || "India"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {/* product details */}
        <table width="100%" border="1" cellspacing="0" cellpadding="0" class="td-gray" style={{ marginTop: "-1px" }}>
          <tbody>
            <tr>
              <td colSpan="2" style={{ padding: '20px 10px', border: 'none' }}>
                <br />
              </td>
            </tr>

            <tr class='sortable-row ui-sortable'>
              <td class='custome_bg_text_color'
                width="38px" valign="top" align="center" bgcolor="#eeeeee"
                style={{ padding: "0 5px", lineHeight: "30px", fontSize: '16px' }}>
                <strong>#</strong>
              </td>
              {/* expense type */}
              <td
                class="custom_bg_text_color"
                width="280px"
                valign="top"
                align="center"
                bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                  fontSize: '14px'
                }}>
                <strong>
                  <span id="template_product_title">
                    {customLabels?.product_items_labels?.item_sku}
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
                  fontSize: '14px'
                }}
              >
                {" "}
                <strong>
                  <span id="template_product_rate">
                    {customLabels?.product_items_labels?.rate_per_item}
                  </span>
                  (₹)
                </strong>
              </td>
              {/* taxable item */}
              <td
                class="draggable-cell custom_bg_text_color ui-sortable-handle"
                data-value="taxable_item"
                width="120px"
                align="center"
                valign="top"
                bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                  fontSize: '14px'
                }}
              >
                <strong>
                  <span id="template_product_taxable_item">
                    {customLabels?.product_items_labels?.texable_item}
                  </span>
                  (₹)
                </strong>
              </td>
              {/* gst */}
              <td
                class="draggable-cell custom_bg_text_color ui-sortable-handle"
                data-value="gst"
                width="40px"
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
                  <span id="template_product_gst">
                    {customLabels?.product_items_labels?.gst}
                  </span>{" "}
                  <br />
                  (%)
                </strong>
              </td>
              {/* cgst */}
              <td
                class="gst-type-cgst-sgst custom_bg_text_color"
                width="80px"
                valign="top"
                align="center"
                bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                  // display: cgst_igst === "igst" ? "none" : "table-cell",
                }}
              >
                {" "}
                <strong>
                  <span id="template_product_cgst">
                    {customLabels?.product_items_labels?.cgst}
                  </span>{" "}
                  <br />
                  (₹)
                </strong>
              </td>
              {/* sgst */}
              <td
                class="gst-type-cgst-sgst custom_bg_text_color"
                width="80px"
                valign="top"
                align="center"
                bgcolor="#eeeeee"
                style={{
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                  // display: cgst_igst === "igst" ? "none" : "table-cell",
                }}
              >
                {" "}
                <strong>
                  <span id="template_product_sgst">
                    {customLabels?.product_items_labels?.sgst}
                  </span>{" "}
                  <br />
                  (₹)
                </strong>
              </td>
              {/* total */}
              <td
                class="custom_bg_text_color"
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
                &nbsp;&nbsp;{" "}
                <strong>
                  <span id="template_product_total">
                    {customLabels?.product_items_labels?.total}
                  </span>{" "}
                  <br /> (₹)
                </strong>
              </td>
            </tr>

            <tr>
              <td
                width="38px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                1
              </td>

              <td width="280px" style={{ padding: "0 5px", lineHeight: "30px" }} align="left" valign="top">
                <span className="product_title_on_off_tr">
                  {expense?.expenseCategoryValue}
                </span>
                {/* <span className="product_sku_on_off_tr"> 
                  {' '} - SKU
                </span> */}
              </td>
              {/* rate per item */}
              <td
                className="cell-1"
                data-position="2"
                data-value="rate_per_item"
                width="120px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                {(expense?.rate || 0).toFixed(2)}
              </td>
              {/* tax item */}
              <td
                className="cell-1"
                data-position="4"
                data-value="taxable_item"
                width="120px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                {(expense?.rate || 0).toFixed(2)}
              </td>
              {/* gst */}
              <td
                className="cell-1"
                data-position="6"
                data-value="gst"
                width="40px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                {expense?.gstPercentage}
              </td>
              {/* cgst */}
              <td
                className="gst-type-cgst-sgst"
                width="80px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                {(
                  (expense?.cgstAmount ??
                    ((
                      expense?.gstAmount || 0) / 2 / 100) *
                    (expense?.rate || 0)).toFixed(2)
                )}
              </td>
              {/* sgst */}
              <td
                className="gst-type-cgst-sgst"
                width="80px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                {(
                  (expense?.sgstAmount ??
                    ((
                      expense?.gstAmount || 0) / 2 / 100) *
                    (expense?.rate || 0))
                )}
              </td>
              {/* total */}
              <td
                width="100px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top">
                {(
                  (expense?.rate || 0) +
                  (expense?.cgstAmount ??
                    ((expense?.gstAmount || 0) / 2 / 100) * (expense?.rate || 0)) +
                  (expense?.sgstAmount ??
                    ((expense?.gstAmount || 0) / 2 / 100) * (expense?.rate || 0))
                )}
              </td>
            </tr>

            {/* prpducr details repeat */}
            {[1, 2, 3].map((index) => (
              <tr key={index}>
                <td
                  width="38px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {index}
                </td>

                <td
                  width="280px"
                  style={{ padding: "0 5px", lineHeight: "30px" }}
                  align="left"
                  valign="top"
                >
                  <span className="product_title_on_off_tr">{"  "}</span>
                  <span className="product_sku_on_off_tr"> - </span>
                </td>

                <td
                  className="cell-1"
                  data-position="2"
                  data-value="rate_per_item"
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {" "}
                </td>

                <td
                  className="cell-1"
                  data-position="4"
                  data-value="taxable_item"
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {" "}
                </td>

                <td
                  className="cell-1"
                  data-position="6"
                  data-value="gst"
                  width="40px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {" "}
                </td>

                <td
                  className="gst-type-cgst-sgst"
                  width="80px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {" "}
                </td>

                <td
                  className="gst-type-cgst-sgst"
                  width="80px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {" "}
                </td>

                <td
                  width="100px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  {" "}
                </td>
              </tr>
            ))}

            {/* final total */}
            <tr>
              <td
                colSpan="2"
                width="362px"
                bgcolor="#eeeeee"
                style={{
                  textAlign: "center",
                  padding: "0 5px",
                  lineHeight: "30px",
                  textTransform: "uppercase",
                }}
              >
                <strong>Total</strong>
              </td>

              {/* Rate Per Item */}
              <td
                width="120px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >

              </td>

              {/* Taxable Amount */}
              <td
                width="120px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >

              </td>

              {/* GST Percentage */}
              <td
                width="40px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >

              </td>

              {/* CGST */}
              <td
                width="80px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >

              </td>

              {/* SGST */}
              <td
                width="80px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
              </td>
              <td
                width="100px"
                style={{ lineHeight: "30px" }}
                align="center"
                valign="top"
              >
                {(
                  (expense?.rate || 0) +
                  (expense?.cgstAmount ??
                    ((expense?.gstAmount || 0) / 2 / 100) * (expense?.rate || 0)) +
                  (expense?.sgstAmount ??
                    ((expense?.gstAmount || 0) / 2 / 100) * (expense?.rate || 0))
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* other details */}
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="td-gray" style={{ marginTop: "-1px" }} >
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
                    <tr id="order_note_on_off_tr">
                      <td
                        style={{ padding: "8px 0px", borderBottom: "1px solid #444444" }}
                        valign="bottom"
                      >
                        <table width="100%" cellSpacing="0" cellPadding="0" border="0" align="left">
                          <tbody>
                            <tr>
                              <td style={{ paddingLeft: "15px" }}>
                                <strong>
                                  <span id="template_order_note">
                                    {customLabels?.others_labels?.order_note}
                                    :</span>
                                </strong>{" "}
                                {customLabels?.others_labels?.order_note}
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
                                    {customLabels?.others_labels
                                      ?.total_invoice_amount_in_words}
                                  </span>
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: "5px 0px" }}>
                                {customLabels?.others_labels?.is_total_invoice_amount_in_words
                                  && "Four Thousand Ruppes only"}
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
                        &nbsp;&nbsp;{customLabels?.others_labels?.total_invoice_amount_in_words}
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
                        {(expense?.cgstAmount + expense?.sgstAmount)}&nbsp;&nbsp;&nbsp;&nbsp;
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
                        {(
                          (expense?.rate || 0) +
                          (expense?.cgstAmount ??
                            ((expense?.gstAmount || 0) / 2 / 100) * (expense?.rate || 0)) +
                          (expense?.sgstAmount ??
                            ((expense?.gstAmount || 0) / 2 / 100) * (expense?.rate || 0))
                        ).toFixed(2)}&nbsp;&nbsp;
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
                        <strong>{expense?.total}&nbsp;&nbsp;</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {/* e & eo */}
            <tr>
              <td colSpan="2" align='left'
                style={{ borderTop: '1px solid #000', padding: '5px', borderLeft: '1px solid #000', borderRight: '1px solid #000' }} >
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

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '110px 0 5px 0' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#000', fontWeight: 'bold' }}>
            <span id="thanks_for_business_on_off_tr">
              Thank you for your business
            </span>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#5E5E5E' }}  >
            <span id="generated_from_on_off_tr">
              Generated from:
              {customLabels?.store_information?.shop_domain}&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span id="page_no_on_off_tr" style={{ marginLeft: '180px' }}>Page 1 of 1</span>&nbsp;
          </div>
        </div>

      </div>
  </div>
  )
}
