import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => mapping[property];

const GradientButton = color =>
  withStyles(props => ({
    root: {
      background: styledBy(color, {
        red: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        blue: 'linear-gradient(65deg, #00A2B8 -25%, #00F9D2 100%);',
      }),
      border: 0,
      borderRadius: 3,
      boxShadow: styledBy(color, {
        red: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      }),
      color: '#fff',
      height: 62,
      margin: 20,
      padding: '0 40px',
    },
    label: {
      fontSize: 24,
      color: '#fff',
    },
  }))(Button);

export const BlueButton = GradientButton('blue');
export const RedButton = GradientButton('red');
