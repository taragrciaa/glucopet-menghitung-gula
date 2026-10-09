const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const ls = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  },
};
const load = (k) => {
  try {
    return JSON.parse(ls.get(k));
  } catch (e) {
    return null;
  }
};

/* ---------- Navigasi (floating pill) ---------- */
const TABS = [
  ["faktapedia", "Faktapedia"],
  ["kalkulator", "Kalkulator"],
  ["lens", "Gula Lens"],
  ["kuliner", "Kuliner"],
  ["hydration", "Hidrasi"],
];
const IC = {
  faktapedia:
    '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  kalkulator:
    '<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h2M14 18h2"/>',
  lens: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  kuliner:
    '<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6M17 21V3c-2 1-3 4-3 8h3"/>',
  hydration: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
};
$("#bnav").innerHTML = TABS.map(
  ([id, l]) =>
    `<button class="nb" data-t="${id}" aria-label="${l}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[id]}</svg>${l}</button>`
).join("");
function go(id) {
  if (!TABS.some((t) => t[0] === id)) id = "faktapedia";
  $$(".tab").forEach((t) => t.classList.toggle("active", t.id === id));
  $$(".nb").forEach((b) => b.classList.toggle("on", b.dataset.t === id));
  scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", "#" + id);
}
function toast(t) {
  const d = document.createElement("div");
  d.className = "toast";
  d.textContent = t;
  document.body.append(d);
  setTimeout(() => d.remove(), 1800);
}

/* ---------- Faktapedia ---------- */
const art = (e, e2, a, b) =>
  `<div class="art" style="--a:${a};--b:${b}"><svg viewBox="0 0 200 110" aria-hidden="true"><circle cx="30" cy="25" r="22" fill="#fff" opacity=".3"/><circle cx="175" cy="88" r="30" fill="#fff" opacity=".25"/><path d="M0 95q50-30 100 0t100-10v25H0z" fill="#fff" opacity=".35"/><text x="100" y="80" font-size="70" text-anchor="middle">${e}</text><text x="36" y="52" font-size="26" text-anchor="middle">${e2}</text><text x="168" y="50" font-size="22" text-anchor="middle">${e2}</text><path d="M150 12l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#fff"/></svg></div>`;
