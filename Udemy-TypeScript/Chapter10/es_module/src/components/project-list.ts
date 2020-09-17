import {DragTarget} from '../models/drag-drop.js'
import Component from './base-component.js'
import {Autobind} from "../decorators/autobind.js";
import {Project,ProjectStatus} from "../models/project.js";
import {projectState} from "../state/project-state.js";
import {ProjectItem} from "./project-item.js";

//ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLElement; //section.projects标签
    assiginedProjects: Project[];


    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)

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
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault(); //
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable')
        }
    }

    @Autobind
    dropHandler(event: DragEvent) {
        console.log('dragHnadler event')
        console.log(event.dataTransfer!.getData('text/plain'))
        const prjId = event.dataTransfer!.getData('text/plain')

        console.log('prjId-------------------------------------------')
        console.log(prjId)
        console.log('this.type')
        console.log(this.type)
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)

    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!
        listEl.classList.remove('droppable')

    }

    configure() {
        //拖拽
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)


        projectState.addListener((projects: Project[]) => {
            //过滤filter
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Finished

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
        listEl.innerHTML = ''
        for (const prjItem of this.assiginedProjects) {
            // const listItem = document.createElement('li')
            // listItem.textContent = prjItem.title
            // listEl.appendChild(listItem)
            //封装成类
            console.log('this.element.id')
            console.log(this.element.id)
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem)
        }

    }


    //节点插入
    // private attach() {
    //     this.hostElement.insertAdjacentElement('beforeend', this.element)
    // }
}


