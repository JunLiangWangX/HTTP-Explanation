# MIME类型

**MIME类型，也被称为媒体类型，用于表示HTTP传输的内容的类型，以便客户端或服务端正确处理解析传输的数据**。MIME类型通常在HTTP标头中的 `Content-Type`字段中进行指定，例如下面的示例，如果要传输HTML文档，`Content-Type`头可能会设置为"text/html"。

![mime-type-example](../../public/mime-type-example.png)

## MIME类型的结构

MIME 类型通常包含三个部分内容：类型（type）、子类型（subtype）、以及一个可选的参数（parameter=value），类型与子类型中间由斜杠 `/` 分割，而可选参数则使用 `；`分割，中间没有空白字符。

```http
type/subtype;parameter=value
```

- **类型（type）**：代表数据类型所属的大致分类，例如：视频数据的类型为 `video` ，文本数据的类型为 `text`。
- **子类型（subtype）**：代表更确切的数据类型，以 `text` 类型为例，它的子类型包括：`plain`（纯文本）、`html`（HTML源代码）、`calender`（iCalendar/.ics文件）。
- **可选的参数（parameter=value）**：提供额外的信息，例如 `text`  类型，可以添加可选的 `charset` 参数（charset=utf-8），以指定数据中的字符所使用的字符集。

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

