import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { NoImages } from './NoImages/NoImages';
//import { searchImage } from 'services/api';
import { searchImageByValue } from 'services/api';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const searchValue = event.currentTarget.searchInput.value;
    //  console.log(searchValue); // ------------------------------------------------------------------------------------------ LOG
    setSearchTerm(searchValue);
    setPage(1);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (searchTerm.trim() === '') {
          return;
        }

        setStatus('pending');
        const newImages = await searchImageByValue(searchTerm, page);
        setImages(prevImages =>
          page === 1 ? newImages : [...prevImages, ...newImages]
        );
        setStatus('success');
      } catch (error) {
        setError(error.message);
        setStatus('error');
      }
    };

    fetchImages();
  }, [searchTerm, page]);

  const onLoadMoreClick = event => {
    event.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  const openModal = profileId => {
    // console.log(profileId); // ------------------------------------------------------------------------------------------ LOG
    const selectedImage = images.find(image => image.id === profileId);
    //  console.log(selectedImage); // ------------------------------------------------------------------------------------------ LOG
    setIsModalOpen(true);
    setModalData(selectedImage);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />

      {status === 'pending' && <Loader />}
      {status === 'error' && <ErrorMessage error={error} />}

      {status === 'success' && (
        <div>
          {images.length > 0 ? (
            <ImageGallery images={images} openModal={openModal} />
          ) : (
            <NoImages />
          )}
        </div>
      )}

      {status === 'success' && images.length > 0 && (
        <Button onLoadMoreClick={onLoadMoreClick} />
      )}
      {isModalOpen && <Modal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};
