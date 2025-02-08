import{r as a,j as e,S as c,U as m,ah as T,ai as b,ab as M,ac as W,ad as z,ae as R,_ as h,a0 as V,Y as X,a1 as Z,a2 as ee,a3 as $,a4 as n,a5 as te,aj as ae}from"./index-P1VgnqGH.js";import{a as x}from"./auth-DxPXTuxr.js";import{A as se}from"./Alert-BvDnXmoK.js";function de(){const[ne,A]=a.useState(""),[re,F]=a.useState({}),[d,S]=a.useState(""),[u,v]=a.useState(""),[p,w]=a.useState(""),[g,y]=a.useState(""),[i,C]=a.useState(""),[j,_]=a.useState(""),[I,k]=a.useState([]),[E,l]=a.useState(""),[D,f]=a.useState(!1),[L,q]=a.useState([]),[Q,H]=a.useState([]),[ie,P]=a.useState(!0),[r,B]=a.useState([]),[O,N]=a.useState(!1);a.useEffect(()=>{x.get("api/barcode/code/").then(t=>{k(t.data.barcodes||[])}).catch(t=>{console.error("Error fetching stock entries:",t)}),x.get("api/user/categories/").then(t=>{q(t.data),P(!1)}).catch(t=>{console.error("Error fetching categories:",t),P(!1)})},[]),a.useEffect(()=>{i&&x.get(`api/user/subcategories/${i}`).then(t=>H(t.data)).catch(t=>console.error("Error fetching items:",t))},[i]);const U=(t,s)=>{t.target.checked?B([...r,s]):B(r.filter(o=>o.id!==s.id))},Y=()=>{if(r.length===0){l("No items selected for preview.");return}l(""),N(!0)},G=()=>{if(!d||!j||!u||!p||!i){l("Please fill in all fields.");return}const t={item_name:j,quantity:d?parseInt(d,10):null,item_price:g?parseFloat(g):null,item_size:u,shop_name:p,category_name:i};x.post("api/barcode/code/",t).then(s=>{k([...I,s.data]),J()}).catch(s=>console.error("Error adding stock entry:",s))},J=()=>{A(""),F({}),S(""),v(""),w(""),y(""),C(""),_(""),l(""),f(!1)},K=()=>{if(r.length===0){l("Please select items to print.");return}const t=`
      <html>
        <head>
          <title>Barcode Print</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .barcode { margin: 10px 0; }
            .barcode img { width: 200px; height: auto; }
            .item-name { font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Barcode Preview</h1>
          ${r.map(o=>`
              <div class="barcode">
                <div class="item-name">${o.item_name}</div>
                <img src="data:image/png;base64,${o.barcode_image_base64}" alt="Barcode">
              </div>
            `).join("")}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          <\/script>
        </body>
      </html>
    `,s=window.open("","_blank","width=800,height=600");s.document.open(),s.document.write(t),s.document.close()};return e.jsxs("div",{children:[e.jsxs(c,{sx:{padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(m,{onClick:()=>f(!0),variant:"contained",color:"secondary",sx:{marginRight:"10px"},children:"Add Barcode"}),e.jsxs(c,{children:[e.jsx(m,{onClick:Y,variant:"contained",color:"primary",sx:{marginRight:"10px"},children:"Preview"}),e.jsx(m,{onClick:K,variant:"contained",color:"secondary",children:"Print"})]}),E&&e.jsx(se,{severity:"error",sx:{marginTop:"10px"},children:E})]}),e.jsx(T,{open:D,onClose:()=>f(!1),children:e.jsxs(c,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:700,bgcolor:"#f9dff5",border:"2px solid #000",boxShadow:24,p:4},children:[e.jsx(b,{variant:"h6",children:"Enter Stock Details"}),e.jsxs(M,{fullWidth:!0,margin:"normal",children:[e.jsx(W,{children:"Category"}),e.jsx(z,{value:i,onChange:t=>C(t.target.value),children:L.map(t=>e.jsx(R,{value:t.category_name,children:t.category_name},t.id))})]}),e.jsxs(M,{fullWidth:!0,margin:"normal",children:[e.jsx(W,{children:"Item Name"}),e.jsx(z,{value:j,onChange:t=>_(t.target.value),children:Q.map(t=>e.jsx(R,{value:t.name,children:t.name},t.id))})]}),e.jsx(h,{label:"Quantity",type:"number",value:d,onChange:t=>S(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(h,{label:"Item Price",value:g,onChange:t=>y(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(h,{label:"Item Size",value:u,onChange:t=>v(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(h,{label:"Shop Name",value:p,onChange:t=>w(t.target.value),margin:"normal",fullWidth:!0}),e.jsx(m,{onClick:G,variant:"contained",color:"secondary",sx:{mt:2},children:"Save"})]})}),e.jsx(T,{open:O,onClose:()=>N(!1),children:e.jsxs(c,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:600,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},children:[e.jsx(b,{variant:"h6",sx:{marginBottom:"20px"},children:"Barcode Preview"}),r.map((t,s)=>e.jsxs(c,{sx:{display:"flex",alignItems:"center",marginBottom:"10px"},children:[e.jsx("img",{src:`data:image/png;base64,${t.barcode_image_base64}`,alt:"Barcode",style:{width:"200px",marginRight:"10px"}}),e.jsx(b,{children:t.item_name})]},s))]})}),e.jsx(V,{component:X,sx:{marginTop:"20px"},children:e.jsxs(Z,{children:[e.jsx(ee,{children:e.jsxs($,{children:[e.jsx(n,{children:"Select"}),e.jsx(n,{children:"SL. No"}),e.jsx(n,{children:"Barcode"}),e.jsx(n,{children:"Item Name"}),e.jsx(n,{children:"Item Size"}),e.jsx(n,{children:"Shop Name"}),e.jsx(n,{children:"Category Name"})]})}),e.jsx(te,{children:I.map((t,s)=>e.jsxs($,{children:[e.jsx(n,{children:e.jsx(ae,{onChange:o=>U(o,t),checked:r.includes(t)})}),e.jsx(n,{children:s+1}),e.jsx(n,{children:t.serial_number}),e.jsx(n,{children:t.item_name}),e.jsx(n,{children:t.item_size}),e.jsx(n,{children:t.shop_name}),e.jsx(n,{children:t.category_name})]},t.id))})]})})]})}export{de as default};
