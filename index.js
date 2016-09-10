Object.prototype.h = 1000;
    function A () {
        this.h = 100;
    }
    A.prototype.test = function(){
        console.log(this);  
        console.log(this.h); 
        console.log("A"); 
    }
 
    function B(){}
    B.prototype = new A();     
    B.prototype.constructor=B;
    B.prototype.super = A.prototype;   
    B.prototype.test = function(){
        console.log(this); 
        console.log(this.super);
        console.log( this.super.test);
        this.super.test(); 
        console.log("B");
    }
     
    function C(){}
    C.prototype = new B();
    C.prototype.constructor=C;
    C.prototype.super = B.prototype;
    C.prototype.test = function(){
        console.log(this);
        console.log(this.super);
        this.super.test();
        console.log("C");
    }
     
     
    var c = new C();
    
    c.test();
    var b = new B();
    b.test();