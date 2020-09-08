//"strictNullChecks    const button=document.querySelector('button')!;

const button = document.querySelector("button")!; //! 告诉typescript 开发者知道这个按钮存在 或者是此操作将产生一个空值

// button.addEventListener('click',()=>{
//     console.log('Clicked')
// })

//如果你不知道按钮存在

// if(button){
//     button.addEventListener('click',()=>{
//         console.log('Clicked')
//     })
// }

// "strictBindCallApply": true,
function clickHandler(message: string) {
  let user = "max"; //"noUnusedLocals": true,
  console.log("Clicked" + message);
}

if (button) {
  button.addEventListener("click", clickHandler.bind(null, "You're welcome"));
}

// "noUnusedLocals": true,
// "noUnusedParameters": true,
// "noImplicitReturns": true,
// "noFallthroughCasesInSwitch": true,
function add(n1: number, n2: number) {
  //"noUnusedParameters": true,
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return; //"noImplicitReturns": true,
}
add(5, 6);
