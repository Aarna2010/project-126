music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    music1 = loadSound('music.mp3');
    music2 = loadSound('music2.mp3');
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet model is initilized");
}

function gotPoses(results){
    if(results.length > 0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristx = " + leftWristX + " | leftWristY = " + leftWristY);
        console.log("rightWristx = " + rightWristX + " | rightWristY = " + rightWristY);
    }
}

function draw() 
{
    image(video, 0, 0, 500, 500);
    song1_status = music1.isPlaying();
    song2_status = music2.isPlaying();
    fill("purple");
    stroke("pink");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        music1.stop();

        if(song2_status == false)
        {
            music2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan";
        }
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        music2.stop();

        if(song1_status == false)
        {
            music1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }


}