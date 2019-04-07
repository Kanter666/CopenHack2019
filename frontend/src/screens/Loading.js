import React from 'react';
import Loader from 'react-loader-spinner';

export default function(props) {
  setTimeout(() => {
    props.navigate('Feedback');
  }, 4000);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h4> Calculating data... </h4>
      <Loader type="Audio" color="#00BFFF" height="200" width="200" />
    </div>
  );
}
