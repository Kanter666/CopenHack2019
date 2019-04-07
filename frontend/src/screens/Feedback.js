import React from 'react';
import { Title } from '../components/Title';
import questionData from '../services/questionData';
import FeedbackTable from '../components/FeedbackTable';
import { BlueButton } from '../components/GradientButton';

function createData(time, description) {
  return { time, description };
}

const rows = [
  createData('00:02', 'dsadsadasad'),
  createData('00:07', 'dssdadsadsdddssds'),
  createData('00:011', 'aaaaadsadsadsadas'),
];

function ButtonWrapper(props) {
  const { text, ...rest } = props;
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <BlueButton {...rest}>{text}</BlueButton>
    </div>
  );
}

function Feedback(props) {
  const videoRef = React.useRef(null);
  const { navigate, params, setParams } = props;
  if (params.blob) {
    console.log(params.blob);
    console.log(videoRef.current);
    videoRef.current.src = URL.createObjectURL(params.blob);
  }
  console.log('navigate Feedback');
  return (
    <>
      <Title text={questionData[params.questionIndex]} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: 6 }}>
          <video
            width="95%"
            ref={videoRef}
            style={{ marginRight: '5%' }}
            autoPlay
            controls
          />
        </div>
        <div style={{ flex: 6 }}>
          <FeedbackTable rows={rows} />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          position: 'fixed',
          bottom: 30,
        }}
      >
        <ButtonWrapper
          text={'Calibration'}
          onClick={() => navigate('Calibration')}
        />
        <ButtonWrapper
          text={'Next Question'}
          onClick={() => {
            setParams(state => ({
              questionIndex: state.questionIndex + 1,
            }));
            navigate('QuestionsPart');
          }}
        />
        <ButtonWrapper
          text={'Review Questions'}
          onClick={() => navigate('QuestionsList')}
        />
      </div>
    </>
  );
}

export default Feedback;
