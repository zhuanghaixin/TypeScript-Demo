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
    console.log('descriptor')
    console.log(descriptor)
    const originalMethod = descriptor.value;
    console.log(originalMethod)
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            console.log(this)  //ProjectInput
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor

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
        console.log(enteredPeople)
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
            !validate(titleValidatable)||
            !validate(descriptionValidatable)||
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
