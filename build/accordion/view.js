(()=>{class e{constructor(e){this.accordionElement=e,this.lastClosedPanel=null,this.buttons=e.querySelectorAll('[data-fs-toggle="collapse"]'),this.buttons.forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),this.togglePanel(e)}))}))}togglePanel(e){const t=e.getAttribute("data-fs-target"),s=document.querySelector(t);if(s)if("true"===e.getAttribute("aria-expanded"))this.closePanel(e,s);else{const t=s.getAttribute("data-fs-parent");if(t){const e=document.querySelector(t);e&&e.querySelectorAll(".fs-accordion-collapse.show").forEach((t=>{if(t!==s){const s=e.querySelector(`[aria-controls="${t.id}"]`);s&&this.closePanel(s,t)}}))}this.openPanel(e,s)}}openPanel(e,t){this.accordionElement.dispatchEvent(new CustomEvent("fsAccordionOpen",{bubbles:!0,detail:{panel:t}})),e.setAttribute("aria-expanded","true"),e.classList.remove("collapsed"),t.classList.remove("collapse","show"),t.classList.add("collapsing"),t.style.height="0px",t.offsetHeight;const s=t.scrollHeight;t.style.height=s+"px";const l=()=>{t.removeEventListener("transitionend",l),t.classList.remove("collapsing"),t.classList.add("collapse","show"),t.style.height="",this.accordionElement.dispatchEvent(new CustomEvent("fsAccordionOpened",{bubbles:!0,detail:{newlyOpened:t,lastClosed:this.lastClosedPanel}}))};t.addEventListener("transitionend",l)}closePanel(e,t){this.accordionElement.dispatchEvent(new CustomEvent("fsAccordionClose",{bubbles:!0,detail:{panel:t}})),e.setAttribute("aria-expanded","false"),e.classList.add("collapsed");const s=t.scrollHeight;t.style.height=s+"px",t.offsetHeight,t.classList.add("collapsing"),t.classList.remove("collapse","show"),t.style.height="0px";const l=()=>{t.removeEventListener("transitionend",l),t.classList.remove("collapsing"),t.classList.add("collapse"),t.style.height="",this.lastClosedPanel=t,this.accordionElement.dispatchEvent(new CustomEvent("fsAccordionClosed",{bubbles:!0,detail:{panel:t}}))};t.addEventListener("transitionend",l)}}document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".fs-accordion").forEach((t=>{new e(t)}))}))})();