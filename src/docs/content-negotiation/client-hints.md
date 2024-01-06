---
title: 客户端提示
head:
  - - meta
    - name: description
      content: 客户端提示（Client Hint）是HTTP的一种内容协商机制，它通过在请求中设置特定的请求标头向服务器主动传达有关设备、网络、用户以及用户代理等信息，从而帮助服务器更好地理解客户端的上下文，以便做出更合适的响应。
  - - meta
    - name: keywords
      content: 客户端提示 ClientHint 低熵提示 高熵提示 重要的客户端提示 Accept-CH Save-Data Sec-CH-UA Sec-CH-UA-Mobile Sec-CH-UA-Platform Sec-CH-UA-Arch Sec-CH-UA-Full-Version-List Sec-CH-UA-Bitness Sec-CH-UA-Model Sec-CH-UA-Platform-Version Sec-CH-Prefers-Reduced-Motion Sec-CH-Prefers-Color-Scheme Device-Memory Sec-CH-DPR Sec-CH-Width Sec-CH-Viewport-Width Sec-CH-Viewport-Height Downlink ECT RTT
---
# 客户端提示

**客户端提示（Client Hint）是HTTP的一种内容协商机制，它通过在请求中设置特定的请求标头向服务器主动传达有关设备、网络、用户以及用户代理等信息，从而帮助服务器更好地理解客户端的上下文，以便做出更合适的响应。**

::: danger 客户端提示与内容协商的区别

客户端提示与前一篇文章中所介绍的内容协商非常相似，甚至你可能会觉得这两个概念就是同一个东西，为什么要把客户端提示单独出来呢？确实这两个概念有交叉的部分，但它们是为了不同的目的而设计的。内容协商强调在响应中选择或生成最适合客户端的内容，而客户端提示关注的是客户端主动提供信息，使服务器能够更好地适应客户端的特定需求。

:::



## 客户端提示分类

客户端提示分为高熵提示和低熵提示，**低熵提示是指一些不会泄漏太多用户个人隐私信息的提示，而高熵提示则反之**。**使用高熵提示需要服务端使用`Accept-CH` 响应标头明确指出需要客户端发送的高熵提示，且浏览器并未限制提供这些信息才能够正常使用**；而低熵提示只要浏览器并未限制提供这些信息，它们可能为每个客户端请求发送这些信息，无论服务端是否在 `Accept-CH` 响应标头中指定。



### 低熵提示

| 标头名称           | 作用                                                         |
| ------------------ | ------------------------------------------------------------ |
| Save-Data          | 表明用户是否希望在网络连接较慢或有数据限制的情况下优先加载轻量级的页面或资源。 |
| Sec-CH-UA          | 表明用户使用的浏览器的品牌（brand）和重要的版本信息。        |
| Sec-CU-UA-Mobile   | 表明浏览器是否运行在移动设备上，如果是桌面浏览器也可以使用它来指示对“移动”用户体验的偏好。 |
| Sec-CH-UA-Platform | 表明浏览器运行使用的平台或操作系统。                         |



### 高熵提示

