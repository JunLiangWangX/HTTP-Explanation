---
title: MIME类型
head:
  - - meta
    - name: description
      content: MIME类型，也被称为媒体类型，用于表示HTTP传输的内容的类型，以便客户端或服务端正确处理解析传输的数据，MIME类型通常在HTTP标头中的 Content-Type 字段中进行指定。
  - - meta
    - name: keywords
      content: MIME类型 媒体类型 Content-Type MIME MIME-Type text/plain text/css	text/html	text/javascript	image/jpeg	image/png	image/gif	image/avif	image/webp	image/svg+xml	audio/wav	audio/flac	audio/ogg	audio/aac	audio/mpeg	audio/wma	audio/webm	video/mp4	video/webm	video/ogg	video/x-msvideo	video/quicktime	video/mpeg	application/octet-stream	application/json	application/x-www-form-urlencoded	multipart/form-data multipart/byteranges MIME嗅探 X-Content-Type-Options
---
# MIME类型

**MIME类型，也被称为媒体类型，用于表示HTTP传输的内容的类型，以便客户端或服务端正确处理解析传输的数据**。MIME类型通常在HTTP标头中的 `Content-Type`字段中进行指定，例如下面的示例，如果要传输HTML文档，`Content-Type`头可能会设置为"text/html"。

![mime-type-example](../../public/mime-type-example.png)

此时可能有好奇的小伙伴会问：“文件名后缀就能够表达文件类型了，为什么HTTP还需要MIME类型呢？”，确实文件后缀在特定的操作系统语境中能够清晰的表达文件类型，但在不同的操作系统中文件名后缀所表达的文件类型却有所不同，有些操作系统甚至没有文件名后缀，而**MIME类型是跨平台和跨系统的标准，它能够确保文件在不同的网络环境/平台/操作系统中以预期的方式被处理和识别**。

::: danger 浏览器通常使用 MIME 类型而不是文件扩展名来决定如何处理内容

