import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { useState,useEffect } from "react";
import CreateReportTemplate from "./create_report_template";
import ic_warning from '../../assets/images/ic_warning.jpg';
import ic_delete from '../../assets/images/ic_delete.png';

export default function OrderReportTemplate({ onClick }) {

    const [isCreateTemplate, setCreateTemplate] = useState(false);
    const [reportTemplates, setReportTemplates] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);
       // Fetch templates from backend
        useEffect(() => {
            fetch("http://localhost:3001/api/online/report-templates")
                .then(response => response.json())
                .then(data => setReportTemplates(data))
                .catch(error => console.error("Error fetching templates:", error));
        }, []);

        const handleTemplateSaved = (newTemplate) => {
            setReportTemplates(prev => [...prev.filter(t => t.title !== newTemplate.title), newTemplate]);
            setCreateTemplate(false); 
        };
        const openDeletePopup = (title) => {
            setTemplateToDelete(title);
            setShowDeletePopup(true);
        };
        const confirmDelete = async () => {
            if (templateToDelete) {
                try {
                    await fetch(`http://localhost:3001/api/online/report-templates/${templateToDelete}`, {
                        method: "DELETE",
                    });
                    setReportTemplates(prev => prev.filter(template => template.title !== templateToDelete));
                } catch (error) {
                    console.error("Error deleting template:", error);
                }
            }
            setShowDeletePopup(false);
            setTemplateToDelete(null);
        };
        const closeDeletePopup = () => {
            setShowDeletePopup(false);
            setTemplateToDelete(null);
        };

    return (
        isCreateTemplate ? (
             <CreateReportTemplate onBack={() => setCreateTemplate(false)} onTemplateSaved={handleTemplateSaved}/> 
        ) 
           :
         (
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
                                <Text variant="headingLg">Order Report Template</Text>
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
                                onClick={() => setCreateTemplate(true)}>
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
                                    {reportTemplates.map((template, index) => (
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
                                                    onClick={() => openDeletePopup(template.title)} 
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
                                <div style={{
                                    position: "fixed", 
                                    top: 0, left: 0, width: "100%", height: "100vh",
                                    backgroundColor: "rgba(0,0,0,0.5)", 
                                    display: "flex", 
                                    justifyContent: "center", 
                                    alignItems: "center"
                                }}>
                                    <div style={{ 
                                        background: "#fff", 
                                        padding: "20px", 
                                        borderRadius: "10px", 
                                        textAlign: "center", 
                                        width: "300px" 
                                    }}>
                                <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>Are you sure?</p>
                                <p style={{ fontSize: "14px", color: "#555" }}>This action cannot be undone.</p>
                                
                                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
                                    <button  onClick={() => setShowDeletePopup(false)} style={{ padding: "8px 16px", background: "#ccc", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                                        Cancel
                                    </button>
                                    
                                    <button onClick={confirmDelete} style={{ padding: "8px 16px", background: "red", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                               </div>
                  )}
                </div>
            </div>
        )
    );
}