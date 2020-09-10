import { viewThreshold } from './config'

export const getTerminal = () => {
    const docEl = window.documentdocumentElement
    const width = docEl.getBoundingClientRect().width
    return width > viewThreshold ? 'pc' : 'mobile'
}

export const jsonStringify = (obj = {}) => {
    try {
        return JSON.stringify(obj)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`${obj} 使用jsonStringify 转化出错，请检查输入类型`)
    }
}

export const jsonParse = (string = '') => {
    try {
        return JSON.parse(string)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`${string} 使用jsonParse 转化出错，请检查输入类型`)
    }
}
