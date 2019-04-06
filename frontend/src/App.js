import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Calibration from './screens/Calibration';
import QuestionsPart from './screens/QuestionsPart';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#fff',
    },
    primary: { main: blue[500], text: '#fff' }, // Purple and green play nicely together.
    secondary: { main: '#00EE00' }, // This is just green.A700 as hex.
    textPrimary: '#fff',
  },
  typography: { useNextVariants: true },
});

function setActive(route, setRoute) {
  switch (route) {
    case 'Calibration':
      return <Calibration setRoute={setRoute} />;
    case 'QuestionsPart':
      return <QuestionsPart setRoute={setRoute} />;
    default:
      break;
  }
}

function App() {
  const [route, setRoute] = React.useState('Calibration');

  return (
    <MuiThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        {setActive(route, setRoute)}
      </div>
    </MuiThemeProvider>
  );
}
export default App;
