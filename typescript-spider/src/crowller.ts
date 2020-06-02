import superagent from 'superagent'
import cheerio from 'cheerio'

interface Product {
    productName: string,
    price: number
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

    //每个函数只执行一个功能
    async initSpiderProcess() {
        const html = await this.getRawHtml()
        console.log(html)
        const courseResult = this.getProductInfo(html)
    }

    constructor() {
        this.initSpiderProcess()
    }
}

const croller = new Crowller()


