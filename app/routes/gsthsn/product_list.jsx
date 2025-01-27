import React, { useState } from "react";
import CustomCheckbox from "../utils/custom_check_box";

const productList = ({ productList }) => {
    // State for main checkbox and individual items
    const [isMainChecked, setIsMainChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    // Handle main checkbox change
    const handleMainCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsMainChecked(isChecked);
        // Update all items' checked state
        const updatedItems = {};
        productList.forEach((item) => {
            updatedItems[item.node.id] = isChecked;
        });
        setCheckedItems(updatedItems);
    };

    // Handle individual checkbox change
    const handleItemCheckboxChange = (id) => (e) => {
        const isChecked = e.target.checked;
        setCheckedItems((prev) => {
            const updated = { ...prev, [id]: isChecked };
            // Update the main checkbox state if all items are checked/unchecked
            const allChecked = productList.every((item) => updated[item.node.id]);
            setIsMainChecked(allChecked);
            return updated;
        });
    };

    // Count checked items
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div>
            {/* Main Checkbox */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="checkbox"
                    id="main-checkbox"
                    checked={isMainChecked}
                    onChange={handleMainCheckboxChange}
                />
                <label htmlFor="main-checkbox">Select All</label>
            </div>

            {/* Display checked count */}
            <div style={{ marginBottom: "20px" }}>
                Checked Items: {checkedCount} / {productList.length}
            </div>

            {/* Product List */}
            {productList.map((item) => (
                <div
                    key={item.node.id}
                    style={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "400",
                        display: "flex",
                        marginTop: "10px",
                        padding: "10px 20px",
                        borderRadius: "10px",
                    }}
                >
                    <div
                        style={{
                            width: "200%",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "start",
                            gap: "10px",
                        }}
                    >
                        <CustomCheckbox
                            id={item.node.id}
                            isChecked={!!checkedItems[item.node.id]}
                            onChange={handleItemCheckboxChange(item.node.id)}
                        />

                        <label htmlFor={item.node.id} className="checkbox-label">
                            {item.node.title}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default productList;