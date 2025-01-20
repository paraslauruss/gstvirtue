import React from "react";
import ic_info from "../../assets/images/ic_info.png";

export const Smtp = () => {
  const handleSave = () => {
    alert("button clicked");
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
      <div
        style={{
          width: "70%",
          maxWidth: "1200px",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <div
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
                marginTop: "40px",
              }}
            >
              SMTP Configuration
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
              marginTop: "20px",
            }}
          >
            Save
          </button>
        </div>
        <div
          style={{
            marginTop: "14px",
            backgroundColor: "#E2E2E2",
            border: "1px solid #ccc",
            borderRadius: "3px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
          }}
        >
          <img
            src={ic_info}
            alt="Warning"
            style={{ width: "15px", height: "15px", marginRight: "10px" }}
          />
          <span>
            Steps for{" "}
            <strong>
              <u>Gmail SMTP Server</u>
            </strong>
          </span>
        </div>

        {/* First box  */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginTop: "30px",
            padding: "12px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "17px",
                fontFamily: "Inter",
                fontWeight: "600",
                color: "black",
                marginLeft: "14px",
                borderBottom: "1px solid #E2E2E2",
                paddingBottom: "20px",
              }}
            >
              Common Configurations
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "30px",
              paddingLeft: "12px",
              gap: "20px", // Adjusted gap for better
              marginBottom: "20px",
            }}
          >
            <label
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <h1
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                From Email
              </h1>
              <input
                type="email"
                placeholder="Type here"
                style={{
                  width: "100%", // Makes the input stretch to fit the parent
                  height: "33px",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #E2E2E2",
                  borderRadius: "2px",
                }}
              />
            </label>

            <label
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <h1
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                From Name
              </h1>
              <input
                type="text"
                placeholder="Type here"
                style={{
                  width: "100%", // Makes the input stretch to fit the parent
                  height: "33px",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #E2E2E2",
                  borderRadius: "2px",
                }}
              />
            </label>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginTop: "30px",
            padding: "12px",
          }}
        >
          <div
            style={{
              marginTop: "10px",
              fontSize: "17px",
              fontFamily: "Inter",
              fontWeight: "600",
              color: "black",
              marginLeft: "14px",
              borderBottom: "1px solid #E2E2E2",
              paddingBottom: "20px",
            }}
          >
            <h1>SMTP Configurations</h1>
          </div>

          <div
            style={{
              maxWidth: "100%", // Prevents the content from overflowing the parent container
              marginLeft: "18px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px", // Adds equal spacing between labels
              }}
            >
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <label
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "185px",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        marginBottom: "8px", // Adds space between label and input
                      }}
                    >
                      SMTP Host
                    </h1>
                    <input
                      type="text"
                      placeholder="Type here"
                      style={{
                        height: "33px",
                        border: "1px solid #E2E2E2",
                        borderRadius: "4px",
                        padding: "0 8px", // Adds padding inside the input
                        fontSize: "14px",
                      }}
                    />
                  </label>
                ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "30px", // Adjusts the gap between this section and the input boxes
              alignItems: "center",
              marginLeft: "18px",
            }}
          >
            <h1
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "600",
                marginRight: "16px", // Space between label and options
              }}
            >
              SMTP Security
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px", // Space between radio options
              }}
            >
              <label
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <input
                  type="radio"
                  name="smtp-security"
                  value="none"
                  defaultChecked
                  style={{ accentColor: "#74A535" }}
                />
                <span style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  None
                </span>
              </label>

              <label
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <input
                  type="radio"
                  name="smtp-security"
                  value="tls"
                  style={{ accentColor: "#74A535" }}
                />
                <span style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  TLS
                </span>
              </label>

              <label
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <input
                  type="radio"
                  name="smtp-security"
                  value="ssl"
                  style={{ accentColor: "#74A535" }}
                />
                <span style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  SSL
                </span>
              </label>
            </div>
          </div>

          <button
            style={{
              marginLeft: "18px",
              marginTop: "20px",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
              fontSize: "14px",
              fontFamily: "Inter",
              cursor: "pointer",
              color: "#828282",
              width: "25%",
            }}
          >
            Test Configuration
          </button>
        </div>

        <div>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "500",
              marginBottom: "50px",
              color: "#707070",
            }}
          >
            <p>@2024 Virtue. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
