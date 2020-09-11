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

