// const person:{
//     name:string,
//     age: number
// }
// const person:{
//     name:string,
//     age:number,
//     hobbies:string[],
//     role:[number,string]
// }={  //这么写更好，让typescript推断出
//     name:'Maximilian',
//     age:30,
//     hobbies:['Sports','Cooling'],
//     //元组 tuple 固定长度的数组
//     role:[2,'author']
// // }
// const ADMIN=0;
// const READ_ONLY=12;
// const AUTHOR=2;
enum Role {ADMIN=5,READ_ONLY=100,AUTHOR}
const person={
    name:'Maximilian',
    age:30,
    hobbies:['Sports','Cooling'],
    //元组 tuple 固定长度的数组
    role:Role.ADMIN
}

let favoriteActivites:string[];
favoriteActivites=['Sports','1'];
// let favoriteActivites:any[];
// favoriteActivites=['Sports',1];

for(const hobby of person.hobbies){
    console.log(hobby.toUpperCase());
    // console.log(hobby.map())  //!!! ERROR !!!
}

if(person.role===Role.AUTHOR){
    console.log('is author')
}

