import './assets/main.css'
import ErrorStackParser from 'error-stack-parser'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
// import { findCodeBySourceMap } from './utils/index'
const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
// import { findCodeBySourceMap } from './utils/index'

app.config.errorHandler=(err:Error,vm?:any)=>{
    const errorStack = ErrorStackParser.parse(err as Error)
    const jsError = {
        stack_frames: errorStack,
        message: err.message,
        stack: err.stack,
        error_name: err.name
    }
    vm!.$message.error(`您触发了一个${err.name} 错误`)
    localStorage.setItem('jsErrorList', JSON.stringify(jsError))
    console.log("errorStack",errorStack)
    //错误栈中第一个才是报错的位置
    // findCodeBySourceMap(errorStack[0])
}

app.mount('#app')