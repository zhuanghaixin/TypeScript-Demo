
//属性可有可无 属性只读
// interface Person{
//     readonly name:string
//     age?:number
// }
interface Person{
    name:string
    age?:number
    [propName:string]:any
    say():string
}
//老师继承类
interface Teacher extends Person{
    teach():string
}

//接口还可以定义函数类型
interface SayHi{
    (word:string):string
}



type Person1={
    name:string
}
// type Person1=string
//interface和type的区别  Person1可以代表string，但是Person就无法代替string,只能代表函数或对象
const getPersonName=(person:{name:string})=>{
    console.log(person.name)
}

const setPersonName=(person:{name:string},name:string)=>{
    person.name=name
}

const getPersonName1=(person:Person)=>{
    console.log(person.name)
}

const setPersonName1=(person:Teacher,name:string):void=>{
    person.name=name
}

const person={
    name:'Hisen',
    age:12,
    sex:'xx', //多传一个'sex'是不会报错的
    say(){return 'hello'},
    teach(){
        return '教书'
    }

}

getPersonName1(person)
//但是如果是字面量的形式，就会报错。因为这时候，typescript会进行强校验。
getPersonName1({
    name:'Hisen',
    age:12,
    sex:'xx', //多传一个'sex'是不会报错的
    say(){
        return 'hello'
    }
})
setPersonName1(person,'lee')

//类应用一个接口
class UserS implements Person{
   name='dell'
    height=13
    say(){
       return 'hello'
    }

}
const say:SayHi=(word:string)=>{
    return word
}
