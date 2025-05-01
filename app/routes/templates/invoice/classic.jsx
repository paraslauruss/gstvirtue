import numberToWords from 'number-to-words';

export const Classic = ({ bgColor, textColor, fontFamily, logo, signature, formData, orderData, storeData, type }) => {

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
        <div id='invoice' style={{ colorAdjust: 'exact', WebkitPrintColorAdjust: 'exact', fontFamily: fontFamily, position: 'relative', display: 'flex', backgroundColor: '#fff', flexDirection: 'column', backgroundClip: 'border-box' }}>

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

                                                        &nbsp;<img id="storeEmailIcon" src="/assets/images/mail-icon.png" alt="" width="12px" height="12px"></img>&nbsp;
                                                        <strong id="template_store_email">{formData?.store_information?.store_email}</strong>

                                                    </td>
                                                    <td align="center" style={{ paddingTop: '5px', paddingLeft: '30px' }}>

                                                        <span id="store_domain_on_off_tr">
                                                            <img src="/assets/images/web-icon.png" alt="" width="10px" height="10px"></img>&nbsp;
                                                            <strong id="template_store_domain">
                                                                {formData?.store_information?.shop_domain}
                                                            </strong>
                                                        </span>

                                                    </td>
                                                    <td style={{ paddingTop: '5px' }} width="33%" align="right">
                                                        <img src="/assets/images/phone-icon.png" alt="" width="12px" height="12px"></img>&nbsp;
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
                                                    <td align="center" height="40" class="custom_bg_text_color" bgcolor={bgColor} style={{ color: textColor, borderBottom: 'solid 2px #000', borderTop: 'solid 2px #000', padding: '0 5px', fontSize: '18px', }}>
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
                                                    <td width="290px" height="25" style={{
                                                        padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000',           // Reduced font size for better fit
                                                        textAlign: 'left',           // Consistent alignment
                                                        fontWeight: 'normal',        // Reduced font weight to avoid bold overlapping
                                                        lineHeight: '1.4',           // Increased line height for better spacing
                                                        whiteSpace: 'normal',        // Allow text to wrap properly
                                                        wordBreak: 'break-word',
                                                    }}>
                                                        <span id="template_invoice_no">{formData?.customize_store_labels?.invoice_no}</span>: <strong id="invoice_no_on_off_tr">{formData?.customize_store_labels?.is_invoice_no && (orderData?.invoice_number || '#1048')}</strong>
                                                    </td>
                                                    <td width="285.5px" style={{
                                                        padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', fontSize: '12px',            // Reduced font size for better fit
                                                        textAlign: 'left',           // Consistent alignment
                                                        fontWeight: 'normal',        // Reduced font weight to avoid bold overlapping
                                                        lineHeight: '1.4',           // Increased line height for better spacing
                                                        whiteSpace: 'normal',        // Allow text to wrap properly
                                                        wordBreak: 'break-word',
                                                    }}>
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
                                                        <td width="290px" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
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
                                                        <td width="581px" class="label_billing_on_off custom_bg_text_color" bgcolor={bgColor} height="25" align="center" style={{ color: textColor, padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>
                                                            <strong id="template_billing_head_title">{formData?.billing_shipping_labels?.bill_to_party}</strong>
                                                        </td>
                                                        <td width="601px" class="label_shipping_on_off custom_bg_text_color" bgcolor={bgColor} align="center" style={{ color: textColor, display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000' }}>
                                                            <strong id="template_shipping_head_title">{formData?.billing_shipping_labels?.ship_to_party}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="581px" class="label_billing_on_off" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}><strong>{orderData?.customer?.first_name} {orderData?.customer?.last_name}</strong></td>
                                                        <td width="601px" class="label_shipping_on_off" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000' }}><strong>{orderData?.customer?.shipping_address?.first_name} {orderData?.customer?.shipping_address?.last_name}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="581px" class="label_billing_on_off" height="35" valign="middle" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000' }}>{orderData?.customer?.default_address?.address1 || '505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054'}</td>
                                                        <td width="601px" class="label_shipping_on_off" valign="middle" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000' }}>{orderData?.shipping_address?.address1 || '505 Shapath2, Opp. Rajpath Club, SG Highway, 360015, Bodakdev, Ahmedabad, Gujarat 380054'}</td>
                                                    </tr>

                                                    <tr id="bill_ship_phone_and_customer_email_tr">
                                                        <td class="label_billing_on_off">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td class="bill_ship_phone_no_on_off_tr" style={{ borderBottom: 'solid 1px #000', borderRRight: 'solid 1px #000' }}>&nbsp;&nbsp;<strong><span id="template_billing_phone">Phone</span>:</strong> {orderData?.customer?.phone || '9876543210'}</td>
                                                                    <td class="label_customer_email_on_off_tr" style={{ borderWidth: '0px 1px 1px', borderBottomStyle: 'solid', borderBottomColor: ' rgb(0, 0, 0)', borderTopStyle: 'initial', borderTopColor: 'initial', borderRightStyle: 'solid', borderRightColor: ' rgb(0, 0, 0)', borderLeftStyle: 'solid', borderLeftColor: 'initial' }}>
                                                                        &nbsp;&nbsp;<strong>E:</strong> {orderData?.customer?.email}
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                        <td class="label_shipping_on_off" style={{ display: isShippingVisible ? 'table-cell' : 'none', }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td class="bill_ship_phone_no_on_off_tr" style={{ borderBottom: 'solid 1px #000' }}>&nbsp;&nbsp;<strong><span id="template_shipping_phone">Phone</span>:</strong> {orderData?.billing_address?.phone || '9876543210'}</td>
                                                                    <td class="label_customer_email_on_off_tr" style={{ borderWidth: '0px 0px 1px 1px', borderBottomStyle: 'solid', borderBottomColor: 'rgb(0, 0, 0)', borderLeftStyle: 'solid', borderLeftColor: 'initial', borderTopStyle: 'initial', borderTopColor: 'initial', borderRightStyle: 'initial', borderRightColor: 'initial' }}>
                                                                        &nbsp;&nbsp;<strong>E:</strong>
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>

                                                    <tr class="bill_ship_gstin_on_off_tr">
                                                        <td width="581px" class="label_billing_on_off" height="25" style={{ padding: '0 5px', borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', }}><strong><span id="template_billing_gstin">GSTIN</span>:</strong> {orderData?.customer?.gst_number}</td>
                                                        <td width="601px" class="label_shipping_on_off" style={{ display: isShippingVisible ? 'table-cell' : 'none', padding: '0 5px', borderBottom: 'solid 1px #000', }}><strong><span id="template_shipping_gstin">GSTIN</span>:</strong> </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%" class="label_billing_on_off" height="25" style={{ borderRight: 'solid 1px #000', }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td width="47%" height="25" style={{ padding: '0 5px' }}><strong>State:</strong> {orderData?.customer?.default_address?.province} </td>
                                                                    <td width="16%" style={{ borderLeft: 'solid 1px #000' }} align="center">Code</td>
                                                                    <td width="12%" style={{ borderLeft: 'solid 1px #000' }} align="center">{gstStateCodes[orderData?.customer?.default_address?.province_code]}</td>
                                                                    <td width="25%" style={{ borderLeft: 'solid 1px #000', padding: '0 5px' }} align="left"><strong>Country:</strong> {orderData?.customer?.default_address?.country_name}</td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                        <td width="50%" class="label_shipping_on_off" height="25" style={{ display: isShippingVisible ? 'table-cell' : 'none', }}>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td width="47%" height="25" style={{ padding: '0 5px' }}><strong>State:</strong> {orderData?.customer?.shipping_address?.province} </td>
                                                                    <td width="16%" style={{ borderLeft: 'solid 1px #000' }} align="center">Code</td>
                                                                    <td width="12%" style={{ borderLeft: 'solid 1px #000' }} align="center">{gstStateCodes[orderData?.customer?.shipping_address?.province_code]}</td>
                                                                    <td width="25%" style={{ borderLeft: 'solid 1px #000', padding: '0 5px' }} align="left"><strong>Country:</strong> {orderData?.customer?.shipping_address?.country_name}</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderTop: 'solid 2px #000' }} height="10"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table style={{ fontSize: '12px', borderCollapse: 'collapse', borderColor: '#444444' }} width="100%" border="0" cellspacing="0" cellpadding="0" align="center">

                <tbody>
                    <tr align="center" bgcolor={bgColor} style={{ color: textColor, padding: 0 }}>
                        <td align="center" rowspan="2" style={{ borderBottom: 'solid 1px #000', borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px', }}><strong>S. No.</strong></td>
                        <td align="center" rowspan="2" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong id="template_product_title">{formData?.product_items_labels?.item_sku}</strong>
                        </td>
                        <td data-value="qty" rowspan="2" align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong id="template_product_quantity">{formData?.product_items_labels?.qty}</strong>
                        </td>
                        <td data-value="rate_per_item" rowspan="2" align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong><span id="template_product_rate">{formData?.product_items_labels?.rate_per_item}</span>(₹)</strong>
                        </td>
                        {formData?.product_items_labels?.hide_show_product_discount && <td data-value="discount_item" rowspan="2" align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong><span id="template_product_discount">{formData?.product_items_labels?.discount_item}</span>(₹)</strong>
                        </td>}
                        <td data-value="taxable_item" rowspan="2" align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong><span id="template_product_taxable_item">{formData?.product_items_labels?.texable_item}</span>(₹)</strong>
                        </td>

                        {formData?.product_items_labels?.hide_show_product_hsn && <td data-value="hsn" rowspan="2" align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong id="template_product_hsn">{formData?.product_items_labels?.hsn}</strong>
                        </td>}
                        <td colspan="2" align="center" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>
                            <strong id="template_product_cgst">{formData?.product_items_labels?.cgst}</strong>
                        </td>
                        <td colspan="2" align="center" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>
                            <strong id="template_product_sgst">{formData?.product_items_labels?.sgst}</strong>
                        </td>
                        <td width="80px" colspan="2" align="center" style={{ borderRight: '1px solid rgb(0, 0, 0)', borderBottom: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none', }}>
                            <strong id="template_product_igst">{formData?.product_items_labels?.igst}</strong>
                        </td>
                        <td align="center" rowspan="2" style={{ borderRight: 'solid 1px #000', padding: '5px', }}>
                            <strong><span id="template_product_cess">{formData?.product_items_labels?.cess}</span> <br />(%)</strong>
                        </td>
                        <td align="center" rowspan="2" style={{ borderRight: 'solid 2px #000', padding: '5px', }}>
                            <strong><span id="template_product_total">{formData?.product_items_labels?.total}</span>(₹)</strong>
                        </td>
                    </tr>
                    <tr align="center" bgcolor={bgColor} style={{ color: textColor, padding: 0 }}>
                        <td align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}><strong>Rate(%)</strong></td>
                        <td align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}><strong>Amount(₹)</strong></td>
                        <td align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}><strong>Rate(%)</strong></td>
                        <td align="center" style={{ borderBottom: 'solid 1px #000', borderRight: 'solid 1px #000', padding: '5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}><strong>Amount(₹)</strong></td>
                        <td align="center" style={{ borderBottom: '1px solid rgb(0, 0, 0)', borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none', }}><strong>Rate(%)</strong></td>
                        <td align="center" style={{ borderBottom: '1px solid rgb(0, 0, 0)', borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}><strong>Amount(₹)</strong></td>
                    </tr>

                    {type === 'order' ? <>
                        {orderData?.line_items?.map((item, index) => {

                            const taxableAmount = ((item.price / (1 + ((parseFloat(item.gst) || 0) + (parseFloat(item.cess) || 0)) / 100)) * item.current_quantity).toFixed(2);
                            const cgstRate = (parseFloat(item.gst) || 0) / 2;
                            const cgstAmount = (((cgstRate / 100) * taxableAmount)).toFixed(2);

                            const sgstRate = (parseFloat(item.gst) || 0) / 2;
                            const sgstAmount = (((sgstRate / 100) * taxableAmount)).toFixed(2);

                            const cessAmount = ((item.cess / 100) * taxableAmount).toFixed(2);
                            const totalAmount = ((item.price * item.current_quantity) - item?.total_discount).toFixed(2);

                            const igstRate = parseFloat(item.gst) || 0;
                            const igstAmount = ((igstRate / 100) * taxableAmount).toFixed(2);

                            return (
                                <tr align="center" style={{ padding: '8px 0px' }}>
                                    <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px', }}>{index + 1}</td>
                                    <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}><span>{formData?.product_items_labels?.hide_show_product_title && item?.name}</span>{formData?.product_items_labels?.hide_show_product_title &&
                                        formData?.product_items_labels?.hide_show_product_sku && (
                                            <span> - </span>
                                        )}<span>{formData?.product_items_labels?.hide_show_product_sku && item?.sku}</span></td>
                                    <td data-value="hsn" data-position="1" align="center" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>{item?.quantity}</td>
                                    <td data-value="qty" data-position="2" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>{item?.price}</td>
                                    {formData?.product_items_labels?.hide_show_product_discount && <td data-value="rate_per_item" data-position="3" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>{item?.total_discount}</td>}
                                    <td data-value="discount_item" data-position="4" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>{taxableAmount}</td>
                                    {formData?.product_items_labels?.hide_show_product_hsn && <td data-value="taxable_item" data-position="5" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>{item?.hsn}</td>}
                                    <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>{cgstRate}</td>
                                    <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>{cgstAmount}</td>
                                    <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>{sgstRate}</td>
                                    <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>{sgstAmount}</td>
                                    <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>{igstRate}</td>
                                    <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>{igstAmount}</td>
                                    <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>({item?.cess}) {cessAmount}</td>

                                    <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>{totalAmount}</td>
                                </tr>
                            )
                        })}

                        {/* Empty Rows */}
                        {Array.from({ length: Math.max(0, 5 - orderData?.line_items?.length) }).map((_, emptyIndex) => (
                            <tr align="center" style={{ padding: '8px 0px' }}>
                                <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                                <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                                {formData?.product_items_labels?.hide_show_product_discount && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                                {formData?.product_items_labels?.hide_show_product_hsn && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                                <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>&nbsp;</td>
                            </tr>
                        ))}
                    </> : <>
                        <tr align="center" style={{ padding: '8px 0px' }}>
                            <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>2</td>
                            <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}><span>T-Shirt</span><span> - SKU</span></td>
                            <td data-value="hsn" data-position="1" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>5</td>
                            <td data-value="qty" data-position="2" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>500.00</td>
                            {formData?.product_items_labels?.hide_show_product_discount && <td data-value="rate_per_item" data-position="3" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>0.00</td>}
                            <td data-value="discount_item" data-position="4" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>2293.58</td>
                            {formData?.product_items_labels?.hide_show_product_hsn && <td data-value="taxable_item" data-position="5" align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>665854</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>4.5</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>103.21</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>4.5</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>103.21</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>9</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>206.42</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}></td>

                            <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>2500.00</td>
                        </tr>
                        <tr align="center" style={{ padding: '8px 0px' }}>
                            <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_discount && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_hsn && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>&nbsp;</td>
                        </tr>
                        <tr align="center" style={{ padding: '8px 0px' }}>
                            <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_discount && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_hsn && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>&nbsp;</td>
                        </tr>
                        <tr align="center" style={{ padding: '8px 0px' }}>
                            <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_discount && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_hsn && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>&nbsp;</td>
                        </tr>
                        <tr align="center" style={{ padding: '8px 0px' }}>
                            <td align="right" style={{ borderLeft: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="left" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_discount && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            {formData?.product_items_labels?.hide_show_product_hsn && <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>}
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 1px #000', padding: '5px 5px' }}>&nbsp;</td>
                            <td align="right" style={{ borderRight: 'solid 2px #000', padding: '5px 5px' }}>&nbsp;</td>
                        </tr></>}







                    <tr align="center" style={{ padding: '8px 0px' }}>
                        <td bgColor={bgColor} align="center" style={{ borderLeft: 'solid 2px #000', borderTop: 'solid 2px #000', padding: '5px 5px' }}></td>
                        <td bgColor={bgColor} align="center" style={{ color: textColor, borderTop: 'solid 2px #000', padding: '5px 5px', borderRight: 'solid 1px #000', }}><strong>Total</strong></td>
                        <td data-position="1" data-value="hsn" align="center" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}>{totalQuantitySum}</td>
                        <td data-position="2" data-value="qty" align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}></td>
                        {formData?.product_items_labels?.hide_show_product_discount && <td data-position="3" data-value="rate_per_item" align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}></td>}
                        <td data-position="4" data-value="discount_item" align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}></td>
                        {formData?.product_items_labels?.hide_show_product_hsn && <td data-position="5" data-value="taxable_item" align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}></td>}
                        <td align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}></td>
                        <td align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}></td>
                        <td align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}></td>
                        <td align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px', display: cgst_igst === 'igst' ? 'none' : 'table-cell' }}></td>
                        <td align="right" style={{ borderTop: '2px solid rgb(0, 0, 0)', borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}></td>
                        <td align="right" style={{ borderTop: '2px solid rgb(0, 0, 0)', borderRight: '1px solid rgb(0, 0, 0)', padding: '5px', display: cgst_igst === 'igst' ? 'table-cell' : 'none' }}></td>
                        <td align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 1px #000', padding: '5px 5px' }}></td>
                        <td align="right" style={{ borderTop: 'solid 2px #000', borderRight: 'solid 2px #000', padding: '5px 5px' }}><strong>{totalAmountDiscountSum}</strong></td>
                    </tr>
                </tbody>
            </table>


            <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style={{ border: 'solid 2px #000' }}>
                <tbody>
                    <tr>
                        <td align="left" width="579px" valign="top" style={{ borderRight: 'solid 1px #000', position: 'relative', paddingBottom: '80px', }}>
                            <table width="100%" height="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr id="total_amount_in_words_on_off_tr" >
                                        <td>
                                            <table width="100%">
                                                <tbody><tr>
                                                    <td height="41" align="center" class="custom_bg_text_color" style={{ borderBottom: 'solid 1px #000', padding: '5px 5px', }}>
                                                        <strong><span id="template_total_amount_in_words">{formData?.others_labels?.total_invoice_amount_in_words}</span></strong>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                        <td style={{ padding: '5px' }} align="center">{totalAmountInWords || ''}</td>
                                                    </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                    <tr id="payment_mode_on_off_tr">
                                        <td align="left" style={{ borderTop: 'solid 1px #000', padding: '5px', }}>
                                            <strong><span id="template_payment_mode">{formData?.others_labels?.payment_mode}</span> : </strong>
                                            {Array.isArray(orderData?.payment_gateway_names) && orderData?.payment_gateway_names.length > 0
                                                ? orderData.payment_gateway_names[0]
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr id="order_note_on_off_tr">
                                        <td align="left" style={{ borderTop: 'solid 1px #000', padding: '5px', }}><strong><span id="template_order_note">{formData?.others_labels?.order_note}</span> : </strong>{orderData?.note}</td>
                                    </tr>
                                    <tr id="terms_conditions_on_off_tr">
                                        <td align="left" style={{ borderTop: 'solid 1px #000', padding: '5px', }}><strong><span id="template_terms_conditions">{formData?.others_labels?.term_and_conditions}</span></strong><br />
                                            <span id="template_store_terms_conditions">
                                                {formData?.others_labels?.term_and_conditions}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody></table>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', }}>
                                <img id="financial_status_on_off_tr" src="/assets/images/paid_imag.png" alt="" width="150" height="70" />
                            </div>
                        </td>
                        <td width="599px" align="left" valign="top">
                            <table width="100%" border="0" cellspacing="0" cellpadding="2" style={{ marginRight: '-1px', marginBottom: '-0.5px', }}>
                                <tbody><tr>
                                    <td width="50%" align="left" height="35" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}><strong>Total Amount before Tax(₹)</strong></td>
                                    <td width="50%" align="right" height="35" style={{ borderRight: '0px', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}>{totalTaxableAmountSum ? totalTaxableAmountSum.toFixed(2) : '0.00'}</td>
                                </tr>
                                    <tr>
                                        <td width="50%" align="left" height="15" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '15px', }}><strong>Total Tax Amount(₹)</strong></td>
                                        <td width="50%" align="right" height="35" style={{ borderRight: '0px', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}>{(totalAmountDiscountSum - totalTaxableAmountSum).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', }}>
                                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style={{ borderCollapse: 'collapse', marginTop: '-2px', marginBottom: '-2px', }}>
                                                <tbody><tr>
                                                    <td align="left" width="60%" style={{ padding: '5px 5px', lineHeight: '30px', }}>
                                                        <strong>Discount %</strong>
                                                    </td>
                                                    <td align="right" style={{ padding: '5px 5px', lineHeight: '30px', borderLeft: 'solid 1px #000', }}>{totalDiscountInPercentage.toFixed(2)}</td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                        <td width="50%" style={{ borderBottom: 'solid 1px #000', }}>
                                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style={{ borderCollapse: 'collapse', marginTop: '-2px', marginBottom: '-2px', }}>
                                                <tbody><tr>
                                                    <td align="left" width="50%" style={{ padding: '5px 5px', lineHeight: '30px', }}>
                                                        <strong>Discount(₹)</strong>
                                                    </td>
                                                    <td align="right" style={{ width: '100px', padding: '5px 5px', lineHeight: '30px', borderLeft: 'solid 1px #000', }}>{orderData?.total_discounts}</td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%" align="left" height="35" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}><strong>Shipping Amount(₹)<br />(SAC Code:552114) </strong></td>
                                        <td width="50%" align="right" style={{ borderRight: '0px', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}>{orderData?.total_shipping_price_set?.shop_money?.amount}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%" align="left" height="35" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}><strong>Total Amount After Tax(₹)</strong></td>
                                        <td width="50%" align="right" style={{ borderRight: '0px', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}>{totalAmountDiscountSum.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%" align="left" height="35" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}><strong>Round Off</strong></td>
                                        <td width="50%" align="right" style={{ borderRight: '0px', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}>{roundOff}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%" align="left" height="35" style={{ borderRight: 'solid 1px #000', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', textTransform: 'uppercase', }}><strong>Total(₹)</strong></td>
                                        <td width="50%" align="right" style={{ borderRight: '0px', borderBottom: 'solid 1px #000', padding: '5px 5px', lineHeight: '30px', }}><strong>{roundedTotal.toFixed(2)}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" align="right" style={{ padding: '3px 5px', borderTop: 'solid 1px #000', }}>
                                            <div style={{ float: 'left', width: '50%', textAlign: 'left', padding: '10px 0', }}>
                                                <div id="qr_code_on_off_tr" style={{ width: '100px', float: 'left', textAlign: 'center', }}>
                                                    <img src="data:image/png;base64, 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" />
                                                    <span style={{ fontSize: '10px' }}>Scan to download</span>
                                                </div>
                                            </div>
                                            <div style={{ float: 'left', width: '50%', textAlign: 'right', }}>
                                                <p style={{ fontStyle: 'italic' }}><span id="template_e_and_o_e">{formData?.others_labels?.e_and_o_e}</span></p>
                                                <p>
                                                    <strong>For, <span id="template_shop_name_footer">{formData?.store_information?.company_legal_name}</span></strong>&nbsp;&nbsp;<br />
                                                </p>
                                                <div style={{ paddingBottom: '10px', display: 'inline-block', width: '100%', }}>
                                                    {signature}
                                                </div>
                                                <p>
                                                    <span id="template_no_signature_text" style={{ fontSize: '12px' }}>This is a computer generated invoice and does not require a signature</span>&nbsp;&nbsp;
                                                </p>
                                            </div>

                                        </td>
                                    </tr>
                                </tbody></table>

                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '110px 0 5px 0' }}>
                <div style={{
                    fontSize: '14px',
                    color: '#000',
                    fontWeight: 'bold',
                }}>
                    {formData?.footer_labels?.is_thank_you_for_your_business && <span id="thanks_for_business_on_off_tr">
                        {formData?.footer_labels?.thank_you_for_your_business}
                    </span>}
                </div>
                <div style={{
                    fontSize: '12px',
                    color: ' #5E5E5E',
                    fontWeight: 'normal',
                }}>
                    {formData?.footer_labels?.hide_show_generated_from && <span id="generated_from_on_off_tr">
                        Generated from:
                        {formData?.store_information?.shop_domain}&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>}
                    {formData?.footer_labels?.hide_show_page_no && <span id="page_no_on_off_tr">Page 1 of 1</span>}&nbsp;
                </div>
            </div>

        </div >
    );
}