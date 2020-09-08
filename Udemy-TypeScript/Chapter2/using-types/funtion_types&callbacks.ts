function add(n1:number,n2:number):number{
    return n1+n2;
}

function printResult(num:number):void{
    console.log('Result:',+num);

}
function addAndHandle(n1:number,n2:number,cb:(num:number)=>void){
    const result=n1+n2;
    cb(result);
}

printResult(add(5,12));

// let combineValues:Function;
let combineValues:(a:number,b:number)=>number;  //声明函数类型

combineValues=add;
// combineValues=5; // app.js:11 Uncaught TypeError: combineValues is not a function
// combineValues=printResult;

console.log(combineValues(8,8));


addAndHandle(10,20,(result)=>{
    console.log('result',result);
    return result;
})

