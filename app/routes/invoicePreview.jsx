


export default function InvoicePreview() {

    const [emailSettings, setEmailSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchEmailSettings = async () => {
    //         setLoading(true);
    //         setError(null);

    //         try {
    //             const response = await fetch(
    //                 `http://localhost:3001/api/html/standard`,
    //                 {
    //                     method: "GET",

    //                 }
    //             );

    //             if (!response.ok) {
    //                 throw new Error(`Error fetching data: ${response.statusText}`);
    //             }

    //             const data = await response.json();
    //             setEmailSettings(data);


    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };


    //     fetchEmailSettings();

    // }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {emailSettings && (
                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        marginTop: "20px",
                    }}
                >
                    <h1>Invoice Preview</h1>
                    <p>Your invoice preview is displayed below: {file}</p>
                    <div dangerouslySetInnerHTML={{ __html: "<h1><b>Paras Virani</b></h1>" }} />
                </div>
            )}

        </>

    );
}