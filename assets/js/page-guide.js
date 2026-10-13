/* DBH Agent Portal — formal spotlight tour. */
(function () {
  'use strict';
  if (window.__dbhUniversalGuideLoaded) return;
  window.__dbhUniversalGuideLoaded = true;

  const css = `
    #dbhGuideLaunch{position:fixed!important;top:12px!important;right:18px!important;bottom:auto!important;z-index:2147483640!important;display:flex!important;align-items:center!important;gap:9px!important;padding:12px 17px!important;border:1px solid #ffffff55!important;border-radius:999px!important;background:linear-gradient(135deg,#062b52,#0b63ce)!important;color:#fff!important;font:850 12px/1.2 system-ui,sans-serif!important;box-shadow:0 8px 26px #062b5240!important;cursor:pointer!important}
    #dbhGuideLaunch:hover{transform:translateY(-1px);filter:brightness(1.08)}
    #dbhTourBackdrop{position:fixed!important;inset:0!important;z-index:2147483000!important;background:rgba(3,15,32,.72)!important;backdrop-filter:blur(2px)!important;pointer-events:none!important}
    #dbhTourSpotlight{position:fixed!important;z-index:2147483002!important;pointer-events:none!important;border:3px solid #7dd3fc!important;border-radius:13px!important;background:transparent!important;box-shadow:0 0 0 5px #38bdf833,0 0 0 9999px rgba(3,15,32,.72)!important;transition:top .22s ease,left .22s ease,width .22s ease,height .22s ease!important}
    #dbhGuidePanel{position:fixed!important;left:50%!important;bottom:18px!important;transform:translateX(-50%)!important;width:min(520px,calc(100vw - 24px))!important;max-height:48vh!important;overflow:auto!important;z-index:2147483645!important;background:#fff!important;color:#10243a!important;border:1px solid #bfdbfe!important;border-radius:20px!important;padding:20px!important;box-shadow:0 22px 70px #020d1f70!important;font:14px/1.55 system-ui,sans-serif!important;box-sizing:border-box!important}
    #dbhGuidePanel *{box-sizing:border-box!important}
    #dbhGuidePanel .dbh-guide-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:9px}
    #dbhGuidePanel .dbh-guide-kicker{font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#0b63ce}
    #dbhGuidePanel .dbh-guide-close{width:32px;height:32px;border:0;border-radius:10px;background:#eef2f7;color:#334155;font-size:20px;cursor:pointer}
    #dbhGuidePanel h3{font-size:20px!important;line-height:1.25!important;margin:5px 0 8px!important;color:#062b52!important}
    #dbhGuidePanel p{font-size:13px!important;line-height:1.65!important;color:#475569!important;margin:0!important}
    #dbhGuidePanel .dbh-guide-tip{margin-top:10px!important;padding:9px 11px!important;border-radius:10px!important;background:#eff6ff!important;color:#174a7e!important;font-size:11px!important;line-height:1.5!important}
    #dbhGuidePanel .dbh-guide-progress{height:5px;background:#eaf1fb;border-radius:99px;overflow:hidden;margin:15px 0 13px}
    #dbhGuidePanel .dbh-guide-progress span{display:block;height:100%;background:linear-gradient(90deg,#0b63ce,#38bdf8);border-radius:99px;transition:width .2s ease}
    #dbhGuidePanel .dbh-guide-actions{display:flex;align-items:center;justify-content:space-between;gap:8px}
    #dbhGuidePanel .dbh-guide-actions button{border:0;border-radius:11px;padding:11px 15px;font:850 12px system-ui,sans-serif;cursor:pointer}
    #dbhGuidePanel .dbh-guide-skip,#dbhGuidePanel .dbh-guide-prev{background:#f1f5f9;color:#475569}
    #dbhGuidePanel .dbh-guide-next{background:linear-gradient(135deg,#0759b7,#0b75e8);color:#fff;min-width:105px}
    #dbhGuidePanel button:focus-visible,#dbhGuideLaunch:focus-visible{outline:3px solid #38bdf8!important;outline-offset:3px!important}
    #dbhGuideWelcome{position:fixed!important;inset:0!important;z-index:2147483644!important;display:grid!important;place-items:center!important;padding:20px!important;background:rgba(3,15,32,.76)!important;backdrop-filter:blur(5px)!important;font-family:system-ui,sans-serif!important}
    #dbhGuideWelcome .dbh-welcome-card{width:min(560px,100%)!important;background:#fff!important;border-radius:24px!important;padding:clamp(22px,5vw,36px)!important;box-shadow:0 30px 90px #020d1f80!important;color:#10243a!important}
    #dbhGuideWelcome .dbh-welcome-icon{width:54px;height:54px;display:grid;place-items:center;background:#dbeafe;color:#0759b7;border-radius:16px;font-size:25px}
    #dbhGuideWelcome .dbh-welcome-label{font-size:10px;font-weight:900;letter-spacing:.14em;color:#0b63ce;text-transform:uppercase;margin-top:18px}
    #dbhGuideWelcome h2{font-size:clamp(25px,5vw,34px);line-height:1.1;color:#062b52;margin:8px 0 10px}
    #dbhGuideWelcome p{font-size:13px;line-height:1.75;color:#526275;margin:0 0 18px}
    #dbhGuideWelcome ul{padding-left:19px;color:#334155;font-size:12px;line-height:1.9;margin:0 0 20px}
    #dbhGuideWelcome button{width:100%;border:0;border-radius:13px;padding:14px;background:linear-gradient(135deg,#0759b7,#0b75e8);color:#fff;font-size:13px;font-weight:900;cursor:pointer}
    #dbhGuideSuccess{position:fixed!important;inset:0!important;z-index:2147483647!important;background:rgba(3,20,42,.76)!important;backdrop-filter:blur(6px)!important;display:grid!important;place-items:center!important;padding:18px!important;font-family:system-ui,sans-serif!important}
    #dbhGuideSuccess .dbh-success-card{width:min(440px,100%)!important;background:#fff!important;color:#0b2442!important;border-radius:25px!important;padding:28px 24px!important;text-align:center!important;box-shadow:0 30px 90px #020d1f70!important}
    #dbhGuideSuccess img{width:78px!important;height:78px!important;object-fit:contain!important;margin:0 auto 10px!important;display:block!important}
    #dbhGuideSuccess h2{font-size:24px!important;margin:10px 0!important;color:#062b52!important}
    #dbhGuideSuccess p{font-size:13px!important;line-height:1.6!important;color:#526275!important}
    #dbhGuideSuccess button{width:100%!important;border:0!important;border-radius:13px!important;padding:13px!important;background:#0b63ce!important;color:#fff!important;font-size:13px!important;font-weight:900!important;cursor:pointer!important}
    .dbh-guide-target{position:relative!important;z-index:2147483001!important;outline:3px solid #7dd3fc!important;outline-offset:4px!important;border-radius:10px!important;box-shadow:0 0 0 8px #38bdf833!important;scroll-margin:110px!important}
    @media(max-width:600px){#dbhGuideLaunch{top:8px!important;right:8px!important;padding:10px 12px!important;font-size:11px!important}#dbhGuidePanel{bottom:8px!important;max-height:54vh!important;padding:16px!important}#dbhGuidePanel h3{font-size:18px!important}}
    @media(prefers-reduced-motion:reduce){#dbhGuidePanel *,#dbhGuideWelcome *,#dbhTourSpotlight{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
  `;
  const style = document.createElement('style');
  style.id = 'dbhFormalTourStyles';
  style.textContent = css;
  document.head.appendChild(style);

  const path = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  const main = document.querySelector('main,.main-content,.content,.wrap,.page-content,.container,.shell') || document.body;
  const pageName = path.replace(/\.html$/,'').replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  const heading = document.querySelector('main h1,.main-content h1,.content h1,.wrap h1,h1,h2');
  const pageTitle = heading && heading.textContent.trim() ? heading.textContent.trim() : pageName;
  const launch = document.createElement('button');
  launch.id = 'dbhGuideLaunch'; launch.type = 'button';
  launch.innerHTML = '<span aria-hidden="true">✦</span><span>Start page tour</span>';
  launch.setAttribute('aria-label','Start the guided tour for this page');
  document.body.appendChild(launch);

  let panel=null, backdrop=null, spotlight=null, welcome=null, steps=[], index=0, highlighted=null, oldFocus=null;
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const visible = el => !!el && el.getClientRects().length>0 && getComputedStyle(el).visibility!=='hidden' && getComputedStyle(el).display!=='none';
  const textOf = el => ((el && (el.innerText || el.getAttribute('aria-label') || el.title)) || '').trim().replace(/\s+/g,' ').slice(0,100);
  function find(selectors){for(const selector of selectors){const el=document.querySelector(selector);if(visible(el))return el;}return null;}
  function addStep(list,title,body,selectors,tip){
    const target=selectors?find(selectors):null;
    if(selectors&&!target)return;
    if(target&&list.some(step=>step.target===target))return;
    list.push({title,body,target:target||null,tip:tip||''});
  }
  function buildSteps(){
    const s=[];
    addStep(s,'Welcome to '+pageTitle,'This guided tour walks you through the actual controls and information on this page. The screen will dim while each important area is highlighted. Read the explanation, then choose Next to continue.',null,'You can use Previous, Skip tour, the arrow keys, or Escape to close the tour.');
    addStep(s,'Your page heading','This heading tells you which area of the DBH Agent Portal you are using. Check that you are on the correct page before you submit information or make a payment.',['main h1','.pagehead h1','.page-head h1','.hero h1','h1']);
    addStep(s,'Main navigation','Use the sidebar to move between the dashboard, properties, activity, enquiries, verification, receipts, wallet, notifications and profile settings. On a phone, open the menu first if it is collapsed.',['#dbhSidebar','#agentNav','.sidebar nav','.side nav']);
    addStep(s,'Page overview and status','Cards, counters and status labels summarize the information available on this page. A status such as pending, approved, rejected or paid tells you the current state; read the label instead of assuming an action has succeeded.',['.stats','.stats-grid','.stat-grid','.dashboard-stats','.summary-cards','.quick-stats']);
    addStep(s,'Read the main information','This is the main working area for this page. Read the labels and instructions before selecting an action. Lists and tables usually contain individual records; open the matching record to inspect its details.',['main .content-card','main .card','main .panel','main .section','.main-content .card','.content .card','main table']);
    addStep(s,'Complete the form','Enter accurate information in the labelled fields. Complete every required field, check spelling and amounts, and upload only documents or images that belong to this listing or your account.',['main form','.main-content form','.content form','form']);
    addStep(s,'Upload property images','Use the image upload area to add a clear front/cover image first, then add supporting images. Preview the selected images and confirm they show the correct property before submitting.',['#imageInput','#images','input[type="file"][multiple]','input[type="file"]','.upload-area','.dropzone','.image-upload']);
    addStep(s,'Choose the main action carefully','This button submits or saves the information shown on the page. Review your entries first. For property submissions, payments and withdrawals, wait for the confirmation or result message before leaving the page.',['main button[type="submit"]','main .btn-primary','main .primary-btn','main button[data-action]','main a.btn-primary']);
    addStep(s,'Search, filters and records','If this page has search or filter controls, use them to find the correct property, payment or activity record. Check the row or card details before opening or acting on a record.',['input[type="search"]','main input[placeholder*="search" i]','main select','.filters','.filter-bar']);
    addStep(s,'Notifications and account safety','Check notifications for updates about verification, listings, payments or account activity. Never share your password, one-time codes or withdrawal PIN with another person.',['#notificationBell','.notification-bell','a[href*="notifications.html"]']);
    addStep(s,'Finish this page tour','You have reached the end of the tour for '+pageTitle+'. Close the guide and use the page normally. You can restart this guided tour whenever you need a reminder.',null,'The tour explains the controls that are present on this page; it does not submit forms or make payments for you.');
    return s;
  }
  function clean(){
    if(highlighted){highlighted.classList.remove('dbh-guide-target');highlighted=null;}
    [panel,backdrop,spotlight,welcome].forEach(el=>{if(el&&el.isConnected)el.remove();});
    panel=backdrop=spotlight=welcome=null;
    document.removeEventListener('keydown',keyHandler);
    window.removeEventListener('resize',positionSpotlight);
    window.removeEventListener('scroll',positionSpotlight,true);
    if(oldFocus&&oldFocus.focus)oldFocus.focus();
  }
  function closeTour(){clean();}
  function positionSpotlight(){
    if(!highlighted||!spotlight)return;
    const r=highlighted.getBoundingClientRect();
    const pad=5;
    spotlight.style.top=Math.max(4,r.top-pad)+'px';
    spotlight.style.left=Math.max(4,r.left-pad)+'px';
    spotlight.style.width=Math.max(12,Math.min(window.innerWidth-8,r.width+pad*2))+'px';
    spotlight.style.height=Math.max(12,Math.min(window.innerHeight-8,r.height+pad*2))+'px';
  }
  function success(){
    const el=document.createElement('div');el.id='dbhGuideSuccess';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="dbh-success-card"><img src="https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f389.gif" alt="Celebration"><h2>Tour completed!</h2><p>You have completed the guided tour of this DBH page. Start it again from the <strong>Start page tour</strong> button at the top whenever you need help.</p><button type="button">Continue to page</button></div>';
    document.body.appendChild(el);const done=()=>el.remove();el.querySelector('button').addEventListener('click',done);
  }
  function showStep(){
    if(highlighted)highlighted.classList.remove('dbh-guide-target');
    highlighted=null;
    const step=steps[index];
    if(step.target&&visible(step.target)){
      highlighted=step.target;
      highlighted.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center',inline:'nearest'});
      highlighted.classList.add('dbh-guide-target');
      positionSpotlight();
      spotlight.style.display='block';
    }else{spotlight.style.display='none';}
    const prevDisabled=index===0;
    panel.innerHTML='<div class="dbh-guide-top"><span class="dbh-guide-kicker">FORMAL PAGE TOUR · STEP '+(index+1)+' OF '+steps.length+'</span><button class="dbh-guide-close" type="button" aria-label="Close tour">×</button></div><h3>'+esc(step.title)+'</h3><p aria-live="polite">'+esc(step.body)+'</p>'+(step.tip?'<div class="dbh-guide-tip">'+esc(step.tip)+'</div>':'')+'<div class="dbh-guide-progress"><span style="width:'+((index+1)/steps.length*100)+'%"></span></div><div class="dbh-guide-actions"><button class="dbh-guide-skip" type="button">Skip tour</button><div style="display:flex;gap:7px"><button class="dbh-guide-prev" type="button" '+(prevDisabled?'disabled':'')+'>← Previous</button><button class="dbh-guide-next" type="button">'+(index===steps.length-1?'Finish tour ✓':'Next →')+'</button></div></div>';
    panel.querySelector('.dbh-guide-close').addEventListener('click',closeTour);
    panel.querySelector('.dbh-guide-skip').addEventListener('click',closeTour);
    panel.querySelector('.dbh-guide-prev').addEventListener('click',()=>{if(index>0){index--;showStep();}});
    panel.querySelector('.dbh-guide-next').addEventListener('click',()=>{if(index<steps.length-1){index++;showStep();}else{closeTour();success();}});
    const next=panel.querySelector('.dbh-guide-next');if(next)next.focus({preventScroll:true});
  }
  function keyHandler(e){
    if(e.key==='Escape'){e.preventDefault();closeTour();}
    else if(e.key==='ArrowRight'||e.key==='Enter'&&document.activeElement===panel){e.preventDefault();const b=panel&&panel.querySelector('.dbh-guide-next');if(b)b.click();}
    else if(e.key==='ArrowLeft'){e.preventDefault();const b=panel&&panel.querySelector('.dbh-guide-prev');if(b&&!b.disabled)b.click();}
  }
  function startTour(){
    clean();oldFocus=document.activeElement;
    steps=buildSteps();index=0;
    backdrop=document.createElement('div');backdrop.id='dbhTourBackdrop';backdrop.setAttribute('aria-hidden','true');document.body.appendChild(backdrop);
    spotlight=document.createElement('div');spotlight.id='dbhTourSpotlight';spotlight.setAttribute('aria-hidden','true');document.body.appendChild(spotlight);
    panel=document.createElement('section');panel.id='dbhGuidePanel';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Formal guided tour of '+pageTitle);document.body.appendChild(panel);
    document.addEventListener('keydown',keyHandler);window.addEventListener('resize',positionSpotlight);window.addEventListener('scroll',positionSpotlight,true);
    showStep();
  }
  launch.addEventListener('click',()=>{
    oldFocus=document.activeElement;
    welcome=document.createElement('div');welcome.id='dbhGuideWelcome';welcome.setAttribute('role','dialog');welcome.setAttribute('aria-modal','true');
    welcome.innerHTML='<div class="dbh-welcome-card"><div class="dbh-welcome-icon">✦</div><div class="dbh-welcome-label">D Banjus Homes · Agent Portal</div><h2>Guided tour of '+esc(pageTitle)+'</h2><p>This is a step-by-step walkthrough of the page you are currently viewing. The tour highlights real parts of the interface, explains what each area is for, and points out what to check before you take action.</p><ul><li>Follow each highlighted area in order.</li><li>Use Previous and Next to move through the explanations.</li><li>Press Escape or Skip tour to exit at any time.</li><li>The tour will not submit forms or change your account.</li></ul><button type="button">Begin guided tour →</button></div>';
    document.body.appendChild(welcome);
    welcome.querySelector('button').addEventListener('click',()=>{welcome.remove();welcome=null;startTour();});
  });
})();
