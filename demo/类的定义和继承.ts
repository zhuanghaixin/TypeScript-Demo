class Animal{
    name='Hisen'
    getName(){
        return this.name
    }
}
const animal = new Animal()
console.log(animal.getName())

class Dog extends Animal{
    getPetName(){
        return 'Pet'
    }
    getName(){
       return  super.getName()+' pet'

    }
}
const dog=new Dog()
console.log(dog.getPetName())
console.log(dog.getName())

