import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import ProductAnalyzer from './ProductAnalyzer'
// import AnotherProductAnalyzer from './AnotherProductAnalyzer'

export interface Analyzer {
    analyze: (html: string, filePath: string) => string

}

// //json结构
// {
//     1591113666686: [
//     { productName: 'html', price: 18 },
//     { productName: 'css', price: 18 },
//     { productName: 'javascript', price: 18 },
//     { productName: 'nodejs', price: 48 },
//     { productName: 'react', price: 58 },
//     { productName: 'vue', price: 68 }
// ],
//     1592234434443: [
//     { productName: 'html', price: 18 },
//     { productName: 'css', price: 18 },
//     { productName: 'javascript', price: 18 },
//     { productName: 'nodejs', price: 48 },
//     { productName: 'react', price: 58 },
//     { productName: 'vue', price: 68 }
// ],
// }
class Crowller {
    // private secret='secretKey'
    // private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
    //     // private url = "http://www.thenewstep.cn/msonline/"
    //     // private url="https://zhuanghaixin.cn"
    // private url = "http://www.dell-lee.com"
    private filePath = path.resolve(__dirname, '../data/product.json')
    // async getRawHtml(){
    //     //因为返回值是Promise
    //     const result=await superagent.get(this.url)
    //     console.log(result.text)
    //     this.getProductInfo(result.text)
    // }
    // constructor(){
    //     this.getRawHtml()
    //     console.log('constructor')
    // }
    //爬取html
    private async getRawHtml() {
        //因为返回值是Promise
        const result = await superagent.get(this.url)
        return result.text
    }
    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    //每个函数只执行一个功能
    private async initSpiderProcess() {
        //爬取html
        const html = await this.getRawHtml()
        console.log(html)

        //存储数据 生成json  最后返回一个字符串
        const fileContent = this.analyzer.analyze(html,this.filePath)


        //写文件
        this.writeFile(fileContent)

    }
    constructor(private url: string, private analyzer: Analyzer) {
        this.initSpiderProcess()
    }
}
// const analyzer = new ProductAnalyzer()
// const analyzer = new ProductAnalyzer()
const analyzer=ProductAnalyzer.getInstance()
const url = "http://www.thenewstep.cn/"
new Crowller(url, analyzer)



