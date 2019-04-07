import React from 'react';
import { Title } from '../components/Title';
import questionData from '../services/questionData';
import FeedbackTable from '../components/FeedbackTable';
import SoundTable from '../components/SoundTable';
import Paper from '@material-ui/core/Paper';

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

  const rows = data
    ? Object.entries(data)
        .map(([key, description]) => ({
          time: `00:${key}`,
          description,
        }))
        .filter(el => el.description)
    : [];

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
            width="94%"
            height={480}
            ref={videoRef}
            style={{ marginRight: '5%' }}
            autoPlay
            controls
          />
        </div>
        <div style={{ flex: 6 }}>
          <div
            style={{
              width: '90%',
              marginRight: '5%',
              marginLeft: '5%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h3>Posture and face</h3>
            <h3>Speaking</h3>
          </div>
          <div
            style={{
              width: '94%',
              marginRight: '5%',
              marginLeft: '5%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FeedbackTable rows={rows} />
            <SoundTable />
          </div>
          <div
            style={{
              marinTop: '2%',
              width: '94%',
              marginRight: '5%',
              marginLeft: '5%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Paper
              style={{
                padding: 15,
                marginTop: '2%',
                textAlign: 'justify',
                textJustify: 'inter-word',
              }}
            >
              <h5>
                Interesting and give color to your expression instead of talking
                in Generalizations, about your experience.OK, so for
                example.Instead of saying.I worked in the production Department
                where I developed systems using XY zed.Make your example come to
                life.When I worked in the production Department. I wrote a new
                system that automated some boring. Repetitive tasks that they
                had previously had to do by hand. It's saved my coworkers about
                12 hours each per month my company were delighted.Coworkers tubi
                cause they were able to spend their time on more creative
                things.
              </h5>
            </Paper>
          </div>
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
