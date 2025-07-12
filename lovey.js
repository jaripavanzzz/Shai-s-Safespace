// Countdown
const pad2 = n => String(n).padStart(2, '0');
const startDate = new Date('2024-07-13');

function nextAnniversary() {
  const now = new Date();
  let t = new Date(now.getFullYear(), 6, 13, 0, 0, 0);
  if (t < now) t = new Date(now.getFullYear() + 1, 6, 13, 0, 0, 0);
  return t;
}

function monthDiff(a, b) {
  let m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) m--;
  return Math.max(0, m);
}

function updateCounters() {
  const now = new Date();
  const diffS = Math.max(0, Math.floor((nextAnniversary() - now) / 1000));
  const days = Math.floor(diffS / 86400);
  const hours = Math.floor((diffS % 86400) / 3600);
  const minutes = Math.floor((diffS % 3600) / 60);
  const seconds = diffS % 60;

  document.getElementById('days').textContent = pad2(days);
  document.getElementById('hours').textContent = pad2(hours);
  document.getElementById('minutes').textContent = pad2(minutes);
  document.getElementById('seconds').textContent = pad2(seconds);

  const months = monthDiff(startDate, now);
  const years = Math.floor(months / 12);
  document.getElementById('monthsTogether').textContent = pad2(months);
  document.getElementById('yearsTogether').textContent = years;
}
updateCounters();
setInterval(updateCounters, 1000);

// Gallery
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-image');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  slides.forEach(slide => slide.classList.remove('active'));
  slides[currentSlide].classList.add('active');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

let slideInterval = setInterval(nextSlide, 5000);
function pauseSlideshow() { clearInterval(slideInterval); }
function resumeSlideshow() { slideInterval = setInterval(nextSlide, 5000); }

document.getElementById('nextBtn').addEventListener('click', () => { nextSlide(); pauseSlideshow(); setTimeout(resumeSlideshow, 10000); });
document.getElementById('prevBtn').addEventListener('click', () => { prevSlide(); pauseSlideshow(); setTimeout(resumeSlideshow, 10000); });
dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); pauseSlideshow(); setTimeout(resumeSlideshow, 10000); }));
document.querySelector('.gallery-container').addEventListener('mouseenter', pauseSlideshow);
document.querySelector('.gallery-container').addEventListener('mouseleave', resumeSlideshow);

// Floating Hearts
function createHearts() {
  const heartContainer = document.getElementById('floatingHearts');
  const colors = ['#f5d0fe', '#e9d5ff', '#d8b4fe', '#c084fc'];
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${4 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.transform = `scale(${0.5 + Math.random()})`;
    heartContainer.appendChild(heart);
  }
}
createHearts();

// Notes
const modal = document.getElementById("noteModal");
const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveNoteBtn");
const cancelBtn = document.getElementById("cancelNoteBtn");
const addNoteBtn = document.getElementById("openModalBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("loveNotes")) || [];
let editingIndex = null;

function saveToStorage() { localStorage.setItem("loveNotes", JSON.stringify(notes)); }
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.dataset.index = index;
    noteDiv.innerHTML = `<div class="note-date">${note.date}</div><div class="note-content">${note.content}</div><div class="note-actions hidden"><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button></div>`;
    notesContainer.appendChild(noteDiv);
  });
}
renderNotes();

addNoteBtn.addEventListener("click", () => { noteInput.value = ""; editingIndex = null; modal.classList.remove("hidden"); });
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
saveBtn.addEventListener("click", () => {
  const content = noteInput.value.trim(); if (!content) return;
  const now = new Date(); const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  if (editingIndex !== null) notes[editingIndex] = { content, date: dateStr }; else notes.unshift({ content, date: dateStr });
  saveToStorage(); renderNotes(); modal.classList.add("hidden");
});
notesContainer.addEventListener("click", (e) => {
  const noteDiv = e.target.closest(".note");
  const index = parseInt(noteDiv.dataset.index);
  if (e.target.classList.contains("edit-btn")) { editingIndex = index; noteInput.value = notes[index].content; modal.classList.remove("hidden"); }
  if (e.target.classList.contains("delete-btn")) { notes.splice(index, 1); saveToStorage(); renderNotes(); }
  if (!e.target.classList.contains("edit-btn") && !e.target.classList.contains("delete-btn")) { noteDiv.querySelector(".note-actions").classList.toggle("hidden"); }
});

// Games
const gamesBtn = document.querySelector('.fa-gamepad')?.closest('.nav-btn');
const gamesModal = document.getElementById('gamesModal');
const closeGamesModal = document.getElementById('closeGamesModal');
gamesBtn?.addEventListener('click', () => gamesModal.classList.remove('hidden'));
closeGamesModal?.addEventListener('click', () => gamesModal.classList.add('hidden'));

