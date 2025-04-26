window.addEventListener('keydown', function(e) {
    const keysToDisable = [32, 33, 34, 35, 36, 37, 38, 39, 40]; 
  
    if (keysToDisable.includes(e.keyCode)) {
      e.preventDefault();
    }
  });
 


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

const gravity = 1.0;
canvas.width = 1024 //window.innerWidth-20;
canvas.height = 576 //window.innerHeight -20;
c.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './media/stage/forest.png',
    mirror: false
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './media/shop.png',
    scale: 2.75,
    framesMax: 6
})


const player = new Fighter
    (
        {
            position: { x: 200, y: 0 },
            velocity: { x: 0, y: 0 },
            color: 'red',
            imageSrc: './media/characters/Charizard/Idle-Anim.png',
            framesMax: 4,
            scale: 6.5,
            offset: { x: 215, y: 40 },
            sprites: {
                idle: {
                    imageSrc: './media/characters/Charizard/Idle-Anim.png',
                    framesMax: 4
                },
                run: {
                    imageSrc: './media/characters/Charizard/Walk-Anim.png',
                    framesMax: 4
                },
                jump: {
                    imageSrc: './media/characters/Charizard/Jump-Anim.png',
                    framesMax: 2
                },
                fall: {
                    imageSrc: './media/characters/Charizard/Fall-Anim.png',
                    framesMax: 2
                },
                attack1: {
                    imageSrc: './media/characters/Charizard/Attack-Anim.png',
                    framesMax: 6
                },
                takeHit: {
                    imageSrc: './media/characters/Charizard/Hurt-Anim.png',
                    framesMax: 2
                },
                death: {
                    imageSrc: './media/characters/Charizard/Faint-Anim.png',
                    framesMax: 4
                },
                parry: {
                    imageSrc: './media/characters/Charizard/Walk.png',
                    framesMax: 10
                }
            },
            attackBox: {
                offset: {
                    x: -50,
                    y: 0
                },
                width: 150,
                height: 150,
                mirroroffset: {
                    x: -300,
                    y: 50
                }
            },
            mirror: false
        }
    );

const enemy = new Fighter
    (
        {
            position: { x: 900, y: 0 },
            velocity: { x: 0, y: 0 },
            color: 'blue',
            imageSrc: './media/characters/Blastoise/Idle-Anim.png',
            framesMax: 8,
            scale: 6.5,
            offset: { x: 150, y: 40 },
            sprites: {
                idle: {
                    imageSrc: './media/characters/Blastoise/Idle-Anim.png',
                    framesMax: 8
                },
                run: {
                    imageSrc: './media/characters/Blastoise/Walk-Anim.png',
                    framesMax: 4
                },
                jump: {
                    imageSrc: './media/characters/Blastoise/Jump-Anim.png',
                    framesMax: 2
                },
                fall: {
                    imageSrc: './media/characters/Blastoise/Fall-Anim.png',
                    framesMax: 2
                },
                attack1: {
                    imageSrc: './media/characters/Blastoise/Shoot-Anim.png',
                    framesMax: 6
                },
                takeHit: {
                    imageSrc: './media/characters/Blastoise/Hurt-Anim.png',
                    framesMax: 2
                },
                death: {
                    imageSrc: './media/characters/Blastoise/Faint-Anim.png',
                    framesMax: 4
                },
                parry: {
                    imageSrc: './media/characters/Blastoise/Hurt-Anim.png',
                    framesMax: 4
                }
            },
            attackBox: {
                offset: {
                    x: 50,
                    y: 0
                },
                width: 150,
                height: 150,
                mirroroffset: {
                    x: -250,
                    y: 0
                }
            },
            mirror: true
        }
    );

    
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    v: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

// ANIMATIONS
function animate() {
    window.requestAnimationFrame(animate) // Create an infinite animation loop
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    c.fillStyle = 'rgba(255,255,255,0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (startTimer >= 0) {
        return
    }
    else 
    {
        if(player.position.x > enemy.position.x)
        {
            player.mirror = true
            enemy.mirror = false
        }
        else
        {
            player.mirror = false
            enemy.mirror = true
        }


        if (keys.v.pressed && player.lastKey === 'v') {
            player.isParrying = true
        } else {
            player.isParrying = false
        }

        // Player Movement    
        if (keys.a.pressed && player.lastKey === 'a') {
            if (player.position.x + player.width > 0) // Avoid existing game area
            {
                player.velocity.x = -5
                player.switchSprite('run')
            }

        } else if (keys.d.pressed && player.lastKey === 'd') {
            if (player.position.x + player.width < canvas.width) // Avoid existing game area
            {
                player.velocity.x = 5
                player.switchSprite('run')
            }
        }
        else {
            player.switchSprite('idle')
        }
        // Player Jumping
        if (player.velocity.y < 0) {
            player.switchSprite('jump')
        } else if (player.velocity.y > 0) {
            player.switchSprite('fall')
        }

        // Enemy Movement
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            if (enemy.position.x + enemy.width > 0) // Avoid existing game area
            {
                enemy.velocity.x = -5
                enemy.switchSprite('run')
            }
        } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            if (enemy.position.x + enemy.width < canvas.width) // Avoid existing game area
            {
                enemy.velocity.x = 5
                enemy.switchSprite('run')
            }
        }
        else {
            enemy.switchSprite('idle')
        }
        // Enemy Jumping
        if (enemy.velocity.y < 0) {
            enemy.switchSprite('jump')
        } else if (enemy.velocity.y > 0) {
            enemy.switchSprite('fall')
        }

        // detect for collision
        if (attackEvaluation({ attacker: player, attacked: enemy }) && player.isAttacking && player.framesCurrent === 4 && !enemy.isParrying) {
            enemy.takeHit()
            enemy.velocity.x = 100 * (enemy.mirror ? 1 : -1);
            enemy.velocity.y = -5
            player.isAttacking = false;
            gsap.to('#enemyHealth', { width: enemy.health + '%' })
            console.log('Player attack collide')
        }
        if (player.isAttacking && player.framesCurrent === 4) {
            player.isAttacking = false
        }

        if (attackEvaluation({ attacked: enemy, attacker: player }) && enemy.isAttacking && enemy.framesCurrent === 2 && !player.isParrying) {
            player.takeHit()
            player.velocity.x = 100 * (player.mirror ? 1 : -1);
            player.velocity.y = -5
            enemy.isAttacking = false;
            gsap.to('#playerHealth', { width: player.health + '%' })
            console.log('Enemy attack collide')
        }
        if (enemy.isAttacking && enemy.framesCurrent === 6) {
            enemy.isAttacking = false
        }

        // end game base on health
        if (enemy.health <= 0 || player.health <= 0) {
            determineWinner({ player, enemy, timerId })
        }

    }
    
}

decreaseStartTimer()
animate()

document.addEventListener("DOMContentLoaded", function () {
    const playAgainButton = document.getElementById("playAgain");

    if (playAgainButton) { // Ensure the button exists
        playAgainButton.addEventListener("click", function () {
            console.log("Play Again clicked!");
            window.location.reload(); // Reload the page
        });
    } else {
        console.error("Button #playAgain not found!");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let audio = document.getElementById("myAudio");
    let playButton = document.getElementById("playButton");

    audio.play().catch(error => {
        console.log("Autoplay blocked:", error);
    });

    playButton.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = 'Turn off music'; 
        } else {
            audio.pause();
            playButton.innerHTML = 'Turn on music'; 
        }
    });
});



