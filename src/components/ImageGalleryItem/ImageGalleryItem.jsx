import React from 'react';
import './ImageGalleryItem.css';

export default function ImageGalleryItem(props) {
  const { id, webformatURL, largeImageURL } = props;
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt="searchedPicture"
        data-large={largeImageURL}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
