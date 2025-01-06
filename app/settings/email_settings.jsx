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
import { useState } from "react";
import Switch from "react-switch";

export function EmailSettings() {


    const [automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption, setAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption] = useState('automatically-send-invoices-when-the-orders-are-created');

    const handleAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption = (event) => {
        setAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption(event.target.value);
    };

    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <Page>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="headingXl" as="h4">Email Settings</Text>
                <div
                    style={{
                        backgroundColor: '#74A535',
                        padding: '10px 20px',
                        fontSize: '15px',
                        color: 'white',
                        borderRadius: '10px'
                    }}>Save</div>
            </div>
            <div style={{ marginTop: '40px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Email Notifications</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>
                    <Text variant="bodyLg" as="p" fontWeight="semibold">Automatic Email Notifications for Customers</Text>



                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
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
                                value="automatically-send-invoices-when-the-orders-are-created"
                                checked={automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'automatically-send-invoices-when-the-orders-are-created'}
                                onChange={handleAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption}
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
                                        backgroundColor: automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'automatically-send-invoices-when-the-orders-are-created' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                    Automatically send invoices when the orders are Created.
                                </Text>
                            </div>
                        </label>


                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
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
                                value="automatically-send-invoices-when-the-orders-are-paid"
                                checked={automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'automatically-send-invoices-when-the-orders-are-paid'}
                                onChange={handleAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption}
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
                                        backgroundColor: automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'automatically-send-invoices-when-the-orders-are-paid' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                    Automatically send invoices when the orders are Paid.
                                </Text>
                            </div>
                        </label>


                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
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
                                value="automatically-send-invoices-when-the-orders-are-fulfilled"
                                checked={automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'automatically-send-invoices-when-the-orders-are-fulfilled'}
                                onChange={handleAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption}
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
                                        backgroundColor: automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'automatically-send-invoices-when-the-orders-are-fulfilled' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                    Automatically send invoices when the orders are Fulfilled.
                                </Text>
                            </div>
                        </label>


                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
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
                                value="do-not-send-any-automatic-invoice"
                                checked={automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'do-not-send-any-automatic-invoice'}
                                onChange={handleAutomaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption}
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
                                        backgroundColor: automaticallySendInvoicesWhenTheOrdersAreCreatedSelectedOption === 'do-not-send-any-automatic-invoice' ? '#74A535' : '#fff', // Change inner circle background color based on selection
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
                                    Do not send any Automatic invoice.
                                </Text>
                            </div>
                        </label>


                    </div>
                </Card>
            </div>

            <div style={{ marginTop: '40px' }}>
                <Card>
                    <Text variant="headingLg" fontWeight="bold">Automatic Email Notifications for Site Admin (Owner of Store)</Text>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Divider />
                    </div>
                    <Text variant="bodyLg" as="p" fontWeight="semibold">Automatic Email Notifications for Customers</Text>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', height: '100%' }}>
                                <Switch
                                    onChange={handleToggle}
                                    checked={isOn}
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
                            <Text as="p" fontWeight="regular" style={{ margin: 0 }}>Send a copy of all automatic emails to: (Enter comma separated for multiple email IDs)</Text>
                        </div>

                        <div style={{ width: '50%', marginRight: '20px', marginTop:'20px' }}>
                                <TextField
                                    value="parasvirani9@gmail.com"
                                    autoComplete="off"
                                />
                            </div>
                </Card>

            </div>

        </Page>
    );
}
