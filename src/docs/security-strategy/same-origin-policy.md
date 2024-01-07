---
title: 同源策略
head:
  - - meta
    - name: description
      content: 同源策略是一种内置于Web浏览器中的Web安全机制，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互，它影响着网站相互访问的方式。 同源策略的主要目的是确保在Web浏览器中，来自不同源的网页或脚本不能随意访问和操纵其他源的资源和数据，确保网站只能在受信任的环境中访问和共享数据。
  - - meta
    - name: keywords
      content: HTTP HTTP安全 同源策略 SOP 跨源访问 代理 JSONP CORS CSRF 跨站请求伪造
---
# CSRF攻击？同源策略会出手的

CSRF（Cross-Site Request Forgery，跨站请求伪造）是一种利用Web应用程序中的信任关系的攻击方式，攻击者通过某些方式(例如社交媒体、广告等)诱骗受害者访问恶意网站，恶意网站利用受害者在其他网站已登录的身份信息隐式发送敏感操作的请求，由于该受害者已登录该网站因此该请求则会自动携带该用户的身份信息，由于身份信息正确服务器也会执行相应的敏感操作，这样受害者在访问浏览恶意网站时并不需要任何操作，神不知鬼不觉的情况下就被攻击了，执行了恶意操作。

具体我们看下面的例子(该例子先假设不存在同源策略)：

>用户利用网页登录了他们的电子银行账户并保留了有效的会话，此时用户被引导进入了一个恶意网站，该恶意网站利用用户已登录的身份信息向电子银行后台发起了一个转账请求，由于该用户已登录并保留了有效的会话，因此该请求将携带该用户的身份信息发送到服务器，由于身份信息有效，服务器便信任并处理这个请求，就这样这笔转账在神不知鬼不觉完成了。

