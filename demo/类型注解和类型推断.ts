//type annotation 类型注解  我们来告诉TS变量是什么类型
let count:number
count=123
//type inference 类型推断

let countInference=123

// const firstNumber=1;
// const secondNumber=2;
//
// const total=firstNumber+secondNumber

// @ts-ignore
function getTotal(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

const total = getTotal(1, 1);
console.log(total);
