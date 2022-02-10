Webcam.set({
width: 350,
height: 300,
image_format: "png",
png_quality: 90
});
var port=document.getElementById("camera");
Webcam.attach(port);


function takesnap(){
Webcam.snap(function (data_uri){
document.getElementById("snapshot").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
}); 
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pIy55I_Gl/model.json", model_loaded);
function model_loaded(){console.log('Model Loaded!');}

var prediction_1="";
var prediction_2="";
function speak(){
var synth= window.speechSynthesis;
speak_data_1 = "The first prediction is " + prediction_1; speak_data_2 = "And the second prediction is " + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
synth.speak(utterThis);
}
function predictemotion(){
img=document.getElementById("captured_image");
classifier.classify(img,gotresult);
}
function gotresult(error,results){
if (error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("emotionname").innerHTML=results[0].label;
    document.getElementById("emotionname2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label=="Happy"){
        document.getElementById("emoji").innerHTML="&#128522;";
    }
    if(results[0].label=="Sad"){
        document.getElementById("emoji").innerHTML="&#128532;";
    }
    if(results[0].label=="Angry"){
        document.getElementById("emoji").innerHTML="&#128545;";
    }
    if(results[0].label=="Victory"){
        document.getElementById("emoji").innerHTML="&#65039;";
    }
    if(results[1].label=="Happy"){
        document.getElementById("emoji2").innerHTML="&#128522;";
    }
    if(results[1].label=="Sad"){
        document.getElementById("emoji2").innerHTML="&#128532;";
    }
    if(results[1].label=="Angry"){
        document.getElementById("emoji2").innerHTML="&#128545;";
    }
    if(results[1].label=="Victory"){
        document.getElementById("emoji2").innerHTML="&#65039;";
    }
}
}