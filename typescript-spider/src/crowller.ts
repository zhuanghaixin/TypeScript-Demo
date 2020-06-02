import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface Product {
    productName: string,
    price: number
}

interface ProductResult {
    time: number,
    data: Product[]
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

interface Content {
    [propName: number]: Product[]
}


class Crowller {
    // private secret='secretKey'
    // private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
    //     // private url = "http://www.thenewstep.cn/msonline/"
    //     // private url="https://zhuanghaixin.cn"
    // private url = "http://www.dell-lee.com"
    private url = "http://www.thenewstep.cn/"

    getProductInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.product')
        console.log(courseItems.length)
        const productInfos: Product[] = []
        courseItems.map((index, element) => {
            const elementProductName = $(element).find('.product-name')
            const productName = elementProductName.text()
            const elementPrice = $(element).find('.product-price')
            const price = parseInt(elementPrice.text())
            console.log(productName, price)
            productInfos.push({
                productName, price
            })
        })
        return {
            time: new Date().getTime(),
            data: productInfos
        }

    }

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

    async getRawHtml() {
        //因为返回值是Promise
        const result = await superagent.get(this.url)
        return result.text
    }

    //将传的数据生成json文件
    generateJsonContent(productInfo: ProductResult) {
        console.log(444444)
        console.log(productInfo)
        const filePath = path.resolve(__dirname, '../data/product.json')
        console.log(filePath)
        //如果文件存在，则读出来，如果文件不存在，则创建文件的初始内容
        let fileContent: Content = {}
        console.log("fs.existsSync(filePath)")
        console.log(fs.existsSync(filePath))
        if (fs.existsSync(filePath)) {
            //读取内容
            console.log(111111)
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        console.log(111)
        fileContent[productInfo.time] = productInfo.data
        console.log(22222)

        return fileContent


    }

    //每个函数只执行一个功能
    async initSpiderProcess() {
        const html = await this.getRawHtml()
        console.log(html)
        const productInfo = this.getProductInfo(html)
        console.log(productInfo)
        //生成json
        const fileContent = this.generateJsonContent(productInfo)
        //写文件
        const filePath = path.resolve(__dirname, '../data/product.json')
        fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }

    constructor() {
        this.initSpiderProcess()
    }
}

const croller = new Crowller()


