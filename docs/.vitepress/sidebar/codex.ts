/** Codex 模块侧边栏 */
const codexRoot = [
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

const codexAdvanced = [
  {
    text: '高级篇',
    items: [
      { text: '高级篇2完整教程', link: '/codex/advanced/Codex 使用指南（高级篇2·指令_Agent_Model_Skills 全解手册）.md' },
    ]
  }
]

export default {
  root: codexRoot,
  advanced: codexAdvanced
}