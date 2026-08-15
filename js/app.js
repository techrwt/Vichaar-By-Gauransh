/* ================================================= */
/* विचार — By Gauransh | Core Application Engine       */
/* ================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageSystem();
  
  const path = window.location.pathname;
  
  if (path.includes('index.html') || path === '/' || path.endsWith('/Vichaar/') || path.endsWith('/Vichaar')) {
    initOpeningAnimation();
    loadHomeContent();
  } else if (path.includes('thoughts.html')) {
    loadThoughtsPage();
  } else if (path.includes('articles.html')) {
    loadArticlesPage();
  } else if (path.includes('search.html')) {
    initSearchEngine();
  } else if (path.includes('random.html')) {
    loadRandomContent();
  } else if (path.includes('about.html')) {
    updateStaticTexts();
  } else if (path.includes('read.html')) {
    loadReaderPage();
  }
});

/* Helper: Get Current Language */
function getCurrentLang() {
  return localStorage.getItem('vichaar_lang') || 'hi';
}

function setLang(lang) {
  localStorage.setItem('vichaar_lang', lang);
  updateStaticTexts();
  location.reload();
}

/* Navigation & Mobile Menu */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(11, 9, 25, 0.92)';
    } else {
      navbar.style.background = 'rgba(11, 9, 25, 0.75)';
    }
  });

  // Inject Mobile Menu & Navbar if missing specific links
  setupMobileMenu();
}

