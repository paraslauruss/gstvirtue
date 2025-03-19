import numberToWords from 'number-to-words';

export const Classic = ({ bgColor, textColor, fontFamily, logo, signature, formData, orderData, storeData }) => {

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

    return (
        <div style={{ position: 'relative', display: 'flex', backgroundColor: '#fff', flexDirection: 'column', backgroundClip: 'border-box' }}>
            <div style={{ textAlign: 'right' }}>
                {logo}
            </div>
            <table width="100%" border={0} cellSpacing={0} cellPadding={0} align='center'>
                <tbody>
                    <tr>
                        <td style={{ border: 'solid 2px #000' }}>
                            <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody>
                                    <tr>
                                        <td valign='top' style={{ padding: 0, lineHeight: '25px', align: 'center' }}>
                                            <table width='100%' border={0} cellSpacing={0} cellPadding={0}>
                                                <tbody>
                                                    <tr>
                                                        <td align='left' width="33%" style={{ fontSize: '16px', paddingBottom: '6px', paddingLeft: '10px' }}>
                                                            <strong style={{ paddingTop: '10px', display: 'block', paddingBottom: '5px' }}>{formData?.customize_store_labels?.original}</strong>
                                                            {formData?.customize_store_labels?.is_pan_no && (<div id="store_pan_no_on_off_tr" style={{ fontSize: '12px' }}><strong><span id="template_store_pan_no">{formData?.customize_store_labels?.pan_no}</span> : {storeData?.pan_number}</strong></div>)}
                                                            {formData?.customize_store_labels?.is_fssai_lic_no && (<div id="store_fssai_lic_no_on_off_tr" style={{ fontSize: '12px' }}><strong><span id="template_store_fssai_lic_no">{formData?.customize_store_labels?.fssai_lic_no}</span> : {storeData?.fssai_lic_number}</strong></div>)}
                                                        </td>
                                                        <td align="center" style={{ fontSize: '16px', paddingTop: '5px', paddingBottom: '6px', paddingLeft: '30px', lineHeight: '22px' }}>
                                                            <strong id="template_brand_name">{formData?.store_information?.branch_name}</strong><br />
                                                            <strong id="template_shop_name">{formData?.store_information?.company_legal_name}</strong>
                                                        </td>
                                                        <td align="right" width="33%" style={{ fontSize: '12px', paddingTop: '5px', paddingRight: '10px', }}>
                                                            {formData?.customize_store_labels?.is_gstin && (<strong id="store_gstin_on_off_tr"><span id="template_store_gstin">{formData?.customize_store_labels?.gstin}</span>: {storeData?.gst_number}</strong>)}
                                                            {formData?.customize_store_labels?.is_iec_code && (<div id="store_iec_code_on_off_tr" style={{ paddingBottom: '3px' }}><strong><span id="template_store_iec_code">{formData?.customize_store_labels?.iec_code}</span>: {storeData?.iec_code}</strong></div>)}
                                                            {formData?.customize_store_labels?.is_cin && (<div id="store_cin_on_off_tr" style={{ paddingBottom: '3px' }}>
                                                                <strong>&nbsp;<span id="template_store_cin">{formData?.customize_store_labels?.cin}</span>: {storeData?.cin_number}</strong>
                                                            </div>)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table width="100%" border={0} cellspacing={0} cellpadding={0}>
                                                <tbody><tr>
                                                    <td style={{ paddingTop: '5px' }} width="33%" align="left">

                                                        &nbsp;<img id="storeEmailIcon" src="https://gst.webplanex.biz/images/mail-icon.png" alt="" width="12px" height="12px"></img>&nbsp;<strong id="template_store_email">{formData?.store_information?.store_email}</strong>

                                                    </td>
                                                    <td align="center" style={{ paddingTop: '5px', paddingLeft: '30px' }}>

                                                        <span id="store_domain_on_off_tr">
                                                            <img src="https://gst.webplanex.biz/images/web-icon.png" alt="" width="10px" height="10px"></img>&nbsp;
                                                            <strong id="template_store_domain">
                                                                {formData?.store_information?.shop_domain}
                                                            </strong>
                                                        </span>

                                                    </td>
                                                    <td style={{ paddingTop: '5px' }} width="33%" align="right">
                                                        <img src="https://gst.webplanex.biz/images/phone-icon.png" alt="" width="12px" height="12px"></img>&nbsp;
                                                        <strong><span id="template_contact_person"></span><span></span><span id="template_shop_phone">{formData?.store_information?.store_phone}</span></strong>&nbsp;
                                                    </td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style={{ marginBottom: '10px' }}>
                                                <tbody><tr><td></td></tr>
                                                </tbody></table>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style={{ lineHeight: '28px' }}>
                                                <tbody><tr>
                                                    <td align="center" height="40" class="custom_bg_text_color" bgcolor="#bcd6ee" style={{ borderBottom: 'solid 2px #000', borderTop: 'solid 2px #000', padding: '0 5px', fontSize: '18px', }}>
                                                        <strong id="template_invoice_title">{formData?.customize_store_labels?.tax_invoice}</strong><br />
                                                    </td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                    <tr style={{ lineHeight: '28px' }}>
                                        <td>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="table-top">
                                                <tbody><tr>
                                                    <td width="295.5px" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
                                                        <span id="template_invoice_no">{formData?.customize_store_labels?.invoice_no}</span>: <strong id="invoice_no_on_off_tr">{formData?.customize_store_labels?.is_invoice_no && (orderData?.invoice_number || '#1048')}</strong>
                                                    </td>
                                                    <td width="285.5px" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', }}>
                                                        <span id="template_invoice_date">{formData?.customize_store_labels?.invoice_date}</span>: <strong id="invoice_date_on_off_tr">{formData?.customize_store_labels?.is_invoice_date && new Date().toLocaleDateString('en-GB')}</strong>
                                                    </td>
                                                    <td width="295.5px" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', }}>
                                                        <span id="template_transport_mode">{formData?.customize_store_labels?.transport_mode}</span>: <strong id="transport_mode_on_off_tr">{formData?.customize_store_labels?.is_transport_mode && ' -'}</strong>
                                                    </td>
                                                    <td width="305.5px" style={{ padding: '0 5px', borderBottom: 'solid 1px #000' }}>
                                                        <span id="template_place_of_supply">{formData?.customize_store_labels?.place_of_supply}</span>: <strong id="place_of_supply_on_off_tr">{formData?.customize_store_labels?.is_place_of_supply && (orderData?.shipping_address?.city || 'Rajkot')}</strong>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                        <td width="295.5px" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
                                                            <span id="template_order_no">{formData?.customize_store_labels?.order_no}</span>: <strong id="order_no_on_off_tr">{formData?.customize_store_labels?.is_order_no && (orderData?.order_number || "045")}</strong>
                                                        </td>
                                                        <td width="285.5px" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
                                                            <span id="template_order_date">{formData?.customize_store_labels?.order_date}</span>: <strong id="order_date_on_off_tr"> {formData?.customize_store_labels?.is_order_date && (formatDate(orderData?.date))}</strong>
                                                        </td>
                                                        <td width="295.5px" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
                                                            <span id="template_date_of_supply">{formData?.customize_store_labels?.date_of_supply}</span>: <strong id="date_of_supply_on_off_tr">{formData?.customize_store_labels?.is_date_of_supply && (formatDate(orderData?.processed_at))}</strong>
                                                        </td>
                                                        <td width="305.5px" style={{ padding: '0 5px', borderBottom: 'solid 1px #000' }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td width="68%" height="25">State: <strong>{orderData?.shipping_address?.province || "Gujarat"}</strong></td>
                                                                    <td width="16%" style={{ borderLeft: 'solid 1px #000' }} align="center">Code</td>
                                                                    <td width="16%" style={{ borderLeft: 'solid 1px #000' }} align="center"><strong>{gstStateCodes[orderData?.shipping_address?.province_code] || "24"}</strong></td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderBottom: 'solid 2px #000', borderTop: 'solid 1px #000' }} height="10"></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="100%" style={{ lineHeight: '28px' }} border="0" cellspacing="0" cellpadding="0" id="table-top2">

                                                <tbody>
                                                    <tr>
                                                        <td width="581px" class="label_billing_on_off custom_bg_text_color" bgcolor="#bcd6ee" height="25" align="center" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
                                                            <strong id="template_billing_head_title">{formData?.billing_shipping_labels?.bill_to_party}</strong>
                                                        </td>
                                                        <td width="601px" class="label_shipping_on_off custom_bg_text_color" bgcolor="#bcd6ee" align="center" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000' }}>
                                                            <strong id="template_shipping_head_title">{formData?.billing_shipping_labels?.ship_to_party}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="581px" class="label_billing_on_off" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}><strong>{orderData?.billing_address?.first_name} {orderData?.billing_address?.last_name}</strong></td>
                                                        <td width="601px" class="label_shipping_on_off" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000' }}><strong>{orderData?.shipping_address?.first_name} {orderData?.shipping_address?.last_name}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="581px" class="label_billing_on_off" height="35" valign="middle" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>{orderData?.shipping_address?.address1 || '505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054'}</td>
                                                        <td width="601px" class="label_shipping_on_off" valign="middle" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000' }}>{orderData?.billing_address?.address1 || '505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054'}</td>
                                                    </tr>

                                                    <tr id="bill_ship_phone_and_customer_email_tr">
                                                        <td class="label_billing_on_off">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td class="bill_ship_phone_no_on_off_tr" style={{ borderBottom: 'solid 1px #000', borderRRight: 'solid 1px #000' }}>&nbsp;&nbsp;<strong><span id="template_billing_phone">Phone</span>:</strong> {orderData?.billing_address?.phone || '9876543210'}</td>
                                                                    <td class="label_customer_email_on_off_tr" style={{ borderWidth: '0px 1px 1px', borderBottomStyle: 'solid', borderBottomColor: ' rgb(0, 0, 0)', borderTopStyle: 'initial', borderTopColor: 'initial', borderRightStyle: 'solid', borderRightColor: ' rgb(0, 0, 0)', borderLeftStyle: 'solid', borderLeftColor: 'initial' }}>
                                                                        &nbsp;&nbsp;<strong>E:</strong> customer-email@gmail.com
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                        <td class="label_shipping_on_off" style={{ display: isShippingVisible ? 'table-cell' : 'none', }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td class="bill_ship_phone_no_on_off_tr" style={{ borderBottom: 'solid 1px #000' }}>&nbsp;&nbsp;<strong><span id="template_shipping_phone">Phone</span>:</strong> {orderData?.billing_address?.phone || '9876543210'}</td>
                                                                    <td class="label_customer_email_on_off_tr" style={{ borderWidth: '0px 0px 1px 1px', borderBottomStyle: 'solid', borderBottomColor: 'rgb(0, 0, 0)', borderLeftStyle: 'solid', borderLeftColor: 'initial', borderTopStyle: 'initial', borderTopColor: 'initial', borderRightStyle: 'initial', borderRightColor: 'initial' }}>
                                                                        &nbsp;&nbsp;<strong>E:</strong> customer-email@gmail.com
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>

                                                    <tr class="bill_ship_gstin_on_off_tr">
                                                        <td width="581px" class="label_billing_on_off" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', }}><strong><span id="template_billing_gstin">GSTIN</span>:</strong> GSTIN124664355478</td>
                                                        <td width="601px" class="label_shipping_on_off" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000', }}><strong><span id="template_shipping_gstin">GSTIN</span>:</strong> GSTIN124664355478</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%" class="label_billing_on_off" height="25" style={{ borderRight: 'solid 1px #000', }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td width="47%" height="25" style={{ padding: '0 5px' }}><strong>State:</strong> Gujarat </td>
                                                                    <td width="16%" style={{ borderLeft: 'solid 1px #000' }} align="center">Code</td>
                                                                    <td width="12%" style={{ borderLeft: 'solid 1px #000' }} align="center">24</td>
                                                                    <td width="25%" style={{ borderLeft: 'solid 1px #000', padding: '0 5px' }} align="left"><strong>Country:</strong> India</td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                        <td width="50%" class="label_shipping_on_off" height="25" style={{ display: isShippingVisible ? 'table-cell' : 'none', }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td width="47%" height="25" style={{ padding: '0 5px' }}><strong>State:</strong> Gujarat </td>
                                                                    <td width="16%" style={{ borderLeft: 'solid 1px #000' }} align="center">Code</td>
                                                                    <td width="12%" style={{ borderLeft: 'solid 1px #000' }} align="center">24</td>
                                                                    <td width="25%" style={{ borderLeft: 'solid 1px #000', padding: '0 5px' }} align="left"><strong>Country:</strong> India</td>
                                                                </tr>
                                                                </tbody></table>
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
        </div >
    );
}

// export const Classic = ({ bgColor, textColor, fontFamily, logo, signature, formData, orderData, storeData }) => {

//     const paymentMode = formData?.others_labels?.payment_mode;
//     const isPaymentMode = formData?.others_labels?.is_payment_mode;

//     const orderNote = formData?.others_labels?.order_note;
//     const isOrderNote = formData?.others_labels?.is_order_note;

//     const termAndConditions = formData?.others_labels?.term_and_conditions;
//     const terms_and_conditions = formData?.store_information?.terms_and_conditions;
//     const isTermAndConditions = formData?.others_labels?.is_term_and_conditions;

//     const totalInvoiceAmountInWords = formData?.others_labels?.total_invoice_amount_in_words;
//     const isTotalInvoiceAmountInWords = formData?.others_labels?.is_total_invoice_amount_in_words;

//     const eAndOE = formData?.others_labels?.e_and_o_e;
//     const companyLegalName = formData?.store_information?.company_legal_name;

//     const hideShowFinancialStatus = formData?.others_labels?.hide_show_financial_status;
//     const hideShowQrCodeImage = formData?.others_labels?.hide_show_qr_code_image;

//     const thankYouForYourBusiness = formData?.footer_labels?.thank_you_for_your_business;
//     const isThankYouForYourBusiness = formData?.footer_labels?.is_thank_you_for_your_business;

//     const shopDomain = formData?.store_information?.shop_domain;
//     const hideShowGeneratedFrom = formData?.footer_labels?.hide_show_generated_from;
//     const hideShowPageNo = formData?.footer_labels?.hide_show_page_no;

//     const calculateTaxValues = (item) => {
//         const taxRate = item.tax_lines?.length > 0 ? item.tax_lines[0].rate * 100 : 0;
//         const taxableAmount = ((item.price / (1 + ((parseFloat(item.gst) || 0) + (parseFloat(item.cess) || 0)) / 100)) * item.current_quantity).toFixed(2);
//         const gstAmount = (item.price * ((parseFloat(item.gst) || 0) / 100)).toFixed(2);
//         const igstAmount = gstAmount; // Assuming IGST for inter-state sales
//         const cgstRate = (parseFloat(item.gst) || 0) / 2;
//         const cgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2);
//         const sgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2); // SGST = 50% of GST
//         const cessAmount = ((item.cess / 100) * taxableAmount).toFixed(2);
//         const totalAmount = (item.price * item.current_quantity).toFixed(2); // Total amount after tax

//         return {
//             taxRate,
//             taxableAmount,
//             gstAmount,
//             cgstAmount,
//             sgstAmount,
//             cessAmount,
//             totalAmount
//         };
//     };

//     function formatDate(dateString) {
//         const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//         const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
//         return formattedDate;
//     }

//     // Calculate the total sum of the total amounts and quantities
//     const { totalAmountSum, totalQuantitySum, totalTaxableAmountSum } = (orderData?.line_items || []).reduce((acc, item) => {
//         const { totalAmount, taxableAmount } = calculateTaxValues(item);
//         acc.totalAmountSum += parseFloat(totalAmount);
//         acc.totalQuantitySum += parseFloat(item.quantity);
//         acc.totalTaxableAmountSum += parseFloat(taxableAmount);
//         return acc;
//     }, { totalAmountSum: 0, totalQuantitySum: 0, totalTaxableAmountSum: 0 });

//     const roundedTotal = Math.round(totalAmountSum);
//     const roundOff = (roundedTotal - totalAmountSum).toFixed(2);

//     const totalAmountInWords = numberToWords.toWords(roundedTotal);

//     return (
//         <div id="invoice" style={{ padding: "16px" }}>
//             {/* Logo - Top Right */}
//             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 {logo}
//             </div>

//             {/* Bordered Section */}
//             <div style={{
//                 border: "2px solid black",
//                 padding: "16px",
//                 marginTop: "8px"
//             }}>
//                 {/* 3-Column Layout */}
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>

//                     {/* Left Section */}
//                     <div style={{ textAlign: "left" }}>
//                         <div style={{ fontSize: "16px", fontWeight: "bold" }}>{formData.customize_store_labels ? formData.customize_store_labels.original || "" : ""}</div>
//                         <div style={{ fontSize: "14px", fontWeight: "bold" }}>{formData.customize_store_labels && formData.customize_store_labels.is_pan_no ? formData.customize_store_labels ? `${formData.customize_store_labels.pan_no} : ${storeData?.pan_number}` || "" : "" : ""}</div>
//                         <div style={{ fontSize: "14px", fontWeight: "bold" }}>{formData.customize_store_labels && formData.customize_store_labels.is_fssai_lic_no ? formData.customize_store_labels ? `${formData.customize_store_labels.fssai_lic_no} : ${storeData?.fssai_lic_number}` || "" : "" : ""}</div>
//                     </div>

//                     {/* Center Section */}
//                     <div style={{ textAlign: "center" }}>
//                         <div style={{ fontSize: "16px", fontWeight: "bold" }}>
//                             {formData.store_information ? formData.store_information.branch_name || "" : ""}
//                             <div>
//                                 {storeData?.brand_name}
//                             </div>
//                         </div>
//                         <div style={{ fontSize: "16px", fontWeight: "bold" }}>{formData.store_information ? formData.store_information.company_legal_name || "" : ""}</div>
//                     </div>

//                     {/* Right Section */}
//                     <div style={{ textAlign: "right" }}>
//                         <div style={{ fontSize: "14px", fontWeight: "bold" }}>{formData.customize_store_labels ? formData.customize_store_labels.export_invoice ? formData.customize_store_labels.is_gstin ? `${formData.customize_store_labels.gstin} : ${storeData?.gst_number}` : "" : "" : ""}</div>
//                         <div style={{ fontSize: "16px", fontWeight: "bold" }}>{formData.customize_store_labels && formData.customize_store_labels.is_iec_code ? formData.customize_store_labels ? `${formData.customize_store_labels.iec_code} : ${storeData?.iec_code}` || "" : "" : ""}</div>
//                         <div style={{ fontSize: "16px", fontWeight: "bold" }}>{formData.customize_store_labels && formData.customize_store_labels.is_cin ? formData.customize_store_labels ? `${formData.customize_store_labels.cin} : ${storeData?.cin_number}` || "" : "" : ""}</div>
//                     </div>

//                 </div>

//                 {/* Address Section */}
//                 <div style={{
//                     fontSize: "14px",
//                     color: "black",
//                     marginTop: "12px",
//                     textAlign: "center"
//                 }}>
//                     {formData.store_information ? formData.store_information.store_address || "" : ""}
//                 </div>

//                 {/* Contact Section */}
//                 <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginTop: "10px"
//                 }}>

//                     {/* Email */}
//                     {formData.store_information && formData.store_information.store_email ?
//                         <div style={{ display: "flex", alignItems: "center", textAlign: "left", fontWeight: "bold" }}>
//                             <span style={{ marginRight: "8px" }}>📧</span>
//                             <span>{formData.store_information ? formData.store_information.store_email || "" : ""}</span>
//                         </div> : null
//                     }

//                     {/* Website */}
//                     {formData.store_information && formData.store_information.is_shop_domain ?
//                         <div style={{ display: "flex", alignItems: "center", textAlign: "center", fontWeight: "bold" }}>
//                             <span style={{ marginRight: "8px" }}>🌐</span>
//                             <span>{formData.store_information ? formData.store_information.shop_domain || "" : ""}</span>
//                         </div> : null}

//                     {/* Phone */}
//                     {formData.store_information && formData.store_information.store_phone ?
//                         <div style={{ display: "flex", alignItems: "center", textAlign: "right", fontWeight: "bold" }}>
//                             <span style={{ marginRight: "8px" }}>📞</span>
//                             <span>{formData.store_information ? formData.store_information.contact_person || "" : ""} : {formData.store_information ? formData.store_information.store_phone || "" : ""}</span>
//                         </div> : null}

//                 </div>

//                 {/* Table Section */}
//                 <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px", border: "1px solid black" }}>
//                     {/* Header */}
//                     <thead>
//                         <tr style={{ background: "#C1D6EC" }}>
//                             <th colSpan="4" style={headerCellStyle}>Tax Invoice</th>
//                         </tr>
//                     </thead>

//                     {/* Body */}
//                     <tbody>
//                         {/* First Row - ✅ Ab 4 Columns Me Hi Hai! */}
//                         <tr>
//                             <td style={cellStyle}>{formData.customize_store_labels ? `${formData.customize_store_labels.invoice_no} : ${formData.customize_store_labels.is_invoice_no ? orderData?.invoice_number : ""}` || "" : ""}</td>
//                             <td style={cellStyle}>{formData.customize_store_labels ? formData.customize_store_labels.invoice_date || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_invoice_date ? new Date().toLocaleDateString('en-GB') : ""}</strong></td>
//                             <td style={cellStyle}>{formData.customize_store_labels ? formData.customize_store_labels.transport_mode || "" : ""} : {formData.customize_store_labels && formData.customize_store_labels.is_transport_mode ? "-" : ""}</td>
//                             <td style={cellStyle}>{formData.customize_store_labels ? formData.customize_store_labels.place_of_supply || "" : ""} : {formData.customize_store_labels && formData.customize_store_labels.place_of_supply ? orderData?.shipping_address?.city : ""}</td>
//                         </tr>

//                         {/* Second Row - ✅ Final Fix! */}
//                         <tr>
//                             <td style={cellStyle}>{formData.customize_store_labels ? formData.customize_store_labels.order_no || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_order_no ? orderData?.order_number : ""}</strong></td>
//                             <td style={cellStyle}>{formData.customize_store_labels ? formData.customize_store_labels.order_date || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_order_date ? formatDate(orderData?.date) : ""}</strong></td>
//                             <td style={cellStyle}>{formData.customize_store_labels ? formData.customize_store_labels.date_of_supply || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_date_of_supply ? formatDate(orderData?.processed_at) : ""}</strong></td>
//                             <td style={{ display: "flex", padding: "0" }}>
//                                 <div style={{ flex: 1, padding: "8px", fontSize: "14px", border: "1px solid black", borderRight: "0", borderTop: "0", borderBottom: "0" }}>
//                                     <b>State:</b> <strong>{orderData?.shipping_address?.province}</strong>
//                                 </div>
//                                 <div style={{ flex: 1, padding: "8px", fontSize: "14px", border: "1px solid black", borderRight: "0", borderTop: "0", borderBottom: "0" }}>
//                                     <b>Code:</b> <strong>{orderData?.shipping_address?.province_code}</strong>
//                                 </div>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 {/* Bill to Party & Ship to Party Section */}
//                 <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//                     <thead>
//                         <tr style={{ background: "#C1D6EC" }}>
//                             <th style={headerCellStyle}>{formData.billing_shipping_labels ? formData.billing_shipping_labels.bill_to_party || "" : ""}</th>
//                             <th style={headerCellStyle}>{formData.billing_shipping_labels ? formData.billing_shipping_labels.ship_to_party || "" : ""}</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", fontWeight: "bold" }}>{orderData?.billing_address?.address1}</td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", fontWeight: "bold" }}>{orderData?.shipping_address?.address1}</td>
//                         </tr>
//                         <tr>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                 {orderData?.billing_address?.address1}
//                             </td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                 {orderData?.shipping_address?.address1}
//                             </td>
//                         </tr>
//                         <tr>
//                             <td style={{ padding: "0", border: "1px solid black" }}>
//                                 <div style={{ display: 'flex' }}>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black" }}>
//                                         <b>Phone:</b> {orderData?.billing_address?.phone}
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black", borderRight: "0" }}>
//                                         <b>E:</b> {orderData?.billing_address?.email}
//                                     </div>
//                                 </div>
//                             </td>
//                             <td style={{ padding: "0", border: "1px solid black" }}>
//                                 <div style={{ display: 'flex' }}>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black" }}>
//                                         <b>Phone:</b> {orderData?.shipping_address?.phone}
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black", borderRight: "0" }}>
//                                         <b>E:</b> {orderData?.shipping_address?.email}
//                                     </div>
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                 <b>{formData.billing_shipping_labels ? formData.billing_shipping_labels.billing_gstin || "" : ""}</b> 22AAAAA0000A1Z5
//                             </td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                 <b>{formData.billing_shipping_labels ? formData.billing_shipping_labels.shipping_gstin || "" : ""}</b> 22AAAAA0000A1Z5
//                             </td>
//                         </tr>
//                         <tr>
//                             <td style={{ padding: "0", border: "1px solid black" }}>
//                                 <div style={{ display: 'flex' }}>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black" }}>
//                                         <b>State:</b> {orderData?.billing_address?.province}
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black" }}>
//                                         <b>Code:</b> {orderData?.billing_address?.province_code}
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px" }}>
//                                         <b>Country:</b> {orderData?.billing_address?.country}
//                                     </div>
//                                 </div>
//                             </td>
//                             <td style={{ padding: "0", border: "1px solid black" }}>
//                                 <div style={{ display: 'flex' }}>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black" }}>
//                                         <b>State:</b> {orderData?.shipping_address?.province}
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", borderRight: "1px solid black" }}>
//                                         <b>Code:</b> {orderData?.shipping_address?.province_code}
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px" }}>
//                                         <b>Country:</b> {orderData?.shipping_address?.country}
//                                     </div>
//                                 </div>

//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 {/* Invoice Table */}
//                 <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//                     <thead>
//                         <tr style={{ background: "#C1D6EC" }}>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "5%" }}>S. No.</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "20%" }}>{formData.product_items_labels ? formData.product_items_labels.item_sku || "" : ""}</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "5%" }}>{formData.product_items_labels ? formData.product_items_labels.qty || "" : ""}</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{formData.product_items_labels ? formData.product_items_labels.rate_per_item || "" : ""} (₹)</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{formData.product_items_labels?.discount_item || ""} (₹)</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{formData.product_items_labels ? formData.product_items_labels.texable_item || "" : ""} (₹)</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{formData.product_items_labels?.hsn || ""}</th>

//                             {/* CGST Column */}
//                             <th colSpan="2" style={{ border: "1px solid black", padding: "0", fontSize: "14px", width: "8%" }}>
//                                 <div style={{ padding: "8px", fontSize: "14px", textAlign: "center", borderBottom: "1px solid black" }}>
//                                     <b>CGST</b>
//                                 </div>
//                                 <div style={{ display: "flex" }}>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", textAlign: "center", borderRight: "1px solid black" }}>
//                                         Rate(%)
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", textAlign: "center" }}>
//                                         Amount(₹)
//                                     </div>
//                                 </div>
//                             </th>

//                             {/* SGST Column */}
//                             <th colSpan="2" style={{ border: "1px solid black", padding: "0", fontSize: "14px", width: "8%" }}>
//                                 <div style={{ padding: "8px", fontSize: "14px", textAlign: "center", borderBottom: "1px solid black" }}>
//                                     <b>SGST</b>
//                                 </div>
//                                 <div style={{ display: "flex" }}>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", textAlign: "center", borderRight: "1px solid black" }}>
//                                         Rate(%)
//                                     </div>
//                                     <div style={{ flex: 1, padding: "8px", fontSize: "14px", textAlign: "center" }}>
//                                         Amount(₹)
//                                     </div>
//                                 </div>
//                             </th>

//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{formData.product_items_labels ? formData.product_items_labels.cess || "" : ""} (%)</th>
//                             <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{formData.product_items_labels ? formData.product_items_labels.total || "" : ""} (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orderData?.line_items.length > 0 ? orderData?.line_items.map((item, index) => {
//                             const taxRate = item.tax_lines?.length > 0 ? item.tax_lines[0].rate * 100 : 0; // Extract GST rate dynamically

//                             // const gstCessTotal = item.gst + item.cess;
//                             // const taxableAdd = gstCessTotal / 100;
//                             // const taxableAmount = gstCessTotal;
//                             const taxableAmount = ((item.price / (1 + ((parseFloat(item.gst) || 0) + (parseFloat(item.cess) || 0)) / 100)) * item.current_quantity).toFixed(2);
//                             const gstAmount = (item.price * ((parseFloat(item.gst) || 0) / 100)).toFixed(2);
//                             const igstAmount = gstAmount; // Assuming IGST for inter-state sales

//                             const cgstRate = (parseFloat(item.gst) || 0) / 2;
//                             const cgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2);
//                             const sgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2); // SGST = 50% of GST


//                             const cessAmount = ((item.cess / 100) * taxableAmount).toFixed(2);
//                             const totalAmount = (item.price * item.current_quantity).toFixed(2); // Total amount after tax


//                             return (<tr key={index}>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "5%" }}>{index + 1}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "20%" }}>
//                                     {formData.product_items_labels?.hide_show_product_title ? `${item.name || ''}` : ""}
//                                     {(formData.product_items_labels?.hide_show_product_title && item.name && formData.product_items_labels?.hide_show_product_sku && item.sku) ? " - " : ""}
//                                     {formData.product_items_labels?.hide_show_product_sku ? `${item.sku || ''}` : ""}
//                                 </td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "5%" }}>{`${item.quantity || ''}`}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{`${item.price || ''}`}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{`${item.total_discount || ''}`}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{taxableAmount}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{formData.product_items_labels?.hide_show_product_hsn && (
//                                     <td>{item.hsn}</td>
//                                 )}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{cgstRate}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{cgstAmount}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{`${cgstRate}`}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{cgstAmount}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>{`${item.cess}% (${cessAmount})`}</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>{totalAmount}</td>
//                             </tr>)
//                         }
//                         )

//                             : <tr>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "5%" }}>S. No.</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "20%" }}>ITEM - SKU</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "5%" }}>QTY</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>RATE PER ITEM (₹)</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>DISCOUNT ITEM (₹)</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>TAXABLE ITEM (₹)</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>HSN</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>9</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>3.37</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>9</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>3.37</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "8%" }}>CESS (%)</td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", width: "10%" }}>TOTAL (₹)</td>
//                             </tr>}


//                         {/* Total Row */}
//                         <tr style={{ fontWeight: "bold" }}>
//                             <td colSpan="2" style={{ backgroundColor: "#C1D6EC", border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "center" }}>
//                                 Total
//                             </td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "center" }}>{totalQuantitySum}</td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}></td>
//                             <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "center" }}>{totalAmountSum.toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 <div style={{ display: "flex", width: "100%" }}>
//                     {/* First Table */}
//                     <table style={{ width: "50%", borderCollapse: "collapse" }}>
//                         <thead>
//                             <tr>
//                                 <th style={{ border: "1px solid black", padding: "8px", fontSize: "14px", backgroundColor: "#C1D6EC" }}>
//                                     Total Invoice Amount in Words
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                     {/* Yaha par amount words me aa jayega */}
//                                     {totalAmountInWords}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                     <strong>{paymentMode ? paymentMode : ''}</strong> : {orderData?.payment_gateway_names && orderData?.payment_gateway_names.length > 0 ? orderData?.payment_gateway_names[0] : ''}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px" }}>
//                                     <strong>{termAndConditions ? termAndConditions : ''}</strong><br></br>
//                                     {terms_and_conditions}
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     {/* Second Table (Pending Heading) */}
//                     <table style={{ width: "50%", borderCollapse: "collapse" }}>
//                         <tbody>
//                             <tr>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left", width: "50%" }}>
//                                     Total amount before Tax (₹)
//                                 </td>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right", width: "50%" }}>
//                                     {totalTaxableAmountSum.toFixed(2)}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     Total Tax amount (₹)
//                                 </td>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     {(totalAmountSum - totalTaxableAmountSum).toFixed(2)}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     Discount %
//                                 </td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     -
//                                 </td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     Discount %
//                                 </td>
//                                 <td style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     -
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     <strong>Shipping amount(₹)</strong><br></br>
//                                     (SAC Code:996511)
//                                 </td>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     -
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     <strong>Total amount after Tax(₹)</strong>
//                                 </td>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     {totalAmountSum.toFixed(2)}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     <strong>Round Off</strong>
//                                 </td>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     {roundOff}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     <strong>TOTAL(₹)</strong>
//                                 </td>
//                                 <td colSpan="2" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "right" }}>
//                                     <strong>{roundedTotal.toFixed(2)}</strong>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="4" style={{ border: "1px solid black", padding: "8px", fontSize: "14px", textAlign: "left" }}>
//                                     <div style={{ display: 'flex' }}>
//                                         <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             {hideShowQrCodeImage && <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 50 50" }} xml:space="preserve" class=""><g><path d="M0 0v170h170V0H0zm130 130H40V40h90v90z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M65 65h40v40H65zM342 0v170h170V0H342zm130 130h-90V40h90v90z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M407 65h40v40h-40zM0 342v170h170V342H0zm130 130H40v-90h90v90z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M65 407h40v40H65zM40 197h40v40H40zM120 277v-40H80v40h39v40h40v-40zM280 77h40v40h-40zM200 40h40v77h-40zM240 0h40v40h-40zM240 117v40h-40v40h80v-80zM280 355v-39h-40v-79h-40v80h40v39h40v39h80v-40z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M280 197h40v80h-40zM472 236v-39h-73v40h-39v40h40v39h112v-80h-40zm0 40h-72v-39h72v39zM472 355h40v80h-40zM320 277h40v40h-40zM360 395h40v40h-40zM400 355h40v40h-40zM400 435v77h40v-37h32v-40zM200 356h40v76h-40zM320 472v-40h-80v80h40v-40h39v40h40v-40zM120 197h80v40h-80zM0 237h40v80H0z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg>
//                                             }
//                                         </div>
//                                         <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: 'black' }}>
//                                             <div>E. & O.E</div>
//                                             <div><strong>For, {companyLegalName}</strong></div>
//                                             <div style={{ textAlign: "right" }}>This is a computer-generated invoice and does not require a signature</div>
//                                         </div>

//                                     </div>

//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>


//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
//                     {isThankYouForYourBusiness ? <div style={{ padding: '5px 10px' }}><strong>{thankYouForYourBusiness && thankYouForYourBusiness}</strong></div> : null}
//                     {isThankYouForYourBusiness ? <div style={{ padding: '5px 10px', color: '#ccc' }}>{hideShowGeneratedFrom ? `Generated from: ${shopDomain}` : ''}    {hideShowPageNo ? "Page 1 of 1" : ""}</div> : null}
//                 </div>
//             </div>
//         </div >
//     );
// }

// /* Styling */
// const cellStyle = {
//     border: "1px solid black",
//     padding: "8px",
//     fontSize: "14px",
//     textAlign: "left"
// };

// const headerCellStyle = {
//     textAlign: "center",
//     fontSize: "16px",
//     fontWeight: "bold",
//     padding: "8px",
//     border: "1px solid black"
// };