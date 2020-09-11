// 定义配置数据

/**
 * 屏幕适配相关配置 注意，修改本配置值时请同步到/static/js/flexible.js 中
 * /static/js/flexible.js 无法使用原因：
 * 1、flexible.js 只能客户端渲染，如果放在客户端的生命周期会出现适配延迟
 * 2、static文件夹下无法被打包
 * */

export const viewFitConfig = {
    viewThreshold: 890, // pc 、m站切换的阈值
    mWidth: 375, // m端-设计稿宽度
    pcWidth: 1920, // pc端-设计稿宽度
}

// 接口代理前缀
export const proxy = () => {
    const proxyConfig = {
        production: '/proxy', // 生产
        development: '/test', // 测试
    }
    return proxyConfig[process.env.NODE_ENV]
}
/**
 * px2vm 插件配置
 */
export const px2vwConfig = {
    unitToConvert: 'px',
    viewportWidth: viewFitConfig.mWidth, // 默认设计稿宽度
    unitPrecision: 1, // 指定`px`转换为视窗单位值的小数位数
    viewportUnit: 'vw',
    fontViewportUnit: 'vw', // vmin is more suitable.
    selectorBlackList: ['.pc-'], // 指定不需要转换为视窗单位的类
    propList: ['*'],
    minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
    mediaQuery: false, // 允许在媒体查询中转换`px`
    replace: true,
    landscape: false,
    landscapeUnit: 'vw',
    exclude: [/(\/|\\)(node_modules)(\/|\\)/, /PC.vue/g], // 不需要转化的文件
}

export const px2remConfig = {
    rootValue: viewFitConfig.mWidth / 10, // 结合flexible.js 视觉稿大小时，根元素的字体大小
    unitPrecision: 2, // 小数位数
    propWhiteList: [],
    propBlackList: [],
    exclude: false,
    selectorBlackList: [],
    ignoreIdentifier: false,
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
}
