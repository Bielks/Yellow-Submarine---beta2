//pacíficos
var submarine, submarineImg;
var tiro, tiroImg;
var cobaia, cobaiaImg;
var mergulhador, mergulhadorImg;
//monstros
var piranha, piranhaImg;
var polvo, polvoImg;
var aguaViva, aguaVivaImg;
var tartaruga, tartarugaImg;
//estados
var atirar = false
//vida da tartaruga
var Vida1Tartaruga = 1;
var Vida2Tartaruga = 2;
var Vida3Tartaruga = 3;
var Vida4Tartaruga = 4;
var Vida5Tartaruga = 5;

var estado = 1;

function preload(){
  submarineImg = loadImage('imagens/yellow submarine.png');
  tiroImg = loadImage('imagens/tiro.png');
  //carregando imagens dos monstros
  aguaVivaImg = loadAnimation('imagens/agua viva 1.png', 'imagens/agua viva 2.png');
  piranhaImg = loadAnimation('imagens/piranha 1.png', 'imagens/piranha 2.png');
  tartarugaImg = loadImage('imagens/tartaruga.png')
}

function setup(){
  createCanvas(900, 400);
  grupoAguaviva = createGroup();
  grupoPiranha = createGroup();
  grupoTartaruga = createGroup();

  submarine = createSprite(100, 200, 50, 50);
  submarine.addImage('submarino', submarineImg);
  submarine.scale = 0.1;
  submarine.debug = true;

  tiro = createSprite(100, 200, 28, 4);
  tiro.scale = 0.06;
}

function draw(){
  background('purple');
  
  submarine.y = mouseY -15;

  gerador_de_agua_viva();
  gerador_de_piranha();
  gerador_de_tartaruga();

  if(atirar === false){
    tiro.y = submarine.y +15;
    tiro.x = submarine.x;
  }

  if(mouseIsPressed === true && atirar === false){
    if(mouseButton === LEFT){
      atirar = true;
    }
  }

  if(atirar === true){
    tiro.addImage('tiro', tiroImg)
    tiro.velocityX = 30;
  }

  if(atirar === true && tiro.x >= 900){
    atirar = false
  }
  //condições de colisões
  if(tiro.isTouching(grupoAguaviva) && atirar === true){
    aguaViva.destroy();
    atirar = false;
  }

  if(tiro.isTouching(grupoPiranha) && atirar === true){
    piranha.destroy();
    atirar = false;
  }

  if(tiro.isTouching(grupoTartaruga) && estado === 1 && atirar === true){
    estado = 2;
    atirar = false;
  }

  if(tiro.isTouching(grupoTartaruga) && estado === 2 && atirar ===true){
    estado = 3;
    atirar = false;
  }

  if(tiro.isTouching(grupoTartaruga) && estado === 3 && atirar ===true){
    estado = 4;
    atirar = false;
  }

  if(tiro.isTouching(grupoTartaruga) && estado === 4 && atirar ===true){
    estado = 5;
    atirar = false;
  }

  if(tiro.isTouching(grupoTartaruga) && estado === 5 && atirar ===true){
    tartaruga.destroy();
    atirar = false;
    estado = 1;
  }

  submarine.depth = tiro.depth +10
  drawSprites();
}

function gerador_de_agua_viva(){
  if(frameCount % 200 === 150){
    aguaViva = createSprite(900, random(30, 370), 50, 50);
    aguaViva.velocityX = -5;
    aguaViva.addAnimation('agua viva', aguaVivaImg);
    aguaViva.scale = 0.08;
    grupoAguaviva.add(aguaViva);
  }
}

function gerador_de_piranha(){
  if(frameCount % 60 === 50){
    piranha = createSprite(900, random(30, 370), 50, 50);
    piranha.velocityX = -15;
    piranha.addAnimation('piranha', piranhaImg);
    piranha.scale = 0.05;
    piranha.debug = true;
    grupoPiranha.add(piranha);
  }
}

function gerador_de_tartaruga(){
  if(frameCount % 500 === 100){
    tartaruga = createSprite(900, random(30, 370), 50, 50);
    tartaruga.velocityX = -2;
    tartaruga.addImage('tartaruga', tartarugaImg);
    tartaruga.scale = 0.08
    grupoTartaruga.add(tartaruga);
  }
}

// um pixel é o equivalente a 2.5