// type AddFn=(a:number,b:number)=>number;

interface AddFn{
    (a:number,b:number):number;
}

let add:AddFn;
add=(n1:number,n2:number)=>{
    return n1+n2;
}

interface Named{
    readonly name: string;
}

//扩展接口 也可以扩展多个
interface Greetable extends Named{
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

//implements多个接口
// class Person implements Greetable,Named{
//     name:string;
//     constructor(n:string){
//         this.name=n;
//     }
//     greet(phrase:string){
//         console.log(phrase+''+this.name);
//     }
// }


//
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


