export default function audioRecorder(stream, time) {
  return new Promise(resolve => {
    let chunks = [];
    const mediaRecorder = new window.MediaRecorder(stream);

    const startRecording = () => {
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
      }, 1000 * 20);
    };
    startRecording();
    mediaRecorder.onstop = function(e) {
      const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
      console.log(blob);
      startRecording();
    };
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  });
}
