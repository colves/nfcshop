import '@fontsource-variable/manrope';
import './account-demo.css';

const status = document.querySelector('#copy-status');
const iban = document.querySelector('#demo-iban');
const holder = document.querySelector('#account-holder');
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const isIban = button.dataset.copy === 'iban';
  const text = isIban ? iban.value.replace(/\s/g, '') : holder.textContent.trim();
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    status.textContent = isIban ? 'Örnek IBAN kopyalandı. Gerçek transfer için kullanılamaz.' : 'Örnek hesap adı kopyalandı.';
    status.dataset.state = 'success';
  } catch {
    status.textContent = isIban ? 'Otomatik kopyalama kullanılamıyor. Örnek numarayı seçip kopyalayabilirsiniz.' : 'Otomatik kopyalama kullanılamıyor. Hesap adını seçip kopyalayabilirsiniz.';
    status.dataset.state = 'fallback';
    if (isIban) { iban.focus(); iban.select(); }
  }
}));
