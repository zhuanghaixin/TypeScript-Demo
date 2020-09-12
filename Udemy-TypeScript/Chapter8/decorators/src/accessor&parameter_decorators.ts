function Logger(logString: string){
    console.log('LOGGING FACTORY')
    return function(constructor:Function){
        console.log(logString )
        console.log(constructor)
    }
}

//类似于Angular @Component
function WithTemplate(template:string,hookId:string){
    console.log('TEMPLATE FACTORY')

    return function(constructor:any){
        const hookEl=document.getElementById(hookId)
        const p =new constructor();
        if(hookEl){
            hookEl.innerHTML=template
            //我们让Person中的name'Max'赋给hookEl的h1
            hookEl.querySelector('h1')!.textContent=p.name
        }
    }
}
@WithTemplate('<h1>My Person Object</h1>','app')
// @Logger('LOGGING-PERSON')
@Logger('LOGGING')
class Person{
    name ='Max'
    constructor(){
        console.log('Creating person object...')
    }
}

const pers=new Person()

console.log(pers)

// --

//Accessor Decorator
function Log(target:any,propertyName:string | Symbol){
    console.log('Property decorator')
    console.log(target,propertyName)
}

function Log2(target:any,name:string,descriptor:PropertyDescriptor){
    console.log('Accessor decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}
function Log3(target:any,name:string|Symbol,descriptor:PropertyDescriptor){
    console.log('Method decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

//Parameter Decorators
function Log4(target:any,name:string|Symbol,position:number){
    console.log('Parameter Decorator')
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product{
    //property decorator
    @Log

    private _price:number
    title:string
    @Log2
    set price(val:number){
        if(val>0){
            this._price=val;
        }else{
            throw new Error('Invalid price - should be positive')
        }
    }

    constructor(t:string,p:number){
        this.title=t
        this._price=p
    }
    @Log3
    getPricewithMax( tax:number, @Log4 a:number){
        return this._price*(1+tax)
    }
}




