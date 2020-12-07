import React from 'react';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ gallery }) {
  return <ul className="ImageGallery">{gallery.map(ImageGalleryItem)}</ul>;
}
