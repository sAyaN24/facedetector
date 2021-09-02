console.clear();

let video = document.getElementById("camVideo");
let classifier;
let canvas = document.getElementById("myVideo");
let ctx = canvas.getContext("2d");
let without_mask = document.getElementById("sadVal");
let with_mask = document.getElementById("angerVal");

function showVideo(){
    ctx.drawImage(video,0,0,224,224);
}

function setupCamera(){
    navigator.mediaDevices.getUserMedia({
        video: {width: 224, height: 224},
        audio: false
    })
    .then((stream) => {
        video.srcObject = stream;
    })
}
function modelLoaded() {
    console.log('Model Loaded!');
}



async function detectmask(){
    ctx.drawImage(video,0,0,224,224);
    classifier.classify((err, results) => {
        if(results[0].label == "Without Mask"){
            without_mask.innerHTML = (results[0].confidence * 100).toFixed(2) ;
            with_mask.innerHTML = (results[1].confidence * 100).toFixed(2) ;
            myChart2.data.datasets[0].data[0] = (results[0].confidence * 100).toFixed(2);
            myChart2.update();
            myChart3.data.datasets[0].data[0] = (results[1].confidence * 100).toFixed(2);
            myChart3.update();
        }
        else{
            without_mask.innerHTML = (results[1].confidence * 100).toFixed(2) ;
            with_mask.innerHTML = (results[0].confidence * 100).toFixed(2) ;
            myChart2.data.datasets[0].data[0] = (results[1].confidence * 100).toFixed(2);
            myChart2.update();
            myChart3.data.datasets[0].data[0] = (results[0].confidence * 100).toFixed(2);
            myChart3.update();
        }
        
    });
}

setupCamera();
video.addEventListener("loadeddata",async () => {
    classifier = await ml5.imageClassifier('./model/model.json',video,modelLoaded);
    // setInterval(showVideo,40);
    setInterval(detectmask,60);
})





