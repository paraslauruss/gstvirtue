

const CustomBadge = ({ status }) => {
    const backgroundColor = status === "PAID" ? "#EDF7DF" : "#F7DFDF";
    const textColor = status === "PAID" ? "#1A662A" : "#A80000"; // Optional: Dynamic text color

    return (
        <span
            style={{
                display: "inline-block",
                padding: "4px 8px",
                borderRadius: "12px",
                backgroundColor,
                color: textColor,
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
                minWidth: "60px",
            }}
        >
            {status === "PAID" ? "Paid" : "Unpaid"}
        </span>
    );
};

export default CustomBadge;