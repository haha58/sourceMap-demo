import axios from 'axios'
import sourceMap from 'source-map-js'

// 加载source-map文件得到文件内容，然后通过source-map-js解析这个文件内容
const LoadSourceMap = async (url: string) => {
    return await axios.get(url)
}
// // stackFrame.fileName 就是报错的Js代码，需要根据这个Js 获取到对应的source-map
const findCodeBySourceMap = async (stackFrame: any) => {
    //获取map文件
    const sourceData: any = await LoadSourceMap(stackFrame.fileName + '.map')
    const fileContent = sourceData.data
    //解析map文件
    const consumer = await new sourceMap.SourceMapConsumer(fileContent)
    // 通过报错位置查找到对应的源文件名称以及报错行数
    const lookUpResult = consumer.originalPositionFor({
        line: stackFrame.lineNumber,
        column: stackFrame.columnNumber
    })
    // 那么就可以通过 sourceContentFor 这个方法找到报错的源代码
    const code = consumer.sourceContentFor(lookUpResult.source)
    console.log(code, '还原之后的 code')
}
export { findCodeBySourceMap }