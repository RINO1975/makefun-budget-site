// Seluruh angka sumber DanaRumah. Nilai uang disimpan dalam rupiah bulat.
export const household = { name: 'Wijaya', members: 4, city: 'Jakarta', month: 'November 2026', period: '2026-11', today: '2026-11-26', income: [{ name: 'Ayah', amount: 7000000 }, { name: 'Ibu', amount: 5000000 }] };
export const categories = [
  { id: 'food', name: 'Makanan & Belanja Harian', short: 'Makanan', budget: 2800000, actual: 2745000, color: '#1B4332', symbol: '01' },
  { id: 'home', name: 'Perumahan', detail: 'Sewa + listrik + air + internet', short: 'Perumahan', budget: 2400000, actual: 2385000, color: '#527864', symbol: '02' },
  { id: 'transport', name: 'Transportasi', short: 'Transportasi', budget: 1200000, actual: 1312000, color: '#9BAF89', symbol: '03' },
  { id: 'education', name: 'Pendidikan', short: 'Pendidikan', budget: 1500000, actual: 1500000, color: '#C9C59E', symbol: '04' },
  { id: 'health', name: 'Kesehatan', short: 'Kesehatan', budget: 400000, actual: 285000, color: '#D97706', symbol: '05' },
  { id: 'fun', name: 'Hiburan & Gaya Hidup', short: 'Hiburan', budget: 600000, actual: 742000, color: '#C2410C', symbol: '06' },
  { id: 'clothes', name: 'Pakaian & Perawatan', short: 'Pakaian', budget: 350000, actual: 298000, color: '#B68C76', symbol: '07' },
  { id: 'other', name: 'Lain-lain', short: 'Lain-lain', budget: 150000, actual: 96000, color: '#D9CDB8', symbol: '08' }
];
const entries = [
  ['food',3,'Pasar Tradisional',385000], ['food',6,'Supermarket',512000], ['food',10,'Pasar Tradisional',340000], ['food',14,'Supermarket',468000], ['food',20,'Pasar Tradisional',395000], ['food',25,'Supermarket',645000],
  ['home',1,'Internet',345000], ['home',10,'Air PDAM',165000], ['home',15,'Sewa Rumah',1400000], ['home',20,'Listrik PLN',475000],
  ['transport',2,'Bensin',250000], ['transport',8,'Ojek Online',186000], ['transport',12,'Bensin',250000], ['transport',16,'Tol',145000], ['transport',19,'Ojek Online',231000], ['transport',24,'Bensin',250000],
  ['education',5,'SPP Anak 1',850000], ['education',5,'SPP Anak 2',650000],
  ['health',7,'Apotek',96000], ['health',10,'BPJS Kesehatan',150000], ['health',18,'Vitamin',39000],
  ['fun',9,'Bioskop & Makan',320000], ['fun',15,'Langganan Streaming',129000], ['fun',22,'Kafe',293000],
  ['clothes',11,'Pakaian Anak',185000], ['clothes',21,'Potong Rambut',113000], ['other',13,'Pulsa',50000], ['other',26,'Parkir & Lainnya',46000]
];
export const transactions = entries.map(([category, day, description, amount], i) => ({ id: `sample-${i+1}`, date: `2026-11-${String(day).padStart(2,'0')}`, category, description, amount }));
export const bills = [
  { id:'internet', name:'Internet', amount:345000, day:1, paid:true },
  { id:'school1', name:'SPP Anak 1', amount:850000, day:5, paid:true },
  { id:'school2', name:'SPP Anak 2', amount:650000, day:5, paid:true },
  { id:'water', name:'Air PDAM', amount:165000, day:10, paid:true },
  { id:'bpjs', name:'BPJS Kesehatan', amount:150000, day:10, paid:true },
  { id:'motor', name:'Cicilan Motor', amount:785000, day:15, paid:false },
  { id:'electric', name:'Listrik PLN', amount:475000, day:20, paid:true }
];
export const goals = [
  { id:'emergency', name:'Dana Darurat', target:30000000, saved:18450000, symbol:'✦', note:'Pegangan saat tak terduga' },
  { id:'house', name:'DP Rumah', target:150000000, saved:42000000, symbol:'⌂', note:'Selangkah menuju rumah sendiri' },
  { id:'education', name:'Pendidikan Anak', target:25000000, saved:9750000, symbol:'▤', note:'Bekal untuk masa depan mereka' },
  { id:'holiday', name:'Liburan Keluarga', target:8000000, saved:5200000, symbol:'☀', note:'Waktu bersama yang bermakna' }
];
export const monthly = [ ['Jan',9120000],['Feb',8940000],['Mar',9580000],['Apr',9210000],['Mei',9860000],['Jun',9340000],['Jul',10120000],['Agu',9450000],['Sep',9280000],['Okt',9510000],['Nov',9363000] ].map(([month,amount])=>({month,amount}));
export const benchmarks = {
  march: { year:2025, source:'BPS Susenas Maret 2025', title:'Pengeluaran untuk Konsumsi Penduduk Indonesia Maret 2025', total:1570000, food:775500, nonfood:793600, urban:1810000, rural:1210000 },
  september: { year:2025, source:'BPS Susenas September 2025', total:1584473, food:804430, nonfood:780042 },
  health: { year:2025, source:'BPS Profil Statistik Kesehatan 2025', amount:28366 },
  wage: { year:2025, source:'UMP DKI Jakarta 2025', amount:5396761 },
  allocation: { source:'Panduan 50/30/20', needs:8227000, wants:1136000, savings:2637000, ideal:[50,30,20] }
};

// Pemeriksaan paket contoh: semua 28 transaksi yang dirinci harus tetap utuh.
export function verifySample() {
  const totals=Object.fromEntries(categories.map(c=>[c.id,transactions.filter(t=>t.category===c.id).reduce((sum,t)=>sum+t.amount,0)]));
  for(const category of categories) if(totals[category.id]!==category.actual) throw new Error(`Total contoh tidak cocok: ${category.name}`);
  const total=Object.values(totals).reduce((sum,value)=>sum+value,0);
  const income=household.income.reduce((sum,p)=>sum+p.amount,0);
  const split=benchmarks.allocation;
  const needs=categories.filter(c=>['food','home','transport','education','health'].includes(c.id)).reduce((sum,c)=>sum+c.actual,0);
  if(needs!==split.needs || total-needs!==split.wants) throw new Error('Pembagian kebutuhan dan keinginan tidak cocok.');
  if(total!==9363000 || categories.reduce((sum,c)=>sum+c.budget,0)!==9400000 || split.needs+split.wants+split.savings!==income || income-total!==split.savings) throw new Error('Angka keluarga contoh tidak seimbang.');
  return {transactions:transactions.length,totals,total,income,allocation:split.needs+split.wants+split.savings};
}
