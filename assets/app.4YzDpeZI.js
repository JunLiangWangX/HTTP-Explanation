import{d as _,h as p,a0 as b,a1 as g,o as d,c as f,k as m,t as w,l as P,e as v,a2 as i,s as l,a3 as C,a4 as k,a5 as E,a6 as S,a7 as D,a8 as L,a9 as O,aa as T,ab as V,ac as B,u as W,j,y as x,ad as N,ae as $,af as F}from"./chunks/framework.XUP_yvoD.js";import{t as y}from"./chunks/theme.R7FyDCH-.js";const I={key:0,class:"pwa-toast",role:"alertdialog","aria-labelledby":"pwa-message"},M={id:"pwa-message",class:"mb-3"},G=_({__name:"ReloadPrompt",setup(a){const e=p(!1),t=p(!1);let n;const s=()=>{e.value=!0},A=()=>{t.value=!0},R=async()=>{e.value=!1,t.value=!1};return b(async()=>{const{registerSW:u}=await g(()=>import("./chunks/virtual_pwa-register.ZFxGYSPF.js"),__vite__mapDeps([0,1]));n=u({immediate:!0,onOfflineReady:s,onNeedRefresh:A,onRegistered(){console.info("Service Worker registered")},onRegisterError(r){console.error("Service Worker registration error!",r)}})}),(u,r)=>e.value||t.value?(d(),f("div",I,[m("div",M,w(e.value?"该站点已支持PWA离线访问🚀":"有新内容可用🤩"),1),t.value?(d(),f("button",{key:0,type:"button",class:"pwa-refresh",onClick:r[0]||(r[0]=K=>{var c;return(c=P(n))==null?void 0:c()})}," 重新加载 ")):v("",!0),m("button",{type:"button",class:"pwa-cancel",onClick:R}," 关闭 ")])):v("",!0)}}),H={...y,Layout(){return i(y.Layout,null,{"layout-bottom":()=>i(G)})}};function h(a){if(a.extends){const e=h(a.extends);return{...e,...a,async enhanceApp(t){e.enhanceApp&&await e.enhanceApp(t),a.enhanceApp&&await a.enhanceApp(t)}}}return a}const o=h(H),U=_({name:"VitePressApp",setup(){const{site:a}=W();return j(()=>{x(()=>{document.documentElement.lang=a.value.lang,document.documentElement.dir=a.value.dir})}),N(),$(),F(),o.setup&&o.setup(),()=>i(o.Layout)}});async function q(){const a=J(),e=z();e.provide(k,a);const t=E(a.route);return e.provide(S,t),e.component("Content",D),e.component("ClientOnly",L),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:e,router:a,siteData:O}),{app:e,router:a,data:t}}function z(){return T(U)}function J(){let a=l,e;return V(t=>{let n=B(t),s=null;return n&&(a&&(e=n),(a||e===n)&&(n=n.replace(/\.js$/,".lean.js")),s=g(()=>import(n),__vite__mapDeps([]))),l&&(a=!1),s},o.NotFound)}l&&q().then(({app:a,router:e,data:t})=>{e.go().then(()=>{C(e.route,t.site),a.mount("#app")})});export{q as createApp};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/virtual_pwa-register.ZFxGYSPF.js","assets/chunks/framework.XUP_yvoD.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}