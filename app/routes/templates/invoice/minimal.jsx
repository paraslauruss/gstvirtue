import numberToWords from 'number-to-words';

export const Minimal = ({  bgColor, textColor, fontFamily, logo, signature, formData, orderData, storeData, type }) => {

  const headerStyle = {
    padding:'0 5px'
  };

  function formatDate(dateString) {
          const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
          const date = new Date(dateString);
          const formattedDate = isNaN(date.getTime()) ? new Date().toLocaleDateString('en-GB', options) : date.toLocaleDateString('en-GB', options);;
          return formattedDate;
      }
  
      const gstStateCodes = {
          "AP": "37",
          "AR": "12",
          "AS": "18",
          "BR": "10",
          "CG": "22",
          "DL": "07",
          "GJ": "24",
          "HR": "06",
          "HP": "02",
          "JK": "01",
          "JH": "20",
          "KA": "29",
          "KL": "32",
          "MP": "23",
          "MH": "27",
          "MN": "14",
          "ML": "17",
          "MZ": "15",
          "NL": "13",
          "OD": "21",
          "PB": "03",
          "RJ": "08",
          "SK": "11",
          "TN": "33",
          "TS": "36",
          "TR": "16",
          "UP": "09",
          "UK": "05",
          "WB": "19",
      };
  
      const isShippingVisible = formData?.billing_shipping_labels?.hide_show_shipping_section
      const cgst_igst = formData?.product_items_labels?.cgst_igst
  
      const calculateTaxValues = (item) => {
          const taxRate = item.tax_lines?.length > 0 ? item.tax_lines[0].rate * 100 : 0;
          const taxableAmount = ((item.price / (1 + ((parseFloat(item.gst) || 0) + (parseFloat(item.cess) || 0)) / 100)) * item.current_quantity).toFixed(2);
          const gstAmount = (item.price * ((parseFloat(item.gst) || 0) / 100)).toFixed(2);
          const igstAmount = gstAmount; // Assuming IGST for inter-state sales
          const cgstRate = (parseFloat(item.gst) || 0) / 2;
          const cgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2);
          const sgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2); // SGST = 50% of GST
          const cessAmount = ((item.cess / 100) * taxableAmount).toFixed(2);
          const totalAmount = ((item.price * item.current_quantity)).toFixed(2); // Total amount after tax
          const totalAmountDiscount = ((item.price * item.current_quantity) - parseFloat(item?.total_discount)).toFixed(2); // Total amount after tax
          const totalDiscount = (parseFloat(item?.total_discount)).toFixed(2);
  
          return {
              taxRate,
              taxableAmount,
              gstAmount,
              cgstAmount,
              sgstAmount,
              cessAmount,
              totalAmount,
              totalDiscount,
              totalAmountDiscount
          };
      };
  
      let { totalAmountSum, totalQuantitySum, totalTaxableAmountSum, totalDiscountSum, totalAmountDiscountSum } = (orderData?.line_items || []).reduce((acc, item) => {
          const { totalAmount, taxableAmount, totalDiscount, totalAmountDiscount } = calculateTaxValues(item);
          acc.totalAmountSum += parseFloat(totalAmount);
          acc.totalQuantitySum += parseFloat(item.quantity);
          acc.totalTaxableAmountSum += parseFloat(taxableAmount);
          acc.totalDiscountSum += parseFloat(totalDiscount);
          acc.totalAmountDiscountSum += parseFloat(totalAmountDiscount);
          return acc;
      }, { totalAmountSum: 0, totalQuantitySum: 0, totalTaxableAmountSum: 0, totalDiscountSum: 0, totalAmountDiscountSum: 0 });
  
      if (!isNaN(parseFloat(orderData?.total_shipping_price_set?.shop_money?.amount))) {
          totalAmountDiscountSum += parseFloat(orderData?.total_shipping_price_set?.shop_money?.amount);
      }
      const roundedTotal = Math.round(totalAmountDiscountSum);
      const sign = roundedTotal >= 0 ? "+" : "-";
      const roundOff = (roundedTotal - totalAmountDiscountSum).toFixed(2);
  
      const totalAmountInWords = numberToWords.toWords(roundedTotal);
      const totalDiscountInPercentage = (totalDiscountSum / totalAmountSum) * 100;


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
                        }} >
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
                                  src={logo}
                                  alt="Company Logo"
                                  style={{
                                    maxWidth: "250px",
                                    maxHeight: "125px",
                                  }}
                                />
                              </div>
                            </td>
                            <td  width="50%" style={{ textAlign: "right", verticalAlign: "top", }} >
                              <div  style={{ display: "inline-block", textAlign: "right", }} >
                                <strong
                                  id="template_invoice_title"
                                  style={{
                                    fontSize: "20px",
                                    display: "block",
                                    marginBottom: "5px",
                                  }}>
                                  {formData?.customize_store_labels?.tax_invoice}
                                </strong>
                                <table style={{ textAlign: "right" }}>
                                  <tbody>
                                    <tr id="store_pan_no_on_off_tr">
                                        {
                                          formData?.customize_store_labels?.is_pan_no && <td>
                                          <strong id="template_store_pan_no">
                                            {formData?.customize_store_labels?.pan_no}
                                          </strong>{" "}
                                          {storeData?.pan_number}
                                        </td>
                                        }
                                    </tr>
                                    <tr id="store_gstin_on_off_tr">
                                   {
                                     formData?.customize_store_labels?.is_gstin && <td>
                                     <strong id="template_store_gstin">
                                       {formData?.customize_store_labels?.gstin}
                                     </strong>{" "}
                                      {storeData?.gst_number}
                                   </td>  
                                   }
                                    </tr>
                                    <tr id="store_iec_code_on_off_tr">
                                      {
                                        formData?.customize_store_labels?.is_iec_code && <td>
                                        <strong id="template_store_iec_code">
                                          {formData?.customize_store_labels?.iec_code}:
                                        </strong>{" "}
                                        {storeData?.iec_code}
                                      </td>
                                      }
                                    </tr>
                                    <tr id="store_cin_on_off_tr">
                                        {
                                          formData?.customize_store_labels?.is_cin && <td>
                                          <strong id="template_store_cin">
                                            {formData?.customize_store_labels?.cin}
                                          </strong>{" "}
                                          {storeData?.cin_number}
                                        </td>
                                        }
                                    </tr>
                                    <tr id="store_fssai_lic_no_on_off_tr">
                                        {
                                          formData?.customize_store_labels?.is_fssai_lic_no && <td>
                                          <strong id="template_store_fssai_lic_no">
                                            {formData?.customize_store_labels?.fssai_lic_no}
                                          </strong>{" "}
                                          {storeData?.fssai_lic_number}
                                        </td>
                                        }
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
          style={{
            margin: "20px 0",
            tableLayout: "auto", // Allow flexible layout
            wordBreak: "break-word",
          }}
        >
          <tbody>
            <tr>
              <th
                className="label_shipping_on_off"
                align="left"
                valign="top"
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  width: "50%",
                  paddingBottom: "10px",
                }}
              >
                <strong id="template_shipping_head_title">
                  {formData?.billing_shipping_labels?.ship_to_party}:
                </strong>
              </th>
              <th
                align="left"
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  width: "50%",
                  paddingBottom: "10px",
                }}
              >
                <strong id="template_billing_head_title">
                  {formData?.billing_shipping_labels?.bill_to_party}:
                </strong>
              </th>
            </tr>
            
            {/* Name */}
            <tr>
              <td
                className="label_shipping_on_off"
                style={{
                  width: "50%",
                  padding: "5px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {orderData?.customer?.shipping_address?.first_name}{" "}
                {orderData?.customer?.shipping_address?.last_name}
              </td>
              <td
                className="label_shipping_on_off"
                style={{
                  width: "50%",
                  padding: "5px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {orderData?.customer?.shipping_address?.first_name}{" "}
                {orderData?.customer?.shipping_address?.last_name}
              </td>
            </tr>

            {/* Address */}
            <tr>
              <td
                align="left"
                className="label_billing_on_off"
                valign="top"
                style={{
                  width: "50%",
                  padding: "5px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {orderData?.customer?.default_address?.address1 ||
                  "505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054"}
              </td>
              <td
                align="left"
                className="label_shipping_on_off"
                valign="top"
                style={{
                  width: "50%",
                  padding: "5px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: formData?.billing_shipping_labels?.hide_show_shipping_section
                    ? "table-cell"
                    : "none",
                }}
              >
                {orderData?.shipping_address?.address1 ||
                  "505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054"}
              </td>
            </tr>

            {/* Phone */}
            <tr className="bill_ship_phone_no_on_off_tr">
              <td
                className="label_shipping_on_off"
                style={{
                  width: "50%",
                  padding: "5px",
                  textAlign:'left'
                }}
              >
                <strong>
                  <span id="template_billing_phone">
                    {formData?.billing_shipping_labels?.billing_phone}
                  </span>
                  :
                </strong>{" "}
                {orderData?.customer?.phone || "9876543210"}
              </td>
              <td
                className="label_shipping_on_off"
                style={{
                  width: "50%",
                  padding: "5px",
                  textAlign:'left'
                }}
              >
                <strong>
                  <span id="template_billing_phone">
                    {formData?.billing_shipping_labels?.billing_phone}
                  </span>
                  :
                </strong>{" "}
                {orderData?.customer?.phone || "9876543210"}
              </td>
            </tr>

            {/* GSTIN */}
            <tr className="bill_ship_gstin_on_off_tr">
              <td
                align="left"
                className="label_billing_on_off"
                style={{
                  padding: "5px",
                  lineHeight: "30px",
                  display: formData?.billing_shipping_labels?.hide_show_gstin
                    ? "table-cell"
                    : "none",
                  width: "50%",
                }}
              >
                <strong>
                  <span id="template_billing_gstin">
                    {formData?.billing_shipping_labels?.billing_gstin}
                  </span>
                  :
                </strong>{" "}
                {orderData?.customer?.gst_number}
              </td>
              <td
                align="left"
                className="label_shipping_on_off"
                style={{
                  padding: "5px",
                  lineHeight: "30px",
                  display:
                    formData?.billing_shipping_labels?.hide_show_shipping_section &&
                    formData?.billing_shipping_labels?.hide_show_gstin
                      ? "table-cell"
                      : "none",
                  width: "50%",
                }}
              >
                <strong>
                  <span id="template_shipping_gstin">
                    {formData?.billing_shipping_labels?.shipping_gstin}
                  </span>
                  :
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        {/* order details */}
      <table style={{textAlign:'left', margin:'0'}}> 
        <tr>
          <td style={{textAlign:'left'}}>
            <strong id="template_order_no">{formData?.customize_store_labels?.order_no} :</strong>
            <span id="order_no_on_off_tr">{formData?.customize_store_labels?.is_order_no && orderData?.order_number}</span>
          </td>
        </tr>

        <tr>
          <td style={{textAlign:'left'}}>
            <strong id="template_order_date">{formData?.customize_store_labels?.order_date} :</strong>
            <span id="order_date_on_off_tr">{formData?.customize_store_labels?.is_order_date &&  (formatDate(orderData?.date))}</span>
          </td>
        </tr>

        <tr>
          <td style={{textAlign:'left'}}>
            <strong id="template_invoice_no">{formData?.customize_store_labels?.invoice_no}:</strong>
            <span id="invoice_no_on_off_tr">{formData?.customize_store_labels?.is_invoice_no && orderData?.invoice_number}</span>
          </td>
        </tr>

        <tr>
          <td style={{textAlign:'left'}}>
            <strong id="template_invoice_date">{formData?.customize_store_labels?.invoice_date}:</strong>
            <span id="invoice_date_on_off_tr">{formData?.customize_store_labels?.is_invoice_date && new Date().toLocaleDateString('en-GB')}</span>
          </td>
        </tr>
      </table>

        {/* products price details */}
      <table width="100%" border="1" cellspacing="0" cellpadding="0" align="center" style={{ margin: '0px auto', borderColor: '#ddd', borderCollapse: 'collapse' , marginTop:'30px'}}>
      <tbody>
        <tr className="sortable-row ui-sortable" style={{height:'60px'}}>
          <th className="custom_bg_text_color" width="38px" style={{ padding: '0 5px' }}>#</th>
          <th className="custom_bg_text_color" width="280px" style={{ padding: '0 5px' }}>{formData?.product_items_labels?.item_sku}</th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="qty" width="40px" style={headerStyle}>
            <strong id="template_product_quantity">{formData?.product_items_labels?.qty}</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="rate_per_item" width="120px" style={headerStyle}>
            <strong><span id="template_product_rate">{formData?.product_items_labels?.rate_per_item}</span>(₹)</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color product_discount_on_off_tr ui-sortable-handle" data-value="discount_item" width="80px"style={headerStyle}>
            <strong><span id="template_product_discount">{formData?.product_items_labels?.discount_item} </span> (₹)</strong>
          </th>
          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="taxable_item" width="120px" style={headerStyle}>
            <strong><span id="template_product_taxable_item">{formData?.product_items_labels?.texable_item}</span> (₹)</strong>
          </th>
          {/* hsn */}
         {
           formData?.product_items_labels?.hide_show_product_hsn && 
          <th className="draggable-cell custom_bg_text_color product_hsn_on_off_tr ui-sortable-handle" data-value="hsn" width="80px" style={headerStyle}>
              <strong id="template_product_hsn"> 
                <span id="template_product_hsn">
                    {formData?.product_items_labels?.hsn}
                  </span>
              </strong>
          </th>
         }

          <th className="draggable-cell custom_bg_text_color ui-sortable-handle" data-value="gst" width="40px" style={headerStyle}>
            <strong><span id="template_product_gst">{formData?.product_items_labels?.gst}</span>(%) </strong>
          </th>

          <th className="gst-type-cgst-sgst custom_bg_text_color" width="80px" style={{ padding: '0 5px' }}>
            <strong><span id="template_product_cgst">{formData?.product_items_labels?.cgst}</span> (₹) </strong>
          </th>
          <th className="gst-type-cgst-sgst custom_bg_text_color" width="80px" style={{ padding: '0 5px' }}>
            <strong><span id="template_product_sgst">{formData?.product_items_labels?.sgst}</span> (₹) </strong>
          </th>
          <th className="gst-type-igst custom_bg_text_color" width="80px" style={{ padding: '0px 5px', display: 'none' }}>
            <strong><span id="template_product_igst">{formData?.product_items_labels?.igst}</span> (₹) </strong>
          </th>
          <th className="custom_bg_text_color" width="80px" style={{ padding: '0 5px' }}>
            <strong><span id="template_product_cess">{formData?.product_items_labels?.cess}</span> (₹) </strong>
          </th>
          <th className="custom_bg_text_color" width="100px" style={{ padding: '0 5px' }} align="right">
            <strong><span id="template_product_total">{formData?.product_items_labels?.total}</span> (₹) </strong>
          </th>
        </tr>

         {type === "order" ? (
          <>
            {orderData?.line_items?.map((item, index) => {
                const taxableAmount = (
                  (item.price /
                    (1 +
                      ((parseFloat(item.gst) || 0) +
                        (parseFloat(item.cess) || 0)) /
                        100)) *
                  item.current_quantity
                ).toFixed(2);
                const cgstRate = (parseFloat(item.gst) || 0) / 2;
                const cgstAmount = ((cgstRate / 100) * taxableAmount).toFixed(
                  2,
                );

                const sgstRate = (parseFloat(item.gst) || 0) / 2;
                const sgstAmount = ((sgstRate / 100) * taxableAmount).toFixed(
                  2,
                );

                const cessAmount = ((item.cess / 100) * taxableAmount).toFixed(
                  2,
                );
                const totalAmount = (
                  item.price * item.current_quantity -
                  item?.total_discount
                ).toFixed(2);

                const igstRate = parseFloat(item.gst) || 0;
                const igstAmount = ((igstRate / 100) * taxableAmount).toFixed(
                  2,
                );
                return (
                  <tr style={{height:'40px'}}>
                  {/* no. */}
                  <td width="38px" style={{ padding: '0 5px' }}>1</td>
                  {/* item name */}
                  <td width="280px" style={{ padding: '0 5px' }}>
                    <span className="product_title_on_off_tr">
                      {formData?.product_items_labels?.hide_show_product_title && item?.name}
                    </span>
                    <span className="product_sku_on_off_tr"> - 
                      {" "}
                        {formData?.product_items_labels?.hide_show_product_title &&
                          formData?.product_items_labels?.hide_show_product_sku && <span> - </span>}{" "}
                        {formData?.product_items_labels?.hide_show_product_sku && item?.sku}</span>
                   </td>
        
                  <td className="cell-1" data-position="1" data-value="qty" width="40px" style={{ padding: '0 5px' }}>\
                    {item?.quantity}
                  </td>
        
                  <td className="cell-1" data-position="2" data-value="rate_per_item" width="120px" style={{ padding: '0 5px' }}>
                    {item?.price}
                  </td>
        
                  {formData?.product_items_labels?.hide_show_product_discount && (
                    <td className="cell-1 product_discount_on_off_tr" data-position="3" data-value="discount_item" width="80px" style={{ padding: '0 5px' }}>
                    {item?.total_discount}
                  </td>
                  )}
        
                  <td className="cell-1" data-position="4" data-value="taxable_item" width="120px" style={{ padding: '0 5px' }}>
                    {taxableAmount}
                  </td>
        
                  {formData?.product_items_labels?.hide_show_product_hsn && (
                    <td className="cell-1 product_hsn_on_off_tr" data-position="5" data-value="hsn" width="80px" style={{ padding: '0 5px' }}>
                     {item?.hsn}
                    </td>
                  )}
        
                  <td className="cell-1" data-position="6" data-value="gst" width="40px" style={{ padding: '0 5px' }}>
                     {item.gst}
                  </td>
        
                  <td className="gst-type-cgst-sgst" width="80px" 
                  style={{ padding: '0 5px', display: cgst_igst === "igst" ? "none" : "table-cell", }}>
                    {cgstAmount}
                  </td>
        
                  <td className="gst-type-cgst-sgst" width="80px" 
                      style={{ padding: '0 5px' , display: cgst_igst === "igst" ? "none" : "table-cell",}}>
                     {sgstAmount}
                  </td>
        
                  <td className="gst-type-igst" width="80px" 
                      style={{ padding: '0px 5px', display: cgst_igst === "igst" ? "table-cell" : "none", }}>
                        {igstAmount}
                  </td>
        
                  <td width="80px" style={{ padding: '0 5px' }}>
                    ({item?.cess}) {cessAmount}
                  </td>
        
                  <td width="100px" style={{ padding: '0 5px' }} align="right">
                  {totalAmount}&nbsp;&nbsp;
                  </td>
                </tr>
                );
              })}
          </>
         ) :(
           <>
             <tr>
                <td
                  width="38px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  2
                </td>
                <td
                  width="280px"
                  style={{ padding: "0 5px", lineHeight: "30px" }}
                  align="left"
                  valign="top"
                >
                  <span class="product_title_on_off_tr">T-Shirt</span>
                  <span class="product_sku_on_off_tr"> - SKU</span>
                </td>
                <td
                  class="cell-2"
                  data-position="1"
                  data-value="qty"
                  width="44px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  5
                </td>
                <td
                  class="cell-2"
                  data-position="2"
                  data-value="rate_per_item"
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  500.00
                </td>
                {formData?.product_items_labels?.hide_show_product_discount && (
                  <td
                    class="cell-2 product_discount_on_off_tr"
                    data-position="3"
                    data-value="discount_item"
                    width="80px"
                    style={{ lineHeight: "30px" }}
                    align="center"
                    valign="top"
                  >
                    0.00
                  </td>
                )}
                <td
                  class="cell-2"
                  data-position="4"
                  data-value="taxable_item"
                  width="120px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  2293.58
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    class="cell-2 product_hsn_on_off_tr"
                    data-position="5"
                    data-value="hsn"
                    width="80px"
                    style={{ lineHeight: "30px" }}
                    align="center"
                    valign="top"
                  >
                    665854
                  </td>
                )}
                <td
                  class="cell-2"
                  data-position="6"
                  data-value="gst"
                  width="40px"
                  style={{ lineHeight: "30px" }}
                  align="center"
                  valign="top"
                >
                  9
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                  align="center"
                  valign="top"
                >
                  103.21
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                  align="center"
                  valign="top"
                >
                  103.21
                </td>
                <td
                  class="gst-type-igst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "table-cell" : "none",
                  }}
                  align="center"
                  valign="top"
                >
                  206.42
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
                  2500.00&nbsp;&nbsp;
                </td>
              </tr>

              <tr>
                <td width="38px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td
                  width="280px"
                  style={{ padding: "0 5px", lineHeight: "30px" }}
                >
                  &nbsp;
                </td>
                <td width="44px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    width="80px"
                    class="product_discount_on_off_tr"
                    style={{ lineHeight: "30px" }}
                  >
                    &nbsp;
                  </td>
                )}
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    class="product_hsn_on_off_tr"
                    width="80px"
                    style={{ lineHeight: "30px" }}
                  >
                    &nbsp;
                  </td>
                )}
                <td width="40px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  class="gst-type-igst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "table-cell" : "none",
                  }}
                >
                  &nbsp;
                </td>
                <td width="100px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
              </tr>
              
              <tr>
                <td width="38px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td
                  width="280px"
                  style={{ padding: "0 5px", lineHeight: "30px" }}
                >
                  &nbsp;
                </td>
                <td width="44px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    width="80px"
                    class="product_discount_on_off_tr"
                    style={{ lineHeight: "30px" }}
                  >
                    &nbsp;
                  </td>
                )}
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    class="product_hsn_on_off_tr"
                    width="80px"
                    style={{ lineHeight: "30px" }}
                  >
                    &nbsp;
                  </td>
                )}
                <td width="40px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  class="gst-type-igst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "table-cell" : "none",
                  }}
                >
                  &nbsp;
                </td>
                <td width="100px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td width="38px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td
                  width="280px"
                  style={{ padding: "0 5px", lineHeight: "30px" }}
                >
                  &nbsp;
                </td>
                <td width="44px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    width="80px"
                    class="product_discount_on_off_tr"
                    style={{ lineHeight: "30px" }}
                  >
                    &nbsp;
                  </td>
                )}
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                {formData?.product_items_labels?.hide_show_product_hsn && (
                  <td
                    class="product_hsn_on_off_tr"
                    width="80px"
                    style={{ lineHeight: "30px" }}
                  >
                    &nbsp;
                  </td>
                )}
                <td width="40px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  class="gst-type-cgst-sgst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "none" : "table-cell",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  class="gst-type-igst"
                  width="80px"
                  style={{
                    lineHeight: "30px",
                    display: cgst_igst === "igst" ? "table-cell" : "none",
                  }}
                >
                  &nbsp;
                </td>
                <td width="100px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
                <td width="120px" style={{ lineHeight: "30px" }}>
                  &nbsp;
                </td>
              </tr>
           </>
         )}
        <tr></tr>
      </tbody>
    </table>

    <table width="100%" border="1" cellSpacing="0" cellPadding="0" style={{ margin: '0px auto', borderColor: '#ddd', borderCollapse: 'collapse', borderTop: '0',}}>
      <tbody>
        <tr>
          <td width="50%"  style={{ verticalAlign: 'top', padding: '5px 10px' }} >
            <div id="order_note_on_off_tr">
              <strong>
                <span id="template_order_note">{formData?.others_labels?.order_note} : </span>
              </strong>
              {orderData?.note}
            </div>

            <div id="payment_mode_on_off_tr">
              <strong style={{ marginTop: '5px' }}>
                <span id="template_payment_mode"> 
                  {formData?.others_labels?.payment_mode}
              </span>{" "} : 
              </strong>
              {formData?.others_labels?.is_payment_mode && (
                <div>
                  {Array.isArray(
                    orderData?.payment_gateway_names,
                  ) &&
                  orderData?.payment_gateway_names.length > 0
                    ? orderData.payment_gateway_names[0]
                    : "N/A"}
                </div>
             )}
            </div>

            <div id="terms_conditions_on_off_tr" style={{ padding: '5px 0' }}>
              <strong style={{ marginTop: '5px' }}>
                <span id="template_terms_conditions"> {formData?.others_labels?.term_and_conditions}</span>
              </strong>
              <br />
              <span id="template_store_terms_conditions">
              {formData?.others_labels
                ?.is_term_and_conditions &&
                formData?.store_information
                  ?.terms_and_conditions}
              </span>
            </div>

            <div id="total_amount_in_words_on_off_tr">
              <strong>
                <span id="template_total_amount_in_words">
                {
                  formData?.others_labels
                    ?.total_invoice_amount_in_words
                }
                </span>
              </strong>
              <br />
              {formData?.others_labels
                ?.is_total_invoice_amount_in_words &&
                "Four Thousand Rupees Only"}
            </div>
          </td>

          <td width="50%" align="right" style={{ verticalAlign: 'top', padding: '5px 10px' }} >
            <div>
              <strong>Total Amount before Tax(₹):</strong> 
            </div>
            <div>
              <strong> &nbsp;&nbsp;Total Tax Amount(₹):</strong> 72.04
            </div>
            <div>
              <strong>Discount %: </strong> 
              {" "}
              {(totalAmountDiscountSum - totalTaxableAmountSum).toFixed(
                2,
              )}{" "}
              &nbsp;&nbsp;
              <br />
              <strong>Discount (₹):  {totalDiscountInPercentage.toFixed(2)}&nbsp;&nbsp;</strong>
            </div>
            <div>
              <strong>Shipping Discount (₹):</strong> {" "}
              -&nbsp;&nbsp;
            </div>
            <div>
              <strong> &nbsp;&nbsp;Shipping Amount(₹): </strong>
             
              {" "}
              {
                orderData?.total_shipping_price_set?.shop_money?.amount
              }{" "}
              &nbsp;&nbsp;
            </div>
            <div>
              <strong>Total Amount After Tax(₹):</strong> 
            </div>
            <div>
              <strong>Round Off:</strong> (-){" "}
              {roundOff}&nbsp;&nbsp;
            </div>
            <div>
              <strong>TOTAL(₹):</strong> <strong>{roundedTotal.toFixed(2)}&nbsp;&nbsp;</strong>
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
            For, <span id="template_shop_name_footer">{formData?.store_information?.company_legal_name}</span>
          </strong>{" "}
          &nbsp;&nbsp;
          <br />
          <div className="crop-element-wrap"  data-toggle="modal" data-target="#signatureCropModal">
            {signature}
          </div>
            <br />
            <span id="template_no_signature_text" style={{ fontSize: '12px', display: 'block' }} >
            {formData?.others_labels?.this_is_a_computer_generated_invoice_and_does_not_require_a_signature
             }
            </span>
          </td>

          <td width="33.33%" align="center" style={{ textAlign: 'center' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {formData?.others_labels?.hide_show_financial_status && (
                <img
                  id="financial_status_on_off_tr"
                  src="https://gst.webplanex.biz/images/paid_imag.png"
                  alt=""
                  width="150"
                  height="70"
                />
              )}

            <div id="qr_code_on_off_tr"
             style={{ width: '100px', textAlign: 'center' }}>
              {formData?.others_labels?.hide_show_qr_code_image && (
                  <img src="data:image/png;base64, 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" />
                )}
              {formData?.others_labels?.hide_show_qr_code_image && (
                  <span style={{ fontSize: "10px" }}>Scan to download</span>
                )}
            </div>
          </td>

          <td  width="33.33%"  align="right" style={{ verticalAlign: 'top', textAlign: 'right' }} >
            <span id="template_e_and_o_e"> {formData?.others_labels?.e_and_o_e}</span>
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
      {formData?.footer_labels?.is_thank_you_for_your_business && (
            <span id="thanks_for_business_on_off_tr">
              {formData?.footer_labels?.thank_you_for_your_business}
            </span>
       )}
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
