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

var first = 0;
var audioProcessCallback = function audioProcessCallback(e) {
    var buffer = e.inputBuffer.getChannelData(0);

    if (first<100) {
        console.log(e);
        console.log('Buffer: ', buffer);
        first++;
    }
}

var gotStreamCallback = function gotStreamCallbackFunction(mediaStream) {
    var microphoneSource = audioContext.createMediaStreamSource(mediaStream);

    // Add a delay node to create a delay effect
    var delayNode = audioContext.createDelay(100);
    delayNode.delayTime.value = 2;
    microphoneSource.connect(delayNode);

    // Add a analyser node to be able to get data about the signal
    var analyserNode = audioContext.createAnalyser();
    var frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
    delayNode.connect(analyserNode);

    // To get the stream in a buffer
    //var audioNode = audioContext.createJavaScriptNode(2048, 1, 1);
    //audioNode.onaudioprocess = audioProcessCallback;
    //analyserNode.connect(audioNode);

    // Connect to the sound output
    analyserNode.connect(audioContext.destination);

    // Interval to get the frequency data every second
    bd_low = new BeatDetektor(48,95);
    var countSeconds = 0;
    var interval = setInterval(function() {
        analyserNode.getByteFrequencyData(frequencyData);
        console.log('Frequency Data: ', frequencyData);
        bd_low.process(countSeconds, frequencyData);
        console.log('BPM: ', bd_low.win_bpm_int_lo);

        countSeconds++;
        if (countSeconds>60) clearInterval(interval);
    }, 1000);
}

navigator.getMedia({audio: true}, gotStreamCallback, errorCallback);

