module.exports = {
  title: 'superV',
  themeConfig: {
    repo: 'superv/docs',
    docsDir: 'docs',
    docsBranch: '0.22',
    editLinks: true,
    sidebarDepth: 3,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/superv/platform' },
    ],
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'Basics',
        collapsable: false,
        children: [
          '/basics/about',
          '/basics/installation',
          '/basics/configuration',
          '/basics/identifiers',
          '/basics/workflow',
        ]
      },
      {
        title: 'Addons',
        collapsable: false,
        children: [
          'addons/',
          'addons/modules',
          'addons/panels'
        ]
      },
      ['addons/', 'Addons'],
      ['resources/', 'Resources'],
      ['hooks/', 'Hooks'],
      // ['frontend/', 'Frontend Development'],
      {
        title: 'Tutorials',
        collapsable: false,
        children: [
          'tutorials/case-study',
          'tutorials/videos',
        ]
      },
    ]
  },
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer')
    ]
  },
  plugins: [
    [
      '@vuepress/plugin-google-analytics',
      {
        'ga': 'UA-137036636-1'
      }
    ]
  ]
}