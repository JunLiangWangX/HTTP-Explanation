import{_ as e,o as a,c as t,Q as o}from"./chunks/framework.db5f95e4.js";const v=JSON.parse('{"title":"Keep-Alive","description":"","frontmatter":{},"headers":[],"relativePath":"keep-alive.md","filePath":"keep-alive.md","lastUpdated":1694056504000}'),l={name:"keep-alive.md"},s=o('<h1 id="keep-alive" tabindex="-1">Keep-Alive <a class="header-anchor" href="#keep-alive" aria-label="Permalink to &quot;Keep-Alive&quot;">​</a></h1><blockquote><p>当请求头<code>Connection</code>为<code>keep-alive</code>时(请求保持连接去完成后续对同一服务器的请求)，可通过设置<code>Keep-Alive</code>请求头来指定空闲的连接需要保持的最小时长以及该连接可以发送的最大请求数量</p></blockquote><div class="danger custom-block"><p class="custom-block-title">警告</p><p>需要将 请求头 <a href="./connection.html"><code>Connection</code></a> 的值设置为 <code>&quot;keep-alive&quot;</code>这个首部才有意义。同时需要注意的是，在 HTTP/2 协议中， <a href="./connection.html"><code>Connection</code></a> 和 <a href="./"><code>Keep-Alive</code></a> 是被忽略的；在其中采用其他机制来进行连接管理。</p></div><h2 id="🔠取值" tabindex="-1">🔠取值 <a class="header-anchor" href="#🔠取值" aria-label="Permalink to &quot;🔠取值&quot;">​</a></h2><blockquote><p>一系列用逗号隔开的参数，每一个参数由一个标识符和一个值构成，并使用等号 (<code>&#39;=&#39;</code>) 隔开。下述标识符是可用的</p></blockquote><table><thead><tr><th>标识符</th><th>说明</th></tr></thead><tbody><tr><td>timeout</td><td>指定了一个空闲连接需要保持打开状态的最小时长（以秒为单位）。需要注意的是，如果没有在传输层设置 keep-alive TCP message 的话，大于 TCP 层面的超时设置会被忽略。</td></tr><tr><td>max</td><td>在连接关闭之前，在此连接可以发送的请求的最大值。在非管道连接中，除了 0 以外，这个值是被忽略的，因为需要在紧跟着的响应中发送新一次的请求。HTTP 管道连接则可以用它来限制管道的使用。</td></tr></tbody></table><h2 id="👀示例" tabindex="-1">👀示例 <a class="header-anchor" href="#👀示例" aria-label="Permalink to &quot;👀示例&quot;">​</a></h2><div class="language-HTTP vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">HTTP</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">Keep-Alive</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">timeout=5, max=1000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">Keep-Alive</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">timeout=5, max=1000</span></span></code></pre></div><details class="details custom-block"><summary>🎈本节参考</summary><p>- <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive</a></p></details><p>转载需要经过本人同意！</p>',10),c=[s];function p(d,i,n,r,h,m){return a(),t("div",null,c)}const _=e(l,[["render",p]]);export{v as __pageData,_ as default};