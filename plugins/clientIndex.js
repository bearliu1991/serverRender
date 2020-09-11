// 只用于客户端的插件入口，相当于vue项目中的入口文件main.js
// import Observer from '../assets/js/observer'
import flexible from '../assets/js/flexible'

async function loadPc() {
    await import('@vant/touch-emulator')
}
export default ({ app: { store } }) => {
    // TODO: 只有在pc端才引入
    if (process.client) {
        store.state.terminal === 'pc' && loadPc()
        // 切换样式适配方案
        flexible(window, window.lib || (window.lib = {}))
        // m端、pc端页面自适应 切换显示的组件
        window.addEventListener('resize', () => {
            store.commit('SET_TERMINAL')
        })
    }
}
