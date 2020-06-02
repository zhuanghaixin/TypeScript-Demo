abstract class Geom{
    width: number
    radius:number
    getType(){
        return 'Geom'
    }
    abstract getArea():number

}
class Circle extends Geom{
     getArea(){
         return 123
     }
}
const circle=new Circle()
console.log(circle.getType())
const teacher={
    name:'dell'
}

const student={
    name:'lee',
    age:18
}
interface Person{
    name:string
}
interface Teacher extends Person{
    teachingAge:number
}
interface Student extends Person{
    age:number
}
interface Driver{
    name:string
    age:number
    car:string
}
const getUserInfo=(user:Person)=>{
    console.log(user.name)
}
//
console.log(getUserInfo(teacher));
console.log(getUserInfo(student));


