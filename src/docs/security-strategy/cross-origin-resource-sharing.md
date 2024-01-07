---
title: 跨源资源共享
head:
  - - meta
    - name: description
      content: 跨域资源共享（Cross-Origin Resource Sharing，CORS）是一种网络安全机制，用于在Web应用中控制跨域请求的访问权限，允许 Web 对不同源的服务器进行跨源资源访问，并使跨源数据传输得以安全进行。
  - - meta
    - name: keywords
      content: HTTP HTTP安全 CORS 跨源资源共享 Origin Access-Control-Request-Method Access-Control-Request-Headers Access-Control-Allow-Origin Access-Control-Allow-Methods Access-Control-Allow-Headers Access-Control-Expose-Headers Access-Control-Max-Age Access-Control-Allow-Credentials 简单请求 复杂请求
---
# 又跨域了？一文解释清楚跨源资源共享（cors）

为确保在Web浏览器中来自不同源的网页或脚本不能随意访问和操纵其他源的资源和数据，保障网站只能在受信任的环境中访问和共享数据，HTTP引入了同源策略（Same Origin Policy，简称SOP）。同源策略的出现极大的增强了Web的安全性并有效的防止了CSRF攻击，但也随之带来了许多开发上的问题与麻烦，特别是当我们需要在与不同源（不同域名、不同协议、不同端口）的资源进行通信和访问时尤为明显，比如下面这个例子：

![cross-origin-request](../../public/cross-origin-request.png)

>wangjunliang.com需要请求访问wangawang.com的内容，由于同源机制的存在， XMLHttpRequest（XHR）或 Fetch API是不允许发起跨域的请求的，当然我们可以通过代理或Jsonp的方式来解决，但每次搭建代理过于麻烦并且维护成本很大，而Jsonp呢？则是存在很多潜在的安全风险，容易被攻击者利用。

综上所述，HTTP急需引入一种安全的、高效的、标准化的跨源访问机制，于是乎跨源资源共享（Cross Origin Resource Sharing，简称CORS）机制则诞生了



## 跨源资源共享

**跨域资源共享（Cross-Origin Resource Sharing，CORS）是一种网络安全机制，用于在Web应用中控制跨域请求的访问权限**，允许 Web 对不同源的服务器进行跨源资源访问，并使跨源数据传输得以安全进行

**CORS机制通过一系列的`请求标头`来表明该跨域请求的`来源`、`方法`以及`所携带请求头部（这些请求标头无需自己配置，由浏览器自动携带）`，服务端接收请求后通过这些`请求标头`来判断是否允许这些源访问加载自己的资源，并返回一系列的`响应标头`告知相关信息。** 由于CORS机制的相关`请求标头`都是浏览器自动携带的，因此CORS机制的配置通常发生在服务端而不是客户端，服务端需要通过适当配置 HTTP `响应标头`来允许或拒绝跨域请求



## CORS相关请求标头

CORS机制的相关`请求标头`都是浏览器自动携带的，无须手动设置



### Origin`请求标头`

 **`Origin`表示了请求的来源（协议、主机、端口）** 

**参数**

该请求标头并无其他参数

**取值**

- **null**

  请求的来源是“隐私敏感”的，或者是 HTML 规范定义的*不透明来源*

- **< scheme>://< hostname>**

  请求的协议+源站的域名或 IP 地址

- **< scheme>://< hostname>:< port>**

  请求的协议+源站的域名或IP地址+端口号(缺省为服务器的默认端口)

**示例**

```http
Origin: https://wangjunliang.com
Origin: https://wangjunliang.com:80
```

::: tip 提示

**以下情况下浏览器会自动携带`Origin`：**

- 跨源请求
- 除GET和HEAD以外的同源请求，即它会被添加到同源的 `POST`、`OPTIONS`、`PUT`、`PATCH`和 `DELETE`请求中

