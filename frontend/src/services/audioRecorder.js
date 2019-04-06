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
      // chunks = [];
      // console.log(blob);
      // const audioURL = URL.createObjectURL(blob);
      // console.log(audioURL);
      // resolve(audioURL);
      // var reader = new window.FileReader();
      // reader.readAsDataURL(blob);
      // reader.onloadend = function() {
      //   let base64 = reader.result;
      //   base64 = base64.split(',')[1];
      //   console.log(base64);
      // };
    };
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  });
}
