import {
} from "@shopify/polaris";
import groupImage from "../../../app/assets/images/Group 138.png";
import ic_warning from '../../assets/images/ic_warning.jpg';

export function ECreditNotes() {
  return (
      <div>
          <div style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "33px",
              marginLeft: "10px",
              fontFamily: "Inter, sans-serif",
              fontStyle: "normal"
          }}>
              e-Credit Notes
          </div>

          <div style={{
              marginLeft:'15px',
              marginTop:'15px',
              border:'1px solid #ccc',
              borderRadius:'7px',
              padding:'12px 16px',
              display:'flex',
              backgroundColor:'#EAF4FF'
            }}>
            <img src={ic_warning} alt="warning" style={{width:'16px', height:'16px', marginRight:'10px'}} />
            <p style={{fontSize:'14px', fontFamily:'Inter',fontWeight:'700'}}>
              e-Invoicing is mandatory for the taxpayers with annual turnover more than Rs.5 crores.<br/>
              For SEZ customers go to GST/HSN Customers Column "Is SEZ Unit?". By default, it will be considered only as (SEZWP) Supply to SEZ with payment. 
              There is no option available for (SEZWOP) Supply to SEZ without payment.
              </p>
         </div>
          <div style={{
              boxSizing: "border-box",
              width: "1190px",
              height: "447px",
              marginLeft: "10px",
              marginTop: "15px",
              background: "#ffffff",
              border: "1px solid #f1f1f4",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.03)",
              borderRadius: "13px",
              padding: "20px"
          }}> 
              <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%"
              }}>
                  <img 
                      src={groupImage}
                      alt="no data"
                      style={{ width: "100px", marginBottom: "20px" }}
                  />
                  <p style={{ fontSize: "18px", fontWeight: "600", color: "#000" }}>No Data Found</p>
                  <p style={{ fontSize: "14px", color: "#6c757d" }}>
                      You can find orders by changing your search or filtering options
                  </p>
              </div>
          </div>

          <div style={{
              position: "relative",
              marginTop: "19px",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "300",
              color: "#707070"
          }}>
              <p>@2024 Virtue. All Rights Reserved.</p>
          </div>
      </div>
  );
}