// Certificate Modal elements
const certificateBtn = document.getElementById('certificateBtn');
const certificateModal = document.getElementById('certificateModal');
const closeCertModal = document.getElementById('closeCertModal');

const marriageCertBtn = document.getElementById('marriageCertBtn');
const gfCertBtn = document.getElementById('gfCertBtn');

const certImageModal = document.getElementById('certImageModal');
const certImage = document.getElementById('certImage');
const closeCertImageModal = document.getElementById('closeCertImageModal');

// Show the certificate modal when nav button clicked
certificateBtn.addEventListener('click', () => {
  certificateModal.classList.remove('hidden');
});

// Close the certificate modal
closeCertModal.addEventListener('click', () => {
  certificateModal.classList.add('hidden');
});

// Show Marriage Certificate
marriageCertBtn.addEventListener('click', () => {
  certImage.src = 'certs/virtualcert.png';
  certImageModal.classList.remove('hidden');
  certificateModal.classList.add('hidden');
});

// Show Girlfriend Certificate
gfCertBtn.addEventListener('click', () => {
  certImage.src = 'certs/gfcert.png';
  certImageModal.classList.remove('hidden');
  certificateModal.classList.add('hidden');
});

// Close the certificate image modal
closeCertImageModal.addEventListener('click', () => {
  certImageModal.classList.add('hidden');
});

// Dashboard elements
const dashboardBtn = document.querySelector('.nav-side .nav-icon .nav-btn i.fa-chart-pie').parentElement;
const dashboardModal = document.getElementById('dashboardModal');
const closeDashboardModal = document.getElementById('closeDashboardModal');

dashboardBtn.addEventListener('click', () => {
  dashboardModal.classList.remove('hidden');
});

closeDashboardModal.addEventListener('click', () => {
  dashboardModal.classList.add('hidden');
});

// === Mood Meter ===
const moodMeter = document.getElementById('moodMeter');
const moodPercentage = document.getElementById('moodPercentage');
const moodDescription = document.getElementById('moodDescription');

moodMeter.addEventListener('input', () => {
  const value = moodMeter.value;

  let moodText = '';
  let moodEmoji = '';
  let moodColor = '';

  if (value >= 80) {
    moodText = 'Super Happy!';
    moodEmoji = '😁';
    moodColor = '#4ade80'; // green
  } else if (value >= 60) {
    moodText = 'Happy!';
    moodEmoji = '😊';
    moodColor = '#a3e635'; // light green
  } else if (value >= 40) {
    moodText = 'Okay!';
    moodEmoji = '😐';
    moodColor = '#facc15'; // yellow
  } else if (value >= 20) {
    moodText = 'A bit down...';
    moodEmoji = '😕';
    moodColor = '#f97316'; // orange
  } else {
    moodText = 'Needs love and hugs!';
    moodEmoji = '🥺';
    moodColor = '#ef4444'; // red
  }

  moodPercentage.textContent = `${value}%`;
  moodDescription.textContent = `${moodText} ${moodEmoji}`;
  moodDescription.style.color = moodColor;
});


// Kiss Counter
const kissCountBtn = document.getElementById('kissCountBtn');
const kissCount = document.getElementById('kissCount');

let kissTotal = 0;

kissCountBtn.addEventListener('click', (e) => {
  kissTotal++;
  kissCount.textContent = kissTotal;

  // Create the kiss emoji
  const kiss = document.createElement('div');
  kiss.textContent = '💋';
  kiss.className = 'kiss-pop';

  // Get position relative to the viewport
  const rect = kissCountBtn.getBoundingClientRect();
  kiss.style.left = `${rect.left + rect.width / 2}px`;
  kiss.style.top = `${rect.top}px`;

  // Add to body
  document.body.appendChild(kiss);

  // Remove after animation
  setTimeout(() => {
    kiss.remove();
  }, 1000);
});



// PIE CHART
// === PIE CHART - 3D Cute ===
const pieData = [
  {
    label: 'Love',
    value: 40,
    color: '#8E7DBE',
    message: 'I didn’t expect to love you this much — but here we are.'
  },
  {
    label: 'Care',
    value: 30,
    color: '#9FB3DF',
    message: 'You’ve always been there in ways I didn’t know I needed.'
  },
  {
    label: 'Affection',
    value: 20,
    color: '#A6D6D6',
    message: 'Even the smallest moments with you stay with me.'
  },
  {
    label: 'Trust',
    value: 10,
    color: '#F7CFD8',
    message: 'We’ve been through enough to know this is real.'
  }
];


