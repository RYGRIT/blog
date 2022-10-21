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
    sidebar: [
      {
        title: '欢迎学习',
        collapsable: false,
        path: '/',
        children: [{ title: '学前必读', path: '/' }]
      },
      {
        title: '基础学习',
        collapsable: false,
        path: '/frontend/javascript/DataTypes',
        children: [
          { title: '数据类型', path: '/frontend/javascript/DataTypes' },
          { title: 'DOM', path: '/frontend/javascript/DOM' },
          { title: 'BOM', path: '/frontend/javascript/BOM' }
        ]
      }
    ]
  }
}
