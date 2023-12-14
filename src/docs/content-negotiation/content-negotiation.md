# 内容协商

**在HTTP协议中，内容协商是一种用于为同一URI 提供资源不同的表示形式（如语言、字符集、媒体类型等）的机制，该机制能够让用户获得最合适的资源表现内容**。例如对于中文用户请求某一URI内容，服务器将返回该资源的中文形式；而英语用户请求同一资源时，则会返回该资源的英文形式。

![content-negotiation-example](../../public/content-negotiation-example.png)



# 内容协商的分类

**HTTP内容协商分为了主动内容协商与响应式协商**，主动协商由客户端发起，通过在请求中设置特定的请求标头来进行；响应式协商则有服务端发起，通过返回特定的响应状态码来进行。

![proactive-responsive-cs-example](../../public/proactive-responsive-cs-example.png)

## 主动内容协商

客户端在发送请求时会携带一系列内容协商的请求标头，这些标头描述了用户倾向的选择。服务器收到请求后会根据这些标头来选择最佳的资源表现形式返回给客户端，如果它不能提供一个合适的资源，它可能使用 [`406`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/406)（Not Acceptable）、[`415`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/415)（Unsupported Media Type）进行响应并为其支持的媒体类型设置标头。

// 图片

### 可用于主动内容协商的标头

目前HTTP内容协商机制有格式协商（`Accept`）、字符编码协商 （`Accept-Charset`）、语言协商（`Accept-Language`）和压缩格式协商（`Accept-Encoding`）四种类型。



## 响应式内容协商