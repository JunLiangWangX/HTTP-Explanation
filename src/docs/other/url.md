---
title: URL
head:
  - - meta
    - name: description
      content: HTTP 请求的内容被称为"资源"，每个资源的名称和位置由一个 URL（统一资源定位符，它是 URI 的一种）来标识，URL你可以看作资源的地址，通过URL我们就可以在互联网中找到具体的资源。
  - - meta
    - name: keywords
      content: HTTP URL URN URI 资源 统一资源定位符 dataURL data协议 file协议 view-source协议 mailto协议 tel协议 URL Scheme
---
# URL

HTTP 请求的内容被称为"资源"，''资源''这一概念非常宽泛，它可以是一份文档，一张图片，或所有其他你能够想到的格式。每个资源的名称和位置由一个 URL（统一资源定位符，它是 URI 的一种）来标识，URL你可以看作资源的地址，通过URL我们就可以在互联网中找到具体的资源。

![url-find-resource-example](../../public/url-find-resource-example.png)



## URI、URL、URN的关系

URL（Uniform Resource Locator，统一资源定位符）和URN（Uniform Resource Name，统一资源名称）是URI（Uniform Resource Identifier，统一资源标识符）的子集。它们都是用于在互联网中标识资源，不过其侧重点不同。

![uri-url-urn-relation](../../public/uri-url-urn-relation.png)

- **URI（Uniform Resource Identifier，统一资源标识符）**：它是一个广义的概念，用于唯一标识一个互联网中的资源。URI可以是一个URL或URN，或者是两者的组合。
- **URL（Uniform Resource Locator，统一资源定位符）**：特定类型的URI，重点在于提供找到某个资源的具体位置。它通常包含协议（如HTTP、FTP），服务器地址，以及资源在服务器上的具体路径。例如，`http://www.example.com/path/to/file` 就是一个URL。
- **URN（Uniform Resource Name，统一资源名称）**：另一种类型的URI，重点在于提供一个资源的唯一名称，而不管它实际上存储在何处。URN是持久的、位置独立的资源标识符。例如，一个书籍的ISBN编号就可以视为一种URN。



## URL的组成

URL由协议、主机、端口号(可选)、资源路径、查询(可选)、片段(可选)组成。

```
协议://主机:端口号/资源路径?查询#片段
```

![url-struct](../../public/url-struct.png)

- **协议**：告诉浏览器使用何种协议，对于大部分 Web 资源，通常使用 HTTP 协议或HTTPS 协议，此外，浏览器也知道如何处理其他协议。例如， `mailto` 协议指示浏览器打开邮件客户端；`ftp`协议指示浏览器处理文件传输。

  ::: tip 浏览器支持的常见的协议

  | 协议        | 描述                                                         |
  | ----------- | ------------------------------------------------------------ |
  | data        | 允许内容创建者使用data URI向文档直接嵌入小文件（如小图像、简单文本），而无需通过外部文件引用。 |
  | file        | 用于访问本地计算机上的文件，它允许浏览器从用户的文件系统中直接读取文件。 |
  | http/https  | 超文本传输协议，用于在Web上传输信息。                        |
  | mailto      | 用于创建发送电子邮件的链接，点击这样的链接会打开用户的默认邮件客户端，并创建一封新邮件，收件人地址已预填写。 |
  | tel         | 用于拨打电话号码，点击这样的链接可以在支持此功能的设备上启动电话拨号程序。 |
  | view-source | 用于查看网页的源代码，在大多数浏览器中，前置 `view-source:` 到任何URL，可以直接查看该网页的HTML、CSS和JavaScript代码。 |
  | URL Scheme  | URL Scheme 是一种用于在应用程序之间进行通信的协议。它允许您通过 URL 来启动其他应用程序，并传递一些参数或命令。 |
  | ws/wss      | 用于在客户端和服务器之间建立一个全双工、持久的连接通道。     |

  :::

- **主机**：主机可以域名(wangjunliang.com)也可以是IP地址(192.168.1.1)，它表示了需要向网络上的哪一台主机发起请求。

- **端口号**：端口号用于表示具体访问主机的哪个服务，通常如果访问使用 HTTP 协议的标准端口（HTTP 为 80，HTTPS 为 443）的主机则会省略此部分，否则端口就是 URI 必须的部分。

- **资源路径**：资源路径表示请求资源在 Web 服务器上的路径。在 Web 的早期，资源路径表示了资源在 Web 服务器上的物理文件位置。现在，它主要是由没有任何物理实体的 Web 服务器抽象处理而成的。

- **查询**：查询是提供给 Web 服务器的额外参数，这些参数是用 & 符号分隔的键/值对列表。Web 服务器可以在将资源返回给用户之前使用这些参数来执行额外的操作。

