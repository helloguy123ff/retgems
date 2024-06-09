// Configuração do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definição das variáveis do jogador
let player = {
    x: canvas.width / 4,
    y: canvas.height - 75,
    width: 50,
    height: 50,
    speed: 5,
    score: 0
};

// Array para armazenar os inimigos
let enemies = [];

// Array para armazenar os obstáculos
let obstacles = [];

// Variáveis de controle do jogo
let isGameOver = false;
const enemySpeed = 3;
const obstacleSpeed = 4;
const maxEnemies = 5;
const maxObstacles = 3;
const jumpForce = 15;
let isJumping = false;

// Função para criar inimigos
function createEnemy() {
    let enemy = {
        x: canvas.width + 100,
        y: canvas.height - 75,
        width: 50,
        height: 50
    };
    enemies.push(enemy);
}

// Função para criar obstáculos
function createObstacle() {
    let obstacle = {
        x: canvas.width + 100,
        y: canvas.height - 75,
        width: 30,
        height: 30
    };
    obstacles.push(obstacle);
}

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = '#ff0000'; // Cor vermelha
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para desenhar os inimigos
function drawEnemies() {
    ctx.fillStyle = '#00ff00'; // Cor verde
    for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

// Função para desenhar os obstáculos
function drawObstacles() {
    ctx.fillStyle = '#0000ff'; // Cor azul
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// Função de atualização do jogo
function update() {
    if (!isGameOver) {
        // Limpar o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar o fundo
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Movimentação do jogador
        if (keys['ArrowUp'] && !isJumping) {
            isJumping = true;
            player.y -= jumpForce;
        }
        if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }

        // Movimentação dos inimigos
        for (let enemy of enemies) {
            enemy.x -= enemySpeed;
            if (enemy.x + enemy.width < 0) {
                enemy.x = canvas.width + 100;
            }

            // Verificar colisão com o jogador
            if (checkCollision(player, enemy)) {
                isGameOver = true;
            }
        }

        // Movimentação dos obstáculos
        for (let obstacle of obstacles) {
            obstacle.x -= obstacleSpeed;
            if (obstacle.x + obstacle.width < 0) {
                obstacle.x = canvas.width + 100;
            }

            // Verificar colisão com o jogador
            if (checkCollision(player, obstacle)) {
                isGameOver = true;
            }
        }

        // Desenhar elementos na tela
        drawPlayer();
        drawEnemies();
        drawObstacles();

        // Atualizar a pontuação do jogador
        player.score++;

        // Criar novos inimigos e obstáculos
        if (enemies.length < maxEnemies && Math.random() < 0.01) {
            createEnemy();
        }
        if (obstacles.length < maxObstacles && Math.random() < 0.01) {
            createObstacle();
        }
    } else {
        // Mostrar tela de game over
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Arial';
        ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText('Score: ' + player.score, canvas.width / 2 - 50, canvas.height / 2 + 40);
    }
}

// Função de loop do jogo
function gameLoop() {
    update();
    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar o loop do jogo
gameLoop();

// Capturar os eventos de teclado
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Função para verificar colisão entre dois objetos retangulares
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}
