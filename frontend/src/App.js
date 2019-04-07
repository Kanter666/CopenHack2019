import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Calibration from './screens/Calibration';
import QuestionsPart from './screens/QuestionsPart';
import Feedback from './screens/Feedback';

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

function setActive(route, navigate, params, setParams) {
  const props = { navigate, params, setParams };

  switch (route) {
    case 'Calibration':
      return <Calibration {...props} />;
    case 'QuestionsPart':
      return <QuestionsPart {...props} />;
    case 'Feedback':
      return <Feedback {...props} />;
    default:
      break;
  }
}

function App() {
  const [params, setParams] = React.useState({ questionIndex: 0 });
  const [route, setRoute] = React.useState('QuestionsPart');
  function navigate(route) {
    setRoute(route);
  }

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
        {setActive(route, navigate, params, setParams)}
      </div>
    </MuiThemeProvider>
  );
}
export default App;
