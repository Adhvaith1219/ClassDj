song="";

leftWrist_x=0;
leftWrist_y=0;

rightWrist_x=0;
rightWrist_y=0;

score_left_wrist=0;
score_right_wrist=0


function preload(){
    song=loadSound("Alan.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_right_wrist=results[0].pose.keypoints[10].score;  
        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("score_left_wrist = "+ score_left_wrist);
        console.log("score_right_wrist = "+ score_right_wrist);

        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;

         console.log("leftWristX = "+leftWrist_x+", leftWristY = "+leftWrist_y);

         rightWrist_x=results[0].pose.rightWrist.x;
         rightWrist_y=results[0].pose.rightWrist.y;

         console.log("rightWristX = "+rightWrist_x+", rightWristY = "+rightWrist_y);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');

}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    
    if(score_right_wrist > 0.02)
    {
        circle(rightWrist_x, rightWrist_y, 20);
        
        if(rightWrist_y > 0 && rightWrist_y <= 100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

          else if(rightWrist_y > 100 && rightWrist_y <= 200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }

        else if(rightWrist_y > 200 && rightWrist_y <= 300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWrist_y > 300 && rightWrist_y <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }

        else if(rightWrist_y > 400 && rightWrist_y <= 500)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }
    
    if(score_left_wrist>0.2 )
    {
    circle(leftWrist_x,leftWrist_y, 20);
    InNumberLeftWrist_Y=Number(leftWrist_y);
    Remove_decimals=floor(InNumberLeftWrist_Y);
    leftWrist_y_divide_1000=Remove_decimals/1000
    volume=volume=leftWrist_y_divide_1000*2;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(2.5);
    song.rate(1);

}