---
title: HTTP中的数据压缩
head:
  - - meta
    - name: description
      content: 数据压缩是HTTP的性能优化机制，它通过压缩数据来减小传输数据的体积，从而提高网络性能，减少网络带宽，并加快页面加载速度。
  - - meta
    - name: keywords
      content: HTTP HTTP数据压缩 HTTP数据压缩的发展 端到端压缩 逐跳压缩 常见的压缩算法 gzip deflate br compress Accept-Encoding Content-Encoding
---
# HTTP中的数据压缩

**数据压缩是HTTP的性能优化机制，它通过压缩数据来减小传输数据的体积，从而提高网络性能，减少网络带宽，并加快页面加载速度。** 



## 数据压缩的发展

在早期HTTP/0.9版本中，由于协议非常简单，其请求内容通常只有一行内容（因此被称为单行协议），响应也只能是HTML文档，因此整个传输体也非常小，大家并未感受到由于传输内容过大导致的网络延迟。但在HTML/1.0极大的丰富了HTTP传输的文件类型以及内容后，请求的内容也从较小的HTML文档发展到了图片、音频、视频等较大的文件，此时由于传输内容过大导致的网络延迟问题也被暴露出来。

为解决该问题，**HTTP/1.1推出消息体压缩机制**——服务器可以使用Gzip、Deflate等压缩算法来压缩HTTP响应的实体主体部分（如HTML、CSS、JavaScript等），然后在响应头中使用"Content-Encoding"字段来指示客户端该响应已经被压缩以及压缩的算法。客户端收到压缩的响应后，会自动解压缩以获取原始内容。数据压缩机制的推出，极大的减缓了网络延迟，对于有些文件与内容来说，会有高达 70% 的压缩比率，这大大的提高了网络性能！

但好景不长，HTTP/1.1后Web迎来了飞速发展，网页愈渐变得的复杂，甚至演变成了独有的应用，可见媒体的播放量，增进交互的脚本大小也增加了许多。同时这也意味着HTTP传输的内容越变越多、越变越大，但HTTP是又是一种无状态的协议。简而言之，这意味着每个请求必须要携带服务器需要的所有细节，而不是让服务器保存住之前请求的元数据，这导致许多请求和响应头部会携带一些冗余的一摸一样的信息，然而这些消息头在Web发展的同时，承载的信息却越来越多，例如用户个人信息、用户行为等，有些时候甚至消息头的数据大小远远大于消息体的数据大小，这也致使带宽使用和延迟不断增加。

为了克服这个问题，**HTTP/2引入了头部压缩机制**——该机制使用了HPACK算法对头部信息进行压缩，通过建立头部字段表，有效减小了头部的大小，提高了传输效率。

::: tip 使用HTTP中的数据压缩机制极其简单

值得高兴的是，对于开发者而言使用HTTP中的数据压缩机制是极其简单的，使用HTTP/1.1的消息体压缩我们仅需在服务端配置服务端支持的压缩算法即可；而使用HTTP/2的头部压缩机制则更简单了，我们仅需把HTTP协议升级到HTTP/2即可，HTTP/2会自动帮我们完成这一切工作

:::

由于HTTP/2的头部压缩是自动完成的，因此作为开发者的我们并不需要专门学习，所以下文只是介绍了HTTP/1.1中消息体压缩的工作流程与使用方法。



## 端到端压缩

端到端压缩技术指的是消息主体的压缩是在服务器端完成的，并且在传输过程中保持不变，直到抵达客户端。不管途中遇到什么样的中间节点，它们都会使消息主体保持原样。

![end-to-end-compress](../../public/end-to-end-compress.png)

端到端压缩工作流程：

- 客户端发送请求时会**自动**携带`Accept-Encoding`请求标头，其中包含有它所支持的压缩算法，以及各自的优先级。
- 服务器收到请求后会从中选择一种，并使用该算法对响应的消息主体进行压缩，并且发送 `Content-Encoding`响应标头来告知浏览器它选择了哪一种算法。
- 响应经过中间代理节点/服务器时保持不变，直到抵达客户端。
- 客户端收到响应后会根据`Content-Encoding`响应标头中选择的算法来对响应体进行还原，从而拿到响应内容。

::: danger  即使客户端和服务器都支持相同的压缩算法，服务器有可能对响应主体不进行压缩

即使客户端和服务器都支持相同的压缩算法，如果客户端能够接收不压缩数据，服务器也可以选择对响应主体不进行压缩。导致这种情况出现的两种常见的情形是：

- 要发送的数据已经经过压缩，再次进行压缩不会导致被传输的数据量更小。一些图像格式的文件会存在这种情况；
- 服务器超载，无法承受压缩需求导致的计算开销。通常，如果服务器使用超过 80% 的计算能力，微软建议不要压缩。

:::

::: tip 如何在服务端配置HTTP数据压缩

