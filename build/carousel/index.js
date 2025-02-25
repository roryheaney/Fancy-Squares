(()=>{var e,n={601:(e,n,o)=>{"use strict";const a=window.wp.blocks,t=window.wp.blockEditor,l=window.wp.element,r=window.wp.components,s=window.wp.data;var i=o(942),d=o.n(i);const c=window.ReactJSXRuntime,p=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"fancysquares/carousel","title":"Fancy Carousel","category":"design","description":"A dynamic carousel container block (multiple carousels allowed).","icon":"slides","supports":{"align":["wide","full"],"html":false,"anchor":true},"attributes":{"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]},"slidesToShow":{"type":"number","default":3},"columnGap":{"type":"number","default":30},"pagination":{"type":"boolean","default":false},"navigation":{"type":"boolean","default":false},"autoplay":{"type":"boolean","default":false},"delay":{"type":"number","default":2000},"loop":{"type":"boolean","default":false},"breakpoints":{"type":"array","default":[]},"speed":{"type":"number","default":300},"enableFade":{"type":"boolean","default":false},"fractionalSlidesEnabled":{"type":"boolean","default":false},"fractionalSlidesValue":{"type":"number","default":1},"showPlayPauseButton":{"type":"boolean","default":false}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');(0,a.registerBlockType)(p.name,{...p,edit:function({attributes:e,setAttributes:n,clientId:o}){const{slidesToShow:a,columnGap:i,pagination:p,navigation:u,autoplay:h,delay:f,loop:b,breakpoints:g,speed:y,templateLock:m,enableFade:k,fractionalSlidesEnabled:v,fractionalSlidesValue:w,showPlayPauseButton:x}=e,[C,j]=(0,l.useState)(g),{hasChildBlocks:S}=(0,s.useSelect)((e=>{const{getBlockCount:n}=e("core/block-editor");return{hasChildBlocks:n(o)>0}}),[o]),B=d()(`fancysquares-shows-${function(e,n){let o=e,a=0;return Array.isArray(n)&&n.forEach((e=>{e.breakpoint>a&&(a=e.breakpoint,o=e.slidesToShow)})),o}(a,C)}-slides`,{"fancysquares-show-scrollbar":S,"fancysquares-hide-scrollbar":!S}),O=(0,t.useBlockProps)({className:B});return(0,c.jsxs)(l.Fragment,{children:[(0,c.jsxs)(t.InspectorControls,{children:[(0,c.jsxs)(r.PanelBody,{title:"Carousel Settings",initialOpen:!0,children:[(0,c.jsx)(r.RangeControl,{label:"Slides to show",value:a,onChange:e=>n({slidesToShow:e}),min:1,max:5}),(0,c.jsx)(r.RangeControl,{label:"Columns gap",value:i,onChange:e=>n({columnGap:e}),min:0,max:100,step:10}),(0,c.jsx)(r.ToggleControl,{label:"Dots navigation",onChange:()=>n({pagination:!p}),checked:p}),(0,c.jsx)(r.ToggleControl,{label:"Arrows navigation",onChange:()=>n({navigation:!u}),checked:u}),(0,c.jsx)(r.ToggleControl,{label:"Autoplay",onChange:()=>n({autoplay:!h}),checked:h}),(0,c.jsx)(r.ToggleControl,{label:"Infinite Loop",onChange:()=>n({loop:!b}),checked:b,help:"Requires enough slides to loop."}),h&&(0,c.jsx)(r.RangeControl,{label:"Delay (ms)",value:f,onChange:e=>n({delay:e}),min:500,max:9999,step:500}),1===a&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r.ToggleControl,{label:"Enable Fade (Crossfade)",help:"Use a fade transition instead of sliding.",checked:k,onChange:()=>n({enableFade:!k})}),(0,c.jsx)(r.ToggleControl,{label:"Use Partial (Fractional) Slides?",help:"Overrides slidesToShow=1 with a fractional slidesPerView (0.05–0.50).",checked:v,onChange:()=>n({fractionalSlidesEnabled:!v})}),v&&(0,c.jsx)(r.RangeControl,{label:"Fractional slides per view",value:w,onChange:e=>n({fractionalSlidesValue:e}),min:.05,max:.5,step:.05})]}),(0,c.jsx)(r.ToggleControl,{label:"Enable Play/Pause Button",checked:x,onChange:()=>n({showPlayPauseButton:!x})})]}),(0,c.jsxs)(r.PanelBody,{title:"Responsive",initialOpen:!1,children:[C.map(((e,o)=>(0,c.jsxs)("div",{style:{marginBottom:"30px"},children:[(0,c.jsxs)("strong",{children:["Breakpoint ",o+1]}),(0,c.jsx)(r.__experimentalNumberControl,{label:"Min screen width (px)",labelPosition:"side",isDragEnabled:!0,min:100,max:2e3,value:e.breakpoint,onChange:e=>{j((a=>{const t=[...a];return t[o]={...t[o],breakpoint:parseInt(e,10)},n({breakpoints:t}),t}))}}),(0,c.jsx)(r.RangeControl,{label:"Slides to show",value:e.slidesToShow,onChange:e=>{j((a=>{const t=[...a];return t[o]={...t[o],slidesToShow:e},n({breakpoints:t}),t}))},min:1,max:5}),(0,c.jsxs)(r.Button,{isDestructive:!0,isLink:!0,onClick:()=>{j((e=>{const a=e.filter(((e,n)=>n!==o));return n({breakpoints:a}),a}))},children:["Remove breakpoint ",o+1]})]},o))),C.length<3&&(0,c.jsx)(r.Button,{variant:"secondary",onClick:()=>{j((e=>{const o=[...e,{breakpoint:768,slidesToShow:2}];return n({breakpoints:o}),o}))},children:"Add breakpoint"})]}),(0,c.jsx)(r.PanelBody,{title:"Animation",initialOpen:!1,children:(0,c.jsx)(r.RangeControl,{label:"Speed (ms)",value:y,onChange:e=>n({speed:e}),min:100,max:900,step:50})})]}),(0,c.jsx)("div",{...O,children:(0,c.jsx)(t.InnerBlocks,{orientation:"horizontal",allowedBlocks:["fancysquares/slide"],templateLock:m,renderAppender:t.InnerBlocks.ButtonBlockAppender})})]})},save:()=>(0,c.jsx)(t.InnerBlocks.Content,{})})},942:(e,n)=>{var o;!function(){"use strict";var a={}.hasOwnProperty;function t(){for(var e="",n=0;n<arguments.length;n++){var o=arguments[n];o&&(e=r(e,l(o)))}return e}function l(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return t.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var o in e)a.call(e,o)&&e[o]&&(n=r(n,o));return n}function r(e,n){return n?e?e+" "+n:e+n:e}e.exports?(t.default=t,e.exports=t):void 0===(o=function(){return t}.apply(n,[]))||(e.exports=o)}()}},o={};function a(e){var t=o[e];if(void 0!==t)return t.exports;var l=o[e]={exports:{}};return n[e](l,l.exports,a),l.exports}a.m=n,e=[],a.O=(n,o,t,l)=>{if(!o){var r=1/0;for(c=0;c<e.length;c++){for(var[o,t,l]=e[c],s=!0,i=0;i<o.length;i++)(!1&l||r>=l)&&Object.keys(a.O).every((e=>a.O[e](o[i])))?o.splice(i--,1):(s=!1,l<r&&(r=l));if(s){e.splice(c--,1);var d=t();void 0!==d&&(n=d)}}return n}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[o,t,l]},a.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return a.d(n,{a:n}),n},a.d=(e,n)=>{for(var o in n)a.o(n,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},a.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={704:0,200:0};a.O.j=n=>0===e[n];var n=(n,o)=>{var t,l,[r,s,i]=o,d=0;if(r.some((n=>0!==e[n]))){for(t in s)a.o(s,t)&&(a.m[t]=s[t]);if(i)var c=i(a)}for(n&&n(o);d<r.length;d++)l=r[d],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(c)},o=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))})();var t=a.O(void 0,[200],(()=>a(601)));t=a.O(t)})();