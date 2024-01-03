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



### 文本类型（text）

MIME 类型为 `text` 的文件包含文本数据。子类型指定数据所代表的具体文本文件格式。

| 子类型(subtext) | 完整示例        | 描述                                                         |
| --------------- | --------------- | ------------------------------------------------------------ |
| plain           | text/plain      | 这是文本文件的默认值。即使它其实意味着*未知的文本文件*，但浏览器认为是可以直接展示的。 |
| css             | text/css        | 在网页中要被解析为 CSS 的 CSS 文件**必须**指定 MIME 为 `text/css`。通常，如果服务器不识别 CSS 文件的 `.css` 后缀，则可能将它们以 MIME 为 `text/plain` 或 `application/octet-stream` 来发送给浏览器：在这种情况下，大多数浏览器不将其识别为 CSS 文件而直接忽略。 |
| html            | text/html       | 与css同理，所有的 HTML 内容都应该使用这种类型。              |
| javascript      | text/javascript | JavaScript 内容应始终使用 MIME 类型 `text/javascript` 提供，使用除 `text/javascript` 以外的任何 MIME 类型都可能导致脚本无法加载或运行。你可能会发现某些 JavaScript 内容在 MIME 类型中错误地使用了 `charset` 参数，以指定脚本内容的字符集。对于 JavaScript 内容来说，`charset` 参数无效，在大多数情况下会导致脚本加载失败。 |

::: danger 遗留的 JavaScript MIME 类型

除了 `text/javascript` MIME 类型外，出于历史原因，[MIME 嗅探标准](https://mimesniff.spec.whatwg.org/)（定义浏览器应该如何解释媒体类型和如何处理无有效媒体类型的内容）允许使用匹配以下任意的 MIME 类型提供 JavaScript 代码：

- `application/javascript` 已弃用
- `application/ecmascript` 已弃用
- `application/x-ecmascript` 非标准
- `application/x-javascript` 非标准
- `text/ecmascript` 已弃用
- `text/javascript1.0` 非标准
- `text/javascript1.1` 非标准
- `text/javascript1.2` 非标准
- `text/javascript1.3` 非标准
- `text/javascript1.4` 非标准
- `text/javascript1.5` 非标准
- `text/jscript` 非标准
- `text/livescript` 非标准
- `text/x-ecmascript` 非标准
- `text/x-javascript`  非标准

:::



### 图片类型（image）

MIME 类型为 `image` 的文件包含图像数据。子类型指定数据所代表的具体图像文件格式。

| 子类型(subtext) | 完整示例      | 描述                                                         |
| --------------- | ------------- | ------------------------------------------------------------ |
| png             | image/png     | 表明图片格式为PNG(Portable Network Graphics,便携式网络图形)，PNG是一种支持透明背景和更高的色彩深度的无损压缩图片格式，它避免了在图像保存过程的失真情况，因此在一些需要保持图像质量的场景中很受欢迎。 |
| jpeg            | image/jpeg    | 表明图片格式为JPEG(Joint Photographic Experts Group,联合图像专家组)，JPEG通常用于存储和传输数字图像，特别是照片。它采用有损压缩，可以在一定程度上减小图像文件的大小，但会引入一些信息损失。 |
| gif             | image/gif     | 表明图片格式为GIF(Graphics Interchange Format,图形互换格式)，GIF是一种位图图像格式，它支持简单的动画和透明背景，并且可以存储多帧图像，从而创建简单的动画效果。但是，GIF对颜色深度和图像质量的支持相对较低，因此在一些需要更高图像质量的情况下，其他格式如PNG或JPEG可能更为适用。 |
| avif            | image/avif    | 表明图片格式为AVIF(AV1 Image File Format,AV1图像文件格式)，AVIF是一种开放、无损和有损图像压缩格式，基于AV1视频编码标准，该格式具有更好的压缩效率，在保持图像质量的同时可以实现更小的文件大小。 |
| svg+xml         | image/svg+xml | 表明图片格式为SVG(Scalable Vector Graphics,可缩放矢量图形)，SVG是一种基于XML（可扩展标记语言）的图像标准，用于描述二维矢量图形。与位图图像（如JPEG、PNG）不同，SVG图像是基于数学方程和几何形状的矢量图形，因此可以无损地缩放到不同的大小而不失真，因此它常用于Web开发中，特别适用于需要在不同分辨率和设备上保持图像质量的情况。 |
| webp            | image/webp    | 表明图片格式为webp(Web Picture,网页图片)，webp是一种支持透明度、动画和颜色配置的图像格式，由于其出色的压缩性能和良好的图像质量，WebP在网页设计和移动应用程序中得到了广泛的应用。 |



### 字体类型（font）

MIME 类型为 `image` 的文件包含图像数据。子类型指定数据所代表的具体图像文件格式。

| 子类型(subtext) | 完整示例      | 描述                                                         |
| --------------- | ------------- | ------------------------------------------------------------ |
| ttf             | font/ttf      | 表明字体格式为TTF(TrueType 字体)，TrueType 是一种矢量字体技术，能够以可伸缩的方式呈现字符，这使得文本在不同大小和分辨率下都能保持清晰。TrueType 字体广泛应用于计算机操作系统和各种应用程序中，用于显示文本内容。 |
| opentype        | font/opentype | 表明字体格式为OTF（OpenType，开放字体），OpenType 字体是 TrueType 字体的一个扩展，它结合了 TrueType 和 Adobe 的字体技术，并引入了更广泛的字符集、更多样化的字形、对颜色和多彩图案的支持等特性，使其成为一种功能强大且灵活的字体格式被广泛应用在数字设计、印刷和网络排版领域。 |
| woff            | font/woff     | 表明字体格式为WOFF（Web Open Font Format，Web开放字体格式），WOFF 格式设计的目标是在保持字体质量的同时减小文件大小，以提高Web性能。因此这种格式的字体文件通常具有较小的文件大小，能够提供更快的页面加载速度。它支持压缩和元数据的添加，使得字体在网络上的传输更加高效。 |
| woff2           | font/woff2    | 表明字体格式为WOFF2（Web Open Font Format 2.0，Web开放字体格式2.0），WOFF2 是 WOFF 格式的升级版本，WOFF2 与 WOFF 相比具有更高的压缩效率，能够显著减小字体文件的大小，这种格式在保持字体质量的同时，通过先进的压缩算法实现了更高的性能。由于其出色的压缩能力和广泛的浏览器支持，WOFF2 已经成为在Web开发中推荐的字体格式。 |
| eot             | font/eot      | 表明字体格式为EOT（Embedded OpenType，嵌入式开放字体），EOT 文件通常包含了字体的元数据和压缩的字体数据，以便在Web页面上有效地嵌入和传输。由于其他浏览器通常支持更通用的字体格式（如TTF、OTF、WOFF等），EOT 在现代Web开发中的使用相对较少，因为它主要是为了满足Internet Explorer的需求。 |



### 音频类型（audio）

### 视频类型（video）

### 二进制数据类型（application）

### 多部分数据类型（multipart）



## 正确设置MIME类型的重要性



## MIME嗅探



## 其他传送文件类型的方法