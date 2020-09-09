//用接口的方式也是可以的，但是太麻烦
// interface Admin{
//     name:string,
//     privileges:string[],
// }
// interface Employee{
//     name:string,
//     startDate:Date;
// }
//
// interface ElevatedEmployee extends Admin, Employee{
//
// }

//交叉类型
type Admin={
    name:string,
    privileges:string[],
}
type Employee={
    name:string,
    startDate:Date;
}

type ElevatedEmployee=Admin & Employee;



const e1:ElevatedEmployee={
    name:'Max',
    privileges:['create-server'],
    startDate:new Date()
}

type Combinable=string|number;
type Numeric=number |  boolean;
type Universal=Combinable  & Numeric;


