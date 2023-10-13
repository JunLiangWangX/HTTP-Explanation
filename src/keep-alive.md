# Keep-Alive

> 当请求头`Connection`为`keep-alive`时(请求保持连接去完成后续对同一服务器的请求)，可通过设置`Keep-Alive`请求头来指定空闲的连接需要保持的最小时长以及该连接可以发送的最大请求数量



::: danger 警告 

需要将 请求头 [`Connection`](./connection.html) 的值设置为 `"keep-alive"`这个首部才有意义。同时需要注意的是，在 HTTP/2 协议中， [`Connection`](./connection.html) 和 [`Keep-Alive`](./) 是被忽略的；在其中采用其他机制来进行连接管理。

:::



## 🔠取值

> 一系列用逗号隔开的参数，每一个参数由一个标识符和一个值构成，并使用等号 (`'='`) 隔开。下述标识符是可用的

| 标识符  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| timeout | 指定了一个空闲连接需要保持打开状态的最小时长（以秒为单位）。需要注意的是，如果没有在传输层设置 keep-alive TCP message 的话，大于 TCP 层面的超时设置会被忽略。 |
| max     | 在连接关闭之前，在此连接可以发送的请求的最大值。在非管道连接中，除了 0 以外，这个值是被忽略的，因为需要在紧跟着的响应中发送新一次的请求。HTTP 管道连接则可以用它来限制管道的使用。 |



## 👀示例

```HTTP
Keep-Alive: timeout=5, max=1000
```







::: details  🎈本节参考

\-  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive

 :::



转载需要经过本人同意！