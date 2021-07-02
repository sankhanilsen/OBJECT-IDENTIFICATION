img = "";
status= "";
objects= [];
function preload(){
img = loadImage('external_mobile-security-versus-desktop-and-laptop-security-is-there-even-a-difference-anymore.jpg');
}
function draw(){
    image(video,0,0,380,380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status :object Detected  " ;
            document.getElementById("number_of_objects").innerHTML = "NUMBER OF OBJECTS DECTECTED ARE :" + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100 );
            text(objects[i].label+" " +percent+ "%" ,objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("MODEL LOADED ! ");
     status = true;
 

}
function gotResult(error,results){
    if(error){
     console.log(error);
    }
    console.log(results);
    objects= results;
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide(),
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status :Detecting Object " ;

}
