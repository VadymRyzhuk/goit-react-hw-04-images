import { ImageGalleryItem } from '../ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallery}>
      {images?.map(image => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export { ImageGallery };
