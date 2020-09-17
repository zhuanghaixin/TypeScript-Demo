
namespace App {

// Common Base Class 因为不用实例化，所以用abstract
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T; ///<div id="app"></div>
        element: U; //section.projects标签
        constructor(
            templateId: string,
            hostElementId: string,
            insertAtStart: boolean,
            newElementId?: string
        ) {
            this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
            this.hostElement = document.getElementById(hostElementId)! as T;

            const importedNode = document.importNode(this.templateElement.content, true)
            this.element = importedNode.firstElementChild as U; //section.projects标签
            if (newElementId) {
                this.element.id = newElementId
            }

            //节点插入
            this.attach(insertAtStart)

        }

        //节点插入
        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
        }

        abstract configure?(): void

        abstract renderContent(): void
    }
}
