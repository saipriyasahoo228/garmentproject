import{al as R,ak as j,aD as P,aE as S,am as h,an as n,ao as $,ar as w,r as E,as as N,j as f,au as U,av as F}from"./index-v4F5H99w.js";function I(e){return R("MuiCircularProgress",e)}j("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const a=44,g=P`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,v=P`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,z=typeof g!="string"?S`
        animation: ${g} 1.4s linear infinite;
      `:null,A=typeof v!="string"?S`
        animation: ${v} 1.4s ease-in-out infinite;
      `:null,K=e=>{const{classes:r,variant:s,color:t,disableShrink:l}=e,c={root:["root",s,`color${n(t)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,l&&"circleDisableShrink"]};return F(c,I,r)},V=h("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})($(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:z||{animation:`${g} 1.4s linear infinite`}},...Object.entries(e.palette).filter(w()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),B=h("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),G=h("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})($(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:A||{animation:`${v} 1.4s ease-in-out infinite`}}]}))),T=E.forwardRef(function(r,s){const t=N({props:r,name:"MuiCircularProgress"}),{className:l,color:c="primary",disableShrink:b=!1,size:p=40,style:D,thickness:i=3.6,value:m=0,variant:y="indeterminate",...M}=t,o={...t,color:c,disableShrink:b,size:p,thickness:i,value:m,variant:y},u=K(o),d={},k={},x={};if(y==="determinate"){const C=2*Math.PI*((a-i)/2);d.strokeDasharray=C.toFixed(3),x["aria-valuenow"]=Math.round(m),d.strokeDashoffset=`${((100-m)/100*C).toFixed(3)}px`,k.transform="rotate(-90deg)"}return f.jsx(V,{className:U(u.root,l),style:{width:p,height:p,...k,...D},ownerState:o,ref:s,role:"progressbar",...x,...M,children:f.jsx(B,{className:u.svg,ownerState:o,viewBox:`${a/2} ${a/2} ${a} ${a}`,children:f.jsx(G,{className:u.circle,style:d,ownerState:o,cx:a,cy:a,r:(a-i)/2,fill:"none",strokeWidth:i})})})});export{T as C};
