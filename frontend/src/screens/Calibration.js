import React from 'react';
import Camera from '../components/Camera';
import { Title } from '../components/Title';
import { BlueButton } from '../components/GradientButton';
import { sendCorrectSnapshot } from '../services/external';
import { Snackbar } from '@material-ui/core';

const buttonStyle = { width: '25%', fontSize: 16 };

function Calibration(props) {
  const [snapshot, takeSnapshot] = React.useState('');
  const [open, setOpen] = React.useState(false);
  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Title text={'Prepare for correct posture!'} />
      <Camera initial takeSnapshot={takeSnapshot} />
      <BlueButton
        onClick={() => {
          sendCorrectSnapshot(snapshot);
          setOpen(true);
          setTimeout(() => props.navigate('QuestionsPart'), 1000);
        }}
        style={buttonStyle}
      >
        I'm ready!
      </BlueButton>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'init-snapshot',
        }}
        message={<span id="init-snapshot">Image saved successfully!</span>}
      />
    </>
  );
}

export default Calibration;
