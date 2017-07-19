$('.btn-example').click(function(){
  var $href = $(this).attr('href');
  console.log($href);
  layer_popup($href);
});

function layer_popup(el){

    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
    $elHeight = ~~($el.outerHeight()),
    docWidth = $(document).width(),
    docHeight = $(document).height();

    console.log($el.outerHeight());
    console.log(~~$el.outerHeight());

    console.log(docWidth);  //보이는 화면 너비 높이
    console.log(docHeight);

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
      console.log("top: %o, left: %o",$el.css("marginTop"), $el.css("marginLeft"))
      $el.css({
        marginTop: -$elHeight /2,
        marginLeft: -$elWidth/2
      })
      console.log("top: %o, left: %o",$el.css("marginTop"), $el.css("marginLeft"))
      
    } else {
      $el.css({top: 0, left: 0});
    }

    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
      });

    $('.layer .dimBg').click(function(){
      $('.dim-layer').fadeOut();
      return false;
    });

}
