function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
 video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modalLoded);
}
function modalLoded() {
  console.log("Its work");

}
function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}
previousResult="";

function gotResult (error, result) {
  if (error) {
    console.error(error)
  }
  else {
    if((result[0].confidence>0.50)&& (previousResult != result[0].label)) {
      console.log(result);
      previousResult=result[0].label;
      var synth= window.speechSynthesis;
      var speakData= "Object detected is " + result[0].label;
      utterthis= new SpeechSynthesisUtterance(speakData);
      synth.speak(utterthis);
      document.getElementById("name_object").innerHTML = result[0].label;
      document.getElementById("accuracy_object").innerHTML = result[0].confidence*100;
    }
  }
}
