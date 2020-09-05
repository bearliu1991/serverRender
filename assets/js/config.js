// 定义配置数据

/**
 * px2vm 插件配置
 */
export const px2vwConfig = {
    unitToConvert: 'px',
    viewportWidth: 375, // 默认设计稿宽度
    unitPrecision: 1, // 指定`px`转换为视窗单位值的小数位数
    viewportUnit: 'vw',
    fontViewportUnit: 'vw', // vmin is more suitable.
    selectorBlackList: [], // 指定不需要转换为视窗单位的类
    propList: ['*'],
    minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
    mediaQuery: false, // 允许在媒体查询中转换`px`
    replace: true,
    landscape: false,
    landscapeUnit: 'vw',
}