因此 Web 服务器在 [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 响应标头中添加正确的 MIME 类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也可能被错误处理。

:::

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

**而多部分类型，可以代表由多个部件（比如多段文字、多个音乐文件、多个视频文件等）组合成的文档，其中每个部分都可能有各自的单一类型的 MIME 类型；此外，也可以代表多个文件被封装在单次事务中一同发送。**

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

| 子类型(subtext) | 完整示例      | 描述                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jpeg            | image/jpeg    | 表明图片格式为JPEG(Joint Photographic Experts Group,联合图像专家组)，JPEG采用有损压缩，其压缩比率是可调的，可以从轻微压缩到极端压缩，这取决于所需的图像质量和文件大小，它不支持透明度，不支持动画，适用于允许图像质量损失但大小尽可能小的情况。                                                                                 |
| png             | image/png     | 表明图片格式为PNG(Portable Network Graphics,便携式网络图形)，PNG采用无损压缩（压缩比率：30%-60%左右），支持透明度，不支持动画，尤其适用于需要高质量图像和透明背景的场景。                                                                                                                                                       |
| gif             | image/gif     | 表明图片格式为GIF(Graphics Interchange Format,图形互换格式)，GIF是一种位图图像格式，支持透明度，支持动画，GIF使用的是无损压缩技术，但它限制了颜色深度为256色，这可能会导致颜色信息的损失。因此，尽管压缩本身是无损的，色彩限制可能导致视觉上的质量降低，适用于图像质量要求低的简单动画图像的场景。                              |
| avif            | image/avif    | 表明图片格式为AVIF(AV1 Image File Format,AV1图像文件格式)，AVIF可采用无损/有损压缩（压缩比率：20%-50%左右），支持透明度，支持动画，该格式具有更好的压缩效率，在保持图像质量的同时可以实现更小的文件大小，但由于是较新的格式，它的支持和普及程度可能不如其他更成熟的格式。                                                       |
| webp            | image/webp    | 表明图片格式为webp(Web Picture,网页图片)，webp可采用无损或有损压缩（压缩比率：20%-50%左右），支持透明度，支持动画，由于其出色的压缩性能和良好的图像质量，WebP在网页设计和移动应用程序中得到了广泛的应用。                                                                                                                       |
| svg+xml         | image/svg+xml | 表明图片格式为SVG(Scalable Vector Graphics,可缩放矢量图形)，SVG是一种基于XML（可扩展标记语言）的图像标准，用于描述二维矢量图形。与位图图像（如JPEG、PNG）不同，SVG图像是基于数学方程和几何形状的矢量图形，因此可以无损地缩放到不同的大小而不失真，因此它常用于Web开发中，特别适用于需要在不同分辨率和设备上保持图像质量的情况。 |

### 字体类型（font）

MIME 类型为 `font` 的文件包含字体数据。子类型指定数据所代表的具体字体文件格式。

| 子类型(subtext) | 完整示例      | 描述                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ttf             | font/ttf      | 表明字体格式为TTF（TrueType Font, 真类型字体）。TrueType 是一种矢量字体技术，能够以可伸缩的方式呈现字符，这使得文本在不同大小和分辨率下都能保持清晰。由于其广泛的兼容性和高质量的文本呈现能力，TrueType 字体被广泛应用于各种操作系统和应用程序中。                                                      |
| opentype        | font/opentype | 表明字体格式为OTF（OpenType Font, 开放类型字体）。OpenType 字体是一种在 TrueType 和 PostScript 字体技术基础上发展的格式，它支持更广泛的字符集、更多样化的字形变体、以及先进的排版功能。OpenType 字体因其强大的功能和对国际语言的支持而被广泛应用于数字设计、印刷和网络排版领域。                        |
| woff            | font/woff     | 表明字体格式为WOFF（Web Open Font Format, Web开放字体格式）。WOFF 是专为Web设计的字体格式，它通过有效的压缩机制减小文件大小，加快网页加载速度。此格式支持字体的子集化和元数据的添加，使得字体在网络上的传输和使用更加高效。WOFF 字体因其网络友好性和广泛的浏览器支持而在Web开发中被广泛使用。           |
| woff2           | font/woff2    | 表明字体格式为WOFF2（Web Open Font Format 2.0, Web开放字体格式2.0），WOFF2 是 WOFF 的优化版本，提供了更高的压缩效率。WOFF2 通过先进的压缩算法显著减小了字体文件的大小，同时保持了字体的高质量。它在Web开发中被推荐使用，因为它结合了出色的压缩能力和广泛的浏览器支持。                                  |
| eot             | font/eot      | 表明字体格式为EOT（Embedded OpenType, 嵌入式开放类型字体）。EOT 是专为微软的Internet Explorer浏览器设计的字体格式。它支持字体的嵌入和保护，以便在Web页面中有效使用。尽管EOT 提供了一些专有特性，但由于现代浏览器普遍支持更通用的字体格式（如TTF、OTF、WOFF等），EOT 的使用在现代Web开发中变得较为有限。 |

### 音频类型（audio）

MIME 类型为 `audio` 的文件包含音频数据。子类型指定数据所代表的具体音频文件格式。

| 子类型(subtext) | 完整示例   | 描述                                                                                                                                                                                                                                                       |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wav             | audio/wav  | 表明音频格式为WAV（Waveform Audio File Format，波形音频文件格式）。WAV 通常使用未压缩的线性PCM格式，因此保留了原始音频数据的高质量。这种格式的文件通常较大，适用于专业音频编辑和音乐制作。常见的MIME类型还包括audio/wave、audio/x-wav、audio/x-pn-wav。    |
| flac            | audio/flac | 表明音频格式为FLAC（Free Lossless Audio Codec，免费无损音频编解码器）。FLAC 采用无损压缩技术，可以在不损失音质的前提下减小文件大小（压缩率约为50%-70%），适用于音乐爱好者和音频专业人士，希望在保持高音质的同时节省存储空间。                              |
| ogg             | audio/ogg  | 表明音频格式为OGG（Ogg Vorbis）。Ogg Vorbis是一种有损压缩格式，以优秀的压缩效率和音质著称（压缩率约为45%-85%）。它是一个开源格式，通常用于流媒体应用和游戏音频，提供高质量的音频输出和较小的文件大小。                                                     |
| aac             | audio/aac  | 表明音频格式为AAC（Advanced Audio Coding，高级音频编码）。AAC 是一种有损压缩技术，以更高的音频质量和更低的比特率相比MP3著称（压缩率约为10%-15%）。它被广泛用于数字音频广播、音乐存储和在线流媒体等领域，也是MPEG-4标准的一部分。                           |
| mpeg            | audio/mpeg | 表明音频格式为MPEG（Moving Picture Experts Group，视频图像专家组），即MP3。MP3是一种有损音频压缩格式，广泛用于音乐存储和传输，因其出色的压缩效率和广泛的兼容性而深受欢迎。MPEG-1 Layer 3 (MP3)专门针对音频压缩，优化了在保持可接受音质的同时减小文件大小。 |
| wma             | audio/wma  | 表明音频格式为WMA（Windows Media Audio，Windows媒体音频）。WMA是由Microsoft开发的一种有损压缩格式，旨在优化音频质量和文件大小的平衡。它通常用于Windows平台上的音乐存储和流媒体服务，与Windows Media Player等微软产品兼容。                                 |
| webm            | audio/webm | 表明音频格式为WebM（WebM Audio）。WebM是一种有损压缩技术，它能够在较低的比特率下提供高质量的音频体验，实现高视频质量和小文件大小之间的最佳平衡，由于其高效的压缩能力和对网络流媒体友好的特性，WebM格式在在线视频平台和其他网络媒体应用中得到了广泛的应用。 |

### 视频类型（video）

MIME 类型为 `video` 的文件包含视频数据，子类型指定数据所代表的具体视频文件格式。

| 子类型(subtext) | 完整示例        | 描述                                                                                                                                                                                          |
| --------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mp4             | video/mp4       | 表明视频格式为MP4（MPEG-4 Part 14），使用有损压缩技术，压缩比率因编码器和设置而异，但通常能提供高压缩效率。支持视频、音频流、字幕等，广泛应用于网络传输和播放设备，适合平衡高质量和文件大小。 |
| webm            | video/webm      | 表明视频格式为WebM，采用VP8或VP9视频编码和Vorbis或Opus音频编码。WebM的压缩比率较高，尤其是采用VP9时，更适合于在线视频，为网络流媒体和视频服务优化，以减少文件大小并保持高质量视频输出。       |
| ogg             | video/ogg       | 表明视频格式为Ogg。使用Theora视频编码，是一种开源的有损视频压缩技术。Ogg格式的压缩比率良好，适用于确保开放标准和避免专利费用的应用场景。                                                      |
| avi             | video/x-msvideo | 表明视频格式为AVI（Audio Video Interleave）。AVI格式支持多种编码方法，包括无损和有损压缩，压缩比率取决于使用的具体编码器。虽然AVI文件可以较大，但它提供了良好的兼容性和简单的视频编辑功能。   |
| quicktime       | video/quicktime | 表明视频格式为QuickTime，由苹果公司开发。支持多种类型的数字视频和音频数据压缩，压缩比率取决于所选编解码器。QuickTime格式适用于高质量视频的制作和编辑。                                        |
| mpeg            | video/mpeg      | 表明视频格式为MPEG（Moving Picture Experts Group）。MPEG定义了包括MPEG-1和MPEG-2的视频压缩标准，提供了高压缩比率，优化了高质量视频的存储和传输，广泛应用于电视广播和DVD。                     |

### 二进制数据类型（application）

MIME 类型为 `application` 表明不明确属于其他类型之一的任何二进制数据，子类型表明是哪一种二进制数据。

| 子类型(subtext)       | 完整示例                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| octet-stream          | application/octet-stream          | 这是一种默认的MIME类型，用于表示这是未知类型的二进制数据，通常用于下载或上传未知类型的文件。                                                                                                                                                                                                                                                                                                                                           |
| json                  | application/json                  | 表明二进制数据为JSON（JavaScript Object Notation，JavaScript 对象表示法），JSON用于表示结构化数据。它广泛用于网络应用程序中，作为数据交换的标准格式。                                                                                                                                                                                                                                                                                  |
| x-www-form-urlencoded | application/x-www-form-urlencoded | 这是HTML表单提交时使用的默认编码类型，该类型会将表单数据编码成一个查询字符串格式的消息体，具体编码方式如下：<br />**1.空格转换为加号（+）**：表单数据中的空格字符会被替换为加号。<br />**2.特殊字符转换为百分比编码**：非字母数字字符会被转换成 `%` 后跟两位十六进制数，<br />**3.键值对**：表单中的每个字段（键）和其对应值使用等号（`=`）连接。<br />**4.字段分隔**：多个键值对之间使用 `&` 符号分隔。 |
| xml                   | application/xml                   | 表明二进制数据为XML文件                                                                                                                                                                                                                                                                                                                                                                                                                |
| xhtml+xml             | application/xhtml+xml             | 表明二进制数据为XHTML文件                                                                                                                                                                                                                                                                                                                                                                                                              |
| javascript            | application/javascript            | 表明二进制数据为javascript文件                                                                                                                                                                                                                                                                                                                                                                                                         |
| pdf                   | application/pdf                   | 表明二进制数据为PDF文件                                                                                                                                                                                                                                                                                                                                                                                                                |
| zip                   | application/zip                   | 表明二进制数据为ZIP压缩文件                                                                                                                                                                                                                                                                                                                                                                                                            |
| msword                | application/msword                | 用于Microsoft Word文档的文件格式。虽然现在常见的是 `.docx`格式（`application/vnd.openxmlformats-officedocument.wordprocessingml.document`），但 `.doc`仍然广泛使用                                                                                                                                                                                                                                                               |
| vnd.ms-excel          | application/vnd.ms-excel          | 用于Microsoft Excel表格的文件格式。虽然现在常见的是 `.xlsx`格式（`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`），但 `.xls`仍然广泛使用                                                                                                                                                                                                                                                                    |
| vnd.ms-powerpoint     | application/vnd.ms-powerpoint     | 用于Microsoft PowerPoint演示文稿的文件格式。虽然现在常见的是 `.pptx`格式（`application/vnd.openxmlformats-officedocument.presentationml.presentation`），但 `.ptt`仍然广泛使用                                                                                                                                                                                                                                                   |
| event-stream          | application/event-stream          | event-stream是一个特定的 MIME 类型，用于服务器发送事件（SSE，Server-Sent Events）。                                                                                                                                                                                                                                                                                                                                                    |

### 多部分数据类型（multipart）

| 子类型(subtext) | 完整示例                                  | 描述                                                                                                                    |
| --------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| form-data       | multipart/form-data; boundary=指定分割符  | `multipart/form-data` 可用于 [HTML 表单](https://developer.mozilla.org/zh-CN/docs/Learn/Forms)从浏览器发送信息给服务器。 |
| byteranges      | multipart/byteranges; boundary=指定分割符 | `multipart/byteranges` 用于把部分的响应报文发送回客户端。                                                             |

## 正确设置MIME类型的重要性

很多 web 服务器使用默认的 `application/octet-stream` 来发送未知类型。出于一些安全原因，对于这些资源浏览器不允许设置一些自定义默认操作，强制用户必须存储到本地以使用。

常见的导致服务器配置错误的文件类型如下所示：

- **RAR 压缩文件**：在这种情况，理想状态是，设置真实的编码文件类型；但这通常不可能，因为 .RAR 文件可能包含多种不同类型的资源。这种情况，将所发送文件的 MIME 类型配置为 `application/x-rar-compressed`。
- **音频或视频文件**：只有正确设置了 MIME 类型的文件才能被 \<video> 或 \<audio> 元素识别和播放。
- **专有文件类型**：避免使用 `application/octet-stream`，对于这种一般的 MIME 类型浏览器不允许定义默认行为（比如“在 Word 中打开”）。像 `application/vnd.mspowerpoint` 这样的类型可以让用户选择自动在幻灯片软件中打开这样的文件。

## MIME嗅探

**在缺失 MIME 类型或客户端认为文件设置了错误的 MIME 类型时，浏览器可能会通过查看资源来确认资源的类型，这种行为被称为MIME嗅探。**

每个浏览器会使用不同的方式来确认资源的类型：

- **Chrome**: 它会检查文件的内容，尤其是当服务器发送的MIME类型是未知或通用类型（如 `application/octet-stream`）时。如果嗅探结果与服务器声明的MIME类型不一致，Chrome可能会根据嗅探结果处理文件。
- **Edge**: 对于基于Chromium的Edge浏览器，其MIME嗅探策略与Chrome类似，会尝试分析文件内容来确定其类型。
- **Opera**: 作为基于Chromium的浏览器，Opera在MIME嗅探方面的策略也与Chrome相似，它会检查文件内容来决定如何处理文件。
- **Firefox**: 它更倾向于信任服务器声明的MIME类型。在某些情况下，如果文件的内容明显与服务器声明的类型不符，Firefox会采取嗅探结果。
- **Safari**: Safari的MIME嗅探行为较为独特，它有时会依赖于文件的扩展名来决定如何处理文件，尤其是在服务器提供的MIME类型不明确时。

**MIME嗅探虽然能够帮我们正确呈现/处理未知类型的资源，但也带来了许多安全风险：**

- **错误解释可执行内容**: 浏览器可能将非执行文件（如图像或视频）误判为可执行脚本（如HTML或JavaScript）。这种情况下，一个恶意文件可以被错误地执行，导致跨站脚本攻击（XSS）或其他安全威胁。
- **基于MIME类型的攻击**: 攻击者可能利用MIME嗅探机制来绕过安全检查。例如，他们可以上传一个带有恶意代码的文件，该文件伪装成一个无害的类型（如图像），但实际上包含可执行的脚本。
- **内容安全策略绕过**: MIME嗅探可能允许攻击者绕过某些内容安全策略（CSP），这些策略通常用于限制网页上可以执行哪些类型的内容。

为了减轻这些风险，我们可以通过在HTTP响应头中设置 `X-Content-Type-Options: nosniff`告诉浏览器不要对资源进行MIME嗅探。

## 其他传送文件类型的方法

- 有时会使用名称后缀，特别是在 Microsoft Windows 系统上。并非所有的操作系统都认为这些后缀是有意义的（特别是 Linux 和 Mac OS），并且像外部 MIME 类型一样，不能保证它们是正确的。
- 魔数（magic number）。不同类型的文件的语法通过查看结构来允许文件类型推断。例如，每个 GIF 文件以 `47 49 46 38 39` 十六进制值（`GIF89`）开头，每个 PNG 文件以 `89 50 4E 47`（`.PNG`）开头。并非所有类型的文件都有魔数，所以这也不是 100％ 可靠的方式。

## 相关标头

### X-Content-Type-Options `响应标头`

**响应标头 `X-Content-Type-Options`指定客户端禁用MIME嗅探行为。**

**参数**

该响应标头并无其他参数。

**取值**

- **nosniff**

  指定客户端禁用MIME嗅探行为

**示例**

```http
X-Content-Type-Options: nosniff
```

## 本节参考

- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options

转载需要经过本人同意，并标明出处！
