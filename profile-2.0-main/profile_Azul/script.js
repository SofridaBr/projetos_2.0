document.getElementById('footer-year').textContent = new Date().getFullYear();

const defaultData = {
  skills: [
    { name: 'HTML / CSS', level: 80 },
    { name: 'JavaScript', level: 65 },
    { name: 'Python', level: 55 },
    { name: 'Git / GitHub', level: 70 },
    { name: 'React', level: 40 },
    { name: 'SQL', level: 50 },
  ],
  timeline: [
    { date: '2022', title: 'Inicio na Programacao', sub: 'Primeiro contato com codigo', desc: 'Descreva como foi sua introducao ao mundo da tecnologia e o que te motivou a comecar.' },
    { date: '2023', title: 'Primeiro Curso Tecnico', sub: 'Instituicao / Plataforma', desc: 'Conte sobre cursos, bootcamps, projetos ou experiencias que marcaram sua jornada.' },
    { date: '2024', title: 'Projeto Pessoal', sub: 'Desenvolvimento', desc: 'Descreva um projeto que voce desenvolveu e o que aprendeu com ele.' },
  ],
  hobbies: [
    { icon: '🎮', name: 'Games' },
    { icon: '🎵', name: 'Musica' },
    { icon: '📚', name: 'Leitura' },
    { icon: '💻', name: 'Codigo' },
    { icon: '🎬', name: 'Filmes' },
    { icon: '🌐', name: 'Internet' },
  ],
  goals: [
    { icon: '🚀', title: 'CARREIRA TECH', desc: 'Descreva onde voce quer chegar profissionalmente. Qual cargo, empresa ou tipo de trabalho voce almeja?' },
    { icon: '🎓', title: 'EDUCACAO', desc: 'Quais cursos, graduacoes ou certificacoes voce planeja conquistar nos proximos anos?' },
    { icon: '🌍', title: 'IMPACTO', desc: 'Qual legado voce quer deixar? Como a tecnologia pode te ajudar a impactar o mundo ao seu redor?' },
  ],
  links: [
    { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/seuperfil' },
    { icon: '🐙', label: 'GitHub', url: 'https://github.com/seuusuario' },
    { icon: '📧', label: 'E-mail', url: 'mailto:seuemail@email.com' },
    { icon: '📱', label: 'Instagram', url: 'https://instagram.com/seuusuario' },
  ]
};

function getData() {
  try {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveData() {
  const data = {
    heroName: document.getElementById('hero-name').value,
    heroSubtitle: document.getElementById('hero-subtitle').value,
    heroDesc: document.getElementById('hero-desc').value,
    aboutName: document.getElementById('about-name').value,
    aboutLocal: document.getElementById('about-local').value,
    aboutArea: document.getElementById('about-area').value,
    aboutBio: document.getElementById('about-bio').value,
    photo: document.getElementById('avatar-box').dataset.photo || '',
    skills: collectSkills(),
    timeline: collectTimeline(),
    hobbies: collectHobbies(),
    goals: collectGoals(),
    links: collectLinks(),
  };
  localStorage.setItem('portfolio_data', JSON.stringify(data));
  const status = document.getElementById('save-status');
  status.classList.add('show');
  setTimeout(() => status.classList.remove('show'), 3000);
}

function loadSaved() {
  const saved = getData();
  if (!saved) return false;
  if (saved.heroName) document.getElementById('hero-name').value = saved.heroName;
  if (saved.heroSubtitle) document.getElementById('hero-subtitle').value = saved.heroSubtitle;
  if (saved.heroDesc) document.getElementById('hero-desc').value = saved.heroDesc;
  if (saved.aboutName) document.getElementById('about-name').value = saved.aboutName;
  if (saved.aboutLocal) document.getElementById('about-local').value = saved.aboutLocal;
  if (saved.aboutArea) document.getElementById('about-area').value = saved.aboutArea;
  if (saved.aboutBio) document.getElementById('about-bio').value = saved.aboutBio;
  if (saved.photo) {
    const box = document.getElementById('avatar-box');
    box.dataset.photo = saved.photo;
    let img = box.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      box.appendChild(img);
    }
    img.src = saved.photo;
    box.querySelector('svg').style.display = 'none';
    box.querySelector('span').style.display = 'none';
  }
  return saved;
}

function loadPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const box = document.getElementById('avatar-box');
    box.dataset.photo = ev.target.result;
    let img = box.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      box.appendChild(img);
    }
    img.src = ev.target.result;
    box.querySelector('svg').style.display = 'none';
    box.querySelector('span').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function renderSkills(skills) {
  const c = document.getElementById('skills-container');
  c.innerHTML = '';
  skills.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'card skill-card';
    div.innerHTML = `
      <div class="card-corner"></div>
      <button class="delete-btn" onclick="deleteSkill(${i})" title="Remover">✕</button>
      <input class="skill-name-input" value="${s.name}" onchange="updateSkillName(${i},this.value)" />
      <div class="skill-bar-wrap"><div class="skill-bar" data-level="${s.level}" style="width:0"></div></div>
      <div class="skill-level">
        <span>NIVEL</span>
        <input class="level-input" type="number" min="0" max="100" value="${s.level}" onchange="updateSkillLevel(${i},this.value)" />%
      </div>`;
    c.appendChild(div);
  });
  setTimeout(() => {
    document.querySelectorAll('.skill-bar').forEach(b => {
      b.style.width = b.dataset.level + '%';
    });
  }, 300);
}

