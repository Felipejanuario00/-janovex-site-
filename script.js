const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('current-year').textContent = new Date().getFullYear();

const briefForm = document.getElementById('brief-form');
briefForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(briefForm);
  const message = `Olá, JANOVEX! Gostaria de conversar sobre um projeto.\n\n*Nome:* ${data.get('nome')}\n*Empresa/segmento:* ${data.get('empresa') || 'Não informado'}\n*Serviço:* ${data.get('servico')}\n*Investimento estimado:* ${data.get('orcamento')}\n*Desafio:* ${data.get('mensagem')}`;
  window.open(`https://wa.me/5531993611353?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

const privacyDialog = document.getElementById('privacy-dialog');
document.querySelectorAll('.privacy-open').forEach(button => button.addEventListener('click', () => privacyDialog.showModal()));
document.querySelector('.privacy-close').addEventListener('click', () => privacyDialog.close());
privacyDialog.addEventListener('click', event => {
  if (event.target === privacyDialog) privacyDialog.close();
});

const analyticsId = 'G-9MSZLEXP3T';
const cookieBanner = document.getElementById('cookie-banner');

function startAnalytics() {
  if (window.dataLayer) return;
  window.dataLayer = [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', analyticsId, { anonymize_ip: true });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(tag);
}

const measurementChoice = localStorage.getItem('janovex_measurement');
if (measurementChoice === 'accepted') startAnalytics();
if (!measurementChoice) cookieBanner.hidden = false;

document.querySelector('.cookie-accept').addEventListener('click', () => {
  localStorage.setItem('janovex_measurement', 'accepted');
  cookieBanner.hidden = true;
  startAnalytics();
});

document.querySelector('.cookie-reject').addEventListener('click', () => {
  localStorage.setItem('janovex_measurement', 'rejected');
  cookieBanner.hidden = true;
});
