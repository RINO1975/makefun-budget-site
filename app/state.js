import { household, categories, transactions, bills, goals, monthly } from './data.js';
const KEY='danarumah-v1';
export const freshState = () => ({ version:1, budgets:Object.fromEntries(categories.map(c=>[c.id,c.budget])), transactions:structuredClone(transactions), bills:Object.fromEntries(bills.map(b=>[b.id,b.paid])), goals:Object.fromEntries(goals.map(g=>[g.id,g.saved])), nextId:1 });
let state;
let persistent=true;
let preview=false;
const validAmount=value=>Number.isSafeInteger(value)&&value>=0&&value<=999999999999;
function validState(value) {
  return value?.version===1 && Number.isSafeInteger(value.nextId) && value.nextId>0
    && categories.every(c=>validAmount(value.budgets?.[c.id]) && value.budgets[c.id]>0)
    && goals.every(g=>validAmount(value.goals?.[g.id]))
    && bills.every(b=>typeof value.bills?.[b.id]==='boolean')
    && Array.isArray(value.transactions) && value.transactions.every(t=>typeof t.id==='string' && typeof t.description==='string' && /^2026-11-(0[1-9]|[12]\d|30)$/.test(t.date) && categories.some(c=>c.id===t.category) && validAmount(t.amount) && t.amount>0);
}
export function seedState(isPreview=false) {
  preview=isPreview;
  if(preview) {state=freshState();return state;}
  try { const saved=JSON.parse(localStorage.getItem(KEY)); state=validState(saved) ? saved : freshState(); }
  catch { state=freshState(); persistent=false; }
  return state;
}
export const getState=()=>state;
export const storageAvailable=()=>persistent;
function save() { if(preview)return; try { localStorage.setItem(KEY,JSON.stringify(state)); } catch { persistent=false; } }
export function resetState() { state=freshState(); save(); }
export function summary() {
  const income=household.income.reduce((s,p)=>s+p.amount,0);
  const items=categories.map(c=>({...c,budget:state.budgets[c.id],spent:state.transactions.filter(t=>t.category===c.id && t.date.startsWith(household.period)).reduce((s,t)=>s+t.amount,0)}));
  const actual=items.reduce((s,c)=>s+c.spent,0), budget=items.reduce((s,c)=>s+c.budget,0);
  const months=monthly.map((m,i)=>({...m,amount:i===monthly.length-1?actual:m.amount}));
  return {income,items,actual,budget,savings:income-actual,planned:income-budget,months,average:months.reduce((s,m)=>s+m.amount,0)/months.length};
}
export function addTransaction({date,description,category,amount}) {
  if (!/^2026-11-(0[1-9]|[12]\d|30)$/.test(date) || !description.trim() || !categories.some(c=>c.id===category) || !validAmount(amount) || amount<=0) throw new Error('Isi tanggal November 2026, keterangan, kategori, dan jumlah rupiah bulat di atas nol.');
  state.transactions.push({id:`added-${state.nextId++}`,date,description:description.trim().slice(0,100),category,amount}); save();
}
export function deleteTransaction(id) { state.transactions=state.transactions.filter(t=>t.id!==id); save(); }
export function editBudget(id,amount) {
  if(!categories.some(c=>c.id===id) || !validAmount(amount) || amount<=0) throw new Error('Anggaran harus berupa rupiah bulat di atas nol.');
  state.budgets[id]=amount; save();
}
export function toggleBill(id) { if(Object.hasOwn(state.bills,id)) {state.bills[id]=!state.bills[id];save();} }
export function addToGoal(id,amount) {
  if(!Object.hasOwn(state.goals,id) || !validAmount(amount) || amount<=0) throw new Error('Jumlah tabungan harus berupa rupiah bulat di atas nol.');
  if(!validAmount(state.goals[id]+amount)) throw new Error('Celengan melampaui batas pencatatan.');
  state.goals[id]+=amount;save();
}
