/* DBH Agent Portal shared sidebar */
(function(){
  function init(){
    const side=document.getElementById('dbhSidebar');
    const menu=document.getElementById('dbhMenu');
    if(menu&&side) menu.addEventListener('click',()=>side.classList.toggle('open'));
    document.addEventListener('click',e=>{
      if(window.innerWidth<=850&&side&&side.classList.contains('open')&&!side.contains(e.target)&&!menu?.contains(e.target)) side.classList.remove('open');
    });
    const page=(location.pathname.split('/').pop()||'dashboard.html').toLowerCase();
    document.querySelectorAll('#dbhSidebar nav a[data-page]').forEach(a=>a.classList.toggle('active',a.dataset.page===page));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
