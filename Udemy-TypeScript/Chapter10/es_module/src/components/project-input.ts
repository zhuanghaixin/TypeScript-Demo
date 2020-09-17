import Component from './base-component.js'
import * as Validation from "../util/validation.js";
import {Autobind} from "../decorators/autobind.js";
import {projectState} from "../state/project-state.js";


export class ProjectInput extends Component<HTMLDivElement, HTMLElement> {
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLFormElement; //form标签
    //title_input
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        super('project-input', 'app', true, 'user-input')

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

    renderContent() {
    }


    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        // console.log(enteredPeople)
        //验证
        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable:  Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable:  Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }


        if (
            // enteredTitle.trim().length === 0 ||
            // enteredDescription.trim().length === 0 ||
            // enteredPeople.trim().length === 0
            ! Validation.validate(titleValidatable) ||
            ! Validation.validate(descriptionValidatable) ||
            ! Validation.validate(peopleValidatable)
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
