function add(n1:number,n2:number):number{
    return n1+n2;
}

function printResult(num:number):void{
    console.log('Result:',+num);

}


printResult(add(5,12));

// let combineValues:Function;
let combineValues:(a:number,b:number)=>number;  //声明函数类型

combineValues=add;
// combineValues=5; // app.js:11 Uncaught TypeError: combineValues is not a function
// combineValues=printResult;

console.log(combineValues(8,8));