function setupMobileMenu() {
  const navContainer = document.querySelector('.nav-container');
  if (!navContainer) return;

  if (!document.querySelector('.hamburger')) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    navContainer.appendChild(hamburger);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <button class="close-menu">&times;</button>
      <a href="index.html" class="nav-item-home">Home</a>
      <a href="thoughts.html" class="nav-item-thoughts">विचार</a>
      <a href="articles.html" class="nav-item-articles">लेख</a>
      <a href="search.html" class="nav-item-search">खोजें</a>
      <a href="random.html" class="nav-item-random">कुछ भी पढ़ें</a>
      <a href="about.html" class="nav-item-about">मेरे बारे में</a>
      <button class="lang-switch-btn mobile-lang-btn" onclick="toggleLanguage()">English</button>
    `;
    document.body.appendChild(mobileMenu);

    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileMenu.querySelector('.close-menu').addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
}

function toggleLanguage() {
  const current = getCurrentLang();
  setLang(current === 'hi' ? 'en' : 'hi');
}

function initLanguageSystem() {
  const current = getCurrentLang();
  // Add lang switch button to desktop navbar if not present
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !document.querySelector('.desktop-lang-btn')) {
    const li = document.createElement('li');
    li.innerHTML = `<button class="lang-switch-btn desktop-lang-btn" onclick="toggleLanguage()">${current === 'hi' ? 'English' : 'हिंदी'}</button>`;
    navLinks.appendChild(li);
  }
  updateStaticTexts();
}

function updateStaticTexts() {
  const lang = getCurrentLang();
  const translations = {
    hi: {
      home: "होम",
      thoughts: "विचार",
      articles: "लेख",
      search: "खोजें",
      random: "कुछ भी पढ़ें",
      about: "मेरे बारे में",
      heroTitle: "विचार",
      heroSub: "शब्द मेरे हैं, एहसास शायद आपके।",
      todayThought: "आज का विचार",
      todayArticle: "आज का लेख",
      exploreMore: "और पढ़ें",
      searchPlaceholder: "विचार या लेख खोजें...",
      aboutTitle: "मेरे बारे में",
      footerQuote: "शब्द मेरे हैं, एहसास शायद आपके।"
    },
    en: {
      home: "Home",
      thoughts: "Thoughts",
      articles: "Articles",
      search: "Search",
      random: "Random",
      about: "About",
      heroTitle: "Vichaar",
      heroSub: "Words are mine, the feelings perhaps yours.",
      todayThought: "Today's Thought",
      todayArticle: "Today's Article",
      exploreMore: "Explore More",
      searchPlaceholder: "Search thoughts or articles...",
      aboutTitle: "About Me",
      footerQuote: "Words are mine, the feelings perhaps yours."
    }
  };

  const t = translations[lang];
  
  // Update standard elements by data-i18n or class mapping
  document.querySelectorAll('.nav-item-home').forEach(el => el.textContent = t.home);
  document.querySelectorAll('.nav-item-thoughts').forEach(el => el.textContent = t.thoughts);
  document.querySelectorAll('.nav-item-articles').forEach(el => el.textContent = t.articles);
  document.querySelectorAll('.nav-item-search').forEach(el => el.textContent = t.search);
  document.querySelectorAll('.nav-item-random').forEach(el => el.textContent = t.random);
  document.querySelectorAll('.nav-item-about').forEach(el => el.textContent = t.about);
  
  const desktopBtn = document.querySelector('.desktop-lang-btn');
  if (desktopBtn) desktopBtn.textContent = lang === 'hi' ? 'English' : 'हिंदी';
}

/* Opening Animation */
function initOpeningAnimation() {
  const overlay = document.getElementById('openingOverlay');
  if (!overlay) return;

  const typingText = document.getElementById('typingText');
  const lang = getCurrentLang();
  
  const lines = lang === 'hi' ? [
    "कुछ बातें…",
    "सिर्फ पढ़ने के लिए नहीं होतीं।",
    "कुछ बातें…",
    "आपके साथ थोड़ी देर रहती हैं।"
  ] : [
    "Some thoughts...",
    "Are not just meant to be read.",
    "Some thoughts...",
    "Stay with you for a while."
  ];

  let lineIdx = 0;
  function showLine() {
    if (lineIdx < lines.length) {
      typingText.style.opacity = 0;
      setTimeout(() => {
        typingText.textContent = lines[lineIdx];
        typingText.style.opacity = 1;
        lineIdx++;
        setTimeout(showLine, 1200);
      }, 400);
    }
  }

  typingText.style.transition = 'opacity 0.4s ease';
  showLine();

  window.enterWebsite = function() {
    overlay.classList.add('hidden');
    sessionStorage.setItem('vichaar_opened', 'true');
  };

  if (sessionStorage.getItem('vichaar_opened') === 'true') {
    overlay.classList.add('hidden');
  }
}

/* Fetch JSON Data */
async function fetchContent() {
  try {
    let response = await fetch('./data/content.json');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
    return [];
  }
}

/* Load Home Content */
async function loadHomeContent() {
  const data = await fetchContent();
  const lang = getCurrentLang();
  
  const featuredThought = data.find(item => item.type === 'thought') || data[0];
  const featuredArticle = data.find(item => item.type === 'article') || data[2];

  const thoughtContainer = document.getElementById('homeThought');
  const articleContainer = document.getElementById('homeArticle');

  if (thoughtContainer && featuredThought) {
    thoughtContainer.innerHTML = `
      <div class="card-meta"><span>${featuredThought.date}</span><span>${lang === 'hi' ? 'विचार' : 'Thought'}</span></div>
      <h3 class="card-title">${lang === 'hi' ? featuredThought.title_hi : featuredThought.title_en}</h3>
      <p class="card-excerpt">${(lang === 'hi' ? featuredThought.content_hi : featuredThought.content_en).substring(0, 120)}...</p>
      <span class="card-action">${lang === 'hi' ? 'पूरा पढ़ें →' : 'Read More →'}</span>
    `;
    thoughtContainer.href = `read.html?id=${featuredThought.id}`;
  }

  if (articleContainer && featuredArticle) {
    articleContainer.innerHTML = `
      <div class="card-meta"><span>${featuredArticle.date}</span><span>${lang === 'hi' ? 'लेख' : 'Article'}</span></div>
      <h3 class="card-title">${lang === 'hi' ? featuredArticle.title_hi : featuredArticle.title_en}</h3>
      <p class="card-excerpt">${(lang === 'hi' ? featuredArticle.content_hi : featuredArticle.content_en).substring(0, 120)}...</p>
      <span class="card-action">${lang === 'hi' ? 'पूरा पढ़ें →' : 'Read More →'}</span>
    `;
    articleContainer.href = `read.html?id=${featuredArticle.id}`;
  }
}

/* Load Thoughts Page */
async function loadThoughtsPage() {
  const data = await fetchContent();
  const lang = getCurrentLang();
  const grid = document.getElementById('thoughtsGrid');
  if (!grid) return;

  const thoughts = data.filter(item => item.type === 'thought');
  grid.innerHTML = thoughts.map(item => `
    <a href="read.html?id=${item.id}" class="glass-card">
      <div class="card-meta"><span>${item.date}</span></div>
      <h3 class="card-title">${lang === 'hi' ? item.title_hi : item.title_en}</h3>
      <p class="card-excerpt">${(lang === 'hi' ? item.content_hi : item.content_en).substring(0, 140)}...</p>
      <span class="card-action">${lang === 'hi' ? 'पूरा पढ़ें →' : 'Read More →'}</span>
    </a>
  `).join('');
}

/* Load Articles Page */
async function loadArticlesPage() {
  const data = await fetchContent();
  const lang = getCurrentLang();
  const grid = document.getElementById('articlesGrid');
  if (!grid) return;

  const articles = data.filter(item => item.type === 'article');
  grid.innerHTML = articles.map(item => `
    <a href="read.html?id=${item.id}" class="glass-card">
      <div class="card-meta"><span>${item.date}</span><span>${lang === 'hi' ? 'लेख' : 'Article'}</span></div>
      <h3 class="card-title">${lang === 'hi' ? item.title_hi : item.title_en}</h3>
      <p class="card-excerpt">${(lang === 'hi' ? item.content_hi : item.content_en).substring(0, 140)}...</p>
      <span class="card-action">${lang === 'hi' ? 'पूरा पढ़ें →' : 'Read More →'}</span>
    </a>
  `).join('');
}

/* Reader Page */
async function loadReaderPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const data = await fetchContent();
  const lang = getCurrentLang();
  
  const item = data.find(d => d.id === id);
  const container = document.getElementById('readerContainer');

  if (!container) return;

  if (!item) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 0;">
        <h2>${lang === 'hi' ? 'सामग्री नहीं मिली' : 'Content Not Found'}</h2>
        <p style="margin-top: 1rem; color: var(--color-text-muted);">${lang === 'hi' ? 'यह सामग्री उपलब्ध नहीं है या हटा दी गई है।' : 'The requested content could not be found.'}</p>
        <a href="index.html" class="enter-btn" style="display:inline-block; margin-top:2rem; text-decoration:none;">${lang === 'hi' ? 'होम पर जाएं' : 'Go Home'}</a>
      </div>
    `;
    return;
  }

  const title = lang === 'hi' ? item.title_hi : item.title_en;
  const content = lang === 'hi' ? item.content_hi : item.content_en;

  container.innerHTML = `
    <div class="reader-header">
      <div class="reader-meta">${item.date} • ${item.type === 'thought' ? (lang === 'hi' ? 'विचार' : 'Thought') : (lang === 'hi' ? 'लेख' : 'Article')}</div>
      <h1 class="reader-title gradient-text">${title}</h1>
    </div>
    <div class="reader-content">
      ${content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
    </div>
  `;
}

