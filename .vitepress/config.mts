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
      { text: '支持作者', link: '/docs/support' }
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
        },{
          text: 'XSS攻击？内容安全策略会出手的', link: '/docs/security-strategy/content-security-policy'
        },{
          text: '又跨域了？一文解释清楚同源策略', link: '/docs/security-strategy/same-origin-policy'
        },{
          text: 'CSRF攻击', link: '/docs/security-strategy/cross-site-request-forgery'
        },{
          text: '常见攻击与防护', link: '/docs/security-strategy/common-attack-and-protection-methods'
        }
        ]
      },
      {
        text: '请求头',
        items: [
          { text: 'Connection', link: '/connection' },
          { text: 'Keep-Alive', link: '/keep-alive' }
        ]
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
