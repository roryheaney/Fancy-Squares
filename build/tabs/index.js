(()=>{"use strict";const e=window.wp.blocks,t=window.wp.blockEditor,s=window.wp.element,c=window.wp.data,n=window.wp.components,l=window.ReactJSXRuntime,i=JSON.parse('{"UU":"fs-blocks/tabs"}');(0,e.registerBlockType)(i.UU,{edit:function({clientId:e,attributes:i,setAttributes:o}){const{blockId:a,activeTab:r,responsiveTabs:d}=i,b=(0,t.useBlockProps)(),{selectBlock:u}=(0,c.useDispatch)(t.store),{childBlocks:k}=(0,c.useSelect)((s=>{const{getBlockOrder:c,getBlock:n}=s(t.store);return{childBlocks:c(e).map((e=>n(e)))}}),[e]);(0,s.useEffect)((()=>{if(a||o({blockId:e}),k.length>0&&!r){const e=k[0].attributes.tabId||k[0].clientId;o({activeTab:e})}}),[e,k]);const p=(0,s.useRef)(k.length);return(0,s.useEffect)((()=>{if(k.length>p.current){const e=k[k.length-1],t=e.attributes.tabId||e.clientId;o({activeTab:t}),u(e.clientId)}p.current=k.length}),[k]),function(e,t){(0,s.useEffect)((()=>{const s=document.querySelector(`[data-block="${e}"]`);s&&s.querySelectorAll(".wp-block-fs-blocks-tab-item").forEach((e=>{const s=e.dataset.block;e.classList.toggle("is-active",s===t)}))}),[t,e])}(e,r),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.InspectorControls,{children:(0,l.jsx)(n.PanelBody,{title:"Responsive Settings",initialOpen:!0,children:(0,l.jsx)(n.ToggleControl,{label:"Responsive tabs",help:"Use an accordion on mobile",checked:d,onChange:e=>o({responsiveTabs:e})})})}),(0,l.jsx)("div",{...b,children:(0,l.jsxs)("div",{className:"wp-block-fs-blocks-tabs-editor",children:[(0,l.jsxs)("ul",{className:"tabs-nav",children:[k.map((e=>{const t=e.attributes.tabId||e.clientId;return(0,l.jsx)("li",{className:"nav-item",children:(0,l.jsx)("button",{className:"nav-link "+(r===t?"is-active":""),onClick:()=>(e=>{const t=e.attributes.tabId||e.clientId;o({activeTab:t}),u(e.clientId)})(e),role:"tab","aria-selected":r===t,children:e.attributes.title||"New Tab"})},e.clientId)})),(0,l.jsx)("li",{className:"nav-item",children:(0,l.jsx)(t.InnerBlocks.ButtonBlockAppender,{})})]}),(0,l.jsx)("div",{className:"tab-content-editor",children:(0,l.jsx)(t.InnerBlocks,{allowedBlocks:["fs-blocks/tab-item"],template:[["fs-blocks/tab-item"]],templateLock:!1})})]})})]})},save:({attributes:e})=>(0,l.jsx)("div",{...t.useBlockProps.save(),children:(0,l.jsx)(t.InnerBlocks.Content,{})})})})();