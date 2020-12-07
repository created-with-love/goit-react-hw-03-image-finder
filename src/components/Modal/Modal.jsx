import React from 'react';
import './Modal.css';

export default function Modal({ src }) {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={src} alt="bigSizePicture" />
      </div>
    </div>
  );
}
