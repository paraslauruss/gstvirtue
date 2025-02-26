import React from 'react'
import noData from '../../assets/images/Group 138.png'
export const DownloadZip = ({onClose}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width:'400px',
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        <img src={noData} alt='no-data' />
        <h2 style={{
          fontSize:'16px',
          fontFamily:'Inter',
          fontWeight:'500'
        }}>No Files Found</h2>
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#74A535",
            border: "none",
            borderRadius: "3px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}
