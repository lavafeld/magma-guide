module.exports = {
  title: 'magma',
  description: 'This is the magma guide',
  base: process.env.VUEPRESS_BASE || '/',
  dest: 'public',
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/icons/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/icons/favicon-32x32.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'mask-icon', color: '#5bbad5', href: '/icons/safari-pinned-tab.svg' }],
    ['meta', { name: "msapplication-config", content: "/browserconfig.xml"}],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#603cba' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],
  themeConfig: {
    repo: 'https://github.com/lavafeld/magma-guide',
    editLinks: true,
    docsDir: 'docs',
    smoothScroll: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated',
    sidebar: {
      // https://github.com/vuejs/vuepress/issues/984
      sidebarDepth: 2,
      '/guide/': getGuideSidebar('Guide', 'Advanced', 'Contribute'),
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Contribute', link: '/guide/contribute' }
    ]
  },
  plugins: {
      '@vuepress/back-to-top': true,
      'vuepress-plugin-export': true,
      'vuepress-plugin-zooming': true,
      'vuepress-plugin-one-click-copy': {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: 'Copied!',
        duration: 600,
        showInMobile: false
      }
  }
}

function getGuideSidebar (groupA, groupB, groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'testing-methodology',
        'network-measurements',
        'run-measurements',
        'data-analysis',
        'glossary'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'advanced-intro',
      //'analyze-dns',
      //'analyze-google-traffic-data',
        'data-sources',
        'osint-sources'
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        'contribute'
      ]
    }
  ]
}
