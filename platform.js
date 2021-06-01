class Platform {
    constructor(x,y,width,height){
        var options = {
            isStatic:true
        }

        this.pl = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("images/platB.png");
        World.add(world, this.pl);
        
    }
    

    display(){
        var pos = this.pl.position;
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect( 0, 0, this.width, this.height);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }

    overlap(obj1, width, height){
        var pos = this.pl.position;
        if(obj1.y < pos.y-height/2 && obj1.y > pos.y-height/2 - 30 && obj1.x > pos.x - width/2-1 && obj1.x<pos.x+width/2+1 && jumpS===0){
            if(jumpS === 0){
                tp.velocityY=0;
                tp.y=pos.y-height/2 - 30;
            }
            jumpS=0;
            gravity=0;
        }
        if(obj1.x<pos.x-width/2 && obj1.x>pos.x-width/2-10 && obj1.y<pos.y+height/2 && obj1.y>pos.y-height/2){
            hasCollidedR();
        }else if(keyWentUp("a") && colXR===1){
            colXR=0;
        }
        if(obj1.x>pos.x+width/2 && obj1.x<pos.x+width/2+10 && obj1.y<pos.y+height/2 && obj1.y>pos.y-height/2){
            hasCollidedL();
        }else if(keyWentUp("d") && colXL===1){
            colXL=0;
        }
    }
}