| 标头名称                      | 作用                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| Sec-CH-UA-Arch                | 表明用户设备使用的 CPU 架构，例如 ARM 或 x86。               |
| Sec-CH-UA-Full-Version-List   | 表明用户使用的浏览器的品牌（brand）和完整版本信息。          |
| Sec-CH-UA-Bitness             | 表明用户设备使用的 CPU 架构的“位数”，通常为 64 位或 32 位。  |
| Sec-CH-UA-Model               | 表明用户的设备型号。                                         |
| Sec-CH-UA-Platform-Version    | 表明用户设备使用的平台或操作系统的版本。                     |
| Sec-CH-Prefers-Reduced-Motion | 表明用户对减少动画的偏好，与CSS媒体查询[prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)相同。 |
| Sec-CH-Prefers-Color-Scheme   | 表明用户对浅色或深色主题的偏好，与CSS媒体查询[prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)相同。 |
| Device-Memory                 | 表明用户设备内存的近似大小。                                 |
| Sec-CH-DPR                    | 表明用户设备的像素比 (DPR)，该比例是与每个 CSS 像素相对应的物理设备像素的数量。 |
| Sec-CH-Width                  | 表明客户端对资源期望的宽度尺寸                               |
| Sec-CH-Viewport-Width         | 表明用户可视化区域宽度尺寸                                   |
| Sec-CH-Viewport-Height        | 表明用户可视化区域高度尺寸                                   |
| Downlink                      | 提供客户端连接到服务器的大致带宽，以 Mbps 为单位。           |
| ECT                           | 表明客户端[有效的连接类型](https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type)： slow-2g、2g、3g、4g。 |
| RTT                           | 表明客户端发送请求到服务器并返回响应所需的时间。             |

::: danger 客户端提示相关标头仅能在HTTPS中使用

:::



## 重要的客户端提示

**重要的客户端提示是指那些可能显著改变页面渲染方式，影响网站交互以及可用性的客户端提示**。例如，`Sec-CH-Prefers-Reduced-Motion` 通常被视作重要的客户端提示，因为它可能会显著影响动画的行为，因此需要浏览器第一时间设置并提供。

**服务器可以使用 `Critical-CH` 响应标头去指定 `Accept-CH` 响应标头列举的客户端提示中哪些是重要客户端提示**。浏览器接收到有 `Critical-CH` 标头的响应，必须检查其中指定的客户端提示标头是否已经在请求中发送，如果没有发送，则需要携带相关标头重新请求。

例如，在这种情况下，服务器通过 `Accept-CH`响应标头告诉客户端它接受 `Sec-CH-Prefers-Reduced-Motion`客户端提示，且使用 `Critical-CH`响应标头指定 `Sec-CH-Prefers-Reduced-Motion`为一个重要客户端提示：

```http
HTTP/1.1 200 OK
Content-Type: text/html
Accept-CH: Sec-CH-Prefers-Reduced-Motion
Vary: Sec-CH-Prefers-Reduced-Motion
Critical-CH: Sec-CH-Prefers-Reduced-Motion
```

由于 `Sec-CH-Prefers-Reduced-Motion` 在首次请求中不存在，因此浏览器会自动地重新请求并携带上 `Sec-CH-Prefers-Reduced-Motion` 标头。

```http
GET / HTTP/1.1
Host: example.com
Sec-CH-Prefers-Reduced-Motion: "reduce"
```



## 相关标头



### Accept-CH `响应标头`

**响应标头`Accept-CH`指定客户端应在后续请求中应包含哪些客户端提示（Client Hint）标头。**

**参数**

该响应标头并无其他参数。

**取值**

- **<Client-Hint-heder,Client-Hint-heder,Client-Hint-heder,.......>**

  客户端提示（Client Hint）标头列表，用逗号（`','`）隔开，指定客户端应在后续请求中应包含哪些客户端提示（Client Hint）标头。

**示例**

```http
Accept-CH: DPR, Viewport-Width
Accept-CH: Width
```

::: tip 除了使用`Accept-CH`响应标头，还可以使用\<meta>元素来配置该策略

```html
<meta http-equiv="Accept-CH" content="Width, Downlink, Sec-CH-UA" />
```

:::



### Save-Data `请求标头`

**`Save-Data` 请求标头表明用户是否希望在网络连接较慢或有数据限制的情况下优先加载轻量级的页面或资源。**

这个标头的目的是提供一种机制，使得网站能够根据用户的带宽或数据限制条件动态地调整其内容。一些网站可能会根据`Save-Data`标头的存在来选择性地加载低分辨率的图像、压缩的资源或简化的页面布局，以提供更快的加载速度和更低的数据使用量。

**参数**

该请求标头并无其他参数。

**取值**

