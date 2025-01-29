import {
  Backdrop,
  Card,
  Checkbox,
  Divider,
  Scrollable,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import searchIcon from "../../assets/images/searchIcon.png";
import { useCallback, useEffect, useState, useRef } from "react";
import Switch from "react-switch";
import { useLoaderData } from "@remix-run/react";

export function Dialog({ active, toggleModal }) {
  return (
    <div>
      {/* Backdrop */}
      {active && (
        <Backdrop
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={toggleModal} // Close modal if backdrop is clicked
        />
      )}

      {/* Custom Modal Card */}
      {active && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            zIndex: 9999,
            width: "60%",
            borderRadius: "10px",
          }}
        >
          <Scrollable scrollbarWidth="none" style={{ height: "500px" }}>
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#74A535",
                padding: "10px 20px",
                borderRadius: "8px 8px 0px 0px",
              }}
            >
              <Text variant="headingLg">Create New Customer</Text>
              <div
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M19.5347 0.465273C18.9142 -0.15509 17.9083 -0.155091 17.2877 0.465273L10 7.75298L2.71229 0.465273C2.09174 -0.155091 1.08583 -0.155091 0.465273 0.465273C-0.155091 1.08582 -0.155091 2.09174 0.465273 2.71229L7.75298 10L0.465273 17.2877C-0.155091 17.9083 -0.15509 18.9142 0.465275 19.5347C1.08583 20.1551 2.09174 20.1551 2.71229 19.5347L10 12.247L17.2877 19.5347C17.9083 20.1551 18.9142 20.1551 19.5347 19.5347C20.1551 18.9142 20.1551 17.9083 19.5347 17.2877L12.247 10L19.5347 2.71229C20.1551 2.09174 20.1551 1.08583 19.5347 0.465273Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>First Name</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Last Name</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Email</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Phone</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Company Name</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>GST Number</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                marginRight: "20px",
                marginLeft: "20px",
              }}
            >
              <Text variant="headingMd" fontWeight="bold">
                Item Details
              </Text>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Name</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Phone</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Address</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Apartment, suit etc.
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>City</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", padding: "5px 20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>State</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Pincode</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField placeholder="" />
                </div>
              </div>
            </div>
            <div
              style={{
                justifyContent: "end",
                display: "flex",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#74A535",
                  color: "#ffffff",
                  padding: "5px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                  <Text>Save</Text>
                </div>
              </div>
            </div>
          </Scrollable>
        </div>
      )}
    </div>
  );
}