Apache 服务器支持数据压缩，有 [mod_deflate](https://httpd.apache.org/docs/current/mod/mod_deflate.html)可供使用；nginx 中有[ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) 模块；在 IIS 中则可以使用 [`<httpCompression>`](https://www.iis.net/configreference/system.webserver/httpcompression) 元素。

:::



## 逐跳压缩

逐跳压缩技术是对客户端与服务器端之间的任意两个节点之间传递的消息的主体的压缩，且在两个相邻的中间节点之间的连接上，可能会采用不同的压缩方式。

![mid-to-mid-compress](../../public/mid-to-mid-compress.png)

逐跳压缩工作流程：

- 客户端正常发送请求，不会携带任何压缩算法标头。
- 请求达到第一个中间服务器**自动**携带`TE`请求标头转发请求，其中包含有它所支持的压缩算法，以及各自的优先级。
- 请求达到第二个中间服务器去除相关压缩算法标头，正常转发请求
- 服务端正常处理请求并响应
- 响应达到第二个中间服务器，会从第一个中间服务器提供的压缩算法中选择一种，并使用该算法对响应的消息主体进行压缩，并且携带 `Content-Encoding`响应标头来告知选择了哪一种算法，转发响应。
- 响应到达第一个中间服务器根据`Transfer-Encoding `响应标头中选择的算法来对响应体进行还原，继续转发响应
- 客户端正常收取处理响应

::: danger  逐跳压缩很少使用

在实际应用中，逐跳压缩对于服务器和客户端来说是不可见的，并且很少使用，以至于 Apache、nginx 或 IIS 等服务器都不太容易配置。此类配置通常用在代理服务器层面。`TE` 标头和`Transfer-Encoding` 标头最常用来发送分块响应，允许在获得资源的确切长度之前就可以开始传输，因此后续介绍[相关标头](#相关标头)时不会在本章介绍这两个标头

:::



## 常见的压缩算法

目前HTTP数据压缩机制常见的压缩算法如下：

- **gzip（GNU zip）：** 使用DEFLATE算法，是Web服务器中最常见的压缩算法，适用于文本文件，如HTML、CSS、JavaScript等。
- **deflate：** 也使用DEFLATE算法，但与gzip不同的是，它没有使用gzip的文件头和尾，使得数据包更小，由于与一些旧的客户端和服务器不兼容所以不太常见。
- **br（Brotli）：** Brotli是由Google开发的一种新的压缩算法，通常提供比gzip更好的压缩比，在支持Brotli的情况下，应该使用它作为首选的压缩算法。
- **compress：** 是一种基于 Lempel-Ziv-Welch (LZW) 算法的压缩方法。这种算法在 HTTP 数据压缩机制中曾经被广泛使用，但由于专利问题，现在已经相对较少见。



## 相关标头



### Accept-Encoding `请求标头`

**请求头 Accept-Encoding 将客户端能够理解与支持的压缩算法告知给服务端**。通过内容协商的方式，服务端会选择一个客户端提出的压缩算法，将响应主体内容进行压缩并使用 `Content-Encoding`响应头告知客户端自己选择的压缩算法。

**参数**

该请求标头并无其他参数。

**取值**

- **[ \<compress-algorithm>;q=\<q>, \<compress-algorithm>,.......]** 

  指定一系列客户端支持的压缩算法（\<compress-algorithm>），以及优先级（q=\<q>，可选），压缩算法与优先级使用分号（;）分隔，压缩算法之间使用逗号(,)分隔。

  **\<compress-algorithm>：**

  - **gzip**：表示支持 [Lempel-Ziv coding](http://en.wikipedia.org/wiki/LZ77_and_LZ78#LZ77) (LZ77) 压缩算法，以及 32 位 CRC 校验的编码方式。
  - **compress** ：表示支持  [Lempel-Ziv-Welch](http://en.wikipedia.org/wiki/LZW) (LZW) 压缩算法。
  - **deflate** ：表示支持 [zlib](http://en.wikipedia.org/wiki/Zlib) 结构和 [*deflate*](http://en.wikipedia.org/wiki/DEFLATE) 压缩算法。
  - **br** ：表示支持 [Brotli](https://en.wikipedia.org/wiki/Brotli) 算法的编码方式。
  - **identity** ：表示支持不压缩。
  - **\***：匹配其他任意未在该请求头字段中列出的编码方式。假如该请求头字段不存在的话，这个值是默认值。它并不代表任意算法都支持，而仅仅表示算法之间无优先次序。

  **\<q>** `可选` ：小数0到1，代表算法的优先顺序，又称为权重。

**示例**

```http
Accept-Encoding: gzip
Accept-Encoding: *
Accept-Encoding: gzip, compress, br
Accept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1
```



### Content-Encoding `实体标头`

**实体标头Content-Encoding 列出了对当前响应体应用的所有压缩算法以及其编码顺序**。它让客户端知道需要以何种算法以及顺序解码该响应体以获得原始数据。

**参数**

该实体标头并无其他参数。

**取值**

- **[ \<compress-algorithm>, \<compress-algorithm>,.......]** 

  指定一系列的压缩算法（\<compress-algorithm>），其前后顺序则表明了编码顺序。

  **\<compress-algorithm>：**

  - **gzip**：表示支持 [Lempel-Ziv coding](http://en.wikipedia.org/wiki/LZ77_and_LZ78#LZ77) (LZ77) 压缩算法，以及 32 位 CRC 校验的编码方式。
  - **compress** ：表示支持  [Lempel-Ziv-Welch](http://en.wikipedia.org/wiki/LZW) (LZW) 压缩算法。
  - **deflate** ：表示支持 [zlib](http://en.wikipedia.org/wiki/Zlib) 结构和 [*deflate*](http://en.wikipedia.org/wiki/DEFLATE) 压缩算法。
  - **br** ：表示支持 [Brotli](https://en.wikipedia.org/wiki/Brotli) 算法的编码方式。
  - **identity** ：表示支持不压缩。

**示例**

```http
Content-Encoding: deflate
Content-Encoding: br
Content-Encoding: deflate, gzip
```





## 本节参考

- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Compression
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Encoding
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding

转载需要经过本人同意，并标明出处！