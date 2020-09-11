// const names:Array<string>=['Max','Manuel']
// const names_1:any[]=['Max',1,{'sex':'male','age':12}]
//
// const promise:Promise<string>=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('This is a test')
//     },2000)
// });
//
// promise.then(data=>{
//     data.split(' ')
// })

function merge_old(objA:object,objB:object){
    return Object.assign(objA,objB)

}

// const mergeObj_1=merge_old({name:'Max'},{age:30})
// mergeObj_1.name  // Property 'name' does not exist on type 'object

//这种 as 的方法显然·是笨重的冗长的
const mergeObj_1=merge_old({name:'Max'},{age:30}) as  {name:string,age:number}
mergeObj_1.name

//这时候，我们应该使用generic function
function merge<T extends object,U extends number>(objA:T,objB:U){
    return Object.assign(objA,objB)
}
const mergeObj=merge({name:'Ben',hobbies:['Sports']},30)
//{name: "Ben", hobbies: Array(1)}
// hobbies: ["Sports"]
// name: "Ben"
// __proto__: Object
//这里没有 30，因为不是对象
console.log(mergeObj)

interface Lengthy{
    length: number
}

function countAndDescribe<T extends Lengthy>(element:T):[T,string]{
    let descriptionText='Got no value'
    if(element.length===1){
        descriptionText='Got 1 elements.';
    }else if(element.length>1){
        descriptionText='Got  '+element.length +'  elements.length'
    }
    return [element,descriptionText]
}

console.log(countAndDescribe(['sports','cooking']))
// console.log(countAndDescribe(10)  // Argument of type '10' is not assignable to parameter of type 'Lengthy'.

function extractAndConvert<T extends object,U extends keyof T >(obj:T,key:U){
    return 'Value ：' + obj[key]
}

console.log(extractAndConvert({name:'Max'},'name'))

class DataStorage<T extends string | number |boolean>{
    private data:T[]=[];
    addItem(item:T){
        this.data.push(item)
    }
    removeItem(item:T){
        if(this.data.indexOf(item)===-1){
            return
        }
        this.data.splice(this.data.indexOf(item),1)
    }
    getItems(){
        return [...this.data]
    }
}
const textStorage=new DataStorage<string>()
// textStorage.addItem('Max')
// console.log(textStorage,'第一次')
// textStorage.addItem('Manu')
// console.log(textStorage,'第二次')
// textStorage.removeItem('Max')
// console.log(textStorage,'第三次')
// textStorage.getItems()
// console.log(textStorage,'第四次')

const numberStorage=new DataStorage<number>()


//出现意外的情况   this.data.splice(this.data.indexOf(item),1) 在对象中不成立，所以总是删掉最后一个

// const objectStorage=new DataStorage<object>()
// 如果改正， 传入相同的对象
// const maxobj={name:'Max'}
// objectStorage.addItem(maxobj)
// console.log(objectStorage)
// objectStorage.addItem({name:'Manu'})
// console.log(objectStorage)
//
// objectStorage.removeItem(maxobj)
// // console.log(objectStorage)
//
// // console.log(objectStorage.getItems());

