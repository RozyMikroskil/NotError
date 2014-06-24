var zero = {
    el: document.getElementById("zero"),
    transformed: false,
    running: false,
    jumping:false,
    jummpingAvailable: true,
    motor:false,
    gravity:5,
    bike:false,
    
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0,left.length - 2),10);

        return posX;
    },
    getPosY:function() {
       var style = window.getComputedStyle(this.el),
            top  = style.top,
            posY  = parseInt(top.substr(0,top.length - 2),10);
            
        return posY;
    },
    standStill: function () {
        code = "";
        if (this.running && !this.black) {
            this.el.style.webkitAnimation = "zero-stand 0.8s steps(2, end) infinite";
            this.running = false;
            this.jummpingAvailable = true;
        } 
        
        if (this.running && this.black) {
        this.el.style.webkitAnimation = "zero-black-stand 1s steps(2,end) infinite";
            this.running = false;
            this.jummpingAvailable = true;
        } 
          
        if(this.motor){
            this.el.style.webkitAnimation = "zero-motor 1s steps(2,end) infinite";
        }
    
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos = posX + 4;
           
        if (posX > 600) {
            return;
        }
        
        if (!this.running && !this.motor && !this.black) {
            this.el.style.webkitAnimation = "zero-run 1s steps(13, end) infinite";
            this.running = true;       
        }
        
        if( !this.running && this.black){
            this.el.style.webkitAnimation= "zero-black-run 1s steps(13,end) infinite";
            this.running = true;
        }
        
        if(this.motor){
            this.el.style.webkitAnimation = "zero-motor-run 1s steps(2,end) infinite";
        }
        
        
        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";        
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos = posX - 4;
        if (posX < 0) {
            return;
        }
        
        if (!this.running && !this.motor && !this.black) {
            this.el.style.webkitAnimation = "zero-run 1s steps(13, end) infinite";
            this.running = true;
        }
        
         
        
        if( !this.running && this.black){
            this.el.style.webkitAnimation= "zero-black-run 1s steps(13,end) infinite";
            this.running = true;
        }
      
        if(this.motor){
            this.el.style.webkitAnimation = "zero-motor-run 1s steps(2,end) infinite";
        }
        
        if (!this.transformed) {
            this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },jump: function() {        
          if(this.jummpingAvailable){
            this.jumping = true;
            this.running = false;
        }
    },
    jumpingZero: function() {
    var top = zero.getPosY(),newPosY;
      if(this.jumping && !this.black){
            newPosY = top - 5;
        if(top == 80){
            this.jumping = false;
            }
        }else{
         if(top < 145){
            newPosY = top + zero.gravity;
            this.el.style.top = newPosY + "px";   
            }
        }
        
        if (newPosY === 145){
            this.standStill();
            return;
               
        }       
        
        if (this.   jumping && !this.black) {
            this.el.style.webkitAnimation = "zero-jumping 1s steps(10, end) infinite";
            this.running = true;
        }
        
        if(top > 80)
             this.el.style.top = newPosY + "px";   
          
    },
    bike: function(){
        if(!this.motor && !this.black){
            this.jummpingAvailable = false;
            this.running = false;
            this.el.style.webkitAnimation = "zero-motor 1s steps(2,end) infinite";
            this.motor = true;
        }else{
            this.motor = false;
            this.running = true;
            this.standStill();
        }
    },
    attack: function(){
         if (!this.motor  && !this.black) {
            this.el.style.webkitAnimation = "zero-attack 0.5s steps(11, end) infinite"; 
            this.running = true;
            }
        
        if (!this.motor  && this.black) {
            this.el.style.webkitAnimation = "zero-black-attack 0.5s steps(8,end) infinite";
            this.running = true;
         }
    },
    transFormedBlack: function(){
        if(!this.black){
            this.jummpingAvailable = false;
            this.running = false;
            this.el.style.webkitAnimation = "zero-black-init 1s steps(6,end) 1";
            this.el.style.backgroundPosition = "-350px -730px";
            this.black = true;
            this.motor = false;
        }else{
            this.black = false;
            this.running = true;
            this.standStill();
        }
    }

};


var code = "";
window.addEventListener("keydown", function (e) {
    code = e.keyCode;
    switch(code){
    case 68:
		zero.bike();
		break;
    case 81:
        zero.attack();
    break;
    case 83:
    zero.transFormedBlack();
    break;
    }
});

window.addEventListener("keyup", function () {
    zero.standStill();
});


var fps = function(){
   switch (code) {
    case 37:
        zero.moveLeft();
        break;
    case 38:
        zero.jump();
        break;
    case 39:
        zero.moveRight();
        break;
        }        
    
    zero.jumpingZero();
    setTimeout(fps,33);
};
fps();

