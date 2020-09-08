
class Department{
    // public name:string;
    // private readonly id:string;
    private employees:string[]=[];
    constructor(private readonly id:string,public name:string) {
        this.id=id;
        this.name=name;
    }
    describe(this:Department){  //重要  （this:Department)
        console.log(`Department: (${this.id}):${this.name}`);
    }
    addEmployee(employee:string){
        // this.id='d2';  //readonly 不能改
        this.employees.push(employee);
    }
    printEmployeeInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting=new Department('d1','Accounting');

//为什么使用public,因为这样可以随意更改
accounting.name='Simon'

accounting.describe();


accounting.addEmployee('Max')
accounting.addEmployee('Marry')

//为什么使用private, 因为下面这样的情况，可以随意更改,这是不允许的❎
// accounting.employees[2]='Ben'


accounting.printEmployeeInfo();


