window.addEventListener('DOMContentLoaded', () => {
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;

    const startBtn = document.getElementById('ex6start');
    const stopBtn = document.getElementById('ex6stop');
    const audioPlayback = document.getElementById('audioPlayback');
    const downloadLink = document.getElementById('download');

    async function start() {
        if (isRecording) return;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioURL = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioURL;

            downloadLink.href = audioURL;
            downloadLink.download = 'recording.webm';
            downloadLink.textContent = 'Download Recording';
            downloadLink.style.display = 'block';

            isRecording = false;
            startBtn.style.display = 'inline-block';
            stopBtn.style.display = 'none';

            if (audioChunks.length > 0) {
                audioPlayback.controls = true;
                console.log(audioPlayback.controls);
            }
        });

        mediaRecorder.start();

        isRecording = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        audioPlayback.controls = false;
    }

    function stop() {
        if (!isRecording) return;
        mediaRecorder.stop();
    }

    startBtn.addEventListener("click", start);
    stopBtn.addEventListener("click", stop);

});