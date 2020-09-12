function Logger(logString: string){
    return function(constructor:Function){
        console.log(logString )
        console.log(constructor)
    }
}

//类似于Angular @Component
function WithTemplate(template:string,hookId:string){
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
@Logger('LOGGING-PERSON')
class Person{
    name ='Max'
    constructor(){
        console.log('Creating person object...')
    }
}

const pers=new Person()

console.log(pers)

