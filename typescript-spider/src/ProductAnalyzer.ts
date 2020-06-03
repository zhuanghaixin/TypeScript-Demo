import cheerio from "cheerio";
import fs from "fs";
import {Analyzer} from './crowller'
interface Product {
    productName: string,
    price: number
}
interface ProductResult {
    time: number,
    data: Product[]
}

interface Content {
    [propName: number]: Product[]
}

export default class ProductAnalyzer implements Analyzer{
    //分析数据，存储数据
  private  getProductInfo(html: string) {
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

    //将传的数据生成json文件
    generateJsonContent(productInfo: ProductResult,filePath:string) {
        console.log(444444)
        console.log(productInfo)

        console.log(filePath)
        //如果文件存在，则读出来，如果文件不存在，则创建文件的初始内容
        let fileContent: Content = {}
        console.log("fs.existsSync(filePath)")
        console.log(fs.existsSync(filePath))
        if (fs.existsSync(filePath)) {
            //读取内容s
            console.log(111111)
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        console.log(111)
        fileContent[productInfo.time] = productInfo.data
        console.log(22222)

        return fileContent
    }
    public analyze(html:string,filePath:string){
        //分析数据，存储数据
        const productInfo = this.getProductInfo(html)
        //生成json
        const fileContent = this.generateJsonContent(productInfo,filePath)
        return JSON.stringify(fileContent)

    }
}
