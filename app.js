/* ========================================================
   VoteUp V2 · app.js
   Omnichannel: Mobile → Tablet → Desktop
   Static — No frameworks, no build step. GitHub Pages ready.
   ======================================================== */

'use strict';

// ════════════════════════════════════════════════════
// 1. MOCK DATA
// ════════════════════════════════════════════════════

const TOPIC_META = {
  klima:      { label: 'Klima & Umwelt',  emoji: '🌿', color: '#5bff8a' },
  wirtschaft: { label: 'Wirtschaft',       emoji: '📈', color: '#3de8ff' },
  bildung:    { label: 'Bildung',           emoji: '📚', color: '#ff5baa' },
  gesundheit: { label: 'Gesundheit',        emoji: '🏥', color: '#ffcc44' },
  wohnen:     { label: 'Wohnen & Miete',   emoji: '🏠', color: '#a78bfa' },
  digital:    { label: 'Digitalisierung',   emoji: '💻', color: '#3de8ff' },
};

const NEWS = [
  {
    id: 1, topic: 'klima', isNew: true, time: 'Vor 2h', source: 'Bundestag',
    title: 'Bundesrat beschließt Solarausbau-Paket',
    summary: 'Das neue Paket sieht vor, die Solarkapazität bis 2030 auf 215 GW zu verdreifachen. Kritiker bemängeln fehlende Förderung für Privatdächer.',
    full: 'Das neue Paket sieht vor, die Solarkapazität bis 2030 auf 215 GW zu verdreifachen. Kritiker bemängeln fehlende Förderung für Privatdächer. Die Koalition hat in einer Marathon-Sitzung das Solarausbau-Paket verabschiedet. Besonders umstritten war die Frage der Netzentgelte für Eigenheimbesitzer, die nun durch Subventionen gedeckt werden sollen. Umweltverbände begrüßen das Paket, fordern aber schnellere Umsetzung.'
  },
  {
    id: 2, topic: 'wohnen', isNew: true, time: 'Vor 5h', source: 'BMWSB',
    title: 'Mietpreisbremse verlängert bis 2029',
    summary: 'Die Koalition einigt sich auf Verlängerung. Städte ab 100.000 Einwohnern bleiben Mietpreisbremsen-Gebiete. Wohnungsbauverband kritisiert fehlende Anreize.',
    full: 'Die Koalition einigt sich auf Verlängerung bis 2029. Städte ab 100.000 Einwohnern bleiben Mietpreisbremsen-Gebiete. Der Wohnungsbauverband kritisiert fehlende Anreize für Investoren und warnt vor sinkendem Neubau. Mietervereine sehen die Verlängerung als wichtiges Signal, fordern aber strengere Kontrollen und effektivere Sanktionen bei Verstößen.'
  },
  {
    id: 3, topic: 'bildung', isNew: false, time: 'Vor 1 Tag', source: 'KMK',
    title: 'Digitalpakt 2.0 — 5 Mrd. Euro für Schulen',
    summary: 'Länder erhalten Bundesgelder für Tablet-Ausstattung, WLAN-Infrastruktur und KI-Lernplattformen. Umsetzung soll bis 2027 erfolgen.',
    full: 'Länder erhalten 5 Milliarden Euro für Tablet-Ausstattung, WLAN-Infrastruktur und KI-Lernplattformen. Die Umsetzung soll bis 2027 erfolgen. Bildungsexperten sehen darin einen wichtigen Schritt zur Modernisierung, betonen aber, dass technische Ausstattung allein nicht reicht — Lehrerfortbildung sei ebenso entscheidend.'
  },
  {
    id: 4, topic: 'wirtschaft', isNew: false, time: 'Vor 2 Tagen', source: 'BMAS',
    title: 'Mindestlohn steigt auf 15 Euro',
    summary: 'Die Mindestlohnkommission empfiehlt 15 Euro ab 2026. Arbeitgeberverbände warnen vor Stellenabbau in der Gastronomie.',
    full: 'Die Mindestlohnkommission empfiehlt 15 Euro pro Stunde ab Januar 2026. Arbeitgeberverbände warnen vor Stellenabbau besonders in der Gastronomie und im Einzelhandel. Gewerkschaften begrüßen die Erhöhung als überfällig und verweisen auf steigende Lebenshaltungskosten der letzten Jahre.'
  },
  {
    id: 5, topic: 'gesundheit', isNew: false, time: 'Vor 3 Tagen', source: 'BMG',
    title: 'Kassenbeiträge 2026: +0,8 Beitragspunkte',
    summary: 'GKV rechnet mit steigendem Defizit. Gesundheitsminister prüft Strukturreform. Privatversicherte nicht betroffen.',
    full: 'Die gesetzlichen Krankenkassen rechnen für 2026 mit einem Defizit von etwa 3,6 Milliarden Euro. Der Beitragssatz soll um durchschnittlich 0,8 Prozentpunkte steigen. Gesundheitsminister kündigt tiefgreifende Strukturreform an, die Wirtschaftlichkeit und Versorgungsqualität verbessern soll.'
  },
  {
    id: 6, topic: 'digital', isNew: false, time: 'Vor 4 Tagen', source: 'EU-Kommission',
    title: 'eIDAS-2.0 Wallet ab 2026 Pflicht für EU',
    summary: 'Alle EU-Staaten müssen bis Ende 2026 eine digitale Identitäts-Wallet anbieten. Deutschland plant Integration mit BundID.',
    full: 'Alle EU-Staaten müssen bis Ende 2026 eine digitale Identitäts-Wallet anbieten. Deutschland plant die Integration mit BundID und dem neuen Online-Ausweis. Datenschützer begrüßen die Zero-Knowledge-Architektur der Wallet, fordern aber klare Regelungen zu Datensparsamkeit und Lösungsrechten.'
  },
  {
    id: 7, topic: 'klima', isNew: false, time: 'Vor 5 Tagen', source: 'UBA',
    title: 'CO₂-Preis steigt auf 55 Euro pro Tonne',
    summary: 'Der nationale CO₂-Preis erhöht sich planmäßig. Tankstellen-Preise steigen um ca. 3 Cent. Klimageld bleibt umstritten.',
    full: 'Der nationale CO₂-Preis erhöht sich planmäßig auf 55 Euro pro Tonne. Tankstellen-Preise steigen damit um ca. 3 Cent pro Liter. Das versprochene Klimageld als soziale Rückverteilung bleibt weiterhin politisch umstritten — eine Einigung ist noch nicht in Sicht.'
  },
  {
    id: 8, topic: 'wirtschaft', isNew: false, time: 'Vor 6 Tagen', source: 'BMF',
    title: 'Bundeshaushalt 2026: Einigung nach Marathon',
    summary: 'Nach wochenlangen Verhandlungen Einigung mit Investitionsschwerpunkt auf Infrastruktur und KI.',
    full: 'Nach wochenlangen Koalitionsverhandlungen hat sich die Bundesregierung auf einen Haushalt 2026 geeinigt. Investitionsschwerpunkte liegen auf Infrastruktur (Bahn, Autobahnen) sowie künstlicher Intelligenz und Chips-Förderung. Die Schuldenbremse bleibt unangetastet — Kritiker sehen darin einen Investitionsstau.'
  },
];

