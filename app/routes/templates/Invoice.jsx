import React, { useState } from "react";
import ic_screenshot from "../../assets/images/ic_screenshot.png";
import ic_classic from "../../assets/images/ic_classic.png";
import ic_modern from "../../assets/images/ic_modern.png";
import ic_minimal from "../../assets/images/ic_minimal.png";
import ic_informative from "../../assets/images/ic_informative.png";
import ic_demo from "../../assets/images/ic_demo.png";
import { Customization } from "./customization";

export const Invoice = () => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreviewClick = () => {
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  const [page, setPage] = useState('invoice');

  return (
    <>
      {page == "customization" && <Customization onClick={() => setPage('invoice')} />}
      {page == "invoice" && (
        <div
          style={{
            margin: "0",
            padding: "0",
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#FDFDFD",
          }}
        >
          <div
            style={{
              width: "85%",
              maxWidth: "1200px",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <h1
                style={{
                  fontSize: "18px",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                Invoice
              </h1>
            </div>

            {/* the both perciew part  */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "30px",
                border: "1px solid #F1F1F4",
                borderRadius: "8px",
                boxShadow: "0px 4px 4px 0px #00000008",
                // backgroundColor: "#f9f9f9",
              }}
            >
              {/* Left Section - Active Template */}
              <div
                style={{
                  width: "50%",
                  padding: "20px",
                  border: "1px solid #e2e2e2",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={ic_screenshot}
                  alt="Standard Template"
                  style={{
                    width: "370px",
                    height: "334px",
                    borderRadius: "5px",
                    padding: "20px 20px",
                    display: "block",
                    margin: "0 auto",
                    borderBottom: "1px solid #ccc",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#74A535",
                      backgroundColor: "#EAF5E6",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      marginTop: "30px",
                    }}
                  >
                    Active
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Inter",
                      marginBottom: "0",
                    }}
                  >
                    Standard Template
                  </span>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      style={{
                        padding: "8px 12px",
                        fontSize: "14px",
                        fontWeight: "600",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        width: "115px",
                        height: "36px",
                      }}
                      onClick={handlePreviewClick}
                    >
                      Preview
                    </button>

                    <button
                      style={{
                        padding: "8px 12px",
                        fontSize: "14px",
                        fontWeight: "600",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "#74A535",
                        color: "#fff",
                        cursor: "pointer",
                        width: "115px",
                        height: "36px",
                      }}
                      onClick={() => setPage('customization')}
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section - Other Templates */}
              <div
                style={{
                  width: "48%",
                  padding: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    fontFamily: "Inter",
                    borderBottom: "1px solid #E2E2E2",
                    paddingBottom: "12px",
                  }}
                >
                  Other Templates
                </h3>

                {[
                  { name: "Classic Template", imgSrc: ic_classic },
                  { name: "Modern Template", imgSrc: ic_modern },
                  { name: "Informative Template", imgSrc: ic_informative },
                  { name: "Minimal Template", imgSrc: ic_minimal },
                ].map((template, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "16px",
                      borderBottom: "1px solid #E2E2E2",
                      paddingBottom: "16px",
                    }}
                  >
                    <img
                      src={template.imgSrc}
                      alt={template.name}
                      style={{
                        width: "88px",
                        height: "78px",
                        borderRadius: "4px",
                        marginRight: "8px",
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily: "Inter",
                          display: "block",
                        }}
                      >
                        {template.name}
                      </span>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button
                          style={{
                            padding: "4px 12px",
                            fontSize: "12px",
                            border: "none",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            color: "#74A535",
                          }}
                        >
                          Preview
                        </button>
                        <button
                          style={{
                            padding: "4px 10px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            border: "1px solid #000",
                            borderRadius: "2px",
                            backgroundColor: "#fff",
                            color: "#000",
                            cursor: "pointer",
                            width: "95px",
                            height: "34px",
                          }}
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Preview Modal */}
            {previewVisible && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    maxWidth: "80%",
                    maxHeight: "90%",
                    overflow: "auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "15px",
                        backgroundColor: "#74A454",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    >
                      <h1
                        style={{
                          color: "#fff",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "18px",
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        Standard Template
                      </h1>
                    </div>

                    <button
                      onClick={handleClosePreview}
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "20px",
                        background: "transparent",
                        border: "none",
                        fontSize: "28px",
                        cursor: "pointer",
                        color: "#fff",
                        padding: "0 10px",
                      }}
                      aria-label="Close Preview"
                    >
                      &times;
                    </button>

                    <div style={{ padding: "20px", textAlign: "center" }}>
                      <img
                        src={ic_demo}
                        alt="Invoice Preview"
                        style={{
                          width: "87%",
                          maxWidth: "420px",
                          height: "auto",
                          display: "block",
                          margin: "0 auto",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </>

  );
};
