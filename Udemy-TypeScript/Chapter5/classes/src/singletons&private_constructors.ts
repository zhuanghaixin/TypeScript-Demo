abstract class Department {
    // public name:string;
    protected readonly id:string;
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(id:string, public name: string) {
        this.id = id;
        this.name = name;
    }

    static createEmployee(name: string) {
        return {
            name: name
        }
    }
    //抽象类

    abstract describe(this: Department):void;

    addEmployee(employee: string) {
        // this.id='d2';  //readonly 不能改
        this.employees.push(employee);
    }

    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}


class ITDepartment extends Department {
    public admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins
    }
    describe(){
        console.log('IT Department - ID: '+this.id)
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No error found');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value')
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'IT')
        this.lastReport = reports[0]
    }

    describe() {  //重要  （this:Department)
        console.log('AccountingDepartment-ID: '+this.id);
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return
        }
        this.employees.push(name)
    }

    addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text
    }

    printReports() {
        console.log(this.reports)
    }
}


// const accounting = new Department('d1', 'Accounting');
//为什么使用public,因为这样可以随意更改
// accounting.name='Simon'

// accounting.describe();


// accounting.addEmployee('Max')
// accounting.addEmployee('Marry')

//为什么使用private, 因为下面这样的情况，可以随意更改,这是不允许的❎
// accounting.employees[2]='Ben'


// accounting.printEmployeeInfo();

//创建员工
const employee1 = Department.createEmployee('Max')
console.log('employee', employee1, 'fiscalYear', Department.fiscalYear);

const it = new ITDepartment('d1', ['Max', 'LUffy'])

it.addEmployee('Nami')
it.addEmployee('Robbin')
it.printEmployeeInfo();
console.log('it :', it)
it.describe()

const accounting_1 = new AccountingDepartment('d2', [])

accounting_1.addReport('Something went wrong')
console.log(accounting_1.mostRecentReport)
accounting_1.addEmployee('Max')
accounting_1.addEmployee('Belly')
// accounting_1.printReports()
// accounting_1.printEmployeeInfo()
accounting_1.describe();


