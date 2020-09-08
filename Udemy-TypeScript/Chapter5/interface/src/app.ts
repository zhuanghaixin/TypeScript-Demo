
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name?: string;
    outputName?: string;  //optional property 额外的属性
    // outputName:string;
}

//扩展接口 也可以扩展多个
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 30;

    constructor(n?: string) {
        this.name = n;
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + '' + this.name);
        } else {
            console.log('Hi')
        }
    }
}

let user1: Greetable;
user1 = new Person()
// user1.name='Manu'//Cannot assign to 'name' because it is a read-only property.
user1.greet("Hello - I am")
console.log(user1)


