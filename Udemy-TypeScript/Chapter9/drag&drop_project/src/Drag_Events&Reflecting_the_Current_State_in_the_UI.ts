//Drag&Drop Interfaces
interface Draggable{
    dragStartHandler(event:DragEvent):void
    dragEndHandler(event:DragEvent):void
}
interface Dragtarget{
    dragOverHandler(event:DragEvent):void
    dropHandler(event:DragEvent):void
    dragLeaveHandler(event:DragEvent):void

}




//Project Type
//不用接口，type，用class是想实例化
enum ProjectStatus {Active, Finished}

class Project {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {

    }
}


//使用类型 使得function type变得简单
type Listener<T>=(items:T[])=>void;
//继承
class State<T>{
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
        console.log('listenerFn')
        console.log(listenerFn)
        console.log('this.listeners 1 1 1 1 1 1 1 1 1 1 1 1  1 1 1 1 1 1 1 1 1 1 1 1 1')
        console.log(this.listeners)

    }

}
//Project State Management

class ProjectState  extends State<Project>{
    //监听器
    // private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState()
        return this.instance;
    }

    // addListener(listenerFn: Listener) {
    //     this.listeners.push(listenerFn);
    //     console.log('listenerFn')
    //     console.log(listenerFn)
    //     console.log('this.listeners 1 1 1 1 1 1 1 1 1 1 1 1  1 1 1 1 1 1 1 1 1 1 1 1 1')
    //     console.log(this.listeners)
    //
    // }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(newProject)
        console.log('thia.projects------------------ ')
        console.log(this.projects)
        for (const listenerFn of this.listeners) {
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


// Common Base Class 因为不用实例化，所以用abstract
abstract class Component<T extends HTMLElement,U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T; ///<div id="app"></div>
    element: U; //section.projects标签
    constructor(
        templateId:string,
        hostElementId:string,
        insertAtStart:boolean,
        newElementId?:string
    ){
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as U; //section.projects标签
        if(newElementId){
            this.element.id = newElementId
        }

        //节点插入
        this.attach(insertAtStart)

    }
    //节点插入
    private attach(insertAtBeginning:boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning?'afterbegin':'beforeend', this.element)
    }

    abstract configure?():void
    abstract renderContent():void
}


//ProjectItem Class
class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
    private project:Project;

    get persons(){
        if(this.project.people===1){
            return '1 person '
        }else{
            return `
            ${this.project.people} persons
            
            `
        }
    }


    constructor(hostId:string,project:Project){
        super('single-project',hostId,false,project.id)
        this.project = project

        this.configure()
        this.renderContent()
    }

    @Autobind
    dragStartHandler(event:DragEvent){
        console.log(event)


    }
    @Autobind
    dragEndHandler(_:DragEvent){
        console.log('DragEnd')

    }

    configure() {
        this.element.addEventListener('dragstart',this.dragStartHandler)
        this.element.addEventListener('dragend',this.dragEndHandler)
    }
    renderContent() {
        console.log('this')
        console.log(this)
        console.log('this.element')
        console.log(this.element)
        this.element.querySelector('h2')!.textContent =this.project.title;
        this.element.querySelector('h3')!.textContent =this.persons+'assigned'
        this.element.querySelector('p')!.textContent =this.project.description;

    }
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement,HTMLElement>  implements Dragtarget{
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLElement; //section.projects标签
    assiginedProjects: Project[];


    constructor(private type: 'active' | 'finished') {
        super('project-list','app',false,`${type}-projects`)

        // this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!;
        // this.hostElement = document.getElementById('app')! as HTMLDivElement;

        this.assiginedProjects = []

        // const importedNode = document.importNode(this.templateElement.content, true)
        // this.element = importedNode.firstElementChild as HTMLElement; //section.projects标签
        // this.element.id = `${type}-projects`

        // this.attach()

        //Drag

        this.configure()
        this.renderContent()



    }

    @Autobind
    dragOverHandler(_:DragEvent){
        const listEl=this.element.querySelector('ul')!
        listEl.classList.add('droppable')

    }
    @Autobind
    dropHandler(_:DragEvent){

    }
    @Autobind
    dragLeaveHandler(_:DragEvent){
        const listEl=this.element.querySelector('ul')!
        listEl.classList.remove('droppable')

    }

    configure(){
        //拖拽
        this.element.addEventListener('dragover',this.dragOverHandler)
        this.element.addEventListener('dragleave',this.dragLeaveHandler)
        this.element.addEventListener('drop',this.dropHandler)



        projectState.addListener((projects: Project[]) => {
            //过滤filter
            const relevantProjects=projects.filter(prj=>{
                if(this.type==='active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status===ProjectStatus.Finished

            })
            // this.assiginedProjects = projects
            this.assiginedProjects = relevantProjects

            console.log('this.assiginedProjects-------')
            console.log(this.assiginedProjects)
            this.renderProjects()

        })

    }

    //渲染内容 因为上面是abstract 所以不需要private
    renderContent() {
        const listId = `${this.type}-projects-list`
        // console.log('listId')
        // console.log(listId)
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'

    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
        listEl.innerHTML =''
        for (const prjItem of this.assiginedProjects) {
            // const listItem = document.createElement('li')
            // listItem.textContent = prjItem.title
            // listEl.appendChild(listItem)
            //封装成类
            console.log('this.element.id')
            console.log(this.element.id)
            new ProjectItem(this.element.querySelector('ul')!.id,prjItem)
        }

    }





    //节点插入
    // private attach() {
    //     this.hostElement.insertAdjacentElement('beforeend', this.element)
    // }
}

//ProjectInput Class

class ProjectInput extends Component<HTMLDivElement,HTMLElement>{
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLFormElement; //form标签
    //title_input
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        super('project-input','app',true,'user-input')

        // this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
        // this.hostElement = document.getElementById('app')! as HTMLDivElement;
        // const importedNode = document.importNode(this.templateElement.content, true)
        // this.element = importedNode.firstElementChild as HTMLFormElement; //form标签
        //给form添加样式
        // this.element.id = 'user-input'
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
        this.configure()
    }

    configure() {
        // this.element.addEventListener('submit',this.submitHandler)
        this.element.addEventListener('submit', this.submitHandler.bind(this))

    }
    renderContent(){}


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




    // private attach() {
    //     this.hostElement.insertAdjacentElement('afterbegin', this.element)
    // }
}

const prjInput = new ProjectInput()

const acitivePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
