import React from 'react';
import './ImageGalleryItem.css';

export default function ImageGalleryItem(
  { id, webformatURL, largeImageURL },
  onClick,
) {
  return (
    <li className="ImageGalleryItem" key={`id-${id}`}>
      <img
        src={webformatURL}
        alt="searchedPicture"
        data-large={largeImageURL}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  );
}