- **[on/off]**

  表示客户端是否想要选择简化数据使用模式。on 表示是，而 off（默认值）表示不。

**示例**

```http
Save-Data: on
Save-Data: off
```



### **Sec-CH-UA** `请求标头`

**`Sec-CH-UA` 请求标头表明用户使用的浏览器的品牌（brand）和重要的版本信息。** 品牌是浏览器的商业名称，例如：Chromium、Opera、Google Chrome、Microsoft Edge、Firefox 和 Safari。浏览器可能有多个关联的品牌。例如，Opera、Chrome 和 Edge 都基于 Chromium，因此在 **`Sec-CH-UA`** 标头可能会同时列出这三个品牌。

**参数**

该请求标头并无其他参数。

**取值**

- **["\<brand>";v="\<version>"，"Not A;Brand";v="\<version>"......]**

  指定一系列用户使用的浏览器的品牌（brand）和重要的版本信息，使用逗号（,）分割。

  - **\<brand>：** 表示浏览器的品牌，例如Chromium、Google Chrome等，特殊值`Not A;Brand`表示该浏览器不使用品牌标识符。
  - **\<version>：** 表示该浏览器的版本信息

**示例**

```http
Sec-CH-UA: "Chromium";v="96"
Sec-CH-UA: "Opera";v="81", " Not;A Brand";v="99", "Chromium";v="95"
Sec-CH-UA: " Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"
```



### **Sec-CH-UA-Mobile** `请求标头`

**`Sec-CH-UA-Mobile`请求标头表明浏览器是否运行在移动设备上，如果是桌面浏览器也可以使用它来表示对“移动”用户体验的偏好。**

**参数**

该请求标头并无其他参数。

**取值**

- **?\<boolean>**

  表明浏览器是否运行在移动设备上，`?1`表示在移动设备上 (true)，`?0`表示不在移动设备上 (false)。

**示例**

```http
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Mobile: ?1
```



### **Sec-CH-UA-Platform** `请求标头`

**`Sec-CH-UA-Platform`请求标头表明浏览器运行使用的平台或操作系统**

**参数**

该请求标头并无其他参数。

**取值**

- **"\<platform>"**

  表明浏览器运行使用的平台或操作系统，以下字符串之一：`Android`、`Chrome OS`、`Chromium OS`、`iOS`、`Linux`、`macOS`、`Windows`或`Unknown`。

**示例**

```http
Sec-CH-UA-Platform: "macOS"
Sec-CH-UA-Platform: "Android"
```



### **Sec-CH-UA-Arch** `请求标头`

**`Sec-CH-UA-Arch` 请求标头表明用户设备使用的 CPU 架构，例如 ARM 或 x86。**

**参数**

该请求标头并无其他参数。

**取值**

- **"\<arch>"**

  表明用户设备使用的 CPU 架构，例如 `x86`、`ARM`、`arm64-v8a` 、 `armeabi-v7a` 、 `armeabi` 等。

**示例**

```http
Sec-CH-UA-Arch: "ARM"
Sec-CH-UA-Arch: "x86"
```



### **Sec-CH-UA-Full-Version-List** `请求标头`

**`Sec-CH-UA-Full-Version-List`请求标头表明用户使用的浏览器的品牌（brand）和完整版本信息。**

**参数**

该请求标头并无其他参数。

**取值**

- **["\<brand>";v="\<full-version>"，"Not A;Brand";v="\<full-version>"......]**

  指定一系列用户使用的浏览器的品牌（brand）和完整版本信息，使用逗号（,）分割。

  - **\<brand>：** 表示浏览器的品牌，例如Chromium、Google Chrome等，特殊值`Not A;Brand`表示该浏览器不使用品牌标识符。
  - **\<full-version>：** 表示该浏览器的完整版本信息，例如 98.0.4750.0。

**示例**