- **片段**：片段是资源本身的某一部分的一个锚点。锚点代表资源内的一种“书签”，它给予浏览器显示位于该“加书签”点的内容的指示。例如，在 HTML 文档上，浏览器将滚动到定义锚点的那个点上。值得注意的是 # 号后面的部分，也称为片段标识符，永远不会与请求一起发送到服务器。



## 浏览器支持的常见的协议



### data协议

在网页中，我们经常见到使用`data:image/png;base64,iVBORw0KGgoAAAANS......`这样的方式显示图片，这就是Data URL。**Data URL即前缀为 `data:` 协议的 URL，其允许内容创建者向文档中嵌入小文件**。

Data URL 由四个部分组成：前缀（`data:`）、数据的MIME类型（可选，`mediatype`）、非文本则为 `base64` 标记（可选，`;base64`）、数据本身（`<data>`）

```
data:[mediatype][;base64],<data>
```

- **data:**  ：表示该URL为使用data协议构成的Data URL。
- **mediatype**：表示数据的[MIME类型](./mime-type.html)，例如 `'image/jpeg'` 表示 JPEG 图像文件。如果被省略，则默认值为 `text/plain;charset=US-ASCII`。

- **;base64**：指定数据为base64编码，如果数据是文本类型，你可以直接将文本嵌入（根据文档类型，使用合适的实体字符或转义字符）。否则，你可以指定 `;base64` 来嵌入 base64 编码的二进制数据。

