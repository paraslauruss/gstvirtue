
import {
    Page,
    Text,
    Card,
    Divider,
} from "@shopify/polaris";
import { useState , useEffect} from 'react';
import 'react-month-picker-input/dist/react-month-picker-input.css';

export default function B2CSales() {
  
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
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </select> 
                </div>
                {/* download  */}
                <div style={{ backgroundColor: '#74A535', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" fill="white" />
                    </svg>
                </div>
            </div>

            <div className="report-builder-table gst-credit-table loaded-data" style={{paddingTop:'30px' }}>
                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <div className="tablesaw-table">
                    <table
                        className="tablesaw no-wrap table-hover table"
                        data-tablesaw-mode="stack"
                        style={{ width: '100%', borderCollapse: 'collapse',}}>   
                        <thead style={{border:'1px solid #ccc', borderRadius:'15px', 
                            backgroundColor:'#ccc' ,padding:'12px',fontSize:'12px',fontFamily:'Inter'}}>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Report Type</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Month-Year of Orders</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Generated Date</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{ padding: '10px' }}>B2C</td>
                            <td style={{ padding: '10px' }}>March-2025</td>
                            <td style={{ padding: '10px' }}>21-03-2025</td>
                            <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                            <a title="Download Report" style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000"
                                width="20px"
                                height="20px"
                                viewBox="0 -1.5 35 35"
                                version="1.1"
                             >
                                <path d="M29.426 15.535c0 0 0.648-8.743-7.361-9.74-6.866-0.701-8.955 5.679-8.955 5.679s-2.067-1.988-4.873-0.364c-2.51 1.55-2.067 4.388-2.067 4.388s-5.576 1.083-5.576 6.768c0.125 5.677 6.055 5.734 6.055 5.734h11.351l-5-5h3v-6h4v6h3l-5 5h10.467c0 0 5.52 0.006 6.295-5.395 0.369-5.906-5.336-7.070-5.336-7.070z"></path>
                                </svg>
                            </a>
                            <button
                                onClick={() => handleDelete(3972, 'paras2806.myshopify.com')}
                                title="Delete Report"
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'inline-flex',
                                alignItems: 'center',
                                }}
                            >
                                <svg
                                viewBox="0 0 20 20"
                                style={{ width: '20px', height: '20px', fill: '#000' }}
                                >
                                <path d="M8 3.994c0-1.101.895-1.994 2-1.994s2 .893 2 1.994h4c.552 0 1 .446 1 .997a1 1 0 0 1-1 .997h-12c-.552 0-1-.447-1-.997s.448-.997 1-.997h4zm-3 10.514v-6.508h2v6.508a.5.5 0 0 0 .5.498h1.5v-7.006h2v7.006h1.5a.5.5 0 0 0 .5-.498v-6.508h2v6.508a2.496 2.496 0 0 1-2.5 2.492h-5c-1.38 0-2.5-1.116-2.5-2.492z"></path>
                                </svg>
                            </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>

            {/* <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50px', marginBottom:'50px' }}>
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
            </div> */}
        </div>
    );
}