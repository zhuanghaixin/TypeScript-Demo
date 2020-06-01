//private,protected,public 访问类型
// @ts-ignore
class Person{
    public name:string|undefined
    public sayHi(){

        console.log('hi')
    }

}
// @ts-ignore
const person=new Person()
person.name='dell'
console.log(person.name)
person.sayHi()
