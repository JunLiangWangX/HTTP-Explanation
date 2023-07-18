# HTTP的历史

**超文本传输协议**（英语：**H**yper**T**ext **T**ransfer **P**rotocol，缩写：**HTTP**）是[万维网](https://zh.wikipedia.org/wiki/%E4%B8%87%E7%BB%B4%E7%BD%91)（World Wide Web）的基础协议。自[蒂姆·伯纳斯-李 ](https://zh.wikipedia.org/wiki/提姆·柏內茲-李)（Tim BernersLee）博士和他的团队在 1989-1991 年间创造出它以来，HTTP 已经发生了太多的变化，在保持协议简单性的同时，不断扩展其灵活性。如今，HTTP 已经从一个只在实验室之间交换文档的早期协议进化到了可以传输图片，高分辨率视频和 3D 效果的现代复杂互联网协议。



## HTTP的诞生

1989 年 3 月[欧洲核子研究组织](https://zh.wikipedia.org/wiki/歐洲核子研究組織)（CERN）的[蒂姆·伯纳斯-李 ](https://zh.wikipedia.org/wiki/提姆·柏內茲-李)（Tim BernersLee）博士提出了一种能让远隔两地的研究者们共享知识的设想。 最初设想的基本理念是：借助多文档之间相互关联形成的超文本（HyperText），连成可相互参阅的 WWW（World Wide Web，万维网）。

![proposal](../../public/proposal.gif)

<P align=center style="color:gray">蒂姆最初的提议。图片来源：欧洲核子研究中心</p>

到 1990 年 10 月，Tim 编写了三项基本技术来实现设想，这些技术仍然是当今网络的基础（您可能已经在网络浏览器的某些部分上看到过这些技术）：

- HTML（HyperText Markup Language）：超文本标记语言，作为编写文档的语言。
- HTTP（HyperText  Transfer Protocol）：超文本传输协议，作为传递文档的协议。
- URL（Uniform Resource Locator）：统一资源标识符，一种唯一的“地址”，用于标识文档在网络上的位置。

此外 Tim 还编写了第一个网页编辑器/浏览器（“WorldWideWeb.app”）和第一个 Web 服务器（“httpd”）。至此 Tim 初步完成了他的设想的所有技术实现，且第一批服务器已经在 1991 年初在 CERN 以外的地方运行了，1991 年 8 月 16 日，Tim Berners-Lee 在公开的超文本新闻组上[发表](https://www.w3.org/People/Berners-Lee/1991/08/art-6484.txt)的文章被视为是万维网公共项目的开始。



对于HTTP而言， 在应用的早期阶段它是非常简单的，后来它也被称为 HTTP/0.9，有时也叫做单行hang（one-line）协议。



## HTTP/0.9——单行协议(1991)

最初版本的 HTTP 协议并没有版本号，后来它的版本号被定位在 0.9 以区分后来的版本。[HTTP/0.9](https://www.w3.org/Protocols/HTTP/AsImplemented.html)于 1991 年提出。它是有史以来最简单的协议；它的请求由单行指令构成（因此也称为单行协议），以唯一可用方法 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 开头，其后跟目标资源的路径（一旦连接到服务器，协议、服务器、端口号这些都不是必须的）。

```http
GET /index.html
```

响应也极其简单的：只包含HTML文档本身。

```html
<HTML>
这是一个非常简单的 HTML 页面
</HTML>
```

跟后来的版本不同，HTTP/0.9 的响应内容并不包含 HTTP 头。这意味着只有 HTML 文件可以传送，无法传输其他类型的文件。也没有状态码或错误代码。一旦出现问题，一个特殊的包含问题描述信息的 HTML 文件将被发回，供人们查看。

### 特性

- 它是 ASCII 协议，请求/响应都是由ASCII字符组成字符串。
- 它在TCP/IP 链路上运行。

- 请求以回车符 (CRLF) 终止。

- 响应只包含HTML文档。
- 文档传输完成后，TCP连接将终止。

### 缺陷

- **只支持GET请求：** HTTP/0.9仅支持GET方法，意味着只能用于获取资源，不能用于其他类型的请求，如POST、PUT、DELETE等。这导致在处理复杂的应用逻辑和实现数据更新等操作时，HTTP/0.9显得非常有限。
- **只能传输HTML：** HTTP/0.9的响应只能包含HTML文档，无法处理其他类型的数据，如JSON、XML、图像等。这限制了其在处理现代Web应用程序中的数据传输和交互能力。
- **无法进行内容协商：** HTTP/0.9没有头部信息，无法携带元数据，如Content-Type、Content-Length等，这使得它无法识别并正确解析响应内容。
- **没有状态码或错误代码：** 也是由于HTTP/0.9没有头部信息，无法携带元数据，因此响应成功与失败都是返回HTML文档，这使得浏览器不能知晓请求执行成功或失败，并相应调整行为。
- **不支持持久连接：** 在HTTP/0.9中，每次请求都会建立一个新的TCP连接，请求完成后立即关闭连接。这导致在处理大量请求时，频繁地建立和关闭连接会带来较大的开销，影响性能。
- **安全性问题：** HTTP/0.9没有提供任何加密和安全机制，所有的数据都是明文传输。这使得数据容易受到窃听和篡改，缺乏对隐私和数据完整性的保护。
- **只能传输英文文本数据：** HTTP/0.9默认采用的字符集是ASCII字符集，这意味着HTTP只能传输英文文本数据，无法支持其他语言的文本数据，比如包含非英文字符的文本（如中文、日文、俄文等）。

正如你们所看到的，HTTP/0.9仅适用于简单的、仅需要获取HTML文档的场景，对于日渐复杂的Web应用程序来说，HTTP/0.9的缺陷正被逐步放大，改进HTTP/0.9也迫在眉睫。很快，HTTP 的下一个版本（即 HTTP/1.0）被推出，它解决了HTTP/0.9的缺陷，并提供更多强大的功能和性能优化。







::: details  🎈本节参考

- https://webfoundation.org/about/vision/history-of-the-web/

- https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP
- 《图解HTTP》
- https://hpbn.co/brief-history-of-http/

 :::

转载需要经过本人同意！