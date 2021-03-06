//Project State Management
class ProjectState {
    //监听器
    private listeners: any[] = []
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() {
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState()
        return this.instance;
    }

    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
        console.log('listenerFn')
        console.log(listenerFn)
        console.log('this.listeners 1 1 1 1 1 1 1 1 1 1 1 1  1 1 1 1 1 1 1 1 1 1 1 1 1')
        console.log(this.listeners)

    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            peopple: numberOfPeople
        }
        this.projects.push(newProject)
        console.log('thia.projects------------------ ')
        console.log(this.projects)
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice())  //this.projects.slice(）是将this.projects进行拷贝
            console.log('thia.listeners--------------------------------')
            console.log(this.listeners)
        }
    }

}

// const projectState=new ProjectState()
//使用单例模式
const projectState = ProjectState.getInstance()

//Validation
interface Validatable {
    value: string | number;
    required?: boolean | undefined;
    minLength?: number;  //输入的长度
    maxLength?: number;
    min?: number;
    max?: number;  //数字的长度


}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;

    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;

    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;

    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;

    }
    return isValid

}


//autobind Decorator
function Autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor) {
    // console.log('descriptor')
    // console.log(descriptor)
    const originalMethod = descriptor.value;
    // console.log(originalMethod)
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // console.log(this)  //ProjectInput
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor

}

//ProjectList Class
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement; //section.projects标签
    assiginedProjects:any[];
    constructor(private type: 'active' | 'finished') {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        this.assiginedProjects=[]

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLElement; //section.projects标签
        this.element.id = `${type}-projects`

        this.attach()
        this.renderContent()

        projectState.addListener((projects:any[])=>{
            this.assiginedProjects=projects
            console.log('this.assiginedProjects-------')
            console.log(this.assiginedProjects)
            this.renderProjects()
            console.log('this.renderProjects------')
            console.log(this.renderProjects())
        })

    }
    //
    private renderProjects(){
        const listEl=document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
        for(const prjItem of this.assiginedProjects){
            const listItem=document.createElement('li')
            listItem.textContent=prjItem.title
            listEl.appendChild(listItem)
        }

    }

    //渲染内容
    private renderContent() {
        const listId = `${this.type}-projects-list`
        // console.log('listId')
        // console.log(listId)
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'

    }

    //节点插入
    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
}

//ProjectInput Class

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement; //form标签
    //title_input
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLFormElement; //form标签
        //给form添加样式
        this.element.id = 'user-input'
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
        this.configure()
        this.attach()
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        // console.log(enteredPeople)
        //验证
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }


        if (
            // enteredTitle.trim().length === 0 ||
            // enteredDescription.trim().length === 0 ||
            // enteredPeople.trim().length === 0
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input,please try again')
            return
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];

        }
    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        console.log(userInput)
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log('title ', title, 'desc ', desc, 'people ', people)

            //todo 提交 状态
            projectState.addProject(title, desc, people)
            console.log('projectState--------------------------------')
            console.log(projectState)
        }


        this.clearInputs()


    }


    private configure() {
        // this.element.addEventListener('submit',this.submitHandler)
        this.element.addEventListener('submit', this.submitHandler.bind(this))

    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const prjInput = new ProjectInput()

const acitivePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
