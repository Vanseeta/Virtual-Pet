//Create variables here
var Dog, database, FoodS, FoodStock;
var Dog_animation, HappyDog_animation;

function preload()
{
  //load images here
  Dog_animation = loadImage(dogImg.png);
  HappyDog_animation = loadImage(dogImg1.png);
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  Dog.addImage(Dog_animation);
  FoodStock = database.ref('Food');
  FoodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyDown(UP_ARROW)) {
    FoodS = FoodS + 1;
  }

  if(keyWentDown(UP_ARROW)) {
    writeStock(FoodS);
    Dog.addImage(HappyDog_animation);
  }

  drawSprites();

  //add styles here
  text("Note: Press UP_ARROW Key To Feed Draco Milk!", 50, 20);
}

//Function to read values from DB
function readStock(data) {
  FoodS = data.val();
}

//Function to write values in DB
function writeStock(x) {
  if(x<=0) {
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}