document.getElementById('fyear').textContent = new Date().getFullYear();

/* ── DADOS — edite aqui ───────────────────────────── */
const SKILLS = [
  {name:'HTML / CSS',   lvl:80},
  {name:'JavaScript',   lvl:65},
  {name:'Python',       lvl:55},
  {name:'Git / GitHub', lvl:70},
  {name:'React',        lvl:40},
  {name:'SQL',          lvl:50},
];

const TIMELINE = [
  {date:'2024', title:'Início na Programação',  sub:'Primeiro contato com código',      desc:'Pequenas aulas com vídeos do Gustavo Guanabara e o meu professor querido Eduardo Lazaro, despertando minha paixão pela tecnologia e programação.'},
  {date:'2025', title:'Primeiro Curso Técnico', sub:'Instituição / Plataforma',          desc:'Fiz provas e evolui na área, chegando a ganhar a premiação do evento do CODE EXPERIENCE de 2025 (um evento que aconteceu na UNIMAR) e assim também criando projetos e melhorando a experiência.'},
  {date:'2026', title:'Projeto Pessoal',        sub:'Desenvolvimento independente',      desc:'A criação de um site aonde envovia um projeto que precisava ter front-end, back-end e banco de dados (MySQL). Que isso me fez aprender varias linguas de programação, como PYTHON, CSS, JS, HTML, SQL e etc...'},
];

const HOBBIES = [
  {e:'🎮', n:'Games'}, {e:'🎵', n:'Música'}, {e:'📚', n:'Leitura'},
  {e:'💻', n:'Código'},{e:'🎬', n:'Filmes'}, {e:'🌐', n:'Internet'}, {e:'🏐', n:'Vôlei'},
];

const GOALS = [
  {i:'🚀', t:'Carreira em Tech',    d:'Meu objetivo profissional é atuar na área de TI como programadora, especialmente no setor bancário, buscando crescimento, estabilidade e desenvolvimento contínuo na tecnologia.'},
  {i:'🎓', t:'Educação Contínua',   d:'Planejo conquistar cursos, graduações e certificações na área de TI, com foco em programação, desenvolvimento de sistemas, banco de dados, segurança da informação e novas tecnologias, buscando ampliar meus conhecimentos e crescer profissionalmente no setor.'},
  {i:'🌍', t:'Impacto Real',        d:'Quero deixar um legado de inovação, crescimento e contribuição para a sociedade por meio da tecnologia, criando soluções que facilitem a vida das pessoas e gerem impacto positivo no mundo. A tecnologia será uma ferramenta essencial para transformar ideias em projetos, promover avanços e abrir oportunidades para um futuro melhor.'},
];

const LINKS = [
  {e:'💼', l:'LinkedIn',  u:'https://www.linkedin.com/in/sofia-rafaela-600129365/'},
  {e:'🐙', l:'GitHub',    u:'https://github.com/SofridaBr'},
  {e:'📧', l:'E-mail',    u:'NÃO PERMITIDO O ACESSO AO EMAIL SEM A AUTORIZAÇÃO'},
  {e:'📱', l:'meu Instagram: sof1a_x9 ', u:'https://www.instagram.com/sof1a_x9/'},
];
/* ─────────────────────────────────────────────────── */

/* render skills */
(function(){
  const c = document.getElementById('skills-container');
  SKILLS.forEach(s => {
    const d = document.createElement('div');
    d.className = 'skill-row';
    d.innerHTML = `
      <div class="skill-row-left">
        <span class="skill-name">${s.name}</span>
        <div class="skill-bar-bg"><div class="skill-bar-fill" data-lvl="${s.lvl}"></div></div>
      </div>
      <div class="skill-pct">${s.lvl}<span style="font-size:1rem;color:var(--red);">%</span></div>`;
    c.appendChild(d);
  });
})();

/* render timeline */
(function(){
  const c = document.getElementById('timeline-container');
  TIMELINE.forEach(t => {
    const d = document.createElement('div');
    d.className = 'tl-item';
    d.innerHTML = `
      <span class="tl-date">${t.date}</span>
      <div class="tl-body">
        <span class="tl-title">${t.title}</span>
        <span class="tl-sub">${t.sub}</span>
        <p class="tl-desc">${t.desc}</p>
      </div>`;
    c.appendChild(d);
  });
})();

/* render hobbies */
(function(){
  const c = document.getElementById('hobbies-container');
  HOBBIES.forEach(h => {
    const d = document.createElement('div');
    d.className = 'hobby-card';
    d.innerHTML = `<span class="hobby-emoji">${h.e}</span><span class="hobby-label">${h.n}</span>`;
    c.appendChild(d);
  });
})();

/* render goals */
(function(){
  const c = document.getElementById('goals-container');
  GOALS.forEach(g => {
    const d = document.createElement('div');
    d.className = 'goal-card';
    d.innerHTML = `<span class="goal-icon">${g.i}</span><div class="goal-title">${g.t}</div><p class="goal-desc">${g.d}</p>`;
    c.appendChild(d);
  });
})();

/* render links */
(function(){
  const c = document.getElementById('links-container');
  LINKS.forEach(l => {
    const a = document.createElement('a');
    a.className = 'link-row';
    a.href = l.u;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `<span class="link-emoji">${l.e}</span><span class="link-label">${l.l}</span><span class="link-url">${l.u}</span>`;
    c.appendChild(a);
  });
})();

/* ── INTERSECTION OBSERVER — reveal on scroll ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, {threshold: 0.1});

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => obs.observe(el));

/* staggered tl-items */
const tlObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const items = document.querySelectorAll('.tl-item');
      items.forEach((it, i) => {
        setTimeout(() => it.classList.add('in'), i * 150);
      });
      tlObs.disconnect();
    }
  });
}, {threshold: 0.1});
const tlSection = document.getElementById('trajetoria');
if (tlSection) tlObs.observe(tlSection);

/* staggered hobby cards */
const hobbyObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.hobby-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('in'), i * 80);
      });
      hobbyObs.disconnect();
    }
  });
}, {threshold: 0.1});
const hobbySection = document.getElementById('hobbies');
if (hobbySection) hobbyObs.observe(hobbySection);

/* staggered goal cards */
const goalObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.goal-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('in'), i * 120);
      });
      goalObs.disconnect();
    }
  });
}, {threshold: 0.1});
const goalSection = document.getElementById('objetivos');
if (goalSection) goalObs.observe(goalSection);

/* staggered link rows */
const linkObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.link-row').forEach((r, i) => {
        setTimeout(() => r.classList.add('in'), i * 100);
      });
      linkObs.disconnect();
    }
  });
}, {threshold: 0.1});
const contactSection = document.getElementById('contato');
if (contactSection) linkObs.observe(contactSection);

/* staggered contact cards */
const ccObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.contact-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('in'), i * 120);
      });
      ccObs.disconnect();
    }
  });
}, {threshold: 0.1});
if (contactSection) ccObs.observe(contactSection);

/* skill bars on scroll */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(b => {
        b.style.width = b.dataset.lvl + '%';
      });
      skillObs.disconnect();
    }
  });
}, {threshold: 0.2});
const skillSec = document.getElementById('habilidades');
if (skillSec) skillObs.observe(skillSec);

/* custom cursor */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  ring.style.left = (rx - 16) + 'px';
  ring.style.top  = (ry - 16) + 'px';
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => ring.style.transform = 'scale(1.8)');
  el.addEventListener('mouseleave', () => ring.style.transform = 'scale(1)');
});
