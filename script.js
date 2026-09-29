(()=>{"use strict";const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches,touch=matchMedia("(hover:none)").matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];function initHeader(){const h=$("#siteHeader"),b=$(".menu-toggle"),m=$("#mobileMenu");if(!h)return;const update=()=>h.classList.toggle("scrolled",scrollY>40);update();addEventListener("scroll",update,{passive:true});if(b&&m){const close=()=>{m.style.transform="translateY(-100%)";m.style.visibility="hidden";m.setAttribute("aria-hidden","true");b.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")};b.addEventListener("click",()=>b.getAttribute("aria-expanded")==="true"?close():(m.style.visibility="visible",m.style.transform="translateY(0)",m.setAttribute("aria-hidden","false"),b.setAttribute("aria-expanded","true"),document.body.classList.add("menu-open")));$$(".mobile-menu a").forEach(a=>a.addEventListener("click",close))}}function initLenis(){if(reduced||!window.Lenis||!window.gsap||!window.ScrollTrigger)return null;const l=new Lenis({duration:1.15,smoothWheel:true,gestureOrientation:"vertical"});gsap.ticker.add(t=>l.raf(t*1e3));gsap.ticker.lagSmoothing(0);l.on("scroll",ScrollTrigger.update);return l}function initHeroParallax(){
  if(reduced||!window.gsap||!window.ScrollTrigger)return;
  const i=$(".hero-media img");
  if(i)gsap.to(i,{yPercent:-7,x:0,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
}
function initCinematicOpening(){
  const o=$("#cinematicOpening");if(!o)return;
  if(reduced){o.remove();return}
  document.documentElement.classList.add("opening-active");document.body.classList.add("opening-active");
  gsap.timeline({defaults:{ease:"power3.inOut"},onComplete:()=>{o.remove();document.documentElement.classList.remove("opening-active");document.body.classList.remove("opening-active");initHeroReveal()}})
    .to(".opening-progress span",{scaleX:1,duration:1.65,ease:"power2.inOut"},0)
    .fromTo(".opening-copy",{y:24,opacity:0},{y:0,opacity:1,duration:.9,ease:"power3.out"},.18)
    .to(".opening-image img",{scale:1,duration:1.8,ease:"power2.out"},0)
    .to(".opening-copy",{y:-18,opacity:0,duration:.55,ease:"power2.in"},1.55)
    .to(".opening-image",{clipPath:"inset(0 0 0 100%)",duration:1.05,ease:"power4.inOut"},1.72)
    .to(".opening-shade",{opacity:0,duration:.55},1.72);
}
function initHeroReveal(){if(!window.gsap||reduced){ $$(".reveal").forEach(e=>{e.style.opacity=1;e.style.transform="none"});return}gsap.to(".reveal",{opacity:1,y:0,duration:1.1,stagger:.08,ease:"power3.out",delay:.15})}function initPinnedReveal(){
  if(reduced||!window.gsap||!window.ScrollTrigger)return;
  const mm=gsap.matchMedia();
  mm.add("(min-width:901px)",()=>{const w=$(".pin-image-wrap");if(!w)return;gsap.to(w,{scale:1.92,ease:"none",scrollTrigger:{trigger:".pinned-reveal",start:"top top",end:"bottom bottom",scrub:true}});});
  mm.add("(max-width:900px)",()=>{const w=$(".pin-image-wrap");if(!w)return;gsap.to(w,{scale:1.42,ease:"none",scrollTrigger:{trigger:".pinned-reveal",start:"top top",end:"bottom bottom",scrub:true}});});
}
function initFullscreen(){if(reduced||!window.gsap||!window.ScrollTrigger)return;const i=$(".transition-image img");if(i)gsap.fromTo(i,{scale:1.18},{scale:1,scrollTrigger:{trigger:".fullscreen-transition",start:"top bottom",end:"bottom top",scrub:true}})}function initHorizontal(){
  if(reduced||!window.gsap||!window.ScrollTrigger)return;
  const mm=gsap.matchMedia();
  mm.add("(min-width:901px)",()=>{
    const s=$(".collection"),t=$(".collection-track");if(!s||!t)return;
    const distance=()=>Math.max(0,t.scrollWidth-innerWidth*.86);
    gsap.to(t,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:s,start:"top top",end:()=>"+="+(distance()+innerWidth),pin:true,scrub:1,invalidateOnRefresh:true}});
  });
  mm.add("(max-width:900px)",()=>{const t=$(".collection-track");if(t)t.setAttribute("tabindex","0");});
}
function initMouse(){
  if(reduced||touch||!window.gsap)return;
  const c=$(".cursor"),hero=$(".hero-media img");gsap.set(c,{opacity:1});
  addEventListener("pointermove",e=>{
    gsap.to(c,{x:e.clientX,y:e.clientY,duration:.28,ease:"power2.out",overwrite:true});
    if(hero)gsap.to(hero,{x:(e.clientX-innerWidth/2)*.004,duration:1.1,ease:"power3.out",overwrite:false});
  },{passive:true});
  $$(".magnetic").forEach(el=>{
    el.addEventListener("pointerenter",()=>gsap.to(el,{scale:1.02,duration:.35,ease:"power2.out"}));
    el.addEventListener("pointerleave",()=>gsap.to(el,{scale:1,duration:.45,ease:"power3.out"}));
  });
  $$(".collection-card").forEach(card=>{
    const img=card.querySelector("img");
    if(img){
      card.addEventListener("pointerenter",()=>gsap.to(img,{scale:1.04,duration:.7,ease:"power3.out"}));
      card.addEventListener("pointerleave",()=>gsap.to(img,{scale:1,duration:.7,ease:"power3.out"}));
    }
  });
}
function initBooking(){const f=$("#bookingForm");if(!f)return;const s=$("#service"),d=$("#date"),t=$("#time"),n=$("#name"),p=$("#phone"),no=$("#note"),sum=$("#bookingSummary strong"),st=$("#formStatus");const now=new Date;now.setMinutes(now.getMinutes()-now.getTimezoneOffset());d.min=now.toISOString().slice(0,10);const update=()=>sum.textContent=[s.value,d.value,t.value,n.value].filter(Boolean).join(" · ")||"Bilgilerinizi doldurun.";[s,d,t,n,p,no].forEach(e=>e.addEventListener("input",update));f.addEventListener("submit",e=>{e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}const msg=[`Merhaba, Feyza Durmazoğlu Bolu'dan randevu talep etmek istiyorum.`,"",`Hizmet: ${s.value}`,`Tarih: ${d.value}`,`Saat: ${t.value}`,`Ad Soyad: ${n.value}`,`Telefon: ${p.value}`,no.value?`Not: ${no.value}`:""].filter(Boolean).join("\n");st.textContent="WhatsApp açılıyor…";open(`https://wa.me/905347099081?text=${encodeURIComponent(msg)}`,"_blank","noopener")})}function initAnchors(){if(reduced)return;$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=$(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth",block:"start"})}}))}function init(){
  if(window.gsap&&window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  initHeader();initLenis();initCinematicOpening();initHeroParallax();initPinnedReveal();initFullscreen();initHorizontal();initMouse();initBooking();initAnchors();
  addEventListener("load",()=>window.ScrollTrigger&&ScrollTrigger.refresh());
}
}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()})();