import Switch from "react-switch";
import { Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";


export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);

    return {
        accessToken: session.accessToken,
        storeName: session.shop
    };
};

export const CustomizationLabel = ({ onFormDataChange }) => {

    const session = useLoaderData();
    const storeName = session?.storeName;
    const accessToken = session?.accessToken;

    const [formValues, setFormValues] = useState({
        tax_invoice: "",
        gstin: "",
        iec_code: "",
        cin: "",
        pan_no: "",
        fssai_lic_no: "",
        invoice_no: "",
        order_no: "",
        invoice_date: "",
        order_date: "",
        transport_mode: "",
        date_of_supply: "",
        place_of_supply: "",
        original: "",
        store_name: "",
        branch_name: "",
        shop_domain: "",
        store_address: "",
        contact_person: "",
        store_phone: "",
        store_email: "",
        term_and_condition: "",
        bill_to_party: "",
        ship_to_party: "",
        billing_phone: "",
        shipping_phone: "",
        billing_gstin: "",
        shipping_gstin: "",
        item_sku: "",
        qty: "",
        rate_per_item: "",
        discount_item: "",
        taxable_item: "",
        hsn: "",
        gst: "",
        cgst: "",
        igst: "",
        sgst: "",
        cess: "",
        total: "",
        payment_mode: "",
        order_note: "",
        terms_and_conditions: "",
        total_invoice_amount_in_words: "",
        e_and_o_e: "",
        authorised_signature: "",
        thank_you_for_your_business: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [productItemLabel, setPosSelectedOption] = useState('cgst-sgst');

    const handlePosChange = (event) => {
        setPosSelectedOption(event.target.value);
    };

    const [isCustomizeStoreLabels, setIsCustomizeStoreLabels] = useState(false);

    const toggleCustomizeStoreLabels = () => {
        setIsCustomizeStoreLabels(!isCustomizeStoreLabels);
    };

    const [isStoreInformation, setIsStoreInformation] = useState(false);

    const toggleStoreInformation = () => {
        setIsStoreInformation(!isStoreInformation);
    };

    const [isBillingShippingLabels, setIsBillingShippingLabels] = useState(false);

    const toggleBillingShippingLabels = () => {
        setIsBillingShippingLabels(!isBillingShippingLabels);
    };

    const [isProductsItemsLabels, setIsProductsItemsLabels] = useState(false);

    const toggleProductsItemsLabels = () => {
        setIsProductsItemsLabels(!isProductsItemsLabels);
    };

    const [isOthersLabels, setIsOthersLabels] = useState(false);

    const toggleOthersLabels = () => {
        setIsOthersLabels(!isOthersLabels);
    };

    const [isFooterLabels, setIsFooterLabels] = useState(false);

    const toggleFooterLabels = () => {
        setIsFooterLabels(!isFooterLabels);
    };

    const [isOnGstIsIncludedInProductPrice, setIsGstIsIncludedInProductPrice] = useState(false);
    const [isGstin, setIsGstin] = useState(false);
    const [isIecCode, setIsIecCode] = useState(false);
    const [isCin, setIsCin] = useState(false);
    const [isPanNo, setIsPanNo] = useState(false);
    const [isFssaiLicNo, setIsFssaiLicNo] = useState(false);
    const [isInvoiceNo, setIsInvoiceNo] = useState(false);
    const [isOrderNo, setIsOrderNo] = useState(false);
    const [isInvoiceDate, setIsInvoiceDate] = useState(false);
    const [isOrderDate, setIsOrderDate] = useState(false);
    const [isTransportMode, setIsTransportMode] = useState(false);
    const [isDateOfSupply, setIsDateOfSupply] = useState(false);
    const [isPlaceOfSupply, setIsPlaceOfSupply] = useState(false);
    const [isShopDomain, setIsShopDomain] = useState(false);
    const [isHideShowPhone, setIsHideShowPhone] = useState(false);
    const [isHideShowGSTIN, setIsHideShowGSTIN] = useState(false);
    const [isHideShowCustomerEmail, setIsHideShowCustomerEmail] = useState(false);
    const [isHideShowShippingSection, setIsHideShowShippingSection] = useState(false);
    const [isHideShowProductTitleItem, setIsHideShowProductTitleItem] = useState(false);
    const [isHideShowProductSKU, setIsHideShowProductSKU] = useState(false);
    const [isHideShowProductHSN, setIsHideShowProductHSN] = useState(false);
    const [isHideShowProductDiscount, setIsHideShowProductDiscount] = useState(false);
    const [isPaymentMode, setIsPaymentMode] = useState(false);
    const [isOrderNote, setIsOrderNote] = useState(false);
    const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
    const [isTotalInvoiceAmountInWords, setTotalInvoiceAmountInWords] = useState(false);
    const [isHideShowFinancialStatus, setHideShowFinancialStatus] = useState(false);
    const [isHideShowQRCodeImage, setHideShowQRCodeImage] = useState(false);
    const [isThankYouForYourBusiness, setThankYouForYourBusiness] = useState(false);
    const [isHideShowGeneratedFrom, setHideShowGeneratedFrom] = useState(false);
    const [isHideShowPageNo, setHideShowPageNo] = useState(false);

    const handleToggle = (setter) => () => {
        setter((prevValue) => !prevValue);
    };


    const handleToggleProductTitle = (checked) => {
        // Agar doosra switch already OFF hai, to ye switch OFF nahi ho sakta
        if (!checked && !isHideShowProductSKU) {
            alert("You can either hide Product title or Product SKU!");
            return;
        }
        setIsHideShowProductTitleItem(checked);
    };

    const handleToggleProductSKU = (checked) => {
        // Agar doosra switch already OFF hai, to ye switch OFF nahi ho sakta
        if (!checked && !isHideShowProductTitleItem) {
            alert("You can either hide Product title or Product SKU!");
            return;
        }
        setIsHideShowProductSKU(checked);
    };


    useEffect(() => {
        if (!storeName || !accessToken) {
            console.warn("Missing storeName or accessToken");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/customize-label', {
                    method: 'GET',
                    headers: {
                        'store-name': storeName,
                        'api-version': '2025-01',
                        'access-token': accessToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data) {
                    // console.log("Cuastomize Invoice Data : ", JSON.stringify(data.data.customize_store_labels.tax_invoice))
                    setFormValues({
                        tax_invoice: data.data.customize_store_labels.tax_invoice || "",
                        gstin: data.data.customize_store_labels.gstin || "",
                        iec_code: data.data.customize_store_labels.iec_code || "",
                        cin: data.data.customize_store_labels.cin || "",
                        pan_no: data.data.customize_store_labels.pan_no || "",
                        fssai_lic_no: data.data.customize_store_labels.fssai_lic_no || "",
                        invoice_no: data.data.customize_store_labels.invoice_no || "",
                        order_no: data.data.customize_store_labels.order_no || "",
                        invoice_date: data.data.customize_store_labels.invoice_date || "",
                        order_date: data.data.customize_store_labels.order_date || "",
                        transport_mode: data.data.customize_store_labels.transport_mode || "",
                        date_of_supply: data.data.customize_store_labels.date_of_supply || "",
                        place_of_supply: data.data.customize_store_labels.place_of_supply || "",
                        original: data.data.customize_store_labels.original || "",
                        store_name: data.data.store_information.company_legal_name || "",
                        branch_name: data.data.store_information.branch_name || "",
                        shop_domain: data.data.store_information.shop_domain || "",
                        store_address: data.data.store_information.store_address || "",
                        contact_person: data.data.store_information.contact_person || "",
                        store_phone: data.data.store_information.store_phone || "",
                        store_email: data.data.store_information.store_email || "",
                        term_and_condition: data.data.store_information.terms_and_conditions || "",
                        bill_to_party: data.data.billing_shipping_labels.bill_to_party || "",
                        ship_to_party: data.data.billing_shipping_labels.ship_to_party || "",
                        billing_phone: data.data.billing_shipping_labels.billing_phone || "",
                        shipping_phone: data.data.billing_shipping_labels.shipping_phone || "",
                        billing_gstin: data.data.billing_shipping_labels.billing_gstin || "",
                        shipping_gstin: data.data.billing_shipping_labels.shipping_gstin || "",
                        item_sku: data.data.product_items_labels.item_sku || "",
                        qty: data.data.product_items_labels.qty || "",
                        rate_per_item: data.data.product_items_labels.rate_per_item || "",
                        discount_item: data.data.product_items_labels.discount_item || "",
                        taxable_item: data.data.product_items_labels.texable_item || "",
                        hsn: data.data.product_items_labels.hsn || "",
                        gst: data.data.product_items_labels.gst || "",
                        cgst: data.data.product_items_labels.cgst || "",
                        sgst: data.data.product_items_labels.sgst || "",
                        igst: data.data.product_items_labels.igst || "",
                        cess: data.data.product_items_labels.cess || "",
                        total: data.data.product_items_labels.total || "",
                        payment_mode: data.data.others_labels.payment_mode || "",
                        order_note: data.data.others_labels.order_note || "",
                        terms_and_conditions: data.data.others_labels.term_and_conditions || "",
                        total_invoice_amount_in_words: data.data.others_labels.total_invoice_amount_in_words || "",
                        e_and_o_e: data.data.others_labels.e_and_o_e || "",
                        authorised_signature: data.data.others_labels.this_is_a_computer_generated_invoice_and_does_not_require_a_signature || "",
                        thank_you_for_your_business: data.data.footer_labels.thank_you_for_your_business,
                    });
                    setPosSelectedOption(data.data.product_items_labels.cgst_igst);
                    setIsGstIsIncludedInProductPrice(data.data.customize_store_labels.export_invoice);
                    setIsGstin(data.data.customize_store_labels.is_gstin);
                    setIsIecCode(data.data.customize_store_labels.is_iec_code);
                    setIsCin(data.data.customize_store_labels.is_cin);
                    setIsPanNo(data.data.customize_store_labels.is_pan_no);
                    setIsFssaiLicNo(data.data.customize_store_labels.is_fssai_lic_no);
                    setIsInvoiceNo(data.data.customize_store_labels.is_invoice_no);
                    setIsOrderNo(data.data.customize_store_labels.is_order_no);
                    setIsInvoiceDate(data.data.customize_store_labels.is_invoice_date);
                    setIsOrderDate(data.data.customize_store_labels.is_order_date);
                    setIsTransportMode(data.data.customize_store_labels.is_transport_mode);
                    setIsDateOfSupply(data.data.customize_store_labels.is_date_of_supply);
                    setIsPlaceOfSupply(data.data.customize_store_labels.is_place_of_supply);
                    setIsShopDomain(data.data.store_information.is_shop_domain);
                    setIsHideShowPhone(data.data.billing_shipping_labels.hide_show_phone);
                    setIsHideShowGSTIN(data.data.billing_shipping_labels.hide_show_gstin);
                    setIsHideShowCustomerEmail(data.data.billing_shipping_labels.hide_show_customer_email);
                    setIsHideShowShippingSection(data.data.billing_shipping_labels.hide_show_shipping_section);
                    setIsHideShowProductTitleItem(data.data.product_items_labels.hide_show_product_title);
                    setIsHideShowProductSKU(data.data.product_items_labels.hide_show_product_sku);
                    setIsHideShowProductHSN(data.data.product_items_labels.hide_show_product_hsn);
                    setIsHideShowProductDiscount(data.data.product_items_labels.hide_show_product_discount);
                    setIsPaymentMode(data.data.others_labels.is_payment_mode);
                    setIsOrderNote(data.data.others_labels.is_order_note);
                    setIsTermsAndConditions(data.data.others_labels.is_term_and_conditions);
                    setTotalInvoiceAmountInWords(data.data.others_labels.is_total_invoice_amount_in_words);
                    setHideShowFinancialStatus(data.data.others_labels.hide_show_financial_status);
                    setHideShowQRCodeImage(data.data.others_labels.hide_show_qr_code_image);
                    setThankYouForYourBusiness(data.data.footer_labels.is_thank_you_for_your_business);
                    setHideShowGeneratedFrom(data.data.footer_labels.hide_show_generated_from);
                    setHideShowPageNo(data.data.footer_labels.hide_show_page_no);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const data = {
            customize_store_labels: {
                tax_invoice: formValues.tax_invoice,
                export_invoice: isOnGstIsIncludedInProductPrice,
                gstin: formValues.gstin,
                is_gstin: isGstin,
                iec_code: formValues.iec_code,
                is_iec_code: isIecCode,
                cin: formValues.cin,
                is_cin: isCin,
                pan_no: formValues.pan_no,
                is_pan_no: isPanNo,
                fssai_lic_no: formValues.fssai_lic_no,
                is_fssai_lic_no: isFssaiLicNo,
                invoice_no: formValues.invoice_no,
                is_invoice_no: isInvoiceNo,
                order_no: formValues.order_no,
                is_order_no: isOrderNo,
                invoice_date: formValues.invoice_date,
                is_invoice_date: isInvoiceDate,
                order_date: formValues.order_date,
                is_order_date: isOrderDate,
                transport_mode: formValues.transport_mode,
                is_transport_mode: isTransportMode,
                date_of_supply: formValues.date_of_supply,
                is_date_of_supply: isDateOfSupply,
                place_of_supply: formValues.place_of_supply,
                is_place_of_supply: isPlaceOfSupply,
                original: formValues.original
            },
            store_information: {
                company_legal_name: formValues.store_name,
                branch_name: formValues.branch_name,
                shop_domain: formValues.shop_domain,
                is_shop_domain: isShopDomain,
                store_address: formValues.store_address,
                contact_person: formValues.contact_person,
                store_phone: formValues.store_phone,
                store_email: formValues.store_email,
                terms_and_conditions: formValues.term_and_condition
            },
            billing_shipping_labels: {
                bill_to_party: formValues.bill_to_party,
                ship_to_party: formValues.ship_to_party,
                billing_phone: formValues.billing_phone,
                shipping_phone: formValues.shipping_phone,
                billing_gstin: formValues.billing_gstin,
                shipping_gstin: formValues.shipping_gstin,
                hide_show_phone: isHideShowPhone,
                hide_show_gstin: isHideShowGSTIN,
                hide_show_customer_email: isHideShowCustomerEmail,
                hide_show_shipping_section: isHideShowShippingSection
            },
            product_items_labels: {
                item_sku: formValues.item_sku,
                hide_show_product_title: isHideShowProductTitleItem,
                hide_show_product_sku: isHideShowProductSKU,
                hide_show_product_hsn: isHideShowProductHSN,
                hide_show_product_discount: isHideShowProductDiscount,
                qty: formValues.qty,
                rate_per_item: formValues.rate_per_item,
                discount_item: formValues.discount_item,
                texable_item: formValues.taxable_item,
                hsn: formValues.hsn,
                gst: formValues.gst,
                cgst_igst: productItemLabel,
                cgst: formValues.cgst,
                sgst: formValues.sgst,
                igst: formValues.igst,
                cess: formValues.cess,
                total: formValues.total
            },
            others_labels: {
                payment_mode: formValues.payment_mode,
                is_payment_mode: isPaymentMode,
                order_note: formValues.order_note,
                is_order_note: isOrderNote,
                term_and_conditions: formValues.terms_and_conditions,
                is_term_and_conditions: isTermsAndConditions,
                total_invoice_amount_in_words: formValues.total_invoice_amount_in_words,
                is_total_invoice_amount_in_words: isTotalInvoiceAmountInWords,
                e_and_o_e: formValues.e_and_o_e,
                this_is_a_computer_generated_invoice_and_does_not_require_a_signature: formValues.authorised_signature,
                hide_show_financial_status: isHideShowFinancialStatus,
                hide_show_qr_code_image: isHideShowQRCodeImage
            },
            footer_labels: {
                thank_you_for_your_business: formValues.thank_you_for_your_business,
                is_thank_you_for_your_business: isThankYouForYourBusiness,
                hide_show_generated_from: isHideShowGeneratedFrom,
                hide_show_page_no: isHideShowPageNo
            }

        };

        onFormDataChange(data);
    }, [formValues, isGstin, isIecCode, isCin, isPanNo, isFssaiLicNo, isInvoiceNo, isOrderNo, isInvoiceDate, isOrderDate, isTransportMode, isDateOfSupply, isPlaceOfSupply, isShopDomain, isHideShowPhone, isHideShowGSTIN, isHideShowCustomerEmail, isHideShowShippingSection, isHideShowProductTitleItem, isHideShowProductSKU, isHideShowProductHSN, isHideShowProductDiscount, isPaymentMode, isOrderNote, isTermsAndConditions, isTotalInvoiceAmountInWords, isHideShowFinancialStatus, isHideShowQRCodeImage, isThankYouForYourBusiness, isHideShowGeneratedFrom, isHideShowPageNo, onFormDataChange]);

    return (
        <div>
            {/* Customize Store Labels */}
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '20px 30px',
                }}

            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                    onClick={toggleCustomizeStoreLabels}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Customize Store Labels
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="15"
                        viewBox="0 0 26 15"
                        fill="none"
                        style={{ transform: isCustomizeStoreLabels ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <path
                            d="M24 2.48242L13 12.4824L2 2.48242"
                            stroke="black"
                            strokeWidth="3.85185"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isCustomizeStoreLabels && (
                    <div>
                        <div style={{ width: '100%', marginRight: '20px', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="tax_invoice"
                                value={formValues.tax_invoice}
                                onChange={handleChange}
                                placeholder="Tax Invoice"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginRight: '20px', width: '50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggle(setIsGstIsIncludedInProductPrice)}
                                    checked={isOnGstIsIncludedInProductPrice}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Display <b>{`${isOnGstIsIncludedInProductPrice ? "\"Export invoice\"" : "\"Tax Invoice\""}`}</b> for international orders</Text>
                        </div>
                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="gstin"
                                    value={formValues.gstin}
                                    onChange={handleChange}
                                    placeholder="GSTIN"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsGstin)}
                                    checked={isGstin}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="iec_code"
                                    value={formValues.iec_code}
                                    onChange={handleChange}
                                    placeholder="IEC CODE"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsIecCode)}
                                    checked={isIecCode}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="cin"
                                    value={formValues.cin}
                                    onChange={handleChange}
                                    placeholder="CIN"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsCin)}
                                    checked={isCin}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="pan_no"
                                    value={formValues.pan_no}
                                    onChange={handleChange}
                                    placeholder="PAN NO."
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsPanNo)}
                                    checked={isPanNo}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="fssai_lic_no"
                                    value={formValues.fssai_lic_no}
                                    onChange={handleChange}
                                    placeholder="FSSAI LIC NO."
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsFssaiLicNo)}
                                    checked={isFssaiLicNo}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="invoice_no"
                                    value={formValues.invoice_no}
                                    onChange={handleChange}
                                    placeholder="Invoice No."
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsInvoiceNo)}
                                    checked={isInvoiceNo}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="order_no"
                                    value={formValues.order_no}
                                    onChange={handleChange}
                                    placeholder="Order No."
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsOrderNo)}
                                    checked={isOrderNo}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="invoice_date"
                                    value={formValues.invoice_date}
                                    onChange={handleChange}
                                    placeholder="Invoice Date"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsInvoiceDate)}
                                    checked={isInvoiceDate}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="order_date"
                                    value={formValues.order_date}
                                    onChange={handleChange}
                                    placeholder="Order Date"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsOrderDate)}
                                    checked={isOrderDate}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="transport_mode"
                                    value={formValues.transport_mode}
                                    onChange={handleChange}
                                    placeholder="Transport Mode"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsTransportMode)}
                                    checked={isTransportMode}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="date_of_supply"
                                    value={formValues.date_of_supply}
                                    onChange={handleChange}
                                    placeholder="Date of Supply"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsDateOfSupply)}
                                    checked={isDateOfSupply}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="place_of_supply"
                                    value={formValues.place_of_supply}
                                    onChange={handleChange}
                                    placeholder="Place of Supply"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsPlaceOfSupply)}
                                    checked={isPlaceOfSupply}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="original"
                                    value={formValues.original}
                                    onChange={handleChange}
                                    placeholder="Date of Supply"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                            </div>
                        </div>

                    </div>

                )}
            </div>

            {/* Store Information */}
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '20px 30px',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                    onClick={toggleStoreInformation}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Store Information
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="15"
                        viewBox="0 0 26 15"
                        fill="none"
                        style={{ transform: isStoreInformation ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <path
                            d="M24 2.48242L13 12.4824L2 2.48242"
                            stroke="black"
                            strokeWidth="3.85185"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isStoreInformation && (
                    <div>
                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="store_name"
                                value={formValues.store_name}
                                onChange={handleChange}
                                placeholder="Company Legal Name (Store Name)"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="branch_name"
                                value={formValues.branch_name}
                                onChange={handleChange}
                                placeholder="Branch Name"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="store_address"
                                value={formValues.store_address}
                                onChange={handleChange}
                                placeholder="Store Address"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="contact_person"
                                value={formValues.contact_person}
                                onChange={handleChange}
                                placeholder="Contact Person"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="store_phone"
                                value={formValues.store_phone}
                                onChange={handleChange}
                                placeholder="Store Phone"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="store_email"
                                value={formValues.store_email}
                                onChange={handleChange}
                                placeholder="Store Email"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px', alignItems: 'center' }}>
                            <input
                                type="text"
                                name="shop_domain"
                                value={formValues.shop_domain}
                                onChange={handleChange}
                                placeholder="Shop Domain"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <Switch
                                onChange={handleToggle(setIsShopDomain)}
                                checked={isShopDomain}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={15}
                                width={30}
                                onColor="#E2EBD6"
                                offColor="#F4F4F4"
                                onHandleColor="#74A535"
                                boxShadow="none"
                                activeBoxShadow="none"
                                handleDiameter={12}
                            />
                        </div>
                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <textarea
                                name="term_and_condition"
                                value={formValues.term_and_condition}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Term and Conditions"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>
                    </div>

                )}
            </div>

            {/* Billing / Shipping Labels */}
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '20px 30px',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                    onClick={toggleBillingShippingLabels}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Billing / Shipping Labels
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="15"
                        viewBox="0 0 26 15"
                        fill="none"
                        style={{ transform: isBillingShippingLabels ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <path
                            d="M24 2.48242L13 12.4824L2 2.48242"
                            stroke="black"
                            strokeWidth="3.85185"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isBillingShippingLabels && (
                    <div>
                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="bill_to_party"
                                value={formValues.bill_to_party}
                                onChange={handleChange}
                                placeholder="BILL TO PARTY"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="ship_to_party"
                                value={formValues.ship_to_party}
                                onChange={handleChange}
                                placeholder="SHIP TO PARTY / DELIVERY ADDRESS"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <div style={{ width: '100%', marginRight: '20px' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Billing
                                </div>
                                <input
                                    type="text"
                                    name="billing_phone"
                                    value={formValues.billing_phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <div style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                    Shipping
                                </div>
                                <input
                                    type="text"
                                    name="shipping_phone"
                                    value={formValues.shipping_phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="billing_gstin"
                                value={formValues.billing_gstin}
                                onChange={handleChange}
                                placeholder="GSTIN"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="shipping_gstin"
                                value={formValues.shipping_gstin}
                                onChange={handleChange}
                                placeholder="GSTIN"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setIsHideShowPhone)}
                                        checked={isHideShowPhone}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Phone?</Text>
                            </div>

                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setIsHideShowGSTIN)}
                                        checked={isHideShowGSTIN}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show GSTIN?</Text>
                            </div>

                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setIsHideShowCustomerEmail)}
                                        checked={isHideShowCustomerEmail}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Customer Email?</Text>
                            </div>

                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setIsHideShowShippingSection)}
                                        checked={isHideShowShippingSection}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Shipping Section?</Text>
                            </div>

                        </div>

                    </div>

                )}
            </div>

            {/* Products / Items Labels */}
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '20px 30px',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                    onClick={toggleProductsItemsLabels}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Products / Items Labels
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="15"
                        viewBox="0 0 26 15"
                        fill="none"
                        style={{ transform: isProductsItemsLabels ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <path
                            d="M24 2.48242L13 12.4824L2 2.48242"
                            stroke="black"
                            strokeWidth="3.85185"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isProductsItemsLabels && (
                    <div>
                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="item_sku"
                                value={formValues.item_sku}
                                onChange={handleChange}
                                placeholder="ITEM - SKU"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggleProductTitle}
                                        checked={isHideShowProductTitleItem}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Product Title (Item)?</Text>
                            </div>

                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggleProductSKU}
                                        checked={isHideShowProductSKU}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Product SKU?</Text>
                            </div>

                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setIsHideShowProductHSN)}
                                        checked={isHideShowProductHSN}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Product HSN?</Text>
                            </div>

                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setIsHideShowProductDiscount)}
                                        checked={isHideShowProductDiscount}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Product Discount?</Text>
                            </div>

                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="qty"
                                value={formValues.qty}
                                onChange={handleChange}
                                placeholder="QTY"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="rate_per_item"
                                value={formValues.rate_per_item}
                                onChange={handleChange}
                                placeholder="RATE PER ITEM"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="discount_item"
                                value={formValues.discount_item}
                                onChange={handleChange}
                                placeholder="DISCOUNT ITEM"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="taxable_item"
                                value={formValues.taxable_item}
                                onChange={handleChange}
                                placeholder="TAXABLE ITEM"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="hsn"
                                value={formValues.hsn}
                                onChange={handleChange}
                                placeholder="HSN"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="gst"
                                value={formValues.gst}
                                onChange={handleChange}
                                placeholder="GST"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px', }}>
                            <div style={{ display: 'flex', width: '100%', marginRight: '20px', }}>
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px', }}>
                                                <label style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        value="cgst-sgst"
                                                        checked={productItemLabel === 'cgst-sgst'}
                                                        style={{
                                                            display: 'none', // Hide default radio button
                                                        }}
                                                        onChange={handlePosChange}
                                                    />
                                                    <span
                                                        style={{
                                                            width: '18px',  // Outer circle size
                                                            height: '18px',  // Outer circle size
                                                            border: '2px solid #74A535',  // Border color
                                                            borderRadius: '50%',
                                                            display: 'inline-block',
                                                            position: 'relative',
                                                            backgroundColor: '#fff', // Set the outer background to white
                                                            transition: 'background-color 0.3s, border-color 0.3s',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                                height: '10px',  // Inner circle size
                                                                borderRadius: '50%',
                                                                backgroundColor: productItemLabel === 'cgst-sgst' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: '50%',
                                                                transform: 'translate(-50%, -50%)', // Center the inner circle
                                                                transition: 'background-color 0.3s',
                                                            }}
                                                        ></span>
                                                    </span>
                                                    <div style={{ marginLeft: "5px" }}>
                                                        <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                            CGST | SGST
                                                        </Text>
                                                    </div>

                                                </label>

                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            }}>
                                                <input
                                                    type="radio"
                                                    style={{
                                                        display: 'none', // Hide default radio button
                                                    }}
                                                    value="igst"
                                                    checked={productItemLabel === 'igst'}
                                                    onChange={handlePosChange}
                                                />

                                                <span
                                                    style={{
                                                        width: '18px',  // Outer circle size
                                                        height: '18px',  // Outer circle size
                                                        border: '2px solid #74A535',  // Border color
                                                        borderRadius: '50%',
                                                        display: 'inline-block',
                                                        position: 'relative',
                                                        backgroundColor: '#fff', // Set the outer background to white
                                                        transition: 'background-color 0.3s, border-color 0.3s',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: '10px',  // Inner circle size (smaller than outer to create margin effect)
                                                            height: '10px',  // Inner circle size
                                                            borderRadius: '50%',
                                                            backgroundColor: productItemLabel === 'igst' ? '#74A535' : '#fff', // Change inner circle background color based on selection
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)', // Center the inner circle
                                                            transition: 'background-color 0.3s',
                                                        }}
                                                    ></span>
                                                </span>

                                                <div style={{ marginLeft: "5px" }}>
                                                    <Text variant="headingXs" fontWeight="regular" style={{ margin: 0 }}>
                                                        IGST
                                                    </Text>
                                                </div>

                                            </label>


                                        </div>


                                    </div>


                                </div>

                            </div>
                            {productItemLabel === 'igst' && (
                                <input
                                    type="text"
                                    name="igst"
                                    value={formValues.igst}
                                    onChange={handleChange}
                                    placeholder="IGST"
                                    style={{ display: 'flex', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            )}


                        </div>


                        {productItemLabel === 'cgst-sgst' && (
                            <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                                <input
                                    type="text"
                                    name="cgst"
                                    value={formValues.cgst}
                                    onChange={handleChange}
                                    placeholder="CGST"
                                    style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                                <input
                                    type="text"
                                    name="sgst"
                                    value={formValues.sgst}
                                    onChange={handleChange}
                                    placeholder="SGST"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                            <input
                                type="text"
                                name="cess"
                                value={formValues.cess}
                                onChange={handleChange}
                                placeholder="CESS"
                                style={{ marginRight: '20px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                            <input
                                type="text"
                                name="total"
                                value={formValues.total}
                                onChange={handleChange}
                                placeholder="TOTAL"
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
                            />
                        </div>

                    </div>

                )}
            </div>

            {/* Others Labels */}
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '20px 30px',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                    onClick={toggleOthersLabels}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Others Labels
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="15"
                        viewBox="0 0 26 15"
                        fill="none"
                        style={{ transform: isOthersLabels ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <path
                            d="M24 2.48242L13 12.4824L2 2.48242"
                            stroke="black"
                            strokeWidth="3.85185"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isOthersLabels && (
                    <div>
                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="payment_mode"
                                    value={formValues.payment_mode}
                                    onChange={handleChange}
                                    placeholder="Payment Mode"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsPaymentMode)}
                                    checked={isPaymentMode}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="order_note"
                                    value={formValues.order_note}
                                    onChange={handleChange}
                                    placeholder="Order Note"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsOrderNote)}
                                    checked={isOrderNote}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="terms_and_conditions"
                                    value={formValues.terms_and_conditions}
                                    onChange={handleChange}
                                    placeholder="Terms and Conditions"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setIsTermsAndConditions)}
                                    checked={isTermsAndConditions}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="total_invoice_amount_in_words"
                                    value={formValues.total_invoice_amount_in_words}
                                    onChange={handleChange}
                                    placeholder="Total Invoice Amount in Words"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setTotalInvoiceAmountInWords)}
                                    checked={isTotalInvoiceAmountInWords}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="e_and_o_e"
                                    value={formValues.e_and_o_e}
                                    onChange={handleChange}
                                    placeholder="E. & O.E"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />

                            </div>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="authorised_signature"
                                    value={formValues.authorised_signature}
                                    onChange={handleChange}
                                    placeholder="Authorised Signature"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />

                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%', marginTop: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setHideShowFinancialStatus)}
                                        checked={isHideShowFinancialStatus}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Financial Status?</Text>
                            </div>

                            <div style={{ display: 'flex', flex: '1' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Switch
                                        onChange={handleToggle(setHideShowQRCodeImage)}
                                        checked={isHideShowQRCodeImage}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={15}
                                        width={30}
                                        onColor="#E2EBD6"
                                        offColor="#F4F4F4"
                                        onHandleColor="#74A535"
                                        boxShadow="none"
                                        activeBoxShadow="none"
                                        handleDiameter={12}

                                    />
                                </div>

                                <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show QR Code Image?</Text>
                            </div>

                        </div>

                    </div>

                )}
            </div>

            {/* Footer Labels */}
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '20px 30px',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                    onClick={toggleFooterLabels}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Footer Labels
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="15"
                        viewBox="0 0 26 15"
                        fill="none"
                        style={{ transform: isFooterLabels ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <path
                            d="M24 2.48242L13 12.4824L2 2.48242"
                            stroke="black"
                            strokeWidth="3.85185"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isFooterLabels && (
                    <div>
                        <div style={{ display: 'flex', flex: '1' }}>
                            <div style={{ width: '100%', marginRight: '20px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="thank_you_for_your_business"
                                    value={formValues.thank_you_for_your_business}
                                    onChange={handleChange}
                                    placeholder="Thank you for your business"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px', marginRight: '10px' }}
                                />
                                <Switch
                                    onChange={handleToggle(setThankYouForYourBusiness)}
                                    checked={isThankYouForYourBusiness}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}
                                />
                            </div>

                        </div>

                        <div style={{ display: 'flex', flex: '1', marginTop: '20px' }}>
                            <div style={{ marginRight: '10px' }}>
                                <Switch
                                    onChange={handleToggle(setHideShowGeneratedFrom)}
                                    checked={isHideShowGeneratedFrom}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}

                                />
                            </div>

                            <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Generated From?</Text>
                        </div>

                        <div style={{ display: 'flex', flex: '1', marginTop: '20px' }}>
                            <div style={{ marginRight: '10px' }}>
                                <Switch
                                    onChange={handleToggle(setHideShowPageNo)}
                                    checked={isHideShowPageNo}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={15}
                                    width={30}
                                    onColor="#E2EBD6"
                                    offColor="#F4F4F4"
                                    onHandleColor="#74A535"
                                    boxShadow="none"
                                    activeBoxShadow="none"
                                    handleDiameter={12}

                                />
                            </div>

                            <Text as="p" fontWeight="regular" style={{ margin: 0, marginLeft: '10px' }}>Hide/Show Page No?</Text>
                        </div>



                    </div>

                )}
            </div>
        </div>
    );
}