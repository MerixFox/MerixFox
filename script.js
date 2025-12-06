/* ====== عناصر أساسية ====== */
const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const langBtn = document.getElementById("langBtn");
const langText = document.getElementById("langText");
const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");

/* ====== intersection observer لِـ fade ====== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

/* ====== نصوص اللغات ====== */
const texts = {
  ar: {
    siteTitle: "Merix Fox",
    introTitle: "مرحباً! أنا Merix Fox 🦊",
    introText: "أنا مطور ألعاب عربي مبتدئ من مصر... ومصمم أنميشن مبتدئ كمان",
    introText2: "أتمنى يعجبك محتواي",
    aboutTitle: "عنّي",
    aboutText1: "مرحباً! أنا Merix Fox 🦊، مطور ألعاب ومصمم أنميشن مبتدئ من مصر. أحب تعلم التقنيات الجديدة ومشاركة أعمالي مع الآخرين.",
    aboutText2: "أطمح لإنشاء ألعاب ممتعة ومحتوى أنميشن جذاب، وأتمنى أن تستمتع بما أقدمه على موقعي.",
    videosTitle: "الفيديوهات",
    trending: "الرائج",
    recommended: "قد يعجبك",
    socialTitle: "روابط التواصل",
    contactText: "التواصل",
    discordTitle: "الديسكورد",
    discordText: "انضم إلى سيرفر الديسكورد الخاص بي للتواصل والمشاركة:",
    discordBtn: "دعوة الانضمام",
    footer: "جميع الحقوق محفوظة لـ Merix Fox",
    langButton: "EN"
  },
  en: {
    siteTitle: "Merix Fox",
    introTitle: "Hello! I'm Merix Fox 🦊",
    introText: "I’m a beginner Arabic game developer from Egypt…and a beginner animation designer too",
    introText2: "Hope you enjoy my content",
    aboutTitle: "About Me",
    aboutText1: "Hello! I'm Merix Fox 🦊, a beginner game developer and animation designer from Egypt. I love learning new technologies and sharing my work.",
    aboutText2: "I aim to create fun games and engaging animation content, and I hope you enjoy what I present on my site.",
    videosTitle: "Videos",
    trending: "Trending",
    recommended: "Recommended",
    socialTitle: "Social Links",
    contactText: "Contact",
    discordTitle: "Discord",
    discordText: "Join my Discord server to connect and share:",
    discordBtn: "Join Invite",
    footer: "All rights reserved © Merix Fox",
    langButton: "عربي"
  }
};

/* ====== إعدادات محفوظة ====== */
let currentLang = localStorage.getItem("site-lang") || "ar";
let savedTheme = localStorage.getItem("site-theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
if (savedTheme === "dark") body.classList.add("dark");
updateThemeIcon();

/* ====== تطبيق اللغة على الصفحة ====== */
function applyLanguage(lang) {
  const t = texts[lang];

  // النصوص الرئيسية
  document.getElementById("siteTitle").textContent = t.siteTitle;
  document.getElementById("introTitle").textContent = t.introTitle;
  document.getElementById("introText").textContent = t.introText;
  document.getElementById("introText2").textContent = t.introText2;

  // About Me
  document.getElementById("aboutHeading").textContent = t.aboutTitle;
  document.getElementById("aboutLink").textContent = t.aboutTitle;
  document.getElementById("aboutText1").textContent = t.aboutText1;
  document.getElementById("aboutText2").textContent = t.aboutText2;

  // قسم الفيديوهات
  document.querySelectorAll(".videosTitle").forEach(el => el.textContent = t.videosTitle);
  document.getElementById("videosLink").textContent = t.videosTitle;

  // روابط التواصل
  document.querySelectorAll(".socialTitle").forEach(el => el.textContent = t.socialTitle);
  document.getElementById("contactLink").textContent = t.contactText;

  // Trending / Recommended
  document.querySelectorAll(".trending").forEach(el => el.textContent = t.trending);
  document.querySelectorAll(".recommended").forEach(el => el.textContent = t.recommended);

  // Discord
  document.getElementById("discordHeading").textContent = t.discordTitle;
  document.getElementById("discordText").textContent = t.discordText;
  document.getElementById("discordLinkBtn").textContent = t.discordBtn;
  document.getElementById("discordNavLink").textContent = t.discordTitle;

  // Footer
  document.querySelectorAll(".footerText").forEach(el => el.textContent = t.footer);

  // زر اللغة
  langText.textContent = t.langButton;

  // اتجاه النص
  if (lang === "ar") {
    body.setAttribute("dir","rtl");
    body.classList.add("arabic");
  } else {
    body.setAttribute("dir","ltr");
    body.classList.remove("arabic");
  }

  localStorage.setItem("site-lang", lang);
}

/* ====== زر تغيير اللغة ====== */
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  applyLanguage(currentLang);
});

/* ====== تحديث أيقونة الثيم ====== */
function updateThemeIcon(){
  if(body.classList.contains("dark")) {
    themeIcon.className = "fa-solid fa-moon";
  } else {
    themeIcon.className = "fa-solid fa-sun";
  }
}

/* ====== زر الثيم ====== */
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("site-theme", body.classList.contains("dark") ? 'dark' : 'light');
  updateThemeIcon();
});

/* ====== برجر للقائمة في الموبايل ====== */
burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  navLinks.setAttribute("aria-hidden", !isOpen);
});

/* ====== تهيئة أولية ====== */
applyLanguage(currentLang);
updateThemeIcon();

/* ====== إزالة التركيز عند النقر خارج القائمة ====== */
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !burgerBtn.contains(e.target)) {
    navLinks.classList.remove("open");
    navLinks.setAttribute("aria-hidden", "false");
  }
});