- **\<data>**：资源的数据

  ::: danger 注意

  如果数据包含 [RFC 3986 中定义为保留字符](https://datatracker.ietf.org/doc/html/rfc3986#section-2.2)的字符或包含空格符、换行符或者其他非打印字符，这些字符必须进行URL 编码。

  :::

下面为Data URL的一些示例：

```
data:,Hello%2C%20World!
简单的 text/plain 类型数据。注意逗号如何百分号编码为 %2C，空格字符如何编码为 %20。

data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D
上一条示例的 base64 编码版本

data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E
一个 HTML 文档源代码 <h1>Hello, World</h1>

data:text/html,%3Cscript%3Ealert%28%27hi%27%29%3B%3C%2Fscript%3E
带有<script>alert('hi');</script> 的 HTML 文档，用于执行 JavaScript 警告。注意，需要闭合的 script 标签。
```

data协议虽然能够减少请求次数，但它也同时存在诸多问题：

- **语法容易出错**：`data` URL 的格式很简单，但很容易会忘记把逗号加在“data”协议名后面，在对数据进行 base64 编码时也很容易发生错误。
- **大小限制**：浏览器规定了URL的最大数据长度。比如，Opera 11 浏览器限制 URL 最长为 65535 个字符，这意味着 `data` URL 最长为 65529 个字符（如果你使用纯文本 `data:`，而不是指定一个 MIME 类型的话，那么 65529 字符长度是编码后的长度，而不是源文件）。Firefox 97 及更高版本支持高达 32MB 的数据 URL（在 97 之前，限制接近 256MB）。Chromium 支持到超过 512MB 的 URL，Webkit（Safari）支持到超过 2048MB 的 URL。
- **没用错误提示**：媒体中的无效参数或指定 `'base64'` 时的错别字被忽略，但不会提供相关错误提示。
- **无法添加查询参数**：一个 data URL 的数据字段是没有结束标记的，所以尝试在一个 data URL 后面添加查询字符串（特定于页面的参数，语法为 `<url>?parameter-data`）会导致查询字符串也一并被当作数据字段。
- **安全问题**：许多安全问题（例如，钓鱼网站）与 data URL 相关联，为了缓和这样的问题，在所有现代浏览器中，直接导航到以 `data:` 开头的 URL 是被禁止的，更多细节，请参见 [Mozilla 安全团队的这篇博客](https://blog.mozilla.org/security/2017/11/27/blocking-top-level-navigations-data-urls-firefox-59/)。



### file协议

在我们使用浏览器打开本地文件时，通常会看到这样的路径`file:///E:/Download/path.png`，这就是使用了file协议的URL。

![image-20240202220943849](../../public/image-20240202220943849.png)

`file` 协议是一种用于在浏览器中引用本地文件的协议。它的基本形式是 `file://`，后面跟着本地文件的路径。这样的URL可以用于在浏览器中打开本地文件，但要注意的是，出于安全原因，大多数浏览器禁止通过 `file` 协议加载跨域资源。

::: danger 请勿在Web开发中使用file` 协议

因为`file`协议存在安全性方面的问题，例如无法在某些情况下加载跨域资源。在开发和测试阶段，您最好使用本地服务器（如Node.js的`http-server`）来模拟HTTP服务器，以避免 `file` 协议的一些限制。

:::



### view-source协议

在浏览器点击右键查看网页源代码时，通常会跳转到一个新的页面显示网页的源代码，而该页面的路径通常为`view-source:https://.....`，这就是使用了view-source协议的URL。

![image-20240202221558054](../../public/image-20240202221558054.png)

`view-source` 协议是一种在浏览器中查看当前页面源代码的方法。通过在浏览器地址栏中输入 `view-source:` 后跟页面的URL，您可以直接查看该页面的HTML源代码([示例](view-source:https://wangjunliang.com/#/home))。

请注意，这只是一种在浏览器中查看源代码的简便方法，实际上您也可以右键点击页面，然后选择“查看页面源代码”或使用开发者工具来检查页面源代码。

使用 `view-source` 协议的主要用途是方便开发者查看网页的HTML源代码，以便调试和分析页面结构。在正常的用户浏览中，一般不需要手动输入 `view-source` 协议来查看页面源代码。

### mailto协议

`mailto` 协议是一种用于在浏览器中启动电子邮件客户端的 URI 方案。通过使用 `mailto`，您可以创建一个链接，使用户可以点击该链接以便打开他们的默认电子邮件客户端并开始新的邮件。

> 下面是一个基本的 `mailto URL`的示例代码（你也可[点击此处](mailto:test@example.com)发送邮件）：

```
<a href="mailto:test@example.com">发送邮件</a>
```

在上述例子中，用户点击 "发送邮件" 链接时，系统将尝试打开默认的电子邮件客户端，并创建一个新的邮件给test@example.com。

除此之外您还可以包含其他参数，例如主题（`subject`）和正文（`body`）。例如([点击此处感受示例](mailto:recipient@example.com?subject=Subject%20Here&body=Hello%20world!))：

```
<a href="mailto:recipient@example.com?subject=Subject%20Here&body=Hello%20world!">Send Email</a>
```

在上述例子中，点击链接将打开邮件客户端，预填写了收件人地址、主题和正文。

::: danger 注意

使用 `mailto` 协议的效果可能因用户设备、浏览器设置以及电子邮件客户端的不同而有所不同。在某些情况下，用户的设备可能没有默认的邮件客户端，或者浏览器可能阻止处理 `mailto` 链接。

:::

### tel协议

`tel` 协议是一种用于在浏览器中启动电话呼叫的 URI 方案。通过使用 `tel`，您可以创建一个链接，使用户可以点击该链接以便拨打指定的电话号码。

> 下面是一个基本的 `tel` 链接的例子(你也可[点击此处](tel:1859283912)拨打电话)：

```
<a href="tel:1859283912">联系我们</a>
```

在上述例子中，用户点击 "联系我们" 链接时，系统将尝试启动电话呼叫到号码 1859283912。

除此之外您还可以包含其他参数，例如在国际呼叫时使用的国家代码。例如(你也可[点击此处](tel:+861852738193)拨打电话)：

```
<a href="tel:+861852738193">联系我们</a>
```

在这个例子中，用户点击链接将尝试拨打号码 +861852738193。

::: danger 注意

使用 `tel` 协议的效果可能因用户设备和浏览器设置的不同而有所不同。在某些情况下，用户的设备可能没有电话功能，或者浏览器可能阻止处理 `tel` 链接。

:::

### URL Scheme协议

URL Scheme 是一种用于在应用程序之间进行通信的协议。它允许您通过 URL 来启动其他应用程序，并传递一些参数或命令。应用程序可以注册自己的 URL Scheme，以便其他应用或系统可以使用该 Scheme 来与之通信。

URL Scheme 的一般格式如下：

```
scheme://[host]/[path]?[query]
```

其中：

- `scheme` 表示协议，例如 `http`、`https`、`mailto` 或应用程序的自定义 Scheme。
- `host` 表示主机，通常用于网络 URL，对于应用程序 URL Scheme，可以省略。
- `path` 表示路径，用于指定应用程序中的具体操作或位置。
- `query` 表示查询参数，用于传递额外的信息。

例如，[打开firefox浏览器并进入我的博客](firefox://https://wangjunliang.com)的 URL Scheme 的示例：

```
firefox://https://wangjunliang.com
```

在这个例子中，`firefox` 是火狐自定义的应用程序 Scheme，`https://wangjunliang.com` 是路径。

在移动应用开发中，开发者可以在应用的配置中注册自定义的 URL Scheme，然后其他应用或网页可以使用这个 Scheme 来启动应用并执行相应的操作。

在使用 URL Scheme 时，需要注意以下几点：

- **注册 Scheme：** 应用程序需要在其配置文件中注册自己的 URL Scheme。
- **处理 URL：** 应用程序需要能够解析并处理从 URL 中提取的信息。
- **安全性：** URL Scheme 可能被滥用，因此对于敏感操作，应该采取适当的安全措施。



转载需要经过本人同意，并标明出处！