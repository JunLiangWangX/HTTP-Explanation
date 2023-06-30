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
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present JunLiangWang'
    },
    editLink: {
      text:"在Github编辑此页",
      pattern: 'https://github.com/JunLiangWangX/HTTP-Explanation/edit/main/src/:path'
    },
    sidebar: [
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
    outDir: './public',
    srcDir: 'src',
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
