import {
} from "@shopify/polaris";
import "./e-creditNotes.css";
import groupImage from "../../../app/assets/images/Group 138.png"
export function ECreditNotes() {
    return(
        <div>

           <div className="creditNotes">
               e-Credit Notes
           </div>
  
         <div className="Ecredit-box"> 
         <div className="no-data">
             <img 
             src={groupImage}
             alt="no data"
             className="no-data-image"/>

            <p className="no-data-text">No Data Found</p>
            <p className="no-data-subtext">
              You can find orders by changing your search or filtering options
            </p>
          </div>
         </div>

         <div className="copy-rights">
             <p>@2024 Virtue. All Rights Reserved.</p>
          </div>
        </div>
        
    );
}