const BRIEFINGS = [
  {
    id: 1, topic: 'klima', emoji: '🌿', readTime: '60 Sek.',
    title: 'Deutschlands Klimaziele 2030',
    body: 'Deutschland hat das Ziel, die Treibhausgasemissionen bis 2030 um 65% gegenüber 1990 zu reduzieren. Der CO₂-Preis stieg auf 55 €/Tonne und soll bis 2025 auf 65 € steigen. Der Ausbau erneuerbarer Energien wird durch neue Solarpakete beschleunigt.',
    keyFact: '65% weniger CO₂ bis 2030',
  },
  {
    id: 2, topic: 'bildung', emoji: '📚', readTime: '60 Sek.',
    title: 'Digitale Bildung im Wandel',
    body: 'Der Digitalpakt 2.0 stellt 5 Milliarden Euro bereit. Ziel: 100% WLAN-Abdeckung an Schulen bis 2025, KI-Tutorship für jeden Schüler bis 2027. Deutschland liegt bei digitaler Bildung noch hinter Estland und Dänemark.',
    keyFact: '5 Mrd. € für Schuldigitalisierung',
  },
  {
    id: 3, topic: 'digital', emoji: '💻', readTime: '60 Sek.',
    title: 'Deine digitale Identität in der EU',
    body: 'Mit eIDAS 2.0 kommt die europäische digitale Identitäts-Wallet. Bis 2026 muss jeder EU-Bürger Zugang zu einer sicheren digitalen ID haben. In Deutschland wird die BundID zur Basisplattform ausgebaut — für Behördengänge, Steuern und bald auch: sicheres Online-Wählen.',
    keyFact: 'EU-Digitalausweis bis Ende 2026',
  },
];

