/* DBH Agent Portal — ONE shared sidebar for every agent page. */
(function(){
  const NAV=[
    ['dashboard.html','fa-gauge-high','Overview','dashboard'],
    ['properties.html','fa-house','My Properties','propertiesNav'],
    ['add-property.html','fa-house-circle-plus','Add Property','addPropertyNav'],
    ['activity.html','fa-chart-line','Activity & Reports','activityNav'],
    ['enquiries.html','fa-flag','Complaints & Reports','enquiriesNav'],
    ['payment-result.html','fa-file-invoice-dollar','Payment Receipts',''],
    ['agent-documents.html','fa-id-card','Verification',''],
    ['notifications.html','fa-bell','Notifications',''],
    ['settings.html','fa-sliders','Settings','']
  ];

  function sidebarMarkup(){
    return '<div class="agent">'+
      '<div class="avatar"><i class="fa-solid fa-user"></i></div>'+
      '<strong id="name">Loading...</strong>'+
      '<small id="email">Loading...</small>'+
      '<div class="status-row"><span class="status-dot" aria-hidden="true"></span><div class="status" id="status">PENDING</div>'+
      '<img id="verifiedBadge" class="verified-badge" src="assets/images/verified-badge.svg" alt="Verified agent badge" title="Verified agent"></div>'+
      '</div>'+
      '<nav class="nav" id="agentNav">'+
      NAV.map(function(n){
        var extra=n[3] ? ' id="'+n[3]+'"' : '';
        return '<a'+extra+' href="'+n[0]+'" data-page="'+n[0]+'"><i class="fa-solid '+n[1]+'"></i><span>'+n[2]+'</span></a>';
      }).join('')+
      '</nav>';
  }

  function injectStyles(){
    if(document.getElementById('dbhSharedSidebarStyle')) return;
    const style=document.createElement('style');
    style.id='dbhSharedSidebarStyle';
    style.textContent=
      ':root{--dbh-blue:#0b63ce;--dbh-deep:#062b52;--dbh-soft:#eff6ff}'+
      '#dbhSidebar{background:linear-gradient(180deg,#fff 0%,#fbfdff 100%)!important;border-right:1px solid #e2e8f0!important;padding:18px 13px!important;overflow:auto!important;scrollbar-width:thin!important;box-shadow:4px 0 24px rgba(6,43,82,.035)!important}'+
      '#dbhSidebar .agent{position:relative!important;overflow:hidden!important;background:linear-gradient(145deg,#031d39 0%,#062b52 42%,#0b63ce 100%)!important;color:#fff!important;border-radius:20px!important;padding:17px!important;margin:0 0 17px!important;box-shadow:0 14px 30px rgba(6,43,82,.18)!important;animation:dbhSideCard .55s cubic-bezier(.2,.8,.2,1) both!important}'+
      '#dbhSidebar .agent:before{content:"";position:absolute;inset:-45% -20% auto auto;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.09);filter:blur(2px);pointer-events:none!important}'+
      '#dbhSidebar .agent:after{content:"";position:absolute;left:-40px;bottom:-70px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.05);pointer-events:none!important}'+
      '#dbhSidebar .agent .avatar{position:relative!important;z-index:1!important;width:45px!important;height:45px!important;border-radius:14px!important;background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.16)!important;display:grid!important;place-items:center!important;margin:0 0 12px!important;font-size:18px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 8px 18px rgba(0,0,0,.12)!important;animation:dbhAvatarFloat 3.5s ease-in-out infinite!important}'+
      '#dbhSidebar .agent strong{position:relative!important;z-index:1!important;display:block!important;font-size:13px!important;line-height:1.35!important;color:#fff!important;margin:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+
      '#dbhSidebar .agent small{position:relative!important;z-index:1!important;display:block!important;font-size:9px!important;line-height:1.3!important;color:#bfdbfe!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;margin:4px 0 0!important}'+
      '#dbhSidebar .status-row{position:relative!important;z-index:1!important;display:flex!important;align-items:center!important;gap:7px!important;margin-top:11px!important}'+
      '#dbhSidebar .status-dot{width:7px!important;height:7px!important;border-radius:50%!important;background:#f59e0b!important;box-shadow:0 0 0 3px rgba(255,255,255,.1),0 0 12px rgba(245,158,11,.55)!important;flex:0 0 7px!important;animation:dbhPulse 2s ease-in-out infinite!important}'+
      '#dbhSidebar .status{position:static!important;display:inline-flex!important;align-items:center!important;width:auto!important;height:auto!important;min-height:0!important;padding:5px 8px!important;margin:0!important;border-radius:999px!important;background:rgba(255,255,255,.12)!important;border:1px solid rgba(255,255,255,.1)!important;color:#dbeafe!important;font-size:8px!important;font-weight:900!important;line-height:1!important;text-transform:uppercase!important;box-shadow:none!important;white-space:nowrap!important}'+
      '#dbhSidebar .verified-badge{display:none!important;width:29px!important;height:29px!important;max-width:29px!important;max-height:29px!important;min-width:29px!important;min-height:29px!important;object-fit:contain!important;position:static!important;margin:0 0 0 2px!important;padding:0!important;filter:drop-shadow(0 4px 8px rgba(0,0,0,.3))!important;animation:dbhBadgeIn .35s ease both!important}'+
      '#dbhSidebar .verified-badge.show{display:block!important}'+
      '#dbhSidebar .nav{display:grid!important;gap:5px!important;margin:0!important;padding:0!important;list-style:none!important}'+
      '#dbhSidebar .nav a{box-sizing:border-box!important;width:100%!important;min-height:44px!important;padding:11px 12px!important;margin:0!important;border-radius:13px!important;color:#526275!important;background:transparent!important;border:1px solid transparent!important;font-size:11px!important;font-weight:800!important;line-height:1.2!important;display:flex!important;align-items:center!important;gap:11px!important;text-decoration:none!important;position:relative!important;transition:background .2s ease,color .2s ease,transform .2s ease,box-shadow .2s ease!important;animation:dbhNavIn .35s both!important}'+
      '#dbhSidebar .nav a:nth-child(2){animation-delay:.03s!important}#dbhSidebar .nav a:nth-child(3){animation-delay:.06s!important}#dbhSidebar .nav a:nth-child(4){animation-delay:.09s!important}#dbhSidebar .nav a:nth-child(5){animation-delay:.12s!important}#dbhSidebar .nav a:nth-child(6){animation-delay:.15s!important}#dbhSidebar .nav a:nth-child(7){animation-delay:.18s!important}#dbhSidebar .nav a:nth-child(8){animation-delay:.21s!important}#dbhSidebar .nav a:nth-child(9){animation-delay:.24s!important}'+
      '#dbhSidebar .nav a:before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:99px;background:var(--dbh-blue);transform:scaleY(0);transition:transform .2s ease!important}'+
      '#dbhSidebar .nav a i:first-child{width:19px!important;min-width:19px!important;text-align:center!important;color:inherit!important;font-size:13px!important;transition:transform .2s ease,color .2s ease!important}'+
      '#dbhSidebar .nav a span{display:block!important;flex:1!important;white-space:nowrap!important}'+
      '#dbhSidebar .nav a.active{background:linear-gradient(90deg,#eaf3ff,#f7fbff)!important;color:var(--dbh-blue)!important;border-color:#dbeafe!important;box-shadow:0 7px 18px rgba(11,99,206,.08)!important}'+
      '#dbhSidebar .nav a.active:before{transform:scaleY(1)!important}'+
      '#dbhSidebar .nav a.active i:first-child{transform:translateX(1px) scale(1.05)!important}'+
      '#dbhSidebar .nav a:hover{background:#f5f9ff!important;color:var(--dbh-blue)!important;transform:translateX(2px)!important}'+
      '#dbhSidebar .nav a:hover i:first-child{transform:scale(1.08)!important}'+
      '#dbhSidebar .nav a.disabled{opacity:.52!important;cursor:not-allowed!important;transform:none!important}'+
      '#dbhSidebar .nav a.disabled:hover{background:transparent!important;color:#526275!important}'+
      '#dbhSidebar .nav .lock{margin-left:auto!important;color:#94a3b8!important;font-size:9px!important;width:auto!important;min-width:auto!important}'+
      '.dbh-sidebar-overlay{display:none;position:fixed;inset:72px 0 0 0;background:rgba(2,18,35,.38);backdrop-filter:blur(2px);z-index:99;opacity:0;transition:opacity .2s ease!important}'+
      '.dbh-sidebar-overlay.show{display:block;opacity:1}'+
      '@keyframes dbhSideCard{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'+
      '@keyframes dbhNavIn{from{opacity:0;transform:translateX(-7px)}to{opacity:1;transform:none}}'+
      '@keyframes dbhAvatarFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}'+
      '@keyframes dbhPulse{0%,100%{box-shadow:0 0 0 3px rgba(255,255,255,.1),0 0 8px rgba(245,158,11,.3)}50%{box-shadow:0 0 0 4px rgba(255,255,255,.1),0 0 15px rgba(245,158,11,.7)}}'+
      '@keyframes dbhBadgeIn{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}'+
      '#dbhSidebar .nav a:hover i:first-child{animation:dbhIconPop .45s ease both!important}'+
      '#dbhSidebar .nav a.active i:first-child{animation:dbhIconFloat 2.4s ease-in-out infinite!important}'+
      '.top .iconbtn i,.top .icon i,.top-actions .icon i,.top-actions .bell i{transition:transform .2s ease,color .2s ease!important}'+
      '.top .iconbtn:hover i,.top .icon:hover i,.top-actions .icon:hover i,.top-actions .bell:hover i{transform:translateY(-2px) scale(1.08)!important}'+
      '.btn i,.paybtn i,.dismissbtn i,.hero-btn i,.quick-icon i,.staticon i,.head-icon i,.ico i,.empty i{transition:transform .25s ease!important}'+
      '.btn:hover i,.paybtn:hover i,.dismissbtn:hover i,.hero-btn:hover i,.quick-card:hover .quick-icon i,.stat:hover .staticon i,.setting-card:hover .head-icon i,.item:hover .ico i{transform:translateY(-2px) scale(1.08)!important}'+
      '.pagehead .eyebrow,.page-head .eyebrow,.welcome .eyebrow{animation:dbhEyebrow 2.8s ease-in-out infinite!important}'+
      '@keyframes dbhIconPop{0%{transform:scale(1)}45%{transform:scale(1.2) rotate(-4deg)}100%{transform:scale(1)}}'+
      '@keyframes dbhIconFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}'+
      '@keyframes dbhEyebrow{0%,100%{opacity:.82}50%{opacity:1;letter-spacing:.17em}}'+
      '@media(max-width:900px){#dbhSidebar{position:fixed!important;z-index:100!important;left:-275px!important;top:72px!important;width:260px!important;height:calc(100vh - 72px)!important;transition:left .28s cubic-bezier(.2,.8,.2,1)!important;box-shadow:12px 0 35px rgba(0,0,0,.16)!important}#dbhSidebar.open{left:0!important}.dbh-sidebar-overlay.show{display:block!important}.dbh-floating-sidebar~.wrap,.dbh-floating-sidebar~main{margin-left:0!important}}'+
      '@media(prefers-reduced-motion:reduce){#dbhSidebar *,#dbhSidebar *:before,#dbhSidebar *:after{animation:none!important;transition:none!important}}';
    document.head.appendChild(style);
  }

  function init(){
    let side=document.getElementById('dbhSidebar');
    if(!side){
      side=document.createElement('aside');
      side.id='dbhSidebar';
      side.className='side';
      const shell=document.querySelector('.shell,.layout');
      if(shell) shell.insertBefore(side,shell.firstElementChild);
      else document.body.insertBefore(side,document.body.firstChild);
    }
    side.innerHTML=sidebarMarkup();
    injectStyles();

    const inLayout=!!side.closest('.shell,.layout');
    side.classList.toggle('dbh-floating-sidebar',!inLayout);

    let overlay=document.getElementById('dbhSidebarOverlay');
    if(!overlay){
      overlay=document.createElement('div');
      overlay.id='dbhSidebarOverlay';
      overlay.className='dbh-sidebar-overlay';
      document.body.appendChild(overlay);
    }
    const menu=document.getElementById('dbhMenu');
    const closeSidebar=function(){side.classList.remove('open');overlay.classList.remove('show')};
    if(menu && !menu.dataset.wired){
      menu.dataset.wired='1';
      menu.addEventListener('click',function(e){e.preventDefault();side.classList.toggle('open');overlay.classList.toggle('show',side.classList.contains('open'));});
    }
    if(!overlay.dataset.wired){
      overlay.dataset.wired='1';
      overlay.addEventListener('click',closeSidebar);
    }
    document.addEventListener('click',function(e){
      if(window.innerWidth<=900 && side.classList.contains('open') && !side.contains(e.target) && !menu?.contains(e.target)) closeSidebar();
    });
    window.addEventListener('resize',function(){if(window.innerWidth>900) closeSidebar();});


    const page=(location.pathname.split('/').pop()||'dashboard.html').toLowerCase();
    document.querySelectorAll('#dbhSidebar nav a[data-page]').forEach(function(a){
      a.classList.toggle('active',a.dataset.page===page);
    });

    const statusEl=document.getElementById('status');
    const badge=document.getElementById('verifiedBadge');
    const dot=document.querySelector('#dbhSidebar .status-dot');
    function syncVerificationBadge(){
      const value=String(statusEl?.textContent||'').trim().toLowerCase();
      const verified=['verified','approved','active'].includes(value);
      if(badge) badge.classList.toggle('show',verified);
      if(dot){
        dot.style.background=verified?'#22c55e':value==='rejected'||value==='suspended'?'#ef4444':'#f59e0b';
      }
    }
    syncVerificationBadge();
    window.DBHAgentSidebar={
      setAccess:function(open){
        document.querySelectorAll('#dbhSidebar a[data-page]').forEach(function(link){
          const gated=['properties.html','add-property.html','activity.html','enquiries.html'].includes(link.dataset.page);
          if(!gated) return;
          let lock=link.querySelector('.lock');
          if(open){
            link.classList.remove('disabled');
            link.classList.add('unlocked');
            link.href=link.dataset.page;
            link.removeAttribute('aria-disabled');
            if(lock) lock.remove();
          }else{
            link.classList.add('disabled');
            link.classList.remove('unlocked');
            link.href='#';
            link.setAttribute('aria-disabled','true');
            if(!lock){lock=document.createElement('i');lock.className='fa-solid fa-lock lock';link.appendChild(lock);}
          }
        });
      }
    };
    async function loadAgentProfile(){
      try{
        if(!window.supabase||!window.supabase.createClient) return;
        const client=window.DBHSupabaseClient||(window.DBHSupabaseClient=window.supabase.createClient('https://cpgajlsyuieeengdnamy.supabase.co','sb_publishable_fbcJT-QGKyZg0tDkpbDkOQ_CcQf2ugW'));
        const sessionResult=await client.auth.getSession();
        const session=sessionResult&&sessionResult.data&&sessionResult.data.session;
        if(!session) return;
        const uid=session.user.id;
        const q=await client.from('agent_applications').select('full_name,email,status,session_status').eq('user_id',uid).maybeSingle();
        const a=q&&q.data;
        const nameEl=document.getElementById('name'),emailEl=document.getElementById('email');
        if(nameEl) nameEl.textContent=(a&&a.full_name)||session.user.user_metadata?.full_name||session.user.email?.split('@')[0]||'DBH Agent';
        if(emailEl) emailEl.textContent=(a&&a.email)||session.user.email||'';
        if(statusEl) statusEl.textContent=(a&&a.status)||((a&&a.session_status)||'PENDING');
        syncVerificationBadge();
      }catch(err){ console.warn('DBH sidebar profile load failed:',err); }
    }
    loadAgentProfile();

    if(statusEl && window.MutationObserver){
      new MutationObserver(syncVerificationBadge).observe(statusEl,{childList:true,subtree:true,characterData:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();