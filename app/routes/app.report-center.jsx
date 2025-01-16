import { Card, Divider, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import OrderReport from "./report/order_report";
import { useCallback, useState } from "react";
import OfflineInvoiceOrder from "./report/offline_invoice_order";
import CreditNoteReport from "./report/credit_note_report";
import OrderReportTemplate from "./report/order_report_template";
import CreditNoteReportTemplate from "./report/credit_note_report_template";
import B2BSales from "./report/b2b_sales";
import B2CSales from "./report/b2c_sales";
import HSNSACSummary from "./report/hsn_sac_summary";
import DucumentSummary from "./report/document_summary";
import PurchaseReport from "./report/purchase_report";
import ExprenseReport from "./report/exprense_report";
import HSNSACSummaryPurchase from "./report/hsn_sac_summary_purchase";
import SupplySummary from "./report/supply_summary";
import EligibleITC from "./report/eligible_itc";
import GSTR1 from "./report/gstr_1";


export default function ReportCenter() {
    const navigate = useNavigate();
    const handleCreateNewClick = () => {
        navigate("/app/report/order_report");
        // <Link to="/app/report-center">Report Center</Link>
    };

    const [page, setPage] = useState('report-center');

    return (
        <>
            {page == "order-report" && <OrderReport onClick={() => setPage('report-center')} />}
            {page == "offline-invoice-order" && <OfflineInvoiceOrder onClick={() => setPage('report-center')} />}
            {page == "credit-note-report" && <CreditNoteReport onClick={() => setPage('report-center')} />}
            {page == "order-report-template" && <OrderReportTemplate onClick={() => setPage('report-center')} />}
            {page == "credit-note-report-template" && <CreditNoteReportTemplate onClick={() => setPage('report-center')} />}
            {page == "b2b-sales" && <GSTR1 onClick={() => setPage('report-center')} position={0} />}
            {page == "b2c-sales" && <GSTR1 onClick={() => setPage('report-center')} position={1} />}
            {page == "hsn-sac-summary-sales" && <GSTR1 onClick={() => setPage('report-center')} position={2}/>}
            {page == "documents-summary" && <GSTR1 onClick={() => setPage('report-center')} position={3} />}
            {page == "purchase-report" && <PurchaseReport onClick={() => setPage('report-center')} />}
            {page == "expense-report" && <ExprenseReport onClick={() => setPage('report-center')} />}
            {page == "hsn-sac-summary-purchase" && <HSNSACSummaryPurchase onClick={() => setPage('report-center')} />}
            {page == "supply-summary" && <SupplySummary onClick={() => setPage('report-center')} />}
            {page == "eligible-itc" && <EligibleITC onClick={() => setPage('report-center')} />}

            {page == "report-center" && <div style={{ backgroundColor: 'white', padding: '50px 100px' }}>
                <Text variant="headingLg">Report Center</Text>
                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingMd">General</Text>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Divider />
                        </div>

                        <div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('order-report')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Order Reports</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('offline-invoice-order')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Offline Invoice Report</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('credit-note-report')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Credit Note Report</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%' }}>

                                </div>
                            </div>

                        </div>

                    </Card>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingMd">Templates</Text>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Divider />
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('order-report-template')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Order Report Template</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('credit-note-report-template')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Credit Note Report Template</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingMd">GSTR-1</Text>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Divider />
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('b2b-sales')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">B2B Sales</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('b2c-sales')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">B2C Sales</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('hsn-sac-summary-sales')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">HSN/SAC Summary (Sales)</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('documents-summary')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Documents Summary</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingMd">GSTR-2</Text>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Divider />
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('purchase-report')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Purchase Report</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('expense-report')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Expense Report</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('hsn-sac-summary-purchase')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">HSN/SAC Summary (Purchase)</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', }}>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <Text variant="headingMd">GSTR-3B</Text>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Divider />
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('supply-summary')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Supply Summary</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => setPage('eligible-itc')}>
                                    <Card>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="headingSm">Eligible ITC</Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
                                                <path d="M1 0.999999L8 8.5L1 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>}
        </>
    );
}