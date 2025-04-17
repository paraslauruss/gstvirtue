
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { useState, useEffect } from "react";
import icEmpty from '../../assets/images/ic_empty.png'
import 'react-month-picker-input/dist/react-month-picker-input.css';


export default function B2BSales() {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');

    const generateOptions = () => {
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11
        const currentYear = now.getFullYear();
        const showNextMonth = now.getDate() >= 15;

        const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const start = new Date(currentYear - 2, currentMonth); // One year back, same month
        const end = showNextMonth
        ? new Date(currentYear, currentMonth + 2) // include next month
        : new Date(currentYear, currentMonth + 1); // up to current month

        const result = [];
        let date = new Date(start);

        while (date < end) {
        const label = `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
        result.unshift(label); // reverse order
        date.setMonth(date.getMonth() + 1);
        }

        setOptions(result);
    };

    useEffect(() => {
        generateOptions();

        const interval = setInterval(() => {
        generateOptions();
        }, 1000 * 60 * 60 * 24); // Recheck every 24 hours

        return () => clearInterval(interval);
    }, []);

    const handleDelete = (reportId, shopDomain) => {
        // Replace with actual delete logic
        console.log(`Deleting report ${reportId} for ${shopDomain}`);
      };
        

    return (
        <div>
           <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <select 
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      style={{ padding: '10px', width: '290px', fontSize: '14px' }}
                    >
                        <option value="">Select month</option>
                            {options.map((option, idx) => (
                             <option key={idx} value={option}>{option}
                        </option>
                        ))}
                    </select>
                </div>
                {/* download */}
                <div style={{ backgroundColor: '#74A535', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" fill="white" />
                    </svg>
                </div>
            </div>

            <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50px', marginBottom:'50px' }}>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <img src={icEmpty} width={200} />
                </div>
                <div style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Text variant="headingLg">No Data Found</Text>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Text variant="headingMd">You can find orders by changing your search or filtering options</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}