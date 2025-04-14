import numberToWords from 'number-to-words';
import React, {useState} from 'react';


export const Modern = ({ bgColor, textColor, fontFamily, logo, signature, formData, orderData, storeData, type }) => {

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
    
        const [isOpen, setIsOpen] = useState(false);
        const [selectedFile, setSelectedFile] = useState("https://gst.webplanex.biz/images/logo_1739353164.jpg");
        
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setSelectedFile(URL.createObjectURL(file));
            }       
        };
        
    return (
       <div  id="invoice"  style={{ fontFamily: fontFamily, fontSize: "14px", fontWeight: "normal" }}>
                <div className='card' style={{position:'relative', display:'flex',flexDirection:'column',minWidth:'0',wordWrap:'break-word',backgroundColor:'#fff',backgroundClip:'border-box'}}>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>
                                    {/* logo part */}
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                            <td valign="top" style={{ padding: "0px 2px 10px 0" }}>
                                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                                <tr>
                                                    {/* Left Section - Logo */}
                                                    <td width="50%" valign="bottom">
                                                    <div
                                                        className="crop-element-wrap crop-element-section crop-element-left"
                                                        style={{ width: "250px" }}
                                                        data-toggle="modal"
                                                        data-target="#imageCropModal"
                                                    >
                                                        <img
                                                        src="https://gst.webplanex.biz/images/logo_1739353164.jpg"
                                                        alt="Company Logo"
                                                        style={{ maxWidth: "250px", maxHeight: "125px" }}
                                                        />
                                                        <div
                                                        className="crop-overlay overlay-right-logo justify-content-center"
                                                        
                                                        >
                                                        <div className="crop-overlay-text" style={{fontSize:'14px'}}>
                                                            Click to change company logo
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </td>

                                                    {/* Center Section - Invoice Title */}
                                                    <td
                                                    width="30%"
                                                    valign="bottom"
                                                    align="center"
                                                    style={{  fontSize: "16px",fontWeight: "normal", fontFamily: fontFamily, }} >
                                                      <span id="template_invoice_title">
                                                          {formData?.customize_store_labels?.tax_invoice}
                                                      </span>
                                                    </td>

                                                    {/* Right Section - Original Label */}
                                                    <td
                                                        id="template_original"
                                                        width="20%"
                                                        valign="bottom"
                                                        align="right"
                                                        style={{ fontSize: "16px", fontWeight: "bold" }}
                                                    >
                                                        {formData?.customize_store_labels?.original}&nbsp;
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                    {/* Invoice details  */}
                                    <tr>
                                    <td valign="top">
                                        <table
                                        width="100%"
                                        border="0"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        style={{
                                            border: "1px solid #000",
                                            borderBottom: "0",
                                            fontSize:'14px',
                                            fontFamily:'Inter'
                                        }}>
                                        <tbody>
                                            <tr>
                                            {/* Left Section - Branch and Billing Details */}
                                            <td
                                                width="50%"
                                                rowSpan="2"
                                                align="left"
                                                valign="top"
                                                style={{
                                                padding: "3px 10px",
                                                borderRight: "1px solid #000",
                                                }}
                                            >
                                                <div>
                                                <strong>
                                                    <strong id="template_brand_name">
                                                       {formData?.store_information?.branch_name}
                                                    </strong>
                                                <br />
                                                </strong>
                                                </div>
                                                <div>
                                                <strong>Bill By:</strong>
                                                <br />
                                                <span id="template_shop_name">  {formData?.store_information?.company_legal_name} </span>
                                                <br />
                                                <span id="template_shop_address">
                                                     {formData?.store_information?.store_address}
                                                </span>
                                                <br />
                                                </div>
                                                <div style={{ paddingTop: "10px" }}> 
                                                    <span id="store_gstin_on_off_tr">
                                                        {formData?.customize_store_labels?.is_gstin && (
                                                        <strong>
                                                            <span id="template_store_gstin">
                                                            {formData?.customize_store_labels?.gstin}
                                                            </span>{" "}
                                                            : 22ABCDE1234F1Z9
                                                        </strong>
                                                        )}
                                                    </span>
                                               <br/>
                                                <span id="store_pan_no_on_off_tr" style={{ fontSize: "12px" }} >
                                                    <span id="template_store_pan_no">
                                                    <strong style={{ fontSize: "12px" }}>
                                                            {" "}
                                                            <span id="template_store_pan_no">
                                                            {formData?.customize_store_labels?.pan_no}
                                                            </span>{" "}
                                                            : ABCDE1234F
                                                        </strong>
                                                        &nbsp;
                                                     </span>
                                                </span>
                                                &nbsp;
                                                {formData?.customize_store_labels?.is_iec_code && (
                                                    <div id="store_iec_code_on_off_tr">
                                                    
                                                    <strong>
                                                        <span id="template_store_iec_code">
                                                        {formData?.customize_store_labels?.iec_code}
                                                        </span>{" "}
                                                        : 1234567890
                                                    </strong>
                                                    </div>
                                                )}
                                                {formData?.customize_store_labels?.is_cin && (
                                                        <div id="store_cin_on_off_tr">
                                                        <strong>
                                                    
                                                            <span id="template_store_cin">
                                                            {formData?.customize_store_labels?.cin}
                                                            </span>{" "}
                                                            : U12345MH2020PLC678901
                                                        </strong>
                                                        </div>
                                                    )}
                                                 {formData?.customize_store_labels?.is_fssai_lic_no && (
                                                        <div id="store_fssai_lic_no_on_off_tr">
                                                       
                                                        <strong style={{ fontSize: "12px" }}>
                                                            {" "}
                                                            <span id="template_store_fssai_lic_no">
                                                            {formData?.customize_store_labels?.fssai_lic_no}
                                                            </span>{" "}
                                                            : 10012021000000
                                                        </strong>
                                                        &nbsp;
                                                        </div>
                                                    )}
                                                <span id="storeEmailID">Email :</span>{" "}
                                                <span id="template_store_email"> {formData?.store_information?.store_email}</span>
                                                <br />
                                                <span id="template_contact_person"></span>
                                                <span></span>
                                                <span id="template_shop_phone"> {formData?.store_information?.store_phone}</span>
                                                </div>
                                            </td>

                                            {/* Middle Section - Invoice Number */}
                                            <td
                                                width="30%"
                                                align="left"
                                                valign="top"
                                                height="60px"
                                                style={{
                                                padding: "3px 10px",
                                                borderLeft: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                                }}
                                            >     &nbsp;&nbsp;
                                                <span id="template_invoice_no">
                                                    {formData?.customize_store_labels?.invoice_no}
                                                </span>: <br />
                                                <strong id="invoice_no_on_off_tr">
                                                {formData?.customize_store_labels?.is_invoice_no &&
                                                    (orderData?.invoice_number || "#1048")}
                                                </strong>
                                            </td>

                                            {/* Right Section - Invoice Date */}
                                            <td
                                                width="20%"
                                                align="left"
                                                valign="top"
                                                height="60px"
                                                style={{
                                                padding: "3px 10px",
                                                borderLeft: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                                }}
                                            >
                                                <span id="template_invoice_date">
                                                    {formData?.customize_store_labels?.invoice_date}    
                                                </span> 
                                                :{" "}
                                                <strong id="invoice_date_on_off_tr">
                                                     {formData?.customize_store_labels?.is_invoice_date &&
                                                      new Date().toLocaleDateString("en-GB")}
                                                </strong>
                                            </td>
                                            </tr>

                                            {/* Second Row - Order and Payment Details */}
                                            <tr>
                                            <td
                                                align="left"
                                                valign="top"
                                                style={{ padding: "3px 10px" }}
                                            >
                                                <span id="template_order_no">
                                                    {formData?.customize_store_labels?.order_no}
                                                </span>: {" "}<br />
                                                <strong id="order_no_on_off_tr">
                                                     {formData?.customize_store_labels?.is_order_no &&
                                                    (orderData?.order_number || "045")}
                                                </strong>
                                                <br />
                                                <br />
                                                <span id="template_order_date">
                                                   {formData?.customize_store_labels?.order_date}    
                                                </span>:{" "}
                                                <strong id="order_date_on_off_tr">
                                                        {formData?.customize_store_labels?.is_order_date &&
                                                        formatDate(orderData?.date)}
                                                </strong>
                                            </td>
                                            <td
                                                align="left"
                                                valign="top"
                                                style={{
                                                padding: "3px 10px",
                                                borderLeft: "1px solid #000",
                                                }}
                                            >
                                            <span id="payment_mode_on_off_tr">
                                              <span id="template_payment_mode">
                                                <strong>
                                                    <span id="template_payment_mode">
                                                    {formData?.others_labels?.payment_mode}
                                                    </span>{" "}
                                                    :{" "}
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
                                                </span>
                                                <br />
                                                </span>
                                                <span id="template_transport_mode"> 
                                                    {formData?.customize_store_labels?.transport_mode}  
                                                </span>: {" "}
                                                <span id="transport_mode_on_off_tr">
                                                <strong> 
                                                    {formData?.customize_store_labels?.is_transport_mode && " -"}
                                                     &nbsp;&nbsp;
                                                </strong>
                                                </span>
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                    {/* shipping bill details  */}
                                    <tr>
                                    <td valign="top">
                                        <table
                                        width="100%"
                                        border="0"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        style={{
                                            border: "1px solid #000",
                                            fontFamily:'Inter',
                                            fontSize:'14px'
                                        }}
                                        >
                                        <tbody>
                                            <tr>
                                            {/* BILL TO PARTY */}
                                            <td
                                                width="50%"
                                                align="left"
                                                valign="top"
                                                style={{
                                                padding: "3px 10px",
                                                borderRight: "1px solid #000",
                                                }}
                                            >
                                                <div>
                                                <span id="template_billing_head_title">
                                                    {formData?.billing_shipping_labels?.bill_to_party}
                                                </span>
                                                :- <br />
                                                <br />
                                                <span className="bill_ship_phone_no_on_off_tr" style={{
                                                        border: "0",
                                                        lineHeight: "30px",
                                                        display: formData?.billing_shipping_labels
                                                        ?.hide_show_phone
                                                        ? "table-cell"
                                                        : "none",
                                                    }}>
                                                     <strong>
                                                        <span id="template_billing_phone">
                                                        {formData?.billing_shipping_labels?.billing_phone}
                                                        </span>
                                                        :
                                                    </strong>{" "}
                                                        {orderData?.customer?.phone || "9876543210"}
                                                    <br />
                                                </span>
                                                <br />
                                                <span className="bill_ship_gstin_on_off_tr" 
                                                style={{
                                                        padding: "0 5px",
                                                        lineHeight: "30px",
                                                        display: formData?.billing_shipping_labels?.hide_show_gstin
                                                        ? "table-cell"
                                                        : "none",
                                                    }}>
                                                        <strong>
                                                            <span id="template_billing_gstin">
                                                            {formData?.billing_shipping_labels?.billing_gstin}
                                                            </span>
                                                            :
                                                        </strong>{" "}
                                                        {orderData?.customer?.gst_number}
                                                    <br />
                                                </span>
                                                <strong>State Name</strong> : {orderData?.customer?.default_address?.province}{" "}
                                                <span style={{ paddingLeft: "30px" }}>
                                                    <strong>Code</strong> :  {
                                                        gstStateCodes[
                                                        orderData?.customer?.default_address?.province_code
                                                        ]
                                                    }
                                                 </span>{" "}
                                                <span style={{ paddingLeft: "30px" }}>
                                                    <strong>Country</strong> :  {orderData?.customer?.default_address?.country_name}
                                                </span>
                                                </div>
                                            </td>

                                            {/* SHIP TO PARTY */}
                                            <td
                                                width="30%"
                                                align="left"
                                                valign="top"
                                                style={{
                                                padding: "3px 10px",
                                                borderLeft: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                                fontSize:'14px',
                                                fontFamily:'Inter'
                                                }}>
                                                <span id="template_shipping_head_title">
                                                    {formData?.billing_shipping_labels?.ship_to_party}
                                                </span>
                                                :<br />
                                                <br />
                                                <span className="bill_ship_phone_no_on_off_tr" style={{
                                                        border: "0",
                                                        lineHeight: "30px",
                                                        display: formData?.billing_shipping_labels
                                                        ?.hide_show_phone
                                                        ? "table-cell"
                                                        : "none",
                                                    }}>
                                                   <strong>
                                                        <span id="template_shipping_phone">
                                                        {formData?.billing_shipping_labels?.shipping_phone}
                                                        </span>
                                                        :
                                                    </strong>{" "}
                                                    {orderData?.billing_address?.phone || "9876543210"}
                                                <br />
                                                </span>
                                                <br />
                                                <span className="bill_ship_gstin_on_off_tr"  
                                                style={{
                                                    padding: "0 5px",
                                                    lineHeight: "30px",
                                                    display: formData?.billing_shipping_labels?.hide_show_gstin
                                                    ? "table-cell"
                                                    : "none",
                                                }}>
                                                <strong>
                                                    <span id="template_billing_gstin">
                                                       {formData?.billing_shipping_labels?.billing_gstin}
                                                    </span>
                                                    :
                                                </strong>{" "}
                                                {orderData?.customer?.gst_number}
                                                <br />
                                                </span>
                                                <strong>State Name</strong> : {orderData?.customer?.default_address?.province}{" "}
                                                <span style={{ paddingLeft: "30px" }}>
                                                <strong>Code</strong> : {
                                                        gstStateCodes[
                                                        orderData?.customer?.default_address?.province_code
                                                        ]
                                                    }
                                                </span>
                                                <br />
                                                <strong>Country</strong> {" "}
                                                    {orderData?.customer?.default_address?.country_name}  
                                                </td>

                                            {/* DATE & PLACE OF SUPPLY */}
                                            <td
                                                width="20%"
                                                align="left"
                                                valign="top"
                                                style={{
                                                padding: "3px 10px",
                                                borderLeft: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                                }}
                                            >
                                                <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                                    <tr>
                                                    <td valign="top" style={{ paddingBottom: "10px" }}>
                                                        <span id="template_date_of_supply">
                                                           {formData?.customize_store_labels?.date_of_supply}
                                                        </span>: {" "}
                                                        <strong id="date_of_supply_on_off_tr">
                                                            {formData?.customize_store_labels?.is_date_of_supply &&
                                                             formatDate(orderData?.processed_at)}
                                                        </strong>
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                    <td valign="top" style={{ paddingBottom: "10px" }}>
                                                        <span id="template_place_of_supply">
                                                            {formData?.customize_store_labels?.place_of_supply}
                                                        </span>:
                                                        <strong id="place_of_supply_on_off_tr">
                                                             {formData?.customize_store_labels?.is_place_of_supply &&
                                                              (orderData?.shipping_address?.city || "Rajkot")}
                                                        </strong>
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
                                    {/* product details */}
                                    <tr>
                                    <table
                                        width="100%"
                                        border="1"
                                        cellspacing="0"
                                        cellpadding="0"
                                        class="td-gray"
                                        style={{ marginTop: "-1px" }}
                                    >
                                        <tbody>
                                        <tr class="sortable-row ui-sortable">
                                            <td
                                            class="custom_bg_text_color"
                                            width="38px"
                                            valign="top"
                                            align="center"
                                            bgcolor="#eeeeee"
                                            style={{ padding: "0 5px", lineHeight: "30px",fontSize:'14px' }}
                                            >
                                            <strong>#</strong>
                                            </td>
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
                                                fontSize:'14px'
                                            }}
                                            >
                                            <strong>
                                                <span id="template_product_title">
                                                {formData?.product_items_labels?.item_sku}
                                                </span>
                                            </strong>
                                            </td>
                                            <td
                                            class="draggable-cell custom_bg_text_color ui-sortable-handle"
                                            data-value="qty"
                                            width="40px"
                                            align="center"
                                            valign="top"
                                            bgcolor="#eeeeee"
                                            style={{
                                                padding: "0 5px",
                                                lineHeight: "30px",
                                                textTransform: "uppercase",
                                                fontSize:'14px'
                                            }}
                                            >
                                            <strong>
                                                <span id="template_product_quantity">
                                                {formData?.product_items_labels?.qty}
                                                </span>
                                            </strong>
                                            </td>
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
                                                fontSize:'14px'
                                            }}
                                            >
                                            {" "}
                                            <strong>
                                                <span id="template_product_rate">
                                                {formData?.product_items_labels?.rate_per_item}
                                                </span>
                                                (₹)
                                            </strong>
                                            </td>
                                            {formData?.product_items_labels?.hide_show_product_discount && (
                                            <td
                                                class="draggable-cell custom_bg_text_color product_discount_on_off_tr ui-sortable-handle"
                                                data-value="discount_item"
                                                width="80px"
                                                align="center"
                                                valign="top"
                                                bgcolor="#eeeeee"
                                                style={{
                                                padding: "0 5px",
                                                lineHeight: "30px",
                                                textTransform: "uppercase",
                                                 fontSize:'14px'
                                                }}
                                            >
                                                <strong>
                                                <span id="template_product_discount" style={{ fontSize:'14px'}}>
                                                    {formData?.product_items_labels?.discount_item}
                                                </span>
                                                (₹)
                                                </strong>
                                            </td>
                                            )}
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
                                                 fontSize:'14px'
                                            }}
                                            >
                                            <strong>
                                                <span id="template_product_taxable_item">
                                                {formData?.product_items_labels?.texable_item}
                                                </span>
                                                (₹)
                                            </strong>
                                            </td>
                                            {formData?.product_items_labels?.hide_show_product_hsn && (
                                            <td
                                                class="draggable-cell custom_bg_text_color product_hsn_on_off_tr ui-sortable-handle"
                                                data-value="hsn"
                                                width="80px"
                                                align="center"
                                                valign="top"
                                                bgcolor="#eeeeee"
                                                style={{
                                                padding: "0 5px",
                                                lineHeight: "30px",
                                                textTransform: "uppercase",
                                                 fontSize:'14px'
                                                }}
                                            >
                                                {" "}
                                                <strong>
                                                <span id="template_product_hsn">
                                                    {formData?.product_items_labels?.hsn}
                                                </span>
                                                </strong>
                                            </td>
                                            )}
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
                                                 fontSize:'14px'
                                            }}
                                            >
                                            {" "}
                                            <strong>
                                                <span id="template_product_gst">
                                                {formData?.product_items_labels?.gst}
                                                </span>{" "}
                                                <br />
                                                (%)
                                            </strong>
                                            </td>

                                            <td
                                            class="gst-type-cgst-sgst custom_bg_text_color"
                                            width="80px"
                                            valign="top"
                                            align="center"
                                            bgcolor="#eeeeee"
                                            style={{
                                                 fontSize:'14px',
                                                padding: "0 5px",
                                                lineHeight: "30px",
                                                textTransform: "uppercase",
                                                display: cgst_igst === "igst" ? "none" : "table-cell",
                                            }}
                                            >
                                            {" "}
                                            <strong>
                                                <span id="template_product_cgst">
                                                {formData?.product_items_labels?.cgst}
                                                </span>{" "}
                                                <br />
                                                (₹)
                                            </strong>
                                            </td>
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
                                                 fontSize:'14px',
                                                display: cgst_igst === "igst" ? "none" : "table-cell",
                                            }}
                                            >
                                            {" "}
                                            <strong>
                                                <span id="template_product_sgst">
                                                {formData?.product_items_labels?.sgst}
                                                </span>{" "}
                                                <br />
                                                (₹)
                                            </strong>
                                            </td>
                                            <td
                                            class="gst-type-igst custom_bg_text_color"
                                            width="80px"
                                            valign="top"
                                            align="center"
                                            bgcolor="#eeeeee"
                                            style={{
                                                padding: "0 5px",
                                                lineHeight: "30px",
                                                 fontSize:'14px',
                                                textTransform: "uppercase",
                                                display: cgst_igst === "igst" ? "table-cell" : "none",
                                            }}
                                            >
                                            {" "}
                                            <strong>
                                                <span id="template_product_igst">
                                                {formData?.product_items_labels?.igst}
                                                </span>{" "}
                                                <br />
                                                (₹)
                                            </strong>
                                            </td>
                                            <td
                                            class="custom_bg_text_color"
                                            width="100px"
                                            align="center"
                                            valign="top"
                                            bgcolor="#eeeeee"
                                            style={{
                                                padding: "0 5px",
                                                lineHeight: "30px",
                                                textTransform: "uppercase",
                                                 fontSize:'14px'
                                            }}
                                            >
                                            {" "}
                                            <strong>
                                                <span id="template_product_cess">
                                                {formData?.product_items_labels?.cess}
                                                </span>{" "}
                                                <br />
                                                (%)(₹)
                                            </strong>
                                            </td>
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
                                                 fontSize:'14px'
                                            }}
                                            >
                                            &nbsp;&nbsp;{" "}
                                            <strong>
                                                <span id="template_product_total">
                                                {formData?.product_items_labels?.total}
                                                </span>{" "}
                                                <br /> (₹)
                                            </strong>
                                            </td>
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
                                                <tr>
                                                    <td
                                                    width="38px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="center"
                                                    valign="top"
                                                    >
                                                    1
                                                    </td>
                                                    <td
                                                    width="280px"
                                                    style={{ padding: "0 5px", lineHeight: "30px",fontSize:'14px' }}
                                                    align="left"
                                                    valign="top"
                                                    >
                                                    <span class="product_title_on_off_tr">
                                                        {formData?.product_items_labels
                                                        ?.hide_show_product_title && item?.name}
                                                    </span>
                                                    <span class="product_sku_on_off_tr">
                                                        {" "}
                                                        {formData?.product_items_labels
                                                        ?.hide_show_product_title &&
                                                        formData?.product_items_labels
                                                            ?.hide_show_product_sku && <span> - </span>}{" "}
                                                        {formData?.product_items_labels
                                                        ?.hide_show_product_sku && item?.sku}
                                                    </span>
                                                    </td>
                                                    <td
                                                    class="cell-1"
                                                    data-position="1"
                                                    data-value="qty"
                                                    width="44px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="center"
                                                    valign="top"
                                                    >
                                                    {item?.quantity}
                                                    </td>
                                                    <td
                                                    class="cell-1"
                                                    data-position="2"
                                                    data-value="rate_per_item"
                                                    width="120px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="center"
                                                    valign="top"
                                                    >
                                                    {item?.price}
                                                    </td>
                                                    {formData?.product_items_labels
                                                    ?.hide_show_product_discount && (
                                                    <td
                                                        class="cell-1 product_discount_on_off_tr"
                                                        data-position="3"
                                                        data-value="discount_item"
                                                        width="80px"
                                                        style={{ lineHeight: "30px" }}
                                                        align="center"
                                                        valign="top"
                                                    >
                                                        {item?.total_discount}
                                                    </td>
                                                    )}
                                                    <td
                                                    class="cell-1"
                                                    data-position="4"
                                                    data-value="taxable_item"
                                                    width="120px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="center"
                                                    valign="top"
                                                    >
                                                    {taxableAmount}
                                                    </td>
                                                    {formData?.product_items_labels?.hide_show_product_hsn && (
                                                    <td
                                                        class="cell-1 product_hsn_on_off_tr"
                                                        data-position="5"
                                                        data-value="hsn"
                                                        width="80px"
                                                        style={{ lineHeight: "30px" }}
                                                        align="center"
                                                        valign="top"
                                                    >
                                                        {item?.hsn}
                                                    </td>
                                                    )}
                                                    <td
                                                    class="cell-1"
                                                    data-position="6"
                                                    data-value="gst"
                                                    width="40px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="center"
                                                    valign="top"
                                                    >
                                                    {item.gst}
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
                                                    {cgstAmount}
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
                                                    {sgstAmount}
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
                                                    {igstAmount}
                                                    </td>
                                                    <td
                                                    width="100px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="center"
                                                    valign="top"
                                                    >
                                                    ({item?.cess}) {cessAmount}
                                                    </td>
                                                    <td
                                                    width="120px"
                                                    style={{ lineHeight: "30px" }}
                                                    align="right"
                                                    valign="top"
                                                    >
                                                    {totalAmount}&nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                );
                                            })}

                                            {/* Empty Rows */}
                                            {Array.from({
                                                length: Math.max(0, 5 - orderData?.line_items?.length),
                                            }).map((_, emptyIndex) => (
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
                                                {formData?.product_items_labels
                                                    ?.hide_show_product_discount && (
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
                                            ))}
                                            </>
                                        ) : (
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
                                                style={{ lineHeight: "30px" }}
                                                >
                                                &nbsp;
                                                </td>
                                                <td
                                                width="100px"
                                                style={{
                                                    lineHeight: "30px",
                                                    display: cgst_igst === "igst" ? "table-cell" : "none",
                                                }}
                                                >
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
            </tbody>
        </table>
                                    </tr>
                                    {/* further */}
                                    <tr>
                                    <table
                                        width="100%"
                                        border="0"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style={{ marginTop: "-1px" }}
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            valign="top"
                                            style={{
                                                borderTop: "solid 1px #444444",
                                                borderLeft: "solid 1px #444444",
                                                borderRight: "solid 1px #444444",
                                            }}
                                            >
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                
                                                <tr id="order_note_on_off_tr">
                                                    <td
                                                    style={{
                                                        padding: "8px 0px",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    valign="bottom"
                                                    >
                                                    <table
                                                        width="100%"
                                                        border="0"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        align="left"
                                                    >
                                                        <tbody>
                                                        <tr>
                                                            <td style={{ paddingLeft: "15px" }}>
                                                            <strong>
                                                                <span id="template_order_note">
                                                                {formData?.others_labels?.order_note}
                                                                </span>{" "}
                                                                :{" "}
                                                            </strong>
                                                            {orderData?.note}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                </tr>
                                                <tr id="terms_conditions_on_off_tr">
                                                    <td
                                                    valign="top"
                                                    style={{
                                                        padding: "15px 15px 5px 15px",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    <table cellspacing="0" cellpadding="0" border="0">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                            <strong>
                                                                <span id="template_terms_conditions">
                                                                {formData?.others_labels?.term_and_conditions}
                                                                </span>
                                                            </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "5px 0px" }}>
                                                            <span id="template_store_terms_conditions">
                                                                {formData?.others_labels
                                                                ?.is_term_and_conditions &&
                                                                formData?.store_information
                                                                    ?.terms_and_conditions}
                                                            </span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                </tr>
                                                <tr id="total_amount_in_words_on_off_tr">
                                                    <td style={{ padding: "5px 15px" }} valign="bottom">
                                                    <table
                                                        width="100%"
                                                        border="0"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        align="left"
                                                    >
                                                        <tbody>
                                                        <tr style={{fontSize:'14px'}}>
                                                            <td>
                                                            <strong>
                                                                <span id="template_total_amount_in_words" >
                                                                {
                                                                    formData?.others_labels
                                                                    ?.total_invoice_amount_in_words
                                                                }
                                                                </span>
                                                            </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "5px 0px" }}>
                                                            {formData?.others_labels
                                                                ?.is_total_invoice_amount_in_words &&
                                                                "Four Thousand Rupees Only"}
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
                                            style={{ borderRight: "solid 1px #444444", borderTop: "solid 1px #444444", lineHeight: "35px", }}>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                <tr>
                                                    <td
                                                    align="left"
                                                    height="35"
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    &nbsp;&nbsp;
                                                    {formData?.others_labels?.total_invoice_amount_in_words}
                                                    (₹)
                                                    </td>
                                                    <td
                                                    align="right"
                                                    height="35"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                    }}
                                                    >
                                                    {totalAmountInWords || ""}&nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                    align="left"
                                                    height="35"
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    &nbsp;&nbsp;Total Tax Amount(₹)
                                                    </td>
                                                    <td
                                                    align="right"
                                                    height="35"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                    }}
                                                    >
                                                    {" "}
                                                    {(totalAmountDiscountSum - totalTaxableAmountSum).toFixed(
                                                        2,
                                                    )}{" "}
                                                    &nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
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
                                                            style={{ borderLeft: "solid 1px #444444" }}
                                                            >
                                                            {totalDiscountInPercentage.toFixed(2)}&nbsp;&nbsp;
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                    <td style={{ borderBottom: "solid 1px #444444" }}>
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style={{ borderCollapse: "collapse",fontSize:'14px' }}
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
                                                                borderLeft: "solid 1px #444444",
                                                            }}
                                                            >
                                                            {orderData?.total_discounts}&nbsp;&nbsp;
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
                                                        borderBottom: "solid 1px #444444",
                                                        borderRight: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    &nbsp;&nbsp;Shipping Discount(₹)
                                                    </td>
                                                    <td
                                                    align="right"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                    }}
                                                    >
                                                    {" "}
                                                    -&nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                    align="left"
                                                    valign="middle"
                                                    height="35"
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    &nbsp;&nbsp;Shipping Amount(₹)
                                                    <br />
                                                    &nbsp;&nbsp;(SAC Code:552114)
                                                    </td>
                                                    <td
                                                    align="right"
                                                    valign="middle"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    {" "}
                                                    {
                                                        orderData?.total_shipping_price_set?.shop_money?.amount
                                                    }{" "}
                                                    &nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style={{
                                                        borderCollapse: "collapse",
                                                        marginTop: "-2px",
                                                        marginBottom: "-2px",
                                                        }}
                                                    >
                                                        <tbody>
                                                        <tr>
                                                            <td align="left" width="65%">
                                                            &nbsp;&nbsp;Shipping GST %
                                                            </td>
                                                            <td
                                                            align="right"
                                                            style={{ borderLeft: "solid 1px #444444" }}
                                                            >
                                                            -&nbsp;&nbsp;
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                    <td style={{ borderBottom: "solid 1px #444444" }}>
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style={{
                                                        borderCollapse: "collapse",
                                                        marginTop: "-0.5px",
                                                        marginBottom: "-0.5px",
                                                        fontSize:'14px'
                                                        }}
                                                    >
                                                        <tbody>
                                                        <tr>
                                                            <td align="left" width="60%">
                                                            &nbsp;&nbsp;Amount(₹)
                                                            </td>
                                                            <td
                                                            align="right"
                                                            style={{
                                                                width: "100px",
                                                                borderLeft: "solid 1px #444444",
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
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style={{
                                                        borderCollapse: "collapse",
                                                        marginTop: "-2px",
                                                        marginBottom: "-2px",
                                                        }}
                                                    >
                                                        <tbody>
                                                        <tr>
                                                            <td align="left" width="65%" height="25">
                                                            {" "}
                                                            &nbsp;&nbsp;Shipping CESS %
                                                            </td>
                                                            <td
                                                            align="right"
                                                            style={{ borderLeft: "solid 1px #444444" }}
                                                            >
                                                            -&nbsp;&nbsp;
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                    <td style={{ borderBottom: "solid 1px #444444" }}>
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style={{
                                                        borderCollapse: "collapse",
                                                        marginTop: "-0.5px",
                                                        marginBottom: "-0.5px",
                                                        
                                                        }}
                                                    >
                                                        <tbody>
                                                        <tr style={{fontSize:'14px'}}>
                                                            <td align="left" width="60%" height="25">
                                                            &nbsp;&nbsp;Amount(₹)
                                                            </td>
                                                            <td
                                                            align="right"
                                                            height="25"
                                                            style={{
                                                                width: "100px",
                                                                borderLeft: "solid 1px #444444",
                                                                fontSize:'14px'
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
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    &nbsp;&nbsp;Total Amount After Tax(₹)
                                                    </td>
                                                    <td
                                                    align="right"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                    }}
                                                    >
                                                    {" "}
                                                    {totalAmountDiscountSum.toFixed(2)} &nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                    align="left"
                                                    height="35"
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    &nbsp;&nbsp;Round Off
                                                    </td>
                                                    <td
                                                    align="right"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                    }}
                                                    >
                                                    {" "}
                                                    {roundOff}&nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                    align="left"
                                                    height="35"
                                                    style={{
                                                        borderRight: "solid 1px #444444",
                                                        borderBottom: "solid 1px #444444",
                                                        textTransform: "uppercase",
                                                        fontSize:'14px'
                                                    }}
                                                    >
                                                    <strong>&nbsp;&nbsp;Total(₹)</strong>
                                                    </td>
                                                    <td
                                                    align="right"
                                                    style={{
                                                        borderRight: "0px",
                                                        borderBottom: "solid 1px #444444",
                                                    }}
                                                    >
                                                    {" "}
                                                    <strong>{roundedTotal.toFixed(2)}&nbsp;&nbsp;</strong>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            colspan="2"
                                            align="left"
                                            style={{
                                                padding: "3px 5px",
                                                borderLeft: "solid 1px #444444",
                                                borderRight: "solid 1px #444444",
                                                borderTop: "solid 1px #444444",
                                                fontSize:'14px'
                                            }}
                                            >
                                            <span id="template_e_and_o_e">
                                                {formData?.others_labels?.e_and_o_e}
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="left"
                                            style={{
                                                borderLeft: "solid 1px #444444",
                                                borderBottom: "solid 1px #444444",
                                                lineHeight: "30px",
                                                fontSize:'14px'
                                            }}
                                            >
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
                                            <div
                                                id="qr_code_on_off_tr"
                                                style={{ width: "100px", float: "right", textAlign: "center" }}
                                            >
                                                {formData?.others_labels?.hide_show_qr_code_image && (
                                                <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAAAAABVicqIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAArCSURBVGjevZptbFvVGcd/TkzapGnd0UJThsPo2JpWWTtthGqhoGk0ipBgaJvpJk1buk2wRUoZEAmFQflAGHQS6QYqStk+tCmCTWn2glwGqbMNLW1VUjqa0mGYcDVuYO4qB+wmpCR2/OzDuS/n+t7rmGrifLh6znNeHp9znpf/eY7Bt0yJiPQAaVFlABgXEUkACRGR8ZIhPSIiU76zVfEJlE9ECEHbtT0SiQBp2RWJRBQ9LnFFJGRMEXqJRCLby21X0VViAEgul7OJXC6XLBY3QC6XGy0Wt0AulxssJoF+c1Qml8sJADH3dEAYgFAFiwsFEKHgngBiC2H9tMV8u8Y14DqHHLrXT/ajj3Lv3SW8uWssqv4NHCHTE6WDn3ySn+0ExU9dTQiZ8BMyAUU/pipRNCGUX3NF+xlcAoV0H3JVn91pUZ0W8fDDJrF3L9/tuSghc6cBSF/2RDfA/GmrQRHxm/+5EYD+O/7TCAVWFIKNLrzQUqsX4lcv0LECId8C4Hse/mOPmcQzzwC8+CLtD5WfqShRm56VGDAl8/l8Pp/vBYx8P5DMq5IAEvkx1XkgnwL68mndQcZk1p4tKsVyK6mqKllt2G/94Yq2I7B9x3H47aec+t3Bcxw6VJmQt22GZfDZYcfK7vwhv+vwDB28zRw9DL336apVM+srpKZ8PPBvrgmgPdOFAbYusNzn/ujPT2kmmL0DNj4IwO2+2zW0gJDzQ5C86uBWGGs+0ubw80PQ35FpBJgfggb8Z6s8MtZqXy//4rSr0vLKKwCpH5QNRf4Bs56PClDPbB7q2dMJyab5C7AkNNIGiS3yIdRWy4ec+6yNVh4gvJhp35XUB0hfDMCiRZq30rqG6s3vOf2HWR+PkO0ljF+GH/lviVleDvCU8vPrAZ5/nm9vBt55XOs2vR0get9cNyzvLf4UavrkLgg96ZWqfJdeDOm36TEpZLOjQFxEJAn0Zw298zaZAdolDzRLEYiIfOyDr/ZAofP/f+06YZnBmd8A8M797vb7PbTJyWhF5INMJpPJdKmmdCZTlJlMZsDargSQyGRmPVjYLrFM5n2RTCbjXsmlLpyw3DVkBVBbanAryi52hfrMu4X8HB4I7Sz4D4nrP3l4GODYsbJCHgkOjs2+/LT0KSKZTqfTcWA0PWq6+nQS6E8bQG86DXSl0+l02h7bnE4DkXS68oNvsAkr+DRkARomABomrT4XtCGimAsJeU7zUkdKYOIugJldAOzyG+xiGoYh0gwYRjtgGNsAw3CiRcowCjKo6FH5yDDG9OF9hmmPXSKijNEwDMMAooZhmMZ4paVdq8MAK2sBlulWF9UnXRTlrOsXR8+WriEKSruitnY9DT/Regz4efTXtICYKGnc4xCXbnVzfLQrL+3mPKlUUXqAVKoPSKmLaSqVSqVmZBSIp8aBgVQqlUqZrj6Vsn2XqV2pVEpEAn3X5ZbLrmvQuGt0+pTFse4Ja3Kls6wp77v+AN+pAVCQ6vBhu+XtowC8vx+A/azd5B6536cWTrovILsLAL/ogNtqADogycsa6Pp3BySunFI3sA7o33RFEtYBLEvCun3Eeu1LjaiB4Sb3D7nGu6ol0ZdLWU3HdeffZCpbqElF3yaPqz/gBkrxj4IN8623/LgHaDR3LP+noHiyFSg6XvipYQDGYZnT6eutnOzwYMDBtQAboW/TZeNQz4wvSIz8Pejg17gAwRVXcNKn0wbgjNqxDWU80wbCEoIX4BYAXnKaDmcd+vV3yju4g6xqmTvkw7Y0YAzaclAMnShyt1LPMbg2tH03jDG8A4zonk7QvdWaFeffgitXA2cU7up9cHIldH0foEZdJpkPQ/T30EK4xRr5ZcdSa+3Jhm3mUpfOLGvxXVKLPyc8oip/0RqOwNeqADR/xbvvugavjWZfhc/YGj9ifpd8RdRU4a9a/C3eHzM6qu6Mr42O9nhxl6PqMg4MyMzo6KgXdwGtIqrJD3ddV/MEAF+EFyrB+puZCGrbjAT4LnXAJ6G1klvF4WDOYapaTSIEoMWHx4chwbP7IBs58QHHdoARfVM/jzZIwNroqY12ZNxAG/TcZLbGfmwSza9LlbOSmxyLfxy4vvZZS98U9mnSNGsEPGe55azFnLaIggemvgotnChaKqiyJ/+CL1UDnLWC6/ol50yrPO4Wctz8LlmPb3tAZDThq4zF4312dVziLt8Vd6q98TjQJYV4PD5iZSRMVB+PLwCJWgLADgC3vKnRk8qJ3eLTTfkuu7zhbn7vPXf9VHD1lPldtNanQwhgEG7nC+ooBp0+/7ATaYq51d1hKwzUlvr/bXsBGbI6RPvsaFUUEQsLz4pdNHAnIg64U0VZfKpkb7Y5wwtAVKEVCYEe8VSAWFuadNRuG9pJuGg3u+rzFtVEeP8Ad60zMd3TR01IwFTpLfbPHRbuu0HDgB3QX0cH9DaigY25ddB6pGoAOtYRyYKImHi0IK3eVwdru1w3LfOg1MVUDKBXMtp2zSoHKfbF9Iw9SA9/585xdciziSXljOcLnCHcaBKhqy0CoJ9HlSu1fPor+yAbOfiuO03bDzdfNdJmdesseT+5ymTGDhR/DZ2a73LnIPOmYmwDso6e9FsWX9EjTUxEtHs8lBijusEp53beup/bFwsncgQl1ANaQwDF0K+UzHtCwO0lCSsj+teT0O2ZtA+6rW9vnU8HtV2RhzRjtIs37WG+aZXmIP20yyXE1i61XWeBBs4V/W1r2jfBZCJg/evbwd6uxgkoVF+vcJeFyj/cCb3QuWJPJ/TCDtuxa7Rz8EsAdkBso9MavRMe1LXLNsYZzXelLe1KiuM6EzLm/dkBGe6Sm5aNS2dmtNTGpJUUmdQmnPTbnEn/1kkXWlkJPbw2DCuVzAjAajCiYPm0HgtLOAsAYCfstALD0BBA640qjyorvcbohN+s9Pgl1UTEheb6RUTS3nW1mnteLJ/vyvly56crTJOo4RGAcBcQ4pvzZpa45XNaRkrlvBaxqgt2Qxcs4W9qr2zOKoAau2rePOHocoCoylVIQOkCMk7V9cCsYWG7ZKy0h+nqXe8n0wF5YWWFJUbpQ3u7VNWVdgsv9RWiIuNKPXjDRosAboVtsNy6BNlzLoXYAcutXMu+pUS+EXRqU9JVwkm6gMQYMCgibiDR5TbGi0/ZwgUWh0xiwZ7qGwYo8btDAKtiWjUGl2D2vAESW0pfXWLmqKoYNFrM03VENzFUF+Tqp5xqn467zJStx3f1ltcuE8R4XooKxTLvUHMB+zNXNsN9jR0yZ81p79mtYrGTilrcDmFq2i3fZXsg+4q8e7c7aH2aS6D9Y6XRb70V4MYbOaxm/ZEJcicag0a8BIReqlhIwe9+WahgVHjBB4FWqGJRKyiLGzczKNWtlGqXPuSoTVxi+S6Xq8d5+9V9l4677DLu1S73Pb7gFxkXLvNgPYnPl+3jEPNQXdmZhJvhtOW7RjcDx6+DZusW2wxhq7pvH0AzHA3TDKfDRLKVbZcLd3l9V5/TzXzru6jnJnFXQh6+qLxmwDBTSH20nIw9nVou3fZd8OY6C8Wthp7HcsshqkHh01VEIWwLeaOS9RzcAIy0le1z094LdS6M66B64ePtmvjxJWBIiHCIyl6ZI5Z26bhLXQS7u0HDXRErlR2BiSoi2cp917GmAx4Tb8r6+K5aG4lGrZvWJ/Insv8Bswpn7ReOuQcAAAAASUVORK5CYII=" />
                                                )}
                                                {formData?.others_labels?.hide_show_qr_code_image && (
                                                <span style={{ fontSize: "10px" }}>Scan to download</span>
                                                )}
                                            </div>
                                            </td>
                                            <td
                                            align="right"
                                            style={{
                                                padding: "0 10px 20px",
                                                borderBottom: "solid 1px #444444",
                                                borderRight: "solid 1px #444444",
                                                lineHeight: "30px",
                                                fontSize:'14px'
                                            }}
                                            >
                                            <strong>
                                                For,{" "}
                                                <span id="template_shop_name_footer">
                                                {formData?.store_information?.company_legal_name}
                                                </span>
                                            </strong>{" "}
                                            &nbsp;&nbsp;
                                            <br />
                                            <div
                                                class="crop-element-wrap"
                                                style={{ width: "312px" }}
                                                data-toggle="modal"
                                                data-target="#signatureCropModal"
                                            >
                                                {signature}
                                            </div>
                                            <span
                                                id="template_no_signature_text"
                                                style={{ fontSize: "12px" }}
                                            >
                                                {
                                                formData?.others_labels
                                                    ?.this_is_a_computer_generated_invoice_and_does_not_require_a_signature
                                                }
                                            </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '110px 0 5px 0' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#000', fontWeight: 'bold' }}>
                <span id="thanks_for_business_on_off_tr">
                    Thank you for your business
                </span>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#5E5E5E',marginLeft:'150px' }}  >
                <span id="generated_from_on_off_tr">
                    Generated from:
                    VirtueGst&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span id="page_no_on_off_tr" style={{marginLeft:'180px'}}>Page 1 of 1</span>&nbsp;
                </div>
            </div>
           </div>
    );
}

