import { } from "@shopify/polaris";
import groupImage from "../../../app/assets/images/Group 138.png";
import ic_warning from '../../assets/images/ic_warning.jpg';
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, subDays } from "date-fns";

export function GenerateEInvoice() {

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelectingCustom, setIsSelectingCustom] = useState(false);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedOption, setSelectedOption] = useState("Today");

  const predefinedRanges = [
    { label: "Today", days: 0 },
    { label: "Yesterday", days: 1 },
    { label: "Last 3 Days", days: 3 },
    { label: "Last 7 Days", days: 7 },
    { label: "Last 15 Days", days: 15 },
    { label: "Custom Range", days: null },
  ];

  const handleSelect = (range) => {
    setSelectedRange([range.selection]);
  };

  const applyCustomRange = () => {
    setSelectedOption(
      `${format(selectedRange[0].startDate, "MM/dd/yyyy")} - ${format(
        selectedRange[0].endDate,
        "MM/dd/yyyy"
      )}`
    );
    setShowDropdown(false);
    setIsSelectingCustom(false);
  };

  const handlePredefinedRangeSelect = (range) => {
    if (range.label === "Custom Range") {
      setIsSelectingCustom(true);
    } else {
      setSelectedOption(range.label);
      setShowDropdown(false);
      setIsSelectingCustom(false);
    }
  };

  return (
    <div>
      <div style={{
        width: "158px",
        height: "21px",
        marginLeft: "10px",
        marginTop: "33px",
        fontFamily: "Inter, sans-serif",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "21px",
        color: "#000000"
      }}>
        Generate e-Invoice
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

          {/* Invoice Box with Sections */}
          <div style={{
            boxSizing: "border-box",
            width: "1190px",
            height: "450px",
            marginLeft: "10px",
            marginTop: "20px",
            background: "#ffffff",
            border: "1px solid #f1f1f4",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.03)",
            borderRadius: "13px",
            padding: "20px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px"
            }}>
              {/* Date */}
              <div style={{ position: "relative", width: "350px" }}>
            {/* Dropdown Button */}
            <button
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "#fff",
                textAlign: "left",
              }}
              onClick={() => setShowDropdown(!showDropdown)}>
              {selectedOption}
            </button>
            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  background: "#fff",
                  border: "1px solid #ddd",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  zIndex: 1000,
                  width: "300px",
                  padding: "10px",
                }} >
              {isSelectingCustom ? (
                <div>
                  <DateRange
                    ranges={selectedRange}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                  />
                  <button
                    onClick={applyCustomRange}
                    style={{
                      padding: "8px",
                      background: "green",
                      color: "#fff",
                      marginTop: "10px",
                      cursor: "pointer",
                      width: "100%",
                    }}>
                    Apply
                  </button>
                  <button
                    onClick={() => setIsSelectingCustom(false)}
                    style={{
                      padding: "8px",
                      background: "gray",
                      color: "#fff",
                      marginTop: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}>
                    Cancel
                  </button>
                </div>
               ) : (
                // List of predefined date ranges
                <div>
                  {predefinedRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedRangeSelect(range)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px",
                        border: "none",
                        background: range.label === "Custom Range" ? "#17a2b8" : "#fff",
                        color: range.label === "Custom Range" ? "#fff" : "#000",
                        cursor: "pointer",
                      }} >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
         <div style={{position:'relative'}}>
            {/* locatoon */}
            <input
              type="text"
              placeholder="Location (Optional)"
              style={{
                width:'350px',
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            />
         </div>
          <button style={{
            padding: "12px",
            width:'120px',
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px"
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}>
             Validate Order
          </button>
        </div>

        <div style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          marginTop: "10px",
          boxShadow: "0 4px 6px #ffffff"
        }}></div>

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
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#000" }}>
            No Data Found
          </p>
          <p style={{ fontSize: "14px", color: "#6c757d" }}>
            You can find orders by changing your search or filtering options
          </p>
        </div>
      </div>

      {/* Copy Rights Section */}
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
