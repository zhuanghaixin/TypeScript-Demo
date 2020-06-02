// class Person {
//     constructor(private _name: string) {
//     }
//     get name() {
//         return this._name+' lee'
//     }
//     set name(name: string) {
//         const realName=name.split(' ')[0]
//         this._name=realName
//     }
//
//
//
// }
//
// const person = new Person('庄海鑫')
// console.log(person.name)
// person.name='庄海鑫 Hisen'
// console.log(person.name)

// class Demo1{
//        private  constructor(){
//
//         }
// }
// const demo01=new Demo1()
// const demo02=new Demo1()
// console.log(demo01)
// console.log(demo02)
//单例模式
//static表示把当前的东西挂载在类上而不是挂载在类的实例上
class Demo{
   private static instance:Demo
    private constructor(public name:string){
    }
    static getInstance(name:string){
       if(!this.instance){
           this.instance = new Demo(name)  //第一次执行，this.instance是undefined,所以就创建了new Demo(）实例
       }
       return this.instance

    }
}
//通过Demo.getInstance()返回Demo的唯一实例
const demo1=Demo.getInstance("庄海鑫")
const demo2=Demo.getInstance("Hisen")
console.log(demo1)
console.log(demo2)
