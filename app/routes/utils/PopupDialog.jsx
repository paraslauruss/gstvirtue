import React, { useEffect } from 'react';

const PopupDialog = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
        }} onClick={onClose}>
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                width: '400px',
                maxWidth: '100%',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    background: '#f1f1f1',
                    borderBottom: '1px solid #ddd',
                }}>
                    <h2 style={{
                        margin: '0',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>{title}</h2>
                    <button style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                    }} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopupDialog;