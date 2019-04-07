import React from 'react';
import { Title } from '../components/Title';
import questionData from '../services/questionData';
import FeedbackTable from '../components/FeedbackTable';
import { BlueButton } from '../components/GradientButton';

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
  const data = params.issues[params.issues.length - 1];
  const rows = Object.entries(data)
    .map(([key, description]) => ({
      time: `00:${key}`,
      description,
    }))
    .filter(el => el.description);
  if (params.blob) {
    setTimeout(() => {
      videoRef.current.src = URL.createObjectURL(params.blob);
    }, 500);
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
              ...state,
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
