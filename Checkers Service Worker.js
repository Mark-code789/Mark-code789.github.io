// Service worker
const cacheName = "Checkers-v10";
const appShellFiles = [
    "https://dl.dropbox.com/s/jjtjli844vi9psx/flag.jpeg?raw=1", 
    "https://dl.dropbox.com/s/u2rq5zwir1wb1j1/kenyan%20flag.jpeg?raw=1",
    "https://dl.dropbox.com/s/0xnacehchqt3mae/international%20flags.jpeg?raw=1",
    "https://dl.dropbox.com/s/31xm9xed0gy0y75/pool%20flag.jpeg?raw=1",
    "https://dl.dropbox.com/s/cbrkmi4elainqhm/russian%20flag.jpeg?raw=1",
    "https://dl.dropbox.com/s/j17subkdm2xa30u/nigerian%20flag.jpeg?raw=1",
    "https://dl.dropbox.com/s/ftqfb07zf6mc9x0/background.jpeg?raw=1",
    "https://dl.dropbox.com/s/ml8j2a06pz5l8h2/black%20cell.jpeg?raw=1", 
    "https://dl.dropbox.com/s/qao4ol91lj9rvpq/white%20cell.jpeg?raw=1", 
    "https://dl.dropbox.com/s/pz5bbjkxwe44mak/hint.png?raw=1", 
    "https://dl.dropbox.com/s/mxjhrg0irv814j4/menu.png?raw=1", 
    "https://dl.dropbox.com/s/xfy094x0tr2a9m8/restart.png?raw=1", 
    "https://dl.dropbox.com/s/5hl8fugh6t9vfl4/undo.png?raw=1", 
    "https://dl.dropbox.com/s/ytscnq3xjwrdr3b/about.png?raw=1", 
    "https://dl.dropbox.com/s/ullk2lgeshwiuad/black%20piece%20port1.png?raw=1", 
    "https://dl.dropbox.com/s/ogl5dcxs53fthos/white%20piece%20port.png?raw=1",
    "https://dl.dropbox.com/s/ndb82h0g81sqb88/black%20crown.png?raw=1", 
    "https://dl.dropbox.com/s/yqdlxnhvael2kbq/white%20crown.png?raw=1",
    "https://dl.dropbox.com/s/7wot2yjnfguwyex/send.png?raw=1",
    "https://dl.dropbox.com/s/vwnk6afe6143fq5/cancel.png?raw=1",
    "https://dl.dropbox.com/s/ajtw9ggxe9lnmjh/alert.png?raw=1",
    "https://dl.dropbox.com/s/08spxvjodm00uuk/confirm.png?raw=1", 
    "https://dl.dropbox.com/s/tkpm3yk20py5lvi/winner.png?raw=1",
    "https://dl.dropbox.com/s/rdhm3zyqxizf4t7/loser.png?raw=1", 
    "https://dl.dropbox.com/s/ahlbn4wh3gbgkgf/draw.png?raw=1", 
    "https://dl.dropbox.com/s/1vbgc9s51ss560x/load.png?raw=1", 
    "https://dl.dropbox.com/s/gd8hma5lxmcpj6g/lock.png?raw=1", 
    "https://dl.dropbox.com/s/k1useykdiptx6vu/star.png?raw=1", 
    "https://dl.dropbox.com/s/9g9buga12ei8fyw/button_click_003.mp3?raw=1", 
    "https://dl.dropbox.com/s/dabo10r11k98s7y/capture.mp3?raw=1", 
    "https://dl.dropbox.com/s/pbj9avbzmquc9xh/king.mp3?raw=1", 
    "https://dl.dropbox.com/s/qiyucvychewpiwk/collect.mp3?raw=1", 
    "https://dl.dropbox.com/s/z9wf6nxyyrxx9cq/game%20win.mp3?raw=1", 
    "https://dl.dropbox.com/s/uchjgfosuf17kkk/game%20lose.mp3?raw=1", 
    "Checkers Style Sheet.css", 
    "Checkers AI Player.js", 
    "Checkers UI Controller.js", 
    "Checkers Channel.js", 
    "Checkers Core Engine.js", 
    "Checkers Web Worker.js", 
    "https://cdn.pubnub.com/sdk/javascript/pubnub.4.29.9.js", 
    "index.html"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(appShellFiles);
        })
    )
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res1) => {
            if(res1) {
                if(navigator.onLine && (e.request.url.includes(".js") || e.request.url.includes(".css") || e.request.url.includes(".html"))) {
                    return fetch(e.request).then((res2) => {
                   	    return caches.open(cacheName).then((cache) => {
                            cache.put(e.request, res2.clone());
                            return res2;
                        })
                    }).catch((error) => {
                        return res1;
                    })
                } 
                return res1;
            }
            else {
                return fetch(e.request).then((res2) => {
                    return caches.open(cacheName).then((cache) => {
                        cache.put(e.request, res2.clone());
                        return res2;
                    })
                })
             }
        })
    )
});

self.addEventListener("activate", (e) => {
    const keepList = [cacheName];
    
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(keepList.indexOf(key) === -1) {
                    return caches.delete(key);
                } 
            }))
        })
    )
});



