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
function Log(target:any,propertyName:string | Symbol){
    console.log('Property decorator')
    console.log(target,propertyName)
}

class Product{
    //property decorator
    @Log
    title:string
    private _price:number

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
    getPricewithMax(tax:number){
        return this._price*(1+tax)
    }
}



