import React from 'react';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ gallery, onClick }) {
  return (
    <ul className="ImageGallery">
      {gallery.map(image => ImageGalleryItem(image, onClick))}
    </ul>
  );
}
