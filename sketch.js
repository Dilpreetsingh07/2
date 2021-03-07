const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var tommy,happydog,foodS,foodstock;
var database;
var addbutton,feed,foodObj;
var food,lastfed;
var foodS=0;

function preload(){
hg=loadImage("images/dogImg1.png")
saddog=loadImage("images/dogImg.png")
}

function setup() {
  database=firebase.database();
 
	createCanvas(800, 700);
  engine = Engine.create();
  world = engine.world;

 tommy=createSprite(600,350,70,70)
  tommy.addImage(saddog)
  tommy.scale=0.2

foodObj=new Food(600,350);



 foodstock=database.ref("food")
  foodstock.on("value",readstock)


  feed=createButton("feed the dog")
  feed.position(800,95);
  feed.mousePressed(feeddog)

  addbutton=createButton("Add Food")
  addbutton.position(700,95);
  addbutton.mousePressed(addfood)

}


function draw() {  
background(46,136,87)
 foodObj.display();
 

 feedtime=database.ref('feedtime')
  feedtime.on("value",function(data){
    lastfed=data.val();
  })


//if(keyDown(UP_ARROW)){
 // writestock(foodS);
 // tommy.addImage(hg)






 drawSprites();
 

 textSize(20)
 fill("black")
 stroke("blue")
 
 text("Food Remaining: "+foodS,200,200)

 fill(255,255,254);
 textSize(15);
  if(lastfed>=12){
   text("Last Fed :"+lastfed%12 + "PM",350,30)
  }
   else if(lastfed==0){
     text("Last Fed : 12 AM",350,30)
   }
   else{
     text("Last Fed :"+lastfed+"AM",350,30)
   }


}




function readstock(data){
  foodS=data.val();
  foodObj.updatefoodStock(foodS)
}


function writestock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }





  database.ref("/").update({
    food:x
  })
}

function feeddog(){
  tommy.addImage(hg);
  foodS=foodS-1

  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    feedtime:hour()
   
  })
}
  
function addfood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