const canvas = document.getElementById('lovePieChart');
const ctx = canvas.getContext('2d'); // ✅ Needed!
const total = pieData.reduce((sum, slice) => sum + slice.value, 0); // ✅ Needed!
const slices = []; // ✅ Needed!

ctx.clearRect(0, 0, canvas.width, canvas.height);

let startAngle = 0;

pieData.forEach(slice => {
  const sliceAngle = 2 * Math.PI * slice.value / total;

  // Shadow offset slice for 3D depth
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 + 3, canvas.height / 2 + 3);
  ctx.arc(canvas.width / 2 + 3, canvas.height / 2 + 3, canvas.width / 2 - 20, startAngle, startAngle + sliceAngle);
  ctx.closePath();
  ctx.fillStyle = '#c084fc33';
  ctx.fill();

  // Main slice with cute gradient
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 20, startAngle, startAngle + sliceAngle);
  ctx.closePath();

  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 10,
    canvas.width / 2, canvas.height / 2, canvas.width / 2
  );
  gradient.addColorStop(0, '#ffffff88');
  gradient.addColorStop(1, slice.color);

  ctx.fillStyle = gradient;
  ctx.fill();

  // Optional crisp pastel edge
  ctx.strokeStyle = '#fff9ff';
  ctx.lineWidth = 2;
  ctx.stroke();

  slices.push({
    start: startAngle,
    end: startAngle + sliceAngle,
    label: slice.label,
    message: slice.message
  });

  startAngle += sliceAngle;
});

// Legend
const legend = document.getElementById('legend');
legend.innerHTML = '';
pieData.forEach(slice => {
  const li = document.createElement('li');
  li.innerHTML = `<span style="display:inline-block;width:12px;height:12px;background:${slice.color};margin-right:6px;border-radius:2px;"></span> ${slice.label} (${slice.value}%)`;
  legend.appendChild(li);
});

// Tooltip
const tooltip = document.createElement('div');
tooltip.style.position = 'fixed';
tooltip.style.padding = '8px 12px';
tooltip.style.background = '#fff9ff';
tooltip.style.border = '1px solid #d8b4fe';
tooltip.style.borderRadius = '8px';
tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
tooltip.style.fontFamily = 'DM Sans, sans-serif';
tooltip.style.fontSize = '14px';
tooltip.style.display = 'none';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '9999';
document.body.appendChild(tooltip);

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left - canvas.width / 2;
  const y = e.clientY - rect.top - canvas.height / 2;

  const dist = Math.sqrt(x * x + y * y);
  const angle = Math.atan2(y, x);
  const fixedAngle = angle >= 0 ? angle : (2 * Math.PI + angle);

  let found = false;

  if (dist <= canvas.width / 2 - 20) {
    for (const slice of slices) {
      if (fixedAngle >= slice.start && fixedAngle <= slice.end) {
        tooltip.innerHTML = slice.message;
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
        found = true;
        break;
      }
    }
  }

  if (!found) {
    tooltip.style.display = 'none';
  }
});


const songsModal = document.getElementById('songsModal');
const closeSongsModal = document.getElementById('closeSongsModal');

// Get the Songs nav button (the one with fa-music)
const songsBtn = document.querySelector('.nav-btn i.fa-music').parentElement;

songsBtn.addEventListener('click', () => {
  songsModal.classList.remove('hidden');
});

closeSongsModal.addEventListener('click', () => {
  songsModal.classList.add('hidden');
});

// Story Modal
const storyBtn = document.querySelector('.fa-heart')?.closest('.nav-btn');
const storyModal = document.getElementById('storyModal');
const closeStoryModal = document.getElementById('closeStoryModal');

storyBtn?.addEventListener('click', () => {
  storyModal.classList.remove('hidden');
});

closeStoryModal?.addEventListener('click', () => {
  storyModal.classList.add('hidden');
});