从上述例子我们可以看到CSRF攻击危害性极大，并且极其隐蔽，但幸运的是由于各种原因(主要是下面讲的同源策略)的存在，这种攻击是很难发起和进行的，因此不必太担心。如果您觉得上述例子还不太直观，您可以访问[这个例子](https://wangjunliang.com/huihua.html)感受一下具体攻击(本攻击并不会造成伤害请放心访问)，该例子的攻击虽然不是CSRF攻击(CSRF攻击太难发起了)，但它与CSRF攻击很相似，甚至CSRF攻击会比该例子中的攻击更为严重，因为上述攻击还需要你点击操作，而CSRF攻击则是无需任何操作。

其实想要防护该攻击的手段非常简单，因为恶意网站的域名肯定与想要攻击的域名不一样，例如上述例子中恶意网站的域名可能为www.eyiwangzhan.com，而电子银行的域名肯定与它不同，因此浏览器仅需限制不同域名间的网站不能发起请求就可以防止该种攻击，这也是大名鼎鼎的同源策略！



## 同源策略

**同源策略 (Same Origin Policy，简称SOP)是一种内置于 Web 浏览器中的 Web 安全机制，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互，它影响着网站相互访问的方式。** **同源策略的主要目的是确保在Web浏览器中，来自不同源的网页或脚本不能随意访问和操纵其他源的资源和数据，确保网站只能在受信任的环境中访问和共享数据**，以增强用户的隐私，防止恶意攻击，并确保Web应用程序的数据安全性，同源策略的存在有效的防止了CSRF攻击。 SOP 不需要手动配置，它会在每个支持它的浏览器中自动启用。

**同源策略经常与内容安全策略混淆，区别在于，内容安全策略阻止对外部资源的调用（出站），而同源策略则阻止来自外部资源的引用（入站）**。此外，内容安全策略默认情况下不启用，必须由开发人员定义。



## 什么是同源？

**同源（Same-Origin）是一个网络安全概念，用于描述Web页面中不同资源的来源是否相同**。具体来说，**当资源地址与网站地址的`协议`、`域名`以及`端口号`完全相同时，则可以说该资源是同源的；如果三者有任一不同，该资源则是跨域的**。

例如，网站为：https://wangjunliang.com，以下是一些同源和跨源的示例：

| URL                                                          | 结果 | 原因         |
| ------------------------------------------------------------ | ---- | ------------ |
| https://wangjunliang.com/HTTP-Explanation                    | 同源 | 只是路径不同 |
| https://wangjunliang.com/HTML-Guide/content/1.what-is-html.html | 同源 | 只是路径不同 |
| http://wangjunliang.com                                      | 跨域 | 协议不同     |
| https://wangawang.com                                        | 跨域 | 域名不同     |
| https://wangjunliang.com:8932                                | 跨域 | 端口号不同   |



## 继承源

**在页面中通过 `about:blank` 或 `javascript:` URL 执行的脚本会继承打开该 URL 的文档的源，从而允许访问该文档的 DOM**，因为这些类型的 URL 没有包含源服务器的相关信息。以下为一个具体示例：

```html
<a href="about:blank" onclick="openBlankPage(); return false;">使用 about:blank</a>
<a href="javascript: executeScript();">使用 javascript:</a>
<script>
    function openBlankPage() {
      const newWindow = window.open('about:blank', 'BlankPage', 'width=400,height=300');
      if (newWindow) {
        newWindow.document.write('<h1>这是新页面的内容</h1>');
        newWindow.document.close();
      } else {
        alert('弹窗被阻止，请允许此网站弹出窗口。');
      }
    }

    function executeScript() {
      // 在当前文档中执行脚本
      const paragraph = document.createElement('p');
      paragraph.textContent = '通过 javascript: URL 执行的脚本';
      document.body.appendChild(paragraph);
      alert('通过 javascript: URL 执行的脚本，可以访问当前文档的 DOM。');
    }
</script>
```

该示例中有两个链接：一个使用 `about:blank` 打开一个新的浏览器窗口，另一个使用 `javascript:` 执行脚本。点击任何一个链接都会执行相应的操作并会继承打开该 URL 的文档的源，可以访问当前文档的 DOM。

::: danger 注意

现代浏览器通常将使用 `file:///` 模式加载的文件的来源视为*不透明的来源*。这意味着，假如一个文件包括来自同一文件夹的其他文件，它们不会被认为来自同一来源，并可能引发 [CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) 错误。

`data:` URL 将获得一个新的、空的安全上下文。

:::



## 修改源

**当web的源为某一网站的子域名时，两网站可通过修改`document.domain`的值为父域名，使之变为同源**。例如下面的例子：

```js
// 网站1的源为：https://wangjunliang.com 修改其document.domain的值为父域名
document.domain='wangjunliang.com'

// 网站2的源为：https://other.wangjunliang.com 修改其document.domain的值为父域名
document.domain='wangjunliang.com'

// 此时两网站则变为了同源
```

任何对 `document.domain` 的赋值操作，包括 `document.domain = document.domain` 都会导致端口号被覆盖为 `null` 。因此 `other.wangjunliang.com` 不能仅通过设置 `document.domain = "wangjunliang.com"` 来与`wangjunliang.com` 通信。必须在它们双方中都进行赋值，以确保端口号都为 `null` 。

::: danger document.domain已被弃用

这里描述的方法（使用 `document.domain`）已被弃用，因为它破坏了同源策略所提供的安全保护，并使浏览器中的源模型复杂化，导致互操作性问题和安全漏洞。

:::



## 同源策略的约束

同源策略是浏览器的一个关键安全策略，它限制了网页中的某些内容在不同来源之间的交互。以下是受同源策略限制与不受限制的内容：

受限制的内容：

- **XHR/Fetch 请求：** 使用 XMLHttpRequest（XHR）对象或 Fetch API 发起的跨域请求通常会受到同源策略的限制。浏览器会阻止页面从不同源的服务器获取数据，除非服务器明确启用了跨域资源共享（CORS）。

  ::: tip 对于XHR/Fetch的具体限制如下：

  - XHR/Fetch调用可以发送到不同来源的站点，但无法读取回复
  - 如果请求 URL 是同源的，则可以读取响应
  - 自定义标头只能添加到向同一来源发出的请求中

  :::

- **Cookie 和本地存储：** 同源策略限制了网页对不同源的 Cookie 和本地存储（如localStorage和sessionStorage）的访问。只有在同一源内的页面才能访问相同的 Cookie 和本地存储。

- **DOM 访问：** 网页的 JavaScript 通常只能访问与自己来源相同的文档对象模型（DOM）。这意味着脚本不能直接访问其他源的文档元素，如iframe中的内容。

- **iframe 访问：** 同源策略限制了页面嵌套在iframe中的内容与包含iframe的页面之间的交互，除非通过特殊的设置允许。

- **WebSocket 连接：** WebSocket 连接的初始握手通常受到同源策略的限制，但一旦建立连接，数据的传输不再受到同源策略的影响。

- **字体资源（Fonts）：** 同源策略通常也会对字体资源（如WOFF、TTF等字体文件）的跨域访问进行限制。这意味着在默认情况下，从不同源加载的字体资源可能无法在页面中正常渲染。为了允许跨域字体加载，服务器可以通过配置跨域资源共享（CORS）来明确允许特定来源的页面访问字体资源。

- **嵌入的对象（Embedded Objects）：** 同源策略通常限制了页面中嵌入的对象（如嵌入的 PDF 文件、嵌入的音视频等）与包含它们的页面之间的交互。这些对象需要与其所在页面具有相同的源，或者通过服务器配置允许特定来源的页面访问。

不受限制的内容：

- **CSS：** 同源策略通常不影响页面的样式表（CSS），可以从任何源加载样式。
- **图片、音频和视频：** 加载的图片、音频和视频文件通常不受同源策略限制，可以从任何源加载。
- **script 标签引入的外部脚本：** 使用 `<script>` 标签引入的外部脚本通常不受同源策略的限制，可以从任何源加载并执行。
- **链接跳转和资源下载：** 可以通过链接跳转（例如点击超链接）和下载资源（例如点击下载链接）的方式访问不同源的内容，但这些操作会导致浏览器向不同源的服务器发起新的请求。



## 跨源访问

同源策略增强了Web的安全性，但也随之带来了许多开发上的问题与麻烦，特别是当我们需要在与不同源（不同域名、不同协议、不同端口）的资源进行通信和访问时尤为明显。不过好在针对这些问题，同源策略也做出了许多扩展和适应。



### 跨源网络访问

跨源网络访问是指在Web开发中需要从一个源（例如一个域名）访问另一个不同源的网络资源，如从一个不同的域名或端口请求数据或资源。由于同源策略的限制，XHR/Fetch直接进行跨源网络访问通常会受到限制。以下是一些跨源网络访问的问题和解决方法：

- **代理**：通过创建同源的代理的方式，将跨源请求从客户端发送到同源的代理，然后再由代理发送到目标服务器。这样，浏览器只会看到与自己源相同的请求，从而绕过了同源策略的限制。

- **JSONP**：JSONP通过动态创建`<script>`元素，将回调函数包装在请求中，以获取跨源数据。由于script 标签引入的外部脚本并不受同源策略的限制因此该方案能够实现跨源访问，但使用该方法要小心安全问题，因为 JSONP 可能存在潜在的XSS风险。

  ```html
  <script src="https://api.example.com/data?callback=processData"></script>
  ```

- **CORS（跨源资源共享）**：CORS 是一种用于解决跨源网络访问问题的标准化机制。服务器可以通过设置HTTP响应头来明确指定哪些域名的网页可以访问其资源。这样，只有被授权的域名才能够进行跨源访问。



### 跨源脚本API访问

JavaScript 的 API 中，如 `iframe.contentWindow`、 `window.parent`、`window.open` 和 `window.opener` 允许文档间直接相互引用。当两个文档的源不同时，引用这些方式将存在一些限制，如下所述：

**Window**

允许以下对 `Window` 属性的跨源访问：

| 方法                 |
| :------------------- |
| `window.blur`        |
| `window.close`       |
| `window.focus`       |
| `window.postMessage` |

| 属性              |         |
| :---------------- | :------ |
| `window.closed`   | 只读。  |
| `window.frames`   | 只读。  |
| `window.length`   | 只读。  |
| `window.location` | 读/写。 |
| `window.opener`   | 只读。  |
| `window.parent`   | 只读。  |
| `window.self`     | 只读。  |
| `window.top`      | 只读。  |
| `window.window`   | 只读。  |

某些浏览器允许访问除上述外更多的属性。

::: tip window.postMessage

如果您需要在窗口对象（例如页面和该页面的弹出窗口或页面和嵌入该页面的 iframe）之间进行通信，则可以使用 window.postMessage()*方法*。

例如，您可以使用 获取对另一个窗口的引用`newWindow = window.opener`，然后通过 调度消息事件`newWindow.postMessage()`。使用`newWindow`事件对象来访问通过此方法传递的参数。

:::

**Location**

允许以下对 `Location` 属性的跨源访问：

| 方法               |
| :----------------- |
| `location.replace` |

| 属性                     |        |
| :----------------------- | :----- |
| `HTMLAnchorElement.href` | 只写。 |



### 跨源数据存储访问

访问存储在浏览器中的数据，如 `Web Storage` 和 `IndexedDB`，是以源进行分割的。每个源都拥有自己单独的存储空间，一个源中的 JavaScript 脚本不能对属于其他源的数据进行读写操作。

`Cookie`使用不同的源定义方式。一个页面可以为本域和其父域设置 cookie，只要是父域不是公共后缀（public suffix）即可。Firefox 和 Chrome 使用 [Public Suffix List](https://publicsuffix.org/) 检测一个域是否是公共后缀。当你设置 cookie 时，你可以使用 `Domain`、`Path`、`Secure` 和 `HttpOnly` 标记来限定可访问性。当你读取 cookie 时，你无法知道它是在哪里被设置的。即使只使用安全的 https 连接，你所看到的任何 cookie 都有可能是使用不安全的连接进行设置的。



## 同源策略也不能完全阻止CSRF攻击

同源策略确实能够有效防止CSRF攻击，但它并不能完全阻止，这是因为以下两点原因:

- **存在不受同源策略限制的内容**: 同源策略主要用于限制不同域下的网页之间的交互。然而，一些HTML标签如`<img>`、`<video>`等以及一些资源文件（如图片、视频、音频等）不受同源策略的限制，它们可以从不同域加载并在当前页面中展示。这意味着攻击者可以通过构建恶意图片或视频的请求，来触发CSRF攻击，尤其当用户在登录状态下访问恶意网站时，攻击可能成功。我们可以看一个具体案例：

  >攻击者构造了一个恶意网站，并通过构造一个图片的请求来触发CSRF攻击
  >
  >```html
  ><img src="https://bank.com/change-password?newPassword=hackerPassword" width="0" height="0">
  >```
  >
  >用户在访问恶意网站时，浏览器会尝试加载一个图像资源，即银行网站上更改密码的请求，其中包含了新密码参数。因为图片请求不受同源策略的限制，浏览器会自动将用户的当前会话凭证（如cookies）发送到银行网站，以执行更改密码请求。如果用户已经登录到银行网站，他们的密码可能会被更改为"hackePassword"，而用户可能不会察觉到这一变化。

- **存在JSONP等跨源访问手段**: JSONP（JSON with Padding）是一种跨源访问手段，它允许在浏览器中加载来自不同域的数据，它在早期的网络应用中很常见。攻击者可以利用这种机制来发起CSRF攻击，通过向目标网站发送JSONP请求，以触发未经授权的操作。

为了有效地防止CSRF攻击，我们仍需要采取其他额外的措施，如：

- **使用CSRF令牌**: 在每个敏感操作的请求中包含一个随机生成的CSRF令牌，该令牌只有在请求发起页面和接收页面具有相同的令牌时，请求才会被接受。这可以确保只有合法的请求才能成功。
- **检查Referer头**: 服务器可以检查HTTP请求头中的Referer字段，以确保请求来自期望的来源。然而，这种方法并不总是可靠，因为Referer字段可能被篡改或缺失。
- **使用合理的请求方式：** 由于获取资源等不被同源策略限制的请求通常是Get方法，因此我们应当合理定义敏感操作的请求方法(如：Post等)，即可规避利用该方法发起的CSRF攻击
- **慎用JSONP等跨源访问手段，改用CORS：** JSONP（JSON with Padding）是一种跨源访问手段，它允许在浏览器中加载来自不同域的数据，它在早期的网络应用中很常见。攻击者可以利用这种机制来发起CSRF攻击，通过向目标网站发送JSONP请求，以触发未经授权的操作。CORS 是一种用于解决跨源网络访问问题的标准化机制。服务器可以通过设置HTTP响应头来明确指定哪些域名的网页可以访问其资源。这样，只有被授权的域名才能够进行跨源访问。
- **使用Cookie认证身份或保持会话需要设置其`SameSite`等相关安全属性，最好还是使用`Authorization`认证手段：** 确保使用Cookie进行身份认证和会话管理时，设置Cookie的SameSite属性，以限制跨站点请求。
- **同源策略的合理利用：**  尽量在应用中合理利用同源策略，将敏感操作限制在同一域内进行，从而降低跨域请求的风险。



::: details  🎈本节参考

- https://www.invicti.com/learn/same-origin-policy-sop/
- https://www.invicti.com/white-papers/whitepaper-same-origin-policy/#NextGenerationSameOriginPolicy
- https://www.w3.org/Security/wiki/Same_Origin_Policy
- https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS
- https://www.invicti.com/learn/cross-site-request-forgery-csrf/

:::

转载需要经过本人同意，并标明出处！