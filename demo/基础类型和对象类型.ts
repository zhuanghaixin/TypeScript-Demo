//基础类型 void,null,undefined,symbol,boolean,void
const count:number=123
const studentName:string='庄海鑫'

//对象类型

//对象
const teacher:{
  name:string,
  age:number
}={
  name:'Hisen',
  age:15
}

//数组
const numbers:number[]=[1,2,3]

class Person{

}
//类
const Hisen:Person=new Person()

//函数   getTotal 函数返回number
const getTotal:()=>number=()=>{
    return 1
}

const func=(str:string):number=>{
    return parseInt(str,10)
}
const func1:(str:string)=>number=(str)=>{
    return parseInt(str,10)
}

//其他case
interface Person{
    name:string
}
const rawData='{"name":"dell}'
const newData:Person=JSON.parse(rawData)

let temp:number| string=123
temp='456'
