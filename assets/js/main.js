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
