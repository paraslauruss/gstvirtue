import { useState } from 'react';
import pkg from 'react-color';
const SketchPicker = pkg;

const ColorPickerModal = ({ isOpen, onClose, onSave }) => {
    const [bgColor, setBgColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");

    return isOpen ? (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ alignItems: 'center', backgroundColor: "white", padding: "20px", borderRadius: '8px' }}>


                <SketchPicker color={bgColor} onChange={(color) => setBgColor(color.hex)} />

                {/* Buttons */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => onSave(bgColor, textColor)} style={{ backgroundColor: "#28a745", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                    <button onClick={onClose} style={{ backgroundColor: "#6c757d", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ColorPickerModal;