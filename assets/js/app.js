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
      '#dbhSidebar{background:#fff;border-right:1px solid #e2e8f0;padding:22px 14px;overflow:auto}'+
      '#dbhSidebar .agent{background:linear-gradient(145deg,#062b52,#0b63ce);color:#fff;border-radius:18px;padding:16px;margin-bottom:18px}'+
      '#dbhSidebar .agent .avatar{width:43px!important;height:43px!important;border-radius:13px;background:#ffffff1c;display:grid!important;place-items:center;margin:0 0 12px!important;font-size:18px;position:static!important}'+
      '#dbhSidebar .agent strong{display:block!important;font-size:13px!important;line-height:1.3;color:#fff;position:static!important;margin:0}'+
      '#dbhSidebar .agent small{display:block!important;font-size:9px!important;line-height:1.3;color:#bfdbfe!important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:static!important;margin:4px 0 0}'+
      '#dbhSidebar .status-row{display:flex!important;align-items:center!important;gap:7px!important;margin-top:10px!important;position:static!important}'+
      '#dbhSidebar .status-dot{width:7px!important;height:7px!important;border-radius:50%!important;background:#f59e0b!important;box-shadow:0 0 0 3px #ffffff18!important;flex:0 0 7px!important}'+
      '#dbhSidebar .status{position:static!important;display:inline-flex!important;align-items:center!important;width:auto!important;height:auto!important;min-height:0!important;padding:5px 8px!important;margin:0!important;border-radius:999px!important;background:#ffffff18!important;color:#dbeafe!important;font-size:8px!important;font-weight:900!important;line-height:1!important;text-transform:uppercase!important;box-shadow:none!important;white-space:nowrap!important}'+
      '#dbhSidebar .verified-badge{display:none!important;width:34px!important;height:34px!important;max-width:34px!important;max-height:34px!important;min-width:34px!important;min-height:34px!important;object-fit:contain!important;position:static!important;margin:0!important;padding:0!important;filter:drop-shadow(0 5px 8px #0003)}'+
      '#dbhSidebar .verified-badge.show{display:block!important}'+
      '#dbhSidebar .nav{display:grid!important;gap:4px!important;margin:0!important;padding:0!important;list-style:none!important}'+
      '#dbhSidebar .nav a{box-sizing:border-box!important;width:100%!important;min-height:42px!important;padding:12px!important;margin:0!important;border-radius:11px!important;color:#475569!important;background:transparent!important;font-size:12px!important;font-weight:800!important;line-height:1.2!important;display:flex!important;align-items:center!important;gap:11px!important;text-decoration:none!important;position:static!important}'+
      '#dbhSidebar .nav a i:first-child{width:17px!important;min-width:17px!important;text-align:center!important;color:inherit!important;font-size:13px!important}'+
      '#dbhSidebar .nav a span{display:block!important;flex:1!important;white-space:nowrap!important}'+
      '#dbhSidebar .nav a.active,#dbhSidebar .nav a:hover{background:#eff6ff!important;color:#0b63ce!important}'+
      '#dbhSidebar .nav .lock{display:none!important}'+
      '.dbh-floating-sidebar{position:fixed!important;left:0;top:72px;width:250px;height:calc(100vh - 72px);z-index:100;box-shadow:8px 0 25px rgba(6,43,82,.06)}'+
      '.dbh-floating-sidebar~.wrap,.dbh-floating-sidebar~main{margin-left:250px}'+
      '.dbh-mobile-toggle{display:none;position:fixed;left:12px;bottom:14px;width:46px;height:46px;border:0;border-radius:50%;background:#0b63ce;color:#fff;z-index:101;box-shadow:0 8px 25px rgba(6,43,82,.25)}'+
      '@media(max-width:900px){#dbhSidebar{position:fixed!important;z-index:100;left:-275px;top:72px;width:260px;height:calc(100vh - 72px);transition:left .25s;box-shadow:10px 0 35px #0002}#dbhSidebar.open{left:0!important}.dbh-floating-sidebar~.wrap,.dbh-floating-sidebar~main{margin-left:0}.dbh-mobile-toggle{display:grid;place-items:center}}';
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

    const menu=document.getElementById('dbhMenu');
    if(menu){
      menu.addEventListener('click',function(e){
        e.preventDefault();
        side.classList.toggle('open');
      });
    }

    const overlay=document.getElementById('mobileOverlay');
    function closeSidebar(){side.classList.remove('open');if(overlay)overlay.classList.remove('show')}
    if(overlay && !overlay.dataset.wired){
      overlay.dataset.wired='1';
      overlay.addEventListener('click',closeSidebar);
    }
    document.addEventListener('click',function(e){
      if(window.innerWidth<=900 && side.classList.contains('open') &&
         !side.contains(e.target) && !menu?.contains(e.target)){
        closeSidebar();
      }
    });

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
    if(statusEl && window.MutationObserver){
      new MutationObserver(syncVerificationBadge).observe(statusEl,{childList:true,subtree:true,characterData:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();