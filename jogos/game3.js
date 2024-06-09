// Configuração do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definição das variáveis do jogador (skate)
let player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 20,
    speed: 5,
    isJumping: false,
    jumpHeight: 100,
    isGrinding: false
};

// Variáveis de controle do jogo
let isGameOver = false;
let score = 0;
const gravity = 1;
const groundY = canvas.height - 80;

// Array para armazenar os prédios
let buildings = [];

// Função para criar os prédios
function createBuildings() {
    for (let i = 0; i < 5; i++) {
        let building = {
            x: i * 200,
            y: groundY - Math.random() * 150 - 50,
            width: 100,
            height: groundY - (groundY - 150),
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        };
        buildings.push(building);
    }
}

// Função para desenhar os prédios
function drawBuildings() {
    for (let building of buildings) {
        ctx.fillStyle = building.color;
        ctx.fillRect(building.x, building.y, building.width, building.height);
    }
}

// Função para desenhar o jogador (skate)
function drawPlayer() {
    ctx.fillStyle = '#ff0000'; // Cor vermelha
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para atualizar a posição do jogador (skate)
function updatePlayer() {
    // Aplicar gravidade
    if (player.y < groundY || player.isJumping) {
        player.y += gravity;
    } else {
        player.isJumping = false;
    }

    // Verificar se o jogador está grindando
    if (player.isGrinding) {
        player.x += player.speed * 2; // Velocidade dobrada durante o grind
    }

    // Impedir que o jogador saia da tela
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x > canvas.width - player.width) {
        player.x = canvas.width - player.width;
    }

    // Desenhar o jogador
    drawPlayer();
}

// Função de loop do jogo
function gameLoop() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar elementos do jogo
    drawBuildings();
    updatePlayer();

    // Atualizar pontuação
    score++;

    // Loop do jogo
    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar o loop do jogo
gameLoop();

// Inicializar os prédios
createBuildings();

// Capturar eventos de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && !player.isJumping) {
        player.y -= player.jumpHeight;
        player.isJumping = true;
    }
    if (event.key === 'ArrowLeft') {
        player.x -= player.speed;
    }
    if (event.key === 'ArrowRight') {
        player.x += player.speed;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowDown') {
        player.isGrinding = true;
    }
});

// Função para verificar colisão entre o jogador e os prédios
function checkCollision(player, building) {
    return player.x < building.x + building.width &&
           player.x + player.width > building.x &&
           player.y < building.y + building.height &&
           player.y + player.height > building.y;
}

