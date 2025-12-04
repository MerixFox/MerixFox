/* عناصر رئيسية */
const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const icon = document.getElementById('icon');
const langBtn = document.getElementById('langBtn');
const langText = document.getElementById('langText');
const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');

/* عناصر نصية قابلة للترجمة */
const texts = {
  en: {
    siteTitle: "Merix Fox",
    introTitle: "Hello, my name is Merix Fox 🦊",
    introText: "I am a beginner Arabic game developer from Egypt... and a beginner animation designer too",
    introText2: "I hope you enjoy my content",
    videosTitle: "Videos",
    trending: "Trending",
    recommended: "Recommended",
    socialTitle: "Social Links",
    contactText: "Contact",
    footer: "All rights reserved © Merix Fox",
    langButton: "عربي"
  },
  ar: {
    siteTitle: "Merix Fox",
    introTitle: "مرحباً! أنا Merix Fox 🦊",
    introText: "أنا مطور ألعاب عربي مبتدئ من مصر... ومصمم أنميشن مبتدئ كمان",
    introText2: "أتمنى يعجبك محتواي",
    videosTitle: "الفيديوهات",
    trending: "الرائج",
    recommended: "قد يعجبك",
    socialTitle: "روابط التواصل",
    contactText: "التواصل",
    footer: "جميع الحقوق محفوظة لـ Merix Fox",
    langButton: "EN"
  }
};

/* تهيئة من التخزين إن وُجد */
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme === 'dark') body.classList.add('dark');
else body.classList.remove('dark');

const savedLang = localStorage.getItem('site-lang');
let currentLang = savedLang === 'en' ? 'en' : 'ar';

/* تحديث أيقونة الثيم */
function updateThemeIcon(){
  icon.textContent = body.classList.contains('dark') ? '🌙' : '☀️';
}

/* تبديل الوضع */
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('site-theme', body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

/* فتح / إغلاق برجر */
burgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* إغلاق قائمة البرجر عند الضغط على أي رابط داخلها */
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    navLinks.classList.remove('open');
  });
});

/* تغيير اللغة وتحديث النصوص */
function applyLanguage(lang){
  const t = texts[lang];
  // عناوين ونصوص
  document.getElementById('siteTitle').textContent = t.siteTitle;
  document.getElementById('introTitle').textContent = t.introTitle;
  document.getElementById('introText').textContent = t.introText;
  document.getElementById('introText2').textContent = t.introText2;
  document.querySelector('.videosTitle').textContent = t.videosTitle;
  document.querySelector('.socialTitle').textContent = t.socialTitle;
  document.querySelectorAll('.trending').forEach(el => el.textContent = t.trending);
  document.querySelectorAll('.recommended').forEach(el => el.textContent = t.recommended);
  document.querySelector('.footerText').textContent = t.footer;
  // زر اللغة ونص قائمة تواصل (nav)
  langText.textContent = t.langButton;
  document.getElementById('contactLink').textContent = t.contactText;
  document.getElementById('videosLink').textContent = t.videosTitle;
  // dir & class
  if(lang === 'ar'){
    body.classList.add('arabic');
    body.setAttribute('dir','rtl');
  } else {
    body.classList.remove('arabic');
    body.setAttribute('dir','ltr');
  }
  localStorage.setItem('site-lang', lang);
}

/* تبديل اللغة عند الضغط */
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  applyLanguage(currentLang);
});

/* تهيئة أولية */
updateThemeIcon();
applyLanguage(currentLang);