import { rupiah, percent } from './format.js';
export function progress(value, target, color='#1B4332') {
  const width = target ? Math.min(100, Math.max(0,value/target*100)) : 0;
  return `<svg class="progress" viewBox="0 0 400 7" preserveAspectRatio="none" role="img" aria-label="${percent(value,target)}"><rect width="400" height="7" rx="3.5" fill="#EDEEE6"/><rect width="${width*4}" height="7" rx="3.5" fill="${color}"/></svg>`;
}
export function donut(items) {
  const total = items.reduce((s,c)=>s+c.spent,0), circumference=2*Math.PI*70;
  let offset=0;
  const rings=items.map(c=>{
    const length=total ? c.spent/total*circumference : 0;
    const ring=`<circle cx="100" cy="100" r="70" fill="none" stroke="${c.color}" stroke-width="25.5" stroke-dasharray="${length} ${circumference-length}" stroke-dashoffset="${-offset}" transform="rotate(-90 100 100)"><title>${c.name}: ${rupiah(c.spent)}</title></circle>`;
    offset+=length; return ring;
  }).join('');
  return `<svg class="donut" viewBox="0 0 200 200" role="img" aria-label="Komposisi pengeluaran ${rupiah(total)}">${rings}<text x="100" y="95" text-anchor="middle" class="svg-small">Total belanja</text><text x="100" y="119" text-anchor="middle" class="svg-total">${(total/1000000).toFixed(2).replace('.',',')} jt</text></svg>`;
}
export function bars(months) {
  const max=Math.max(...months.map(m=>m.amount),1)*1.13;
  const guides=[0,5,10].map(n=>{const y=132-n*1000000/max*112;return `<line x1="33" y1="${y}" x2="565" y2="${y}" stroke="#ECEEE8" stroke-dasharray="3 4"/><text x="22" y="${y+4}" text-anchor="end" class="axis">${n}</text>`;}).join('');
  return `<svg class="bars" viewBox="0 0 580 160" role="img" aria-label="Grafik pengeluaran Januari hingga November 2026, dalam juta rupiah">${guides}${months.map((m,i)=>{const h=m.amount/max*112,x=45+i*47;return `<rect x="${x}" y="${132-h}" width="26" height="${h}" rx="4" fill="${i===10?'#1B4332':'#DCE4D7'}"><title>${m.month}: ${rupiah(m.amount)}</title></rect>${i===10?`<text x="${x+13}" y="${123-h}" text-anchor="middle" class="bar-value">${(m.amount/1000000).toFixed(2).replace('.',',')}</text>`:''}<text x="${x+13}" y="153" text-anchor="middle" class="axis ${i===10?'current':''}">${m.month}</text>`;}).join('')}</svg>`;
}