```http
Sec-CH-UA-Full-Version-List: "Chromium";v="98.0.4750.0"
Sec-CH-UA-Full-Version-List: " Not A;Brand";v="99.0.0.0", "Chromium";v="98.0.4750.0", "Google Chrome";v="98.0.4750.0"
```

::: danger [`Sec-CH-UA-Full-Version`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Sec-CH-UA-Full-Version)请求头已弃用，请使用`Sec-CH-UA-Full-Version-List`请求头代替

:::



### **Sec-CH-UA-Bitness** `请求标头`

**`Sec-CH-UA-Bitness` 请求标头表明用户设备使用的 CPU 架构的“位数”，通常为 64 位或 32 位。**

**参数**

该请求标头并无其他参数。

**取值**

- **"\<bitness>"**

  表明用户设备使用的 CPU 架构的“位数”，通常为 `"64"`或`"32"`。

**示例**

```http
Sec-CH-UA-Bitness: "32"
Sec-CH-UA-Bitness: "64"
```



### **Sec-CH-UA-Model** `请求标头`

**`Sec-CH-UA-Model`请求标头表明用户的设备型号。**

**参数**

该请求标头并无其他参数。

**取值**

- **"\<device-version>"**

  表明用户的设备型号。

**示例**

```http
Sec-CH-UA-Model: "iPhone"
Sec-CH-UA-Model: "Samsung Galaxy S21"
```



### **Sec-CH-UA-Platform-Version** `请求标头`

**`Sec-CH-UA-Platform-Version`请求标头表明用户设备使用的平台或操作系统的版本。**

**参数**

该请求标头并无其他参数。

**取值**

- **"\<version>"**

  表明用户设备使用的平台或操作系统的版本，例如，`"11.0.0"`，Linux 上的版本字符串始终为空。

**示例**

```http
Sec-CH-UA-Platform-Version: "10.0.0"
```



### **Sec-CH-Prefers-Reduced-Motion** `请求标头`

**`Sec-CH-Prefers-Reduced-Motion`请求标头表明用户对减少页面动画的偏好。** 用户通过设置操作系统或浏览器设置来表明他们的偏好，浏览器则会使用此标头携带用户偏好，以指示用户对减少页面动画的偏好，服务器根据偏好适当调整内容，例如 JavaScript 或 CSS，以减少后续渲染内容上呈现的动画。

**参数**

该请求标头并无其他参数。

**取值**

- **"\<perference>"**

  表明用户对减少页面动画的偏好，它通常取自操作系统的设置，该指令的值可以是`no-preference`（用户偏好不减少动画）或`reduce`（用户偏好减少动画）。

**示例**

```http
Sec-CH-Prefers-Reduced-Motion: "reduce"
Sec-CH-Prefers-Reduced-Motion: "no-preference"
```



### **Sec-CH-Prefers-Color-Scheme** `请求标头`

**`Sec-CH-Prefers-Color-Scheme`请求标头表明用户对浅色或深色主题的偏好。** 用户通过设置操作系统（例如，浅色或深色模式）或浏览器设置来表明他们的偏好，浏览器则会使用此标头携带用户偏好，以指示用户对特定配色方案的偏好，服务器根据偏好适当调整内容，包括图像或 CSS等，以显示后续渲染内容的浅色或深色模式。

**参数**

该请求标头并无其他参数。

**取值**

- **"\<perference>"**

  表明用户对浅色或深色主题的偏好，它通常取自操作系统的设置，该指令的值可以是`light`（用户偏好浅色模式）或`dark`（用户偏好深色模式）。

**示例**

```http
Sec-CH-Prefers-Color-Scheme: "light"
Sec-CH-Prefers-Color-Scheme: "dark"
```



### **Device-Memory** `请求标头`

**`Device-Memory`请求标头表明用户设备内存的近似大小。** 

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  一个特定的离散值，表明用户设备内存的近似大小，该值可以是以下之一：0.25、0.5、1、2、4、8，这些值表示设备内存的相对容量，通常以GB为单位。

