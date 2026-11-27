import { verifySample } from './data.js';
import { seedState, resetState, storageAvailable } from './state.js';
import { prepareShot } from './shots.js';
import { mountRouter } from './router.js';
verifySample();
const preview=prepareShot();
seedState(preview);
let timer;
function notify(message) {
  const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('visible');
  clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('visible'),4200);
}
const refresh=mountRouter(notify);
document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();document.querySelector('#app').focus();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelector('#nav-menu').hidden=true;document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');}});
document.querySelector('#menu-toggle').addEventListener('click',event=>{const menu=document.querySelector('#nav-menu');menu.hidden=!menu.hidden;event.currentTarget.setAttribute('aria-expanded',String(!menu.hidden));});
document.addEventListener('click',event=>{if(event.target.closest('[data-reset]')&&confirm('Kembalikan seluruh data ke keluarga contoh? Anggaran, transaksi, tagihan, dan tujuan yang Anda ubah akan direset.')){resetState();refresh();notify('Seluruh data kembali ke contoh Wijaya.');}});
if(!storageAvailable()) notify('Penyimpanan browser tidak tersedia. Perubahan hanya bertahan selama halaman ini terbuka.');
