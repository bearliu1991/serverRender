// 定义配置数据

export const viewThreshold = 890
/**
 * px2vm 插件配置
 */
export const px2vwConfig = {
    unitToConvert: 'px',
    viewportWidth: 375, // 默认设计稿宽度
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
    rootValue: 37.5, // 结合flexible.js 视觉稿大小时，根元素的字体大小, 修改该值请同步到/static/flexible.js 中
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
