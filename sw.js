/* Kiraya Register — offline cache */
/* Bump this version on every release, otherwise the old page keeps
   being served from the cache and the update never appears. */
var CACHE = "kiraya-register-v2";
var SHELL = ["./","./index.html","./manifest.webmanifest",
             "./icon-192.png","./icon-512.png","./icon-512-maskable.png","./apple-touch-icon.png"];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return Promise.all(SHELL.map(function(u){
        return c.add(u).catch(function(){}); })); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){
          try{ c.put(req, copy); }catch(err){}
        });
        return res;
      }).catch(function(){
        return req.mode === "navigate" ? caches.match("./index.html") : Response.error();
      });
    })
  );
});
