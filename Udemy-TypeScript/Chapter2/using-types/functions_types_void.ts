function add(n1:number,n2:number):number{
    return n1+n2;
}

function printResult(num:number):void{
    console.log('Result:',+num);

}
function printResults(num:number):undefined{
    console.log('Result:',+num);
    return

}

printResult(add(5,12));
