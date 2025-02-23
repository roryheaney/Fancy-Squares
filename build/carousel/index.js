(()=>{var e,n={422:(e,n,a)=>{"use strict";const o=window.wp.blocks,t=window.wp.element,l=window.wp.blockEditor,s=window.wp.components,i=window.wp.data;var r=a(942),d=a.n(r);const c=window.ReactJSXRuntime,p=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"fancysquares/carousel","title":"Fancy Carousel","category":"design","description":"A dynamic carousel container block (multiple carousels allowed).","icon":"slides","supports":{"align":["wide","full"],"html":false,"anchor":true},"attributes":{"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]},"slidesToShow":{"type":"number","default":3},"columnGap":{"type":"number","default":30},"pagination":{"type":"boolean","default":false},"navigation":{"type":"boolean","default":false},"autoplay":{"type":"boolean","default":false},"delay":{"type":"number","default":2000},"loop":{"type":"boolean","default":false},"breakpoints":{"type":"array","default":[]},"speed":{"type":"number","default":300},"enableFade":{"type":"boolean","default":false},"fractionalSlidesEnabled":{"type":"boolean","default":false},"fractionalSlidesValue":{"type":"number","default":1},"showPlayPauseButton":{"type":"boolean","default":false}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');(0,o.registerBlockType)(p.name,{...p,edit:function({attributes:e,setAttributes:n,clientId:a}){const{slidesToShow:o,columnGap:r,pagination:p,navigation:u,autoplay:h,delay:b,loop:f,breakpoints:g,speed:y,templateLock:w,enableFade:m,fractionalSlidesEnabled:v,fractionalSlidesValue:x,showPlayPauseButton:k}=e,[j,C]=(0,t.useState)(g),{hasChildBlocks:S}=(0,i.useSelect)((e=>{const{getBlockCount:n}=e("core/block-editor");return{hasChildBlocks:n(a)>0}}),[a]),B=d()(`fancysquares-shows-${function(e,n){let a=e,o=0;return Array.isArray(n)&&n.forEach((e=>{e.breakpoint>o&&(o=e.breakpoint,a=e.slidesToShow)})),a}(o,j)}-slides`,{"fancysquares-show-scrollbar":S,"fancysquares-hide-scrollbar":!S}),P=(0,l.useBlockProps)({className:B});return(0,c.jsxs)(t.Fragment,{children:[(0,c.jsxs)(l.InspectorControls,{children:[(0,c.jsxs)(s.PanelBody,{title:"Carousel Settings",initialOpen:!0,children:[(0,c.jsx)(s.RangeControl,{label:"Slides to show",value:o,onChange:e=>n({slidesToShow:e}),min:1,max:5}),(0,c.jsx)(s.RangeControl,{label:"Columns gap",value:r,onChange:e=>n({columnGap:e}),min:0,max:100,step:10}),(0,c.jsx)(s.ToggleControl,{label:"Dots navigation",onChange:()=>n({pagination:!p}),checked:p}),(0,c.jsx)(s.ToggleControl,{label:"Arrows navigation",onChange:()=>n({navigation:!u}),checked:u}),(0,c.jsx)(s.ToggleControl,{label:"Autoplay",onChange:()=>n({autoplay:!h}),checked:h}),(0,c.jsx)(s.ToggleControl,{label:"Infinite Loop",onChange:()=>n({loop:!f}),checked:f,help:"Requires enough slides to loop."}),h&&(0,c.jsx)(s.RangeControl,{label:"Delay (ms)",value:b,onChange:e=>n({delay:e}),min:500,max:9999,step:500}),1===o&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.ToggleControl,{label:"Enable Fade (Crossfade)",help:"Use a fade transition instead of sliding.",checked:m,onChange:()=>n({enableFade:!m})}),(0,c.jsx)(s.ToggleControl,{label:"Use Partial (Fractional) Slides?",help:"Overrides slidesToShow=1 with a fractional slidesPerView (0.05–0.50).",checked:v,onChange:()=>n({fractionalSlidesEnabled:!v})}),v&&(0,c.jsx)(s.RangeControl,{label:"Fractional slides per view",value:x,onChange:e=>n({fractionalSlidesValue:e}),min:.05,max:.5,step:.05})]}),(0,c.jsx)(s.ToggleControl,{label:"Enable Play/Pause Button",checked:k,onChange:()=>n({showPlayPauseButton:!k})})]}),(0,c.jsxs)(s.PanelBody,{title:"Responsive",initialOpen:!1,children:[j.map(((e,a)=>(0,c.jsxs)("div",{style:{marginBottom:"30px"},children:[(0,c.jsxs)("strong",{children:["Breakpoint ",a+1]}),(0,c.jsx)(s.NumberControl,{label:"Min screen width (px)",labelPosition:"side",isDragEnabled:!0,min:100,max:2e3,value:e.breakpoint,onChange:e=>{C((o=>{const t=[...o];return t[a]={...t[a],breakpoint:parseInt(e,10)},n({breakpoints:t}),t}))}}),(0,c.jsx)(s.RangeControl,{label:"Slides to show",value:e.slidesToShow,onChange:e=>{C((o=>{const t=[...o];return t[a]={...t[a],slidesToShow:e},n({breakpoints:t}),t}))},min:1,max:5}),(0,c.jsxs)(s.Button,{isDestructive:!0,isLink:!0,onClick:()=>{C((e=>{const o=e.filter(((e,n)=>n!==a));return n({breakpoints:o}),o}))},children:["Remove breakpoint ",a+1]})]},a))),j.length<3&&(0,c.jsx)(s.Button,{variant:"secondary",onClick:()=>{C((e=>{const a=[...e,{breakpoint:768,slidesToShow:2}];return n({breakpoints:a}),a}))},children:"Add breakpoint"})]}),(0,c.jsx)(s.PanelBody,{title:"Animation",initialOpen:!1,children:(0,c.jsx)(s.RangeControl,{label:"Speed (ms)",value:y,onChange:e=>n({speed:e}),min:100,max:900,step:50})})]}),(0,c.jsx)("div",{...P,children:(0,c.jsx)(l.InnerBlocks,{orientation:"horizontal",allowedBlocks:["fancysquares/slide"],templateLock:w,renderAppender:l.InnerBlocks.ButtonBlockAppender})})]})},save:function({attributes:e}){const{slidesToShow:n,columnGap:a,pagination:o,navigation:t,autoplay:s,delay:i,loop:r,breakpoints:d,speed:p,enableFade:u,fractionalSlidesEnabled:h,fractionalSlidesValue:b,showPlayPauseButton:f}=e;let g=n;1===n&&h&&(g=1+b);const y={slidesPerView:g,autoplay:!!s&&{delay:i},speed:p,spaceBetween:a,breakpoints:d.reduce(((e,n)=>(e[n.breakpoint]={slidesPerView:n.slidesToShow},e)),{}),pagination:!!o&&{el:".swiper-pagination",clickable:!0},navigation:!!t&&{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},loop:r};1===n&&u&&(y.effect="fade",y.fadeEffect={crossFade:!0});const w=l.useBlockProps.save({className:"swiper","data-swiper":JSON.stringify(y)}),m=["swiper-pause-pagination"];return f||o||m.push("d-none"),(0,c.jsxs)("div",{...w,children:[(0,c.jsx)("div",{className:"swiper-wrapper",children:(0,c.jsx)(l.InnerBlocks.Content,{})}),(0,c.jsx)("div",{className:m.join(" "),children:(0,c.jsxs)("div",{className:"swiper-pause-pagination__inner-container",children:[f&&(0,c.jsxs)("button",{className:"dsb-button-control","aria-label":"Carousel is playing, click to pause",children:[(0,c.jsx)("span",{"aria-hidden":"true",children:"Pause"}),(0,c.jsx)("span",{"aria-hidden":"true",class:"d-none",children:"Play"})]}),o&&(0,c.jsx)("div",{className:"swiper-pagination"})]})}),t&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"swiper-button-next"}),(0,c.jsx)("div",{className:"swiper-button-prev"})]})]})}})},942:(e,n)=>{var a;!function(){"use strict";var o={}.hasOwnProperty;function t(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=s(e,l(a)))}return e}function l(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return t.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)o.call(e,a)&&e[a]&&(n=s(n,a));return n}function s(e,n){return n?e?e+" "+n:e+n:e}e.exports?(t.default=t,e.exports=t):void 0===(a=function(){return t}.apply(n,[]))||(e.exports=a)}()}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var l=a[e]={exports:{}};return n[e](l,l.exports,o),l.exports}o.m=n,e=[],o.O=(n,a,t,l)=>{if(!a){var s=1/0;for(c=0;c<e.length;c++){for(var[a,t,l]=e[c],i=!0,r=0;r<a.length;r++)(!1&l||s>=l)&&Object.keys(o.O).every((e=>o.O[e](a[r])))?a.splice(r--,1):(i=!1,l<s&&(s=l));if(i){e.splice(c--,1);var d=t();void 0!==d&&(n=d)}}return n}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[a,t,l]},o.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return o.d(n,{a:n}),n},o.d=(e,n)=>{for(var a in n)o.o(n,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={704:0,200:0};o.O.j=n=>0===e[n];var n=(n,a)=>{var t,l,[s,i,r]=a,d=0;if(s.some((n=>0!==e[n]))){for(t in i)o.o(i,t)&&(o.m[t]=i[t]);if(r)var c=r(o)}for(n&&n(a);d<s.length;d++)l=s[d],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(c)},a=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))})();var t=o.O(void 0,[200],(()=>o(422)));t=o.O(t)})();