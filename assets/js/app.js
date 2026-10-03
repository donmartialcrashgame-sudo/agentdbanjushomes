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

    const menu=document.getElementById('dbhMenu');
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