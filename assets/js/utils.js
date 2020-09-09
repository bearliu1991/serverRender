import { viewThreshold } from './config'

export const getTerminal = () => {
    const docEl = window.documentdocumentElement
    const width = docEl.getBoundingClientRect().width
    return width > viewThreshold ? 'pc' : 'mobile'
}