const BALLOTS = [
  {
    id: 1, topic: 'klima', color: '#5bff8a', emoji: '🌿',
    yes: 14823, no: 6341,
    region: 'Bundesweit', end: '30. Apr 2026',
    title: 'Solaranlagen auf allen Neubauten',
    question: 'Sollen neue Wohngebäude ab 2026 verpflichtend mit Solaranlagen ausgestattet werden?',
  },
  {
    id: 2, topic: 'wohnen', color: '#a78bfa', emoji: '🏠',
    yes: 9241, no: 11882,
    region: 'Städte 500k+', end: '15. Mai 2026',
    title: 'Mietpreisdeckel für Großstädte',
    question: 'Sollen Mieten in Städten ab 500.000 Einwohnern für 5 Jahre eingefroren werden?',
  },
  {
    id: 3, topic: 'wirtschaft', color: '#3de8ff', emoji: '🚗',
    yes: 7109, no: 13290,
    region: 'Kommunal', end: '1. Jun 2026',
    title: 'Tempo 30 als Standard',
    question: 'Soll Tempo 30 als Standard-Höchstgeschwindigkeit in Wohngebieten gelten?',
  },
];

const PARTY_CARDS = [
  { id:1, topic:'Klima',  party:'SPD',     bg:'#e3000f', fg:'#fff', score:68,
    pos:'Klimaneutralität bis 2045. Förderung von Wärmepumpen durch staatliche Zuschüsse. CO₂-Preis als Lenkungsinstrument beibehalten.' },
  { id:2, topic:'Klima',  party:'CDU/CSU', bg:'#1a1a1a', fg:'#fff', score:44,
    pos:'Technologieoffenheit statt Verbote. Kernkraft als Brückentechnologie erneut prüfen. CO₂-Emissionsmarkt statt sektorspezifischer Eingriffe.' },
  { id:3, topic:'Klima',  party:'Grüne',   bg:'#1fa12d', fg:'#fff', score:92,
    pos:'Kohleausstieg 2030, 100% Erneuerbare bis 2035. Verbrenner-Aus 2027. Klimageld für sozial Schwache als direkten CO₂-Ausgleich.' },
  { id:4, topic:'Klima',  party:'FDP',     bg:'#f5d400', fg:'#000', score:37,
    pos:'Emissionshandel als einziges sinnvolles Klimainstrument. Keine sektorspezifischen Verbote. Innovation und Markt statt Regulierung.' },
  { id:5, topic:'Wohnen', party:'SPD',     bg:'#e3000f', fg:'#fff', score:76,
    pos:'Mietpreisbremse verlängern und verschärfen. 100.000 neue Sozialwohnungen pro Jahr. Wohnungsgemeinnützigkeit reaktivieren.' },
  { id:6, topic:'Wohnen', party:'Grüne',   bg:'#1fa12d', fg:'#fff', score:73,
    pos:'Spekulation mit Wohnraum stoppen. Leerstandsabgabe für ungenutzten Wohnraum. Mehr Genossenschaftswohnungen fördern.' },
];

