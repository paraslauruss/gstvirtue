import React from "react";
import ic_info from "../../assets/images/ic_info.png";
import RichTextEditor from "../../../app/routes/orders/rich_text_editor";

export const EstimatesEmail = () => {
  const handleSave = () => {
    alert("Button clicked ");
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
              Estimates Notification Email Content
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
                style={{
                  width: "100%",
                  height: "36px",
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
              <RichTextEditor text="<p>Hi <strong>Customer_Name,</strong></p><p><br></p><h2><strong>Greetings from Store_Name!</strong></h2><p>Thank you for contacting us.</p><p><br></p><p>Here is your estimate. Kindly download from the link below</p>"/>
          </div>


          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#E2E2E2",
              border: "1px solid #ccc",
              borderRadius: "3px",
              height: "40px",
              display: "flex", // Align elements horizontally
              alignItems: "center", // Vertically align the image and text
              paddingLeft: "12px", // Add some space before the image
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
              values of Estimate.
            </span>
          </div>
          
        </div>

        <div>
           <div style={{
             textAlign:'center',
             marginTop:'40px',
             fontSize:'14px',
             fontFamily:'Inter',
             fontWeight:'500',
             marginBottom:'50px',
             color:'#707070'
           }}>
              <p>@2024 Virtue. All Rights Reserved.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
