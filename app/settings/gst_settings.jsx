import {
    Text,
    Card,
    Divider,
    TextField,
    EmptyState,
    IndexTable,
    Badge,
    useIndexResourceState,
    Link,
    Page,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import ic_info from '../assets/images/ic_info.png'
import Switch from "react-switch";

export function GSTSettings() {
    const [shippingGSTValue, setShippingGSTValue] = useState('');
    const handleShippingGSTChange = useCallback(
        (newValue) => setShippingGSTValue(newValue),
        [],
    );

    const [sacCodeValue, setSacCodeValue] = useState('');
    const handleSacCodeChange = useCallback(
        (newValue) => setSacCodeValue(newValue),
        [],
    );

    const [isOnGstIsIncludedInProductPrice, setIsOnGstIsIncludedInProductPrice] = useState(false);

    const handleToggleGstIsIncludedInProductPrice = () => {
        setIsOnGstIsIncludedInProductPrice(!isOnGstIsIncludedInProductPrice);
    };

    const [isOnGstIsIncludedInShippingPrice, setIsOnGstIsIncludedInShippingPrice] = useState(false);

    const handleToggleGstIsIncludedInShippingPrice = () => {
        setIsOnGstIsIncludedInShippingPrice(!isOnGstIsIncludedInShippingPrice);
    };

    const [isOnShowGstOnShipping, setIsShowGstOnShipping] = useState(false);

    const handleToggleShowGstOnShipping = () => {
        setIsShowGstOnShipping(!isOnShowGstOnShipping);
    };

    const [isOnChargeIgstOnExportOrders, setIsChargeIgstOnExportOrders] = useState(false);

    const handleToggleChargeIgstOnExportOrders = () => {
        setIsChargeIgstOnExportOrders(!isOnChargeIgstOnExportOrders);
    };

    const [isOnApplyGstWhenProductWithFullDiscount, setIsApplyGstWhenProductWithFullDiscount] = useState(false);

    const handleToggleApplyGstWhenProductWithFullDiscount = () => {
        setIsApplyGstWhenProductWithFullDiscount(!isOnApplyGstWhenProductWithFullDiscount);
    };

    const [isOnSellingServices, setIsSellingServices] = useState(false);

    const handleToggleSellingServices = () => {
        setIsSellingServices(!isOnSellingServices);
    };

    return (
        <Page>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="headingXl" as="h4">Prefix & Running Numbers</Text>
                <div
                    style={{
                        backgroundColor: '#74A535',
                        padding: '10px 20px',
                        fontSize: '15px',
                        color: 'white',
                        borderRadius: '10px'
                    }}>Save</div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Product Price</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%', marginRight: '20px' }}>
                            <TextField
                                label="Shipping GST"
                                value={shippingGSTValue}
                                type="number"
                                onChange={handleShippingGSTChange}
                                autoComplete="off"
                            />
                        </div>
                        <div style={{ width: '100%', marginLeft: '20px' }}>
                            <TextField
                                label="SAC Code"
                                value={sacCodeValue}
                                type="number"
                                onChange={handleSacCodeChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '20px', width:'50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggleGstIsIncludedInProductPrice}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>GST is included in product price</Text>
                        </div>
                        <div style={{marginLeft: '20px', width:'50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggleGstIsIncludedInShippingPrice}
                                    checked={isOnGstIsIncludedInShippingPrice}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>GST is included in shipping price</Text>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{marginRight: '20px', width:'50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggleShowGstOnShipping}
                                    checked={isOnShowGstOnShipping}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Show GST on shipping</Text>
                        </div>
                        <div style={{marginLeft: '20px', width:'50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggleChargeIgstOnExportOrders}
                                    checked={isOnChargeIgstOnExportOrders}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Charge IGST On Export Orders</Text>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{marginRight: '20px', width:'50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggleApplyGstWhenProductWithFullDiscount}
                                    checked={isOnApplyGstWhenProductWithFullDiscount}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Apply GST when product with full discount</Text>
                        </div>
                        <div style={{marginLeft: '20px', width:'50%', display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggleSellingServices}
                                    checked={isOnSellingServices}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Selling Services</Text>
                        </div>
                    </div>

                </Card>
            </div>
        </Page>
    );
}
