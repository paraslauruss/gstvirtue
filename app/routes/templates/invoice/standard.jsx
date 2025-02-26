

export const Standard = ({ bgColor, textColor, fontFamily, logo, signature, formData }) => {

    const styles = {
        table: {
            border: '1px solid black',
            textAlign: 'left',
            padding: '5px 10px',
            color: textColor,
            fontFamily: fontFamily,
        },
        td: {
            border: '1px solid black',
            textAlign: 'left',
            padding: '5px 10px',
            color: textColor,
            fontFamily: fontFamily,
        },
        th: {
            border: '1px solid black', textAlign: 'left', padding: '5px 10px', backgroundColor: bgColor
        },
        leftSection: {
            fontSize: '12px',
            fontWeight: '500',
            marginTop: '20px',
        },
        title: {
            fontSize: '20px',
            fontWeight: '600',
            marginTop: '20px',
        },
        rightSection: {
            fontSize: '12px',
            fontWeight: '500',
            justifyContent: 'end',
            display: 'flex',
        },
    };

    const paymentMode = formData?.others_labels?.payment_mode;
    const isPaymentMode = formData?.others_labels?.is_payment_mode;

    const orderNote = formData?.others_labels?.order_note;
    const isOrderNote = formData?.others_labels?.is_order_note;

    const termAndConditions = formData?.others_labels?.term_and_conditions;
    const terms_and_conditions = formData?.store_information?.terms_and_conditions;
    const isTermAndConditions = formData?.others_labels?.is_term_and_conditions;

    const totalInvoiceAmountInWords = formData?.others_labels?.total_invoice_amount_in_words;
    const isTotalInvoiceAmountInWords = formData?.others_labels?.is_total_invoice_amount_in_words;

    const eAndOE = formData?.others_labels?.e_and_o_e;
    const companyLegalName = formData?.store_information?.company_legal_name;

    const hideShowFinancialStatus = formData?.others_labels?.hide_show_financial_status;
    const hideShowQrCodeImage = formData?.others_labels?.hide_show_qr_code_image;

    const thankYouForYourBusiness = formData?.footer_labels?.thank_you_for_your_business;
    const isThankYouForYourBusiness = formData?.footer_labels?.is_thank_you_for_your_business;

    const shopDomain = formData?.store_information?.shop_domain;
    const hideShowGeneratedFrom = formData?.footer_labels?.hide_show_generated_from;
    const hideShowPageNo = formData?.footer_labels?.hide_show_page_no;

    return (
        <div>
            <div style={{ fontFamily: fontFamily, color: textColor, margin: '10px', outline: '1px solid #000', outlineOffset: '-1px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: '1' }}>
                        <div style={{ fontSize: '20px', fontWeight: '600', marginTop: '20px' }}>
                            {formData.customize_store_labels ? formData.customize_store_labels.tax_invoice || "" : ""}
                        </div>

                        <div style={{ fontSize: '12px', fontWeight: '500' }}>
                            {formData.customize_store_labels ? formData.customize_store_labels.export_invoice ? formData.customize_store_labels.is_gstin ? `${formData.customize_store_labels.gstin} : 22ABCDE1234F1Z9` : "" : "" : ""}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: '500' }}>
                            {formData.customize_store_labels && formData.customize_store_labels.is_iec_code ? formData.customize_store_labels ? `${formData.customize_store_labels.iec_code} : 1234567890` || "" : "" : ""}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: '500' }}>
                            {formData.customize_store_labels && formData.customize_store_labels.is_cin ? formData.customize_store_labels ? `${formData.customize_store_labels.cin} : U12345MH2020PLC678901` || "" : "" : ""}
                        </div>
                    </div>
                    <div style={{ width: '100%', flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {logo}
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: '1' }}>
                        <div style={{ fontSize: '20px', fontWeight: '500', justifyContent: 'end', display: 'flex', marginTop: '20px' }}>
                            <strong>{formData.customize_store_labels ? formData.customize_store_labels.original || "" : ""}</strong>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: '500', justifyContent: 'end', display: 'flex' }}>
                            {formData.customize_store_labels && formData.customize_store_labels.is_pan_no ? formData.customize_store_labels ? `${formData.customize_store_labels.pan_no} : ABCDE1234F` || "" : "" : ""}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: '500', justifyContent: 'end', display: 'flex' }}>
                            {formData.customize_store_labels && formData.customize_store_labels.is_fssai_lic_no ? formData.customize_store_labels ? `${formData.customize_store_labels.fssai_lic_no} : 10012021000000` || "" : "" : ""}
                        </div>
                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '12px', fontWeight: '600', padding: '0px 10px' }}>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '12px', fontWeight: '600', padding: '0px 10px', }}>
                    {formData.store_information ? formData.store_information.branch_name || "" : ""}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '12px', fontWeight: '600', padding: '0px 10px', }}>
                    {formData.store_information ? formData.store_information.company_legal_name || "" : ""}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '12px', padding: '0px 10px', }}>
                    {formData.store_information ? formData.store_information.store_address || "" : ""}
                </div>
                <div style={{ display: 'flex', fontSize: '12px', justifyContent: 'space-between', marginTop: '10px', padding: '0px 10px', }}>
                    <div>
                        {formData.store_information && formData.store_information.store_email ? (<div style={{ alignItems: 'center', display: 'flex', }}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="12" height="12" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }}
                                xml:space="preserve" class="">
                                <g>
                                    <path
                                        d="M507.49 101.721 352.211 256 507.49 410.279c2.807-5.867 4.51-12.353 4.51-19.279V121c0-6.927-1.703-13.412-4.51-19.279zM467 76H45c-6.927 0-13.412 1.703-19.279 4.51l198.463 197.463c17.548 17.548 46.084 17.548 63.632 0L486.279 80.51C480.412 77.703 473.927 76 467 76zM4.51 101.721C1.703 107.588 0 114.073 0 121v270c0 6.927 1.703 13.413 4.51 19.279L159.789 256 4.51 101.721z"
                                        fill="#000000" opacity="1" data-original="#000000" class=""></path>
                                    <path
                                        d="m331 277.211-21.973 21.973c-29.239 29.239-76.816 29.239-106.055 0L181 277.211 25.721 431.49C31.588 434.297 38.073 436 45 436h422c6.927 0 13.412-1.703 19.279-4.51L331 277.211z"
                                        fill="#000000" opacity="1" data-original="#000000" class=""></path>
                                </g>
                            </svg>
                            <div style={{ marginLeft: '5px' }}>{formData.store_information ? formData.store_information.store_email || "" : ""}</div>

                        </div>) : null}
                    </div>
                    <div style={{ alignItems: 'center', display: 'flex', }}>
                        {formData.store_information && formData.store_information.is_shop_domain ? <div style={{ alignItems: 'center', display: 'flex' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="12" height="12" x="0" y="0" viewBox="0 0 32 32" style={{ enableBackground: 'new 0 0 512 512' }}
                                xml:space="preserve" class="">
                                <g>
                                    <path
                                        d="M21.386 10C20.331 5.1 18.081 2 16 2s-4.331 3.1-5.386 8zM10 16a30.013 30.013 0 0 0 .267 4h11.466A30.013 30.013 0 0 0 22 16a30.013 30.013 0 0 0-.267-4H10.267A30.013 30.013 0 0 0 10 16zM10.614 22c1.055 4.9 3.305 8 5.386 8s4.331-3.1 5.386-8zM23.434 10h6.3a15.058 15.058 0 0 0-10.449-8.626C21.182 3.043 22.67 6.129 23.434 10zM30.453 12h-6.7A32.332 32.332 0 0 1 24 16a32.332 32.332 0 0 1-.248 4h6.7a14.9 14.9 0 0 0 0-8zM19.285 30.626A15.058 15.058 0 0 0 29.736 22h-6.3c-.766 3.871-2.254 6.957-4.151 8.626zM8.566 22h-6.3a15.058 15.058 0 0 0 10.451 8.626C10.818 28.957 9.33 25.871 8.566 22zM12.715 1.374A15.058 15.058 0 0 0 2.264 10h6.3c.766-3.871 2.254-6.957 4.151-8.626zM8 16a32.332 32.332 0 0 1 .248-4h-6.7a14.9 14.9 0 0 0 0 8h6.7A32.332 32.332 0 0 1 8 16z"
                                        fill="#000000" opacity="1" data-original="#000000"></path>
                                </g>
                            </svg>
                            <div style={{ marginLeft: '5px' }}>{formData.store_information ? formData.store_information.shop_domain || "" : ""}</div>
                        </div> : null}


                    </div>
                    <div>
                        {formData.store_information && formData.store_information.store_phone ? (<div style={{ alignItems: 'center', display: 'flex', }}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="12" height="12" x="0" y="0" viewBox="0 0 513.64 513.64"
                                style={{ enableBackground: 'new 0 0 512 512' }} xml:space="preserve" class="">
                                <g>
                                    <path
                                        d="m499.66 376.96-71.68-71.68c-25.6-25.6-69.12-15.359-79.36 17.92-7.68 23.041-33.28 35.841-56.32 30.72-51.2-12.8-120.32-79.36-133.12-133.12-7.68-23.041 7.68-48.641 30.72-56.32 33.28-10.24 43.52-53.76 17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12 0L18.38 62.08c-48.64 51.2 5.12 186.88 125.44 307.2s256 176.641 307.2 125.44l48.64-48.64c17.921-20.48 17.921-51.2 0-69.12z"
                                        fill="#000000" opacity="1" data-original="#000000"></path>
                                </g>
                            </svg>
                            <div style={{ marginLeft: '5px' }}>{formData.store_information ? formData.store_information.contact_person || "" : ""} : {formData.store_information ? formData.store_information.store_phone || "" : ""}</div>

                        </div>) : null}
                    </div>

                </div>

                <table style={{ ...styles.table, marginTop: '20px', fontSize: '12px', width: '100%', borderCollapse: 'collapse', }}>
                    <tr>
                        <td style={styles.td} colspan="1">{formData.customize_store_labels ? `${formData.customize_store_labels.invoice_no} : ${formData.customize_store_labels.is_invoice_no ? "INV/20003" : ""}` || "" : ""}  <strong></strong></td>
                        <td style={styles.td} colspan="2">{formData.customize_store_labels ? formData.customize_store_labels.order_no || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_order_no ? "#1005" : ""}</strong></td>
                        <td style={styles.td}>{formData.customize_store_labels ? formData.customize_store_labels.transport_mode || "" : ""} : {formData.customize_store_labels && formData.customize_store_labels.is_transport_mode ? "-" : ""}</td>
                    </tr>
                    <tr>
                        <td style={styles.td} colspan="1">{formData.customize_store_labels ? formData.customize_store_labels.invoice_date || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_invoice_date ? "20-01-2025" : ""}</strong></td>
                        <td style={styles.td} colspan="2">{formData.customize_store_labels ? formData.customize_store_labels.order_date || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_order_date ? "20-01-2025" : ""}</strong></td>
                        <td style={styles.td}>{formData.customize_store_labels ? formData.customize_store_labels.date_of_supply || "" : ""} : <strong>{formData.customize_store_labels && formData.customize_store_labels.is_date_of_supply ? "20-01-2025" : ""}</strong></td>
                    </tr>
                    <tr>
                        <td style={styles.td}>State: <strong>Gujarat</strong></td>
                        <td style={styles.td}>Code</td>
                        <td style={styles.td}><strong>24</strong></td>
                        <td style={styles.td}>{formData.customize_store_labels ? formData.customize_store_labels.place_of_supply || "" : ""} : {formData.customize_store_labels && formData.customize_store_labels.place_of_supply ? "-" : ""}</td>
                    </tr>
                </table>

                <table style={{ ...styles.table, marginTop: '20px', fontSize: '12px', width: '100%', borderCollapse: 'collapse', }}>
                    <tr>
                        <th style={{ border: '1px solid black', textAlign: 'center', padding: '5px 10px', backgroundColor: bgColor, }} colspan="4">{formData.billing_shipping_labels ? formData.billing_shipping_labels.bill_to_party || "" : ""}</th>
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <th style={{ border: '1px solid black', textAlign: 'center', padding: '5px 10px', backgroundColor: bgColor, }} colspan="4">{formData.billing_shipping_labels ? formData.billing_shipping_labels.ship_to_party || "" : ""}</th> : null}
                    </tr>
                    <tr>
                        <td style={styles.td} colspan="4">-</td>
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td} colspan="4">-</td> : null}
                    </tr>
                    <tr>
                        <td style={styles.td} colspan="4">-</td>
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td} colspan="4">-</td> : null}
                    </tr>
                    <tr>
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_phone ? <td style={styles.td} colspan={formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_customer_email ? "2" : "4"}>{formData.billing_shipping_labels ? formData.billing_shipping_labels.billing_phone || "" : ""}: -</td> : null}

                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_customer_email ? <td style={styles.td} colspan={formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_phone ? "2" : "4"}>E : -</td> : null}
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_phone ? formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td} colspan={formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_customer_email ? "2" : "4"}>{formData.billing_shipping_labels ? formData.billing_shipping_labels.shipping_phone || "" : ""}: -</td> : null : null}
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_customer_email ? formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td} colspan={formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_phone ? "2" : "4"}>E : -</td> : null : null}
                    </tr>
                    <tr>
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_gstin ? <td style={styles.td} colspan="4">{formData.billing_shipping_labels ? formData.billing_shipping_labels.billing_gstin || "" : ""}: -</td> : null}
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_gstin ? formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td} colspan="4">{formData.billing_shipping_labels ? formData.billing_shipping_labels.shipping_gstin || "" : ""}: -</td> : null : null}
                    </tr>
                    <tr>
                        <td style={styles.td}>State: - </td>
                        <td style={styles.td}>Code</td>
                        <td style={styles.td}></td>
                        <td style={styles.td}>Country</td>
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td}>State: - </td> : null}
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td}>Code</td> : null}
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td}></td> : null}
                        {formData.billing_shipping_labels && formData.billing_shipping_labels.hide_show_shipping_section ? <td style={styles.td}>Country</td> : null}
                    </tr>
                </table >

                <table style={{ ...styles.table, marginTop: '20px', fontSize: '12px', width: '100%', borderCollapse: 'collapse', }}>
                    <tr>
                        <th style={styles.th}>#</th>
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.item_sku || "" : ""}</th>
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.qty || "" : ""}</th>
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.rate_per_item || "" : ""}(₹)</th>
                        {formData.product_items_labels?.hide_show_product_hsn && <th style={styles.th}>{formData.product_items_labels?.discount_item || ""}(₹)</th>}
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.texable_item || "" : ""}(₹)</th>
                        {formData.product_items_labels?.hide_show_product_hsn && (
                            <th style={styles.th}>{formData.product_items_labels?.hsn || ""}</th>
                        )}
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.gst || "" : ""} (%)</th>
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.gst || "" : ""} (₹)</th>
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.cess || "" : ""} (%)(₹)</th>
                        <th style={styles.th}>{formData.product_items_labels ? formData.product_items_labels.total || "" : ""} (₹)</th>
                    </tr>
                    <tr>
                        <td style={styles.td}>1</td>
                        <td style={styles.td}>
                            {formData.product_items_labels?.hide_show_product_title ? "Eye & Lip Primer - BLNK-LB-01-04-YP-EP05" : ""}
                            {formData.product_items_labels?.hide_show_product_title && formData.product_items_labels?.hide_show_product_sku ? " - " : ""}
                            {formData.product_items_labels?.hide_show_product_sku ? "SKU" : ""}
                        </td>
                        <td style={styles.td}>1</td>
                        <td style={styles.td}>27.00</td>
                        <td style={styles.td}>0.00</td>
                        <td style={styles.td}>19.85</td>
                        {formData.product_items_labels?.hide_show_product_hsn && (
                            <td style={styles.td}>18</td>
                        )}
                        <td style={styles.td}>18</td>
                        <td style={styles.td}>3.57</td>
                        <td style={styles.td}>(18) 3.57</td>
                        <td style={styles.td}>27.00</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>.</td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        {formData.product_items_labels?.hide_show_product_hsn && (
                            <td style={styles.td}></td>
                        )}
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                    </tr>

                    <tr>
                        <th style={styles.th} colSpan={formData.product_items_labels?.hide_show_product_hsn ? 2 : 1}>{formData.product_items_labels ? formData.product_items_labels.total || "" : ""}</th>
                        <td style={styles.td}>1</td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        {
                            formData.product_items_labels?.hide_show_product_hsn && (
                                <td style={styles.td}></td>
                            )
                        }
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}>270</td>
                    </tr>
                </table>
                <div style={{ display: 'flex' }}>
                    <table style={{ marginRight: '-1', marginTop: '-1px', outline: '1px solid #000', outlineOffset: '-1px', fontSize: '12px', width: '100%', borderCollapse: 'collapse', }}>
                        {isPaymentMode ? <tr><td style={styles.td}><strong>{paymentMode ? paymentMode : ''}</strong> : manual</td></tr> : null}
                        {isOrderNote ? <tr><td style={styles.td}><strong>{orderNote ? orderNote : ''}</strong> : Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum....</td></tr> : null}
                        {isTermAndConditions ? <tr><td style={styles.td}><strong>{termAndConditions ? termAndConditions : ''}</strong><br></br>{terms_and_conditions}</td></tr> : null}
                        {isTotalInvoiceAmountInWords ? <tr><td style={styles.td}><strong>{totalInvoiceAmountInWords ? totalInvoiceAmountInWords : ''}</strong><br></br>Four Thousand Rupees Only</td></tr> : null}
                    </table>
                    <table style={{ marginLeft: '-1px', marginTop: '-1px', outline: '1px solid #000', outlineOffset: '-1px', fontSize: '12px', width: '100%', borderCollapse: 'collapse', }}>
                        <tr>
                            <td style={styles.td} colSpan={2}>Total Amount before Tax(₹)</td>
                            <td style={styles.td} colSpan={2}>3,632.86</td>
                        </tr>
                        <tr>
                            <td style={styles.td} colSpan={2}>Total Tax Amount(₹)</td>
                            <td style={styles.td} colSpan={2}>367.14</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Discount %</td>
                            <td style={styles.td}>-</td>
                            <td style={styles.td}>Discount(₹)</td>
                            <td style={styles.td}>-</td>
                        </tr>
                        <tr>
                            <td style={styles.td} colSpan={2}>Shipping Amount(₹)<br></br>(SAC Code:552114)</td>
                            <td style={styles.td} colSpan={2}>-</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Shipping GST %</td>
                            <td style={styles.td}>-</td>
                            <td style={styles.td}>Amount(₹)</td>
                            <td style={styles.td}>-</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Shipping CESS %</td>
                            <td style={styles.td}>-</td>
                            <td style={styles.td}>Amount(₹)</td>
                            <td style={styles.td}>-</td>
                        </tr>
                        <tr>
                            <td style={styles.td} colSpan={2}>Total Amount After Tax(₹)</td>
                            <td style={styles.td} colSpan={2}>4,000.00</td>
                        </tr>
                        <tr>
                            <td style={styles.td} colSpan={2}>Round Off</td>
                            <td style={styles.td} colSpan={2}>-</td>
                        </tr>
                        <tr>
                            <td style={styles.td} colSpan={2}><strong>Total(₹)</strong></td>
                            <td style={styles.td} colSpan={2}><strong>4,000.00</strong></td>
                        </tr>
                    </table>

                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginRight: '-1', marginTop: '-1px', outline: '1px solid #000', outlineOffset: '-1px', fontSize: '12px', width: '100%', padding: '5px 10px' }}>
                    <div style={{ flex: '1', alignItems: 'center' }}>
                        <div style={{ color: 'black', }}><strong>{eAndOE && eAndOE}</strong></div>
                        {hideShowFinancialStatus && <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="136" height="52" viewBox="0 0 136 52" fill="none">
                                <path d="M119.688 0.6875C121.009 0.661034 121.009 0.661034 122.357 0.634033C125.766 0.637744 128.353 0.721439 131.504 2.07812C136.471 8.45858 135.2 21.9294 135.312 29.8125C135.339 30.9679 135.339 30.9679 135.366 32.1467C135.359 37.5032 135.359 37.5032 133.788 39.6765C131.485 41.3811 129.87 41.5552 127.023 41.8438C125.981 41.954 124.938 42.0643 123.864 42.178C122.712 42.2842 121.561 42.3905 120.375 42.5C119.163 42.6211 117.951 42.7422 116.703 42.8669C102.858 44.2002 88.9813 45.1505 75.1084 46.1294C67.0231 46.7004 58.9455 47.3055 50.875 48.0625C49.6391 48.1784 49.6391 48.1784 48.3782 48.2966C46.7652 48.4493 45.1523 48.6029 43.5396 48.7573C38.6317 49.2263 33.7226 49.68 28.8125 50.125C27.4307 50.2566 27.4307 50.2566 26.021 50.3909C23.3483 50.6313 20.678 50.8301 18 51C16.5254 51.0962 16.5254 51.0962 15.021 51.1943C7.87421 51.462 7.87421 51.462 4.39062 49.6211C2.24291 45.573 2.05356 41.5876 1.75 37.0625C1.67628 36.1255 1.60256 35.1885 1.52661 34.2231C1.32354 31.483 1.15307 28.7434 0.999999 26C0.958587 25.2725 0.917176 24.545 0.87451 23.7954C0.384903 13.9024 0.384903 13.9024 2.07934 11.4165C4.95122 9.29846 7.56254 9.29744 11.0937 8.9375C11.8161 8.86107 12.5384 8.78465 13.2826 8.7059C15.6872 8.45639 18.0932 8.22759 20.5 8C22.1941 7.83061 23.8882 7.66085 25.5823 7.49072C41.2545 5.95023 56.9584 4.86277 72.6711 3.83351C73.5441 3.7763 74.417 3.7191 75.3164 3.66016C76.5963 3.57634 76.5963 3.57634 77.9021 3.49083C84.5718 3.04638 91.2218 2.458 97.875 1.8125C105.146 1.13652 112.385 0.769477 119.688 0.6875Z" fill="#FAFAFC" />
                                <path d="M129 1C127 4 127 4 123.562 4.6875C109.842 5.92107 109.842 5.92107 106 4C106 4.66 106 5.32 106 6C93.3422 7.24796 80.7046 7.10178 68 7C68 7.66 68 8.32 68 9C60.582 9.59857 53.2378 10.1318 45.793 9.9375C43.9759 9.79678 43.9759 9.79678 43 11C40.3016 11.2907 37.6198 11.5236 34.9141 11.7188C34.1013 11.7816 33.2886 11.8444 32.4513 11.9091C29.8428 12.1104 27.234 12.3058 24.625 12.5C22.0232 12.6945 19.4215 12.8903 16.8202 13.0909C15.1989 13.2159 13.5773 13.3374 11.9555 13.455C8.78892 13.6987 6.02624 13.9913 3 15C3 15.66 3 16.32 3 17C3.66 17 4.32 17 5 17C5.99 26.57 6.98 36.14 8 46C16.2294 46 23.8642 45.9146 31.9727 45.2266C39.7381 44.6454 47.278 45.0799 55 46C52.1941 48.8059 49.3138 48.5616 45.5352 48.8516C44.4132 48.9472 44.4132 48.9472 43.2687 49.0448C41.6794 49.1784 40.0897 49.3075 38.4998 49.4326C36.1024 49.6219 33.7065 49.8253 31.3105 50.0312C26.8765 50.404 22.4408 50.7199 18 51C16.2963 51.1117 16.2963 51.1117 14.5581 51.2256C7.90026 51.4757 7.90026 51.4757 4.39062 49.6211C2.24291 45.573 2.05356 41.5876 1.75 37.0625C1.67628 36.1255 1.60256 35.1885 1.52661 34.2231C1.32354 31.483 1.15307 28.7434 0.999999 26C0.958587 25.2725 0.917176 24.545 0.87451 23.7954C0.384903 13.9024 0.384903 13.9024 2.07934 11.4165C4.95122 9.29847 7.56254 9.29744 11.0937 8.9375C11.8161 8.86107 12.5384 8.78465 13.2826 8.7059C15.6872 8.45639 18.0932 8.22759 20.5 8C22.1941 7.83062 23.8882 7.66085 25.5823 7.49072C41.2545 5.95023 56.9584 4.86277 72.6711 3.83351C73.5441 3.77631 74.417 3.7191 75.3164 3.66016C76.5963 3.57634 76.5963 3.57634 77.9021 3.49083C84.5717 3.04638 91.222 2.45997 97.875 1.8125C108.255 0.818005 118.581 0.806464 129 1Z" fill="#B9BEDA" />
                                <path d="M107.063 13.875C110.325 17.4535 110.286 20.059 110.211 24.7422C109.914 27.9154 109.144 29.6412 107 32C101.498 34.9628 95.0765 34.177 89 34C88.0615 26.961 87.8919 20.0973 88 13C94.3788 11.6571 101.328 10.3644 107.063 13.875Z" fill="#46559D" />
                                <path d="M130 2C133 4 133 4 133.73 7.0625C134.611 14.6498 135.211 22.1712 135.312 29.8125C135.33 30.5827 135.348 31.3529 135.366 32.1465C135.359 37.5027 135.359 37.5027 133.788 39.6765C131.485 41.3811 129.87 41.5552 127.023 41.8438C125.458 42.0094 125.458 42.0094 123.86 42.1785C122.71 42.2846 121.56 42.3907 120.375 42.5C119.174 42.6196 117.973 42.7393 116.736 42.8625C105.234 43.9675 93.7106 44.8358 82.1875 45.6875C81.2861 45.7542 80.3847 45.8209 79.456 45.8896C76.8602 46.0798 74.2642 46.2655 71.668 46.4492C70.5101 46.5334 70.5101 46.5334 69.3288 46.6192C64.8732 46.927 60.4662 47.052 56 47C56 46.34 56 45.68 56 45C62.7116 44.1198 69.2341 43.8862 76 44C76 43.34 76 42.68 76 42C103.224 38.6121 103.224 38.6121 108 41C108 40.34 108 39.68 108 39C109.074 38.951 110.148 38.902 111.254 38.8516C112.69 38.7765 114.126 38.7009 115.562 38.625C116.267 38.5941 116.971 38.5631 117.697 38.5312C122.413 38.2705 126.504 37.4534 131 36C130.892 34.8186 130.892 34.8186 130.781 33.6133C130.112 25.7593 129.579 17.8834 130 10C130.33 9.67 130.66 9.34 131 9C130.713 6.66055 130.381 4.32609 130 2Z" fill="#828BBC" />
                                <path d="M44.5 18.125C46 20 46 20 46.5625 22.875C45.7962 27.1319 44.5149 28.5103 41 31C38.1924 31.41 35.8601 31.2424 33 31C33 33.64 33 36.28 33 39C31.35 39 29.7 39 28 39C26.8883 34.5622 26.8847 30.2304 26.9375 25.6875C26.942 24.9469 26.9465 24.2064 26.9512 23.4434C26.9629 21.6289 26.9808 19.8144 27 18C39.9257 16.0666 39.9257 16.0666 44.5 18.125Z" fill="#4D5BA0" />
                                <path d="M61.0625 14.9375C62.5166 14.9684 62.5166 14.9684 64 15C65.677 17.9317 67.3398 20.8712 69 23.8125C69.477 24.6459 69.9539 25.4793 70.4453 26.3379C70.8965 27.1403 71.3477 27.9428 71.8125 28.7695C72.2314 29.5079 72.6504 30.2463 73.082 31.0071C74 33 74 33 74 36C71.6875 36.25 71.6875 36.25 69 36C67.1875 34 67.1875 34 66 32C62.04 32.495 62.04 32.495 58 33C57.01 35.475 57.01 35.475 56 38C54.35 38 52.7 38 51 38C55.6683 15.0476 55.6683 15.0476 61.0625 14.9375Z" fill="#49589E" />
                                <path d="M129 0.999988C127 3.99999 127 3.99999 123.562 4.68749C109.842 5.92106 109.842 5.92106 106 3.99999C106 4.65999 106 5.31999 106 5.99999C98.246 6.7189 90.5934 7.06289 82.8125 6.99999C70.1958 6.90009 57.6031 7.46466 45 7.99999C48.2071 6.14405 50.8603 5.63185 54.5369 5.31395C56.2066 5.16402 56.2066 5.16402 57.91 5.01107C59.114 4.91202 60.3181 4.81297 61.5586 4.71093C63.4397 4.5487 63.4397 4.5487 65.3589 4.3832C68.0243 4.15567 70.6896 3.93154 73.3557 3.71288C76.0472 3.49174 78.7378 3.26311 81.428 3.02636C97.3216 1.63106 113.042 0.621386 129 0.999988Z" fill="#808ABB" />
                                <path d="M37 8.00001C33.5231 10.318 31.8107 10.343 27.6875 10.5625C26.4474 10.6373 25.2074 10.712 23.9297 10.7891C21.3099 10.9297 18.6901 11.0703 16.0703 11.2109C14.8302 11.2857 13.5902 11.3605 12.3125 11.4375C11.1743 11.4981 10.036 11.5587 8.86329 11.6211C5.8048 11.8118 5.8048 11.8118 3.00001 14C2.78144 17.245 2.78144 17.245 3.18751 21.0625C3.27162 22.1116 3.27162 22.1116 3.35743 23.1819C3.54925 25.4573 3.76998 27.7282 4.00001 30C4.07945 30.7925 4.15888 31.5849 4.24073 32.4014C4.48247 34.7482 4.73678 37.093 5.00001 39.4375C5.08275 40.1769 5.16549 40.9162 5.25074 41.678C5.40549 45.1349 5.40549 45.1349 7.00001 48C8.56901 48.029 10.1394 47.9865 11.707 47.9141C12.6804 47.8708 13.6538 47.8275 14.6567 47.783C15.6981 47.7308 16.7395 47.6787 17.8125 47.625C18.8668 47.5761 19.9211 47.5272 21.0073 47.4768C27.1126 47.1821 33.1879 46.762 39.2734 46.1875C44.5094 45.8274 49.755 45.9239 55 46C52.1941 48.8059 49.3138 48.5617 45.5352 48.8516C44.4132 48.9472 44.4132 48.9472 43.2687 49.0448C41.6794 49.1784 40.0897 49.3075 38.4998 49.4326C36.1024 49.6219 33.7066 49.8253 31.3106 50.0313C26.8766 50.404 22.4408 50.7199 18 51C16.2963 51.1117 16.2963 51.1117 14.5581 51.2256C7.90027 51.4757 7.90027 51.4757 4.39063 49.6211C2.24292 45.573 2.05356 41.5876 1.75001 37.0625C1.67629 36.1255 1.60257 35.1885 1.52662 34.2232C1.32355 31.483 1.15307 28.7434 1.00001 26C0.958596 25.2725 0.917185 24.545 0.874519 23.7954C0.391326 14.032 0.391326 14.032 2.03907 11.2383C5.0458 9.33961 8.22377 9.14857 11.6875 8.81251C12.8031 8.6919 12.8031 8.6919 13.9412 8.56886C21.628 7.809 29.2857 7.81312 37 8.00001Z" fill="#525FA3" />
                                <path d="M108 41C108 41.66 108 42.32 108 43C97.6768 44.5281 87.3466 45.4082 76.9375 46.125C75.6772 46.2125 74.4169 46.3 73.1184 46.3901C67.4023 46.7698 61.7292 47.1192 56 47C56 46.34 56 45.68 56 45C62.7116 44.1198 69.2341 43.8862 76 44C76 43.34 76 42.68 76 42C103.224 38.6121 103.224 38.6121 108 41Z" fill="#7F89BB" />
                                <path d="M94 16C101.11 15.277 101.11 15.277 103.645 17.336C105 19 105 19 107 22C106.01 22.495 106.01 22.495 105 23C104.876 23.7838 104.752 24.5675 104.625 25.375C104 28 104 28 102.312 29.8125C100 31 100 31 94 31C94 26.05 94 21.1 94 16Z" fill="#F5F6F9" />
                                <path d="M44.5 18.125C46 20 46 20 46.4375 22.9375C45.9494 26.3542 45.6502 27.7773 43 30C38.6214 30.4691 36.7042 30.4694 33 28C35.31 27.34 37.62 26.68 40 26C40 24.68 40 23.36 40 22C37.03 21.67 34.06 21.34 31 21C30.67 22.32 30.34 23.64 30 25C30 23.02 30 21.04 30 19C29.34 19 28.68 19 28 19C28 20.65 28 22.3 28 24C27.67 24 27.34 24 27 24C27 22.02 27 20.04 27 18C39.5676 15.9054 39.5676 15.9054 44.5 18.125Z" fill="#45549C" />
                                <path d="M4 17C4.33 17 4.66 17 5 17C5.99 26.57 6.98 36.14 8 46C16.2189 46 23.8377 45.9279 31.9336 45.2227C36.2935 44.9061 40.6317 44.9113 45 45C41.6922 47.2052 40.2241 47.3523 36.3359 47.6328C35.2132 47.7166 34.0904 47.8004 32.9336 47.8867C31.1721 48.0047 31.1721 48.0047 29.375 48.125C28.2239 48.2114 27.0727 48.2977 25.8867 48.3867C13.234 49.2956 13.234 49.2956 7 49C3.89754 45.8975 4.05412 42.3751 3.88647 38.1157C3.89171 37.1417 3.89695 36.1676 3.90234 35.1641C3.90557 34.1006 3.90879 33.0371 3.91211 31.9414C3.92049 30.847 3.92887 29.7526 3.9375 28.625C3.94201 27.5074 3.94652 26.3898 3.95117 25.2383C3.96291 22.4921 3.97933 19.7461 4 17Z" fill="#C0C5DD" />
                                <path d="M104 12C103.34 12.66 102.68 13.32 102 14C102 14.99 102 15.98 102 17C99.36 16.67 96.72 16.34 94 16C94.0348 16.6265 94.0696 17.253 94.1055 17.8984C94.1326 18.7157 94.1596 19.533 94.1875 20.375C94.2223 21.1871 94.2571 21.9992 94.293 22.8359C94.1963 23.5501 94.0996 24.2642 94 25C93.01 25.66 92.02 26.32 91 27C90.2639 30.5677 90.2639 30.5677 90 34C89.67 34 89.34 34 89 34C88.0615 26.961 87.8919 20.0973 88 13C93.361 11.8714 98.5531 11.9031 104 12Z" fill="#5966A7" />
                                <path d="M77 14C78.65 14 80.3 14 82 14C82.9209 18.6554 83.1221 23.1469 83.0625 27.875C83.058 28.5634 83.0535 29.2517 83.0488 29.9609C83.0372 31.6407 83.0192 33.3203 83 35C81.35 35 79.7 35 78 35C77.67 28.07 77.34 21.14 77 14Z" fill="#44539C" />
                                <path d="M61 21C64.0917 23.5296 64.9093 26.2245 66 30C64.02 30 62.04 30 60 30C58.68 32.64 57.36 35.28 56 38C54.35 38 52.7 38 51 38C52.1506 32.602 53.4242 27.2901 55 22C55.33 22.66 55.66 23.32 56 24C56.99 24.33 57.98 24.66 59 25C59.66 23.68 60.32 22.36 61 21Z" fill="#4E5CA1" />
                                <path d="M66 21C68.4727 23.2624 70.0639 25.5745 71.6875 28.5C72.343 29.6602 72.343 29.6602 73.0117 30.8438C74 33 74 33 74 36C71.6875 36.25 71.6875 36.25 69 36C68.5669 35.34 68.1337 34.68 67.6875 34C66.2195 31.8065 66.2195 31.8065 64.0391 31.7344C62.0241 31.7485 60.0106 31.8682 58 32C58.66 31.01 59.32 30.02 60 29C62.97 29.495 62.97 29.495 66 30C66.33 29.01 66.66 28.02 67 27C67.99 28.98 68.98 30.96 70 33C69.5669 31.7006 69.5669 31.7006 69.125 30.375C68.0833 27.25 67.0417 24.125 66 21Z" fill="#45549C" />
                                <path d="M42 6C48.5586 5.87387 48.5586 5.87387 50.75 6.5C54.0674 7.2372 57.3709 7.10402 60.75 7.0625C61.4474 7.05799 62.1448 7.05348 62.8633 7.04883C64.5756 7.0371 66.2878 7.01917 68 7C68 7.66 68 8.32 68 9C59.986 9.64666 52.0421 10.1668 44 10C43.34 8.68 42.68 7.36 42 6Z" fill="#C0C5DD" />
                                <path d="M92 17C92.33 17 92.66 17 93 17C93.33 21.62 93.66 26.24 94 31C96.31 31.33 98.62 31.66 101 32C101 32.66 101 33.32 101 34C97.37 34 93.74 34 90 34C89.9576 31.6671 89.9591 29.333 90 27C90.33 26.67 90.66 26.34 91 26C91.2319 24.4853 91.4122 22.9625 91.5625 21.4375C91.6463 20.6112 91.7301 19.7849 91.8164 18.9336C91.877 18.2955 91.9376 17.6574 92 17Z" fill="#3E4E98" />
                                <path d="M31 21C33.97 21 36.94 21 40 21C40.3822 22.6561 40.714 24.3246 41 26C40 27 40 27 38.1523 27.0977C36.1016 27.0651 34.0508 27.0326 32 27C31.67 25.02 31.34 23.04 31 21Z" fill="#F7F8FB" />
                                <path d="M91 15C91.99 15.33 92.98 15.66 94 16C94.081 17.4574 94.1392 18.9161 94.1875 20.375C94.2223 21.1871 94.2571 21.9992 94.293 22.8359C94.1963 23.5501 94.0996 24.2642 94 25C93.01 25.66 92.02 26.32 91 27C90.264 30.5677 90.264 30.5677 90 34C89.67 34 89.34 34 89 34C88.752 31.2088 88.5259 28.4188 88.3125 25.625C88.2397 24.8309 88.1669 24.0369 88.0918 23.2188C87.9258 20.9141 87.9258 20.9141 88 17C88.99 16.34 89.98 15.68 91 15Z" fill="#6A76B0" />
                                <path d="M131 39C131 39.33 131 39.66 131 40C129.753 40.0735 129.753 40.0735 128.48 40.1484C127.394 40.2232 126.307 40.298 125.188 40.375C124.109 40.4446 123.03 40.5142 121.918 40.5859C118.814 40.812 118.814 40.812 116 43C113.957 43.1953 113.957 43.1953 111.812 43.125C109.925 43.0631 109.925 43.0631 108 43C108 41.68 108 40.36 108 39C115.83 38.2023 123.196 37.855 131 39Z" fill="#B4BAD7" />
                                <path d="M61 21C64.0917 23.5296 64.9093 26.2245 66 30C63.69 29.67 61.38 29.34 59 29C59.875 23.25 59.875 23.25 61 21Z" fill="#E4E6F0" />
                                <path d="M106.875 27.25C107.576 27.4975 108.277 27.745 109 28C108.375 29.9375 108.375 29.9375 107 32C104.062 32.875 104.062 32.875 101 33C100.01 32.34 99.02 31.68 98 31C103.292 26.9385 103.292 26.9385 106.875 27.25Z" fill="#4F5DA1" />
                                <path d="M79 15C79.33 15 79.66 15 80 15C81.3229 19.9607 81.0889 24.9111 81 30C80.67 30 80.34 30 80 30C79.67 31.65 79.34 33.3 79 35C78.67 35 78.34 35 78 35C77.8896 28.2626 78.2987 21.7002 79 15Z" fill="#515FA2" />
                                <path d="M34 7C37.3 7 40.6 7 44 7C43.67 8.32 43.34 9.64 43 11C40.03 10.67 37.06 10.34 34 10C34 9.01 34 8.02 34 7Z" fill="#9DA5CB" />
                                <path d="M28 19C28.66 19 29.32 19 30 19C32 22 32 22 32 26C30.68 26 29.36 26 28 26C28 28.64 28 31.28 28 34C27.67 34 27.34 34 27 34C26.8155 23.4419 26.8155 23.4419 28 19Z" fill="#606DAB" />
                                <path d="M66 27C67.5625 28.8125 67.5625 28.8125 69 31C68.67 31.99 68.34 32.98 68 34C67.34 33.34 66.68 32.68 66 32C63.3116 31.7301 60.7086 31.9126 58 32C58.66 31.01 59.32 30.02 60 29C62.97 29.495 62.97 29.495 66 30C66 29.01 66 28.02 66 27Z" fill="#3C4C97" />
                                <path d="M88 13C90.97 13.33 93.94 13.66 97 14C97 14.66 97 15.32 97 16C95.02 16 93.04 16 91 16C90.67 18.64 90.34 21.28 90 24C89.67 24 89.34 24 89 24C88.67 20.37 88.34 16.74 88 13Z" fill="#3E4D98" />
                                <path d="M109 21C109.33 21 109.66 21 110 21C110 22.98 110 24.96 110 27C108.35 27.66 106.7 28.32 105 29C105.33 27.35 105.66 25.7 106 24C106.66 24 107.32 24 108 24C108.33 23.01 108.66 22.02 109 21Z" fill="#3D4C98" />
                                <path d="M58 15C59.98 15 61.96 15 64 15C64 15.66 64 16.32 64 17C62.35 17 60.7 17 59 17C59 17.66 59 18.32 59 19C58.34 19 57.68 19 57 19C57.33 17.68 57.66 16.36 58 15Z" fill="#515FA2" />
                                <path d="M13 11C9.77484 12.7366 6.48671 13.8906 3 15C3.33 14.01 3.66 13.02 4 12C6.95665 10.5217 9.7423 10.9397 13 11Z" fill="#B7BCD8" />
                            </svg>
                        </div>}
                    </div>

                    <div style={{ flex: '1', alignItems: 'center', justifyContent: 'center' }}>
                        {hideShowQrCodeImage && <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 50 50" }} xml:space="preserve" class=""><g><path d="M0 0v170h170V0H0zm130 130H40V40h90v90z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M65 65h40v40H65zM342 0v170h170V0H342zm130 130h-90V40h90v90z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M407 65h40v40h-40zM0 342v170h170V342H0zm130 130H40v-90h90v90z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M65 407h40v40H65zM40 197h40v40H40zM120 277v-40H80v40h39v40h40v-40zM280 77h40v40h-40zM200 40h40v77h-40zM240 0h40v40h-40zM240 117v40h-40v40h80v-80zM280 355v-39h-40v-79h-40v80h40v39h40v39h80v-40z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M280 197h40v80h-40zM472 236v-39h-73v40h-39v40h40v39h112v-80h-40zm0 40h-72v-39h72v39zM472 355h40v80h-40zM320 277h40v40h-40zM360 395h40v40h-40zM400 355h40v40h-40zM400 435v77h40v-37h32v-40zM200 356h40v76h-40zM320 472v-40h-80v80h40v-40h39v40h40v-40zM120 197h80v40h-80zM0 237h40v80H0z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg>
                            </div>

                            <div style={{ color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><strong>Scan to download</strong></div>
                        </div>}

                    </div>

                    <div style={{ flex: '1', alignItems: 'end', justifyContent: 'end' }}>

                        <div style={{ display: 'flex', color: 'black', justifyContent: 'end' }}><strong>For, {companyLegalName}</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            {signature}
                        </div>

                        <div style={{ display: 'flex', color: 'black', justifyContent: 'end' }}>This is a computer generated invoice and does not require a signature</div>

                    </div>


                </div>

            </div >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {isThankYouForYourBusiness ? <div style={{ padding: '5px 10px' }}><strong>{thankYouForYourBusiness && thankYouForYourBusiness}</strong></div> : null}
                {isThankYouForYourBusiness ? <div style={{ padding: '5px 10px', color: '#ccc' }}>{hideShowGeneratedFrom ? `Generated from: ${shopDomain}` : ''}    {hideShowPageNo ? "Page 1 of 1" : ""}</div> : null}
            </div>


        </div>
    );
}