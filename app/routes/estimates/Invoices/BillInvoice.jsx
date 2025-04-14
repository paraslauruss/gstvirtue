import React from 'react'

export default function BillInvoice() {
  return (
    <div id='invoice' style={{fontFamily:'Inter',fontWeight:'normal'}}>
      <div class='card' style={{position:'relative',display:'flex',flexDirection:'column',backgroundClip:'border-box',backgroundColor:'#fff'}}>
        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td align='left' valign='top' width="35%"
              style={{
                borderTop:'1px solid #444444',
                borderLeft:'1px solid #444444',
                padding:'15px 0px 0px 19px'
              }}>   
                <h2>&nbsp;
                  <span id='template_invoice_title' style={{ontSize:'30px',fontFamily:'Inter',fontWeight:'700'}}>
                    Bill
                  </span>
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
