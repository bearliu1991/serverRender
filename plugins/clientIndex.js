// 只用于客户端的插件入口，相当于vue项目中的入口文件main.js
async function loadPc() {
    await import('@vant/touch-emulator')
}

export default ({ app: { store } }) => {
    // TODO: 只有在pc端才引入
    if (process.client) {
        store.state.terminal === 'pc' && loadPc()
    }
}
