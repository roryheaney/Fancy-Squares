(()=>{"use strict";const e=window.wp.blocks,t=window.wp.blockEditor,s=window.wp.element,i=window.ReactJSXRuntime,o=JSON.parse('{"UU":"fs-blocks/tab-item"}');(0,e.registerBlockType)(o.UU,{edit:function({clientId:e,attributes:o,setAttributes:l}){const{title:n,tabId:a}=o,r=(0,t.useBlockProps)({style:{padding:"1rem",border:"1px solid #dee2e6",borderTop:"none"}});return(0,s.useEffect)((()=>{a||l({tabId:e})}),[e]),(0,i.jsxs)("div",{...r,children:[(0,i.jsx)(t.RichText,{tagName:"div",className:"tab-title-editor",value:n,allowedFormats:[],onChange:e=>l({title:e}),placeholder:"Tab Title",style:{fontSize:"1.25rem",marginBottom:"0.5rem"}}),(0,i.jsx)(t.InnerBlocks,{})]})},save:({attributes:e})=>(0,i.jsxs)("div",{...t.useBlockProps.save(),children:[(0,i.jsx)(t.RichText.Content,{tagName:"div",className:"tab-title",value:e.title}),(0,i.jsx)(t.InnerBlocks.Content,{})]})})})();