| 类型(type)  | 描述                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| audio       | 音频或音乐数据。常见MIME类型如 `audio/mpeg`、`audio/vorbis`。                                                                                                                                                                                                                                       |
| font        | 字体/字型数据。常见MIME类型如 `font/woff`、`font/ttf` 和 `font/otf`。                                                                                                                                                                                                                             |
| image       | 图像或图形数据，包括位图和矢量静态图像，以及静态图像格式的动画版本，如[GIF](https://developer.mozilla.org/zh-CN/docs/Glossary/GIF) 动画或 APNG。常见MIME类型如 `image/jpeg`、`image/png` 和 `image/svg+xml`。                                                                                        |
| text        | 纯文本数据，包括任何人类可读内容、源代码或文本数据——如逗号分隔值（comma-separated value，即 CSV）格式的数据。示例包含：`text/plain`、`text/csv` 和 `text/html`。                                                                                                                                |
| video       | 视频数据或文件，例如 MP4 电影（`video/mp4`）。                                                                                                                                                                                                                                                        |
| example     | 在演示如何使用 MIME 类型的示例中用作占位符的保留类型。这一类型永远不应在示例代码或文档外使用。`example` 也可以作为子类型。例如，在一个处理音频有关的示例中，MIME 类型 `audio/example` 表示该类型是一个占位符，且在实际使用这段代码时，此处应当被替换成适当的类型。                                  |
| application | 不明确属于其他类型之一的任何二进制数据；要么是将以某种方式执行或解释的数据，要么是需要借助某个或某类特定应用程序来使用的二进制数据。通用二进制数据（或真实类型未知的二进制数据）是 `application/octet-stream`。其他常用的示例包含 `application/pdf`、`application/pkcs8` 和 `application/zip`。 |

::: danger 对于那些没有明确子类型的文本文档，应使用 `text/plain`。类似的，没有明确子类型或子类型未知的二进制文件，应使用 `application/octet-stream`。

:::

### 多部分类型

**而多部分类型，可以代表由多个部件组合成的文档，其中每个部分都可能有各自的单一类型的 MIME 类型；此外，也可以代表多个文件被封装在单次事务中一同发送。**

> 多部分类型示例

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

| 类型(type) | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| multipart  | 由多个组件组成的数据，这些组件可能各自具有不同的 MIME 类型。例如，`multipart/form-data`（用于使用 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) API 生成的数据）和 `multipart/byteranges`（定义于 [RFC 7233, section 5.4.1](https://datatracker.ietf.org/doc/html/rfc7233#section-5.4.1)，当获取到的数据仅为部分内容时——如使用 [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Range) 标头传输的内容——与返回的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 响应 [`206`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/206) “Partial Content”组合使用）。 |
| message    | 该类型通常用于表示电子邮件的消息体。例如，这可以用来表示将转发信息作为其数据一部分的电子邮件，或将超大信息分块发送，就像发送多条信息一样。例如，`message/rfc822`（用于转发或回复信息的引用）和 `message/partial`（允许将大段信息自动拆分成小段，由收件人重新组装）是两个常见的例子。                                                                                                                                                                                                                                                                                                                                              |

## 常见的MIME类型

### 文本类型（text）

MIME 类型为 `text` 的文件包含文本数据。子类型指定数据所代表的具体文本文件格式。

| 子类型(subtext) | 完整示例        | 描述                                                                                                                                                                                                                                                                                                                               |
| --------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plain           | text/plain      | 这是文本文件的默认值。即使它其实意味着*未知的文本文件*，但浏览器认为是可以直接展示的。                                                                                                                                                                                                                                           |
| css             | text/css        | 在网页中要被解析为 CSS 的 CSS 文件**必须**指定 MIME 为 `text/css`。通常，如果服务器不识别 CSS 文件的 `.css` 后缀，则可能将它们以 MIME 为 `text/plain` 或 `application/octet-stream` 来发送给浏览器：在这种情况下，大多数浏览器不将其识别为 CSS 文件而直接忽略。                                                      |
| html            | text/html       | 与css同理，所有的 HTML 内容都应该使用这种类型。                                                                                                                                                                                                                                                                                    |
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
| jpeg            | image/jpeg    | 表明图片格式为JPEG(Joint Photographic Experts Group,联合图像专家组)，JPEG采用有损压缩（压缩比率：10%-20%左右），不支持透明度，不支持动画，适用于允许图像质量损失但大小尽可能小的情况。 |
| png             | image/png     | 表明图片格式为PNG(Portable Network Graphics,便携式网络图形)，PNG采用无损压缩（压缩比率：30%-60%左右），支持透明度，不支持动画，适用于需要保持图像质量且不希望有损失的情况。 |
| gif             | image/gif     | 表明图片格式为GIF(Graphics Interchange Format,图形互换格式)，GIF是一种位图图像格式，支持透明度，支持动画，GIF采用有损压缩，对颜色深度和图像质量的支持相对较低，因此在一些需要更高图像质量的情况下，其他格式如PNG或JPEG可能更为适用。 |
| avif            | image/avif    | 表明图片格式为AVIF(AV1 Image File Format,AV1图像文件格式)，AVIF可采用无损/有损压缩（压缩比率：20%-50%左右），支持透明度，支持动画，该格式具有更好的压缩效率，在保持图像质量的同时可以实现更小的文件大小。 |
| webp            | image/webp    | 表明图片格式为webp(Web Picture,网页图片)，webp可采用无损或有损压缩（压缩比率：20%-50%左右），支持透明度，支持动画，由于其出色的压缩性能和良好的图像质量，WebP在网页设计和移动应用程序中得到了广泛的应用。 |
| svg+xml         | image/svg+xml | 表明图片格式为SVG(Scalable Vector Graphics,可缩放矢量图形)，SVG是一种基于XML（可扩展标记语言）的图像标准，用于描述二维矢量图形。与位图图像（如JPEG、PNG）不同，SVG图像是基于数学方程和几何形状的矢量图形，因此可以无损地缩放到不同的大小而不失真，因此它常用于Web开发中，特别适用于需要在不同分辨率和设备上保持图像质量的情况。 |

### 字体类型（font）

MIME 类型为 `font` 的文件包含字体数据。子类型指定数据所代表的具体字体文件格式。

| 子类型(subtext) | 完整示例      | 描述                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ttf             | font/ttf      | 表明字体格式为TTF(TrueType 字体)，TrueType 是一种矢量字体技术，能够以可伸缩的方式呈现字符，这使得文本在不同大小和分辨率下都能保持清晰。TrueType 字体广泛应用于计算机操作系统和各种应用程序中，用于显示文本内容。                                                                                                         |
| opentype        | font/opentype | 表明字体格式为OTF（OpenType，开放字体），OpenType 字体是 TrueType 字体的一个扩展，它结合了 TrueType 和 Adobe 的字体技术，并引入了更广泛的字符集、更多样化的字形、对颜色和多彩图案的支持等特性，使其成为一种功能强大且灵活的字体格式被广泛应用在数字设计、印刷和网络排版领域。                                            |
| woff            | font/woff     | 表明字体格式为WOFF（Web Open Font Format，Web开放字体格式），WOFF 格式设计的目标是在保持字体质量的同时减小文件大小，以提高Web性能。因此这种格式的字体文件通常具有较小的文件大小，能够提供更快的页面加载速度。它支持压缩和元数据的添加，使得字体在网络上的传输更加高效。                                                  |
| woff2           | font/woff2    | 表明字体格式为WOFF2（Web Open Font Format 2.0，Web开放字体格式2.0），WOFF2 是 WOFF 格式的升级版本，WOFF2 与 WOFF 相比具有更高的压缩效率，能够显著减小字体文件的大小，这种格式在保持字体质量的同时，通过先进的压缩算法实现了更高的性能。由于其出色的压缩能力和广泛的浏览器支持，WOFF2 已经成为在Web开发中推荐的字体格式。 |
| eot             | font/eot      | 表明字体格式为EOT（Embedded OpenType，嵌入式开放字体），EOT 文件通常包含了字体的元数据和压缩的字体数据，以便在Web页面上有效地嵌入和传输。由于其他浏览器通常支持更通用的字体格式（如TTF、OTF、WOFF等），EOT 在现代Web开发中的使用相对较少，因为它主要是为了满足Internet Explorer的需求。                                  |

### 音频类型（audio）

MIME 类型为 `audio` 的文件包含音频数据。子类型指定数据所代表的具体音频文件格式。

| 子类型(subtext) | 完整示例   | 描述                                                         |
| --------------- | ---------- | ------------------------------------------------------------ |
| wav             | audio/wav  | 表明音频格式为WAV（Waveform Audio File Format，波形音频文件格式），WAV 编码没有经过任何形式的数据压缩，它包含了原始音频采样的数字表示。由于这种特性，WAV 文件一般具有较高的音频质量，但相对来说文件大小也较大。此外audio/wave、audio/x-wav、audio/x-pn-wav都是表示该种音频格式。 |
| flac            | audio/flac | 表明音频格式为FLAC（Free Lossless Audio Codec，免费无损音频编解码器），FLAC使用无损压缩技术（压缩比率: 50%-70% 左右），可以将音频文件压缩至原始大小的一半到三分之一，而不会损失音频质量。这意味着FLAC压缩的音频文件大小相对较小，但仍然保留了原始音频的无损质量。FLAC通常用于音乐存储和传输，以便在需要节省存储空间的同时保持高音质。 |
| ogg             | audio/ogg  | 表明音频格式为OGG（Ogg Vorbis），Ogg编码采用无损压缩技术（压缩比率：45%-85%），它能够提供高质量的音频文件同时保持较小的文件大小。 |
| aac             | audio/aac  | 表明音频格式为ACC（Advanced Audio Coding，高级音频编码），AAC编码采用有损压缩（压缩比率: 10%-15% 左右），他能够在相对较低的比特率下保持较高的音频质量，它常被用于数字音频广播、音乐存储以及在线音频流媒体等应用领域，AAC 还是 MPEG-4 标准的一部分。 |
| mpeg            | audio/mpeg | 表明音频格式为MPEG（Moving Picture Experts Group，视频图像专家组），即MP3，MPEG 提供了一系列标准，每个标准都专注于不同的应用领域。以下是一些主要的 MPEG 标准：<br />1.**MPEG-1**: 制定于1993年，该标准对低比特率下的视频和音频进行了压缩，例如 VCD（Video CD）的标准就采用了 MPEG-1。<br />2.**MPEG-2**: 制定于1995年，用于更高质量的视频传输，例如 DVD 和数字电视广播等。。<br />3.**MPEG-4**: 制定于1999年，是一个更为复杂和灵活的标准，支持更多的交互性、低比特率传输、以及适应性流媒体等特性。MPEG-4 主要用于互联网流媒体、移动视频通信和广播等领域。<br />4.**MPEG-7**: 制定于2001年，是一种描述多媒体内容的标准，关注如何描述、搜索和检索多媒体内容，而不是压缩标准。<br />5.**MPEG-21**:制定于2001年，是一个面向多媒体框架的标准，旨在提供一个完整的多媒体体验环境，包括数字版权管理、内容交互和数字媒体服务等。 |
| wma             | audio/wma  | 表明音频格式为WMA（Windows Media Audio，Windows 媒体音频），WMA 是由 Microsoft 开发的音频编码格式，旨在提供高质量的音频压缩，同时保持相对较小的文件大小。WMA 文件通常用于存储音乐和其他音频内容，特别是与 Windows Media Player 等 Microsoft 的多媒体软件相兼容。 |
| webm            | audio/webm | 表明音频格式为WEBM（WebM Project），它是一个由 Google 主导的开放媒体格式，WebM 的文件格式基于 Matroska 容器，视频使用 VP8 或 VP9 编码，音频使用 Vorbis 或 Opus 编码，它在许多 Web 浏览器和其他多媒体应用程序中得到了集成，常用于在线视频平台和其他网络媒体应用。 |

### 视频类型（video）

### 二进制数据类型（application）

### 多部分数据类型（multipart）

## 正确设置MIME类型的重要性

## MIME嗅探

## 其他传送文件类型的方法
