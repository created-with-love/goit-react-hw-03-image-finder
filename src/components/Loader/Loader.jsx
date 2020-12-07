import React from 'react';
import Loader from 'react-loader-spinner';
import './Loader.css';

export default function LoaderSpinner({ visible }) {
  return (
    <Loader
      className="Loader App-logo"
      visible={visible}
      type="Circles"
      color="#00BFFF"
      height={200}
      width={200}
      timeout={3000} //3 secs
    />
  );
}
