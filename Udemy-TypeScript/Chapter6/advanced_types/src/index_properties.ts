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
type Admin = {
    name: string,
    privileges: string[],
}
type Employee = {
    name: string,
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;


function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name:' + emp.name)
    if ('privileges' in emp) {
        console.log('Privileges:' + emp.privileges)
    }
    if ('startDate' in emp) {
        console.log('Privileges:' + emp.startDate)
    }
}

printEmployeeInfo(e1);


class Car {
    drive() {
        console.log('Driving ....')
    }

}

class Truck {
    drive() {
        console.log('Driving ....')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount)
    }
}

type Vehicle = Car | Truck;
const v1 = new Car()
const v2 = new Truck()

function useVechicle(vehicle: Vehicle) {
    vehicle.drive()
    // if('loadCargo' in vehicle){
    //     vehicle.loadCargo(1000)
    //
    // }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVechicle(v1)
useVechicle(v2)

interface Bird {
    type: 'bird';
    flyingSpeed: number
}

interface Horse {
    type: 'horse';
    runningSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    // if('flyingSpeed' in animal)
    // console.log("Moving with speed"+animal.flyingSpeed)
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving  at speed  ' + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10})

// const paragraph=document.querySelector('p')
// const paragraph=document.getElementById('message-output')
// console.log(paragraph);

const userInputElement = <HTMLInputElement>document.getElementById('user-input')  //type casting

const userInputElement_1 = document.getElementById('user-input')! as HTMLInputElement;

userInputElement.value = 'Hi there';
userInputElement_1.value = 'Hello world'


//或者这么写完

const userInputElement_2 = document.getElementById('user-input')!;
if (userInputElement_2) {
    (userInputElement_2 as HTMLInputElement).value = 'XXX';
}


//index properties
interface ErrorContainer { //{ email:'Not a valid email',username:'Must start  with character'}
    // id:number;//Property 'id' of type 'number' is not assignable to string index type 'string'.
    id: string;

    [prop: string]: string;  //我不知道正确的属性名,但我知道是属性名是string类型

}

const errorBag:ErrorContainer={
    id:"12",
    email: 'Not a valid emial',
    username:'Must start  with character'
}


