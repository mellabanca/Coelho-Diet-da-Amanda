const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var linguica;
var natura;
let engine;
let world;
var grandechurrasco; 
var ground;
var academia;
var nutricao;
var alfredo;
var alfredofitness;
var tentacao;
var piscadinha;
var seAlimentando;
var comeuBesteira;
var musicadotiozao, quebrouasleisdanutricionista, comidasuja, comidagostosa, ffffffff;
var chicotedanutricionista;
var caixadeSom;
var tentacao2;
var tentacao3;
var linguica2;
var linguica3;
var grandechurrasco2;
var grandechurrasco3;




function preload(){
  academia = loadImage("background.png");
  nutricao = loadImage("melon.png");
  alfredo = loadImage("Rabbit-01.png");

  piscadinha = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  seAlimentando = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  comeuBesteira = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  musicadotiozao = loadSound("sound1.mp3");
  quebrouasleisdanutricionista = loadSound("rope_cut.mp3");
  comidasuja = loadSound("sad.wav");
  comidagostosa = loadSound("eating_sound.mp3");
  ffffffff = loadSound("air.wav");

  piscadinha.playing = true;
  seAlimentando.playing = true;
  comeuBesteira.playing = true;

  seAlimentando.looping = false;
comeuBesteira.looping = false;
}

function setup() 
{
  var estaNoCelular = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if(estaNoCelular){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }

  musicadotiozao.play();
  musicadotiozao.setVolume(0.2);
  engine = Engine.create();
  world = engine.world;

  piscadinha.frameDelay = 20;
  seAlimentando.frameDelay = 20;
 
  ground = new Ground(200, canH, 600, 20);
  linguica=new Rope(8,{x:40,y:30});

  linguica2=new Rope(7,{x:370,y:40});

  linguica3=new Rope(4,{x:400,y:225});

  
var options={
  density:0.001
}
natura=Bodies.circle(300,300,15,options);
Matter.Composite.add(linguica.body,natura);

grandechurrasco=new Grandechurrasco(linguica,natura)

grandechurrasco2=new Grandechurrasco(linguica2,natura)

grandechurrasco3=new Grandechurrasco(linguica3,natura)




alfredofitness=createSprite(170,canH-80,100,100);
alfredofitness.addImage(alfredo);
alfredofitness.scale=0.2;
alfredofitness.addAnimation("piscadinha", piscadinha);
alfredofitness.addAnimation("seAlimentando", seAlimentando);
alfredofitness.addAnimation("comeuBesteira",comeuBesteira);
alfredofitness.changeAnimation("piscadinha");

//chicotedanutricionista=createImg("balloon.png");
//chicotedanutricionista.position(10,250);
//chicotedanutricionista.size(150,100);
//chicotedanutricionista.mouseClicked(barulhosdoSentimento);

tentacao=createImg("cut_button.png");
tentacao.position(20,30);
tentacao.size(50,50);
tentacao.mouseClicked(churrascovegano);

tentacao2=createImg("cut_button.png");
tentacao2.position(330,35);
tentacao2.size(50,50);
tentacao2.mouseClicked(churrascovegano2);

tentacao3=createImg("cut_button.png");
tentacao3.position(360,200);
tentacao3.size(50,50);
tentacao3.mouseClicked(churrascovegano3);



caixadeSom=createImg("mute.png");
caixadeSom.position(450,20);
caixadeSom.size(50,50);
caixadeSom.mouseClicked(buchoCheio);

  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(academia, width/2, height/2, 500, 700);

  Engine.update(engine);
  if(natura!==null){
    image(nutricao, natura.position.x,natura.position.y,60,60);
  
  }
  
  


  ground.show();
  linguica.show();

  linguica2.show();

  linguica3.show();




  if( alfredoencontroufelicidade(natura,alfredofitness)===true){
    alfredofitness.changeAnimation("seAlimentando");
    comidagostosa.play();
  }
  if(natura!==null&&natura.position.y>=650){
    alfredofitness.changeAnimation("comeuBesteira");
    comidasuja.play();
    musicadotiozao.stop();
    natura=null;
  }
  
  drawSprites();

}
function churrascovegano(){
  quebrouasleisdanutricionista.play();

  linguica.break();
grandechurrasco.cabou();
grandechurrasco=null;

}

function churrascovegano2(){
  quebrouasleisdanutricionista.play();

  linguica2.break();
grandechurrasco2.cabou();
grandechurrasco2=null;

}

function churrascovegano3(){
  quebrouasleisdanutricionista.play();

  linguica3.break();
grandechurrasco3.cabou();
grandechurrasco3=null;

}




function alfredoencontroufelicidade(corpo,sprite){
  if(corpo!==null){
    var longedanutricionista= dist(corpo.position.x,corpo.position.y,sprite.position.x,sprite.position.y);
    if(longedanutricionista<=80){
      World.remove(engine.world,natura);
      natura=null;
      return true;
    } else{
      return false;
    }
  }
}

function barulhosdoSentimento(){
  Matter.Body.applyForce(natura,{x:0,y:0},{x:0.01,y:0});
  ffffffff.play();
}


function buchoCheio(){
  if(musicadotiozao.isPlaying()){
    musicadotiozao.stop();
  }else{
    musicadotiozao.play();
  }
}