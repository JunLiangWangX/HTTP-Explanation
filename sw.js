if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let l={};const t=e=>i(e,a),o={module:{uri:a},exports:l,require:t};s[a]=Promise.all(r.map((e=>o[e]||t(e)))).then((e=>(n(...e),l)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"ff782788cb71335de514bfa675f4aacd"},{url:"alipay.svg",revision:"d945e8f5bb6a35270cd5e898c374c2aa"},{url:"assets/alipay.1e36fa89.svg",revision:null},{url:"assets/app.4b9fb293.js",revision:null},{url:"assets/ca.49a2542b.png",revision:null},{url:"assets/cazhegnshu.420793af.png",revision:null},{url:"assets/chunks/framework.4e712ebc.js",revision:null},{url:"assets/chunks/mitmattack.bc0c91d3.js",revision:null},{url:"assets/chunks/theme.edec4b8b.js",revision:null},{url:"assets/chunks/virtual_pwa-register.4c587a43.js",revision:null},{url:"assets/chunks/workbox-window.prod.es5.a7b12eab.js",revision:null},{url:"assets/connection.md.376bc234.js",revision:null},{url:"assets/connection.md.376bc234.lean.js",revision:null},{url:"assets/cookie-example.afd89af7.png",revision:null},{url:"assets/cors-simple-request.feb010d7.png",revision:null},{url:"assets/cross-origin-request.d6f17272.png",revision:null},{url:"assets/docs_authentication-strategy_authorization.md.af3961c2.js",revision:null},{url:"assets/docs_authentication-strategy_authorization.md.af3961c2.lean.js",revision:null},{url:"assets/docs_authentication-strategy_cookie.md.8acb3519.js",revision:null},{url:"assets/docs_authentication-strategy_cookie.md.8acb3519.lean.js",revision:null},{url:"assets/docs_overview_http-message-format.md.8df548d9.js",revision:null},{url:"assets/docs_overview_http-message-format.md.8df548d9.lean.js",revision:null},{url:"assets/docs_overview_the-history-of-http.md.b644f6d8.js",revision:null},{url:"assets/docs_overview_the-history-of-http.md.b644f6d8.lean.js",revision:null},{url:"assets/docs_performance-optimization-strategy_http-cache.md.17c9bd97.js",revision:null},{url:"assets/docs_performance-optimization-strategy_http-cache.md.17c9bd97.lean.js",revision:null},{url:"assets/docs_security-strategy_common-attack-and-protection-methods.md.fdaea1b0.js",revision:null},{url:"assets/docs_security-strategy_common-attack-and-protection-methods.md.fdaea1b0.lean.js",revision:null},{url:"assets/docs_security-strategy_content-security-policy.md.bf8fb0d8.js",revision:null},{url:"assets/docs_security-strategy_content-security-policy.md.bf8fb0d8.lean.js",revision:null},{url:"assets/docs_security-strategy_cross-origin-resource-sharing.md.be7e0028.js",revision:null},{url:"assets/docs_security-strategy_cross-origin-resource-sharing.md.be7e0028.lean.js",revision:null},{url:"assets/docs_security-strategy_rescue-insecure-http-https.md.23612064.js",revision:null},{url:"assets/docs_security-strategy_rescue-insecure-http-https.md.23612064.lean.js",revision:null},{url:"assets/docs_security-strategy_same-origin-policy.md.3219a72c.js",revision:null},{url:"assets/docs_security-strategy_same-origin-policy.md.3219a72c.lean.js",revision:null},{url:"assets/docs_support.md.97306dcf.js",revision:null},{url:"assets/docs_support.md.97306dcf.lean.js",revision:null},{url:"assets/duichengjiami.dd3ebd70.png",revision:null},{url:"assets/feiduichengjiami.84e77b52.png",revision:null},{url:"assets/http-message-format-summary.2c47b02c.png",revision:null},{url:"assets/http-message-format.a42c9792.png",revision:null},{url:"assets/https-work-flow.7d8cd092.png",revision:null},{url:"assets/https.ad04f554.png",revision:null},{url:"assets/image-20230911215957339.38629e66.png",revision:null},{url:"assets/image-20230911220050215.717e7ab2.png",revision:null},{url:"assets/image-20230911220153912.5df50274.png",revision:null},{url:"assets/image-20230912104215653.427723d5.png",revision:null},{url:"assets/image-20230912110935151.68d342ee.png",revision:null},{url:"assets/index.md.816c87c0.js",revision:null},{url:"assets/index.md.816c87c0.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.33bd5a8e.woff2",revision:null},{url:"assets/inter-italic-cyrillic.ea42a392.woff2",revision:null},{url:"assets/inter-italic-greek-ext.4fbe9427.woff2",revision:null},{url:"assets/inter-italic-greek.8f4463c4.woff2",revision:null},{url:"assets/inter-italic-latin-ext.bd8920cc.woff2",revision:null},{url:"assets/inter-italic-latin.bd3b6f56.woff2",revision:null},{url:"assets/inter-italic-vietnamese.6ce511fb.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.e75737ce.woff2",revision:null},{url:"assets/inter-roman-cyrillic.5f2c6c8c.woff2",revision:null},{url:"assets/inter-roman-greek-ext.ab0619bc.woff2",revision:null},{url:"assets/inter-roman-greek.d5a6d92a.woff2",revision:null},{url:"assets/inter-roman-latin-ext.0030eebd.woff2",revision:null},{url:"assets/inter-roman-latin.2ed14f66.woff2",revision:null},{url:"assets/inter-roman-vietnamese.14ce25a6.woff2",revision:null},{url:"assets/keep-alive.md.9fec21e7.js",revision:null},{url:"assets/keep-alive.md.9fec21e7.lean.js",revision:null},{url:"assets/link.fa01132e.png",revision:null},{url:"assets/mapping.79e572bb.png",revision:null},{url:"assets/mitmattack.0a2c5c66.png",revision:null},{url:"assets/net.afa5a6fe.png",revision:null},{url:"assets/pre-request-example.e5ed04ec.png",revision:null},{url:"assets/Spriting.0ff4b35d.png",revision:null},{url:"assets/start-line-format.f559413c.png",revision:null},{url:"assets/style.e2c47112.css",revision:null},{url:"assets/wechatpay.72c57622.svg",revision:null},{url:"assets/xinrenglian.6a78ebf6.png",revision:null},{url:"ca.png",revision:"e224cbb44de0406b98a910a96e92c5ce"},{url:"cazhegnshu.png",revision:"0dc3226f899ea79d97c1be8aee06728e"},{url:"connection.html",revision:"ed6ffc83e4ef8f2151c525e76a6eba5f"},{url:"cookie-example.png",revision:"39430525d1ea5fd49f651c3216a1e808"},{url:"cors-simple-request.png",revision:"8e710669cf2526e8b472b982ced959df"},{url:"cross-origin-request.png",revision:"4b06951167e65383310489d822f3510e"},{url:"docs/authentication-strategy/authorization.html",revision:"7b167ad4c5d41969b476123986b3386d"},{url:"docs/authentication-strategy/cookie.html",revision:"05d0adbeb7c5c915f67b86b9c72aaa70"},{url:"docs/overview/http-message-format.html",revision:"303a03495005ea2a1240d0a2af9dcd72"},{url:"docs/overview/the-history-of-http.html",revision:"98e88a79725de45c87fc33e082da1f30"},{url:"docs/performance-optimization-strategy/http-cache.html",revision:"d001c4a2e90ad2f9a6bb22b0bf197ab7"},{url:"docs/security-strategy/common-attack-and-protection-methods.html",revision:"e3861d607e8099cc8471f10606adb7fd"},{url:"docs/security-strategy/content-security-policy.html",revision:"6f5f873b05c0d3cc29aa3c57244d2dad"},{url:"docs/security-strategy/cross-origin-resource-sharing.html",revision:"10fb2e7f1dff5d6a71f4c2a8bff11009"},{url:"docs/security-strategy/rescue-insecure-http-https.html",revision:"70680571c6d666b6b1afa8aeef573db3"},{url:"docs/security-strategy/same-origin-policy.html",revision:"f0c55cd0dfee76fb4e3185d7c720129e"},{url:"docs/support.html",revision:"8b90b33c3faeb986a6c15bd53d085904"},{url:"duichengjiami.png",revision:"cdd4a3a84f9ac4649dda103a858704fa"},{url:"feiduichengjiami.png",revision:"1c3697f6bac82e361272988b62aab9c8"},{url:"http-message-format-summary.png",revision:"cda144f78a337e0a21bd81fc38296d1a"},{url:"http-message-format.png",revision:"056cc4c914f760bb4132865c3c043d56"},{url:"https-work-flow.png",revision:"8640e02f487490ce6dc14c064a330601"},{url:"https.png",revision:"ab16e3e03bee3707fd76f7a6ba3b6569"},{url:"image-20230911215957339.png",revision:"ceca97e9f1834ce0ac6b026000283759"},{url:"image-20230911220044790.png",revision:"5598118ddb09b05e9f8632e57869044f"},{url:"image-20230911220048543.png",revision:"5598118ddb09b05e9f8632e57869044f"},{url:"image-20230911220050215.png",revision:"5598118ddb09b05e9f8632e57869044f"},{url:"image-20230911220153912.png",revision:"c583c833a876c6cc3d834c495c09147d"},{url:"image-20230912104215653.png",revision:"c34f9bd94d043a042c802f0c97106298"},{url:"image-20230912110935151.png",revision:"753ff400d2aabfff6159f138d0cdf12f"},{url:"index.html",revision:"88d2926997cde46a6c3651695aa82566"},{url:"keep-alive.html",revision:"d4e96ed2ffa93fad473282d7fc8353ca"},{url:"link.png",revision:"aeb123aba705ac910bc669287d0d74af"},{url:"logo-128.svg",revision:"099c9cec87d7e1dbc24fc6d7b55fbda2"},{url:"logo-144.svg",revision:"77779611469480200a22b49db51537fe"},{url:"logo-256.svg",revision:"b4ba238c323becd93964ac67ecdd4a7f"},{url:"logo-512.svg",revision:"80fb1b9c65d49d3aff8cd4c8c0ba907e"},{url:"logo-64.svg",revision:"c649b025f76ce5f9b5ab1e7931cda985"},{url:"logo.svg",revision:"04ec5e9e520ef00379d890456f8ebd7e"},{url:"mapping.png",revision:"12358d77ab0c7953795af91fe189667a"},{url:"mitmattack.png",revision:"41f7dcaa60af6cacc7ed3ed354d45f12"},{url:"net.png",revision:"b60413403b14a95c483979b05d90e91d"},{url:"pre-request-example.png",revision:"36dc82c42d63cef9cfbb2d506163a4da"},{url:"Spriting.png",revision:"049292cce2a7445db3cae2708f4fed6f"},{url:"start-line-format.png",revision:"e8e7abcfa428bd590293ca040348b1ba"},{url:"wechatpay.svg",revision:"81880fe2ca28e8831d549df573006433"},{url:"xinrenglian.png",revision:"99d314627e6487563cc0cd6b2b5a9960"},{url:"logo.svg",revision:"04ec5e9e520ef00379d890456f8ebd7e"},{url:"logo-64.svg",revision:"c649b025f76ce5f9b5ab1e7931cda985"},{url:"logo-128.svg",revision:"099c9cec87d7e1dbc24fc6d7b55fbda2"},{url:"logo-256.svg",revision:"b4ba238c323becd93964ac67ecdd4a7f"},{url:"logo-512.svg",revision:"80fb1b9c65d49d3aff8cd4c8c0ba907e"},{url:"manifest.webmanifest",revision:"aacca9d33d18784882f9a8f9509e3bf6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
