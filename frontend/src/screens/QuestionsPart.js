import React from 'react';
import Camera from '../components/Camera';
import { QuestionBox } from '../components/QuestionBox';
import { sendSnapshot } from '../services/external';
import { Snackbar } from '@material-ui/core';
let interval = null;

class QuestionsPart extends React.Component {
  state = {
    notification: '',
  };

  componentWillUnmount() {
    clearTimeout(interval);
  }

  setNotification = notification => {
    this.setState({ notification });
  };

  openNotification = message => {
    this.setNotification(message);
    interval = setTimeout(() => {
      this.setNotification && this.setNotification('');
    }, 2500);
  };

  handleNotification = data => {
    const { smile, slouch, emotion, focus } = data;
    if (!smile) {
      return this.openNotification('Do not stop smiling!');
    }
    if (slouch) {
      return this.openNotification('Stop Slouching!');
    }
    if (!focus) {
      return this.openNotification('Be focused!');
    }
  };

  handleSnapshot = async data => {
    try {
      const body = await sendSnapshot(data);
      return this.handleNotification(body.data);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { navigate, params, setParams } = this.props;
    const { notification } = this.state;
    return (
      <>
        <QuestionBox
          navigate={navigate}
          params={params}
          setParams={setParams}
        />
        <Camera takeSnapshot={this.handleSnapshot} recorder={setParams} />
        <input type="file" accept="video/*;capture=camcorder" />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={!!notification}
          ContentProps={{
            'aria-describedby': 'init-snapshot',
          }}
          message={<span id="init-snapshot">{notification}</span>}
        />
      </>
    );
  }
}

export default QuestionsPart;
