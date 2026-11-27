export function prepareShot() {
  const pose=new URLSearchParams(location.search).get('shot');
  const routes={cover:'#/',anggaran:'#/anggaran',transaksi:'#/transaksi',phone:'#/'};
  if(!Object.hasOwn(routes,pose)) return false;
  location.hash=routes[pose];
  document.documentElement.dataset.pose=pose;
  return true;
}
