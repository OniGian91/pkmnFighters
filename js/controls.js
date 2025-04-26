// Keyboard controls
window.addEventListener ('keydown',(event) => {
    if (timer != 0)
    {
    if (!player.dead )
    {
        if (event.key === 'v' )// dodge/parry
        {
            keys.v.pressed = true;
            player.lastKey = 'v'
            player.parry()
        }
        else
        {
            player.isParrying = false
        switch (event.key)
        {
        // Player Keys

        case 'd' || 'D': // left
            keys.d.pressed = true;
            player.lastKey = 'd'
        break 
        case 'a' || 'A': // right
            keys.a.pressed = true;
            player.lastKey = 'a'
        break 
        case 'w' || 'W': // jump
            if (player.position.y > 0)
            {
                player.velocity.y = -20;
            }
        break 
        case ' ': // attack
            player.attack()
        break 
        }
    }
    }
    if (!enemy.dead)
    {
    switch (event.key)
    {
        // Enemy Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
        break 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
        break 
        case 'ArrowUp':
            if (enemy.position.y > 0)
             {
                enemy.velocity.y = -20;
             }
        break 
        case 'ArrowDown':
            enemy.attack()
            console.log('enemy attack!')
        break 
    }
    }
    }
})

window.addEventListener ('keyup',(event) => {
    switch (event.key)
    {
        // Player Keys
        case 'd':
            keys.d.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break  
        case 'w':
            keys.w.pressed = true;
        break 
        // Enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break  
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
        break 
    }
})