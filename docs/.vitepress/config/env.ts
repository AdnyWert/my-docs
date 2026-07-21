/** 环境域名配置 */
const envConfig = {
    // 本地SpringBoot后端地址
    dev: {
        baseUrl: 'http://127.0.0.1:8080/api'
    },
    // 线上部署后端域名
    production: {
        baseUrl: 'https://api.guizhi.com/api'
    }
}

export default envConfig