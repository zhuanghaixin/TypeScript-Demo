
import {Project,ProjectStatus} from "../models/project";



//使用类型 使得function type变得简单
type Listener<T> = (items: T[]) => void;

//继承
class State<T> {
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

export class ProjectState extends State<Project> {
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
        //更新

        console.log('thia.projects------------------ ')
        console.log(this.projects)
        this.updateListeners()
        // for (const listenerFn of this.listeners) {
        //     listenerFn(this.projects.slice())  //this.projects.slice(）是将this.projects进行拷贝
        //     console.log('thia.listeners--------------------------------')
        //     console.log(this.listeners)
        // }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {

        console.log('newStatus-------------')
        console.log(newStatus)
        const project = this.projects.find(prj => prj.id === projectId);
        if (project) {
            console.log('-------------------project.status')
            console.log(project.status)
            project.status = newStatus
            this.updateListeners()
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())  //this.projects.slice(）是将this.projects进行拷贝
            console.log('thia.listeners--------------------------------')
            console.log(this.listeners)
        }

    }


}

console.log('RUNNING 只运行一次')
// const projectState=new ProjectState()
//使用单例模式
export const projectState = ProjectState.getInstance()
