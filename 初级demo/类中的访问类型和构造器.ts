//private,protected,public 访问类型
//
class Person{
    // public name:string
    // private name:string
    protected name:string='庄海鑫'
    public sayHi(){
        this.name
        console.log('hi')
    }

}
class Teacher extends Person{
    public sayBye(){

        console.log('我到名字',this.name)
    }
}
const person=new Person()
// person.name='Hisen'
// console.log(person.name)
person.sayHi()

const teacher=new Teacher()
console.log(teacher.sayBye())


//构造器，当new的时候，constructor执行
// class Animal{
//     传统写法
//     public name:string
//     constructor(name:string){
//         this.name=name
//     }
// }
class Animal{
    //简化写法
    constructor(public name:string){
    }
}
const animal=new Animal('dog')

console.log(animal.name)

//子类继承父类的时候，如果父类有构造器，子类声明构造器的时候，子类一定要手动调用super
class Cat extends Animal{

    constructor(public age:number){
      super('kity')
    }
}
const cat=new Cat(3)

console.log(    '猫的名字',cat.name)
console.log(    '猫的年龄',cat.age)
