  // import {} from "@shopify/polaris";
import './creditNotes.css';
import groupImage from "../../../app/assets/images/Group 138.png";


export function CreditNotes() {
    return (
      <div>
        <div className="credit-notes">Credit Notes</div>
      
        {/* Credit box with sectins */}
        <div className="credit-box">
          <div className="filters">
            <input
              type="text"
              className="search-input"
              placeholder="Order No, Invoice No, Customer"
            />
            <select className="dropdown">
                <option value="">Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
            </select>
            <input type="date" className="date-picker" />
            <input type="date" className="date-picker" />
            <button className="search-button">Search</button>
            <button className="clear-button">Clear</button>
          </div>
          
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

        {/* Copy rights section  */}
        <div className="copy-rights">
           <p>@2024 Virtue. All Rights Reserved.</p>
        </div>
      </div>
    );
  }

export default CreditNotes;