/* Search Engine */
async function loadRandomContent() {
  const data = await fetchContent();
  if (data.length === 0) return;
  const randomItem = data[Math.floor(Math.random() * data.length)];
  window.location.href = `read.html?id=${randomItem.id}`;
}

function initSearchEngine() {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');
  if (!searchInput || !resultsContainer) return;

  let allData = [];
  fetchContent().then(data => { allData = data; });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const lang = getCurrentLang();

    if (query.length === 0) {
      resultsContainer.innerHTML = '';
      return;
    }

    const filtered = allData.filter(item => {
      const title = (lang === 'hi' ? item.title_hi : item.title_en).toLowerCase();
      const content = (lang === 'hi' ? item.content_hi : item.content_en).toLowerCase();
      return title.includes(query) || content.includes(query);
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p style="text-align: center; color: var(--color-text-muted);">${lang === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No results found.'}</p>`;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <a href="read.html?id=${item.id}" class="glass-card" style="margin-bottom: 1.5rem;">
        <div class="card-meta"><span>${item.date}</span></div>
        <h3 class="card-title">${lang === 'hi' ? item.title_hi : item.title_en}</h3>
        <p class="card-excerpt">${(lang === 'hi' ? item.content_hi : item.content_en).substring(0, 100)}...</p>
      </a>
    `).join('');
  });
}