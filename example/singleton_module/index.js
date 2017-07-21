/*var testModule = (function(){
	var counter = 0;

	return {
		incrementCounter: function(){
			return counter++;
		},

		printCounter: function(){
			console.log("current Counter : %o", counter);
		},

		resetCounter: function(){
			console.log("counter value prior to reset" + counter);
			counter = 0;
		}
	};

})();

//IIFE (Immediately-invoked function expression)
//즉시실행 함수는 변수를 공유한다.
var a = testModule;

var b = testModule;
a.incrementCounter();
b.incrementCounter();

console.log(a);
console.log(b);
testModule.printCounter();
*/


var mySingleton = (function(){
	var instance;

	function init(){

		function privateMethod(){
			console.log("I am private");
		}

		var privateVariable = "Im also private";
		var privateRandomNumber = Math.random();

		return {
			publicMethod: function(){
				console.log("The public can see me!");
			},

			publicProperty: "I am also public",

			getRandomNumber: function(){
				return privateRandomNumber;
			}
		};
	};

	return {
		getInstance: function(){
			if(!instance){
				instance = init();
			}

			return instance;
		}
	};

})();

var myBadSingleton = (function(){
	var instance;
	function init(){
		var privateRandomNumber = Math.random();
		var count = 0;

		return {
			getRandomNumber:function(){
				return privateRandomNumber;
			},
			increaseCount:function(){
				count++;
			},
			showCount:function(){
				console.log("my Count: %o", count);
			}
		};
	};
	return{
		getInstance: function(){
			instance = init();
			return instance;
			// return init();	//위의 2줄과 동일한 동작
		}
	};

})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
// console.log("bad Singleton A: %o, B: %o", singleA.getRandomNumber(), singleB.getRandomNumber());
// console.log(singleA.getRandomNumber() === singleB.getRandomNumber());
// singleA.publicMethod();
// console.log(singleA.publicProperty);

//getInstance를 할 때 마다 function init() 객체를 만들어서 반환한다.
//따라서 function init() 객체를 받은 변수에서는 function init() 객체 내부의 반환값인
//getRandomNumber, increaseCount, showCount등에 접근할 수 있지만,
//getInstance에는 접근 할 수 없다.
//위 IIFE Module의 구조는 Module.getInstance()를 할때마다 function init()객체를
// 반환한다.
var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
// console.log("bad Singleton A: %o, B: %o", badSingleA.getRandomNumber(), badSingleB.getRandomNumber());
// console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber());
// console.log("A: %o, B: %o", badSingleA, badSingleB);
badSingleA.increaseCount();
badSingleA.increaseCount();
badSingleA.showCount();
badSingleB.showCount();