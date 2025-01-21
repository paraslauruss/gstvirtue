import React from 'react';

const CustomCheckbox = ({ id, isChecked, onChange }) => {
  return (
    <label style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        style={{
          opacity: 0,
          position: 'absolute',
          cursor: 'pointer',
          height: 0,
          width: 0,
        }}
      />
      <span
        style={{
          display: 'inline-block',
          width: '20px',
          height: '20px',
          border: isChecked ? '1px solid #467a30' : '1px solid #ccc', // Conditional border color
          borderRadius: '4px',
          backgroundColor: isChecked ? '#fff' : '#fff', // Conditional background color
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#000', // Tick color
            fontSize: '14px',
            opacity: isChecked ? 1 : 0, // Show tick when checked
            transition: 'opacity 0.2s ease',
          }}
        >
          ✓
        </span>
      </span>
    </label>
  );
};

export default CustomCheckbox;