**示例**

```http
Device-Memory: 1
Device-Memory: 4
```

::: danger 为何将 `Device-Memory` 设置为特定的离散值而不是精确值?

通过使用这种较为粗糙的内存容量值，可以降低将其用作唯一标识的潜在风险。这有助于保护用户免受潜在的隐私侵犯，提高用户隐私并减少跟踪或指纹识别的可能性。

:::



### **Sec-CH-DPR** `请求标头`

**`Sec-CH-DPR`请求标头表明用户设备的像素比 (DPR)。** 

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  指定一个数字，表明用户设备的像素比 (DPR)。

**示例**

```http
Sec-CH-DPR: 2.0
Sec-CH-DPR: 1.5
```

::: danger [`DPR`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DPR)请求头已弃用，请使用`Sec-CH-DPR`请求头代替

:::



### **Sec-CH-Width** `请求标头`

**`Sec-CH-Width`请求标头表明客户端对资源期望的宽度尺寸。** 

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  指定一个数字，表明客户端对资源期望的宽度尺寸，该值会四舍五入到最接近的整数。

**示例**

```http
Sec-CH-Width: 1920
Sec-CH-Width: 1440
```

::: danger [`Width`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Width)请求头已弃用，请使用`Sec-CH-Width`请求头代替

:::



### **Sec-CH-Viewport-Width** `请求标头`

**`Sec-CH-Viewport-Width`请求标头表明用户可视化区域宽度尺寸。**

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  指定一个数字，表明用户可视化区域宽度尺寸，该值会四舍五入到最接近的整数。

**示例**

```http
Sec-CH-Viewport-Width: 1920
Sec-CH-Viewport-Width: 1440
```

::: danger [`Viewport-Width`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Viewport-Width)请求头已弃用，请使用`Sec-CH-Viewport-Width`请求头代替

:::



### **Sec-CH-Viewport-Height** `请求标头`

**`Sec-CH-Viewport-Width`请求标头表明用户可视化区域高度尺寸。**

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  指定一个数字，表明用户可视化区域高度尺寸，该值会四舍五入到最接近的整数。

**示例**

```http
Sec-CH-Viewport-Height: 1080
Sec-CH-Viewport-Height: 960
```



### **Downlink** `请求标头`

**`Downlink`请求标头提供客户端连接到服务器的大致带宽，以 Mbps 为单位。** 

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  指定一个数字，表明客户端连接到服务器的大致带宽，以 Mbps 为单位，该值会四舍五入到最接近的 25 kbit 的整数倍。

**示例**

```http
Downlink: 1.7
Downlink: 5.75
```



### **ECT** `请求标头`

**`ECT`请求标头表明客户端[有效的连接类型](https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type)** 

**参数**

该请求标头并无其他参数。

**取值**

- **\<type>**

  [指定有效连接类型](https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type)值，为以下值之一：`slow-2g`、`2g`、`3g`或`4g`。

**示例**

```http
ECT: 2g
ECT: 4g
```



### **RTT** `请求标头`

**`RTT`请求标头表明客户端发送请求到服务器并返回响应所需的大致时间。** 

**参数**

该请求标头并无其他参数。

**取值**

- **\<number>**

  指定一个数字，表明客户端发送请求到服务器并返回响应所需的大致时间，以毫秒为单位，该值会四舍五入到最接近的 25 的整数倍。

**示例**

```http
RTT: 125
RTT: 25
```



## 本节参考

- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-CH
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Save-Data
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Sec-CH-UA
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Mobile
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Platform
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Sec-CH-UA-Arch
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Sec-CH-UA-Full-Version-List
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Sec-CH-UA-Bitness
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Model
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Platform-Version
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Reduced-Motion
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Device-Memory
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/DPR
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Width
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Downlink
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ECT
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Viewport-Width
- https://wicg.github.io/responsive-image-client-hints/#intro

转载需要经过本人同意，并标明出处！