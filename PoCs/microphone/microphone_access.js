// NOTE: In Chrome this doesn't work accessing the file directly, you need a server.

window.AudioContext = window.AudioContext ||
    window.webkitAudioContext;

navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

var audioContext = new AudioContext();

var errorCallback = function errorCallbackFunction(error) {
    console.log(error);
};

var gotStreamCallback = function gotStreamCallbackFunction(stream) {
    var microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(audioContext.destination);
}

navigator.getMedia({audio: true}, gotStreamCallback, errorCallback);