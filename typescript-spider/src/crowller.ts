import superagent from 'superagent'
class Crowller{
    // private secret='secretKey'
    // private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
    //     // private url = "http://www.thenewstep.cn/msonline/"
    //     // private url="https://zhuanghaixin.cn"
    private url = "http://www.dell-lee.com"
    private rawHtml=''

    async getRawHtml(){
        //因为返回值是Promise
        const result=await superagent.get(this.url)
        console.log(result.text)
        this.rawHtml=result.text

    }
    constructor(){
        this.getRawHtml()
        console.log('constructor')
    }
}
const croller = new Crowller()

