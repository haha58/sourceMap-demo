import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ErrorStackParser from 'error-stack-parser'
import { findCodeBySourceMap } from './utils/index'

const app=createApp(App)

app.config.errorHandler=(err,vm)=>{
    const errorStack=ErrorStackParser.parse(err as Error)
    console.log("errorStack",errorStack)
    //错误栈中第一个才是报错的位置
    findCodeBySourceMap(errorStack[0])
}

app.mount('#app')