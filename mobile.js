/* Responsive controls only; contains no model data or credentials. */
(()=>{
function enhance(d){
 if(!d||d.getElementById('family-responsive-style'))return;
 const comparison=!!d.querySelector('#layout-choice'),viewer=!!d.querySelector('#stage');
 const s=d.createElement('style');s.id='family-responsive-style';s.textContent=`
.family-menu-button,.family-menu-shade{display:none}
@media(max-width:900px){
html,body{height:100%;overflow:hidden}body{height:100dvh!important}
.family-menu-button{display:block;position:fixed;left:8px;top:${comparison?'8':'58'}px;z-index:110;padding:10px 12px;min-height:44px;border-radius:10px;border:1px solid #718478;background:#fffffff5;color:#273b33;font:600 13px system-ui;box-shadow:0 2px 10px #0002}
.family-menu-shade.open{display:block;position:fixed;inset:0;background:#0004;z-index:98}
${comparison?`body>nav{position:fixed;inset:0 auto 0 0;width:min(310px,85vw);max-height:100dvh;overflow:auto;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:20px;padding:72px 18px 25px;z-index:100;transform:translateX(-105%);border-right:1px solid #bac6bd;background:#edf1eb}body>nav.family-open{transform:translateX(0)}nav label{font-size:15px}nav select{display:block;width:100%;margin:10px 0 0}nav .modes button{flex:1;min-height:44px}nav #comparison-status{display:block}#viewer-host{height:100dvh;flex:1;width:100%}#plan-toolbar{padding:62px 8px 8px;gap:5px;flex-wrap:wrap}#plan-title{width:100%;font-size:13px}`:''}
${viewer?`header{display:none!important}.layout{height:100dvh!important;width:100%;display:block!important}aside{position:fixed;inset:0 auto 0 0;width:min(310px,85vw);height:100dvh;overflow:auto;overscroll-behavior:contain;background:#f8f7f3;z-index:100;display:block!important;transform:translateX(-105%);padding:115px 16px 32px!important;box-shadow:4px 0 20px #0002}aside.family-open{transform:translateX(0)}aside .walk-actions{margin:0 0 16px}aside h2{display:block;margin:18px 0 10px}aside label{margin-top:16px}aside .views{gap:8px}aside button,aside select{min-height:44px;font-size:14px!important}aside select{padding:8px}aside .solar-panel label{margin-top:0}#stage{position:absolute;inset:0;width:100%;height:100%}.tools{top:8px;right:8px;left:110px;justify-content:flex-end;flex-wrap:wrap;gap:4px}.tools button{min-height:40px;min-width:36px;padding:7px;font-size:12px}#area-current{top:108px;left:105px;right:8px;max-width:calc(100% - 113px);font-size:12px;padding:6px}#walk-panel{right:8px;bottom:8px}.map canvas{width:88px;height:83px}.walk-pad{grid-template-columns:repeat(3,44px)}.walk-pad button{height:44px}.walk-guide{display:none}#sun-info{bottom:8px;left:8px;right:8px;font-size:11px;padding:6px}.caption{display:none}`:''}
}`;d.head.append(s);
 if(comparison||viewer){const panel=d.querySelector(comparison?'body>nav':'aside'),toggle=d.createElement('button'),shade=d.createElement('div');toggle.className='family-menu-button';toggle.textContent=comparison?'☰ 部屋割り':'☰ 操作';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',comparison?'部屋割りメニュー':'操作メニュー');panel.id=panel.id||'family-controls';toggle.setAttribute('aria-controls',panel.id);shade.className='family-menu-shade';d.body.append(shade,toggle);
 const close=()=>{panel.classList.remove('family-open');shade.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent=comparison?'☰ 部屋割り':'☰ 操作'};
 toggle.onclick=()=>{if(panel.classList.contains('family-open'))close();else{panel.classList.add('family-open');shade.classList.add('open');toggle.setAttribute('aria-expanded','true');toggle.textContent='✕ 閉じる'}};shade.onclick=close;
 panel.addEventListener('click',e=>{if(e.target.closest(comparison?'#mode-3d,#mode-plan':'[data-view],#walk-start,#walk-stop,#site-view,#shed-view'))close()});if(comparison)d.querySelector('#layout-choice').addEventListener('change',close);d.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 }
 const hook=f=>{if(f.dataset.familyHook)return;f.dataset.familyHook='1';f.addEventListener('load',()=>enhance(f.contentDocument));try{if(f.contentDocument?.readyState==='complete')enhance(f.contentDocument)}catch(e){}};
 d.querySelectorAll('iframe').forEach(hook);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.tagName==='IFRAME')hook(n)}))).observe(d.body,{childList:true,subtree:true});
 d.defaultView.dispatchEvent(new Event('resize'));
 if(viewer){let tries=0;const fit=()=>{const api=d.defaultView.layoutBridge;if(!api?.ready()){if(tries++<600)d.defaultView.requestAnimationFrame(fit);return}const state=api.snapshot();if(!state.walking&&state.view==='all'&&state.orbit){const stage=d.querySelector('#stage').getBoundingClientRect();state.orbit.radius=Math.max(20,18*stage.height/stage.width);api.apply(state)}};d.defaultView.requestAnimationFrame(fit);d.defaultView.addEventListener('resize',()=>d.defaultView.requestAnimationFrame(fit));d.querySelector('[data-view="all"]').addEventListener('click',()=>d.defaultView.requestAnimationFrame(fit))}
}
window.FamilyMobile={enhance};enhance(document);
})();
