# MIME类型

**MIME类型，也被称为媒体类型，用于表示HTTP传输的内容的类型，以便客户端或服务端正确处理解析传输的数据**。MIME类型通常在HTTP标头中的`Content-Type`字段中进行指定，例如下面的示例，如果要传输HTML文档，`Content-Type`头可能会设置为"text/html"。

![mime-type-example](../../public/mime-type-example.png)

## MIME类型的结构

MIME 类型通常包含三个部分内容：类型（type）、子类型（subtype）、以及一个可选的参数（parameter=value），类型与子类型中间由斜杠 `/` 分割，而可选参数则使用`；`分割，中间没有空白字符。

```http
type/subtype;parameter=value
```

- **类型（type）**：代表数据类型所属的大致分类，例如：视频数据的类型为`video` ，文本数据的类型为 `text`。
- **子类型（subtype）**：代表更确切的数据类型，以 `text` 类型为例，它的子类型包括：`plain`（纯文本）、`html`（HTML源代码）、`calender`（iCalendar/.ics文件）。
- **可选的参数（parameter=value）**：提供额外的信息，例如`text`  类型，可以添加可选的 `charset` 参数（charset=utf-8），以指定数据中的字符所使用的字符集。

::: danger MIME 类型对大小写不敏感，但是传统写法都是小写，参数值对大小写敏感。

:::



## 类型(type)的分类

**类型分为了单一类型与多部分类型**。



### 单一类型

**单一类型代表单一文件或媒介，比如一段文字、一个音乐文件、一个视频文件等。**

> 单一类型示例

```http
Content-Type:text/html
```

IANA 目前注册的单一类型如下：

| 类型(type)  | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| audio       | 音频或音乐数据。常见MIME类型如 `audio/mpeg`、`audio/vorbis`。 |
| font        | 字体/字型数据。常见MIME类型如 `font/woff`、`font/ttf` 和 `font/otf`。 |
| image       | 图像或图形数据，包括位图和矢量静态图像，以及静态图像格式的动画版本，如 [GIF](https://developer.mozilla.org/zh-CN/docs/Glossary/GIF) 动画或 APNG。常见MIME类型如`image/jpeg`、`image/png` 和 `image/svg+xml`。 |
| text        | 纯文本数据，包括任何人类可读内容、源代码或文本数据——如逗号分隔值（comma-separated value，即 CSV）格式的数据。示例包含：`text/plain`、`text/csv` 和 `text/html`。 |
| video       | 视频数据或文件，例如 MP4 电影（`video/mp4`）。               |
| example     | 在演示如何使用 MIME 类型的示例中用作占位符的保留类型。这一类型永远不应在示例代码或文档外使用。`example` 也可以作为子类型。例如，在一个处理音频有关的示例中，MIME 类型 `audio/example` 表示该类型是一个占位符，且在实际使用这段代码时，此处应当被替换成适当的类型。 |
| application | 不明确属于其他类型之一的任何二进制数据；要么是将以某种方式执行或解释的数据，要么是需要借助某个或某类特定应用程序来使用的二进制数据。通用二进制数据（或真实类型未知的二进制数据）是 `application/octet-stream`。其他常用的示例包含 `application/pdf`、`application/pkcs8` 和 `application/zip`。 |

::: danger 对于那些没有明确子类型的文本文档，应使用 `text/plain`。类似的，没有明确子类型或子类型未知的二进制文件，应使用 `application/octet-stream`。

:::



### 多部分类型

**而多部分类型，可以代表由多个部件组合成的文档，其中每个部分都可能有各自的单一类型的 MIME 类型；此外，也可以代表多个文件被封装在单次事务中一同发送。**

>多部分类型示例

```http
Content-Type: multipart/form-data; boundary=aBoundaryString  // boundary表示多个部分实体的分割符

--aBoundaryString  // 分隔符
Content-Disposition: form-data; name="myFile"; filename="img.jpg"
Content-Type: image/jpeg  // 每个部分都可能有各自的单一类型的 MIME 类型
(data)

--aBoundaryString // 分隔符
Content-Disposition: form-data; name="myField"; filename="test.mp4"
Content-Type: video/mp4 // 每个部分都可能有各自的单一类型的 MIME 类型
(data)

--aBoundaryString // 分隔符
```

IANA 目前注册的多部分类型如下：

| 类型(type) | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| multipart  | 由多个组件组成的数据，这些组件可能各自具有不同的 MIME 类型。例如，`multipart/form-data`（用于使用 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) API 生成的数据）和 `multipart/byteranges`（定义于 [RFC 7233, section 5.4.1](https://datatracker.ietf.org/doc/html/rfc7233#section-5.4.1)，当获取到的数据仅为部分内容时——如使用 [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Range) 标头传输的内容——与返回的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 响应 [`206`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/206) “Partial Content”组合使用）。 |
| message    | 该类型通常用于表示电子邮件的消息体。例如，这可以用来表示将转发信息作为其数据一部分的电子邮件，或将超大信息分块发送，就像发送多条信息一样。例如，`message/rfc822`（用于转发或回复信息的引用）和 `message/partial`（允许将大段信息自动拆分成小段，由收件人重新组装）是两个常见的例子。 |



## 常见的MIME类型



## 正确设置MIME类型的重要性



## MIME嗅探



## 其他传送文件类型的方法