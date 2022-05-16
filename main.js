prediction_1="";

Webcam.set({
width:300,
height:300,
image_format:"jpg",
jpg_quality:100
});

Webcam.attach("#camera");

function take_snapshot(){
Webcam.snap(function (data_uri){
document.getElementById("result").innerHTML= "<img id='captured_img' src='"+data_uri+"'>";
});
}

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1asYil1sR/model.json", modelLoaded);

function modelLoaded(){
console.log("model is loaded");
}

function speak(){
var synth=window.speechSynthesis;
speak_1="the prediction is "+prediction_1;
var utterThis=new window.SpeechSynthesisUtterance(speak_1);
synth.speak(utterThis);
}

function check(){
img= document.getElementById("captured_img");
classifier.classify(img, gotResults);
}

function gotResults(error, results){
if(error){
console.log(error);
}

else{
console.log(results);
document.getElementById("result_sign_name").innerHTML=results[0].label;
prediction_1=results[0].label;
speak();

if(results[0].label=="victory"){
document.getElementById("update_emoji").innerHTML="&#9996;";
}

if(results[0].label=="best"){
    document.getElementById("update_emoji").innerHTML="&#128077;";
    }

    if(results[0].label=="amazing"){
        document.getElementById("update_emoji").innerHTML="&#128076;";
        }  
}
}