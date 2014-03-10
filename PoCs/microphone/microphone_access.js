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

var bd = new BeatDetektor();

var gotStreamCallback = function gotStreamCallbackFunction(mediaStream) {
    var microphoneSource = audioContext.createMediaStreamSource(mediaStream);

    // Add a delay node to create a delay effect
    var delayNode = audioContext.createDelay(100);
    delayNode.delayTime.value = 0;
    microphoneSource.connect(delayNode);

    // Add a analyser node to be able to get data about the signal
    var analyserNode = audioContext.createAnalyser();
   // var frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
    delayNode.connect(analyserNode);

    var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    analyserNode.connect(javascriptNode);

    javascriptNode.onaudioprocess = function(e) {
        var inputArrayL = e.inputBuffer.getChannelData(0);

        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(freqByteData);

        console.log(audioContext.currentTime);

        bd.process(audioContext.currentTime, freqByteData);

        console.log((bd.win_bpm_int/10.0)+" BPM / "+(bd.win_bpm_int_lo)+" BPM");

    }

    // Connect to the sound output
    javascriptNode.connect(audioContext.destination);
}

navigator.getMedia({audio: true}, gotStreamCallback, errorCallback);

