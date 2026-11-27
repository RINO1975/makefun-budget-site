const integers = new Intl.NumberFormat('id-ID', { maximumFractionDigits:0 });
export const rupiah = value => `Rp ${integers.format(value)}`;
export const number = value => integers.format(value);
const decimals = new Intl.NumberFormat('id-ID',{minimumFractionDigits:1,maximumFractionDigits:1});
export const percent = (part, total=100) => `${decimals.format(total ? part/total*100 : 0)}%`;
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dates = new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'short',timeZone:'UTC'});
export const shortDate = value => dates.format(new Date(`${value}T00:00:00Z`));
