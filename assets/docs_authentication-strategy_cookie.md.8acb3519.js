import{_ as o,o as e,c as s,Q as a}from"./chunks/framework.4e712ebc.js";const n="/HTTP-Explanation/assets/cookie-example.afd89af7.png",h=JSON.parse('{"title":"Cookie","description":"","frontmatter":{},"headers":[],"relativePath":"docs/authentication-strategy/cookie.md","filePath":"docs/authentication-strategy/cookie.md","lastUpdated":1698721825000}'),l={name:"docs/authentication-strategy/cookie.md"},c=a('<h1 id="cookie" tabindex="-1">Cookie <a class="header-anchor" href="#cookie" aria-label="Permalink to &quot;Cookie&quot;">​</a></h1><p><strong>Cookie是服务器发送到用户浏览器并保存在本地的一小块文本数据，浏览器会存储 Cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上，用于跟踪用户与网站的互动、存储用户相关信息以及保持用户状态等</strong>，Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。</p><h2 id="cookie的运行方式" tabindex="-1">Cookie的运行方式 <a class="header-anchor" href="#cookie的运行方式" aria-label="Permalink to &quot;Cookie的运行方式&quot;">​</a></h2><p>Cookie的运行主要依赖于HTTP的<code>Set-Cookie</code>响应标头（服务器发送创建的Cookie）以及<code>Cookie</code>请求标头（客户端携带保存的Cookie），其运行步骤如下：</p><p><img src="'+n+`" alt="cookie-example"></p><ul><li><strong>服务器创建Cookie：</strong> 服务器在收到 HTTP 请求后将创建Cookie并记录用户相关信息，最后通过在响应中添加一个或多个 <code>Set-Cookie</code>响应头，将Cookie发送给客户端</li><li><strong>客户端保存Cookie：</strong> 客户端收到响应后，浏览器会自动将<code>Set-Cookie</code>中的内容保存起来</li><li><strong>客户端再次发起请求，浏览器自动携带Cookie：</strong> 等到客户端再次向同一服务器发出请求时，浏览器会<strong>自动</strong>将保存的Cookie内容放在<code>Cookie</code>请求头内，发送给服务器</li><li><strong>服务器根据Cookie识别身份：</strong> 服务器在收到请求后，可以根据请求中的 Cookie 数据来识别用户，继续用户的会话，或根据需要执行其他操作，以保持状态</li></ul><p>从上述描述中我们都应该清楚了Cookie的运行主要依赖于HTTP的<code>Set-Cookie</code>响应标头以及<code>Cookie</code>请求标头，那么下面我们详细学习下这两个标头的具体内容。</p><h3 id="set-cookie响应标头" tabindex="-1">Set-cookie<code>响应标头</code> <a class="header-anchor" href="#set-cookie响应标头" aria-label="Permalink to &quot;Set-cookie\`响应标头\`&quot;">​</a></h3><p>响应标头 <strong><code>Set-Cookie</code></strong> 被用来由服务器端向客户端发送 Cookie，以便于客户端在后续的请求中将其发送回服务器识别身份使用。服务器如果要发送多个 cookie，则应该在同一响应中设置多个 <strong><code>Set-Cookie</code></strong> 标头。</p><p><strong>参数</strong></p><ul><li><p><strong>&lt;cookie-name&gt;=&lt;cookie-value&gt;</strong></p><p>一个有名称与值组成的键值对，用于表示需要传输的Cookie的名称以及值</p><div class="danger custom-block"><p class="custom-block-title">注意</p><ul><li><code>&lt;cookie-name&gt;</code> 不能包含控制字符、空格、制表符以及以下分隔字符：<code>( ) &lt; &gt; @ , ; : \\ &quot; / [ ] ? = { }</code>，除此之外的任何 US-ASCII 字符都是被允许的。</li><li>一些 <code>&lt;cookie-name&gt;</code> 具有特殊的语义，例如：<code>__Secure-</code> 前缀以及<code>__Host-</code> 前缀，名称中包含 <code>__Secure-</code> 或 <code>__Host-</code> 前缀的 cookie，只可以应用在使用了安全连接（HTTPS）的域中，需要同时设置 <code>secure</code> 属性，另外名称中包含了 <code>__Host-</code> 前缀，那么 path 属性的值必须为 <code>/</code>（表示整个站点），且不能含有 <code>Domain</code> 属性。</li><li><code>&lt;cookie-value&gt;</code> 不能包含控制字符、空格、双引号、逗号、分号以及反斜线，除此之外的任何 US-ASCII 字符都是被允许的，并且它可以包裹在双引号中。</li></ul></div></li><li><p><strong>Expires=&lt;date&gt;</strong> <code>可选</code></p><p>用于指定cookie 的有效时间（取值格式例如：Wed, 21 Oct 2015 07:28:00 GMT），如果没有设置这个属性，那么表示这是一个<strong>会话期 cookie</strong>。一个会话结束于客户端被关闭时，这意味着会话期 cookie 会在客户端被关闭时移除。</p><div class="danger custom-block"><p class="custom-block-title">注意</p><ul><li><p>如果设置了 <code>Expires</code> 属性，其截止时间仅与客户端时间相关，而非服务器的时间。也就是说如果客户端修改了时间，浏览器则会认为此Cookie未过期并发送到服务器，而除了业务代码自行处理外，服务器并不会自动记录并判断Cookie是否过期。</p></li><li><p>目前有很多现代Web 浏览器支持会话恢复功能，这个功能可以使浏览器保留所有的 tab 标签，然后在重新打开浏览器的时候将其还原，与此同时，cookie 也会恢复，就跟从来没有关闭浏览器一样，这会导致<strong>会话期Cookie</strong>一直有效，造成不必要的安全风险。</p></li></ul></div></li><li><p><strong>Max-Age=&lt;number&gt;</strong> <code>可选</code></p><p>用于指定Cookie经过多少秒后失效，秒数为 0 或 -1 将会使 cookie 直接过期。假如 <code>Expires</code> 和 <code>Max-Age</code> 属性均存在，那么 <code>Max-Age</code> 的优先级更高，<code>Max-Age</code>属性的出现就是为了解决<code>Expires</code>属性设置的时间仅与客户端时间相关的问题。</p></li><li><p><strong>Domain=&lt;domain-value&gt;</strong> <code>可选</code></p><p>用于指定Cookie存放的域名，以及哪些主机可以发送 Cookie。如果不指定，该属性默认为当前文档访问地址中的主机部分（也就是请求中的Host标头），不包含子域名。如果指定了 <code>Domain</code>，则一般包含子域名。因此，指定 <code>Domain</code> 比省略它的限制要少。但是，当子域需要共享有关用户的信息时，这可能会有所帮助。</p></li><li><p><strong>Path=&lt;path-value&gt;</strong> <code>可选</code></p><p>该属性指定了一个 URL 路径，用于指定Cookie存放的域的路径，以及哪些URL路径可以发送 Cookie。表示这个URL路径必须出现在请求的资源的路径中浏览器才会发送 <code>Cookie</code> 标头，URL路径以字符<code>/</code> 作为路径分隔符，并且子路径也会被匹配，例如，设置 <code>Path=/docs</code>，则以下地址都会匹配：<code>/docs</code>、<code>/docs/</code>、<code>/docs/Web/</code>、<code>/docs/Web/HTTP</code></p></li><li><p><strong>Secure</strong> <code>可选</code></p><p>指定只有在请求使用 <code>https:</code> 协议（localhost 不受此限制）的时候才会被发送到服务器，以此阻止中间人攻击获取Cookie。</p></li><li><p><strong>HttpOnly</strong> <code>可选</code></p><p>用于阻止 JavaScript 通过 <code>Document.cookie</code>属性访问 cookie。注意，设置了 <code>HttpOnly</code> 的 cookie 在 js的请求中仍然会被发送，例如，调用 <code>XMLHttpRequest.send()</code> 或 <code>fetch()</code>。该属性主要其用于防范跨站脚本攻击（XSS）窃取Cookie。</p></li><li><p><strong>SameSite=&lt;samesite-value&gt;</strong> <code>可选</code></p><p>指定 cookie 是否能够随着跨站请求一起发送，这样可以在一定程度上防范跨站请求伪造攻击。</p><p>可选的属性值有：</p><ul><li><code>Strict</code>：浏览器在同源的请求才会携带Cookie，浏览器仅对同一站点的请求发送 <code>cookie</code>，即请求来自设置 cookie 的站点。如果请求不同源，即来自不同的域或协议（即使是相同域），则携带有 <code>SameSite=Strict</code> 属性的 cookie 将不会被发送。</li><li><code>Lax</code>：浏览器在某些情况下会发送 Cookie，在用户从外部站点导航到源站时cookie将被发送（例如，用户点击链接或输入 URL），在 POST 请求以及嵌套的跨站点请求中（如通过 <code>&lt;img&gt;</code> 或 <code>&lt;iframe&gt;</code>）不会被发送。这是 <code>SameSite</code> 属性未被设置时的默认行为。</li><li><code>None</code>：浏览器会在跨站和同站请求中均发送 cookie。在设置这一属性值时，必须同时设置 <code>Secure</code> 属性，就像这样：<code>SameSite=None; Secure</code>。</li></ul></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 会话期Cookie，将会在客户端关闭时被移除。会话期 cookie 不设置 Expires 或 Max-Age 属性。</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sessionId=38afes7a8</span></span>
<span class="line"><span style="color:#6A737D;">// 持久化 cookie，不会在客户端关闭时失效，而是在特定的日期（Expires）或者经过一段特定的时间之后（Max-Age）才会失效。</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">id=a3fWa; Max-Age=2592000</span></span>
<span class="line"><span style="color:#6A737D;">// 限制域的Cookie</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">test=123;Domain=wangjunliang.com</span></span>
<span class="line"><span style="color:#6A737D;">// 一些名称包含了__Secure-、__Host-前缀的Cookie，当响应来自于一个安全域（HTTPS）的时候且设置了Secure属性，二者都可以被客户端接受</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">__Secure-ID=123; Secure; Domain=example.com</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">__Host-ID=123; Secure; Path=/</span></span>
<span class="line"><span style="color:#6A737D;">// 缺少 Secure 指令，会被拒绝</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">__Secure-id=1</span></span>
<span class="line"><span style="color:#6A737D;">// 名称包含了 __Host-前缀的cookie缺少 Path=/ 指令，会被拒绝</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">__Host-id=1; Secure</span></span>
<span class="line"><span style="color:#6A737D;">// 名称包含了 __Host-前缀的cookie由于设置了 domain 属性，会被拒绝</span></span>
<span class="line"><span style="color:#85E89D;">Set-Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">__Host-id=1; Secure; Path=/; domain=example.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 会话期Cookie，将会在客户端关闭时被移除。会话期 cookie 不设置 Expires 或 Max-Age 属性。</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sessionId=38afes7a8</span></span>
<span class="line"><span style="color:#6A737D;">// 持久化 cookie，不会在客户端关闭时失效，而是在特定的日期（Expires）或者经过一段特定的时间之后（Max-Age）才会失效。</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">id=a3fWa; Max-Age=2592000</span></span>
<span class="line"><span style="color:#6A737D;">// 限制域的Cookie</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">test=123;Domain=wangjunliang.com</span></span>
<span class="line"><span style="color:#6A737D;">// 一些名称包含了__Secure-、__Host-前缀的Cookie，当响应来自于一个安全域（HTTPS）的时候且设置了Secure属性，二者都可以被客户端接受</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">__Secure-ID=123; Secure; Domain=example.com</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">__Host-ID=123; Secure; Path=/</span></span>
<span class="line"><span style="color:#6A737D;">// 缺少 Secure 指令，会被拒绝</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">__Secure-id=1</span></span>
<span class="line"><span style="color:#6A737D;">// 名称包含了 __Host-前缀的cookie缺少 Path=/ 指令，会被拒绝</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">__Host-id=1; Secure</span></span>
<span class="line"><span style="color:#6A737D;">// 名称包含了 __Host-前缀的cookie由于设置了 domain 属性，会被拒绝</span></span>
<span class="line"><span style="color:#22863A;">Set-Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">__Host-id=1; Secure; Path=/; domain=example.com</span></span></code></pre></div><h3 id="cookie请求标头" tabindex="-1">Cookie<code>请求标头</code> <a class="header-anchor" href="#cookie请求标头" aria-label="Permalink to &quot;Cookie\`请求标头\`&quot;">​</a></h3><p>在发起请求时，请求标头 <code>Cookie</code> 将会被浏览器自动携带，其中包含了存储在客户端的与该请求源相关的 Cookie。这些 Cookie 可以是先前由服务器通过 <code>Set-Cookie</code> 标头设置的，也可以是通过 JavaScript 的 <code>document.cookie</code> 方法设置的。为保护隐私，用户可在浏览器的隐私设置里面设置禁用 cookie，此时浏览器发起的所有请求将不会携带<code>Cookie</code>请求头。</p><p><strong>参数</strong></p><p>该请求标头并无其他参数</p><p><strong>取值</strong></p><ul><li><p><strong>&lt;name=value; name2=value2; name3=value3；.......&gt;</strong></p><p>携带的Cookie列表，由一系列的Cookie键值对组成，形式为 <code>name=value</code>，键值对之间用分号和空格（<code>&#39;; &#39;</code>）隔开。</p></li></ul><p><strong>示例</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PHPSESSID=298zf09hf012fh2;</span></span>
<span class="line"><span style="color:#85E89D;">Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43;</span></span>
<span class="line"><span style="color:#85E89D;">Cookie</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PHPSESSID=298zf09hf012fh2;</span></span>
<span class="line"><span style="color:#22863A;">Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43;</span></span>
<span class="line"><span style="color:#22863A;">Cookie</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1</span></span></code></pre></div><h2 id="cookie的安全风险" tabindex="-1">Cookie的安全风险 <a class="header-anchor" href="#cookie的安全风险" aria-label="Permalink to &quot;Cookie的安全风险&quot;">​</a></h2><p>当你存储信息到 Cookie 中时，需要明白 Cookie的值是存储在用户终端的本地文件中的，而且用户通常可以访问和修改这些值。此外，浏览器会自动将Cookie值包含在每个相关请求中，这意味着如果Cookie不合理配置，可能会导致许多安全风险。</p><ul><li><strong>携带secure属性，以防止MitM攻击窃取Cookie：</strong> 设置Cookie的secure属性会将其限制为仅在加密的HTTPS连接中传输，从而减少中间人攻击的风险。</li><li><strong>携带HttpOnly属性，以防止XSS攻击窃取Cookie：</strong> 通过将Cookie标记为HttpOnly，您可以防止通过JavaScript脚本访问Cookie，减少了XSS攻击的成功机会，如果需要JS访问Cookie，则需要做好<a href="https://wangjunliang.com/HTTP-Explanation/docs/security-strategy/common-attack-and-protection-methods.html#xss" target="_blank" rel="noreferrer">XSS攻击的防护手段</a>。</li><li><strong>设置SameSite属性，以防止CSRF攻击：</strong> 通过设置SameSite属性，您可以限制浏览器仅在同源请求中发送Cookie，从而降低CSRF攻击的可能性。但如果需要跨源访问时携带Cookie则SameSite属性必须设置None，此时则会有被点击劫持/CSRF攻击的风险，因此需要设置<a href="https://wangjunliang.com/HTTP-Explanation/docs/security-strategy/common-attack-and-protection-methods.html#%E7%82%B9%E5%87%BB%E5%8A%AB%E6%8C%81" target="_blank" rel="noreferrer">CSP策略防止点击劫持攻击</a>，并做好<a href="https://wangjunliang.com/HTTP-Explanation/docs/security-strategy/common-attack-and-protection-methods.html#csrf" target="_blank" rel="noreferrer">CSRF攻击防护手段</a></li><li><strong>经常更新Cookie以防止会话固定攻击：</strong> 会话固定攻击是攻击者尝试绑定用户会话到特定的会话标识符上。通过定期更改会话标识符，您可以降低这种攻击的成功几率。</li></ul><h2 id="第三方cookie" tabindex="-1">第三方Cookie <a class="header-anchor" href="#第三方cookie" aria-label="Permalink to &quot;第三方Cookie&quot;">​</a></h2><p>Cookie 与特定域、协议（例如，<code>http</code> 或 <code>https</code>）以及端口号相关联，如果设置了 <code>Set-Cookie</code>的<code>Domain</code> 属性，也可能与子域相关联。如果该 cookie 域、协议（例如，<code>http</code> 或 <code>https</code>）以及端口号匹配当前的页面，则认为该 cookie 和该页面来自同一站点，则称为<em>第一方 cookie（first-party cookie）</em>。</p><p>如果任一不同，则它不认为来自同一个站点，被称为<em>第三方 cookie（third-party cookie）</em>。第三方Cookie主要用于追踪用户行为、广告投放、分析和其他跨站点用途。例如，Google分析，你肯定很好奇为什么我没登陆，Google分析是如何判断用户是谁的？IP？但不准确呀，其实它使用的就是第三方Cookie。</p><div class="danger custom-block"><p class="custom-block-title">注意</p><p>Firefox 默认情况下会阻止已知包含跟踪器的第三方 cookie。第三方 cookie（或仅跟踪 cookie）也可能被其他浏览器设置或扩展程序阻止。阻止 Cookie 会导致某些第三方组件（例如社交媒体窗口小部件）无法正常运行。</p></div><h2 id="本节参考" tabindex="-1">本节参考 <a class="header-anchor" href="#本节参考" aria-label="Permalink to &quot;本节参考&quot;">​</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie</a></li></ul><p>转载需要经过本人同意，并标明出处！</p>`,31),t=[c];function p(i,r,d,k,C,g){return e(),s("div",null,t)}const S=o(l,[["render",p]]);export{h as __pageData,S as default};
