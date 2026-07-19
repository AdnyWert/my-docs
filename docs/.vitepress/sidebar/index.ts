// 导入各个模块侧边栏数据
import guideSidebar from './guide'
import codexSidebar from './codex'
import apiSidebar from './api'

/**
 * 获取全局侧边栏配置
 * 可在此扩展动态逻辑：环境判断、权限过滤、多语言、动态目录读取等
 */
export function getSidebar() {
  return {
    '/guide/': guideSidebar,
    '/codex/': codexSidebar.root,
    '/codex/advanced/': codexSidebar.advanced,
    '/api/': apiSidebar
  }
}