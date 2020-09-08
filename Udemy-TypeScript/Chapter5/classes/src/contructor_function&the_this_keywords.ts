class Department{
    name:string;
    constructor(n:string) {
        this.name=n;
    }
    describe(this:Department){  //重要  （this:Department)
        console.log('Department: '+this.name);
    }
}

const accounting=new Department('Accounting');
console.log(accounting);
console.log(accounting.describe);
accounting.describe();

// const accountingCopy={describe:accounting.describe};
const accountingCopy={name:'Max',describe:accounting.describe};

console.log(accountingCopy)
accountingCopy.describe();
