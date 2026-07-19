/** Codex 业务模块：下拉导航 + 多级侧边栏 */
const codexRootSidebar = [
  {
    text: 'Codex 使用教学',
    items: [
      { text: '入门篇', link: '/codex/Codex 使用指南（基础篇·教科书完整版）.md' },
      { text: '进阶篇', link: '/codex/Codex 使用指南（进阶篇·教科书完整版）.md' },
      {
        text: 'Codex 高级篇',
        items: [
          { text: '高级篇完整教程', link: '/codex/advanced/Codex 使用指南（高级篇·教科书完整版）.md' },
          { text: '高级篇2完整教程', link: '/codex/advanced/Codex 使用指南（高级篇2·指令_Agent_Model_Skills 全解手册）.md' },
        ]
      }
    ]
  },
  {
    text: 'Codex 查表',
    items: [
      { text: '斜杠指令极简速查表', link: '/codex/lookup/Codex-CLI v0.142.0 斜杠指令极简速查表' },
    ]
  }
]

const codexAdvancedSidebar = [
  {
    text: '高级篇',
    items: [
      { text: '高级篇2完整教程', link: '/codex/advanced/Codex 使用指南（高级篇2·指令_Agent_Model_Skills 全解手册）.md' },
    ]
  }
]

export default {
  // 下拉式导航菜单
  navItem: {
    text: 'Codex',
    items: [
      { text: "Codex 基础", link: 'codex/basic' },
      {
        items: [
          { text: "Codex 高阶", link: 'codex/advanced' }
        ]
      },
    ]
  },
  // 多路由侧边栏映射
  sidebarMap: {
    '/codex/': codexRootSidebar,
    '/codex/advanced/': codexAdvancedSidebar
  }
}