import React from 'react';
import css from 'components/ImageFinder/imagefinder.module.css';

export default function ImageGalleryItem({ items }) {
  return (
    <ul className={css.ImageGallery}>
      {items.map(({ id, webformatURL, tags }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItemImage}
          />
        </li>
      ))}
    </ul>
  );
}
