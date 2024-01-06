import{_ as e,c as s,o,U as t}from"./chunks/framework.x4y0xmwB.js";const r="/HTTP-Explanation/assets/cross-origin-request.4C8gsbtD.png",a="/HTTP-Explanation/assets/cors-simple-request.FryEr53k.png",l="/HTTP-Explanation/assets/pre-request-example.YBBs1jHH.png",A=JSON.parse('{"title":"又跨域了？一文解释清楚跨源资源共享（cors）","description":"","frontmatter":{},"headers":[],"relativePath":"docs/security-strategy/cross-origin-resource-sharing.md","filePath":"docs/security-strategy/cross-origin-resource-sharing.md","lastUpdated":1704513051000}'),i={name:"docs/security-strategy/cross-origin-resource-sharing.md"},n=t('<h1 id="又跨域了-一文解释清楚跨源资源共享-cors" tabindex="-1">又跨域了？一文解释清楚跨源资源共享（cors） <a class="header-anchor" href="#又跨域了-一文解释清楚跨源资源共享-cors" aria-label="Permalink to &quot;又跨域了？一文解释清楚跨源资源共享（cors）&quot;">​</a></h1><p>为确保在Web浏览器中来自不同源的网页或脚本不能随意访问和操纵其他源的资源和数据，保障网站只能在受信任的环境中访问和共享数据，HTTP引入了同源策略（Same Origin Policy，简称SOP）。同源策略的出现极大的增强了Web的安全性并有效的防止了CSRF攻击，但也随之带来了许多开发上的问题与麻烦，特别是当我们需要在与不同源（不同域名、不同协议、不同端口）的资源进行通信和访问时尤为明显，比如下面这个例子：</p><p><img src="'+r+'" alt="cross-origin-request"></p><blockquote><p>wangjunliang.com需要请求访问wangawang.com的内容，由于同源机制的存在， XMLHttpRequest（XHR）或 Fetch API是不允许发起跨域的请求的，当然我们可以通过代理或Jsonp的方式来解决，但每次搭建代理过于麻烦并且维护成本很大，而Jsonp呢？则是存在很多潜在的安全风险，容易被攻击者利用。</p></blockquote><p>综上所述，HTTP急需引入一种安全的、高效的、标准化的跨源访问机制，于是乎跨源资源共享（Cross Origin Resource Sharing，简称CORS）机制则诞生了</p><h2 id="跨源资源共享" tabindex="-1">跨源资源共享 <a class="header-anchor" href="#跨源资源共享" aria-label="Permalink to &quot;跨源资源共享&quot;">​</a></h2><p><strong>跨域资源共享（Cross-Origin Resource Sharing，CORS）是一种网络安全机制，用于在Web应用中控制跨域请求的访问权限</strong>，允许 Web 对不同源的服务器进行跨源资源访问，并使跨源数据传输得以安全进行</p><p><strong>CORS机制通过一系列的<code>请求标头</code>来表明该跨域请求的<code>来源</code>、<code>方法</code>以及<code>所携带请求头部（这些请求标头无需自己配置，由浏览器自动携带）</code>，服务端接收请求后通过这些<code>请求标头</code>来判断是否允许这些源访问加载自己的资源，并返回一系列的<code>响应标头</code>告知相关信息。</strong> 由于CORS机制的相关<code>请求标头</code>都是浏览器自动携带的，因此CORS机制的配置通常发生在服务端而不是客户端，服务端需要通过适当配置 HTTP <code>响应标头</code>来允许或拒绝跨域请求</p><h2 id="cors相关请求标头" tabindex="-1">CORS相关请求标头 <a class="header-anchor" href="#cors相关请求标头" aria-label="Permalink to &quot;CORS相关请求标头&quot;">​</a></h2><p>CORS机制的相关<code>请求标头</code>都是浏览器自动携带的，无须手动设置</p><h3 id="origin请求标头" tabindex="-1">Origin<code>请求标头</code> <a class="header-anchor" href="#origin请求标头" aria-label="Permalink to &quot;Origin`请求标头`&quot;">​</a></h3><p><strong><code>Origin</code>表示了请求的来源（协议、主机、端口）</strong></p><p><strong>参数</strong></p><p>该请求标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>null</strong></p><p>请求的来源是“隐私敏感”的，或者是 HTML 规范定义的<em>不透明来源</em></p></li><li><p><strong>&lt; scheme&gt;://&lt; hostname&gt;</strong></p><p>请求的协议+源站的域名或 IP 地址</p></li><li><p><strong>&lt; scheme&gt;://&lt; hostname&gt;:&lt; port&gt;</strong></p><p>请求的协议+源站的域名或IP地址+端口号(缺省为服务器的默认端口)</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Origin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://wangjunliang.com</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Origin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://wangjunliang.com:80</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p><strong>以下情况下浏览器会自动携带<code>Origin</code>：</strong></p><ul><li>跨源请求</li><li>除GET和HEAD以外的同源请求，即它会被添加到同源的 <code>POST</code>、<code>OPTIONS</code>、<code>PUT</code>、<code>PATCH</code>和 <code>DELETE</code>请求中</li></ul><p>除上述规则外，还有一些特殊情况。例如，在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Request/mode#%E5%B1%9E%E6%80%A7%E5%80%BC" target="_blank" rel="noreferrer">no-cors 模式</a>下的跨源<code>GET</code> 或 <code>HEAD</code> 请求不会发送 <code>Origin</code> 标头</p><p><strong>以下情况下<code>Origin</code>会被设置为<code>null</code>：</strong></p><ul><li>请求来源的协议不是 <code>http</code>、<code>https</code>、<code>ftp</code>、<code>ws</code>、<code>wss</code> 或 <code>gopher</code> 中的任意一个（如：<code>blob</code>、<code>file</code> 和 <code>data</code>）</li><li>跨源的图像或媒体，包括：<code>&lt;img&gt;</code>、<code>&lt;video&gt;</code> 和 <code>&lt;audio&gt;</code> 元素</li><li>属于以下几种文档类型的：使用 <code>createDocument()</code> 创建的、通过 <code>data:</code> URL 生成的或没有创建者的浏览上下文的</li><li>跨源重定向</li><li>没有为 sandbox 属性设置 <code>allow-same-origin</code> 值的 iframe</li><li>响应（response）是网络错误</li></ul></div><h3 id="access-control-request-method请求标头" tabindex="-1">Access-Control-Request-Method<code>请求标头</code> <a class="header-anchor" href="#access-control-request-method请求标头" aria-label="Permalink to &quot;Access-Control-Request-Method`请求标头`&quot;">​</a></h3><p><strong><code>Access-Control-Request-Method</code> 表示真正的请求会采用的请求方法</strong>，该请求标头出现于 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request" target="_blank" rel="noreferrer">preflight request</a>（预检请求）中，因为预检请求所使用的方法总是<code>OPTIONS</code> ，与实际请求所使用的方法不一样，所以使用该请求头通知服务器在真正的请求中会采用哪种HTTP 方法</p><p><strong>参数</strong></p><p>该请求标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>&lt;method&gt;</strong></p><p>一种HTTP的请求方法，如：GET、POST或DELETE等，表示真正的请求会采用的请求方法</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Request-Method</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">GET</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Request-Method</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> POST</span></span></code></pre></div><h3 id="access-control-request-headers请求标头" tabindex="-1">Access-Control-Request-Headers<code>请求标头</code> <a class="header-anchor" href="#access-control-request-headers请求标头" aria-label="Permalink to &quot;Access-Control-Request-Headers`请求标头`&quot;">​</a></h3><p><strong><code>Access-Control-Request-Headers</code> 表示真正的请求会携带的请求标头</strong>，该请求标头出现于 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request" target="_blank" rel="noreferrer">preflight request</a>（预检请求）中，因为预检请求所使用的方法总是 <code>OPTIONS</code>，与实际请求所携带的请求标头不一样，所以使用该请求头通知服务器在真正的请求中会携带哪些请求标头</p><p><strong>参数</strong></p><p>该请求标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>[&lt;header-name&gt;,&lt;header-name&gt;,&lt;header-name&gt;...]</strong></p><p>一系列HTTP请求标头，以逗号分隔，表示真正的请求会携带的请求标头</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Request-Headers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-PINGOTHER, Content-Type</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Request-Headers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-ADC, Content-Type</span></span></code></pre></div><h2 id="cors相关响应标头" tabindex="-1">CORS相关响应标头 <a class="header-anchor" href="#cors相关响应标头" aria-label="Permalink to &quot;CORS相关响应标头&quot;">​</a></h2><p>CORS机制主要通过服务端适当配置 HTTP <code>响应标头</code>来允许或拒绝跨域请求</p><h3 id="access-control-allow-origin响应标头" tabindex="-1">Access-Control-Allow-Origin<code>响应标头</code> <a class="header-anchor" href="#access-control-allow-origin响应标头" aria-label="Permalink to &quot;Access-Control-Allow-Origin`响应标头`&quot;">​</a></h3><p><strong><code>Access-Control-Allow-Origin</code> 响应标头指定了该资源能否被给定的来源(Origin<code>请求标头</code>)的请求访问</strong></p><p><strong>参数</strong></p><p>该响应标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>*</strong></p><p>允许任意来源的请求访问资源（当使用*来响应包含凭据的请求会导致错误）</p></li><li><p><strong>&lt;scheme&gt;://&lt;hostname&gt;:&lt;port&gt;</strong></p><p>指定一个来源（只能指定一个），协议+源站的域名或IP地址+端口号(缺省为服务器的默认端口)。仅允许该来源的请求访问资源</p></li><li><p><strong>null</strong></p><p>仅允许来源为null的请求访问资源</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Origin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> *</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Origin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://wangjunliang.com</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">注意</p><p>如果服务端指定了具体的单个源（作为允许列表的一部分，可能会根据请求的来源而动态改变）而非通配符“<code>*</code>”，那么响应标头中的 <code>Vary</code> 字段的值必须包含 <code>Origin</code>。这将告诉客户端：服务器对不同的 <code>Origin</code>返回不同的内容</p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Origin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://wangjunliang.com</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Vary</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Origin</span></span></code></pre></div></div><h3 id="access-control-allow-methods响应标头" tabindex="-1">Access-Control-Allow-Methods<code>响应标头</code> <a class="header-anchor" href="#access-control-allow-methods响应标头" aria-label="Permalink to &quot;Access-Control-Allow-Methods`响应标头`&quot;">​</a></h3><p><strong><code>Access-Control-Allow-Methods</code>表示客户端所要访问的资源允许使用的请求方法</strong></p><p><strong>参数</strong></p><p>该响应标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>*</strong></p><p>当请求没有携带凭据（请求没有<code>Cookie</code>或认证信息），允许所有请求方法访问资源；当请求带有凭据时，会被简单地当作值“<code>*</code>”，没有特殊的语义</p></li><li><p><strong>[&lt;method&gt;,&lt;method&gt;,&lt;method&gt;...]</strong></p><p>一系列HTTP请求方法，以逗号分隔，表示访问的资源允许使用的请求方法</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Methods</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> *</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Methods</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> POST, GET, OPTIONS</span></span></code></pre></div><h3 id="access-control-allow-headers响应标头" tabindex="-1">Access-Control-Allow-Headers<code>响应标头</code> <a class="header-anchor" href="#access-control-allow-headers响应标头" aria-label="Permalink to &quot;Access-Control-Allow-Headers`响应标头`&quot;">​</a></h3><p><strong><code>Access-Control-Allow-Headers</code>表示客户端所要访问的资源允许使用的请求标头</strong>，<a href="#简单请求">CORS 安全列表的标头</a>无需特意列出，它始终被支持</p><p><strong>参数</strong></p><p>该响应标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>*</strong></p><p>当请求没有携带凭据（请求没有<code>Cookie</code>或认证信息），允许携带任何请求标头的请求访问资源；当请求带有凭据时，会被简单地当作值“<code>*</code>”，没有特殊的语义</p></li><li><p><strong>[&lt;header-name&gt;,&lt;header-name&gt;,&lt;header-name&gt;...]</strong></p><p>一系列HTTP请求标头，以逗号分隔，表示访问的资源允许使用的请求标头</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Headers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> *</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Headers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-Custom-Header, Upgrade-Insecure-Requests</span></span></code></pre></div><h3 id="access-control-max-age响应标头" tabindex="-1">Access-Control-Max-Age<code>响应标头</code> <a class="header-anchor" href="#access-control-max-age响应标头" aria-label="Permalink to &quot;Access-Control-Max-Age`响应标头`&quot;">​</a></h3><p><strong><code>Access-Control-Max-Age</code> 表示 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request" target="_blank" rel="noreferrer">preflight request</a> （预检请求）的返回结果（即 <code>Access-Control-Allow-Methods</code> 和<code>Access-Control-Allow-Headers</code>提供的信息）可以被缓存多久。</strong> 该标头仅能控制 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request" target="_blank" rel="noreferrer">preflight request</a> （预检请求）的响应的缓存时间，对于简单的跨源请求的缓存策略通常由HTTP缓存头部（如<code>Cache-Control</code>、<code>Expires</code>等）来控制</p><p><strong>参数</strong></p><p>该响应标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>&lt;seconds&gt;</strong></p><p>返回结果可以被缓存的最长时间（秒）。 在 Firefox 中，<a href="https://dxr.mozilla.org/mozilla-central/rev/7ae377917236b7e6111146aa9fb4c073c0efc7f4/netwerk/protocol/http/nsCORSListenerProxy.cpp#1131" target="_blank" rel="noreferrer">上限是 24 小时</a> （即 86400 秒）。 在 Chromium v76 之前， <a href="https://cs.chromium.org/chromium/src/services/network/public/cpp/cors/preflight_result.cc?l=36&amp;rcl=52002151773d8cd9ffc5f557cd7cc880fddcae3e" target="_blank" rel="noreferrer">上限是 10 分钟</a>（即 600 秒)。 从 Chromium v76 开始，<a href="https://cs.chromium.org/chromium/src/services/network/public/cpp/cors/preflight_result.cc?l=31&amp;rcl=49e7c0b4886cac1f3d09dc046bd528c9c811a0fa" target="_blank" rel="noreferrer">上限是 2 小时</a>（即 7200 秒)。 Chromium 同时规定了一个默认值 5 秒。 如果值为 <strong>-1</strong>，表示禁用缓存，则每次请求前都需要使用 OPTIONS 预检请求。</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Max-Age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 60  //1分钟</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Max-Age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 600  //10分钟</span></span></code></pre></div><h3 id="access-control-expose-headers响应标头" tabindex="-1">Access-Control-Expose-Headers<code>响应标头</code> <a class="header-anchor" href="#access-control-expose-headers响应标头" aria-label="Permalink to &quot;Access-Control-Expose-Headers`响应标头`&quot;">​</a></h3><p><strong><code>Access-Control-Expose-Headers</code> 允许服务器指示那些响应标头可以暴露给浏览器中运行的脚本，以响应跨源请求</strong>。在跨源访问时，<code>XMLHttpRequest</code> 对象的 <code>getResponseHeader()</code> 方法只能拿到<a href="#简单请求">CORS 安全列表的响应标头</a>，如：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma等，如果想要让客户端可以访问到其他的标头，服务器必须将它们在 <code>Access-Control-Expose-Headers</code> 里面列出来</p><p><strong>参数</strong></p><p>该响应标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>*</strong></p><p>当请求没有携带凭据（请求没有<code>Cookie</code>或认证信息），浏览器中运行的脚本允许访问所有响应标头；当请求带有凭据，会被简单地当作值“<code>*</code>”，没有特殊的语义</p></li><li><p><strong>[&lt;header-name&gt;,&lt;header-name&gt;,&lt;header-name&gt;...]</strong></p><p>一系列HTTP响应标头，以逗号分隔，表示哪些响应标头可以暴露给浏览器中运行的脚本</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Expose-Headers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Content-Encoding</span></span>\n<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Expose-Headers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Content-Encoding, Kuma-Revision</span></span></code></pre></div><h3 id="access-control-allow-credentials响应标头" tabindex="-1">Access-Control-Allow-Credentials<code>响应标头</code> <a class="header-anchor" href="#access-control-allow-credentials响应标头" aria-label="Permalink to &quot;Access-Control-Allow-Credentials`响应标头`&quot;">​</a></h3><p><strong><code>Access-Control-Allow-Credentials</code> 表示客户端所要访问的资源是否允许使用credentials(认证信息，如：cookie等)</strong>，</p><p><strong>参数</strong></p><p>该响应标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>true</strong></p><p>这个头的唯一有效值（区分大小写）。如果不需要 credentials，相比将其设为 false，请直接忽视这个头。</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Access-Control-Allow-Credentials</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> true</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">注意</p><p><code>Access-Control-Allow-Credentials</code> 标头需要与 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials" target="_blank" rel="noreferrer"><code>XMLHttpRequest.withCredentials</code></a> 或 Fetch API 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request" target="_blank" rel="noreferrer"><code>Request()</code></a> 构造函数中的 <code>credentials</code> 选项结合使用，并需要在服务端正确配置Cookie 策略的<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value" target="_blank" rel="noreferrer">SameSite</a> 属性。因为一般而言，对于跨源 <code>XMLHttpRequest</code> 或 <code>Fetch</code>请求，浏览器并<strong>不会</strong>发送身份凭证信息。如果想要跨源的请求发送凭证信息，需要设置<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials" target="_blank" rel="noreferrer"><code>XMLHttpRequest.withCredentials</code></a> 属性或 Fetch API 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request" target="_blank" rel="noreferrer"><code>Request()</code></a> 构造函数中的 <code>credentials</code> 属性，并且Cookie是否能被携带至跨源请求中，也受响应标头中<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value" target="_blank" rel="noreferrer">SameSite</a> 属性的影响。</p></div><h2 id="复杂请求与简单请求" tabindex="-1">复杂请求与简单请求 <a class="header-anchor" href="#复杂请求与简单请求" aria-label="Permalink to &quot;复杂请求与简单请求&quot;">​</a></h2><p><strong>由于同源策略对于XHR/Fetch API的约束为：请求可以发送到不同来源的服务器，服务端能够接收并处理，只是前端无法读取返回数据。因此我们必须对可能对服务器数据产生副作用的 HTTP 请求方法采取必要的验证手段，不然任何修改数据的跨源攻击都能被发送到服务器并且被正确处理，而攻击者仅仅是不能够得到请求返回内容而已。</strong></p><p>对此<strong>CORS将请求分为了简单请求与复杂请求</strong>，<strong>对于简单请求而言，只要满足CORS相关规则即可进行跨域访问</strong>；但<strong>对于复杂请求而言，浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨源请求，服务器确认允许之后，才发起实际的 HTTP 请求。</strong></p><h3 id="简单请求" tabindex="-1">简单请求 <a class="header-anchor" href="#简单请求" aria-label="Permalink to &quot;简单请求&quot;">​</a></h3><p>满足所有下述条件，则该请求可视为简单请求：</p><ul><li><p>使用以下方法之一：</p><p><code>GET</code>、<code>HEAD</code>、<code>POST</code></p></li><li><p>仅使用了浏览器自动设置的标头、 Fetch 规范中定义为<a href="https://fetch.spec.whatwg.org/#forbidden-header-name" target="_blank" rel="noreferrer">禁用标头名称</a>的标头以及<a href="https://fetch.spec.whatwg.org/#cors-safelisted-request-header" target="_blank" rel="noreferrer">CORS安全的标头字段集合</a>中的标头，例如：</p><p><code>Accept</code>、<code>Accept-Language</code>、<code>Content-Language</code>、<code>Content-Type</code>、<code>Range</code></p></li><li><p>Content-Type仅限于下列三者之一：</p><p><code>text/plain</code>、<code>multipart/form-data</code>、<code>application/x-www-form-urlencoded</code></p></li><li><p>如果请求是使用 XMLHttpRequest 对象发出的，在返回的 XMLHttpRequest.upload 对象属性上没有注册任何事件监听器；也就是说，给定一个 XMLHttpRequest 实例 <code>xhr</code>，没有调用 <code>xhr.upload.addEventListener()</code>，以监听该上传请求</p></li><li><p>请求中没有使用 <code>ReadableStream</code>对象</p></li></ul><p><strong>对于简单请求而言，只要满足CORS相关标头即可进行跨域访问</strong></p><p>假如站点 <a href="https://wangjunliang.com" target="_blank" rel="noreferrer">https://wangjunliang.com</a> 的网页想要访问 <a href="https://wangawang.com" target="_blank" rel="noreferrer">https://wangawang.com</a> 的资源，并发起的是简单请求，此时请求只要满足了服务端相关CORS的响应标头配置，请求则能正常访问资源，以下为客户端与服务器端交互示例</p><p><img src="'+a+'" alt="cors-simple-request"></p><p>客户端<a href="https://wangjunliang.com" target="_blank" rel="noreferrer">https://wangjunliang.com</a> 向服务端 <a href="https://wangawang.com" target="_blank" rel="noreferrer">https://wangawang.com</a> 发起了一个跨源请求，由于该请求满足简单请求的条件，因此浏览器将发起一个简单请求，并且该请求还携带了Cookie信息。由于服务端允许该源访问并且允许携带Cookie信息，因此服务器会正常处理并响应请求内容，其中响应头中<code>Access-control-Allow-Origin</code>包含了允许访问该资源的源列表，<code>Access-Control-Allow-Credentials</code>为<code>true</code>表示允许携带Cookie等身份认证头。</p><h3 id="复杂请求" tabindex="-1">复杂请求 <a class="header-anchor" href="#复杂请求" aria-label="Permalink to &quot;复杂请求&quot;">​</a></h3><p><strong>当请求不满足简单请求的条件时，则为复杂请求。与简单请求不同，对于复杂请求浏览器会首先使用 <code>OPTIONS</code>方法<code>自动</code>发起一个<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request" target="_blank" rel="noreferrer">预检请求</a>到服务器，以获知服务器是否允许该实际请求。</strong> 由于同源策略对于XHR/Fetch API的约束为：请求可以发送到不同来源的服务器，服务端能够接收并处理，只是前端无法读取返回数据。因此我们必须对可能对服务器数据产生副作用的 HTTP 请求方法进行&quot;预检“，避免跨域请求对服务器的数据产生未预期的影响。</p><p>以下是一个需要执行预检的跨源访问例子：</p><p><img src="'+l+'" alt="pre-request-example"></p><p>客户端<a href="https://wangjunliang.com" target="_blank" rel="noreferrer">https://wangjunliang.com</a> 向服务端 <a href="https://wangawang.com" target="_blank" rel="noreferrer">https://wangawang.com</a> 发起了一个跨源请求，由于该请求需要携带两个自定义的标头(<code>X-PINGOTHER</code> 与 <code>Content-Type</code>)，因此该请求是一个复杂请求，浏览器将首先发起一个预检请求。</p><p>预检请求将自动携带标头字段 <code>Access-Control-Request-Method</code> 告知服务器，实际请求将使用 <code>POST</code> 方法、标头字段<code>Access-Control-Request-Headers</code> 告知服务器，实际请求将携带两个自定义请求标头字段：<code>X-PINGOTHER</code> 与 <code>Content-Type</code>。服务器据此决定，该实际请求是否被允许</p><p>如果服务器允许该请求，就会如上图所示返回相应的响应内容：</p><ul><li><code>Access-Control-Allow-Origin: https://wangjunliang.com</code>表示允许wangjunliang.com访问该资源</li><li><code>Access-Control-Allow-Methods</code> 表示允许客户端使用 <code>POST</code> 和 <code>GET</code> 方法发起请求</li><li><code>Access-Control-Allow-Headers</code> 表示允许请求中携带字段 <code>X-PINGOTHER</code> 与 <code>Content-Type</code>标头</li><li><code>Access-Control-Max-Age</code> 给定了该预检请求可供缓存的时间长短，单位为秒，默认值是 5 秒。在有效时间内，浏览器无须为同一请求再次发起预检请求。以上例子中，该响应的有效时间为 86400 秒，也就是 24 小时。请注意，浏览器自身维护了一个<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age" target="_blank" rel="noreferrer">最大有效时间</a>，如果该标头字段的值超过了最大有效时间，将不会生效</li></ul><p>最后预检请求完成之后，客户端发送实际请求，服务端根据请求处理响应即完成</p><h3 id="需要注意的地方" tabindex="-1">需要注意的地方 <a class="header-anchor" href="#需要注意的地方" aria-label="Permalink to &quot;需要注意的地方&quot;">​</a></h3><ul><li>当携带了Cookie等认证信息的跨源请求，响应标头<code>Access-Control-Allow-Origin</code>、<code>Access-Control-Allow-methods</code>、<code>Access-Control-Allow-heders</code>、<code>Access-Control-Expose-Headers</code>都不能为*</li><li>当简单请求携带了Cookie等认证信息，如果响应中缺失 <code>Access-Control-Allow-Credentials: true</code>响应标头，则响应内容会被忽略，不会提供给 web ；如果存在该响应标头，则必须携带Cookie等认证信息。当复杂请求的预检响应中缺失 <code>Access-Control-Allow-Credentials: true</code>响应标头，实际请求则不能携带Cookie等认证信息，如果存在，实际请求则必须携带Cookie等认证信息</li><li>携带<code>Authorization</code>请求标头会把简单请求变为复杂请求</li></ul><h2 id="本节参考" tabindex="-1">本节参考 <a class="header-anchor" href="#本节参考" aria-label="Permalink to &quot;本节参考&quot;">​</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS/Errors" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS/Errors</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS</a></li><li><a href="https://www.invicti.com/white-papers/whitepaper-same-origin-policy/" target="_blank" rel="noreferrer">https://www.invicti.com/white-papers/whitepaper-same-origin-policy/</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers</a></li></ul><p>转载需要经过本人同意，并标明出处！</p>',111),c=[n];function p(d,h,g,k,u,C){return o(),s("div",null,c)}const b=e(i,[["render",p]]);export{A as __pageData,b as default};
