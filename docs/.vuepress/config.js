module.exports = {
  title: 'superV',
  description: 'A platform for Laravel',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/superv/platform' },
    ],
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        children: [
          '/introduction/Features',
          '/introduction/Terminology',
        ]
      },
      {
        title: 'Getting Started',
        collapsable: false,
        children: [
          ['/getting-started/Installation', 'Installation'],
          ['/getting-started/Configuration', 'Configuration'],
        ]
      },
      {
        title: 'Core Concepts',
        collapsable: false,
        children: [
          '/concepts/Addons',
          '/concepts/Migrations',
          '/concepts/Navigation',
          '/concepts/Ports',
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