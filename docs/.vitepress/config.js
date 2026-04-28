import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'magma',
  description: 'This is the magma guide',
  base: '/',
  outDir: 'public',
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'mask-icon', color: '#5bbad5', href: '/icons/safari-pinned-tab.svg' }],
    ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#603cba' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],

  themeConfig: {
    repo: 'lavafeld/magma-guide',
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Help us improve this page!'
    },
    docsDir: 'docs',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    sidebar: {
      '/guide/': getGuideSidebar('Guide', 'Advanced', 'Contribute'),
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Contribute', link: '/guide/contribute' },
      { text: 'Contact', link: 'https://blog.magma.lavafeld.org/contact/' },
      { text: 'Blog', link: 'https://blog.magma.lavafeld.org/' }
    ]
  }
})

function getGuideSidebar(groupA, groupB, groupC) {
  return [
    {
      text: groupA,
      collapsed: false,
      items: [
        { text: '', link: '/guide/' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Testing Methodology', link: '/guide/testing-methodology' },
        { text: 'Network Measurements', link: '/guide/network-measurements' },
        { text: 'Run Measurements', link: '/guide/run-measurements' },
        { text: 'Data Analysis', link: '/guide/data-analysis' },
        { text: 'Censorship Circumvention', link: '/guide/censorship-circumvention' },
        { text: 'Glossary', link: '/guide/glossary' }
      ]
    },
    {
      text: groupB,
      collapsed: false,
      items: [
        { text: 'Advanced Intro', link: '/guide/advanced-intro' },
        { text: 'Data Sources', link: '/guide/data-sources' },
        { text: 'OSINT Sources', link: '/guide/osint-sources' }
      ]
    },
    {
      text: groupC,
      collapsed: false,
      items: [
        { text: 'Contribute', link: '/guide/contribute' }
      ]
    }
  ]
}

