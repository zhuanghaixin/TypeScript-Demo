//literal type 文字类型
function combine(
    input1:number|string,
    input2:number|string,
    resultConversion:'as-number'|'as-text' ){
    let result;
    if(typeof input1==='number' && typeof input2==='number' || resultConversion==='as-number'){
        result=+input1+ +input2;
    }else{
        result=input1.toString()+input2.toString();
    }

    if(resultConversion==='as-number'){
        return +result;
    }else{
        return result.toString();
    }

    return result;
}


const combinedAges=combine(30,26,'as-number');
console.log(combinedAges)

const combineStringAges=combine('30','26','as-number');
console.log(combineStringAges)

const combinedNames=combine('Max','Anna','as-text');

console.log(combinedNames)
