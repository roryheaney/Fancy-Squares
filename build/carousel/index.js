(()=>{var e,n={422:(e,n,a)=>{"use strict";const o=window.wp.blocks,t=window.wp.element,l=window.wp.blockEditor,s=window.wp.components,r=window.wp.data;var i=a(942),d=a.n(i);const p=window.ReactJSXRuntime,c=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"fancysquares/carousel","title":"Fancy Carousel","category":"design","description":"A dynamic carousel container block (multiple carousels allowed).","icon":"slides","supports":{"align":["wide","full"],"html":false,"anchor":true},"attributes":{"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]},"slidesToShow":{"type":"number","default":3},"columnGap":{"type":"number","default":30},"pagination":{"type":"boolean","default":false},"navigation":{"type":"boolean","default":false},"autoplay":{"type":"boolean","default":false},"delay":{"type":"number","default":2000},"loop":{"type":"boolean","default":false},"breakpoints":{"type":"array","default":[]},"speed":{"type":"number","default":300},"enableFade":{"type":"boolean","default":false},"fractionalSlidesEnabled":{"type":"boolean","default":false},"fractionalSlidesValue":{"type":"number","default":1}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');(0,o.registerBlockType)(c.name,{...c,edit:function({attributes:e,setAttributes:n,clientId:a}){const{slidesToShow:o,columnGap:i,pagination:c,navigation:u,autoplay:f,delay:b,loop:h,breakpoints:g,speed:v,templateLock:y,enableFade:m,fractionalSlidesEnabled:w,fractionalSlidesValue:k}=e,[x,j]=(0,t.useState)(g),{hasChildBlocks:C}=(0,r.useSelect)((e=>{const{getBlockCount:n}=e("core/block-editor");return{hasChildBlocks:n(a)>0}}),[a]),S=d()(`fancysquares-shows-${function(e,n){let a=e,o=0;return Array.isArray(n)&&n.forEach((e=>{e.breakpoint>o&&(o=e.breakpoint,a=e.slidesToShow)})),a}(o,x)}-slides`,{"fancysquares-show-scrollbar":C,"fancysquares-hide-scrollbar":!C}),B=(0,l.useBlockProps)({className:S});return(0,p.jsxs)(t.Fragment,{children:[(0,p.jsxs)(l.InspectorControls,{children:[(0,p.jsxs)(s.PanelBody,{title:"Carousel Settings",initialOpen:!0,children:[(0,p.jsx)(s.RangeControl,{label:"Slides to show",value:o,onChange:e=>n({slidesToShow:e}),min:1,max:5}),(0,p.jsx)(s.RangeControl,{label:"Columns gap",value:i,onChange:e=>n({columnGap:e}),min:0,max:100,step:10}),(0,p.jsx)(s.ToggleControl,{label:"Dots navigation",onChange:()=>n({pagination:!c}),checked:c}),(0,p.jsx)(s.ToggleControl,{label:"Arrows navigation",onChange:()=>n({navigation:!u}),checked:u}),(0,p.jsx)(s.ToggleControl,{label:"Autoplay",onChange:()=>n({autoplay:!f}),checked:f}),(0,p.jsx)(s.ToggleControl,{label:"Infinite Loop",onChange:()=>n({loop:!h}),checked:h,help:"Requires enough slides to loop."}),f&&(0,p.jsx)(s.RangeControl,{label:"Delay (ms)",value:b,onChange:e=>n({delay:e}),min:500,max:9999,step:500})]}),(0,p.jsxs)(s.PanelBody,{title:"Responsive",initialOpen:!1,children:[x.map(((e,a)=>(0,p.jsxs)("div",{style:{marginBottom:"30px"},children:[(0,p.jsxs)("strong",{children:["Breakpoint ",a+1]}),(0,p.jsx)(s.NumberControl,{label:"Min screen width (px)",labelPosition:"side",isDragEnabled:!0,min:100,max:2e3,value:e.breakpoint,onChange:e=>{j((o=>{const t=[...o];return t[a]={...t[a],breakpoint:parseInt(e,10)},n({breakpoints:t}),t}))}}),(0,p.jsx)(s.RangeControl,{label:"Slides to show",value:e.slidesToShow,onChange:e=>{j((o=>{const t=[...o];return t[a]={...t[a],slidesToShow:e},n({breakpoints:t}),t}))},min:1,max:5}),(0,p.jsxs)(s.Button,{isDestructive:!0,isLink:!0,onClick:()=>{j((e=>{const o=e.filter(((e,n)=>n!==a));return n({breakpoints:o}),o}))},children:["Remove breakpoint ",a+1]})]},a))),x.length<3&&(0,p.jsx)(s.Button,{variant:"secondary",onClick:()=>{j((e=>{const a=[...e,{breakpoint:768,slidesToShow:2}];return n({breakpoints:a}),a}))},children:"Add breakpoint"})]}),(0,p.jsxs)(s.PanelBody,{title:"Animation",initialOpen:!1,children:[(0,p.jsx)(s.RangeControl,{label:"Speed (ms)",value:v,onChange:e=>n({speed:e}),min:100,max:900,step:50}),1===o&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.ToggleControl,{label:"Enable Fade (Crossfade)",help:"Use a fade transition instead of sliding.",checked:m,onChange:()=>n({enableFade:!m})}),(0,p.jsx)(s.ToggleControl,{label:"Use Partial (Fractional) Slides?",help:"Overrides slidesToShow=1 with a fractional slidesPerView (0.05–0.50).",checked:w,onChange:()=>n({fractionalSlidesEnabled:!w})}),w&&(0,p.jsx)(s.RangeControl,{label:"Fractional slides per view",value:k,onChange:e=>n({fractionalSlidesValue:e}),min:.05,max:.5,step:.05})]})]})]}),(0,p.jsx)("div",{...B,children:(0,p.jsx)(l.InnerBlocks,{orientation:"horizontal",allowedBlocks:["fancysquares/slide"],templateLock:y,renderAppender:l.InnerBlocks.ButtonBlockAppender})})]})},save:function({attributes:e}){const{slidesToShow:n,columnGap:a,pagination:o,navigation:t,autoplay:s,delay:r,loop:i,breakpoints:d,speed:c,enableFade:u,fractionalSlidesEnabled:f,fractionalSlidesValue:b}=e;let h=n;1===n&&f&&(h=1+b);const g={slidesPerView:h,autoplay:!!s&&{delay:r},speed:c,spaceBetween:a,breakpoints:d.reduce(((e,n)=>(e[n.breakpoint]={slidesPerView:n.slidesToShow},e)),{}),pagination:!!o&&{el:".swiper-pagination",clickable:!0},navigation:!!t&&{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},loop:s&&i};1===n&&u&&(g.effect="fade",g.fadeEffect={crossFade:!0});const v=l.useBlockProps.save({className:"swiper","data-swiper":JSON.stringify(g)});return(0,p.jsxs)("div",{...v,children:[(0,p.jsx)("div",{className:"swiper-wrapper",children:(0,p.jsx)(l.InnerBlocks.Content,{})}),o&&(0,p.jsx)("div",{className:"swiper-pagination"}),t&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{className:"swiper-button-next"}),(0,p.jsx)("div",{className:"swiper-button-prev"})]})]})}})},942:(e,n)=>{var a;!function(){"use strict";var o={}.hasOwnProperty;function t(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=s(e,l(a)))}return e}function l(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return t.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)o.call(e,a)&&e[a]&&(n=s(n,a));return n}function s(e,n){return n?e?e+" "+n:e+n:e}e.exports?(t.default=t,e.exports=t):void 0===(a=function(){return t}.apply(n,[]))||(e.exports=a)}()}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var l=a[e]={exports:{}};return n[e](l,l.exports,o),l.exports}o.m=n,e=[],o.O=(n,a,t,l)=>{if(!a){var s=1/0;for(p=0;p<e.length;p++){for(var[a,t,l]=e[p],r=!0,i=0;i<a.length;i++)(!1&l||s>=l)&&Object.keys(o.O).every((e=>o.O[e](a[i])))?a.splice(i--,1):(r=!1,l<s&&(s=l));if(r){e.splice(p--,1);var d=t();void 0!==d&&(n=d)}}return n}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[a,t,l]},o.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return o.d(n,{a:n}),n},o.d=(e,n)=>{for(var a in n)o.o(n,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={704:0,200:0};o.O.j=n=>0===e[n];var n=(n,a)=>{var t,l,[s,r,i]=a,d=0;if(s.some((n=>0!==e[n]))){for(t in r)o.o(r,t)&&(o.m[t]=r[t]);if(i)var p=i(o)}for(n&&n(a);d<s.length;d++)l=s[d],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(p)},a=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))})();var t=o.O(void 0,[200],(()=>o(422)));t=o.O(t)})();