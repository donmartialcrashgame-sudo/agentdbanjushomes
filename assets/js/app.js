/* DBH Agent Portal — ONE shared sidebar for every agent page.
   Each page only needs <aside id="dbhSidebar" class="side"></aside>
   and this file. The sidebar markup is maintained here only. */
(function(){
  const NAV=[
    ['dashboard.html','fa-gauge-high','Overview','dashboard'],
    ['properties.html','fa-house','My Properties','propertiesNav'],
    ['add-property.html','fa-plus','Add Property','addPropertyNav'],
    ['activity.html','fa-chart-line','Activity & Reports','activityNav'],
    ['enquiries.html','fa-triangle-exclamation','Complaints & Reports','enquiriesNav'],
    ['payment-result.html','fa-receipt','Payment Receipt',''],
    ['agent-documents.html','fa-file-shield','Verification',''],
    ['notifications.html','fa-bell','Notifications',''],
    ['settings.html','fa-gear','Settings','']
  ];

  function sidebarMarkup(){
    return '<div class="agent">'+
      '<div class="avatar"><i class="fa-solid fa-user-tie"></i></div>'+
      '<strong id="name">Loading...</strong>'+
      '<small id="email">Loading...</small>'+
      '<div class="status-row"><div class="status" id="status">PENDING</div>'+
      '<img id="verifiedBadge" class="verified-badge" src="assets/images/verified-badge.svg" alt="Verified agent badge" title="Verified agent"></div>'+
      '</div>'+
      '<nav class="nav" id="agentNav">'+
      NAV.map(function(n){
        var extra=n[3]? ' id="'+n[3]+'"' : '';
        var locked=n[3] ? ' class="disabled" aria-disabled="true" href="#"' : ' href="'+n[0]+'"';
        return '<a'+extra+locked+' data-page="'+n[0]+'"><i class="fa-solid '+n[1]+'"></i> '+n[2]+(n[3]?' <i class="fa-solid fa-lock lock"></i>':'')+'</a>';
      }).join('')+
      '</nav>';
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
    const inLayout=!!side.closest('.shell,.layout');
    side.classList.toggle('dbh-floating-sidebar',!inLayout);

    if(!document.getElementById('dbhSharedSidebarStyle')){
      const style=document.createElement('style');
      style.id='dbhSharedSidebarStyle';
      style.textContent=
        /* These rules are intentionally scoped to the shared sidebar.
           Some pages use the generic class names .status/.verified-badge
           for property cards, so never let page styles resize the sidebar
           badge or position the agent status like a property-card badge. */
        '#dbhSidebar .status{position:static!important;left:auto!important;top:auto!important;right:auto!important;bottom:auto!important;display:inline-flex!important;align-items:center!important;width:auto!important;height:auto!important;min-height:0!important;padding:5px 9px!important;border-radius:999px!important;background:rgba(255,255,255,.14)!important;color:#fff!important;font-size:9px!important;font-weight:900!important;line-height:1.2!important;text-transform:uppercase!important;box-shadow:none!important;white-space:nowrap!important}'+
        '#dbhSidebar .verified-badge{display:none!important;width:32px!important;height:32px!important;max-width:32px!important;max-height:32px!important;min-width:32px!important;min-height:32px!important;object-fit:contain!important;position:static!important;margin:0!important;padding:0!important;vertical-align:middle!important}'+
        '#dbhSidebar .verified-badge.show{display:block!important}'+
        '#dbhSidebar .status-row{display:flex!important;align-items:center!important;gap:8px!important;margin-top:10px!important;position:static!important}'+
        '#dbhSidebar .agent .avatar{width:43px;height:43px;border-radius:13px;background:#ffffff1c;display:grid;place-items:center;margin-bottom:10px}'+
        '#dbhSidebar .agent strong,#dbhSidebar .agent small{position:static!important;display:block!important}'+
        '.dbh-floating-sidebar{position:fixed!important;left:0;top:72px;width:250px;height:calc(100vh - 72px);overflow:auto;background:#fff;border-right:1px solid #e2e8f0;padding:20px 14px;z-index:100;box-shadow:8px 0 25px rgba(6,43,82,.06)}'+
        '.dbh-floating-sidebar .agent{background:linear-gradient(145deg,#062b52,#0b63ce);color:#fff;border-radius:18px;padding:15px;margin-bottom:17px}'+
        '.dbh-floating-sidebar .agent strong,.dbh-floating-sidebar .agent small{display:block}'+
        '.dbh-floating-sidebar .agent strong{font-size:13px}'+
        '.dbh-floating-sidebar .agent small{font-size:9px;color:#bfdbfe;margin-top:4px}'+
        '.dbh-floating-sidebar .status-row{display:flex;align-items:center;gap:8px;margin-top:10px}'+
        '.dbh-floating-sidebar .nav{display:grid;gap:4px}'+
        '.dbh-floating-sidebar .nav a{padding:12px;border-radius:11px;color:#475569;font-size:12px;font-weight:800;display:flex;align-items:center;gap:11px;text-decoration:none}'+
        '.dbh-floating-sidebar .nav a.active,.dbh-floating-sidebar .nav a:hover{background:#eff6ff;color:#0b63ce}'+
        '.dbh-floating-sidebar .nav a.disabled{opacity:.48;cursor:not-allowed}'+
        '.dbh-floating-sidebar .nav .lock{margin-left:auto}'+
        '.dbh-floating-sidebar~.wrap,.dbh-floating-sidebar~main{margin-left:250px}'+
        '.dbh-mobile-toggle{display:none;position:fixed;left:12px;bottom:14px;width:46px;height:46px;border:0;border-radius:50%;background:#0b63ce;color:#fff;z-index:101;box-shadow:0 8px 25px rgba(6,43,82,.25)}'+
        '@media(max-width:850px){.dbh-floating-sidebar{left:-270px!important;transition:left .2s}.dbh-floating-sidebar.open{left:0!important}.dbh-floating-sidebar~.wrap,.dbh-floating-sidebar~main{margin-left:0}.dbh-mobile-toggle{display:grid;place-items:center}}';
      document.head.appendChild(style);
    }

    let menu=document.getElementById('dbhMenu');
    if(!menu && !inLayout){
      menu=document.createElement('button');
      menu.id='dbhMenu';
      menu.className='dbh-mobile-toggle';
      menu.type='button';
      menu.innerHTML='<i class="fa-solid fa-bars"></i>';
      menu.setAttribute('aria-label','Open agent menu');
      document.body.appendChild(menu);
    }
    if(menu){
      menu.addEventListener('click',function(e){
        e.preventDefault();
        side.classList.toggle('open');
      });
    }

    document.addEventListener('click',function(e){
      if(window.innerWidth<=850 && side.classList.contains('open') &&
         !side.contains(e.target) && !menu?.contains(e.target)){
        side.classList.remove('open');
      }
    });

    const page=(location.pathname.split('/').pop()||'dashboard.html').toLowerCase();
    document.querySelectorAll('#dbhSidebar nav a[data-page]').forEach(function(a){
      a.classList.toggle('active',a.dataset.page===page);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();