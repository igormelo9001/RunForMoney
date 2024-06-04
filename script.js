/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const monster = document.getElementById('monster');
    const maze = document.getElementById('maze');
    const moneyElements = document.querySelectorAll('.money');
    const walls = document.querySelectorAll('.wall');
    let playerPosition = { top: 10, left: 10 };
    let monsterPosition = { top: 550, left: 750 };

    const movePlayer = (event) => {
        let newTop = playerPosition.top;
        let newLeft = playerPosition.left;
        switch (event.key) {
            case 'ArrowUp':
                newTop = Math.max(0, playerPosition.top - 10);
                break;
            case 'ArrowDown':
                newTop = Math.min(maze.clientHeight - player.clientHeight, playerPosition.top + 10);
                break;
            case 'ArrowLeft':
                newLeft = Math.max(0, playerPosition.left - 10);
                break;
            case 'ArrowRight':
                newLeft = Math.min(maze.clientWidth - player.clientWidth, playerPosition.left + 10);
                break;
        }
        if (!isCollision(newTop, newLeft, player)) {
            playerPosition.top = newTop;
            playerPosition.left = newLeft;
            player.style.top = `${playerPosition.top}px`;
            player.style.left = `${playerPosition.left}px`;
        }
        checkCollisionWithMoney();
    };

    const moveMonster = () => {
        let newTop = monsterPosition.top;
        let newLeft = monsterPosition.left;
        if (monsterPosition.top < playerPosition.top) {
            newTop += 10;
        } else if (monsterPosition.top > playerPosition.top) {
            newTop -= 10;
        }
        if (monsterPosition.left < playerPosition.left) {
            newLeft += 10;
        } else if (monsterPosition.left > playerPosition.left) {
            newLeft -= 10;
        }
        if (!isCollision(newTop, newLeft, monster)) {
            monsterPosition.top = newTop;
            monsterPosition.left = newLeft;
            monster.style.top = `${monsterPosition.top}px`;
            monster.style.left = `${monsterPosition.left}px`;
        }
    };

    const isCollision = (top, left, element) => {
        const elementRect = element.getBoundingClientRect();
        for (const wall of walls) {
            const wallRect = wall.getBoundingClientRect();
            if (
                top < wallRect.bottom &&
                top + elementRect.height > wallRect.top &&
                left < wallRect.right &&
                left + elementRect.width > wallRect.left
            ) {
                return true;
            }
        }
        return false;
    };

    const checkCollisionWithMoney = () => {
        moneyElements.forEach(money => {
            const moneyRect = money.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            if (
                playerRect.left < moneyRect.left + moneyRect.width &&
                playerRect.left + playerRect.width > moneyRect.left &&
                playerRect.top < moneyRect.top + moneyRect.height &&
                playerRect.top + playerRect.height > moneyRect.top
            ) {
                money.style.display = 'none';
            }
        });
    };

    document.addEventListener('keydown', movePlayer);
    setInterval(moveMonster, 500);
});
