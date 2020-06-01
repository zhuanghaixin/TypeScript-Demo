//数组
var arr = [1, 2, '3'];
var stringArr = ['a', 'b', 'c', 'd'];
var undefinedArr = [undefined];
var objectArr = [{ name: 'Hisen', age: 12 }];
var objectArr1 = [{ name: 'Hisen', age: 12 }];
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    return Teacher;
}());
var objectArr2 = [
    new Teacher(),
    {
        name: 'Hisen', age: 48
    }
];
//元组 数量个数有限的数组
// 为了约束 后面的形式和前面的类型是完全抑制的
var teacherInfoz = [3, 'Hisen', 'male', 23];
var teacherInfo = ['Hisen', 'male', 23, 1];
//csv
var teacherList = [
    ['Hisen', 'male', 23],
    ['isen', 'female', 23],
    ['Hien', 'male', 24]
];
