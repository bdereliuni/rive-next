if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-2e6be583"],(function(e){"use strict";importScripts("fallback-T0uJbM3BfoBHpWiKH8gqY.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/T0uJbM3BfoBHpWiKH8gqY/_buildManifest.js",revision:"5612abb0408e3371ba4ecdb9735d27f4"},{url:"/_next/static/T0uJbM3BfoBHpWiKH8gqY/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2e447de6-f9346130bd85e4fa.js",revision:"f9346130bd85e4fa"},{url:"/_next/static/chunks/310c80d6-d12041a7d587ed26.js",revision:"d12041a7d587ed26"},{url:"/_next/static/chunks/668daf73-1b9f3bb39ad23022.js",revision:"1b9f3bb39ad23022"},{url:"/_next/static/chunks/731-d0296918699cfb6e.js",revision:"d0296918699cfb6e"},{url:"/_next/static/chunks/762-0bf5e258138e12c6.js",revision:"0bf5e258138e12c6"},{url:"/_next/static/chunks/81a1f101-427dffc2ee1b4753.js",revision:"427dffc2ee1b4753"},{url:"/_next/static/chunks/843-12ad75ea0cb05855.js",revision:"12ad75ea0cb05855"},{url:"/_next/static/chunks/89-98ec45de29d87b9d.js",revision:"98ec45de29d87b9d"},{url:"/_next/static/chunks/framework-a85322f027b40e20.js",revision:"a85322f027b40e20"},{url:"/_next/static/chunks/main-fc02befdf20d271c.js",revision:"fc02befdf20d271c"},{url:"/_next/static/chunks/pages/404-8fd4d0704953a15e.js",revision:"8fd4d0704953a15e"},{url:"/_next/static/chunks/pages/_app-9f74fb376fb04ecb.js",revision:"9f74fb376fb04ecb"},{url:"/_next/static/chunks/pages/_error-6ed33d885c3d4532.js",revision:"6ed33d885c3d4532"},{url:"/_next/static/chunks/pages/_offline-85184cdc417a3a13.js",revision:"85184cdc417a3a13"},{url:"/_next/static/chunks/pages/anime-d649419f683b542f.js",revision:"d649419f683b542f"},{url:"/_next/static/chunks/pages/collections-112354ee657883cb.js",revision:"112354ee657883cb"},{url:"/_next/static/chunks/pages/collections/%5Bid%5D-e60375958b044560.js",revision:"e60375958b044560"},{url:"/_next/static/chunks/pages/detail-0d5865576fa4aed4.js",revision:"0d5865576fa4aed4"},{url:"/_next/static/chunks/pages/disclaimer-9aade0306d61feaa.js",revision:"9aade0306d61feaa"},{url:"/_next/static/chunks/pages/downloads-b2543aca0448f9b0.js",revision:"b2543aca0448f9b0"},{url:"/_next/static/chunks/pages/index-8c2374ff331003a6.js",revision:"8c2374ff331003a6"},{url:"/_next/static/chunks/pages/kdrama-a4b2ce167a2ba114.js",revision:"a4b2ce167a2ba114"},{url:"/_next/static/chunks/pages/library-557c1a20920e30fe.js",revision:"557c1a20920e30fe"},{url:"/_next/static/chunks/pages/login-c304ef68dc1f4f60.js",revision:"c304ef68dc1f4f60"},{url:"/_next/static/chunks/pages/movie-9563fbdb8ff45c30.js",revision:"9563fbdb8ff45c30"},{url:"/_next/static/chunks/pages/person-6ee9dc77f9c61876.js",revision:"6ee9dc77f9c61876"},{url:"/_next/static/chunks/pages/search-a820d38e6ac7b7f3.js",revision:"a820d38e6ac7b7f3"},{url:"/_next/static/chunks/pages/settings-b6ba2cd4256d68a8.js",revision:"b6ba2cd4256d68a8"},{url:"/_next/static/chunks/pages/signup-e3ce44c8a1b28567.js",revision:"e3ce44c8a1b28567"},{url:"/_next/static/chunks/pages/tv-c29d6ddf2a94458a.js",revision:"c29d6ddf2a94458a"},{url:"/_next/static/chunks/pages/watch-bcd532b10beb9db2.js",revision:"bcd532b10beb9db2"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/14296ee578c95608.css",revision:"14296ee578c95608"},{url:"/_next/static/css/4b11e89c0bd1aa57.css",revision:"4b11e89c0bd1aa57"},{url:"/_next/static/css/55d5b60f515ee5c5.css",revision:"55d5b60f515ee5c5"},{url:"/_next/static/css/5ec60df0deec27bb.css",revision:"5ec60df0deec27bb"},{url:"/_next/static/css/6cd525702419cfb7.css",revision:"6cd525702419cfb7"},{url:"/_next/static/css/6d51124d68540057.css",revision:"6d51124d68540057"},{url:"/_next/static/css/76fd050f72dacefc.css",revision:"76fd050f72dacefc"},{url:"/_next/static/css/ec34bb769b4b5124.css",revision:"ec34bb769b4b5124"},{url:"/_next/static/css/facbd3b28fb2f82b.css",revision:"facbd3b28fb2f82b"},{url:"/_offline",revision:"T0uJbM3BfoBHpWiKH8gqY"},{url:"/icons/icon-192x192.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/icons/icon-256x256.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/icons/icon-384x384.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/icons/icon-512x512.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/images/A_professional_monochromatic_abstract_icon_with.jpg",revision:"b133b913d0015cfb14c807ad253373b3"},{url:"/images/logo.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/images/logo.svg",revision:"c586ed2fa02ecb08de955d0e2e4368a8"},{url:"/images/logo512.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/images/logo512.svg",revision:"c586ed2fa02ecb08de955d0e2e4368a8"},{url:"/images/logoBlack.svg",revision:"c586ed2fa02ecb08de955d0e2e4368a8"},{url:"/images/logoImg.jpg",revision:"b133b913d0015cfb14c807ad253373b3"},{url:"/images/logoSq.png",revision:"09f501f4960230041f569f93945c1b63"},{url:"/images/logoWhite.svg",revision:"c586ed2fa02ecb08de955d0e2e4368a8"},{url:"/manifest.json",revision:"f4b1921ffe9da117feb23cdd4f293ed9"},{url:"/robots.txt",revision:"38e8e9b46a0ff06a1a6b561f919815af"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