const DANGER = [
  [
    "🧬",
    "🩸",
    "Diabetes Tipe-2 Usia Muda & Resistensi Insulin",
    "Gula berlebih terus-menerus membuat sel makin kebal terhadap insulin. Gula darah menumpuk dan pankreas kelelahan, bahkan di usia 20-an.",
    "#FF6B8B",
    "#8A2BE2",
  ],
  [
    "⚡",
    "😵",
    "Sugar Spike & Sugar Crash",
    "Gula darah melonjak cepat lalu jatuh drastis: lemas, mengantuk, brain fog saat belajar atau kuliah, dan pengin ngemil manis lagi.",
    "#fbbf24",
    "#FF6B8B",
  ],
  [
    "🧏‍♀️",
    "🧴",
    "Skin Aging & Jerawat",
    "Glikasi: gula menempel pada kolagen dan elastin sehingga kulit kaku, kusam, dan keriput lebih cepat. Lonjakan insulin juga memicu jerawat.",
    "#00F5D4",
    "#8A2BE2",
  ],
  [
    "🌸",
    "🩺",
    "PCOS & Ketidakseimbangan Hormon",
    "Insulin tinggi mendorong hormon androgen naik pada remaja perempuan: haid tidak teratur, jerawat hormonal, dan bulu berlebih.",
    "#f9a8d4",
    "#a78bfa",
  ],
  [
    "🫀",
    "🍔",
    "Non-Alcoholic Fatty Liver",
    "Fruktosa berlebih diolah hati menjadi lemak. Lama-lama lemak menumpuk di hati, bahkan pada orang yang tampak kurus.",
    "#fb923c",
    "#FF6B8B",
  ],
  [
    "🦷",
    "🪥",
    "Karies Gigi & Peradangan Sistemik",
    "Bakteri mulut mengubah gula jadi asam yang mengikis email gigi. Peradangan gusi kronis juga dikaitkan dengan peradangan di seluruh tubuh.",
    "#67e8f9",
    "#00F5D4",
  ],
  [
    "😴",
    "🌙",
    "Kualitas Tidur & Mood Swings",
    "Naik-turun gula darah, terutama dari minuman manis malam hari, dikaitkan dengan tidur gelisah. Efek crash bikin mood gampang berubah dan cepat marah.",
    "#c4b5fd",
    "#8A2BE2",
  ],
];
$("#danger").innerHTML = DANGER.map(
  ([e, e2, t, p, a, b]) =>
    `<article class="card dc" tabindex="0">${art( e, e2, a, b )}<h3>${t}</h3><p>${p}</p></article>`
).join("");
const ALIAS = [
  [
    "Sukrosa (Sucrose)",
    "Gula meja: gabungan glukosa dan fruktosa.",
    "Gula pasir, minuman manis, kue, permen.",
    "Cepat menaikkan gula darah; berlebihan memicu karies gigi dan kenaikan berat badan.",
  ],
  [
    "HFCS",
    "Sirup jagung fruktosa tinggi: pemanis cair dari pati jagung.",
    "Soda, minuman kemasan, saus, roti kemasan.",
    "Fruktosa berlebih diolah hati jadi lemak, dikaitkan dengan fatty liver dan resistensi insulin.",
  ],
  [
    "Maltodextrin",
    "Karbohidrat olahan dari pati. Rasanya tidak terlalu manis tapi indeks glikemiknya tinggi.",
    "Minuman bubuk, kopi sachet, snack, suplemen.",
    "Gula darah naik cepat walau kamu tidak merasa makan yang manis.",
  ],
  [
    "Dextrose",
    "Nama lain glukosa dari jagung.",
    "Permen, minuman olahraga, roti, sosis olahan.",
    "Cepat diserap sehingga memicu sugar spike lalu crash.",
  ],
  [
    "Agave Nectar",
    "Sirup dari tanaman agave dengan kandungan fruktosa tinggi.",
    'Minuman "sehat", granola, kopi premium.',
    "Tetap gula tambahan; fruktosanya membebani hati jika berlebihan.",
  ],
  [
    "Evaporated Cane Juice",
    "Sari tebu yang diuapkan, pada dasarnya gula tebu kurang olahan.",
    "Yogurt, granola bar, minuman berlabel natural.",
    "Dihitung gula tambahan, sama seperti gula pasir.",
  ],
  [
    "Glukosa",
    "Gula sederhana, sumber energi utama tubuh.",
    "Sirup, permen, minuman isotonik.",
    "Diserap sangat cepat: lonjakan gula darah lalu lemas.",
  ],
  [
    "Fruktosa",
    "Gula buah. Kalau ditambahkan terpisah, dampaknya berbeda dari buah utuh yang berserat.",
    "Soda, minuman kemasan, selai.",
    "Diproses di hati; berlebihan berubah menjadi lemak hati.",
  ],
  [
    "Sirup Beras",
    "Pemanis dari beras yang difermentasi.",
    'Snack bar "alami", sereal, camilan sehat.',
    "Indeks glikemik tinggi, gula darah naik cepat.",
  ],
  [
    "Molase",
    "Sirup kental hitam sisa pembuatan gula tebu.",
    "Kue jahe, saus BBQ, gula merah.",
    "Ada sedikit mineral, tapi tetap gula tambahan.",
  ],
  [
    "Madu",
    "Pemanis alami yang sekitar 80% terdiri dari gula.",
    "Teh madu, saus, granola, minuman kekinian.",
    "Kalau ditambahkan ke makanan atau minuman, tetap dihitung gula tambahan.",
  ],
  [
    "Konsentrat Jus Buah",
    "Jus yang airnya diuapkan sehingga gulanya pekat.",
    "Jus kemasan, permen buah, yogurt rasa buah.",
    "Serat hilang, gula terkonsentrasi dan cepat diserap.",
  ],
];
$("#alias").innerHTML = ALIAS.map(
  (a, i) => `<button data-i="${i}">${a[0]}</button>`
).join("");
$("#alias").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const a = ALIAS[b.dataset.i];
  $(
    "#mb"
  ).innerHTML = `<h3 class="gt">${a[0]}</h3><p><b>📖 Pengertian:</b> ${a[1]}</p><p><b>🛒 Biasa ditemukan di:</b> ${a[2]}</p><p><b>🧍 Efek pada tubuh:</b> ${a[3]}</p><small class="muted">Aturan cepat: kalau bahan ini ada di 3 urutan pertama komposisi, produknya tinggi gula.</small>`;
  $("#modal").hidden = false;
});
const MYTHS = [
  [
    "🍯",
    "Gula Aren, Madu & Gula Jawa",
    "Mitos: aman dikonsumsi sebanyak-banyaknya.",
    "Kalori dan glukosanya tetap dihitung sebagai gula tambahan (added sugar).",
  ],
  [
    "🧪",
    "Pemanis Zero Calorie",
    "Mitos: 100% sehat tanpa efek samping.",
    "Penggunaan berlebih dapat mengganggu mikrobioma usus dan membuat kepekaan terhadap rasa manis menurun.",
  ],
  [
    "🍎",
    "Buah Segar vs Boba",
    "Mitos: buah segar sama bahayanya dengan boba.",
    "Buah utuh kaya serat yang memperlambat penyerapan gula.",
  ],
  [
    "🌿",
    "Stevia",
    "Mitos: stevia sepenuhnya sintetis dan berbahaya.",
    "Stevia berasal dari tanaman, tanpa kalori, dan relatif aman bila dipakai bijak.",
  ],
  [
    "🧃",
    "Jus Buah Kemasan",
    "Mitos: sama sehatnya dengan buah potong utuh.",
    "Jus kemasan sering kehilangan serat dan ditambah sirup fruktosa cair.",
  ],
  [
    "👵",
    "Diabetes Hanya untuk Lansia",
    "Mitos: diabetes cuma menyerang orang tua.",
    "Diabetes tipe-2 pada remaja dan dewasa muda makin sering ditemukan akibat gaya hidup sedenter dan minuman kekinian.",
  ],
  [
    "🍞",
    "Pemicu Diabetes",
    "Mitos: makanan manis satu-satunya pemicu.",
    "Karbohidrat olahan berlebih, kurang tidur, dan stres juga memicu resistensi insulin.",
  ],
  [
    "☕",
    "Minuman Panas vs Dingin",
    "Mitos: hanya minuman dingin yang tinggi gula.",
    "Kopi panas dengan sirup atau kental manis bisa sama tingginya.",
  ],
];
$("#myths").innerHTML = MYTHS.map(
  ([e, t, m, f]) =>
    `<button class="card flip" aria-label="${t}"><div class="fi"><div class="fa"><span class="emo">${e}</span><b>${t}</b><small>${m}</small></div><div class="fb"><b>✅ Fakta</b>${f}</div></div></button>`
).join("");
$("#myths").addEventListener("click", (e) => {
  const f = e.target.closest(".flip");
  if (f) f.classList.toggle("f");
});
$("#hacks").innerHTML = [
  ["🧋", "Boba: pilih less sugar 25%"],
  ["🥤", "Soda → air soda + jeruk nipis"],
  ["🍌", "Wafer → pisang + selai kacang"],
  ["☕", "Kopi susu → tanpa gula tambahan"],
]
  .map(([e, t]) => `<div class="card hk"><span>${e}</span>${t}</div>`)
  .join("");

