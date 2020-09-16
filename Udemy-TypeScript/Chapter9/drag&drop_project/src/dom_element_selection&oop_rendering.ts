// Code goes here!
class ProjectInput{
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLFormElement; //form标签

    constructor(){
        this.templateElement=<HTMLTemplateElement>document.getElementById('project-input')!;
        this.hostElement=document.getElementById('app')! as HTMLDivElement;
        const importedNode=document.importNode(this.templateElement.content,true)
        this.element=importedNode.firstElementChild as  HTMLFormElement; //form标签
        this.attach()
    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
}

const prjInput=new ProjectInput()
