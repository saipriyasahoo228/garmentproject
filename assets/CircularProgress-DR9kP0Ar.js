import{an as R,am as w,aF as P,aG as S,ao as v,ap as n,aq as $,at as j,r as F,au as N,j as f,aw as U,ax as E}from"./index-Dy87SfDR.js";function I(e){return R("MuiCircularProgress",e)}w("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const a=44,g=P`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,h=P`
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
      `:null,A=typeof h!="string"?S`
        animation: ${h} 1.4s ease-in-out infinite;
      `:null,G=e=>{const{classes:r,variant:s,color:t,disableShrink:c}=e,l={root:["root",s,`color${n(t)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,c&&"circleDisableShrink"]};return E(l,I,r)},K=v("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})($(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:z||{animation:`${g} 1.4s linear infinite`}},...Object.entries(e.palette).filter(j()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),V=v("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),q=v("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})($(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:A||{animation:`${h} 1.4s ease-in-out infinite`}}]}))),O=F.forwardRef(function(r,s){const t=N({props:r,name:"MuiCircularProgress"}),{className:c,color:l="primary",disableShrink:b=!1,size:p=40,style:D,thickness:i=3.6,value:m=0,variant:y="indeterminate",...M}=t,o={...t,color:l,disableShrink:b,size:p,thickness:i,value:m,variant:y},u=G(o),d={},k={},x={};if(y==="determinate"){const C=2*Math.PI*((a-i)/2);d.strokeDasharray=C.toFixed(3),x["aria-valuenow"]=Math.round(m),d.strokeDashoffset=`${((100-m)/100*C).toFixed(3)}px`,k.transform="rotate(-90deg)"}return f.jsx(K,{className:U(u.root,c),style:{width:p,height:p,...k,...D},ownerState:o,ref:s,role:"progressbar",...x,...M,children:f.jsx(V,{className:u.svg,ownerState:o,viewBox:`${a/2} ${a/2} ${a} ${a}`,children:f.jsx(q,{className:u.circle,style:d,ownerState:o,cx:a,cy:a,r:(a-i)/2,fill:"none",strokeWidth:i})})})});export{O as C};
