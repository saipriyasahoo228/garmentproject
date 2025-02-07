import{r as h,j as e,S as K,ad as p,J as w,a1 as I,U as c,V as s,K as N,ar as Z,ac as J,as as Q,X as V,Y as q,Z as ee,_ as D,$ as i,a0 as te,a6 as A,a7 as S,a8 as T,a9 as u}from"./index-IJTRt1jI.js";import{d as ne,I as R}from"./dayjs.min-BeM8DKSs.js";import{a as ae}from"./auth-DxPXTuxr.js";import{C as re}from"./Container-DxWLW0oh.js";import{S as oe,P as ie}from"./Send-NCh3U_Kd.js";function me(){const[a,k]=h.useState({fullName:"",number:"",address:"",tax:"",discount:"",totalPrice:"",paymentMethod1:"Cash",paymentMethod2:"UPI",narration:""}),[d,P]=h.useState([{barcode:"",itemName:"",unit:"",unitPrice:""}]),[f,B]=h.useState(!1);h.useState(null);const U=ne().format("YYYY-MM-DD HH:mm:ss"),[E,$]=h.useState(!1),[b,Y]=h.useState([]),o=h.useRef([]),m=t=>{const{name:r,value:n}=t.target;k({...a,[r]:n},calculateTotalPrice)};h.useEffect(()=>{const t=async r=>{if(r)try{console.log("Fetching data for barcode:",r);const n=await ae.get(`api/barcode/get-barcode-details/${r}/`);console.log("API Response:",n.data);const x=n.data;if(x&&x.item_details){const{item_name:C,item_price:W}=x.item_details;P(v=>{const g=[...v];return g[0]={...g[0],itemName:C,unitPrice:W},g})}else console.error("Item details not found in the response")}catch(n){console.error("Error fetching data:",n)}};d[0].barcode&&t(d[0].barcode)},[d[0].barcode]);const z=t=>{t.preventDefault(),console.log("Form Data:",a),console.log("Items:",d)},_=()=>{alert("Notification sent!")},l=(t,r)=>{if(t.key==="Enter"){t.preventDefault();const n=r+1;n<o.current.length&&o.current[n].focus()}},y=(t,r)=>{const n=[...d];n[t][r.target.name]=r.target.value,P(n)},G=()=>{if(d.length>0){const t=d[d.length-1];t.barcode&&t.itemName&&t.unit&&t.unitPrice?(Y(r=>[...r,t]),P([{barcode:"",itemName:"",unit:"",unitPrice:""}])):alert("Please fill out all fields before adding.")}else alert("No items to add.")},H=()=>{const t=window.open("","","height=600,width=800"),r=new Date().toLocaleString(),n=parseFloat(a.unitPrice)||0,x=parseFloat(a.tax)||0,C=parseFloat(a.discount)||0,v=(parseFloat(a.unit)||0)*n,g=v*x/100,j=v+g,F=f?j*C/100:0,O=j-F,X=`
    <html>
    <head>
      <title>Retail Sale Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
        hr { border: none; border-bottom: 2px solid blue; margin: 20px 0; }/
        .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
        .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: blue; }
        .header h1 { margin: 0; font-size: 24px; }
        .section { margin-bottom: 20px; }
        .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
        .section p { margin: 5px 0; font-size: 14px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
        .table th { background-color: #f2f2f2; text-align: left; }
        .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: blue; font-size: 14px; }
        .footer p { margin: 0;}
        .flex-container { display: flex; justify-content: space-between; align-items: center; }
        .left-info { text-align: left; }
        .right-info { text-align: right; }
        .right-info p { margin: 0; }
        .pricing-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .pricing-row span {
          padding: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <h1>NAARI FASHIONS</h1>
          <h2>MARKET BUILDING UNIT-II</h2>
          <hr>
          <h2>GSTIN:21AXKPR9141G1ZD</h2>
          <br><br>
          <h4>Retail Invoice</h4>
        </div>

        <div class="section">
          <div class="flex-container">
            <div class="left-info">
              <p><strong>Full Name:</strong> ${a.fullName}</p>
              <p><strong>Number:</strong> ${a.number}</p>
            </div>
            <div class="right-info">
              <p><strong>Date:</strong> ${r}</p>
              <p><strong>Invoice Number:</strong> ${a.invoiceNumber||"N/A"}</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Item Information</h2>
          <table class="table">
            <tr>
              <th>Sl#</th>
              <th>Particulars</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${a.itemName}</td>
              <td>${a.unit}</td>
              <td>₹${j.toFixed(2)}</td> <!-- Updated to show total after tax -->
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Pricing and Tax</h2>
          <div class="pricing-row">
            <span>Total</span>
            <span>${a.unit}</span>
            <span>₹ ${j.toFixed(2)}</span>
          </div>
          <!--<div class="pricing-row">
            <span>Tax:</span>
            <span>${x}%</span>
            <span>+₹${g.toFixed(2)}</span>
          </div>-->
          ${f?`
            <div class="pricing-row">
              <span>Discount:</span>
              <span>${a.discount}%</span>
              <span>-₹${F.toFixed(2)}</span>
            </div>`:""}
          <div class="pricing-row">
            <span><strong>Net Payable:</strong></span>
            <span><strong>₹${O.toFixed(2)}</strong></span>
          </div>
        </div>

        <div class="section">
          <h2>Payment and Narration</h2>
          <p><strong>Payment Method1:</strong> ${a.paymentMethod1} ₹ ${a.paymentAmount1||0}</p>
          <p><strong>Payment Method2:</strong> ${a.paymentMethod2} ₹ ${a.paymentAmount2||0}</p>
          <p><strong>Narration:</strong> ${a.narration}</p>
        </div>
        <div class="section">
        <h6>Terms & Condition</h6>
        <hr>
        <ul>
        <li>No cash return</li>
        <li>No Exchange without Bill</li>
        <li>Exchange within 7 days</li>
        <li>No Exchange on Satureday and Sunday</li>
        <li>Exchange within 12 p.m to 4 p.m only</li>
        <li>No Colour Guarantee on any item</li>
        </ul>
        </div>

        <div class="footer">
          <p>Thank you visit again!</p>
        </div>
      </div>
    </body>
    </html>
  `;t.document.open(),t.document.write(X),t.document.close(),t.print()},L=()=>$(!0),M=()=>$(!1);return e.jsx(re,{maxWidth:"lg",sx:{backgroundColor:"#f9dff5",position:"relative"},children:e.jsxs(K,{sx:{p:3,backgroundColor:"#f9dff5"},elevation:0,children:[e.jsx(p,{variant:"h5",gutterBottom:!0,align:"center",color:"secondary",children:"Retail Sale"}),e.jsxs(p,{variant:"body2",color:"textSecondary",align:"center",children:["Sales Date & Time: ",U]}),e.jsxs(w,{sx:{position:"absolute",top:16,right:16,display:"flex",gap:1},children:[e.jsx(I,{onClick:_,sx:{color:"#370140"},children:e.jsx(oe,{})}),e.jsx(I,{onClick:H,sx:{color:"#370140"},children:e.jsx(ie,{})})]}),e.jsxs(w,{component:"form",onSubmit:z,sx:{mt:2},children:[e.jsxs(c,{container:!0,spacing:2,children:[e.jsxs(c,{item:!0,xs:12,md:3,children:[d.map((t,r)=>e.jsxs(c,{container:!0,spacing:2,style:{marginTop:"0.7px"},children:[e.jsxs(p,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:["Item Information ",r+1]}),e.jsx(s,{fullWidth:!0,label:"Barcode",name:"barcode",value:t.barcode,onChange:n=>y(r,n),margin:"normal",variant:"outlined",inputRef:n=>o.current[0]=n,onKeyDown:n=>l(n,0)}),e.jsx(s,{fullWidth:!0,label:"Item Name",name:"itemName",value:t.itemName,onChange:n=>y(r,n),margin:"normal",variant:"outlined",inputRef:n=>o.current[1]=n,onKeyDown:n=>l(n,1)}),e.jsx(s,{fullWidth:!0,label:"Unit",name:"unit",value:t.unit,onChange:n=>y(r,n),margin:"normal",variant:"outlined",inputRef:n=>o.current[2]=n,onKeyDown:n=>l(n,2)}),e.jsx(s,{fullWidth:!0,label:"Unit Price",name:"unitPrice",value:t.unitPrice,onChange:n=>y(r,n),margin:"normal",variant:"outlined",inputRef:n=>o.current[3]=n,onKeyDown:n=>l(n,3)}),r!==d.length-1&&e.jsx("hr",{style:{margin:"10px 0"}})]},r)),e.jsxs(c,{children:[e.jsx(N,{variant:"contained",color:"secondary",onClick:G,style:{marginTop:"20px",borderRadius:"50%",height:"60px",width:"60px",padding:0},children:e.jsx(Z,{style:{fontSize:"32px",fontWeight:"bold"}})}),e.jsx(N,{variant:"outlined",color:"secondary",onClick:L,style:{marginTop:"20px",marginLeft:"20px"},children:"Preview"})]})]}),e.jsx(J,{open:E,onClose:M,children:e.jsxs(w,{sx:{bgcolor:"background.paper",borderRadius:2,boxShadow:24,p:4,position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"600px",overflowY:"auto",maxHeight:"400px"},children:[e.jsxs(p,{variant:"h6",component:"h2",gutterBottom:!0,style:{color:"secondary"},children:["Preview Items",e.jsx(I,{onClick:M,style:{float:"right"},children:e.jsx(Q,{})})]}),Array.isArray(b)&&b.length===0?e.jsx(p,{variant:"body1",children:"No items added yet."}):e.jsx(V,{component:K,children:e.jsxs(q,{children:[e.jsx(ee,{children:e.jsxs(D,{children:[e.jsx(i,{style:{color:"secondary"},children:"Sl.No"}),e.jsx(i,{style:{color:"secondary"},children:"Barcode"}),e.jsx(i,{style:{color:"secondary"},children:"Item Name"}),e.jsx(i,{style:{color:"secondary"},children:"Unit"}),e.jsx(i,{style:{color:"secondary"},children:"Unit Price"}),e.jsx(i,{style:{color:"secondary"},children:"Total Item Price"})]})}),e.jsxs(te,{children:[b.map((t,r)=>e.jsxs(D,{children:[e.jsx(i,{style:{textAlign:"center",color:"secondary"},children:r+1}),e.jsx(i,{style:{textAlign:"center"},children:t.barcode}),e.jsx(i,{style:{textAlign:"center"},children:t.itemName}),e.jsx(i,{style:{textAlign:"center"},children:t.unit}),e.jsx(i,{style:{textAlign:"center"},children:t.unitPrice}),e.jsx(i,{style:{textAlign:"center"},children:Number(t.unit)*Number(t.unitPrice)})," "]},r)),e.jsxs(D,{children:[e.jsx(i,{colSpan:5,align:"right",children:e.jsx("strong",{children:"Grand Total:"})}),e.jsx(i,{style:{textAlign:"center"},children:b.reduce((t,r)=>t+Number(r.unit)*Number(r.unitPrice),0)})]})]})]})})]})}),e.jsxs(c,{item:!0,xs:12,md:3,children:[e.jsx(p,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Customer Information"}),e.jsx(s,{fullWidth:!0,label:"Full Name",name:"fullName",value:a.fullName,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>o.current[4]=t,onKeyDown:t=>l(t,4)}),e.jsx(s,{fullWidth:!0,label:"Number",name:"number",value:a.number,onChange:m,margin:"normal",type:"tel",variant:"outlined",inputRef:t=>o.current[5]=t,onKeyDown:t=>l(t,5)}),e.jsx(s,{fullWidth:!0,multiline:!0,rows:4,label:"Address",name:"address",value:a.address,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>o.current[6]=t,onKeyDown:t=>l(t,6)})]}),e.jsxs(c,{item:!0,xs:12,md:3,children:[e.jsx(p,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Pricing and Tax"}),e.jsx(s,{fullWidth:!0,label:"Tax (%)",name:"tax",value:a.tax,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>o.current[7]=t,onKeyDown:t=>l(t,7)}),e.jsxs(A,{fullWidth:!0,margin:"normal",variant:"outlined",children:[e.jsx(S,{children:"Discount Applicable"}),e.jsxs(T,{name:"isDiscountApplicable",value:f?"Yes":"No",onChange:t=>B(t.target.value==="Yes"),label:"Discount Applicable",children:[e.jsx(u,{value:"No",children:"No"}),e.jsx(u,{value:"Yes",children:"Yes"})]})]}),f&&e.jsx(s,{fullWidth:!0,label:"Discount (%)",name:"discount",value:a.discount,onChange:m,margin:"normal",type:"number",variant:"outlined",inputRef:t=>o.current[8]=t,onKeyDown:t=>l(t,8)}),e.jsx(s,{fullWidth:!0,label:"Total Price",name:"totalPrice",value:a.totalPrice,margin:"normal",InputProps:{readOnly:!0,startAdornment:e.jsx(R,{position:"start",children:"₹"})},variant:"outlined",inputRef:t=>o.current[9]=t,onKeyDown:t=>l(t,9)})]}),e.jsxs(c,{item:!0,xs:12,md:3,children:[e.jsx(p,{variant:"subtitle1",gutterBottom:!0,color:"textPrimary",children:"Payment and Narration"}),e.jsxs(c,{container:!0,spacing:2,children:[e.jsx(c,{item:!0,xs:6,children:e.jsxs(A,{fullWidth:!0,margin:"normal",variant:"outlined",children:[e.jsx(S,{children:"Payment Method 1"}),e.jsxs(T,{name:"paymentMethod1",value:a.paymentMethod1,onChange:m,label:"Payment Method 1",children:[e.jsx(u,{value:"Cash",children:"Cash"}),e.jsx(u,{value:"Credit Card",children:"Credit Card"}),e.jsx(u,{value:"Debit Card",children:"Debit Card"}),e.jsx(u,{value:"UPI",children:"UPI"})]})]})}),e.jsx(c,{item:!0,xs:6,children:e.jsx(s,{fullWidth:!0,label:"Payment Amount 1",name:"amount1",value:a.amount1,margin:"normal",InputProps:{startAdornment:e.jsx(R,{position:"start",children:"₹"})},variant:"outlined",inputRef:t=>o.current[10]=t,onKeyDown:t=>l(t,10)})}),e.jsx(c,{item:!0,xs:6,children:e.jsxs(A,{fullWidth:!0,margin:"normal",variant:"outlined",children:[e.jsx(S,{children:"Payment Method 2"}),e.jsxs(T,{name:"paymentMethod2",value:a.paymentMethod2,onChange:m,label:"Payment Method 2",children:[e.jsx(u,{value:"Cash",children:"Cash"}),e.jsx(u,{value:"Credit Card",children:"Credit Card"}),e.jsx(u,{value:"Debit Card",children:"Debit Card"}),e.jsx(u,{value:"UPI",children:"UPI"})]})]})}),e.jsx(c,{item:!0,xs:6,children:e.jsx(s,{fullWidth:!0,label:"Payment Amount 2",name:"amount2",value:a.amount2,margin:"normal",InputProps:{startAdornment:e.jsx(R,{position:"start",children:"₹"})},variant:"outlined",inputRef:t=>o.current[11]=t,onKeyDown:t=>l(t,11)})})]}),e.jsx(s,{fullWidth:!0,multiline:!0,rows:4,label:"Narration",name:"narration",value:a.narration,onChange:m,margin:"normal",variant:"outlined",inputRef:t=>o.current[12]=t,onKeyDown:t=>l(t,12)})]})]}),e.jsx(N,{type:"submit",variant:"contained",color:"secondary",fullWidth:!0,sx:{mt:2},children:"Submit"})]})]})})}export{me as default};
