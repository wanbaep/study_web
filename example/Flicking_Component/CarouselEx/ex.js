var temp = require('./util');
var egjs = require('../../node_modules/@egjs/component/dist/component');

var Carousel = temp(egjs, {
    init : function($rootElement){
        console.log("hi");
        this.rootElement = $rootElement;
        this.liLength = this.rootElement.find("li").length;
        var firstChild = this.rootElement.find("li:first").clone();
        var lastChild = this.rootElement.find("li:last").clone();

        this.rootElement.prepend(lastChild);
        this.rootElement.append(firstChild);
    },
    
    getLiLength : function(){
        console.log(this.liLength);
    }
});

module.exports = Carousel;