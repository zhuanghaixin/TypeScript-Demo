// function add(first:number,second:number):number{
//     return first+second
// }
// const taotal=add(1,2)

function sayHello(): void {
    console.log(123)

}

//never表示这个函数永远不会执行到最后
function errorEmitter(): never {
    throw new Error();
    console.log(123)
}

function error01Emitter(): never {
    while (true) {

    }
}

//对于函数参数解构，如何定义类型
function add({first, second}: { first: number, second: number }) {
    return first + second

    const total = add({first: 1, second: 2})
}

function getNumber({first}:{first: number}){
    return first
}
const number=getNumber({first:1})


