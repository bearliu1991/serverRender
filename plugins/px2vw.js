import { px2vwConfig } from '../assets/js/config'

const createPxReplace = function (opts) {
    return function (px) {
        if (!px) return ''
        const pixels = parseFloat(px)
        if (pixels <= opts.minPixelValue) return px
        const parsedVal = toFixed(
            (pixels / opts.viewportWidth) * 100,
            opts.unitPrecision
        )
        return parsedVal === 0 ? '0' : parsedVal + opts.viewportUnit
    }
}

const toFixed = function (number, precision) {
    const multiplier = Math.pow(10, precision + 1)
    const wholeNumber = Math.floor(number * multiplier)
    return (Math.round(wholeNumber / 10) * 10) / multiplier
}

export default ({ app }, inject) => {
    inject('px2vw', (px, ops = {}) => {
        const opts = Object.assign(px2vwConfig, ops)
        return createPxReplace(opts)(px)
    })
}
