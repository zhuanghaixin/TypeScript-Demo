function Logger(logString: string) {
    // console.log('LOGGING FACTORY')
    return function (constructor: Function) {
        // console.log(logString)
        // console.log(constructor)
    }
}

//类似于Angular @Component
function WithTemplate(template: string, hookId: string) {
    // console.log('TEMPLATE FACTORY')

    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        // const hookEl=document.getElementById(hookId)
        // const p =new originalConstructor();
        // if(hookEl){
        //     hookEl.innerHTML=template
        //     //我们让Person中的name'Max'赋给hookEl的h1
        //     hookEl.querySelector('h1')!.textContent=p.name
        // }
        return class extends originalConstructor {
            constructor(..._: any[]) { //这里没用到参数，所以用..._:any[]
                super()
                const hookEl = document.getElementById(hookId)
                // const p =new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template
                    //我们让Person中的name'Max'赋给hookEl的h1
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

@Logger('LOGGING')
// @Logger('LOGGING-PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Max'

    constructor() {
        // console.log('Creating person object...')
    }
}


//这里我们要给注释
// const pers=new Person()
//
// console.log(pers)

// --

//Accessor Decorator
function Log(target: any, propertyName: string | Symbol) {
    // console.log('Property decorator')
    // console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    // console.log('Accessor decorator')
    // console.log(target)
    // console.log(name)
    // console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    // console.log('Method decorator')
    // console.log(target)
    // console.log(name)
    // console.log(descriptor)
}

//Parameter Decorators
function Log4(target: any, name: string | Symbol, position: number) {
    // console.log('Parameter Decorator')
    // console.log(target)
    // console.log(name)
    // console.log(position)
}

class Product {
    //property decorator
    @Log
    title: string
    private _price: number
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive')
        }
    }

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    @Log3
    getPricewithMax(tax: number, @Log4 a: number) {
        return this._price * (1 + tax)
    }
}


const p1 = new Product('Book-1', 12)
const p2 = new Product('Book-2', 19)


// Creating an 'Autobind' Decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    // console.log('Autobind Decorator')
    // console.log(_)
    // console.log(_2)
    // console.log(descriptor)
    const originalMethod = descriptor.value  //showMessages
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {

            // console.log(this)
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor
}

class Printer {
    message = 'This works'

    @Autobind
    showMessage() {
        // console.log(this.message)
    }
}

const p = new Printer()
const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)

// --------

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]   //['required'.'positive']
    }
}



const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    console.log('Required Decorator')
    console.log('propName')
    console.log(propName) //title
    console.log(target)// {constructor: ƒ} constructor: class Course __proto__: Object
    console.log(target.constructor) //class Course {constructor(t, p) {this.title = t;this.price = p;}}
    console.log(target.constructor.name) //Course
    registeredValidators[target.constructor.name] = { // //todo 这样会导致属性重写
        ...registeredValidators[target.constructor.name],
        // [propName]: ['required']
        [propName]:[...registeredValidators[target.constructor.name][propName],'required']
    }
    console.log('registeredValidators')
    console.log(registeredValidators)   //{Course: {…}} Course: {price: Array(1)}__proto__: Object
    console.log(  ' registeredValidators[target.constructor.name]' )
    console.log(    registeredValidators[target.constructor.name] )  //{title: Array(1)}title: ["required"]__proto__: Object
}

function PositiveNumber(target: any, propName: string) {
    console.log('PositiveNumber Decorator')
    console.log('propName')
    console.log(propName) //price
    console.log(target)  // {constructor: ƒ} constructor: class Course __proto__: Object
    console.log(target.constructor)  //class Course {constructor(t, p) {this.title = t;this.price = p;}}
    console.log(target.constructor.name)   //Course
    registeredValidators[target.constructor.name] = {  //todo 这样会导致属性重写
        ...registeredValidators[target.constructor.name],
        // [propName]: ['positive']
        [propName]:[...registeredValidators[target.constructor.name][propName],'positive']

    }
    console.log('registeredValidators')
    console.log(registeredValidators)  //   //{Course: {…}} Course: {price: Array(1)}__proto__: Object
    console.log(  ' registeredValidators[target.constructor.name]' )
    console.log(    registeredValidators[target.constructor.name] )   //{title: Array(1)}title: ["required"]__proto__: Object
}

function validate(obj: any) {
    console.log('obj')
    console.log(obj)  //Course {title: "前端开发", price: 1000}
    console.log('obj.constructor')
    console.log(obj.constructor)
    console.log('obj.constructor.name')
    console.log(obj.constructor.name)  //Course
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    console.log('objValidatorConfig')
    console.log(objValidatorConfig)  //{price: Array(1)}
    if (!objValidatorConfig) {
        return true
    }

    let isValid =true


    for (const prop in objValidatorConfig) {
        console.log('prop')
        console.log(prop) // price
        console.log(' objValidatorConfig[prop]')
        console.log(objValidatorConfig[prop])  //["positive"]
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    console.log('require obj[prop]')
                    console.log(obj[prop])
                    isValid=isValid && !!obj[prop]
                    break;
                case 'positive':
                    console.log('positive obj[prop]')
                    console.log(obj[prop])
                    isValid=isValid && obj[prop]>0
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string
    @PositiveNumber
    price: number

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price)

    if (!validate(createdCourse)) {
        alert('Invalid input,please try again')
        return
    }
    console.log(createdCourse)

})
