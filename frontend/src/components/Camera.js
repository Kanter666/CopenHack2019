import React, { Component } from 'react';
import audioRecorder from '../services/audioRecorder';

const styles = {
  cameraContainer: {},
  videoContainer: {
    display: 'flex',
    flexDirection: 'column',
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
    this.snapshotInterval = null;
  }
  componentDidMount() {
    this.useMedia();
    this.collectData();
    this.saveVideoToCanvas();
  }

  componentWillUnmount() {
    clearInterval(this.snapshotInterval);
  }

  collectData() {
    this.snapshotInterval = setInterval(() => {
      this.currentImage = convertCanvasToImage(this.canvas.current);
      this.props.takeSnapshot(this.currentImage);
      this.audioChunks = [];
    }, 1000);
  }

  useMedia = () => {
    const constraints = {
      video: true,
      audio: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then(this.handleInputs);
  };

  handleInputs = stream => {
    audioRecorder(stream, 10000).then(url => {
      //   // this.audioRef.current.src = url;
    });
    this.handleVideoInput(stream);
    // this.handleAudioInput(stream);
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
            muted
            style={styles.video}
            ref={this.videoRef}
            width="0"
            height="0"
            autoPlay
          />
          <canvas ref={this.canvas} width="620" height="480" />
        </div>
        <div />
      </div>
    );
  }
}

export default Camera;

function convertCanvasToImage(canvas) {
  const image = new Image();
  image.src = canvas.toDataURL('image/jpeg', 0.3);
  return image.src;
}
