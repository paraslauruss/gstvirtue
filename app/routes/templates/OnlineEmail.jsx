import React, { useEffect, useState } from "react";
import ic_info from "../../assets/images/ic_info.png";
import RichTextEditor from "../../../app/routes/orders/rich_text_editor";
import { useLoaderData } from "@remix-run/react";


export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  return {
    accessToken: session.accessToken,
    storeName: session.shop
  };
};


export const OnlineEmail = () => {

  const session = useLoaderData();
  const storeName = session?.storeName;
  const accessToken = session?.accessToken;
  const [emailFormate, setEmailFormate] = useState(null);

  const [formValues, setFormValues] = useState({
    subject: ""
  });
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogoUrl = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/email-formate', {
          method: 'GET',
          headers: {
            'store-name': storeName,
            'api-version': '2025-01',
            'access-token': accessToken
          }
        });

        if (response.ok) {
          const data = await response.json();
          setEmailFormate(data);
          setFormValues(
            {
              subject: data.emailFormate.online_order_email.subject
            }
          );
          setBody(data.emailFormate.online_order_email.body);
          console.error('Email Formate Data:', data);
        } else {
          console.error('Error fetching logo URL:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching logo URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogoUrl();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // console.log("Save and Preview", JSON.stringify(formData));
    fetch('http://localhost:3001/api/email-formate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'store-name': storeName,
        'api-version': '2025-01',
        'access-token': accessToken
      },
      body: JSON.stringify({
        online_order_email: {
          subject: formValues.subject,
          body: body
        },
        offline_order_email: emailFormate.emailFormate.offline_order_email,
        estimates_email: emailFormate.emailFormate.estimates_email
      })
    })
      .then(response => response.json())
      .then(data => {

        shopify.toast.show("Success");
      })
      .catch((error) => {
        shopify.toast.show("Error");
      });
  };

  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#FDFDFD",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            width: "70%",
            maxWidth: "1200px",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div
            className="Email-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "Inter",
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "black",
                  marginTop: "30px",
                }}
              >
                Online Order Notification Email Content
              </h1>
            </div>
            <button
              onClick={handleSave}
              style={{
                width: "90px",
                height: "40px",
                color: "white",
                backgroundColor: "#5c8e29",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px",
                marginTop: "10px",
              }}
            >
              Save
            </button>
          </div>

          {/* Editor part  */}
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #F1F1F4",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: '0px 4px 4px 0px #00000008'
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                Subject
              </h1>
              <label>
                <input
                  placeholder="Invoice copy of order order_name"
                  value={formValues.subject}
                  onChange={handleChange}
                  name="subject"
                  style={{
                    width: "100%",
                    height: "36px",
                    padding: '10px',
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    marginBottom: "20px",
                  }}
                />
              </label>
            </div>

            <div>
              <h1
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginBottom: "10px",
                  color: "#000000",
                }}
              >
                Body
              </h1>
              <RichTextEditor
                text={body}
                onChange={(newBody) => setBody(newBody)} />
            </div>


            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#E2E2E2",
                border: "1px solid #ccc",
                borderRadius: "3px",
                height: "30px",
                display: "flex", // Align elements horizontally
                alignItems: "center", // Vertically align the image and text
                paddingLeft: "10px", // Add some space before the image
              }}
            >
              <img
                src={ic_info}
                alt="Warning"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <span>
                Do not remove the <strong>“Customer_Name”</strong> and{" "}
                <strong>“Order_Name”</strong>. These will be replaced with dynamic
                values.
              </span>
            </div>
          </div>

          <div>
            <div style={{
              textAlign: 'center',
              marginTop: '40px',
              fontSize: '14px',
              fontFamily: 'Inter',
              fontWeight: '500',
              marginBottom: '50px',
              color: '#707070'
            }}>
              <p>@2024 Virtue. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
