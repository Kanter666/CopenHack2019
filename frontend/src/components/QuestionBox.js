import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import questionData from '../services/questionData';
import { Title } from './Title';

const QUESTION_TIME = 10;

export function QuestionBox(props) {
  const [completed, setCompleted] = React.useState(0);
  const secondPart = 10;

  function progress() {
    const velocity = 100 / QUESTION_TIME / secondPart;
    setCompleted(value => {
      if (value < 100) {
        return value + velocity;
      }
      props.navigate('Feedback');
      return -15;
    });
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 1000 / secondPart);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Title text={questionData[props.params.questionIndex]}>
      <LinearProgress
        variant="buffer"
        color="secondary"
        value={completed}
        valueBuffer={completed}
      />
    </Title>
  );
}
