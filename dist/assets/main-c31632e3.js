import{i as w}from"./index-3fd83956.js";const v=()=>{const e=document.querySelector("div.navbar"),o=()=>{window.scrollY>0?e.classList.add("scrolled"):e.classList.remove("scrolled")};let s=!1;window.addEventListener("scroll",()=>{s||(window.requestAnimationFrame(()=>{o(),s=!1}),s=!0)}),o();const i=document.querySelector(".section_wer_wir_sind");window.scrollY>i.offsetTop&&e.classList.add("crossed-wer-wir-sind");const c={rootMargin:"50% 0px 0px 0px",threshold:1};let n=window.scrollY,r=!1;const d=(a,b)=>{a.forEach(t=>{const l=window.scrollY;r=l>n,n=l,t.isIntersecting&&r?e.classList.add("crossed-wer-wir-sind"):!t.isIntersecting&&!r&&e.classList.remove("crossed-wer-wir-sind")})};new IntersectionObserver(d,c).observe(i)};document.addEventListener("DOMContentLoaded",()=>{v(),w()});
