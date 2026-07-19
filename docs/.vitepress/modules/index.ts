// 按导航从上到下顺序导入模块（导入顺序 = 顶部导航展示顺序）
import home from './home'
import guide from './guide'
import codex from './codex'
import api from './api'

// 统一收集所有业务模块
const modules = [home, guide, codex, api]

/**
 * 自动生成顶部导航 nav 数组
 */
// 显式标注返回类型 DefaultTheme.NavItem[]
export function getNav() {
  return modules
    .map(item => item.navItem)
    // 过滤不存在导航配置的模块，避免数组出现 undefined
    .filter(Boolean)
}

/**
 * 自动合并所有模块的侧边栏配置
 */
export function getSidebar() {
  const finalSidebar = {}
  modules.forEach(module => {
    // 只有存在才合并，规避 undefined 报错
    if (module.sidebarMap) {
      // @ts-ignore
      Object.assign(finalSidebar, module.sidebarMap)
    }

    // 批量给所有侧边栏分组自动开启折叠 + 默认收起
    // @ts-ignore
    Object.values(finalSidebar).forEach(groupList => {
      groupList.forEach(group => {
        if (group.items) {
          // group.collapsible = true // 无关变量
          if (group.collapsed == void 0)
            group.collapsed = true
        }
      })
    })

  })
  return finalSidebar
}