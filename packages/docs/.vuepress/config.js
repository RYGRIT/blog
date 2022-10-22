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
        text: '前端',
        items: [
          {
            text: 'JavaScript',
            items: [
              { text: 'Basic', link: '/frontend/javascript/basic.html' },
              { text: 'Advance', link: '/frontend/javascript/advance.html' }
            ]
          },
          { text: 'TypeScript', link: '/frontend/typescript' },
          { text: 'Vue', link: '/frontend/vue' },
          { text: 'React', link: '/frontend/react' }
        ]
      },
      { text: '杂文', link: '/other/' },
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
            { title: '生成器', path: '/fe/js/Generator' }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
      }
    ]
  ]
}
