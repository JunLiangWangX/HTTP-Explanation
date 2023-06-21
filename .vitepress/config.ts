import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HTTP完全注释",
  description: "HTTP完全注释",
  lang:"zh-CN",
  base: '/HTTP-Explanation/',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: './public',
  lastUpdated:true,
  head: [
    [
      'link',
      { rel: 'icon', href: './.vitepress/assets/logo.svg'}
    ]
  ],
  themeConfig: {
    // logo:'./.vitepress/assets/logo.svg',
    siteTitle:'HTTP完全注解',
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
