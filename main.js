prediction1 = "";
prediction2 = "";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takesnap() {

Webcam.snap(function (data_uri){

  document.getElementById("result").innerHTML = "<img id='capture_img' src='" + data_uri + "'>";

});

}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lz7wRhf7L/model.json',modelLoaded);


function modelLoaded() {

  console.log("model loaded");


}

function check() {

  img =  document.getElementById("capture_img");
  classifier.classify(img, gotResult);
  
  }
  
  
  
  function gotResult(error, results) {

    if (error) {
    console.error(error);
    }
    else {
      console.log(results);
      prediction1 = results[0].label;
      prediction2 = results[1].label;
      document.getElementById("result_emotion_name").innerHTML = prediction1;
      document.getElementById("result_emotion_name2").innerHTML = prediction2;
      speak();
      if (results[0].label == "Thumbs up") {
        document.getElementById("result_emotion_name").innerHTML = "&#128077;";
      }
      if (results[0].label == "Ok") {
        document.getElementById("result_emotion_name").innerHTML = "&#128076;";
      }
      if (results[0].label == "Peace") {
        document.getElementById("result_emotion_name").innerHTML = "&#9996;";
      }
    
    
    
      if (results[1].label == "Thumbs up") {
        document.getElementById("result_emotion_name2").innerHTML = "&#128077;";
      }
      if (results[1].label == "Ok") {
        document.getElementById("result_emotion_name").innerHTML = "&#128076;";
      }
      if (results[1].label == "Peace") {
        document.getElementById("result_emotion_name2").innerHTML = "&#9996;";
      }
    }
    
    }
    
    function speak() {
    
      synth = window.speechSynthesis;
      speakdata1 = "The first prediction is" + prediction1;
      speakdata2 = " . And the second prediction is" + prediction2;
      utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
      synth.speak(utterthis);
      
      }