const v=()=>{const e=document.querySelector(".navbar"),c=()=>{window.scrollY>e.offsetHeight?e.classList.add("scrolled"):e.classList.remove("scrolled")};let o=!1;window.addEventListener("scroll",()=>{o||(window.requestAnimationFrame(()=>{c(),o=!1}),o=!0)}),c();const t=document.querySelectorAll("main.main-wrapper section")[1],u={rootMargin:"50% 0px -75% 0px",threshold:[.5]};let i=window.scrollY,n=!1;const f=(s,l)=>{s.forEach(a=>{const d=window.scrollY;n=d>i,i=d,a.isIntersecting&&n?e.classList.add("crossed-second-page-section"):!a.isIntersecting&&!n&&e.classList.remove("crossed-second-page-section")})};new IntersectionObserver(f,u).observe(t),setTimeout(()=>{window.scrollY-t.offsetTop>t.offsetHeight&&e.classList.add("crossed-second-page-section")},1);const r=document.querySelector(".w-nav-button");new MutationObserver(function(s){s.forEach(function(l){l.attributeName==="class"&&(r.classList.contains("w--open")?e.classList.add("menu-open"):e.classList.remove("menu-open"))})}).observe(r,{attributes:!0})};document.addEventListener("DOMContentLoaded",()=>{v()});