import React from 'react';
import './ImageGalleryItem.css';
import authContext from '../Context';
import 'lazysizes';

export default function ImageGalleryItem({ id, webformatURL, largeImageURL }) {
  return (
    <li className="ImageGalleryItem" key={`id-${id}`}>
      <authContext.Consumer>
        {hadleImageClick => (
          <img
            data-src={webformatURL}
            alt="searchedPicture"
            data-large={largeImageURL}
            className="ImageGalleryItem-image lazyload"
            onClick={hadleImageClick}
          />
        )}
      </authContext.Consumer>
    </li>
  );
}
