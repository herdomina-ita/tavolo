const C = 'tavolo-v33';
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "a35.html", "a5.html", "a55.html", "adiario.html", "agiornale.html", "pv_seed.enc.json", "mostri35.json", "mostri5.json", "mostri55.json", "incantesimi5.json", "incantesimi55.json", "maps/01_thessarim.jpg", "maps/15_pieve.jpg", "maps/16_cantafiume.jpg", "maps/17_ossidra.jpg", "maps/18_grimmaro.jpg", "maps/19_lirathel.jpg", "maps/20_velaurenna.jpg", "maps/21_sassoquieto.jpg", "maps/22_brumafonda.jpg"];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // prima la rete (così gli aggiornamenti arrivano subito), poi la copia salvata se sei offline
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html'))));
});
