/* Kiraya Register — offline cache */
/* Bump this version on every release. */
var CACHE = "kiraya-register-v3";
var SHELL = ["./","./index.html","./manifest.webmanifest",
             "./icon-192.png","./icon-512.png","./icon-512-maskable.png","./apple-touch-icon.png"];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return Promise.all(SHELL.map(function(u){ return c.add(u).catch(function(){}); })); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  /* The app page: try the network first so updates show up, fall back to cache offline. */
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ try{ c.put("./index.html", copy); }catch(err){} });
        return res;
      }).catch(function(){
        return caches.match("./index.html").then(function(hit){ return hit || caches.match("./"); });
      })
    );
    return;
  }
  /* Everything else: cache first. */
  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ try{ c.put(req, copy); }catch(err){} });
        return res;
      });
    })
  );
});
