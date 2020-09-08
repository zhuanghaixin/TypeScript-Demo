// type Greetables={
//     readonly name:string;
//     greet(phrase:string):void;
// }

interface Greetable{
    readonly name:string;
    greet(phrase:string):void;
}

// interface AnotherGreetable{
//     name:string,
//     age: number,
//     greet(phrase:string):void;
// }
//接口可以implments 多个
// class Person implements Greetable,AnotherGreetable{
//
// }

class Person implements Greetable{
    name:string;
    constructor(n:string){
        this.name=n;
    }
    greet(phrase:string){
        console.log(phrase+''+this.name);
    }
}

let user1:Greetable;
user1=new Person('Max')
// user1.name='Manu'//Cannot assign to 'name' because it is a read-only property.
user1.greet("Hello - I am")
console.log(user1)


