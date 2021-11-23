var video;
var poseNet;
var poseValue;
var filter1;

function preload() {
  filter1 = loadImage("filter1.png");
  filter2 = loadImage("filter2.png");
  shades = loadImage("shades.png");
}

function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.hide();

  //initializing ml5.poseNet
  //ml5.poseNet(videoElement , callback); one of the way to initialise
  poseNet = ml5.poseNet(video, modelLoaded);

  //whenever the poseNet model detects a pose , we're gonna call the
  //event (or) function and get the output
  // syntax poseNet.on('pose', callbackFunction)

  poseNet.on("pose", gotPoses);
}

function gotPoses(myPose) {
  //console.log('Getting poses', myPose );
  if (myPose.length > 0) {
    poseValue = myPose[0].pose;
  }
}

function modelLoaded() {
  console.log("PoseNet Model Ready");
}

function draw() {
  background(220);
  image(video, 0, 0);
  if (poseValue) {
    x1 = poseValue.rightEye.x;
    x2 = poseValue.leftEye.x;
    y1 = poseValue.rightEye.y;
    y2 = poseValue.leftEye.y;

    //resize the image according to the distance
    distance = dist(x1, y1, x2, y2);

    // flowerCrown()

    //doggyFilter();
    
    //shades
    
    push();
    imageMode(CENTER);
    image(shades, (x1 + x2) / 2, (y1 + y2) / 2, distance*2, distance);
    pop();
    //stand up when you try for wrist , that's most likely cause the
    //model has been trained on standing images
    fill(0, 0, 255);
    ellipse(poseValue.leftWrist.x, poseValue.leftWrist.y, 10);
  }

  //image(filter1,200,200);
}
function flowerCrown() {
  //keep the image in the middle of both the eyes
  push();
  imageMode(CENTER);
  image(filter1, (x1 + x2) / 2, (y1 + y2) / 2, distance, distance);
  pop();
}

function doggyFilter() {
 push();
 imageMode(CENTER);
  ellipse (poseValue.nose.x, poseValue.nose.y,10,10)
  image(filter2, poseValue.nose.x, poseValue.nose.y-(distance), distance*4, distance*4);
  pop();
}
