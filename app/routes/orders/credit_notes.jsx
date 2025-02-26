import groupImage from "../../../app/assets/images/Group 138.png";

export function CreditNotes() {
  return (
    <div>
      <div style={{
        width: "158px",
        height: "21px",
        marginLeft: "28px",
        marginTop: "33px",
        fontFamily: "Inter, sans-serif",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "19px",
        lineHeight: "21px",
        display: "flex",
        alignItems: "center",
        color: "#000000"
      }}>Credit Notes</div>
      
      <div style={{
        boxSizing: "border-box",
        width: "1190px",
        height: "450px",
        marginLeft: "28px",
        marginTop: "20px",
        background: "#ffffff",
        border: "1px solid #f1f1f4",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.03)",
        borderRadius: "13px",
        padding: "20px"
      }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Order No, Invoice No, Customer"
            style={{
              flex: 2,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}
          />
          <select style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }}>
            <option value="">Payment Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <input type="date" style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }} />
          <input type="date" style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }} />
          <button style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "white"
          }}>Search</button>
          <button style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#f8f9fa",
            color: "#000"
          }}>Clear</button>
        </div>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}>
          <img
            src={groupImage}
            alt="No Data"
            style={{ width: "100px", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#000" }}>No Data Found</p>
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
        fontWeight: 300,
        color: "#707070"
      }}>
        <p>@2024 Virtue. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default CreditNotes;
