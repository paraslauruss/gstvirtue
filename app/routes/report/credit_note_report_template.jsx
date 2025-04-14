import React from 'react'

import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { useState,useEffect } from "react";
import ic_warning from '../../assets/images/ic_warning.jpg';
import ic_delete from '../../assets/images/ic_delete.png';
import CreateCreditTemplate from './createCreditTemplate';

export default function credit_note_report_template({onClick}) {

    const [isCreateCreditTemplate, setCreateCreditTemplate] = useState(false);
    const [repTemplate, setRepTemplate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null); 
    const [errorBanner, setErrorBanner] = useState(null); // For showing errors

       // Fetch templates from the backend
        const fetchSavedTemplates = async () => {
            setLoading(true);
            setErrorBanner(null);
            try {
                const response = await fetch("http://localhost:3001/api/templates/all");
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRepTemplate(data);
            } catch (error) {
                console.error("Error fetching templates:", error);
                setErrorBanner(`Error fetching templates: ${error.message}`);
            } finally {
                setLoading(false);
            }
         };
         const handleDeleteTemplate = async () => {
            if (!templateToDelete) return;
            setErrorBanner(null); // Clear previous errors
    
            try {
                const response = await fetch(`http://localhost:3001/api/templates/delete/${templateToDelete._id}`, {
                    method: "DELETE",
                });
    
                if (response.ok) {
                    setRepTemplate(prevTemplates => prevTemplates.filter(template => template._id !== templateToDelete._id));
                    closeDeletePopup();
                } else {
                    const errorData = await response.json();
                    console.error("Failed to delete template:", errorData.message);
                    setErrorBanner(`Failed to delete template: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Error deleting template:", error);
                setErrorBanner(`Error connecting to server: ${error.message}`);
               
            }
        };
    
        // Call fetchSavedTemplates when the component mounts
        useEffect(() => {
            fetchSavedTemplates();
        }, []); 

        const openDeletePopup = (templateId) => {
            const template = repTemplate.find((t) => t._id === templateId);
            if (template) {
                setTemplateToDelete(template);
                setShowDeletePopup(true);
            } else {
                console.error("Template not found for ID:", templateId);
                setErrorBanner("Could not find the template to delete.");
            }
        };
    
        const closeDeletePopup = () => {
            setShowDeletePopup(false);
            setTemplateToDelete(null);
        };

  return (
       isCreateCreditTemplate ? (
           <CreateCreditTemplate onBack={() => setCreateCreditTemplate(false)} />
       ) : (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            height: '100vh', 
            backgroundColor: '#ffffff',
            paddingTop: '0px',
        }}>
            <div style={{ 
                width: '80%', 
                maxWidth: '1000px', 
                backgroundColor: '#fff', 
                padding: '40px', 
                borderRadius: '10px', 
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ cursor: 'pointer' }} onClick={onClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                                <path d="M6.9375 1L1 6.9375L6.9375 12.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 6.9375H10.5C17.0586 6.9375 22.375 12.2539 22.375 18.8125V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <Text variant="headingLg">Credit Note Report Template</Text>
                    </div>
    
                    <div
                        style={{ 
                            cursor: 'pointer', 
                            color: 'white', 
                            backgroundColor: '#74A535', 
                            padding: '10px 20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            borderRadius: '5px' 
                        }}
                        onClick={() => setCreateCreditTemplate(true)}>
                        <Text>Create Report Template</Text>
                    </div>
                </div>
                   {/* Warning Box */}
                    <div style={{ 
                        border: '1px solid #ccc', 
                        borderRadius: '10px', 
                        padding: '12px', 
                        backgroundColor: '#f9f9f9', 
                        marginBottom: '20px' 
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            backgroundColor: '#EAF4FF', 
                            padding: '10px', 
                            borderRadius: '16px' 
                        }}>
                            <img src={ic_warning} alt="warning" style={{ width: '16px', height: '16px', marginRight: '10px' }} />
                            <p style={{ fontSize: '14px', fontFamily: 'Inter',fontWeight:'400',color:'#000'}}>
                                You cannot create more than 5 templates, please delete anyone and create a new one.
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter", marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f8f8f8", borderBottom: "2px solid #ddd" }}>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>No.</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Report Title</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Report Columns Name</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repTemplate.map((template, index) => (
                                <tr key={index}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{index + 1}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{template.title}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {Array.isArray(template.fields) ? 
                                            template.fields.map((field, idx) => (
                                                <span
                                                    key={idx}
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "6px 12px",
                                                        margin: "4px",
                                                        backgroundColor: "#cce5ff", 
                                                        color: "#000", 
                                                        borderRadius: "20px", 
                                                        fontSize: "12px",
                                                        fontFamily: "Inter"
                                                    }}>
                                                    {field}
                                                </span>
                                            )) : "Invalid Data"}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>      
                                        <img
                                            src={ic_delete} 
                                            alt="delete"
                                            onClick={() => openDeletePopup(template._id)} 
                                            style={{ cursor: "pointer", verticalAlign: "middle" }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* footer */}
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'}}>
                        <p style={{fontSize:'13px',fontFamily:'Inter',color:'#000'}}>© 2025 VirtueGst. All Rights Reserved.</p>
                    </div>

                    {/* Delete Confirmation Popup */}
                    {showDeletePopup && (
                      <>
                      {/* Backdrop with blur effect */}
                      <div style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent dark background
                          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                          zIndex: 1000,
                      }}></div>
                        <div style={{
                          position: "fixed",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "#fff",
                          padding: "20px",
                          borderRadius: "8px",
                          zIndex: 1000,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "300px",
                          textAlign: "center"
                      }}>
                          <h3 style={{ marginBottom: "15px",fontSize:'14px',fontFamily:'Inter' }}>This Can't be Undone</h3>
              
                          <div style={{ display: "flex", gap: "10px", }}>
                              <button
                                  onClick={handleDeleteTemplate}
                                  style={{
                                      padding: "8px 12px",
                                      backgroundColor: "#ff4d4d",
                                      color: "#fff",
                                      borderRadius: "5px",
                                      cursor: "pointer"
                                  }}>
                                  Yes, Delete
                              </button>
                              <button
                                  onClick={() => setShowDeletePopup(false)}
                                  style={{
                                      padding: "8px 12px",
                                      backgroundColor: "#cccccc",
                                      color: "#000",
                                      borderRadius: "5px",
                                      cursor: "pointer"
                                  }}>
                                  Cancel
                              </button>
                          </div>
                      </div>
                  </>
                )}
                </div>
            </div>
       )
  )
};
