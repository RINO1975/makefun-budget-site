import { renderDashboard, renderBudget, renderTransactions, renderBills, renderGoals, renderReport, renderReference, bindView } from './views.js';
const routes={ '#/':['Dasbor',renderDashboard], '#/anggaran':['Anggaran',renderBudget], '#/transaksi':['Catat & Riwayat',renderTransactions], '#/tagihan':['Tagihan Rutin',renderBills], '#/tujuan':['Tujuan Tabungan',renderGoals], '#/laporan':['Laporan',renderReport], '#/acuan':['Acuan & Sumber',renderReference] };
export function mountRouter(notify) {
  const render=()=>{
    const route=routes[location.hash]||routes['#/'];
    document.body.dataset.page=(routes[location.hash]?location.hash:'#/').slice(2)||'dasbor';
    document.querySelector('#app').innerHTML=route[1]();
    document.title=`${route[0]} · DanaRumah`;
    document.querySelectorAll('nav a').forEach(a=>{if(a.hash===(routes[location.hash]?location.hash:'#/')) a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    bindView(render,notify);
  };
  addEventListener('hashchange',()=>{render();window.scrollTo(0,0);document.querySelector('#app').focus({preventScroll:true});document.querySelector('#nav-menu').hidden=true;document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');});
  render(); return render;
}