// Example list — you should replace this with your own!
const reasons = [
  "Your smile brightens my day",
  "You always listen to me",
  "You make me feel safe",
  "You believe in us",
  "You make me laugh a lot",
  "You call me baby",
  "You send good morning texts",
  "You wait for my replies",
  "You trust me fully",
  "You tell me I’m pretty",
  "You remember small things",
  "You love my flaws too",
  "You handle my moods",
  "You dream with me",
  "You let me vent freely",
  "You never give up on us",
  "You say I love you daily",
  "You make me feel wanted",
  "You understand my silence",
  "You always check on me",
  "You send silly memes",
  "You say you miss me",
  "You stay up for me",
  "You remind me to eat",
  "You remind me to rest",
  "You know my fav songs",
  "You call when I’m sad",
  "You love my weirdness",
  "You make me feel heard",
  "You want forever with me",
  "You share your secrets",
  "You share your fears too",
  "You send me cute selfies",
  "You love my sleepy voice",
  "You don’t let me feel alone",
  "You plan our future dates",
  "You give me sweet names",
  "You write me love notes",
  "You calm down my storms",
  "You’re my safest haven",
    "You love my good & bad days",
  "You help me stay strong",
  "You bring out my best",
  "You say sweet things",
  "You love my family",
  "You make me your home",
  "You tell me your dreams",
  "You’re my favorite call",
  "You text me baby",
  "You give me reasons",
  "You care for my health",
  "You love my quirks",
  "You make me feel safe",
  "You warm my heart daily",
  "You make distance bearable",
  "You plan our trips",
  "You promise to wait",
  "You love my sleepy face",
  "You always say baby",
  "You share your thoughts",
  "You trust me fully",
  "You protect my heart",
  "You accept my flaws",
  "You tell me your secrets",
  "You love late calls",
  "You want forever us",
  "You love my clingy side",
  "You remind me drink water",
  "You help me calm down",
  "You say sorry first",
  "You love my smile",
  "You stay loyal always",
  "You check on my day",
  "You spoil me softly",
  "You share silly dreams",
  "You stay strong for me",
  "You show real love",
  "You fight for us",
  "You wait patiently",
  "You talk about forever",
  "You call me baby girl",
  "You make me blush",
  "You believe in me",
  "You love me fully",
  "You keep my secrets",
  "You choose me daily",
  "You pick me always",
  "You call me yours",
  "You are my home",
  "You make me feel loved",
  "You understand my fears",
  "You warm my cold days",
  "You love late nights",
  "You stay on calls",
  "You give me butterflies",
  "You send cute snaps",
  "You make me giggle",
  "You love my giggles",
  "You say you’re mine",
  "You hold my heart",
  "You talk me to sleep",
  "You love my tiny voice",
  "You light up my world",
  "You handle my drama",
  "You never leave me",
  "You write me poems",
  "You send sweet vids",
  "You talk about babies",
  "You keep my pics safe",
  "You keep our secrets",
  "You trust my words",
  "You stay even mad",
  "You hug me in words",
  "You make me brave",
  "You wipe my tears",
  "You share your days",
  "You want my hugs",
  "You plan to cuddle",
  "You promise more days",
  "You watch me sleep",
  "You share your food pics",
  "You talk about forever",
  "You make plans with me",
  "You let me baby you",
  "You stay silly with me",
  "You say we got this",
  "You dream of our place",
  "You send sleepy calls",
  "You save my voice notes",
  "You keep my letters",
  "You want forever kisses",
  "You beg me sleep early",
  "You love my chaos",
  "You know my moods",
  "You remind my meds",
  "You praise my smile",
  "You tell me jokes",
  "You melt my heart",
  "You make my day good",
  "You calm my storms",
  "You laugh at my jokes",
  "You share your wins",
  "You share your losses",
  "You tell me first",
  "You tease me softly",
  "You trust my love",
  "You keep my heart safe",
  "You hold my secrets close",
  "You plan us baby",
  "You say we’ll last",
  "You dream of us",
  "You hug me tight",
  "You send sweet quotes",
  "You wait for me",
  "You never rush me",
  "You say sorry quick",
  "You heal my scars",
  "You send I miss you",
  "You call me bae",
  "You brag about me",
  "You choose my flaws",
  "You stay loyal baby",
  "You trust my word",
  "You hold my hand soon",
  "You say good night",
  "You beg for kisses",
  "You keep old chats",
  "You love old pics",
  "You save us baby",
  "You miss my voice",
  "You plan our room",
  "You want our bed",
  "You buy us gifts",
  "You dream our life",
  "You say our names",
  "You wait for forever",
  "You promise rings",
  "You give me peace",
  "You share your mind",
  "You love my vibe",
  "You calm my storms",
  "You keep my smile",
  "You choose my soul",
  "You guard our love",
  "You keep me yours",
  "You promise always",
  "You warm my dreams",
  "You whisper my name",
  "You giggle my jokes",
  "You watch my shows",
  "You crave my hugs",
  "You plan my trips",
  "You save my memes",
  "You spam my phone",
  "You crave my touch",
  "You trust my heart",
  "You guard my smile",
  "You wipe my tears",
  "You hold my hand tight",
  "You wish me luck",
  "You guard my secrets",
  "You claim my love",
  "You hold my pillow",
  "You miss my scent",
  "You love my chaos",
  "You calm my panic",
  "You hype my goals",
  "You get my moods",
  "You read my mind",
  "You sing me songs",
  "You joke my fears away",
  "You watch the stars",
  "You dream our kids",
  "You plan our vows",
  "You hold my pinky",
  "You calm my mind",
  "You know my signs",
  "You share my taste",
  "You guard my trust",
  "You crave my warmth",
  "You mend my heart",
  "You feed my soul",
  "You color my life",
  "You make me soft",
  "You make me brave",
  "You push my limits",
  "You wait my rants",
  "You match my vibe",
  "You claim my nights",
  "You hold my hopes",
  "You keep my spark",
  "You tame my mess",
  "You guide my way",
  "You share my sky",
  "You guard my fire",
  "You kiss my flaws",
  "You hold my rain",
  "You break my walls",
  "You read my eyes",
  "You keep my fire",
  "You light my gloom",
  "You hug my doubts",
  "You hush my rage",
  "You kiss my crown",
  "You love my core",
  "You choose my soul",
  "You keep my worth",
  "You keep my smile",
  "You guard my days",
  "You hush my storms",
  "You dream my path",
  "You ease my pain",
  "You calm my storms",
  "You hold my dawns",
  "You keep my faith",
  "You match my weird",
  "You hype my shine",
  "You guard my truth",
  "You want my love",
  "You hold my scars",
  "You hush my fears",
  "You watch my dreams",
  "You crave my touch",
  "You match my heart",
  "You fill my gaps",
  "You hush my cries",
  "You guard my soul",
  "You keep me whole",
  "You stay my home",
  "You keep me baby",
  "You steal my heart daily",
  "You fight my worries",
  "You heal my tired mind",
  "You warm my sleepy nights",
  "You fix my sad days",
  "You watch my fave shows",
  "You giggle at my typos",
  "You love my lazy days",
  "You promise more hugs",
  "You call me your girl",
  "You keep my faith strong",
  "You send silly videos",
  "You blow me kisses",
  "You dream of our pets",
  "You watch sunsets with me",
  "You read my rants fully",
  "You hype my selfies",
  "You tease my pout",
  "You love my selfies",
  "You call me your baby",
  "You write me random lines",
  "You hype my dreams",
  "You fight my overthinking",
  "You hold my cold hands",
  "You plan our future place",
  "You match my late nights",
  "You keep my voice safe",
  "You draw our plans",
  "You say we’re strong",
  "You watch my funny reels",
  "You share your secrets deep",
  "You remind me to rest early",
  "You know my cravings",
  "You promise warm hugs",
  "You buy cute gifts",
  "You write me cute letters",
  "You mark our dates",
  "You watch my silly sides",
  "You vibe with my music",
  "You send your cute pics",
  "You send me good vibes",
  "You tell me forever stories",
  "You wish to see me soon",
  "You wait my long talks",
  "You share your playlist",
  "You match my weird jokes",
  "You spoil my worries",
  "You keep my hopes alive",
  "You never stop loving me",
  "You dream my tomorrow",
  "You watch my sleepy face",
  "You protect our dreams",
  "You hold my messy days",
  "You bring me soft peace",
  "You guard our future",
  "You fix my sad heart",
  "You keep me feeling loved",
  "You choose me over and over",
  "You hug my dreams close",
  "You whisper sweet nothings",
  "You hold my sleepy talks",
  "You keep my soft side warm",
  "You say I’m your world",
  "You remind me I’m enough",
  "You prove forever daily",
  "You stay my safe place",
  "You keep my baby heart",
  "You plan our anniversaries",
  "You light my cloudy days",
  "You hold my sleepy secrets",
  "You share your silly dance",
  "You send me rain sounds",
  "You love my bedtime voice",
  "You ask about my dreams",
  "You show me your tears too",
  "You promise not to drift",
  "You crave our morning hugs",
  "You share new playlists",
  "You praise my little wins",
  "You send me calm words",
  "You talk about our wedding",
  "You save our old selfies",
  "You remember our firsts",
  "You wish me sweet nights",
  "You remind me I’m enough",
  "You hug my sleepy mind",
  "You call me your safe place",
  "You tell me I’m perfect",
  "You crave my laughter daily",
  "You plan our next sleepover",
  "You love my random talks",
  "You dream of our sunrise",
  "You whisper I’m your peace",
  "You promise to hold tight",
  "You stay when storms come"

];


