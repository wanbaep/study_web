function Rolling(){
}
Rolling.prototype.constructor = Rolling;
Rolling.prototype.a = {
   some : function(){}
}
var test = new Rolling();
console.log(test);