/* ---------- Helper ---------- */
const lvl = (g, k = 0) =>
  g >= 25
    ? ["r", "Tinggi Gula", "🔴"]
    : g >= 10
    ? ["y", "Sedang", "🟡"]
    : k >= 300
    ? ["y", "Tinggi Kalori", "🟡"]
    : ["g", "Aman", "🟢"];
const sdt = (g) => String(+(g / 4).toFixed(1));
const RATES = [
  ["🏃‍♂️", "Joging / Lari", 10],
  ["🚶‍♀️", "Jalan cepat", 4.5],
  ["🚴‍♂️", "Gowes sepeda", 7.5],
  ["🧘‍♀️", "Skipping / Workout", 12],
];
const burnHTML = (k) =>
  k <= 0
    ? "<p>🎉 Tidak ada kalori yang perlu dibakar.</p>"
    : `<div class="burn">${RATES.map( ([i, n, r]) => `<div class="b"><big>${i}</big><b>${Math.max( 5, Math.round(k / r) )} menit</b><small>${n}</small></div>` ).join( "" )}</div><small class="muted">Estimasi untuk berat badan ±60 kg.</small>`;
function resultHTML(n, g, k, note, rk) {
  const [c, l, d] = rk || lvl(g, k);
  return `<div class="card pad"><h3>${n}</h3><span class="badge ${c}">${d} ${l}</span><div class="nums"><div><b class="gt">${g} g</b>gula</div><div><b class="gt">${sdt( g )} 🍵</b>sdt</div><div><b class="gt">${k}</b>kkal</div></div><p>${ g >= 25 ? "Satu porsi ini sudah melewati separuh batas aman remaja (25 g)." : g >= 10 ? "Boleh sesekali, imbangi dengan gerak." : k >= 300 ? "Gulanya rendah, tapi kalori dan garamnya tinggi. Jaga porsi." : "Relatif aman, tetap jaga porsi." }</p><h4>🔥 Cara membakarnya</h4>${burnHTML(k)}<p>${ g || k ? `💧 Disarankan minum +${Math.min( 4, Math.max(1, Math.ceil(g / 12)) )} gelas air putih ekstra untuk bantu metabolisme.` : "💧 Pilihan terbaik! Pertahankan." }</p>${ g || k ? `<button class="btn add" data-n="${n}" data-g="${g}" data-k="${k}">+ Catat ke Konsumsi Gula Hari Ini</button>` : '<button class="btn alt wadd">+ Catat Air Putih 250 ml</button>' }${note ? `<p><small class="muted">${note}</small></p>` : ""}</div>`;
}

