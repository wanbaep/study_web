var Carousel = require('./ex');
var $ = require('../../node_modules/jquery/dist/jquery.js');
// var 

$(window).on("load", function(){
    var a = new Carousel($(".visual_img"));
    a.getLiLength();

    var b = new Carousel($(".visual_img"));
    b.getLiLength();
});