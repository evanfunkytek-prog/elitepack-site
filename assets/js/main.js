(function(){
  'use strict';
  function onReady(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
  onReady(function(){
    var header=document.querySelector('[data-header]');
    function onScroll(){ if(header){ header.classList.toggle('is-scrolled', window.scrollY>8); } }
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

    var toggle=document.querySelector('[data-nav-toggle]');
    var nav=document.querySelector('[data-nav]');
    if(toggle&&nav){
      toggle.addEventListener('click', function(){
        var open=nav.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open?'true':'false');
      });
      nav.addEventListener('click', function(e){ if(e.target.tagName==='A'){ nav.classList.remove('open'); toggle.classList.remove('open'); } });
    }

    document.querySelectorAll('[data-tabs]').forEach(function(wrap){
      var btns=wrap.querySelectorAll('[data-tab]');
      var panels=wrap.querySelectorAll('[data-panel]');
      btns.forEach(function(b){ b.addEventListener('click', function(){
        btns.forEach(function(x){ x.classList.toggle('is-active', x===b); });
        panels.forEach(function(pn){ pn.classList.toggle('is-active', pn.dataset.panel===b.dataset.tab); });
      }); });
    });

    document.querySelectorAll('[data-filter-group]').forEach(function(group){
      var btns=group.querySelectorAll('[data-filter]');
      btns.forEach(function(b){ b.addEventListener('click', function(){
        btns.forEach(function(x){ x.classList.toggle('is-active', x===b); });
        var f=b.dataset.filter;
        document.querySelectorAll('[data-cat]').forEach(function(card){ card.style.display=(f==='all'||card.dataset.cat===f)?'':'none'; });
      }); });
    });

    var io=('IntersectionObserver' in window)?new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); } });
    },{threshold:.12}):null;
    document.querySelectorAll('.reveal').forEach(function(el){ if(io){ io.observe(el); } else { el.classList.add('revealed'); } });

    document.querySelectorAll('[data-accordion]').forEach(function(wrap){
      var btns=wrap.querySelectorAll('[data-acc-btn]');
      btns.forEach(function(btn){ btn.addEventListener('click', function(){
        var item=btn.closest('[data-acc-item]');
        var wasOpen=item.classList.contains('open');
        btns.forEach(function(x){ x.closest('[data-acc-item]').classList.remove('open'); });
        if(!wasOpen){ item.classList.add('open'); }
      }); });
    });

    document.querySelectorAll('form[data-form]').forEach(function(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var ok=true;
        form.querySelectorAll('[required]').forEach(function(f){ if(!f.value.trim()){ f.classList.add('invalid'); ok=false; } else { f.classList.remove('invalid'); } });
        if(!ok){ var warn=form.querySelector('[data-form-error]'); if(warn){ warn.style.display='block'; } return; }
        var mailto=form.getAttribute('data-mailto')||'sales@eliteboxpack.com';
        var subject=encodeURIComponent(form.getAttribute('data-subject')||'Quote request');
        var lines=[];
        form.querySelectorAll('[data-field]').forEach(function(f){ if(f.value){ lines.push(f.getAttribute('data-field')+': '+f.value); } });
        var body=encodeURIComponent(lines.join('\n'));
        var okBox=form.querySelector('[data-form-ok]');
        if(okBox){ okBox.hidden=false; }
        window.location.href='mailto:'+mailto+'?subject='+subject+'&body='+body;
      });
    });

    document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent=String(new Date().getFullYear()); });
  });
})();