/* ---------- Daily Sugar Tracker ---------- */
const day = new Date().toDateString();
let LOG = load("gg_log");
if (!LOG || LOG.d !== day) LOG = { d: day, items: [] };
let LIM = +ls.get("gg_lim") || 50;
function renderTrk() {
  const g = Math.round(LOG.items.reduce((s, i) => s + i.g, 0)),
    k = LOG.items.reduce((s, i) => s + i.k, 0),
    p = Math.min(100, Math.round((g / LIM) * 100)),
    c = g > LIM ? "r" : g > LIM * 0.7 ? "y" : "g";
  $(
    "#trk"
  ).innerHTML = `<h2 class="gt">📊 Gula Tracker Harian</h2><div class="card pad"><div class="nums"><div><b class="gt">${g} g</b>terkonsumsi</div><div><b class="gt">${sdt( g )} 🍵</b>sdt</div><div><b class="gt">${LIM} g</b>batas aman</div></div><div class="bar"><i class="${c}" style="width:${p}%"></i></div><p>${ g > LIM ? "🔴 Melewati batas! Imbangi dengan gerak dan air putih." : g > LIM * 0.7 ? "🟡 Hampir batas. Pilih yang tanpa gula dulu." : "🟢 Masih aman. Lanjut hari ini!" } (${k} kkal tercatat)</p>${ LOG.items.length ? `<ul class="log">${LOG.items .map( (i, x) => `<li><span>${i.n}</span><b>${i.g} g</b><button class="del" data-x="${x}" aria-label="Hapus ${i.n}">✕</button></li>` ) .join( "" )}</ul><button class="btn alt" id="rs">Reset hari ini</button>` : '<p class="muted">Belum ada catatan. Tekan "+ Catat" di Kuliner atau Gula Lens.</p>' }</div>`;
  $("#chip").textContent = `${g}/${LIM} g`;
  $("#hs").textContent = `Hari ini kamu mencatat ${g} g dari batas ${LIM} g.`;
  ls.set("gg_log", JSON.stringify(LOG));
  renderDash();
}
function renderDash() {
  const g = Math.round(LOG.items.reduce((s, i) => s + i.g, 0)),
    k = LOG.items.reduce((s, i) => s + i.k, 0),
    t = target(),
    wp = Math.min(100, Math.round((H.ml / t) * 100));
  $(
    "#dash"
  ).innerHTML = `<h2 class="gt">📈 Dashboard Total Harian</h2><div class="card pad"><div class="nums"><div><b class="gt">${ H.ml } ml</b>air putih (${wp}%)</div><div><b class="gt">${g} g</b>gula</div><div><b class="gt">${k}</b>kalori</div></div>${ g > LIM ? `<h4>⚠️ Asupan berlebih. Burn Solution-mu:</h4>${burnHTML(k)}<p>${ wp < 100 ? "💧 Lengkapi air putihmu sampai " + t + " ml supaya metabolisme lancar." : "💧 Air putihmu sudah cukup, pertahankan!" }</p>` : `<p>${ k ? "✅ Gulamu masih di bawah batas. Burn Solution muncul otomatis kalau melewati " + LIM + " g." : "Belum ada konsumsi tercatat hari ini." }</p>` }</div>`;
}
function add(n, g, k) {
  LOG.items.push({ n, g: +g, k: +k });
  renderTrk();
  toast("✓ Tercatat: " + n);
}
$("#trk").addEventListener("click", (e) => {
  const d = e.target.closest(".del");
  if (d) {
    LOG.items.splice(+d.dataset.x, 1);
    renderTrk();
  } else if (e.target.id === "rs") {
    LOG.items = [];
    renderTrk();
  }
});
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-t]");
  if (b) return go(b.dataset.t);
  const a = e.target.closest(".add");
  if (a) add(a.dataset.n, a.dataset.g, a.dataset.k);
  if (e.target.closest(".wadd")) {
    addWater(250);
    toast("💧 +250 ml air putih tercatat");
  }
});

