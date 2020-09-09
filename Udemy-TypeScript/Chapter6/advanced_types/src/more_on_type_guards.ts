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


function add(a:Combinable,b:Combinable){
    if(typeof a==='string'|| typeof b==='string'){
        return a.toString()+b.toString
    }
    return a + b;
}
type UnknownEmployee = Employee | Admin;
function printEmployeeInfo(emp:UnknownEmployee){
    console.log('Name:' +emp.name)
    if('privileges' in emp ){
        console.log('Privileges:' +emp.privileges)
    }
    if('startDate' in emp ){
        console.log('Privileges:' +emp.startDate)
    }
}

printEmployeeInfo(e1);


class Car{
    drive(){
        console.log('Driving ....')
    }

}
class Truck{
    drive(){
        console.log('Driving ....')
    }
    loadCargo(amount:number){
        console.log('Loading cargo...'+amount)
    }
}
type Vehicle=Car|Truck;
const v1=new Car()
const v2=new Truck()

function useVechicle(vehicle:Vehicle){
    vehicle.drive()
    // if('loadCargo' in vehicle){
    //     vehicle.loadCargo(1000)
    //
    // }
    if(vehicle instanceof Truck){
        vehicle.loadCargo(1000)
    }
}

useVechicle(v1)
useVechicle(v2)






