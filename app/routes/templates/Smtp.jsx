import React from "react";
import ic_info from "../../assets/images/ic_info.png";
import { useState } from "react";


export const Smtp = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [fromName, setFromName] = useState('');
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('');
  const [smtpSecurity, setSmtpSecurity] = useState('none');
  const [smtpUser, setSmtpUser] = useState(''); // New state for username
  const [smtpPassword, setSmtpPassword] = useState(''); // New state for password
  const [testResult, setTestResult] = useState(null);


  const handleTestConfiguration = async () => {
    // Basic validation
    if (!fromEmail || !fromName) {
      setTestResult('error');
      alert('Please fill in From Email and From Name.');
      return;
    }
  
    if (!smtpHost) {
      setTestResult('error');
      alert('Please fill in the SMTP Host field.');
      return;
    }

    if (!smtpUser || !smtpPassword) {
      setTestResult('error');
      alert('Please fill in the SMTP Username and Password.');
      return;
    }
  
    if (!smtpPort) {
        setTestResult('error');
        alert('Please fill in the SMTP Port.');
        return;
    }
  
    const portNumber = parseInt(smtpPort, 10); // Convert to number for validation
  
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      setTestResult('error');
      alert('Please enter a valid SMTP Port number (1-65535).');
      return;
    }
  
    try {
      // Make the API call to your backend
      const response = await fetch('http://localhost:3001/api/test-smtp', { // Update with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromEmail,
          fromName,
          smtpHost: smtpHost,
          smtpSecurity,
          smtpUser,
          smtpPassword,
          smtpPort: portNumber // Send the parsed number to the backend
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setTestResult('error');    
       }
  
      const data = await response.json();
  
      if (data.success) {
        setTestResult('success');
      } else {
        setTestResult('error');
      }
    } catch (error) {
      console.error('Error during test:', error);
      setTestResult('error');
    }
  };

  const handleSave = () => {
    alert('saved')
  }

  return (
    <div style={{margin: "0",padding: "0",display: "flex",alignItems: "center",justifyContent: "center",height: "100%",backgroundColor: "#FDFDFD",}}>
      <div style={{width: "70%", maxWidth: "1200px",borderRadius: "8px",padding: "20px",}}>
        <div style={{ display: "flex",justifyContent: "space-between", gap: "8px", marginBottom: "10px",}}>
          <div>
            <h1 style={{fontFamily: "Inter",fontWeight: "600", fontSize: "18px",color: "black", marginTop: "40px",}}>
              SMTP Configuration
            </h1>
          </div>
          <button
            onClick={handleSave}
            style={{
              width: "90px",
              height: "40px",
              color: "white",
              backgroundColor: "#5c8e29",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              alignItems: "center",
              cursor: "pointer",
              padding: "5px",
              marginTop: "20px",
            }}>
            Save
          </button>
        </div>
        <div style={{
            marginTop: "14px",
            backgroundColor: "#E2E2E2",
            border: "1px solid #ccc",
            borderRadius: "3px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
          }}>
          <img
            src={ic_info}
            alt="Warning"
            style={{ width: "15px", height: "15px", marginRight: "10px" }}/>
          <span>
            Steps for{" "}
            <strong>
              <u>Gmail SMTP Server</u>
            </strong>
          </span>
        </div>
      {/* First box  */}
        <div style={{border: "1px solid #ccc", borderRadius: "10px",marginTop: "30px", padding: "12px",}}>
          <div>
            <h1 style={{
                fontSize: "17px",
                fontFamily: "Inter",
                fontWeight: "600",
                color: "black",
                marginLeft: "14px",
                borderBottom: "1px solid #E2E2E2",
                paddingBottom: "20px",
              }}>
              Common Configurations
            </h1>
          </div>

          <div style={{
              display: "flex",
              marginTop: "30px",
              paddingLeft: "12px",
              gap: "20px", // Adjusted gap for better
              marginBottom: "20px",
            }}>
            <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <h1 style={{fontSize: "14px",marginBottom: "8px",fontWeight: "500",}}>
                  From Email
                </h1>
              <input
                type="email"
                placeholder="Type here"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                style={{
                  width: "100%", // Makes the input stretch to fit the parent
                  height: "33px",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #E2E2E2",
                  borderRadius: "2px",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <h1 style={{fontSize: "14px",marginBottom: "8px",fontWeight: "500",}}>
                From Name
              </h1>
              <input
                type="text"
                placeholder="Type here"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                style={{
                  width: "100%", // Makes the input stretch to fit the parent
                  height: "33px",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #E2E2E2",
                  borderRadius: "2px",
                }}
              />
            </label>
          </div>
        </div>
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginTop: "30px",
            padding: "12px",
          }}>
          <div style={{
              marginTop: "10px",
              fontSize: "17px",
              fontFamily: "Inter",
              fontWeight: "600",
              color: "black",
              marginLeft: "14px",
              borderBottom: "1px solid #E2E2E2",
              paddingBottom: "20px",
            }}
          >
            <h1>SMTP Configurations</h1>
          </div>

          <div style={{maxWidth: "100%", marginLeft: "18px",marginTop: "20px",}}>
            <div style={{display: "flex",gap: "10px", }}> 
            <div style={{display: "flex",gap: "10px", marginTop:"20px"}}>
              <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "185px",
                    }}>
                    <h1 style={{fontSize: "14px",fontFamily: "Inter",fontWeight: "600", marginBottom: "8px", }}>
                      SMTP Host
                    </h1>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={smtpHost}
                       onChange={(e) => setSmtpHost(e.target.value)}
                      style={{
                        height: "33px",
                        border: "1px solid #E2E2E2",
                        borderRadius: "4px",
                        padding: "0 8px", // Adds padding inside the input
                        fontSize: "14px",
                      }}
                    />
                  </label>
                <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "185px",
                    }}>
                    <h1 style={{fontSize: "14px",fontFamily: "Inter",fontWeight: "600", marginBottom: "8px", }}>
                      SMTP Username
                    </h1>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      style={{
                        height: "33px",
                        border: "1px solid #E2E2E2",
                        borderRadius: "4px",
                        padding: "0 8px", // Adds padding inside the input
                        fontSize: "14px",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "185px",
                    }}>
                    <h1 style={{fontSize: "14px",fontFamily: "Inter",fontWeight: "600", marginBottom: "8px", }}>
                      SMTP Password
                    </h1>
                    <input
                      type="password" // Use type="password" for sensitive info
                      placeholder="Type here"
                      value={smtpPassword}
                      onChange={(e) => setSmtpPassword(e.target.value)}
                      style={{
                        height: "33px",
                        border: "1px solid #E2E2E2",
                        borderRadius: "4px",
                        padding: "0 8px", // Adds padding inside the input
                        fontSize: "14px",
                      }}
                      />
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "185px",
                    }}>
                    <h1 style={{fontSize: "14px",fontFamily: "Inter",fontWeight: "600", marginBottom: "8px", }}>
                      SMTP Port
                    </h1>
                    <input
                      type="password" // Use type="password" for sensitive info
                      placeholder="Type here"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                        style={{
                        height: "33px",
                        border: "1px solid #E2E2E2",
                        borderRadius: "4px",
                        padding: "0 8px", // Adds padding inside the input
                        fontSize: "14px",
                      }}
                      />
                  </label>
            </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "30px", alignItems: "center", marginLeft: "18px",}} >
            <h1 style={{fontSize: "14px", fontFamily: "Inter", fontWeight: "600", marginRight: "16px",  }}>
              SMTP Security
            </h1>
            <div style={{ display: "flex",alignItems: "center",gap: "12px", }}>
              <label style={{ display: "flex", alignItems: "center", gap: "4px" }} >
                <input
                  type="radio"
                  name="smtp-security"
                  value="none"
                  checked={smtpSecurity === 'none'}
                  onChange={() => setSmtpSecurity('none')}
                  style={{ accentColor: "#74A535" }}
                />
                <span style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  None
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input
                  type="radio"
                  name="smtp-security"
                  value="tls"
                  checked={smtpSecurity === 'tls'}
                  onChange={() => setSmtpSecurity('tls')}
                  style={{ accentColor: "#74A535" }}/>
                <span style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  TLS
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input
                  type="radio"
                  name="smtp-security"
                  value="ssl"
                  checked={smtpSecurity === 'ssl'}
                  onChange={() => setSmtpSecurity('ssl')}
                  style={{ accentColor: "#74A535" }}/>
                <span style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  SSL
                </span>
              </label>
            </div>
          </div>
            <button
            onClick={handleTestConfiguration}
              style={{
                marginLeft: "18px",
                marginTop: "20px",
                padding: "6px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: "#fff",
                fontSize: "14px",
                fontFamily: "Inter",
                cursor: "pointer",
                color: "#828282",
                width: "25%",
              }}>
              Test Configuration
            </button>
            {testResult === 'success' && (
                    <div style={{ color: 'green', marginTop: '10px', marginLeft: '18px', fontSize:'14px', fontFamily:'Inter'}}>
                        Test successful!
                    </div>
                )}
                {testResult === 'error' && (
                    <div style={{ color: 'red', marginTop: '10px', marginLeft: '18px',fontSize:'14px', fontFamily:'Inter' }}>
                        Test failed.  Please check your settings and try again.
                    </div>
                )}
          </div>
        <div>

          <div style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "500",
              marginBottom: "50px",
              color: "#707070",
            }}>
            <p>@2024 Virtue. All Rights Reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
};
