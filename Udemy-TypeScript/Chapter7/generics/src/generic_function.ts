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
function merge<T,U>(objA:T,objB:U){
    return Object.assign(objA,objB)
}
const mergeObj=merge<{name:string,hobbies:string[]},{age:number}>({name:'Ben',hobbies:['Sports']},{age:30})
const mergeObj2=merge({sex:'male'},{age:30})
console.log(mergeObj.name);
console.log(mergeObj2.sex);


