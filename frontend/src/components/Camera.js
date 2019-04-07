import React, { Component } from 'react';
import audioRecorder from '../services/audioRecorder';
import videoRecorder from '../services/videoRecorder';

const styles = {
  cameraContainer: { width: '100%' },
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
  canvas: {
    width: '100%',
  },
};

let timer = null;
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
    this.videoRecord = null;
  }
  componentDidMount() {
    this.useMedia();
    this.collectData();
    this.saveVideoToCanvas();
  }

  componentWillUnmount() {
    clearInterval(this.snapshotInterval);
    clearInterval(timer);
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

  handleVideoInput = async stream => {
    const video = this.videoRef.current;
    video.srcObject = stream;
    const { recorder } = this.props;
    if (recorder) {
      recorder(state => ({ ...state, currentSecond: 0 }));
      timer = setInterval(() => {
        recorder(state => ({
          ...state,
          currentSecond: state.currentSecond + 1,
        }));
      }, 1000);
      const blob = await videoRecorder(stream);
      recorder(state => ({ ...state, blob: blob }));
    }
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
            width="45%"
            autoPlay
          />
          <canvas hidden ref={this.canvas} width="640" height="480" />
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
