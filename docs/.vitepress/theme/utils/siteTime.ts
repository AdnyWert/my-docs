/**
 * 计算建站时长
 * @param startTime 建站起始时间戳/日期字符串
 * @returns {years, days, hours, minutes, seconds}
 */
export function calcSiteRunTime(startTime: string | number) {
  const start = new Date(startTime).getTime()
  const now = Date.now()
  let diff = now - start
  if (diff <= 0) return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }

  // 一年固定365天简易计算（无需闰年复杂算法，文档站够用）
  const oneYear = 365 * 24 * 60 * 60 * 1000
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000
  const oneSecond = 1000

  const years = Math.floor(diff / oneYear)
  diff = diff % oneYear

  const days = Math.floor(diff / oneDay)
  diff = diff % oneDay

  const hours = Math.floor(diff / oneHour)
  diff = diff % oneHour

  const minutes = Math.floor(diff / oneMinute)
  diff = diff % oneMinute

  const seconds = Math.floor(diff / oneSecond)

  return { years, days, hours, minutes, seconds }
}