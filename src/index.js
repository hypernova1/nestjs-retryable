console.log('Happy developing ✨');
var Domain = /** @class */ (function () {
    function Domain() {
    }
    return Domain;
}());
var Entity = /** @class */ (function () {
    function Entity() {
    }
    Entity.prototype.sayHello = function () {
        console.log('hello');
    };
    return Entity;
}());
var domain = new Domain();
var entity = domain;
entity.sayHello();
