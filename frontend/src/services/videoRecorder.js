export default function videoRecorder(stream) {
  return new Promise(resolve => {
    let chunks = [];
    const mediaRecorder = new window.MediaRecorder(stream);

    const startRecording = () => {
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
      }, 15000);
    };
    startRecording();
    mediaRecorder.onstop = function(e) {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      console.log(blob);
      resolve(blob);
    };
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  });
}