let skillsData = [];
function collectSkills() {
  return skillsData;
}
function updateSkillName(i, v) { skillsData[i].name = v; }
function updateSkillLevel(i, v) {
  skillsData[i].level = Math.min(100, Math.max(0, parseInt(v) || 0));
  const bar = document.querySelectorAll('.skill-bar')[i];
  if (bar) bar.style.width = skillsData[i].level + '%';
}
function addSkill() {
  skillsData.push({ name: 'Nova Skill', level: 50 });
  renderSkills(skillsData);
}
function deleteSkill(i) {
  skillsData.splice(i, 1);
  renderSkills(skillsData);
}

function renderTimeline(items) {
  const c = document.getElementById('timeline-container');
  c.innerHTML = '';
  items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <button class="delete-btn" onclick="deleteTimeline(${i})" title="Remover">✕</button>
      <div class="timeline-date"><input class="editable-field timeline-date-input" value="${item.date}" onchange="timelineData[${i}].date=this.value" /></div>
      <div class="timeline-title"><input class="editable-field timeline-title-input" value="${item.title}" onchange="timelineData[${i}].title=this.value" /></div>
      <div class="timeline-sub"><input class="editable-field timeline-sub-input" value="${item.sub}" onchange="timelineData[${i}].sub=this.value" /></div>
      <div class="timeline-desc"><textarea class="editable-field timeline-desc-input" rows="2" onchange="timelineData[${i}].desc=this.value">${item.desc}</textarea></div>`;
    c.appendChild(div);
  });
}

let timelineData = [];
function collectTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  return Array.from(items).map(el => ({
    date: el.querySelectorAll('input')[0]?.value || '',
    title: el.querySelectorAll('input')[1]?.value || '',
    sub: el.querySelectorAll('input')[2]?.value || '',
    desc: el.querySelector('textarea')?.value || '',
  }));
}
function addTimelineItem() {
  timelineData.push({ date: '2025', title: 'Novo Marco', sub: 'Descricao', desc: 'Detalhes sobre esta experiencia.' });
  renderTimeline(timelineData);
}
function deleteTimeline(i) {
  timelineData.splice(i, 1);
  renderTimeline(timelineData);
}

function renderHobbies(hobbies) {
  const c = document.getElementById('hobbies-container');
  c.innerHTML = '';
  hobbies.forEach((h, i) => {
    const div = document.createElement('div');
    div.className = 'card hobby-card';
    div.innerHTML = `
      <div class="card-corner"></div>
      <button class="delete-btn" onclick="deleteHobby(${i})" title="Remover">✕</button>
      <input class="hobby-icon-input" value="${h.icon}" title="Cole um emoji aqui" onchange="hobbiesData[${i}].icon=this.value" />
      <input class="hobby-name-input" value="${h.name}" onchange="hobbiesData[${i}].name=this.value" />`;
    c.appendChild(div);
  });
}

let hobbiesData = [];
function collectHobbies() {
  return hobbiesData.map((_, i) => ({
    icon: document.querySelectorAll('.hobby-icon-input')[i]?.value || '',
    name: document.querySelectorAll('.hobby-name-input')[i]?.value || '',
  }));
}
function addHobby() {
  hobbiesData.push({ icon: '⭐', name: 'Novo Hobby' });
  renderHobbies(hobbiesData);
}
function deleteHobby(i) {
  hobbiesData.splice(i, 1);
  renderHobbies(hobbiesData);
}

function renderGoals(goals) {
  const c = document.getElementById('goals-container');
  c.innerHTML = '';
  goals.forEach((g, i) => {
    const div = document.createElement('div');
    div.className = 'card goal-card';
    div.innerHTML = `
      <div class="card-corner"></div>
      <button class="delete-btn" onclick="deleteGoal(${i})" title="Remover">✕</button>
      <input class="editable-field goal-icon-input" value="${g.icon}" onchange="goalsData[${i}].icon=this.value" />
      <div class="goal-title"><input class="editable-field goal-title-input" value="${g.title}" onchange="goalsData[${i}].title=this.value" /></div>
      <textarea class="editable-field goal-desc-input" rows="3" onchange="goalsData[${i}].desc=this.value">${g.desc}</textarea>`;
    c.appendChild(div);
  });
}

let goalsData = [];
function collectGoals() {
  return goalsData;
}
function addGoal() {
  goalsData.push({ icon: '🎯', title: 'NOVO OBJETIVO', desc: 'Descreva seu objetivo aqui.' });
  renderGoals(goalsData);
}
function deleteGoal(i) {
  goalsData.splice(i, 1);
  renderGoals(goalsData);
}

function renderLinks(links) {
  const c = document.getElementById('links-container');
  c.innerHTML = '';
  links.forEach((l, i) => {
    const div = document.createElement('div');
    div.className = 'card link-card';
    div.innerHTML = `
      <div class="card-corner"></div>
      <button class="delete-btn" onclick="deleteLink(${i})" title="Remover">✕</button>
      <input class="editable-field link-icon-input" value="${l.icon}" onchange="linksData[${i}].icon=this.value" />
      <div class="link-content">
        <input class="editable-field link-label-input" value="${l.label}" onchange="linksData[${i}].label=this.value" />
        <input class="editable-field link-url-input" value="${l.url}" onchange="linksData[${i}].url=this.value" />
      </div>`;
    c.appendChild(div);
  });
}

let linksData = [];
function collectLinks() {
  const cards = document.querySelectorAll('#links-container .card');
  return Array.from(cards).map(c => ({
    icon: c.querySelectorAll('input')[0]?.value || '',
    label: c.querySelectorAll('input')[1]?.value || '',
    url: c.querySelectorAll('input')[2]?.value || '',
  }));
}
function addLink() {
  linksData.push({ icon: '🔗', label: 'Novo Link', url: 'https://' });
  renderLinks(linksData);
}
function deleteLink(i) {
  linksData.splice(i, 1);
  renderLinks(linksData);
}

(function init() {
  const saved = loadSaved();
  skillsData = (saved && saved.skills) || defaultData.skills;
  timelineData = (saved && saved.timeline) || defaultData.timeline;
  hobbiesData = (saved && saved.hobbies) || defaultData.hobbies;
  goalsData = (saved && saved.goals) || defaultData.goals;
  linksData = (saved && saved.links) || defaultData.links;
  renderSkills(skillsData);
  renderTimeline(timelineData);
  renderHobbies(hobbiesData);
  renderGoals(goalsData);
  renderLinks(linksData);
})();

const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});
function animTrail() {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  trail.style.left = tx - 15 + 'px';
  trail.style.top = ty - 15 + 'px';
  requestAnimationFrame(animTrail);
}
animTrail();
document.querySelectorAll('input,textarea,button,a').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.7 ? '#00ffff' : '#00d4ff';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animParticles);
}
animParticles();

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

document.addEventListener('input', () => {
  clearTimeout(window._saveTimeout);
  window._saveTimeout = setTimeout(saveData, 2000);
});

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(b => {
        b.style.width = b.dataset.level + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#habilidades').forEach(el => skillObserver.observe(el));