import { useLoaderData } from "@remix-run/react";
import { Backdrop } from "@shopify/polaris";
import { useEffect, useState } from "react";

export function EditDialog({ active, toggleModal, customerDetails, apiCallbackEdit }) {

    // console.log("Selected Customer Details: ", JSON.stringify(customerDetails));
    const [formValues, setFormValues] = useState({
        billingName: "",
        companyName: "",
        address: "",
        apartment: "",
        billingCity: "",
        billingState: "",
        billingPincode: "",
        billingPhone: "",
    });
    
    useEffect(() => {
        if (customerDetails && customerDetails.default_address) {
          setFormValues({
            billingName: customerDetails.default_address.name || "",
            companyName: customerDetails.company_name || "",
            address: customerDetails.default_address.address1 || "",
            apartment: customerDetails.default_address.address2 || "",
            billingCity: customerDetails.default_address.city || "",
            billingState: customerDetails.default_address.province || "",
            billingPincode: customerDetails.default_address.zip || "",
            billingPhone: customerDetails.default_address.phone || "",
          });
        }
      }, [customerDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formValues.billingName) {
            newErrors.billingName = "Please fill in this field.";
        }
        if (!formValues.address) {
            newErrors.address = "Please fill in this field.";
        }



        if (!formValues.billingCity) {
            newErrors.billingCity = "Please fill in this field.";
        }
        if (!formValues.billingState) {
            newErrors.billingState = "Please fill in this field.";
        }
        if (!formValues.billingPincode) {
            newErrors.billingPincode = "Please fill in this field.";
        }

        console.log("Validation Errors:", newErrors); // This will be helpful for debugging
        return newErrors;
    };

    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry",
    ];

    const customers = useLoaderData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors);
        // If errors exist, show alert and stop form submission
        if (Object.keys(errors).length > 0) {
            console.error("Validation failed:", errors);

            return;
        }

        const requestData = {
            company_name: formValues.companyName,
            addresses: [
              {
                address1: formValues.address,
                address2: formValues.apartment,
                city: formValues.billingCity,
                province: formValues.billingState,
                country: "India",
                zip: formValues.billingPincode,
                phone: formValues.billingPhone,
                name: formValues.billingName,
                default : true
              }
            ]
          };

          try {
            console.log("Shopify Customer ID: ", JSON.stringify(requestData));
            console.log("Shopify Customer ID: ", `http://localhost:3001/api/customers/${customerDetails.shopifyId}`);
            const response = await fetch(`http://localhost:3001/api/customers/${customerDetails.shopifyId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "store-name": customers.storeName,
                "api-version": "2025-01",
                "access-token": customers.accessToken
              },
              body: JSON.stringify(requestData)
            });
      
            if (response.status !== 201 && response.status !== 200) {
              const errorData = await response.json();
              console.log("Formatted Errors : ", errorData);
              const apiErrors = errorData.errors || {}; // Extracting errors from the response
      
              // Map errors from API to the state in a format you can use for display
              const formattedErrors = {};
              for (const [field, messages] of Object.entries(apiErrors)) {
                formattedErrors[field] = messages.join(" "); // Join multiple error messages into a single string
              }
      
              console.log("Formatted Errors : ", formattedErrors);
      
              setErrors(formattedErrors);  // Set API errors to state
              return;  // Don't proceed if the API returns an error
            }

            const responseData = await response.json();
            
            toggleModal();
            apiCallbackEdit(responseData.customer);
          } catch (error) {
            console.error("🚨 API Error:", error.message);
           
            setErrors({ apiError: "Error creating customer. Please try again." });
          }

    };

    return (
        <div>
            {active && (
                <Backdrop
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1,
                    }}
                    onClick={toggleModal}  // Close modal if backdrop is clicked
                />
            )}
            {active && (
                <div>
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        zIndex: 9999,
                        width: '40%',
                        borderRadius: '10px',
                    }}
                >
                    <div
                        style={{
                            color: 'white', display: 'flex', justifyContent: 'space-between', backgroundColor: '#74A535', padding: '15px 20px', borderRadius: '8px 8px 0px 0px',
                        }}
                    >
                        <div style={{ color: 'white', fontSize: '20px' }}>Billing Address</div>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ margin: '10px' }}>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>Billing Name</span>
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="billingName"
                                    value={formValues.billingName}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.billingName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.billingName}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Company Name</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formValues.companyName}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.companyName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.companyName}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Address</span>
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="address"
                                    value={formValues.address}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.address && <p style={{ color: 'red', fontSize: '12px' }}>{errors.address}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Apartment, suite, etc.</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formValues.apartment}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.apartment && <p style={{ color: 'red', fontSize: '12px' }}>{errors.apartment}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Billing City</span>
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="billingCity"
                                    value={formValues.billingCity}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.billingCity && <p style={{ color: 'red', fontSize: '12px' }}>{errors.billingCity}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Billing State</span>
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <select
                                    name="billingState"
                                    value={formValues.billingState}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        appearance: 'none',
                                        position: 'relative',
                                    }}>
                                    <option value="">Select State</option> {/* Default option */}
                                    {states.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                {errors.billingState && <p style={{ color: 'red', fontSize: '12px' }}>{errors.billingState}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Billing Pincode</span>
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="billingPincode"
                                    value={formValues.billingPincode}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.billingPincode && <p style={{ color: 'red', fontSize: '12px' }}>{errors.billingPincode}</p>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Billing Phone</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    name="billingPhone"
                                    value={formValues.billingPhone}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', }}
                                />
                                {errors.billingPhone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.billingPhone}</p>}
                            </div>
                            <button
                                type="submit"
                                // className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                style={{
                                    marginTop: '20px',
                                    cursor: 'pointer',
                                    padding: '10px 30px', backgroundColor: '#74A535', border: 'none', borderRadius: '5px', color: 'white'
                                }}>Save</button>
                        </div>
                    </form>
                </div>
            </div>)}
        </div>
    );
}