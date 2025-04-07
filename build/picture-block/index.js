(()=>{"use strict";var e,l={654:(e,l,o)=>{const r=window.wp.blocks,a=window.wp.blockEditor,d=window.wp.components,t=window.wp.i18n,n=window.wp.element,s=window.wp.apiFetch;var i=o.n(s);const u=[{label:"Select a Border",value:""},{label:"No Border",value:"border-0"},{label:"Top Border",value:"border-top"},{label:"No Top Border",value:"border-top-0"},{label:"End Border",value:"border-end"},{label:"No End Border",value:"border-end-0"},{label:"Bottom Border",value:"border-bottom"},{label:"No Bottom Border",value:"border-bottom-0"},{label:"Start Border",value:"border-start"},{label:"No Start Border",value:"border-start-0"},{label:"Primary Border Color",value:"border-primary"},{label:"Secondary Border Color",value:"border-secondary"},{label:"Success Border Color",value:"border-success"},{label:"Danger Border Color",value:"border-danger"},{label:"Warning Border Color",value:"border-warning"},{label:"Info Border Color",value:"border-info"},{label:"Light Border Color",value:"border-light"},{label:"Dark Border Color",value:"border-dark"},{label:"White Border Color",value:"border-white"},{label:"Border Width 1",value:"border-1"},{label:"Border Width 2",value:"border-2"},{label:"Border Width 3",value:"border-3"},{label:"Border Width 4",value:"border-4"},{label:"Border Width 5",value:"border-5"},{label:"Top Border Width 1",value:"border-top-1"},{label:"Top Border Width 2",value:"border-top-2"},{label:"Top Border Width 3",value:"border-top-3"},{label:"Top Border Width 4",value:"border-top-4"},{label:"Top Border Width 5",value:"border-top-5"},{label:"End Border Width 1",value:"border-end-1"},{label:"End Border Width 2",value:"border-end-2"},{label:"End Border Width 3",value:"border-end-3"},{label:"End Border Width 4",value:"border-end-4"},{label:"End Border Width 5",value:"border-end-5"},{label:"Bottom Border Width 1",value:"border-bottom-1"},{label:"Bottom Border Width 2",value:"border-bottom-2"},{label:"Bottom Border Width 3",value:"border-bottom-3"},{label:"Bottom Border Width 4",value:"border-bottom-4"},{label:"Bottom Border Width 5",value:"border-bottom-5"},{label:"Start Border Width 1",value:"border-start-1"},{label:"Start Border Width 2",value:"border-start-2"},{label:"Start Border Width 3",value:"border-start-3"},{label:"Start Border Width 4",value:"border-start-4"},{label:"Start Border Width 5",value:"border-start-5"}],b=[{label:"Select a Rounded Class",value:""},{label:"No Rounding",value:"rounded-0"},{label:"Small Rounding",value:"rounded-1"},{label:"Medium Rounding",value:"rounded-2"},{label:"Large Rounding",value:"rounded-3"},{label:"Extra Large Rounding",value:"rounded-4"},{label:"Maximum Rounding",value:"rounded-5"},{label:"Circular Rounding",value:"rounded-circle"},{label:"Pill Rounding",value:"rounded-pill"},{label:"Round Top",value:"rounded-top"},{label:"Round End",value:"rounded-end"},{label:"Round Bottom",value:"rounded-bottom"},{label:"Round Start",value:"rounded-start"},{label:"No Top Rounding",value:"rounded-top-0"},{label:"Small Top Rounding",value:"rounded-top-1"},{label:"Medium Top Rounding",value:"rounded-top-2"},{label:"Large Top Rounding",value:"rounded-top-3"},{label:"Extra Large Top Rounding",value:"rounded-top-4"},{label:"Maximum Top Rounding",value:"rounded-top-5"},{label:"No End Rounding",value:"rounded-end-0"},{label:"Small End Rounding",value:"rounded-end-1"},{label:"Medium End Rounding",value:"rounded-end-2"},{label:"Large End Rounding",value:"rounded-end-3"},{label:"Extra Large End Rounding",value:"rounded-end-4"},{label:"Maximum End Rounding",value:"rounded-end-5"},{label:"No Bottom Rounding",value:"rounded-bottom-0"},{label:"Small Bottom Rounding",value:"rounded-bottom-1"},{label:"Medium Bottom Rounding",value:"rounded-bottom-2"},{label:"Large Bottom Rounding",value:"rounded-bottom-3"},{label:"Extra Large Bottom Rounding",value:"rounded-bottom-4"},{label:"Maximum Bottom Rounding",value:"rounded-bottom-5"},{label:"No Start Rounding",value:"rounded-start-0"},{label:"Small Start Rounding",value:"rounded-start-1"},{label:"Medium Start Rounding",value:"rounded-start-2"},{label:"Large Start Rounding",value:"rounded-start-3"},{label:"Extra Large Start Rounding",value:"rounded-start-4"},{label:"Maximum Start Rounding",value:"rounded-start-5"}],c=window.ReactJSXRuntime,m=(e,l,o)=>e.map((e=>{const r=l.find((l=>l.value===e));return r?o?r.value:r.label:e})),g=(e,l,o)=>e.map((e=>{const r=l.find((l=>o?l.value===e:l.label===e));return r?r.value:e}));function v({label:e,imageId:l,imageUrl:o,onSelect:r,onRemove:n}){
// Translators: %s is the label of the image (e.g., "Default", "Small").
const s=(0,t.sprintf)((0,t.__)("Select %s Image","fs-blocks"),e),i=(0,t.sprintf)(
// Translators: %s is the label of the image (e.g., "Default", "Small").
// Translators: %s is the label of the image (e.g., "Default", "Small").
(0,t.__)("Edit or Replace %s Image","fs-blocks"),e),u=(0,t.sprintf)((0,t.__)("Remove %s Image","fs-blocks"),e);
// Translators: %s is the label of the image (e.g., "Default", "Small").
return(0,c.jsx)(a.MediaUploadCheck,{children:(0,c.jsx)(a.MediaUpload,{onSelect:r,allowedTypes:["image"],value:l,render:({open:e})=>(0,c.jsxs)("div",{style:{marginBottom:"1em"},children:[(0,c.jsx)(d.Button,{isSecondary:!0,onClick:e,children:l?i:s}),o&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{type:"button",style:{display:"block",background:"none",border:"none",padding:0,marginTop:"0.5em",cursor:"pointer"},onClick:e,onKeyDown:l=>{"Enter"!==l.key&&" "!==l.key||e()},"aria-label":i,children:(0,c.jsx)("img",{src:o,alt:"",style:{maxWidth:"100%",display:"block"}})}),(0,c.jsx)("div",{style:{marginTop:"0.5em"},children:(0,c.jsx)(d.Button,{isDestructive:!0,onClick:n,children:u})})]})]})})})}(0,r.registerBlockType)("fs-blocks/dynamic-picture-block",{edit:function(e){const{attributes:l,setAttributes:o}=e,{defaultImageId:r=0,defaultImageUrl:s="",smallImageId:p=0,smallImageUrl:h="",mediumImageId:x=0,mediumImageUrl:f="",largeImageId:B=0,largeImageUrl:j="",aspectRatio:_="none",fillerAlt:k="",borderClass:R=[],borderRadiusClass:S=[]}=l,[y,w]=(0,n.useState)(!1),[C,W]=(0,n.useState)(""),[I,T]=(0,n.useState)(""),E=(0,a.useBlockProps)();function N(e){return l=>{l?.id&&l?.url&&o({[`${e}ImageId`]:l.id,[`${e}ImageUrl`]:l.url})}}function L(e){return()=>{o({[`${e}ImageId`]:0,[`${e}ImageUrl`]:""})}}(0,n.useEffect)((()=>{if(!r)return W(""),void T("");i()({path:`/wp/v2/media/${r}`}).then((e=>{W(e.alt_text||""),T(e.caption?.rendered||"")})).catch((()=>{W(""),T("")}))}),[r]);const M=!!h,O=!!f,U=!!j,A=["wp-block-image","fs-block-image"];_&&"none"!==_?A.push("fs-block-image--has-aspect-ratio",`is-aspect-ratio-${_}`):A.push("fs-block-image--no-aspect-ratio");const F=A.join(" ");function P(){const e=function(){const e=[],l={};return R?.length&&(e.push(...R),l.borderStyle="solid"),S?.length&&e.push(...S),{className:e.length?e.join(" "):void 0,style:Object.keys(l).length?l:void 0}}();if(!M&&!O&&!U)return s?(0,c.jsxs)("figure",{className:F,children:[(0,c.jsx)("img",{src:s,alt:C,style:{maxWidth:"100%"},...e}),I&&(0,c.jsx)("figcaption",{dangerouslySetInnerHTML:{__html:I}})]}):(0,c.jsx)("p",{children:(0,t.__)("No default image selected.","fs-blocks")});let l=null,o=null,r=null;return M?l=(0,c.jsx)("source",{media:"(max-width: 600px)",srcSet:h}):O&&(l=(0,c.jsx)("source",{media:"(max-width: 600px)",srcSet:f})),O&&M?o=(0,c.jsx)("source",{media:"(min-width: 601px) and (max-width: 1023px)",srcSet:f}):O&&!M&&(o=(0,c.jsx)("source",{media:"(max-width: 1023px)",srcSet:f})),U?r=(0,c.jsx)("source",{media:"(min-width: 1024px)",srcSet:j}):O&&(r=(0,c.jsx)("source",{media:"(min-width: 1024px)",srcSet:f})),(0,c.jsxs)("figure",{className:F,children:[(0,c.jsxs)("picture",{children:[l,o,r,(0,c.jsx)("img",{src:s||"",alt:C,style:{maxWidth:"100%"},...e})]}),I&&(0,c.jsx)("figcaption",{dangerouslySetInnerHTML:{__html:I}})]})}return(0,c.jsxs)("div",{...E,children:[(0,c.jsx)(a.InspectorControls,{children:(0,c.jsxs)(d.PanelBody,{title:(0,t.__)("Image Settings","fs-blocks"),initialOpen:!0,children:[(0,c.jsx)(d.CheckboxControl,{label:(0,t.__)("Show Values","fs-blocks"),checked:y,onChange:w,help:(0,t.__)("Display Bootstrap class names instead of labels.","fs-blocks"),style:{marginBottom:"20px"}}),(0,c.jsx)(v,{label:"Default",imageId:r,imageUrl:s,onSelect:N("default"),onRemove:L("default")}),!r&&(0,c.jsxs)("div",{style:{marginBottom:"1em",padding:"0.5em",background:"#f3f3f3"},children:[(0,c.jsx)("p",{style:{fontWeight:"bold"},children:(0,t.__)("No default image selected","fs-blocks")}),(0,c.jsx)("p",{children:(0,t.__)("A 1×1 transparent filler image will be used. For accessibility, provide alt text below.","fs-blocks")}),(0,c.jsx)(d.TextControl,{label:(0,t.__)("Filler Image Alt","fs-blocks"),value:k,onChange:e=>o({fillerAlt:e}),placeholder:(0,t.__)('e.g. "No image provided"',"fs-blocks")})]}),(0,c.jsx)(v,{label:"Small",imageId:p,imageUrl:h,onSelect:N("small"),onRemove:L("small")}),(0,c.jsx)(v,{label:"Medium",imageId:x,imageUrl:f,onSelect:N("medium"),onRemove:L("medium")}),(0,c.jsx)(v,{label:"Large",imageId:B,imageUrl:j,onSelect:N("large"),onRemove:L("large")}),(0,c.jsx)("p",{style:{fontWeight:"bold",marginTop:"1em"},children:(0,t.__)("Aspect Ratio","fs-blocks")}),(0,c.jsxs)("select",{value:_,onChange:e=>o({aspectRatio:e.target.value}),style:{maxWidth:"100%"},children:[(0,c.jsx)("option",{value:"none",children:(0,t.__)("None","fs-blocks")}),(0,c.jsx)("option",{value:"1-1",children:(0,t.__)("Square - 1:1","fs-blocks")}),(0,c.jsx)("option",{value:"4-3",children:(0,t.__)("Standard - 4:3","fs-blocks")}),(0,c.jsx)("option",{value:"3-4",children:(0,t.__)("Portrait - 3:4","fs-blocks")}),(0,c.jsx)("option",{value:"3-2",children:(0,t.__)("Classic - 3:2","fs-blocks")}),(0,c.jsx)("option",{value:"2-3",children:(0,t.__)("Classic Portrait - 2:3","fs-blocks")}),(0,c.jsx)("option",{value:"16-9",children:(0,t.__)("Wide - 16:9","fs-blocks")}),(0,c.jsx)("option",{value:"9-16",children:(0,t.__)("Tall - 9:16","fs-blocks")})]}),(0,c.jsxs)("div",{style:{marginTop:"1em",marginBottom:"20px"},children:[(0,c.jsx)("p",{style:{fontWeight:"bold"},children:(0,t.__)("Border Classes","fs-blocks")}),(0,c.jsx)(d.FormTokenField,{value:m(R,u,y),suggestions:u.map((e=>y?e.value:e.label)),onChange:e=>{const l=g(e,u,y);o({borderClass:l})},label:(0,t.__)("Add border classes","fs-blocks")}),(0,c.jsxs)("details",{style:{marginTop:"5px"},children:[(0,c.jsx)("summary",{children:(0,t.__)("Available Border Classes","fs-blocks")}),(0,c.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:u.map((e=>(0,c.jsx)("li",{children:y?e.value:e.label},e.value)))})]})]}),(0,c.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,c.jsx)("p",{style:{fontWeight:"bold"},children:(0,t.__)("Border Radius Classes","fs-blocks")}),(0,c.jsx)(d.FormTokenField,{value:m(S,b,y),suggestions:b.map((e=>y?e.value:e.label)),onChange:e=>{const l=g(e,b,y);o({borderRadiusClass:l})},label:(0,t.__)("Add radius classes","fs-blocks")}),(0,c.jsxs)("details",{style:{marginTop:"5px"},children:[(0,c.jsx)("summary",{children:(0,t.__)("Available Border Radius Classes","fs-blocks")}),(0,c.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:b.map((e=>(0,c.jsx)("li",{children:y?e.value:e.label},e.value)))})]})]})]})}),(0,c.jsx)(P,{})]})},save:function(){return null}})}},o={};function r(e){var a=o[e];if(void 0!==a)return a.exports;var d=o[e]={exports:{}};return l[e](d,d.exports,r),d.exports}r.m=l,e=[],r.O=(l,o,a,d)=>{if(!o){var t=1/0;for(u=0;u<e.length;u++){for(var[o,a,d]=e[u],n=!0,s=0;s<o.length;s++)(!1&d||t>=d)&&Object.keys(r.O).every((e=>r.O[e](o[s])))?o.splice(s--,1):(n=!1,d<t&&(t=d));if(n){e.splice(u--,1);var i=a();void 0!==i&&(l=i)}}return l}d=d||0;for(var u=e.length;u>0&&e[u-1][2]>d;u--)e[u]=e[u-1];e[u]=[o,a,d]},r.n=e=>{var l=e&&e.__esModule?()=>e.default:()=>e;return r.d(l,{a:l}),l},r.d=(e,l)=>{for(var o in l)r.o(l,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:l[o]})},r.o=(e,l)=>Object.prototype.hasOwnProperty.call(e,l),(()=>{var e={366:0,538:0};r.O.j=l=>0===e[l];var l=(l,o)=>{var a,d,[t,n,s]=o,i=0;if(t.some((l=>0!==e[l]))){for(a in n)r.o(n,a)&&(r.m[a]=n[a]);if(s)var u=s(r)}for(l&&l(o);i<t.length;i++)d=t[i],r.o(e,d)&&e[d]&&e[d][0](),e[d]=0;return r.O(u)},o=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];o.forEach(l.bind(null,0)),o.push=l.bind(null,o.push.bind(o))})();var a=r.O(void 0,[538],(()=>r(654)));a=r.O(a)})();