/* ===== WhatsApp floating chat widget v2 (EliteBox Packaging) ===== */
(function(){
  'use strict';
  function waReady(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
  waReady(function(){
    var PHONE='8613798275895';
    function cleanTitle(){
      var t=(document.title||'');
      [' | ',' 鈥?',' - ','|',' 鈥?',' - '].forEach(function(sep){
        var i=t.indexOf(sep); if(i>0){ t=t.slice(0,i); }
      });
      return t.trim();
    }
    function pageMsg(){
      var content=/^\/(products|industries|blog)\//.test(location.pathname);
      if(!content){ return "Hello EliteBox Packaging! I'm interested in custom packaging and would like a quote. What's your MOQ and lead time? Can we chat?"; }
      return 'Hello EliteBox Packaging, I was just viewing "'+(cleanTitle()||'your page')+'" and would like a quote. What is the MOQ and lead time for this? Can we chat?';
    }
    function waLink(){ return 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(pageMsg()); }
    var css='#eb-wa{position:fixed;right:16px;bottom:16px;z-index:9990;font-family:inherit;font-size:14px}#eb-wa .eb-wa-btn{position:relative;display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.16);text-decoration:none;transition:transform .2s ease}#eb-wa .eb-wa-btn:hover{transform:scale(1.05)}#eb-wa .eb-wa-pulse{position:absolute;inset:0;border-radius:50%;background:#25D366;opacity:.3;animation:ebwa 2.6s ease-out infinite;pointer-events:none}@keyframes ebwa{0%{transform:scale(1);opacity:.35}70%{transform:scale(1.5);opacity:0}100%{transform:scale(1.5);opacity:0}}@media(prefers-reduced-motion:reduce){#eb-wa .eb-wa-pulse{animation:none}}#eb-wa .eb-wa-bubble{position:absolute;right:64px;bottom:0;width:250px;background:#fff;border:1px solid #e6e6e6;border-radius:14px;padding:12px 14px 10px;box-shadow:0 8px 24px rgba(0,0,0,.13);display:none;text-align:left}#eb-wa .eb-wa-bubble.open{display:block}#eb-wa .eb-wa-bubble .eb-wa-x{position:absolute;top:6px;right:9px;border:none;background:none;color:#999;font-size:14px;line-height:1;cursor:pointer;padding:2px}#eb-wa .eb-wa-bubble p{margin:2px 14px 10px 0;font-size:13px;line-height:1.5;color:#333}#eb-wa .eb-wa-act{display:flex;gap:8px}#eb-wa .eb-wa-act a{flex:1;text-align:center;border-radius:999px;padding:8px 6px;font-size:13px;font-weight:600;text-decoration:none}#eb-wa a.eb-wa-go{background:#25D366;color:#fff}#eb-wa .eb-wa-app{font-size:11.5px;color:#777;margin-top:9px;text-align:center}#eb-wa .eb-wa-app a{color:#128C7E;text-decoration:underline;padding:0}@media(max-width:640px), (hover:none){#eb-wa .eb-wa-bubble{display:none!important}}';
    var st=document.createElement('style'); st.id='eb-wa-css'; st.textContent=css; document.head.appendChild(st);
    var wrap=document.createElement('div'); wrap.id='eb-wa';
    var icon='<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c2 .9 4 1.3 4.7 1.3 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.6c-2 0-3.9-.6-5.6-1.7l-.4-.2-4.3 1.4 1.4-4.2-.3-.4c-1.1-1.8-1.8-3.9-1.8-6C5 9.7 9.9 4.9 16 4.9c3 0 5.8 1.2 7.9 3.3s3.3 4.9 3.3 7.9c0 6.2-4.9 8.5-11.2 8.5zm6.1-6.4c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.1-.6l-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>';
    wrap.innerHTML='<div class="eb-wa-bubble" role="dialog" aria-label="WhatsApp chat"><button class="eb-wa-x" aria-label="Close">&#10005;</button><p></p><div class="eb-wa-act"><a class="eb-wa-go" target="_blank" rel="noopener">Start chat</a></div><div class="eb-wa-app">No WhatsApp app? <a target="_blank" rel="noopener">Open WhatsApp Web</a></div></div><a class="eb-wa-btn" href="#" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">'+icon+'<span class="eb-wa-pulse"></span></a>';
    var bubble=wrap.querySelector('.eb-wa-bubble');
    bubble.querySelector('p').textContent=pageMsg();
    function openBubble(){ bubble.classList.add('open'); }
    function closeBubble(){ bubble.classList.remove('open'); }
    function bindA(a){
      if(!a){ return; }
      a.href=waLink();
      a.addEventListener('click', function(e){ e.preventDefault(); var w=window.open(a.href,'_blank','noopener'); if(w){ w.opener=null; } });
    }
    bindA(wrap.querySelector('.eb-wa-btn'));
    bindA(wrap.querySelector('.eb-wa-go'));
    var webA=wrap.querySelector('.eb-wa-app a');
    if(webA){ webA.href='https://web.whatsapp.com/send?phone='+PHONE; }
    wrap.querySelector('.eb-wa-x').addEventListener('click', closeBubble);
    wrap.addEventListener('mouseenter', openBubble);
    wrap.addEventListener('mouseleave', closeBubble);
    document.body.appendChild(wrap);
  });
})();