const QUIZ_QUESTIONS = [
  {
    id: 1, topic: 'klima',
    q: 'Auf wie viel Euro pro Tonne wurde der CO₂-Preis zuletzt erhöht?',
    options: ['35 Euro', '45 Euro', '55 Euro', '65 Euro'],
    correct: 2,
    explanation: 'Richtig! Der nationale CO₂-Preis stieg planmäßig auf 55 Euro pro Tonne CO₂.',
  },
  {
    id: 2, topic: 'bildung',
    q: 'Wie viel Geld stellt der Digitalpakt 2.0 für Schulen bereit?',
    options: ['1 Milliarde Euro', '3 Milliarden Euro', '5 Milliarden Euro', '10 Milliarden Euro'],
    correct: 2,
    explanation: 'Genau! Der Digitalpakt 2.0 stellt 5 Milliarden Euro für Tablet-Ausstattung, WLAN und KI-Plattformen bereit.',
  },
  {
    id: 3, topic: 'wohnen',
    q: 'Bis wann wurde die Mietpreisbremse verlängert?',
    options: ['2027', '2028', '2029', '2030'],
    correct: 2,
    explanation: 'Korrekt! Die Mietpreisbremse wurde bis 2029 verlängert und gilt für Städte ab 100.000 Einwohnern.',
  },
  {
    id: 4, topic: 'digital',
    q: 'Was ist eIDAS 2.0?',
    options: ['Ein neues Smartphone-Betriebssystem', 'Die europäische digitale Identitäts-Wallet', 'Ein KI-Sprachmodell der EU', 'Ein neues Datenschutzgesetz'],
    correct: 1,
    explanation: 'Richtig! eIDAS 2.0 ist der europäische Rahmen für eine digitale Identitäts-Wallet für alle EU-Bürger.',
  },
  {
    id: 5, topic: 'wirtschaft',
    q: 'Welchen Mindestlohn empfiehlt die Mindestlohnkommission ab 2026?',
    options: ['13 Euro', '14 Euro', '15 Euro', '16 Euro'],
    correct: 2,
    explanation: 'Korrekt! Die Mindestlohnkommission empfiehlt 15 Euro pro Stunde ab Januar 2026.',
  },
];

// ════════════════════════════════════════════════════
// 2. STATE
// ════════════════════════════════════════════════════

const state = {
  currentTab:     'feed',
  obSlide:        0,
  readBriefings:  new Set(),
  votes:          {},          // { ballotId: 'yes' | 'no' }
  verified:       false,
  currentFeed:    'all',
  quizIndex:      0,
  quizAnswered:   false,
  pendingVote:    null,        // { ballot, choice }
};

// ════════════════════════════════════════════════════
// 3. ONBOARDING
// ════════════════════════════════════════════════════

let obCurrentSlide = 0;

function nextObSlide() {
  const slides = document.querySelectorAll('.ob-slide');
  if (obCurrentSlide >= slides.length - 1) return;

  slides[obCurrentSlide].classList.add('exit');
  slides[obCurrentSlide].classList.remove('active');
  obCurrentSlide++;
  slides[obCurrentSlide].classList.add('active');
  slides[obCurrentSlide].classList.remove('exit');
}

function finishOnboarding() {
  const onboardingScreen = document.getElementById('screen-onboarding');
  const appScreen        = document.getElementById('screen-app');

  onboardingScreen.style.opacity = '0';
  onboardingScreen.style.transform = 'scale(.97)';
  onboardingScreen.style.transition = 'opacity .4s ease, transform .4s ease';

  setTimeout(() => {
    onboardingScreen.classList.remove('active');
    onboardingScreen.style.display = 'none';
    appScreen.classList.add('active');
    appScreen.style.opacity = '0';

    requestAnimationFrame(() => {
      appScreen.style.transition = 'opacity .4s ease';
      appScreen.style.opacity = '1';
    });

    initApp();
    switchTab('feed');
  }, 380);
}

function resetAndGoOnboarding() {
  location.reload();
}

// ════════════════════════════════════════════════════
// 4. TAB NAVIGATION
// ════════════════════════════════════════════════════

function switchTab(tabId) {
  // V2: Update tab content panels
  document.querySelectorAll('.tab-content').forEach(el => {
    el.classList.remove('active');
    el.setAttribute('aria-hidden', 'true');
  });
  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.add('active');
    target.removeAttribute('aria-hidden');
  }

  // V2: Update sidebar nav items (work on both sidebar + bottom bar)
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    btn.removeAttribute('aria-current');
  });
  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-current', 'page');
  }

  state.currentTab = tabId;

  // Tab-specific refresh
  if (tabId === 'abstimmen') renderBallots();
  if (tabId === 'lernen')    updateBriefingProgress();

  // Scroll content area to top on tab switch
  const panel = document.getElementById(`tab-${tabId}`);
  if (panel) {
    const scrollArea = panel.querySelector('.scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;
  }
}

// ════════════════════════════════════════════════════
// 5. APP INIT
// ════════════════════════════════════════════════════

function initApp() {
  setDynamicGreeting();
  renderNewsFeed();
  renderBriefingCards();
  renderQuizCard();
  renderPartyCards();
  renderBallots();
}