export function CreateNewInvoice() {
  const [editOfflineInvoiceNumber, setEditOfflineInvoiceNumber] =
    useState(false);
  const [offlineInvoicePrefix, setOfflineInvoicePrefix] = useState("");
  const [offlineInvoiceNumber, setOfflineInvoiceNumber] = useState("");

  const handleEditOfflineInvoiceNumberChange = (checked) => {
    setEditOfflineInvoiceNumber(checked);
  };

  const handleOfflineInvoicePrefixChange = (value) => {
    setOfflineInvoicePrefix(value);
  };

  const handleOfflineInvoiceNumberChange = (value) => {
    setOfflineInvoiceNumber(value);
  };

  const [discountLevel, setDiscountLevel] = useState("at-transaction-level");

  const handleDiscountLevelChange = useCallback(
    (value) => setDiscountLevel(value),
    [],
  );

  const options = [
    { label: "At transaction Level", value: "at-transaction-level" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const [exclusiveOfTax, setExclusiveOfTax] = useState("exclusive-of-tax");

  const handleExclusiveOfTaxChange = useCallback(
    (value) => setExclusiveOfTax(value),
    [],
  );
  const amount = [
    { label: "Exclusive of Tax", value: "exclusive-of-tax" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const [shippingCharge, setShippingCharge] = useState(false);

  const handleShippingChargeToggle = () => {
    setShippingCharge(!shippingCharge);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [customers, setCustomers] = useState([
    { id: 1, title: "Paras Virani", description: "paras@lauruss.com" },
    { id: 2, title: "Urvi Bhut", description: "urvi@lauruss.com" },
    { id: 3, title: "Jignesh Pansuriya", description: "jignesh@lauruss.com" },
    { id: 4, title: "Priti Maradiya", description: "priti@lauruss.com" },
  ]);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setDropdownVisible(true);

    // Filter options based on the search query
    const filtered = customers.filter((customer) =>
      customer.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (customer) => {
    alert(`You selected: ${customer.title}`);
    setDropdownVisible(false);
  };

  const [active, setActive] = useState(false);
  const toggleModal = useCallback(() => setActive((active) => !active), []);

  // FETCH TITLE FOR SEARCH BAR
  const data = useLoaderData();
  const productList = data.products.data.products.edges || [];
  const [Query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChange = (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length >= 2) {
      // Filter the products based on the query (title contains the query)
      const results = productList.filter((product) =>
        product.node.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSelect = (title) => {
    setQuery(title); // Set the selected product title in the input field
    setFilteredProducts([]); // Clear the dropdown
  };

  //  ADD ITEM FIELD
  const [inputs, setInputs] = useState([]);

  const addInputField = () => {
    setInputs([...inputs, { id: Date.now(), query: "" }]);
  };

  const removeInputField = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };
  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, query: value } : input,
      ),
    );
  };

  const handleInputSelect = (id, selectedTitle) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, query: selectedTitle } : input,
      ),
    );
  };

  return (
    <>
      <Dialog active={active} toggleModal={toggleModal} />
      <div>
        {/* {productList[0].node.title} */}

        <div
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
            >
              <path
                d="M6.9375 1L1 6.9375L6.9375 12.875"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div style={{ marginLeft: "20px" }}>
              <Text variant="headingLg" fontWeight="bold">
                Create New Invoice Offline
              </Text>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#74A535",
              color: "#ffffff",
              padding: "5px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <Text>Save</Text>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Card>
            <div>
              <span style={{ fontWeight: "bold" }}>Customer</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                placeholder="Search a Customer..."
                value={searchQuery}
                autoComplete="off"
                onChange={handleSearchChange}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={searchIcon} style={{ height: "15px" }} />
                  </div>
                }
              />
              {dropdownVisible && filteredOptions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    zIndex: 1000,
                    left: 20,
                    right: 20,
                    overflowY: "auto",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        borderBottom: "1px solid #f0f0f0",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f9f9f9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      <span style={{ fontSize: "14px" }}>{option.title}</span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#74A535",
                      color: "#ffffff",
                      padding: "5px",
                      width: "130px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                    onClick={toggleModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M12.0714 7.42857H7.42857V12.0714C7.42857 12.3177 7.33074 12.5539 7.1566 12.728C6.98246 12.9022 6.74627 13 6.5 13C6.25373 13 6.01754 12.9022 5.8434 12.728C5.66926 12.5539 5.57143 12.3177 5.57143 12.0714V7.42857H0.928571C0.682299 7.42857 0.446113 7.33074 0.271972 7.1566C0.0978315 6.98246 0 6.74627 0 6.5C0 6.25373 0.0978315 6.01754 0.271972 5.8434C0.446113 5.66926 0.682299 5.57143 0.928571 5.57143H5.57143V0.928571C5.57143 0.682299 5.66926 0.446113 5.8434 0.271972C6.01754 0.0978311 6.25373 0 6.5 0C6.74627 0 6.98246 0.0978311 7.1566 0.271972C7.33074 0.446113 7.42857 0.682299 7.42857 0.928571V5.57143H12.0714C12.3177 5.57143 12.5539 5.66926 12.728 5.8434C12.9022 6.01754 13 6.25373 13 6.5C13 6.74627 12.9022 6.98246 12.728 7.1566C12.5539 7.33074 12.3177 7.42857 12.0714 7.42857Z"
                        fill="white"
                      />
                    </svg>
                    <div style={{ marginLeft: "10px" }}>
                      <Text>Add New</Text>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Divider />
            </div>
            <Checkbox
              label="Edit Offline invoice number?"
              checked={editOfflineInvoiceNumber}
              onChange={handleEditOfflineInvoiceNumberChange}
            />
            <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Offline Invoice Prefix
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField
                    placeholder=""
                    disabled={!editOfflineInvoiceNumber}
                    value={offlineInvoicePrefix}
                    onChange={(value) =>
                      handleOfflineInvoicePrefixChange(value)
                    }
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Offline Invoice Number
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <TextField
                    placeholder=""
                    disabled={!editOfflineInvoiceNumber}
                    value={offlineInvoiceNumber}
                    onChange={(value) =>
                      handleOfflineInvoiceNumberChange(value)
                    }
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Purchase Order</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    // placeholder="Purchase Order"
                    style={{
                      width: "300px",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Invoice Date</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY" // Custom format placeholder
                    style={{
                      width: "300px",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Transport Model</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder="Transport Model"
                    style={{
                      width: "350px",
                      height: "33px",
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Date of Supply</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px", position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Select a date"
                    style={{
                      width: "350px", // Width adjusted as per your desired style
                      height: "33px", // Height adjusted as per your desired style
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Status</span>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ marginTop: "5px", position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Status"
                    style={{
                      width: "350px", // Width adjusted as per your desired style
                      height: "33px", // Height adjusted as per your desired style
                      border: "1px solid #ccc",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "5px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div style={{ marginTop: "20px" }}>
            <Text variant="headingMd" fontWeight="bold">
              Item Details
            </Text>
          </div>
          <div style={{ marginTop: "10px" }}></div>
          <Card padding={0}>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#565656",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ color: "white" }}>
                  <Text variant="headingMd">Discount Level</Text>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Select
                    label=""
                    options={options}
                    onChange={handleDiscountLevelChange}
                    value={discountLevel}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ color: "white" }}>
                  <Text variant="headingMd">Amount are</Text>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Select
                    label=""
                    options={amount}
                    onChange={handleExclusiveOfTaxChange}
                    value={exclusiveOfTax}
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ width: "30%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    Product
                  </span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
                <div style={{ width: "15%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    HSN Code
                  </span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    GST %
                  </span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    Cess %
                  </span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>QTY</span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>Rate</span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
                <div style={{ width: "10%" }}>
                  <span style={{ fontSize: "14px", color: "black" }}>
                    Amount
                  </span>
                  <span style={{ fontSize: "14px", color: "red" }}>*</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ width: "30%" }}>
                  {/* Input Field */}
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={Query}
                      onChange={handleChange}
                      placeholder="Search a Product..."
                      style={{
                        width: "100%",
                        height: "33px",
                        border: "1px solid #ccc",
                        backgroundColor: "#F0F0F0",
                        borderRadius: "6px",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    />

                    {/* Dropdown with filtered results */}
                    {Query.length >= 2 && filteredProducts.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          right: "0",
                          backgroundColor: "#fff",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          borderRadius: "6px",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {filteredProducts.map((product, index) => (
                          <div
                            key={index}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #eee",
                            }}
                            onClick={() => handleSelect(product.node.title)} // Update input on selection
                          >
                            {product.node.title}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Message when less than 2 characters are typed */}
                    {Query.length > 0 && Query.length < 2 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          right: "0",
                          padding: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          fontSize: "14px",
                          color: "#888",
                        }}
                      >
                        Please type 2 or more letters.
                      </div>
                    )}
                  </div>
                  {/* Variant Input */}
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      placeholder="Variant name"
                      style={{
                        width: "100%",
                        height: "33px",
                        border: "1px solid #ccc",
                        backgroundColor: "#F0F0F0",
                        borderRadius: "6px",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
                <div style={{ width: "15%" }}>
                  <input
                    type="text"
                    style={{
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>

                <div style={{ width: "10%" }}>
                  <input
                    type="text"
                    placeholder="0%"
                    style={{
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>

                <div style={{ width: "10%" }}>
                  <input
                    type="text"
                    placeholder="0 %"
                    style={{
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>

                <div style={{ width: "10%" }}>
                  <input
                    type="number"
                    // placeholder="OTY"
                    min={1}
                    style={{
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px",
                      appearance: "none", // Hide number scroller in modern browsers
                      MozAppearance: "textfield", // Hide number scroller in Firefox
                      WebkitAppearance: "none",
                    }}
                  />
                </div>

                <div style={{ width: "10%" }}>
                  <input
                    type="number"
                    // placeholder="rate"
                    style={{
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px",
                      appearance: "none", // Hide number scroller in modern browsers
                      MozAppearance: "textfield", // Hide number scroller in Firefox
                      WebkitAppearance: "none",
                    }}
                  />
                </div>

                <div style={{ width: "10%" }}>
                  <input
                    type="text"
                    placeholder="RS 0.0"
                    style={{
                      width: "100%", // Make input take the full width of the container
                      height: "33px", // Set height
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      backgroundColor: "#F0F0F0",
                      padding: "5px", // Optional: Adds some padding inside the input
                    }}
                  />
                </div>
              </div>

              <div>
                {inputs.map((input) => (
                  <div
                    key={input.id}
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{ width: "30%" }}>
                        {/* Input Field */}
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            value={input.query}
                            onChange={(e) =>
                              handleInputChange(input.id, e.target.value)
                            }
                            placeholder="Search a Product..."
                            style={{
                              width: "100%",
                              height: "33px",
                              border: "1px solid #ccc",
                              backgroundColor: "#F0F0F0",
                              borderRadius: "6px",
                              padding: "5px",
                              boxSizing: "border-box",
                            }}
                          />
                          {/* Show dropdown only when 2 or more letters are typed */}
                          {input.query.length >= 2 &&
                            filteredProducts.length > 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: "0",
                                  right: "0",
                                  backgroundColor: "#fff",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                  borderRadius: "6px",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                {filteredProducts.map((product, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      padding: "10px",
                                      cursor: "pointer",
                                      borderBottom: "1px solid #eee",
                                    }}
                                    onClick={() =>
                                      handleInputSelect(product.node.title)
                                    }
                                  >
                                    {product.node.title}
                                  </div>
                                ))}
                              </div>
                            )}

                          {/* Message when less than 2 characters are typed */}
                          {Query.length > 0 && Query.length < 2 && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                right: "0",
                                padding: "10px",
                                backgroundColor: "#fff",
                                borderRadius: "6px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                fontSize: "14px",
                                color: "#888",
                              }}
                            >
                              Please type 2 or more letters.
                            </div>
                          )}
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <input
                            type="text"
                            placeholder="Variant name"
                            style={{
                              width: "100%",
                              height: "33px",
                              border: "1px solid #ccc",
                              backgroundColor: "#F0F0F0",
                              borderRadius: "6px",
                              padding: "5px",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "15%" }}>
                        <input
                          type="text"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="text"
                          placeholder="0%"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="text"
                          placeholder="0 %"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="number"
                          // placeholder="OTY"
                          min={1}
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px",
                            appearance: "none", // Hide number scroller in modern browsers
                            MozAppearance: "textfield", // Hide number scroller in Firefox
                            WebkitAppearance: "none",
                          }}
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="number"
                          // placeholder="rate"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            padding: "5px",
                            appearance: "none", // Hide number scroller in modern browsers
                            MozAppearance: "textfield", // Hide number scroller in Firefox
                            WebkitAppearance: "none",
                          }}
                        />
                      </div>

                      <div style={{ width: "10%" }}>
                        <input
                          type="text"
                          placeholder="RS 0.0"
                          style={{
                            width: "100%", // Make input take the full width of the container
                            height: "33px", // Set height
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            backgroundColor: "#F0F0F0",
                            padding: "5px", // Optional: Adds some padding inside the input
                          }}
                        />
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeInputField(input.id)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Item Button */}
                <div
                  onClick={addInputField}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#74A535",
                    color: "#ffffff",
                    padding: "5px",
                    width: "130px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ marginLeft: "10px" }}>Add Item</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Card>
            <Text variant="headingMd" fontWeight="bold">
              Payment Terms:
            </Text>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <Card>
                <Text variant="headingMd" fontWeight="regular">
                  Payments can be made via cash, credit/debit card, or UPI at
                  the point of sale. Advance payments may be required for large
                  orders.
                </Text>
                <Text variant="headingMd" fontWeight="bold">
                  Order Modifications:
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  Modifications to offline orders are allowed within 24 hours of
                  placing the order or before processing starts.
                </Text>
                <Text variant="headingMd" fontWeight="bold">
                  Pick-Up Policy:
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  For self-pick-up orders, goods must be collected within 3
                  business days of notification.
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  Unclaimed orders will be subject to cancellation without a
                  refund after 7 days.
                </Text>
                <Text variant="headingMd" fontWeight="bold">
                  Warranty/Guarantee:
                </Text>
                <Text variant="headingMd" fontWeight="regular">
                  Claims related to product defects must be reported within the
                  specified warranty period.
                </Text>
              </Card>
              <div style={{ width: "50%" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Subtotal
                    </Text>
                  </div>
                  <TextField />
                </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Discount Type
                    </Text>
                  </div>
                  <TextField />
                </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Discount Amount
                    </Text>
                  </div>
                  <TextField />
                </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Text variant="headingMd" fontWeight="bold">
                      Shipping Charge
                    </Text>
                    <div style={{ marginLeft: "10px", display: "flex" }}>
                      <Switch
                        onChange={handleShippingChargeToggle}
                        checked={shippingCharge}
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
                  <TextField />
                </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Round Off
                    </Text>
                  </div>
                  <TextField />
                </div>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Total
                    </Text>
                  </div>
                  <TextField />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
