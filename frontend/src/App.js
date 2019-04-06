import React, { Component } from 'react';
import Camera from './components/Camera';
import { QuestionBox } from './components/QuestionBox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <QuestionBox />
        <Camera />
      </MuiThemeProvider>
    );
  }
}

export default App;
