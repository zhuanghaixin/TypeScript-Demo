// type Person1=string
//interface和type的区别  Person1可以代表string，但是Person就无法代替string,只能代表函数或对象
var getPersonName = function (person) {
    console.log(person.name);
};
var setPersonName = function (person, name) {
    person.name = name;
};
var getPersonName1 = function (person) {
    console.log(person.name);
};
var setPersonName1 = function (person, name) {
    person.name = name;
};
var person = {
    name: 'Hisen',
    age: 12,
    sex: 'xx',
    say: function () { return 'hello'; },
    teach: function () {
        return '教书';
    }
};
getPersonName1(person);
//但是如果是字面量的形式，就会报错。因为这时候，typescript会进行强校验。
getPersonName1({
    name: 'Hisen',
    age: 12,
    sex: 'xx',
    say: function () {
        return 'hello';
    }
});
setPersonName1(person, 'lee');
//类应用一个接口
var UserS = /** @class */ (function () {
    function UserS() {
        this.name = 'dell';
        this.height = 13;
    }
    UserS.prototype.say = function () {
        return 'hello';
    };
    return UserS;
}());
var say = function (word) {
    return word;
};
