//autobind Decorator
function Autobind(
    _:any,
    _2:string,
    descriptor:PropertyDescriptor){
    console.log('descriptor')
    console.log(descriptor)
    const originalMethod=descriptor.value;
    console.log(originalMethod)
    const adjDescriptor:PropertyDescriptor={
        configurable:true,
        enumerable:false,
        get(){
            console.log(this)  //ProjectInput
            const boundFn=originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor

}


//ProjectInput Class

class ProjectInput{
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLFormElement; //form标签
    //title_input
    titleInputElement:HTMLInputElement;
    descriptionInputElement:HTMLInputElement;
    peopleInputElement:HTMLInputElement;



    constructor(){
        this.templateElement=<HTMLTemplateElement>document.getElementById('project-input')!;
        this.hostElement=document.getElementById('app')! as HTMLDivElement;
        const importedNode=document.importNode(this.templateElement.content,true)
        this.element=importedNode.firstElementChild as  HTMLFormElement; //form标签
        //给form添加样式
        this.element.id='user-input'
        this.titleInputElement=this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement=this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement=this.element.querySelector('#people') as HTMLInputElement
        this.configure()
        this.attach()
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value)

    }


    private configure() {
        // this.element.addEventListener('submit',this.submitHandler)
        this.element.addEventListener('submit',this.submitHandler.bind(this))

    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
}

const prjInput=new ProjectInput()
