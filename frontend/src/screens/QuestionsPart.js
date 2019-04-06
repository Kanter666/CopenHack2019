import React, { Component } from 'react';
import Camera from '../components/Camera';
import { QuestionBox } from '../components/QuestionBox';

class QuestionsPart extends Component {
  render() {
    return (
      <>
        <QuestionBox />
        <Camera takeSnapshot={() => {}} />
      </>
    );
  }
}

export default QuestionsPart;
