import React, { Component } from 'react';

const styles = {
  cameraContainer: {},
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  video: {
    border: '2px solid black',
  },
  videoOptions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 12,
  },
};

class Camera extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.audioRef = React.createRef();
    this.recorderRef = React.createRef();
    this.audioChunks = [];
    this.canvas = React.createRef();
    this.currentImage = null;
  }
  componentDidMount() {
    this.useMedia();
    this.collectData();
    this.saveVideoToCanvas();
  }

  collectData() {
    setInterval(() => {
      this.currentImage = convertCanvasToImage(this.canvas.current);
      console.log(this.currentImage.src);
      this.audioChunks = [];
    }, 10000);
  }

  useMedia = () => {
    const constraints = {
      video: true,
      audio: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then(this.handleInputs);
  };

  handleInputs = stream => {
    this.handleVideoInput(stream);
    this.handleAudioInput(stream);
  };

  handleVideoInput = stream => {
    const video = this.videoRef.current;
    video.srcObject = stream;
  };

  handleAudioInput = stream => {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    source.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = e => {
      this.audioChunks.push(e.inputBuffer);
    };
  };

  saveVideoToCanvas = () => {
    const video = this.videoRef.current;
    const ctx = this.canvas.current.getContext('2d');
    console.log(ctx);
    video.addEventListener(
      'play',
      function() {
        var $this = this; //cache
        (function loop() {
          if (!$this.paused && !$this.ended) {
            ctx.drawImage($this, 0, 0);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
          }
        })();
      },
      0,
    );
  };

  render() {
    return (
      <div style={styles.cameraContainer}>
        <div style={styles.videoContainer}>
          <video
            hidden
            style={styles.video}
            id="video"
            ref={this.videoRef}
            width="320"
            height="240"
            autoPlay
          />
          <canvas id="canvas" ref={this.canvas} width="620" height="480" />
        </div>
        <div>
          <input
            type="file"
            ref={this.recorderRef}
            hidden
            accept="audio/*"
            capture
            id="recorder"
          />
          <input type="file" hidden accept="image/*;capture=camera" />
        </div>
      </div>
    );
  }
}

export default Camera;

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL('image/jpeg', 0.3);

  return image;
}
