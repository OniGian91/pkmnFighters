class Sprite {
    constructor ({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}}) {
        this.position = position; 
        this.height = 150;   
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 8
        this.offset = offset
       
    }

    draw(mirror){
        if (mirror === true)
        {
            c.save();
		
            c.translate(this.position.x - this.offset.x + (this.image.width / this.framesMax) * this.scale, this.position.y - this.offset.y);
            
            c.scale(-1, 1);
            
            c.drawImage(
                this.image, 
                // CROP
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                // CROP
                0, // Start drawing at the translated position (this is adjusted by translate above)
                0, 
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );
            
            c.restore();
        }
        else
        {
        c.drawImage(
            this.image, 
            // CROP
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            // CROP
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)
        }
            
    }

    update () {
        this.draw(false)
        this.animateFrame()
    }

    animateFrame(){
        this.framesElapsed ++

        if (this.framesElapsed % this.framesHold === 0)
        {
            if (this.framesCurrent < this.framesMax - 1)
            {
                this.framesCurrent++
            }
            else {
                this.framesCurrent = 0
            }
        }
    }
}

class Fighter extends Sprite {
    constructor ({
            position,
            velocity,
            color = 'red', 
            imageSrc, 
            scale = 1, 
            framesMax = 1,
            offset = {x:0, y:0},
            sprites,
            attackBox = {offset:{}, width:undefined,height: undefined,mirroroffset:{}},
            mirror
        })
    {
        super ({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity;
        this.height = 150;   
        this.width = 50;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            },
            offset: attackBox.offset,
            mirroroffset: attackBox.mirroroffset,
            width: attackBox.width,
            height: attackBox.height
        }
       
        this.color = color
        this.isAttacking
        this.isParrying
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 8
        this.sprites = sprites
        this.dead = false
        this.mirror = mirror

        for (const sprite in this.sprites)
        {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
 
    update () {
        this.draw(this.mirror)
        if (!this.dead) this.animateFrame()

        // attack boxes
        if(!this.mirror)
        {
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x; 
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y; 
        }
        else
        {
            this.attackBox.position.x = this.position.x + this.attackBox.mirroroffset.x; 
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y; 
        }
        
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        if (this.isParrying)
        {
            console.log('parry')
        }
        this.position.x  += this.velocity.x;
        this.position.y += this.velocity.y;
        // Gravity function
        if (this.position.y + this.height + this.velocity.y  >= canvas.height - 96)
        {
            this.velocity.y  = 0
            this.position.y = 330
        }
        else 
        {
            this.velocity.y += gravity;
        }
        
    }

    attack ()
    {
        this.switchSprite('attack1') 
        this.isAttacking = true
    }

    parry ()
    {
        this.switchSprite('parry') 
        this.isParrying = true
    }

    takeHit ()
    {
        this.health -= 5;
       
        if (this.health <= 0)
        {
            this.switchSprite('death') 
        }
        else 
        {
            this.switchSprite('takeHit') 
        }

    }

    switchSprite (sprite)
    {
        // Block other animations with death animation
        if(this.image === this.sprites.death.image ) 
        {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) 
                this.dead = true
            return
        }
        // Block other animations with death animation
        if(this.image === this.sprites.parry.image 
            && this.framesCurrent < this.sprites.parry.framesMax -1) 
        {
            return
        }

        // Block other animations with attack animations
        if(this.image === this.sprites.attack1.image 
            && this.framesCurrent < this.sprites.attack1.framesMax -1) 
        {
            return
        }
       // Block other animations with attack animations
       if(this.image === this.sprites.takeHit.image 
          && this.framesCurrent < this.sprites.takeHit.framesMax -1) 
        {
             return
        }
        switch (sprite) {
            case 'idle' :
                if (this.image !== this.sprites.idle.image)
                {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'run':
                if (this.image !== this.sprites.run.image)
                {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'jump':
              
                if (this.image !== this.sprites.jump.image)
                {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'fall':
              
                if (this.image !== this.sprites.fall.image)
                {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'attack1':
              
                if (this.image !== this.sprites.attack1.image)
                {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'takeHit':
              
                if (this.image !== this.sprites.takeHit.image)
                {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'death':
                if (this.image !== this.sprites.death.image)
                {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
            break

            case 'parry':
                if (this.image !== this.sprites.parry.image)
                {
                    this.image = this.sprites.parry.image
                    this.framesMax = this.sprites.parry.framesMax
                    this.framesCurrent = 0
                }
            break
        }
    }
}