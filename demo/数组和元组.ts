//数组
const arr: (number | string)[] = [1, 2, '3']

const stringArr: string[] = ['a', 'b', 'c', 'd']

const undefinedArr: undefined[] = [undefined]


const objectArr: { name: string, age: number }[] = [{name: 'Hisen', age: 12}]

//也可以使用类型别名
//type alias 类型别名
type User = { name: string, age: number }
const objectArr1: User[] = [{name: 'Hisen', age: 12}]

class Teacher {
    name: string
    age: number
}

const objectArr2: Teacher[] = [
    new Teacher(),
    {
        name: 'Hisen', age: 48
    }
]

//元组 数量个数有限的数组
// 为了约束 后面的形式和前面的类型是完全抑制的
const teacherInfoz: (number | string)[] = [3, 'Hisen', 'male', 23]
const teacherInfo: [string, string, number] = ['Hisen', 'male', 23]

//csv
const teacherList:([string,string,number])[]=[
    ['Hisen', 'male', 23],
    ['isen', 'female', 23],
    ['Hien', 'male', 24]
]