/* ---------- Kalkulator ---------- */
$("#cf").onsubmit = (e) => {
  e.preventDefault();
  const a = +$("#age").value,
    w = +$("#wt").value,
    m = $("#sex").value === "m",
    f = +$("#act").value;
  const kcal = Math.round(w * (m ? 24 : 22) * f * (a > 50 ? 0.92 : 1)),
    lim = kcal * 0.1;
  let g = Math.min(50, Math.round(lim / 4));
  if (a < 19) g = Math.min(g, 25);
  LIM = g;
  ls.set("gg_lim", g);
  renderTrk();
  $(
    "#cr"
  ).innerHTML = `<div class="card pad"><h3>Batas gula amanmu</h3><div class="nums"><div><b class="gt">${g} g</b>gram</div><div><b class="gt">${sdt( g )} 🍵</b>sdt</div><div><b class="gt">10%</b>kalori harian</div></div><p>Kebutuhan energimu ±${kcal} kkal/hari, jadi gula tambahan maksimal ±${Math.round( lim )} kkal (10%, sesuai WHO). ${ a < 19 ? "Usia di bawah 19 tahun: dipakai batas AHA 25 g (6 sdt)." : "Batas umum Kemenkes: 50 g (4 sdm)." }</p><p>✅ Batas di tracker sudah diperbarui.</p></div>`;
};

