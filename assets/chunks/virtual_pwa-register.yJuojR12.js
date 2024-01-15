import{X as x}from"./framework.Zwd3L9Wu.js";function P(w={}){const{immediate:E=!1,onNeedRefresh:r,onOfflineReady:t,onRegistered:n,onRegisteredSW:d,onRegisterError:o}=w;let e,c,s;const g=async(p=!0)=>{await c,await(s==null?void 0:s())};async function u(){if("serviceWorker"in navigator){const{Workbox:p}=await x(()=>import("./workbox-window.prod.es5.prqDwDSL.js"),__vite__mapDeps([]));e=new p("/HTTP-Explanation/sw.js",{scope:"/HTTP-Explanation/",type:"classic"}),s=async()=>{await(e==null?void 0:e.messageSkipWaiting())};{let i=!1;const l=()=>{i=!0,e==null||e.addEventListener("controlling",a=>{a.isUpdate&&window.location.reload()}),r==null||r()};e.addEventListener("installed",a=>{typeof a.isUpdate>"u"?typeof a.isExternal<"u"?a.isExternal?l():!i&&(t==null||t()):a.isExternal?window.location.reload():!i&&(t==null||t()):a.isUpdate||t==null||t()}),e.addEventListener("waiting",l),e.addEventListener("externalwaiting",l)}e.register({immediate:E}).then(i=>{d?d("/HTTP-Explanation/sw.js",i):n==null||n(i)}).catch(i=>{o==null||o(i)})}}return c=u(),g}export{P as registerSW};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
