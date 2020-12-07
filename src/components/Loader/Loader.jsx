import React from 'react';
import Loader from 'react-loader-spinner';

export default function LoaderSpinner({ visible }) {
  return (
    <Loader
      visible={visible}
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
}
