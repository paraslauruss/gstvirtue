import { } from "@shopify/polaris";
import groupImage from "../../../app/assets/images/Group 138.png";
import "./generate-einvoice.css";

export function GenerateEInvoice() {
  return (
    <div>
      <div className="einvoice">Generate e-invoice</div>

      {/* Invoice Box with Sections */}
      <div className="invoice-box">
        <div className="filters">
          <input
            type="date"
            className="date-input"
            placeholder="Start to End Date"
          />
          <input
            type="text"
            className="input-location"
            placeholder="Location (Optional)"
          />
          <button className="search-button">Validate Order</button>
        </div>
         
        <div className="shadow-line"></div>

        <div className="no-data">
          <img
            src={groupImage}
            alt="No Data"
            className="no-data-image"
          />
          <p className="no-data-text">No Data Found</p>
          <p className="no-data-subtext">
            You can find orders by changing your search or filtering options
          </p>
        </div>
      </div>

      {/* Copy Rights Section */}
      <div className="copy-rights">
        <p>@2024 Virtue. All Rights Reserved.</p>
      </div>
    </div>
  );

}