while (reasons.length < 365) {
  reasons.push(`Reason #${reasons.length + 1}`);
}

const reasonsGrid = document.getElementById("reasonsGrid");

reasons.forEach((reason, index) => {
  const card = document.createElement("div");
  card.className = "reason-card";

  card.innerHTML = `
    <div class="reason-inner">
      <div class="reason-front">${index + 1}</div>
      <div class="reason-back">${reason}</div>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  reasonsGrid.appendChild(card);
});

// === Reasons Modal ===
const reasonsModal = document.getElementById("reasonsModal");
const openReasonsBtn = document.getElementById("reasonsBtn");
const closeReasonsBtn = document.getElementById("closeReasonsModal");

openReasonsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  reasonsModal.classList.remove("hidden");
});

closeReasonsBtn.addEventListener("click", () => {
  reasonsModal.classList.add("hidden");
});

const reminders = {
  selfLove: [
    "Huwag kalimutan magpahinga, baby.",
    "Drink water love, important ka sa akin.",
    "You deserve to rest without feeling guilty.",
    "Breathe in, breathe out. I'm proud of you.",
    "You don’t need to be perfect to be loved.",
    "Take care of yourself the way you care for others.",
    "Don’t forget to eat ha, mahalaga ka.",
    "You are worthy of love and care — always.",
    "It’s okay to say no sometimes.",
    "You matter even on the days you feel small."
  ],
  affirmation: [
    "You’re doing enough, and I’m so proud of you.",
    "Always remember you’re beautiful, inside and out.",
    "You are smart, strong, and capable.",
    "Your presence makes this world better.",
    "I believe in you more than you know.",
    "You are more than your mistakes.",
    "You bring light into my life every day.",
    "You deserve kindness, especially from yourself.",
    "You inspire me with your strength.",
    "You are love, and you are loved."
  ],
  gratitude: [
    "Thank you for existing, love.",
    "I appreciate all the little things you do.",
    "Salamat sa pagiging ikaw.",
    "You make my days brighter just by being here.",
    "Thank you for always trying your best.",
    "Grateful ako sa patience mo, always.",
    "I don’t say it enough, but thank you for loving me.",
    "Your presence is my safe space.",
    "Thank you for being my peace.",
    "Life is better with you in it."
  ],
  motivation: [
    "Kaya mo yan, baby. I believe in you.",
    "One step at a time, I’m with you.",
    "Keep going — you’re closer than you think.",
    "Laban lang, mahal. I got you.",
    "You’ve overcome so much already.",
    "Don’t give up. I’m cheering for you.",
    "Rest if you must, but don’t quit.",
    "You’re capable of amazing things.",
    "Whatever happens, I’ll support you.",
    "You’re stronger than your doubts."
  ],
  reassurance: [
    "No matter what, I choose you.",
    "Walang iwanan, okay?",
    "I’m always here, even on your worst days.",
    "I love you through everything.",
    "You’ll never face anything alone.",
    "Hindi ka nag-iisa, mahal.",
    "My heart is your home — always.",
    "I accept you, flaws and all.",
    "I’ll stay, even when it’s hard.",
    "You’re safe with me."
  ],
  everyday: [
    "Good morning, my lovey dovey! Have a good day.",
    "I miss you, drink your milk na.",
    "Ingat ka today, bae bae. I’m thinking of you.",
    "Don’t forget to eat lunch, ha?",
    "How was your day, baby?",
    "I’m proud of you today, as always.",
    "Sleep well later, I’ll be dreaming of you.",
    "Good night, mahal ko. I love you.",
    "Sending hugs and kisses kahit malayo.",
    "Message me if you need anything, okay?"
  ]
};


let selectedCategory = "";

document.querySelectorAll(".reminder-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;
    document.getElementById("reminderOutput").innerText = 
      `Category: ${btn.innerText} selected. Click Get Reminder!`;
  });
});

document.getElementById("getReminderBtn").addEventListener("click", () => {
  if (!selectedCategory) {
    alert("Please select a category first!");
    return;
  }
  const list = reminders[selectedCategory];
  const randomReminder = list[Math.floor(Math.random() * list.length)];
  document.getElementById("reminderOutput").innerText = randomReminder;
});

document.getElementById("copyReminderBtn").addEventListener("click", () => {
  const text = document.getElementById("reminderOutput").innerText;
  navigator.clipboard.writeText(text);
  alert("Reminder copied!");
});

// === REMINDERS MODAL ===
const remindersBtn = document.getElementById('remindersBtn');
const remindersModal = document.getElementById('remindersModal');
const closeRemindersModal = document.getElementById('closeRemindersModal');

remindersBtn.addEventListener('click', () => {
  remindersModal.classList.remove('hidden');
});

closeRemindersModal.addEventListener('click', () => {
  remindersModal.classList.add('hidden');
});

// === Reminder Buttons Highlight + Logic ===
const reminderButtons = document.querySelectorAll('.reminder-btn');

// let selectedCategory = ""; // make sure defined! (REMOVED duplicate)

reminderButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove highlight sa lahat
    reminderButtons.forEach(b => b.classList.remove('active'));
    // Add highlight sa pinindot
    btn.classList.add('active');

    // Update selectedCategory
    selectedCategory = btn.dataset.category;

    // Update output
    document.getElementById("reminderOutput").innerText = 
      ` ${btn.innerText} selected.`;
  });
});

document.getElementById("getReminderBtn").addEventListener("click", () => {
  if (!selectedCategory) {
    alert("Please select a category first!");
    return;
  }
  const list = reminders[selectedCategory];
  const randomReminder = list[Math.floor(Math.random() * list.length)];
  document.getElementById("reminderOutput").innerText = randomReminder;
});

document.getElementById("copyReminderBtn").addEventListener("click", () => {
  const text = document.getElementById("reminderOutput").innerText;
  navigator.clipboard.writeText(text);
  alert("Reminder copied!");
});

const wishesData = {
  health: [
    "I wish you always stay in good health, body and mind.",
    "I wish you never forget to take breaks when you need them.",
    "I wish you sleep peacefully every night and wake up refreshed.",
    "I wish your body stays strong even on your busiest days.",
    "I wish you remember to eat on time and drink enough water.",
    "I wish your mind stays calm when life gets overwhelming.",
    "I wish your heart feels light and free from stress.",
    "I wish your body gets all the rest it deserves.",
    "I wish you never push yourself too hard just to meet others’ expectations.",
    "I wish you always prioritize your own well-being — because you matter so much."
  ],
  happiness: [
    "I wish you always find reasons to smile, even on tough days.",
    "I wish your heart stays full of joy and peace.",
    "I wish little things bring you big happiness.",
    "I wish you laugh a little louder, smile a little wider.",
    "I wish your days are filled with sunshine and warmth.",
    "I wish your happiness grows stronger every day.",
    "I wish you feel truly loved and appreciated always.",
    "I wish happiness finds you in the smallest moments.",
    "I wish you never have to pretend to be okay — just be you.",
    "I wish you wake up each day with a heart that’s excited for life."
  ],
  success: [
    "I wish you reach every goal you set for yourself.",
    "I wish all your hard work turns into beautiful results.",
    "I wish your dreams keep you inspired, not pressured.",
    "I wish you never doubt how talented and capable you are.",
    "I wish success follows you wherever you go.",
    "I wish you see progress, even in small steps.",
    "I wish you find joy not just in the destination, but in the journey.",
    "I wish your efforts are seen, valued, and rewarded.",
    "I wish you never forget how far you’ve already come.",
    "I wish you always feel proud of yourself — because I sure am."
  ],
  peace: [
    "I wish your thoughts are kind to you today.",
    "I wish your heart feels safe and at ease.",
    "I wish your worries slowly fade away, one by one.",
    "I wish you find quiet in the noise around you.",
    "I wish peace finds you when you need it most.",
    "I wish you feel supported and not alone in anything.",
    "I wish your mind is free from pressure and heavy thoughts.",
    "I wish you know that it’s okay to rest and let go sometimes.",
    "I wish your soul feels calm, even in chaos.",
    "I wish you find peace in knowing how deeply you're loved."
  ]
};

const pastelColors = [
  "#f5d0fe", "#e9d5ff", "#d8b4fe", "#c084fc",
  "#a5b4fc", "#93c5fd", "#a7f3d0", "#fef9c3",
  "#fde68a", "#fbcfe8", "#fecdd3", "#fca5a5"
];


const wishesBtn = document.getElementById('wishesBtn');
const wishesModal = document.getElementById('wishesModal');
const closeWishesModal = document.getElementById('closeWishesModal');
const wishButtons = document.querySelectorAll('.wish-cat-btn');
const wishBubbles = document.getElementById('wishBubbles');
const popupModal = document.getElementById('wishPopupModal');
const popupText = document.getElementById('wishMessageText');

const closeWishPopupBtn = document.getElementById('closeWishPopupBtn');

closeWishPopupBtn.addEventListener('click', () => {
  popupModal.classList.add('hidden');
});



wishesBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  wishesModal.classList.remove('hidden');
  wishBubbles.innerHTML = "";
});

closeWishesModal?.addEventListener('click', () => {
  wishesModal.classList.add('hidden');
});

popupModal.addEventListener('click', () => {
  popupModal.classList.add('hidden');
});

// Bubble logic
wishButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    const wishes = wishesData[category];
    if (wishes && wishes.length) {
      wishBubbles.innerHTML = "";
      const shuffled = wishes.sort(() => 0.5 - Math.random()).slice(0, 10);
      shuffled.forEach((wish, i) => {
        const bubble = document.createElement('div');
        bubble.className = 'wish-bubble';
        bubble.textContent = i + 1;
        bubble.style.background = pastelColors[i % pastelColors.length];
        bubble.style.animationDelay = `${i * 0.1}s`;
        bubble.addEventListener('click', () => {
          popupText.textContent = wish;
          popupModal.classList.remove('hidden');
        });
        wishBubbles.appendChild(bubble);
      });
    }
  });
}); 



// === Ideas Modal ===
const ideasBtn = document.getElementById("ideasBtn");
const ideasModal = document.getElementById("ideasModal");
const closeIdeasModal = document.getElementById("closeIdeasModal");
const spinBtn = document.getElementById("spinBtn");

const spinCanvas = document.getElementById("spinWheel");
const spinCtx = spinCanvas.getContext("2d");
const radius = spinCanvas.width / 2;

const dateIdeas = [
  "Movie night",
  "Cute brunch date",
  "Beach day",
  "Picnic date",
  "Arcade date",
  "Karaoke night",
  "Sunset walk",
  "Sleepover",
  "Stargazing",
  "Art museum visit",
  "Bookstore date",
  "Thrift shopping",
  "Home cooking date",
  "Bake together",
  "DIY photoshoot",
  "Ice cream date",
  "Bike ride",
  "Painting session",
  "Mall stroll",
  "Matching outfit day",
  "Scrapbooking",
  "Rainy day cuddle",
  "Bubble bath together",
  "Board game night",
  "Surprise gift exchange"
];

let angle = 0;
let isSpinning = false;

function drawWheel() {
  const sliceAngle = (2 * Math.PI) / dateIdeas.length;
  for (let i = 0; i < dateIdeas.length; i++) {
    const startAngle = i * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    spinCtx.fillStyle = i % 2 === 0 ? "#f9a8d4" : "#c4b5fd";
    spinCtx.beginPath();
    spinCtx.moveTo(radius, radius);
    spinCtx.arc(radius, radius, radius, startAngle, endAngle);
    spinCtx.closePath();
    spinCtx.fill();

    spinCtx.fillStyle = "#fff";
    spinCtx.font = "12px DM Sans";
    spinCtx.save();
    spinCtx.translate(radius, radius);
    spinCtx.rotate(startAngle + sliceAngle / 2);
    spinCtx.textAlign = "right";
    spinCtx.fillText(dateIdeas[i], radius - 10, 5);
    spinCtx.restore();
  }

  // Draw center
  spinCtx.beginPath();
  spinCtx.arc(radius, radius, 30, 0, 2 * Math.PI);
  spinCtx.fillStyle = "#fff";
  spinCtx.fill();
}

drawWheel();

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;

  let spinAngle = Math.random() * 360 + 360 * 5;
  let duration = 3000;
  let start = performance.now();

  function animate(time) {
    let elapsed = time - start;
    let progress = Math.min(elapsed / duration, 1);
    angle = spinAngle * easeOut(progress);

    spinCtx.clearRect(0, 0, spinCanvas.width, spinCanvas.height);
    spinCtx.save();
    spinCtx.translate(radius, radius);
    spinCtx.rotate((angle * Math.PI) / 180);
    spinCtx.translate(-radius, -radius);
    drawWheel();
    spinCtx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
const sliceSize = 360 / dateIdeas.length;
const normalizedAngle = (360 - (angle % 360) + sliceSize / 2) % 360;
const index = Math.floor(normalizedAngle / sliceSize);
const finalIdea = dateIdeas[index];


      document.getElementById("spinResultText").textContent = finalIdea;
      document.getElementById("spinPopupModal").classList.remove("hidden");
      isSpinning = false;
    }
  }

  requestAnimationFrame(animate);
});

function easeOut(t) {
  return 1 - Math.pow(1 - t, 4);
}

ideasBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ideasModal.classList.remove("hidden");
});

closeIdeasModal.addEventListener("click", () => {
  ideasModal.classList.add("hidden");
});

document.getElementById("closeSpinPopupBtn").addEventListener("click", () => {
  document.getElementById("spinPopupModal").classList.add("hidden");
});
