import{_ as s,o as a,c as n,Q as t}from"./chunks/framework.8580a392.js";const h=JSON.parse('{"title":"又跨域了？一文解释清楚同源策略","description":"","frontmatter":{},"headers":[],"relativePath":"docs/security-strategy/same-origin-policy.md","filePath":"docs/security-strategy/same-origin-policy.md","lastUpdated":1696865557000}'),o={name:"docs/security-strategy/same-origin-policy.md"},l=t(`<h1 id="又跨域了-一文解释清楚同源策略" tabindex="-1">又跨域了？一文解释清楚同源策略 <a class="header-anchor" href="#又跨域了-一文解释清楚同源策略" aria-label="Permalink to &quot;又跨域了？一文解释清楚同源策略&quot;">​</a></h1><p><strong>同源策略 (Same Origin Policy，简称SOP)是一种内置于 Web 浏览器中的 Web 安全机制，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互，它影响着网站相互访问的方式。</strong> 同源策略的主要目的是确保在Web浏览器中，来自不同源的网页或脚本不能随意访问和操纵其他源的资源和数据，确保网站只能在受信任的环境中访问和共享数据，以增强用户的隐私，防止恶意攻击，并确保Web应用程序的数据安全性。 SOP 不需要手动配置，它会在每个支持它的浏览器中自动启用。</p><p><strong>同源策略经常与内容安全策略混淆，区别在于，内容安全策略阻止对外部资源的调用（出站），而同源策略则阻止来自外部资源的引用（入站）</strong>。此外，内容安全策略默认情况下不启用，必须由开发人员定义。</p><h2 id="没有同源策略的web" tabindex="-1">没有同源策略的Web <a class="header-anchor" href="#没有同源策略的web" aria-label="Permalink to &quot;没有同源策略的Web&quot;">​</a></h2><p>如果没有 SOP，Web会变得非常不安全，因为恶意网站将更容易地访问和操纵用户的数据，可以不受限制地访问另一个网站或 Web 应用程序。这将使攻击者能够轻松地从其他网站窃取敏感信息，甚至在未经用户同意的情况下在其他网站上执行操作。比如下面这个例子：</p><blockquote><p>用户利用网页登录了他们的电子银行账户并保留了有效的会话（Session），此时用户被引导进入了一个恶意网站，由于没有同源策略的限制，该恶意网站很容易就能窃取到其他网页的登录凭证，因此它拿到了用户银行账户有效的登录凭证。拿到登录凭证后恶意网站会利用登录凭证向后台发起一个跨域的转账请求，由于没有同源策略，该请求将成功发送到服务器，由于登录凭证有效，服务器便信任并处理这个请求，就这样这笔转账在神不知鬼不觉完成了。</p></blockquote><p>上述例子可能不够直观，您可以访问<a href="https://wangjunliang.com/huihua.html" target="_blank" rel="noreferrer">这个例子</a>感受一下具体攻击(本攻击并不会造成伤害请放心访问)，该例子的攻击虽然不是不存在同源策略造成的，但它与不存在同源策略的攻击很相似，甚至不存在同源策略的攻击会比该例子中的攻击更为严重，因为上述攻击还需要你点击操作，而不存在同源策略的攻击则是无需任何操作。</p><p>从上述例子中您应该可以直观感受到，缺乏同源策略允许恶意网站访问用户在其他网站上的敏感数据，这对用户隐私构成了极大的威胁。<strong>同源策略的存在有效的防止了这种类型的跨域攻击，确保网站只能在受信任的环境中访问和共享数据，这有助于保护用户的隐私，防止恶意攻击，并确保Web应用程序的数据安全性。</strong></p><h2 id="什么是同源" tabindex="-1">什么是同源？ <a class="header-anchor" href="#什么是同源" aria-label="Permalink to &quot;什么是同源？&quot;">​</a></h2><p><strong>同源（Same-Origin）是一个网络安全概念，用于描述Web页面中不同资源的来源是否相同</strong>。具体来说，<strong>当资源地址与网站地址的<code>协议</code>、<code>域名</code>以及<code>端口号</code>完全相同时，则可以说该资源是同源的；如果三者有任一不同，该资源则是跨域的</strong>。</p><p>例如，网站为：<a href="https://wangjunliang.com" target="_blank" rel="noreferrer">https://wangjunliang.com</a>，以下是一些同源和跨源的示例：</p><table><thead><tr><th>URL</th><th>结果</th><th>原因</th></tr></thead><tbody><tr><td><a href="https://wangjunliang.com/HTTP-Explanation" target="_blank" rel="noreferrer">https://wangjunliang.com/HTTP-Explanation</a></td><td>同源</td><td>只是路径不同</td></tr><tr><td><a href="https://wangjunliang.com/HTML-Guide/content/1.what-is-html.html" target="_blank" rel="noreferrer">https://wangjunliang.com/HTML-Guide/content/1.what-is-html.html</a></td><td>同源</td><td>只是路径不同</td></tr><tr><td><a href="http://wangjunliang.com" target="_blank" rel="noreferrer">http://wangjunliang.com</a></td><td>跨域</td><td>协议不同</td></tr><tr><td><a href="https://wangawang.com" target="_blank" rel="noreferrer">https://wangawang.com</a></td><td>跨域</td><td>域名不同</td></tr><tr><td><a href="https://wangjunliang.com:8932" target="_blank" rel="noreferrer">https://wangjunliang.com:8932</a></td><td>跨域</td><td>端口号不同</td></tr></tbody></table><h2 id="继承源" tabindex="-1">继承源 <a class="header-anchor" href="#继承源" aria-label="Permalink to &quot;继承源&quot;">​</a></h2><p><strong>在页面中通过 <code>about:blank</code> 或 <code>javascript:</code> URL 执行的脚本会继承打开该 URL 的文档的源，从而允许访问该文档的 DOM</strong>，因为这些类型的 URL 没有包含源服务器的相关信息。以下为一个具体示例：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;about:blank&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onclick</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">openBlankPage</span><span style="color:#9ECBFF;">(); </span><span style="color:#F97583;">return</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">false</span><span style="color:#9ECBFF;">;&quot;</span><span style="color:#E1E4E8;">&gt;使用 about:blank&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;javascript: executeScript();&quot;</span><span style="color:#E1E4E8;">&gt;使用 javascript:&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">openBlankPage</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">newWindow</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.</span><span style="color:#B392F0;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;about:blank&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;BlankPage&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;width=400,height=300&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (newWindow) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        newWindow.document.</span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&lt;h1&gt;这是新页面的内容&lt;/h1&gt;&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        newWindow.document.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;弹窗被阻止，请允许此网站弹出窗口。&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">executeScript</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 在当前文档中执行脚本</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">paragraph</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;p&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      paragraph.textContent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;通过 javascript: URL 执行的脚本&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(paragraph);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;通过 javascript: URL 执行的脚本，可以访问当前文档的 DOM。&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;about:blank&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onclick</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">openBlankPage</span><span style="color:#032F62;">(); </span><span style="color:#D73A49;">return</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">false</span><span style="color:#032F62;">;&quot;</span><span style="color:#24292E;">&gt;使用 about:blank&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;javascript: executeScript();&quot;</span><span style="color:#24292E;">&gt;使用 javascript:&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">openBlankPage</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">newWindow</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.</span><span style="color:#6F42C1;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;about:blank&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;BlankPage&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;width=400,height=300&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (newWindow) {</span></span>
<span class="line"><span style="color:#24292E;">        newWindow.document.</span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&lt;h1&gt;这是新页面的内容&lt;/h1&gt;&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        newWindow.document.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;弹窗被阻止，请允许此网站弹出窗口。&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">executeScript</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 在当前文档中执行脚本</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">paragraph</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;p&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      paragraph.textContent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;通过 javascript: URL 执行的脚本&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(paragraph);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;通过 javascript: URL 执行的脚本，可以访问当前文档的 DOM。&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>该示例中有两个链接：一个使用 <code>about:blank</code> 打开一个新的浏览器窗口，另一个使用 <code>javascript:</code> 执行脚本。点击任何一个链接都会执行相应的操作并会继承打开该 URL 的文档的源，可以访问当前文档的 DOM。</p><div class="danger custom-block"><p class="custom-block-title">注意</p><p>现代浏览器通常将使用 <code>file:///</code> 模式加载的文件的来源视为<em>不透明的来源</em>。这意味着，假如一个文件包括来自同一文件夹的其他文件，它们不会被认为来自同一来源，并可能引发 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/CORS" target="_blank" rel="noreferrer">CORS</a> 错误。</p><p><code>data:</code> URL 将获得一个新的、空的安全上下文。</p></div><h2 id="修改源" tabindex="-1">修改源 <a class="header-anchor" href="#修改源" aria-label="Permalink to &quot;修改源&quot;">​</a></h2><p><strong>当web的源为某一网站的子域名时，两网站可通过修改<code>document.domain</code>的值为父域名，使之变为同源</strong>。例如下面的例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 网站1的源为：https://wangjunliang.com 修改其document.domain的值为父域名</span></span>
<span class="line"><span style="color:#E1E4E8;">document.domain</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;wangjunliang.com&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 网站2的源为：https://other.wangjunliang.com 修改其document.domain的值为父域名</span></span>
<span class="line"><span style="color:#E1E4E8;">document.domain</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;wangjunliang.com&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 此时两网站则变为了同源</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 网站1的源为：https://wangjunliang.com 修改其document.domain的值为父域名</span></span>
<span class="line"><span style="color:#24292E;">document.domain</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;wangjunliang.com&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 网站2的源为：https://other.wangjunliang.com 修改其document.domain的值为父域名</span></span>
<span class="line"><span style="color:#24292E;">document.domain</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;wangjunliang.com&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 此时两网站则变为了同源</span></span></code></pre></div><p>任何对 <code>document.domain</code> 的赋值操作，包括 <code>document.domain = document.domain</code> 都会导致端口号被覆盖为 <code>null</code> 。因此 <code>other.wangjunliang.com</code> 不能仅通过设置 <code>document.domain = &quot;wangjunliang.com&quot;</code> 来与<code>wangjunliang.com</code> 通信。必须在它们双方中都进行赋值，以确保端口号都为 <code>null</code> 。</p><div class="danger custom-block"><p class="custom-block-title">document.domain已被弃用</p><p>这里描述的方法（使用 <code>document.domain</code>）已被弃用，因为它破坏了同源策略所提供的安全保护，并使浏览器中的源模型复杂化，导致互操作性问题和安全漏洞。</p></div><h2 id="同源策略的约束" tabindex="-1">同源策略的约束 <a class="header-anchor" href="#同源策略的约束" aria-label="Permalink to &quot;同源策略的约束&quot;">​</a></h2><p>同源策略是浏览器的一个关键安全策略，它限制了网页中的某些内容在不同来源之间的交互。以下是受同源策略限制与不受限制的内容：</p><p>受限制的内容：</p><ul><li><p><strong>XHR/Fetch 请求：</strong> 使用 XMLHttpRequest（XHR）对象或 Fetch API 发起的跨域请求通常会受到同源策略的限制。浏览器会阻止页面从不同源的服务器获取数据，除非服务器明确启用了跨域资源共享（CORS）。</p><div class="tip custom-block"><p class="custom-block-title">对于XHR/Fetch的具体限制如下：</p><ul><li>XHR/Fetch调用可以发送到不同来源的站点，但无法读取回复</li><li>如果请求 URL 是同源的，则可以读取响应</li><li>自定义标头只能添加到向同一来源发出的请求中</li></ul></div></li><li><p><strong>Cookie 和本地存储：</strong> 同源策略限制了网页对不同源的 Cookie 和本地存储（如localStorage和sessionStorage）的访问。只有在同一源内的页面才能访问相同的 Cookie 和本地存储。</p></li><li><p><strong>DOM 访问：</strong> 网页的 JavaScript 通常只能访问与自己来源相同的文档对象模型（DOM）。这意味着脚本不能直接访问其他源的文档元素，如iframe中的内容。</p></li><li><p><strong>iframe 访问：</strong> 同源策略限制了页面嵌套在iframe中的内容与包含iframe的页面之间的交互，除非通过特殊的设置允许。</p></li><li><p><strong>WebSocket 连接：</strong> WebSocket 连接的初始握手通常受到同源策略的限制，但一旦建立连接，数据的传输不再受到同源策略的影响。</p></li><li><p><strong>字体资源（Fonts）：</strong> 同源策略通常也会对字体资源（如WOFF、TTF等字体文件）的跨域访问进行限制。这意味着在默认情况下，从不同源加载的字体资源可能无法在页面中正常渲染。为了允许跨域字体加载，服务器可以通过配置跨域资源共享（CORS）来明确允许特定来源的页面访问字体资源。</p></li><li><p><strong>嵌入的对象（Embedded Objects）：</strong> 同源策略通常限制了页面中嵌入的对象（如嵌入的 PDF 文件、嵌入的音视频等）与包含它们的页面之间的交互。这些对象需要与其所在页面具有相同的源，或者通过服务器配置允许特定来源的页面访问。</p></li></ul><p>不受限制的内容：</p><ul><li><strong>CSS：</strong> 同源策略通常不影响页面的样式表（CSS），可以从任何源加载样式。</li><li><strong>图片、音频和视频：</strong> 加载的图片、音频和视频文件通常不受同源策略限制，可以从任何源加载。</li><li><strong>script 标签引入的外部脚本：</strong> 使用 <code>&lt;script&gt;</code> 标签引入的外部脚本通常不受同源策略的限制，可以从任何源加载并执行。</li><li><strong>链接跳转和资源下载：</strong> 可以通过链接跳转（例如点击超链接）和下载资源（例如点击下载链接）的方式访问不同源的内容，但这些操作会导致浏览器向不同源的服务器发起新的请求。</li></ul><h2 id="跨源访问" tabindex="-1">跨源访问 <a class="header-anchor" href="#跨源访问" aria-label="Permalink to &quot;跨源访问&quot;">​</a></h2><p>同源策略增强了Web的安全性，但也随之带来了许多开发上的问题与麻烦，特别是当我们需要在与不同源（不同域名、不同协议、不同端口）的资源进行通信和访问时尤为明显。不过好在针对这些问题，同源策略也做出了许多扩展和适应。</p><h3 id="跨源网络访问" tabindex="-1">跨源网络访问 <a class="header-anchor" href="#跨源网络访问" aria-label="Permalink to &quot;跨源网络访问&quot;">​</a></h3><p>跨源网络访问是指在Web开发中需要从一个源（例如一个域名）访问另一个不同源的网络资源，如从一个不同的域名或端口请求数据或资源。由于同源策略的限制，XHR/Fetch直接进行跨源网络访问通常会受到限制。以下是一些跨源网络访问的问题和解决方法：</p><ul><li><p><strong>代理</strong>：通过创建同源的代理的方式，将跨源请求从客户端发送到同源的代理，然后再由代理发送到目标服务器。这样，浏览器只会看到与自己源相同的请求，从而绕过了同源策略的限制。</p></li><li><p><strong>JSONP</strong>：JSONP通过动态创建<code>&lt;script&gt;</code>元素，将回调函数包装在请求中，以获取跨源数据。由于script 标签引入的外部脚本并不受同源策略的限制因此该方案能够实现跨源访问，但使用该方法要小心安全问题，因为 JSONP 可能存在潜在的XSS风险。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://api.example.com/data?callback=processData&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://api.example.com/data?callback=processData&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p><strong>CORS（跨源资源共享）</strong>：CORS 是一种用于解决跨源网络访问问题的标准化机制。服务器可以通过设置HTTP响应头来明确指定哪些域名的网页可以访问其资源。这样，只有被授权的域名才能够进行跨源访问。</p></li></ul><h3 id="跨源脚本api访问" tabindex="-1">跨源脚本API访问 <a class="header-anchor" href="#跨源脚本api访问" aria-label="Permalink to &quot;跨源脚本API访问&quot;">​</a></h3><p>JavaScript 的 API 中，如 <code>iframe.contentWindow</code>、 <code>window.parent</code>、<code>window.open</code> 和 <code>window.opener</code> 允许文档间直接相互引用。当两个文档的源不同时，引用这些方式将存在一些限制，如下所述：</p><p><strong>Window</strong></p><p>允许以下对 <code>Window</code> 属性的跨源访问：</p><table><thead><tr><th style="text-align:left;">方法</th></tr></thead><tbody><tr><td style="text-align:left;"><code>window.blur</code></td></tr><tr><td style="text-align:left;"><code>window.close</code></td></tr><tr><td style="text-align:left;"><code>window.focus</code></td></tr><tr><td style="text-align:left;"><code>window.postMessage</code></td></tr></tbody></table><table><thead><tr><th style="text-align:left;">属性</th><th style="text-align:left;"></th></tr></thead><tbody><tr><td style="text-align:left;"><code>window.closed</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.frames</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.length</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.location</code></td><td style="text-align:left;">读/写。</td></tr><tr><td style="text-align:left;"><code>window.opener</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.parent</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.self</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.top</code></td><td style="text-align:left;">只读。</td></tr><tr><td style="text-align:left;"><code>window.window</code></td><td style="text-align:left;">只读。</td></tr></tbody></table><p>某些浏览器允许访问除上述外更多的属性。</p><div class="tip custom-block"><p class="custom-block-title">window.postMessage</p><p>如果您需要在窗口对象（例如页面和该页面的弹出窗口或页面和嵌入该页面的 iframe）之间进行通信，则可以使用 window.postMessage()<em>方法</em>。</p><p>例如，您可以使用 获取对另一个窗口的引用<code>newWindow = window.opener</code>，然后通过 调度消息事件<code>newWindow.postMessage()</code>。使用<code>newWindow</code>事件对象来访问通过此方法传递的参数。</p></div><p><strong>Location</strong></p><p>允许以下对 <code>Location</code> 属性的跨源访问：</p><table><thead><tr><th style="text-align:left;">方法</th></tr></thead><tbody><tr><td style="text-align:left;"><code>location.replace</code></td></tr></tbody></table><table><thead><tr><th style="text-align:left;">属性</th><th style="text-align:left;"></th></tr></thead><tbody><tr><td style="text-align:left;"><code>HTMLAnchorElement.href</code></td><td style="text-align:left;">只写。</td></tr></tbody></table><h3 id="跨源数据存储访问" tabindex="-1">跨源数据存储访问 <a class="header-anchor" href="#跨源数据存储访问" aria-label="Permalink to &quot;跨源数据存储访问&quot;">​</a></h3><p>访问存储在浏览器中的数据，如 <code>Web Storage</code> 和 <code>IndexedDB</code>，是以源进行分割的。每个源都拥有自己单独的存储空间，一个源中的 JavaScript 脚本不能对属于其他源的数据进行读写操作。</p><p><code>Cookie</code>使用不同的源定义方式。一个页面可以为本域和其父域设置 cookie，只要是父域不是公共后缀（public suffix）即可。Firefox 和 Chrome 使用 <a href="https://publicsuffix.org/" target="_blank" rel="noreferrer">Public Suffix List</a> 检测一个域是否是公共后缀。当你设置 cookie 时，你可以使用 <code>Domain</code>、<code>Path</code>、<code>Secure</code> 和 <code>HttpOnly</code> 标记来限定可访问性。当你读取 cookie 时，你无法知道它是在哪里被设置的。即使只使用安全的 https 连接，你所看到的任何 cookie 都有可能是使用不安全的连接进行设置的。</p><details class="details custom-block"><summary>🎈本节参考</summary><ul><li><a href="https://www.invicti.com/learn/same-origin-policy-sop/" target="_blank" rel="noreferrer">https://www.invicti.com/learn/same-origin-policy-sop/</a></li><li><a href="https://www.invicti.com/white-papers/whitepaper-same-origin-policy/#NextGenerationSameOriginPolicy" target="_blank" rel="noreferrer">https://www.invicti.com/white-papers/whitepaper-same-origin-policy/#NextGenerationSameOriginPolicy</a></li><li><a href="https://www.w3.org/Security/wiki/Same_Origin_Policy" target="_blank" rel="noreferrer">https://www.w3.org/Security/wiki/Same_Origin_Policy</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS</a></li></ul></details>`,49),e=[l];function p(c,r,i,d,y,E){return a(),n("div",null,e)}const u=s(o,[["render",p]]);export{h as __pageData,u as default};