// V2: Dynamic greeting date
function setDynamicGreeting() {
  const el = document.getElementById('greeting-date');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('de-DE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ════════════════════════════════════════════════════
// 6. FEED RENDERING
// ════════════════════════════════════════════════════

function getTopicColor(topic) {
  return (TOPIC_META[topic] || {}).color || '#5bff8a';
}
function getTopicLabel(topic) {
  const t = TOPIC_META[topic];
  return t ? `${t.emoji} ${t.label}` : topic;
}

function filterFeed(topic, btn) {
  state.currentFeed = topic;
  document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderNewsFeed();
}

function renderNewsFeed() {
  const list = document.getElementById('news-list');
  if (!list) return;

  const filtered = state.currentFeed === 'all'
    ? NEWS
    : NEWS.filter(n => n.topic === state.currentFeed);

  list.innerHTML = filtered.map((article, i) => {
    const color = getTopicColor(article.topic);
    const topicMeta = TOPIC_META[article.topic] || {};
    const delay = i * 0.05;
    return `
      <div class="news-card" style="animation-delay:${delay}s" onclick="openArticle(${article.id})">
        <div class="news-card-accent-bar" style="background:${color}"></div>
        <div class="news-card-inner">
          <div class="news-card-header">
            <span class="nc-badge" style="color:${color};border-color:${color}30;background:${color}12">
              ${topicMeta.emoji || ''} ${topicMeta.label || article.topic}
            </span>
            ${article.isNew ? '<span class="nc-badge nc-new-badge">NEU</span>' : ''}
            <span class="nc-time">${article.time}</span>
          </div>
          <div class="news-card-title">${article.title}</div>
          <div class="news-card-summary">${article.summary}</div>
          <div class="news-card-footer">
            <span class="nc-source">Quelle: ${article.source}</span>
            <span class="nc-read-more" style="margin-left:auto">Mehr lesen →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ════════════════════════════════════════════════════
// 7. ARTICLE MODAL
// ════════════════════════════════════════════════════

function openArticle(id) {
  const article = NEWS.find(n => n.id === id);
  if (!article) return;

  const color = getTopicColor(article.topic);
  const meta  = TOPIC_META[article.topic] || {};

  document.getElementById('am-topic').textContent = `${meta.emoji} ${meta.label}`;
  document.getElementById('am-topic').style.color  = color;
  document.getElementById('am-title').textContent  = article.title;
  document.getElementById('am-meta').textContent   = `${article.source} · ${article.time}`;
  document.getElementById('am-body').textContent   = article.full || article.summary;

  openModal('article-modal');
}

function closeArticleModal(e) {
  if (e.target.id === 'article-modal') closeModal('article-modal');
}

// ════════════════════════════════════════════════════
// 8. BRIEFING CARDS
// ════════════════════════════════════════════════════

function renderBriefingCards() {
  const container = document.getElementById('briefing-cards');
  if (!container) return;

  container.innerHTML = BRIEFINGS.map(b => {
    const color   = getTopicColor(b.topic);
    const isRead  = state.readBriefings.has(b.id);
    return `
      <div class="briefing-card${isRead ? ' read' : ''}" id="bc-${b.id}" onclick="markBriefingRead(${b.id})">
        <div class="bc-read-indicator${isRead ? ' done' : ''}" id="bci-${b.id}">
          ${isRead ? '✓' : ''}
        </div>
        <div class="bc-emoji">${b.emoji}</div>
        <div class="bc-topic" style="color:${color}">${getTopicLabel(b.topic)}</div>
        <div class="bc-title">${b.title}</div>
        <div class="bc-body">${b.body}</div>
        <div class="bc-time">
          <span class="bc-timer-dot"></span>
          ${b.readTime} · Key Fact: <strong style="color:${color}">${b.keyFact}</strong>
        </div>
      </div>
    `;
  }).join('');
}

function markBriefingRead(id) {
  if (state.readBriefings.has(id)) return;
  state.readBriefings.add(id);

  // Update card appearance
  const card = document.getElementById(`bc-${id}`);
  const indicator = document.getElementById(`bci-${id}`);
  if (card) card.classList.add('read');
  if (indicator) {
    indicator.classList.add('done');
    indicator.textContent = '✓';
  }

  updateBriefingProgress();
}

function updateBriefingProgress() {
  const bar   = document.getElementById('briefing-progress-bar');
  const label = document.getElementById('briefing-progress-label');
  const count = state.readBriefings.size;
  const total = BRIEFINGS.length;
  const pct   = Math.round((count / total) * 100);

  if (bar)   bar.style.width   = `${pct}%`;
  if (label) label.textContent = `${count} / ${total} gelesen`;
}

// ════════════════════════════════════════════════════
// 9. QUIZ
// ════════════════════════════════════════════════════

function renderQuizCard() {
  const container = document.getElementById('quiz-card');
  if (!container) return;

  const q = QUIZ_QUESTIONS[state.quizIndex % QUIZ_QUESTIONS.length];
  state.quizAnswered = false;

  const color = getTopicColor(q.topic);
  const meta  = TOPIC_META[q.topic] || {};

  container.innerHTML = `
    <div class="quiz-q-num" style="color:${color}">${meta.emoji} Frage ${state.quizIndex + 1} von ${QUIZ_QUESTIONS.length}</div>
    <div class="quiz-q-text">${q.q}</div>
    <div class="quiz-options" id="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" id="qopt-${i}" onclick="answerQuiz(${i}, ${q.correct}, '${escapeJs(q.explanation)}')">
          ${opt}
        </button>
      `).join('')}
    </div>
  `;
}

function escapeJs(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function answerQuiz(chosen, correct, explanation) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;

  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach(btn => { btn.disabled = true; });

  const isCorrect = chosen === correct;
  opts[chosen].classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) opts[correct].classList.add('correct');

  // Show result modal
  const icon  = document.getElementById('qr-icon');
  const title = document.getElementById('qr-title');
  const body  = document.getElementById('qr-body');

  if (icon)  icon.textContent  = isCorrect ? '🎉' : '💡';
  if (title) title.textContent = isCorrect ? 'Richtig!' : 'Nicht ganz…';
  if (body)  body.textContent  = explanation;

  setTimeout(() => openModal('quiz-result-modal'), 600);
}

function nextQuizQuestion() {
  state.quizIndex++;
  renderQuizCard();
}

// ════════════════════════════════════════════════════
// 10. PARTY CARDS
// ════════════════════════════════════════════════════

function renderPartyCards() {
  const container = document.getElementById('party-cards');
  if (!container) return;

  container.innerHTML = PARTY_CARDS.map(pc => `
    <div class="party-card">
      <div class="pc-topic">${pc.topic}</div>
      <div class="pc-party-tag" style="background:${pc.bg};color:${pc.fg}">${pc.party}</div>
      <div class="pc-pos">${pc.pos}</div>
      <div class="pc-score-row">
        <div class="pc-score-bar-wrap">
          <div class="pc-score-bar-fill" style="width:${pc.score}%"></div>
        </div>
        <div class="pc-score-val">${pc.score}%</div>
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════
// 11. BALLOT RENDERING & VOTING
// ════════════════════════════════════════════════════

function renderBallots() {
  const container = document.getElementById('ballot-list');
  if (!container) return;

  container.innerHTML = BALLOTS.map((b, i) => {
    const total    = b.yes + b.no;
    const yesPct   = Math.round((b.yes / total) * 100);
    const noPct    = 100 - yesPct;
    const hasVoted = !!state.votes[b.id];
    const choice   = state.votes[b.id];
    const delay    = i * 0.08;

    const yesCount = b.yes + (hasVoted && choice === 'yes' ? 1 : 0);
    const noCount  = b.no  + (hasVoted && choice === 'no'  ? 1 : 0);
    const totalDyn = yesCount + noCount;
    const yesPctDyn = Math.round((yesCount / totalDyn) * 100);
    const noPctDyn  = 100 - yesPctDyn;

    return `
      <div class="ballot-card" style="animation-delay:${delay}s">
        <div class="ballot-card-top">
          <div class="ballot-card-header">
            <div class="ballot-emoji">${b.emoji}</div>
            <div class="ballot-meta">
              <div class="ballot-region">📍 ${b.region}</div>
              <div class="ballot-deadline">⏰ ${b.end}</div>
            </div>
          </div>
          <div class="ballot-title">${b.title}</div>
          <div class="ballot-question">${b.question}</div>
        </div>

        <div class="ballot-results">
          <div class="ballot-results-row">
            <span class="result-yes">✅ Ja — ${yesPctDyn}%</span>
            <span class="result-no">❌ Nein — ${noPctDyn}%</span>
          </div>
          <div class="results-bar">
            <div class="results-bar-yes" id="rb-${b.id}" style="width:${yesPctDyn}%"></div>
          </div>
          <div class="results-count">${totalDyn.toLocaleString('de-DE')} Stimmen abgegeben</div>
        </div>

        ${hasVoted
          ? `<div class="voted-label">✓ Du hast abgestimmt — ${choice === 'yes' ? '✅ Ja' : '❌ Nein'}</div>`
          : `<div class="ballot-vote-btns">
              <button class="vote-btn vote-btn-yes" onclick="prepareVote(${b.id}, 'yes')">✅ Ja</button>
              <button class="vote-btn vote-btn-no"  onclick="prepareVote(${b.id}, 'no')">❌ Nein</button>
            </div>`
        }
      </div>
    `;
  }).join('');

  // Animate progress bars after paint
  requestAnimationFrame(() => {
    BALLOTS.forEach(b => {
      const total   = b.yes + b.no;
      const yesPct  = Math.round((b.yes / total) * 100);
      const hasVoted = !!state.votes[b.id];
      const choice   = state.votes[b.id];
      const yesCount = b.yes + (hasVoted && choice === 'yes' ? 1 : 0);
      const noCount  = b.no  + (hasVoted && choice === 'no'  ? 1 : 0);
      const totalDyn = yesCount + noCount;
      const yesPctDyn = Math.round((yesCount / totalDyn) * 100);
      const bar = document.getElementById(`rb-${b.id}`);
      if (bar) bar.style.width = `${yesPctDyn}%`;
    });
  });
}

function prepareVote(ballotId, choice) {
  const ballot = BALLOTS.find(b => b.id === ballotId);
  if (!ballot) return;

  state.pendingVote = { ballot, choice };

  // Fill vote confirm modal
  document.getElementById('vm-icon').textContent     = ballot.emoji;
  document.getElementById('vm-title').textContent    = ballot.title;
  document.getElementById('vm-question').textContent = ballot.question;

  const choiceEl = document.getElementById('vm-choice');
  choiceEl.textContent  = choice === 'yes' ? '✅ Du stimmst mit JA' : '❌ Du stimmst mit NEIN';
  choiceEl.className    = `vote-modal-choice ${choice === 'yes' ? 'vm-yes' : 'vm-no'}`;

  openModal('vote-modal');
}

function closeVoteModal(e) {
  if (e.target.id === 'vote-modal') closeModal('vote-modal');
}

function confirmVote() {
  if (!state.pendingVote) return;
  const { ballot, choice } = state.pendingVote;

  // Register vote
  state.votes[ballot.id] = choice;
  state.pendingVote = null;

  closeModal('vote-modal');

  // Generate fake crypto hash
  const fakeHash = generateFakeHash();

  // Update success modal
  document.getElementById('success-sub-text').textContent =
    `Du hast für "${ballot.title}" mit ${choice === 'yes' ? 'JA ✅' : 'NEIN ❌'} abgestimmt.`;
  document.getElementById('success-hash').textContent = fakeHash;

  // Show success
  setTimeout(() => openModal('success-modal'), 150);

  // Update vote stat count
  const stat = document.getElementById('stat-votes');
  if (stat) stat.textContent = Object.keys(state.votes).length;

  // Re-render ballots
  setTimeout(() => renderBallots(), 600);

  // V2: Toast notification
  showToast('🗳️ Stimme erfolgreich abgegeben!');
}

function generateFakeHash() {
  const chars = '0123456789abcdef';
  return Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * 16)]).join('');
}

// ════════════════════════════════════════════════════
// 12. VERIFY MODAL
// ════════════════════════════════════════════════════

let verifyStep = 0;
let verifyScanned = false;

function openVerifyModal() {
  if (state.verified) return; // Already verified
  verifyStep   = 0;
  verifyScanned = false;
  document.getElementById('verify-key-preview').textContent = 'Wird generiert...';
  document.getElementById('verify-email').value = '';
  openModal('verify-modal');
}

function closeVerifyModal(e) {
  if (e.target.id === 'verify-modal') closeModal('verify-modal');
}

function simulateScan() {
  verifyScanned = true;
  const btn = document.querySelector('#vstep-1 .btn-ghost');
  if (btn) {
    btn.textContent = '✅ Scan erfolgreich';
    btn.style.color = 'var(--vu-accent)';
    btn.style.borderColor = 'rgba(91,255,138,.3)';
    btn.disabled = true;
  }

  // Generate fake key preview
  const fakeKey = 'pk_' + Array.from({length:32}, () => '0123456789abcdef'[Math.floor(Math.random()*16)]).join('');
  document.getElementById('verify-key-preview').textContent = fakeKey;
}

function processVerification() {
  const email = document.getElementById('verify-email').value.trim();
  if (!email || !email.includes('@')) {
    document.getElementById('verify-email').style.borderColor = 'rgba(255,91,170,.5)';
    document.getElementById('verify-email').placeholder = '⚠ Bitte E-Mail eingeben';
    return;
  }
  if (!verifyScanned) {
    const btn = document.querySelector('#vstep-1 .btn-ghost');
    if (btn) btn.style.borderColor = 'rgba(255,91,170,.5)';
    return;
  }

  // Simulate processing
  const verifyBtn = document.getElementById('verify-btn');
  if (verifyBtn) {
    verifyBtn.textContent = '⏳ Verifiziere...';
    verifyBtn.disabled = true;
  }

  setTimeout(() => {
    state.verified = true;
    closeModal('verify-modal');

    // Update verify banner
    const banner = document.getElementById('verify-banner');
    if (banner) {
      banner.classList.add('done');
      banner.setAttribute('aria-label', 'Identität verifiziert');
      banner.innerHTML = `
        <div class="verify-banner-icon">✅</div>
        <div class="verify-banner-text">
          <strong>Identität verifiziert</strong>
          <span>Du bist bereit für echte Abstimmungen</span>
        </div>
      `;
      banner.onclick = null;
      banner.style.cursor = 'default';
    }

    // Update profile verify status
    const ps = document.getElementById('verify-status-profile');
    if (ps) {
      ps.textContent = 'Verifiziert ✓';
      ps.classList.add('done');
    }

    // V2: Confirm toast
    showToast('🔐 Identität erfolgreich verifiziert!');
  }, 1800);
}

// ════════════════════════════════════════════════════
// 13. MODAL SYSTEM
// ════════════════════════════════════════════════════

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════════
// V2: TOAST NOTIFICATION SYSTEM
// ════════════════════════════════════════════════════

let _toastTimer = null;

function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ════════════════════════════════════════════════════
// DOMContentLoaded init
// ════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    // ESC closes open modal
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
    // Arrow keys for onboarding (desktop)
    if (e.key === 'ArrowRight') {
      const obs = document.getElementById('screen-onboarding');
      if (obs && obs.classList.contains('active')) nextObSlide();
    }
  });

  // V2: trap focus inside open modals
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const openModal = document.querySelector('.modal-overlay.open');
    if (!openModal) return;
    const focusable = openModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  // Session: skip onboarding if already visited
  const hasVisited = sessionStorage.getItem('vu_visited');
  if (hasVisited) finishOnboarding();
});

// ════════════════════════════════════════════════════
// 14. SWIPE GESTURE (light) for briefing cards on mobile
// ════════════════════════════════════════════════════

(function addSwipeSupport() {
  let startX  = 0;
  let isDown  = false;

  document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDown = true;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (!isDown) return;
    isDown = false;
    const dx = e.changedTouches[0].clientX - startX;
    // Swipe left/right on onboarding
    if (Math.abs(dx) > 50) {
      const screen = document.getElementById('screen-onboarding');
      if (screen && screen.classList.contains('active')) {
        if (dx < 0) nextObSlide();
      }
    }
  }, { passive: true });
})();

// ════════════════════════════════════════════════════
// 15. ANIMATED ENTRANCE (scroll-based)
// ════════════════════════════════════════════════════

function observeCards() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.news-card, .ballot-card, .briefing-card').forEach(el => {
    observer.observe(el);
  });
}

// Re-observe after re-renders
const _origRenderNewsFeed = renderNewsFeed;
// (already integrated above)

console.log('%c🗳️ VoteUp V2 · Pitch Demo', 'color:#5bff8a;font-size:1.1rem;font-weight:bold;');
console.log('%cOmnichannel: Mobile → Tablet → Desktop Sidebar', 'color:#3de8ff;');
console.log('%cAll data is simulated. Static — GitHub Pages ready.', 'color:#a78bfa;');