/* ---------- Database Kuliner ---------- */
const F = [
  ["🍡", "Klepon (5 pcs)", "Kaki Lima & Tradisional", 150, 12],
  ["🥤", "Es Cendol / Dawet", "Kaki Lima & Tradisional", 230, 28],
  ["🍌", "Kolak Pisang", "Kaki Lima & Tradisional", 250, 30],
  ["🧁", "Bika Ambon (1 potong)", "Kaki Lima & Tradisional", 200, 18],
  ["🥞", "Martabak Manis (1 slice)", "Kaki Lima & Tradisional", 330, 28],
  ["🍥", "Putu Mayang", "Kaki Lima & Tradisional", 180, 15],
  ["🍙", "Kue Lupis", "Kaki Lima & Tradisional", 190, 17],
  ["🍧", "Es Doger", "Kaki Lima & Tradisional", 280, 32],
  ["🥥", "Es Teler", "Kaki Lima & Tradisional", 300, 35],
  ["🥞", "Kue Serabi", "Kaki Lima & Tradisional", 200, 14],
  ["🍬", "Dodol (4 pcs)", "Kaki Lima & Tradisional", 180, 22],
  ["🍌", "Nagasari (2 pcs)", "Kaki Lima & Tradisional", 160, 12],
  ["🧊", "Es Teh Solo Manis 500ml", "Kaki Lima & Tradisional", 120, 30],
  ["🧋", "Es Boba Brown Sugar 500ml", "Kaki Lima & Tradisional", 420, 42],
  ["🥤", "Pop Ice Rasa-Rasa", "Kaki Lima & Tradisional", 220, 32],
  ["🌽", "Jasuke (Jagung Susu Keju)", "Kaki Lima & Tradisional", 270, 16],
  ["🍢", "Sempol + Saos", "Kaki Lima & Tradisional", 220, 3],
  ["🥟", "Batagor", "Kaki Lima & Tradisional", 330, 5],
  ["🍳", "Martabak Telur", "Kaki Lima & Tradisional", 400, 3],
  ["🍵", "Es Cincau", "Kaki Lima & Tradisional", 150, 24],
  ["🍨", "Es Pisang Ijo", "Kaki Lima & Tradisional", 320, 30],
  ["🥑", "Alpukat Kocok", "Kaki Lima & Tradisional", 380, 34],
  ["☕", "Kopi Botolan Kemasan", "Kemasan", 180, 24],
  ["🥫", "Soda Kaleng 330ml", "Kemasan", 140, 35],
  ["🥛", "Milkshake Botolan", "Kemasan", 220, 30],
  ["🍪", "Biskuit Sandwich Cokelat (3 pcs)", "Kemasan", 140, 10],
  ["🧃", "Susu UHT Rasa 200ml", "Kemasan", 130, 18],
  ["⚡", "Minuman Isotonik 500ml", "Kemasan", 125, 26],
  ["🫖", "RTD Milk Tea 350ml", "Kemasan", 190, 32],
  ["🍫", "Wafer Cokelat (2 pcs)", "Kemasan", 130, 10],
  ["🧋", "Teazzi Boba Milk Tea", "Boba & Tea", 380, 40],
  ["🧋", "Tianlala Brown Sugar Boba", "Boba & Tea", 420, 45],
  ["🧋", "Mixue Boba Milk Tea", "Boba & Tea", 340, 36],
  ["🧋", "Chatime Pearl Milk Tea", "Boba & Tea", 360, 38],
  ["🧋", "Xing Fu Tang Brown Sugar Boba Milk", "Boba & Tea", 450, 48],
  ["🧋", "KOI The Golden Bubble Milk Tea", "Boba & Tea", 330, 34],
  ["🍋", "Mixue Lemon Tea", "Boba & Tea", 150, 28],
  ["🍗", "Chikuro Crispy Chicken", "Dessert & Street Food", 380, 4],
  ["🍗", "Shihlin XXL Crispy Chicken", "Dessert & Street Food", 500, 6],
  ["🥞", "D'Crepes Cokelat", "Dessert & Street Food", 300, 22],
  ["🧇", "Waffle Cokelat Es Krim", "Dessert & Street Food", 380, 28],
  ["🥞", "Pancong Lumer", "Dessert & Street Food", 250, 14],
  ["🍦", "Es Krim Cone McD", "Fast Food & Es Krim", 190, 20],
  ["🍨", "McFlurry Oreo McD", "Fast Food & Es Krim", 340, 40],
  ["🍨", "Sundae KFC", "Fast Food & Es Krim", 260, 32],
  ["🍩", "Donut J.CO Glazed", "Fast Food & Es Krim", 250, 18],
  ["🥐", "Roti 'O Kopi", "Fast Food & Es Krim", 330, 22],
  ["🍦", "Mixue Ice Cream Cone", "Fast Food & Es Krim", 190, 24],
  ["🍨", "Tianlala Ice Cream Sundae", "Fast Food & Es Krim", 300, 34],
  ["🍩", "Donut J.CO Alcapone", "Fast Food & Es Krim", 330, 28],
];
const BG = {
  "Boba & Tea": ["#fbcfe8", "#8A2BE2"],
  "Dessert & Street Food": ["#fde68a", "#FF6B8B"],
  "Fast Food & Es Krim": ["#a5f3fc", "#FF6B8B"],
  "Kaki Lima & Tradisional": ["#ffd6a5", "#FF6B8B"],
  Kemasan: ["#c9fff4", "#fbbf24"],
};
let cat = "Semua";
const CATS = [
  "Semua",
  "Boba & Tea",
  "Dessert & Street Food",
  "Fast Food & Es Krim",
  "Kaki Lima & Tradisional",
  "Kemasan",
];
const renderPills = () =>
  ($("#pills").innerHTML = CATS.map(
    (c) =>
      `<button class="pill ${ c === cat ? "on" : "" }" data-c="${c}">${c}</button>`
  ).join(""));
function renderFoods() {
  const q = $("#q").value.trim().toLowerCase();
  const rows = F.map((f, i) => [f, i]).filter(
    ([f]) => (cat === "Semua" || f[2] === cat) && f[1].toLowerCase().includes(q)
  );
  $("#fg").innerHTML = rows.length
    ? rows
        .map(([f, i]) => {
          const [c, l] = lvl(f[4], f[3]);
          return `<div class="card fc" data-i="${i}" tabindex="0" role="button" style="--a:${ BG[f[2]][0] };--b:${BG[f[2]][1]}"><div class="em emo">${f[0]}</div><b>${ f[1] }</b><small>${f[3]} kkal · ${f[4]} g (${sdt( f[4] )} 🍵)</small><span class="badge ${c}">${l}</span><br><button class="mini add" data-n="${ f[1] }" data-g="${f[4]}" data-k="${f[3]}">+ Catat</button></div>`;
        })
        .join("")
    : '<p class="card pad">Tidak ketemu. Coba kata lain, atau foto makananmu di Gula Lens.</p>';
}
$("#pills").addEventListener("click", (e) => {
  const b = e.ta
