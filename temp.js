튜터님 Front-End 코드 작성간에 질문사항이 생겨서 슬랙에 공유드립니다.

1. Front-End코드 작성에서 MVC패턴을 이용해서 작성을 하는 경우 1번 방법과 2번 방법이
Model과 View를 분리하는 관점에서 차이가 있는지 궁금합니다.

2. 그리고 추가적으로 2번같은 경우에 ajax요청의 실패에 대해서 처리를 View영역의 reject부분에서 해 주어야 할 것 같은데요.
이렇게 처리해주는 경우는 Model과 View에 대한 분리가 제대로 이루지지 않는 것 같다고 판단이 됩니다. 그러므로 혹시 reject에 대한 처리를 Model에서 해줄 수 있는 방법이 있을지 궁금합니다.


1번 code. View에서 Model에게 데이터를 요청하면서 function pointer를 함께 넘겨주어서 View에 있는 `addProductList`함수에 data를 인자로 넣어서 실행하도록 하는 방식입니다.

-------------- View에서 사용
Model.getProduct(function(data){
    addProductList(data);
})
...abstract

function addProductList(data){
    //rendering data
}

-------------- Model
var Model = (function(){
    function getProduct(fp){
        $.ajax(url).then(function(data){
            fp(data);
        });
    }
})();

2번. View에서 Model에게 데이터를 요청하면 Model에서 thennable객체를 반환하고 View에서는 반환된 객체에 then을 통해서 실행하는 방식입니다.

-------------- View
Model.getProduct().then(function(data){
    //resolve
    addProductList(data);
}, function(){
    //reject
});
...abstract

function addProductList(data){
    //rendering data
}

-------------- Model
var Model = (function(){
    function getProduct(){
        return $.ajax(url).then(function(data){
            return data;
        });
    }
})();

{{#each this}}
    {{fileIdList[]}}
{{/each}}