除上述规则外，还有一些特殊情况。例如，在 [no-cors 模式](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/mode#属性值)下的跨源`GET` 或 `HEAD` 请求不会发送 `Origin` 标头

**以下情况下`Origin`会被设置为`null`：**

- 请求来源的协议不是 `http`、`https`、`ftp`、`ws`、`wss` 或 `gopher` 中的任意一个（如：`blob`、`file` 和 `data`）
- 跨源的图像或媒体，包括：`<img>`、`<video>` 和 `<audio>` 元素
- 属于以下几种文档类型的：使用 `createDocument()` 创建的、通过 `data:` URL 生成的或没有创建者的浏览上下文的
- 跨源重定向
- 没有为 sandbox 属性设置 `allow-same-origin` 值的 iframe
- 响应（response）是网络错误

:::



### Access-Control-Request-Method`请求标头`

 **`Access-Control-Request-Method` 表示真正的请求会采用的请求方法**，该请求标头出现于 [preflight request](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)（预检请求）中，因为预检请求所使用的方法总是`OPTIONS` ，与实际请求所使用的方法不一样，所以使用该请求头通知服务器在真正的请求中会采用哪种HTTP 方法

**参数**

该请求标头并无其他参数

**取值**

- **\<method>**

  一种HTTP的请求方法，如：GET、POST或DELETE等，表示真正的请求会采用的请求方法

**示例**

```http
Access-Control-Request-Method:GET
Access-Control-Request-Method: POST
```



### Access-Control-Request-Headers`请求标头`

 **`Access-Control-Request-Headers` 表示真正的请求会携带的请求标头**，该请求标头出现于 [preflight request](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)（预检请求）中，因为预检请求所使用的方法总是 `OPTIONS`，与实际请求所携带的请求标头不一样，所以使用该请求头通知服务器在真正的请求中会携带哪些请求标头

**参数**

该请求标头并无其他参数

**取值**

- **[\<header-name>,\<header-name>,\<header-name>...]**

  一系列HTTP请求标头，以逗号分隔，表示真正的请求会携带的请求标头

**示例**

```http
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
Access-Control-Request-Headers: X-ADC, Content-Type
```



## CORS相关响应标头

CORS机制主要通过服务端适当配置 HTTP `响应标头`来允许或拒绝跨域请求



### Access-Control-Allow-Origin`响应标头`

**`Access-Control-Allow-Origin` 响应标头指定了该资源能否被给定的来源(Origin`请求标头`)的请求访问**

**参数**

该响应标头并无其他参数

**取值**

- **\***

  允许任意来源的请求访问资源（当使用*来响应包含凭据的请求会导致错误）

- **\<scheme>://\<hostname>:\<port>**

  指定一个来源（只能指定一个），协议+源站的域名或IP地址+端口号(缺省为服务器的默认端口)。仅允许该来源的请求访问资源

- **null**

  仅允许来源为null的请求访问资源

**示例**

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://wangjunliang.com
```

::: danger 注意

如果服务端指定了具体的单个源（作为允许列表的一部分，可能会根据请求的来源而动态改变）而非通配符“`*`”，那么响应标头中的 `Vary` 字段的值必须包含 `Origin`。这将告诉客户端：服务器对不同的 `Origin`返回不同的内容

```http
Access-Control-Allow-Origin: https://wangjunliang.com
Vary: Origin
```

:::



### Access-Control-Allow-Methods`响应标头`

**`Access-Control-Allow-Methods`表示客户端所要访问的资源允许使用的请求方法** 

**参数**

该响应标头并无其他参数

**取值**

- **\***

  当请求没有携带凭据（请求没有`Cookie`或认证信息），允许所有请求方法访问资源；当请求带有凭据时，会被简单地当作值“`*`”，没有特殊的语义

- **[\<method>,\<method>,\<method>...]**

  一系列HTTP请求方法，以逗号分隔，表示访问的资源允许使用的请求方法

**示例**

```http
Access-Control-Allow-Methods: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
```



### Access-Control-Allow-Headers`响应标头`

**`Access-Control-Allow-Headers`表示客户端所要访问的资源允许使用的请求标头**，[CORS 安全列表的标头](#简单请求)无需特意列出，它始终被支持

**参数**

该响应标头并无其他参数

**取值**

- **\***

  当请求没有携带凭据（请求没有`Cookie`或认证信息），允许携带任何请求标头的请求访问资源；当请求带有凭据时，会被简单地当作值“`*`”，没有特殊的语义

- **[\<header-name>,\<header-name>,\<header-name>...]**

  一系列HTTP请求标头，以逗号分隔，表示访问的资源允许使用的请求标头

**示例**

```http
Access-Control-Allow-Headers: *
Access-Control-Allow-Headers: X-Custom-Header, Upgrade-Insecure-Requests
```



### Access-Control-Max-Age`响应标头`

**`Access-Control-Max-Age` 表示 [preflight request](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request) （预检请求）的返回结果（即 `Access-Control-Allow-Methods` 和`Access-Control-Allow-Headers`提供的信息）可以被缓存多久。** 该标头仅能控制 [preflight request](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request) （预检请求）的响应的缓存时间，对于简单的跨源请求的缓存策略通常由HTTP缓存头部（如`Cache-Control`、`Expires`等）来控制

**参数**

该响应标头并无其他参数

**取值**

- **\<seconds>**

  返回结果可以被缓存的最长时间（秒）。 在 Firefox 中，[上限是 24 小时](https://dxr.mozilla.org/mozilla-central/rev/7ae377917236b7e6111146aa9fb4c073c0efc7f4/netwerk/protocol/http/nsCORSListenerProxy.cpp#1131) （即 86400 秒）。 在 Chromium v76 之前， [上限是 10 分钟](https://cs.chromium.org/chromium/src/services/network/public/cpp/cors/preflight_result.cc?l=36&rcl=52002151773d8cd9ffc5f557cd7cc880fddcae3e)（即 600 秒)。 从 Chromium v76 开始，[上限是 2 小时](https://cs.chromium.org/chromium/src/services/network/public/cpp/cors/preflight_result.cc?l=31&rcl=49e7c0b4886cac1f3d09dc046bd528c9c811a0fa)（即 7200 秒)。 Chromium 同时规定了一个默认值 5 秒。 如果值为 **-1**，表示禁用缓存，则每次请求前都需要使用 OPTIONS 预检请求。

**示例**

```http
Access-Control-Max-Age: 60  //1分钟
Access-Control-Max-Age: 600  //10分钟
```



### Access-Control-Expose-Headers`响应标头`

 **`Access-Control-Expose-Headers` 允许服务器指示那些响应标头可以暴露给浏览器中运行的脚本，以响应跨源请求**。在跨源访问时，`XMLHttpRequest` 对象的 `getResponseHeader()` 方法只能拿到[CORS 安全列表的响应标头](#简单请求)，如：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma等，如果想要让客户端可以访问到其他的标头，服务器必须将它们在 `Access-Control-Expose-Headers` 里面列出来

**参数**

该响应标头并无其他参数

**取值**

- **\***

  当请求没有携带凭据（请求没有`Cookie`或认证信息），浏览器中运行的脚本允许访问所有响应标头；当请求带有凭据，会被简单地当作值“`*`”，没有特殊的语义

- **[\<header-name>,\<header-name>,\<header-name>...]**

  一系列HTTP响应标头，以逗号分隔，表示哪些响应标头可以暴露给浏览器中运行的脚本

**示例**

```http
Access-Control-Expose-Headers: Content-Encoding
Access-Control-Expose-Headers: Content-Encoding, Kuma-Revision
```



### Access-Control-Allow-Credentials`响应标头`

 **`Access-Control-Allow-Credentials` 表示客户端所要访问的资源是否允许使用credentials(认证信息，如：cookie等)**，

**参数**

该响应标头并无其他参数

**取值**

- **true**

  这个头的唯一有效值（区分大小写）。如果不需要 credentials，相比将其设为 false，请直接忽视这个头。

**示例**

```http
Access-Control-Allow-Credentials: true
```

::: danger 注意

`Access-Control-Allow-Credentials` 标头需要与 [`XMLHttpRequest.withCredentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials) 或 Fetch API 的 [`Request()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request) 构造函数中的 `credentials` 选项结合使用，并需要在服务端正确配置Cookie 策略的[SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value) 属性。因为一般而言，对于跨源 `XMLHttpRequest` 或 `Fetch`请求，浏览器并**不会**发送身份凭证信息。如果想要跨源的请求发送凭证信息，需要设置[`XMLHttpRequest.withCredentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials) 属性或 Fetch API 的 [`Request()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request) 构造函数中的 `credentials` 属性，并且Cookie是否能被携带至跨源请求中，也受响应标头中[SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value) 属性的影响。

:::



## 复杂请求与简单请求

**由于同源策略对于XHR/Fetch API的约束为：请求可以发送到不同来源的服务器，服务端能够接收并处理，只是前端无法读取返回数据。因此我们必须对可能对服务器数据产生副作用的 HTTP 请求方法采取必要的验证手段，不然任何修改数据的跨源攻击都能被发送到服务器并且被正确处理，而攻击者仅仅是不能够得到请求返回内容而已。**

对此**CORS将请求分为了简单请求与复杂请求**，**对于简单请求而言，只要满足CORS相关规则即可进行跨域访问**；但**对于复杂请求而言，浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨源请求，服务器确认允许之后，才发起实际的 HTTP 请求。**



### 简单请求

满足所有下述条件，则该请求可视为简单请求：

- 使用以下方法之一：

  `GET`、`HEAD`、`POST`

- 仅使用了浏览器自动设置的标头、 Fetch 规范中定义为[禁用标头名称](https://fetch.spec.whatwg.org/#forbidden-header-name)的标头以及[CORS安全的标头字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)中的标头，例如：

  `Accept`、`Accept-Language`、`Content-Language`、`Content-Type`、`Range`

- Content-Type仅限于下列三者之一：

  `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`

- 如果请求是使用 XMLHttpRequest 对象发出的，在返回的 XMLHttpRequest.upload 对象属性上没有注册任何事件监听器；也就是说，给定一个 XMLHttpRequest 实例 `xhr`，没有调用 `xhr.upload.addEventListener()`，以监听该上传请求

- 请求中没有使用 `ReadableStream`对象

**对于简单请求而言，只要满足CORS相关标头即可进行跨域访问**

假如站点 https://wangjunliang.com 的网页想要访问 https://wangawang.com 的资源，并发起的是简单请求，此时请求只要满足了服务端相关CORS的响应标头配置，请求则能正常访问资源，以下为客户端与服务器端交互示例

![cors-simple-request](../../public/cors-simple-request.png)

客户端https://wangjunliang.com 向服务端 https://wangawang.com 发起了一个跨源请求，由于该请求满足简单请求的条件，因此浏览器将发起一个简单请求，并且该请求还携带了Cookie信息。由于服务端允许该源访问并且允许携带Cookie信息，因此服务器会正常处理并响应请求内容，其中响应头中`Access-control-Allow-Origin`包含了允许访问该资源的源列表，`Access-Control-Allow-Credentials`为`true`表示允许携带Cookie等身份认证头。



### 复杂请求

**当请求不满足简单请求的条件时，则为复杂请求。与简单请求不同，对于复杂请求浏览器会首先使用 `OPTIONS`方法`自动`发起一个[预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)到服务器，以获知服务器是否允许该实际请求。** 由于同源策略对于XHR/Fetch API的约束为：请求可以发送到不同来源的服务器，服务端能够接收并处理，只是前端无法读取返回数据。因此我们必须对可能对服务器数据产生副作用的 HTTP 请求方法进行"预检“，避免跨域请求对服务器的数据产生未预期的影响。

以下是一个需要执行预检的跨源访问例子：

![pre-request-example](../../public/pre-request-example.png)

客户端https://wangjunliang.com 向服务端 https://wangawang.com 发起了一个跨源请求，由于该请求需要携带两个自定义的标头(`X-PINGOTHER` 与 `Content-Type`)，因此该请求是一个复杂请求，浏览器将首先发起一个预检请求。

预检请求将自动携带标头字段 `Access-Control-Request-Method` 告知服务器，实际请求将使用 `POST` 方法、标头字段`Access-Control-Request-Headers` 告知服务器，实际请求将携带两个自定义请求标头字段：`X-PINGOTHER` 与 `Content-Type`。服务器据此决定，该实际请求是否被允许

如果服务器允许该请求，就会如上图所示返回相应的响应内容：

-  `Access-Control-Allow-Origin: https://wangjunliang.com`表示允许wangjunliang.com访问该资源
-  `Access-Control-Allow-Methods` 表示允许客户端使用 `POST` 和 `GET` 方法发起请求
-  `Access-Control-Allow-Headers` 表示允许请求中携带字段 `X-PINGOTHER` 与 `Content-Type`标头
-  `Access-Control-Max-Age` 给定了该预检请求可供缓存的时间长短，单位为秒，默认值是 5 秒。在有效时间内，浏览器无须为同一请求再次发起预检请求。以上例子中，该响应的有效时间为 86400 秒，也就是 24 小时。请注意，浏览器自身维护了一个[最大有效时间](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age)，如果该标头字段的值超过了最大有效时间，将不会生效

最后预检请求完成之后，客户端发送实际请求，服务端根据请求处理响应即完成



### 需要注意的地方

- 当携带了Cookie等认证信息的跨源请求，响应标头`Access-Control-Allow-Origin`、`Access-Control-Allow-methods`、`Access-Control-Allow-heders`、`Access-Control-Expose-Headers`都不能为*
- 当简单请求携带了Cookie等认证信息，如果响应中缺失 `Access-Control-Allow-Credentials: true`响应标头，则响应内容会被忽略，不会提供给 web ；如果存在该响应标头，则必须携带Cookie等认证信息。当复杂请求的预检响应中缺失 `Access-Control-Allow-Credentials: true`响应标头，实际请求则不能携带Cookie等认证信息，如果存在，实际请求则必须携带Cookie等认证信息
- 携带`Authorization`请求标头会把简单请求变为复杂请求





## 本节参考

- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS/Errors
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS
- https://www.invicti.com/white-papers/whitepaper-same-origin-policy/
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers


转载需要经过本人同意，并标明出处！