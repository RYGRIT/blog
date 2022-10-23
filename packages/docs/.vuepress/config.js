module.exports = {
  title: 'RYGrit Blog',
  description: '学习记录',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    type: 'blog',
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'Javascript',
        items: [
          {
            text: '基础学习',
            items: [
              { text: '数据类型', link: '/fe/js/DataTypes' },
              { text: 'DOM', link: '/fe/js/DOM' },
              { text: 'BOM', link: '/fe/js/BOM' }
            ]
          },
          {
            text: '进阶学习',
            items: [
              { text: 'this', link: '/fe/js/this' },
              { text: '迭代器', link: '/fe/js/Iterator' },
              { text: '生成器', link: '/fe/js/Generator/' },
              { text: 'Promise', link: '/fe/js/Promise/' },
              { text: '异步编程', link: '/fe/js/async-await/' }
            ]
          }
        ]
      },
      {
        text: 'TypeScript',
        items: [{ text: '基础学习' }, { text: '进阶学习' }]
      },
      { text: 'Vue', items: [{ text: '基础学习' }, { text: '进阶学习' }] },
      { text: 'React', items: [{ text: '基础学习' }, { text: '进阶学习' }] },
      { text: 'Others', link: '/other/' },
      {
        text: "RYGrit's 博客整理",
        items: [
          { text: 'GitHub', link: 'https://github.com/RYGRIT' },
          { text: '掘金', link: 'https://juejin.cn/user/3184616084871742' }
        ]
      }
    ],
    sidebar: {
      '/fe/js/': [
        {
          title: '基础学习',
          collapsable: false,
          children: [
            { title: '数据类型', path: '/fe/js/DataTypes' },
            { title: 'DOM', path: '/fe/js/DOM' },
            { title: 'BOM', path: '/fe/js/BOM' }
          ]
        },
        {
          title: '进阶学习',
          collapsable: false,
          children: [
            { title: 'this', path: '/fe/js/This' },
            { title: '迭代器', path: '/fe/js/Iterator' },
            { title: '生成器', path: '/fe/js/Generator' },
            { title: '异步编程', path: '/fe/js/async-await' }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'tip'
      }
    ]
  ]
}
