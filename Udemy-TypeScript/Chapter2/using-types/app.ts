let userInput:unknown;
let userName:string;
//unknown可以存储任何类型   unknown 比 any 是一个更好的选择 unknown不被允许做任何事，他至少可以类型检查
userInput=5;
userInput='Max';
// userName=userInput; //type  'unknown ' is not assignable to type 'String'

if(typeof userInput==='string'){
    userName=userInput
}

//不会返回任何东西
function generateError(message:string,code:number):never{
    throw{
        message:message,
        errorCode:code
    }
}
const result=generateError('An error occurred',500);

console.log(result)
