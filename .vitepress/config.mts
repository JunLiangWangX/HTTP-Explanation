import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  title: "HTTP完全注释",
  description: "HTTP完全注释",
  lang: "zh-CN",
  base: '/HTTP-Explanation/',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: './public',
  srcDir: 'src',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: './logo.svg' }
    ],
    [
      'script',
      {
        async: 'true',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7298585637298195',
        crossorigin: 'anonymous'
      }
    ],
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-X83T8C1XEL'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-X83T8C1XEL');`

    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?92e568bf422499874640dbee88096c2d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]

    
  ],
  themeConfig: {
    // logo:'./.vitepress/assets/logo.svg',
    siteTitle: 'HTTP完全注释',
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '切换模式',
    sidebarMenuLabel: "菜单",
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: 'deep',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
    outlineTitle: '目录',
    footer: {
      message: '请勿将本站文章用作商业用途 | 转载请标明来源',
      copyright: 'Copyright © 2023-present JunLiangWang'
    },
    editLink: {
      text: "在Github编辑此页",
      pattern: 'https://github.com/JunLiangWangX/HTTP-Explanation/edit/main/src/:path'
    },
    nav: [
      { text: '支持作者', link: '/docs/support' },
      { text: '作者博客', link: 'https://wangjunliang.com/#/home' }
    ],
    sidebar: [
      {
        text: '概述',
        items: [
          {
            text: 'HTTP的历史', link: '/docs/overview/the-history-of-http'
          },
          {
            text: 'HTTP的报文格式', link: '/docs/overview/http-message-format'
          }
        ]
      },
      {
        text: '安全策略',
        items: [{
          text: '拯救不安全的HTTP - HTTPS', link: '/docs/security-strategy/rescue-insecure-http-https'
        }, {
          text: 'XSS攻击？内容安全策略会出手的', link: '/docs/security-strategy/content-security-policy'
        }, {
          text: 'CSRF攻击？同源策略会出手的', link: '/docs/security-strategy/same-origin-policy'
        }, {
          text: '又跨域了？一文解释清楚跨源资源共享（cors）', link: '/docs/security-strategy/cross-origin-resource-sharing'
        }, {
          text: '常见攻击与防护', link: '/docs/security-strategy/common-attack-and-protection-methods'
        }
        ]
      },
      {
        text: '身份认证策略',
        items: [{
          text: 'Cookie', link: '/docs/authentication-strategy/cookie'
        }, {
          text: 'Authorization', link: '/docs/authentication-strategy/authorization'
        },

        ]
      },
      {
        text: '性能优化策略',
        items: [{
          text: '长连接与短连接', link: '/docs/performance-optimization-strategy/long-connection-and-short-connection'
        }, {
          text: 'HTTP缓存', link: '/docs/performance-optimization-strategy/http-cache'
        }, {
          text: '数据压缩', link: '/docs/performance-optimization-strategy/data-compression'
        }]
      },
      {
        text: '内容协商策略',
        items: [{
          text: '范围请求', link: '/docs/content-negotiation/range-request'
        },{
          text: '条件请求', link: '/docs/content-negotiation/condition-request'
        }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JunLiangWangX/HTTP-Explanation/' }
    ]
  },
  /* Vite PWA Options */
  pwa: {
    outDir: '../public',
    base: '/HTTP-Explanation/',
    scope: '/HTTP-Explanation/',
    includeAssets: ['logo.svg'],
    manifest: {
      name: 'HTTP完全注释',
      short_name: 'HTTP完全注释',
      description: "一份全面、集中、准确的HTTP完全注解",  //描述
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.svg',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: 'logo-64.svg',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'logo-128.svg',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'logo-256.svg',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'logo-512.svg',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
    },
  }
}))
