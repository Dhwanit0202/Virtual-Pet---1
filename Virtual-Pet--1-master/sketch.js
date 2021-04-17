var dog,happydog,dogsprite
var database;
var foodstock;
var food;

function preload()
{
	dog=loadImage("images/dogImg.png")
  happydog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dogsprite = createSprite(250,400,10,10);
  dogsprite.addImage("normal",dog);
  dogsprite.addImage("happy",happydog);
  dogsprite.scale = 0.2
  database = firebase.database()
  foodstock = database.ref('food');
  foodstock.on("value",readStock)

}


function draw() {  
 background(46,139,87);
 if(keyWentDown(UP_ARROW)){
   dogsprite.changeAnimation("happy",happydog);
   writeStock(food)
 }
 textSize(20)
 fill(255)
 text("foodstock remaining :  "+food, 150,100)
  drawSprites();
  //add styles here

}

function readStock(data){
food = data.val();
}

function writeStock(x){
if(x<=0){
  x=0
}else{
  x-=1;
}
database.ref('/').update({
food:x
})
}
