/* Arena of Ascension offline cache. Bump V when you want every device to refetch everything. */
const V="aoa-v1",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-512-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET"||!/^https?:$/.test(new URL(r.url).protocol))return;
 if(r.mode==="navigate"){ /* game page: newest when online, cached copy when offline */
  e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put("index.html",cp))}return res}).catch(()=>caches.match("index.html")));return}
 /* everything else (icons, Google Fonts): cache first, saved on first use */
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit)))});
