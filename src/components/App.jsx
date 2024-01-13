import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { NoImages } from './NoImages/NoImages';
//import { searchImage } from 'services/api';
import { searchImageByValue } from 'services/api';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    images: null,
    status: 'idle',
    error: null,
    searchTerm: '',
    page: 1,
    isModalOpen: false,
    modalData: null,
  };

  componentDidMount() {
    // const fetchImages = async () => {
    //   try {
    //     this.setState({ status: 'pending' });
    //     const images = await searchImage();
    //     //console.log(images); // ------------------------------------------------------------------------------------------ LOG
    //     this.setState({ images, status: 'success' });
    //   } catch (error) {
    //     this.setState({ error: error.message, status: 'error' });
    //   }
    // };
    // fetchImages();
  }

  handleSubmit = event => {
    event.preventDefault();
    const searchValue = event.currentTarget.searchInput.value;
    //  console.log(searchValue); // ------------------------------------------------------------------------------------------ LOG
    this.setState({ searchTerm: searchValue, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      this.fetchImageByValue(this.state.searchTerm, this.state.page);
    }
  }

  fetchImageByValue = async (searchTerm, page) => {
    try {
      this.setState({ status: 'pending' });

      const newImages = await searchImageByValue(searchTerm, page);
      // console.log(newImages);  // ------------------------------------------------------------------------------------------ LOG
      this.setState(prevState => ({
        images: page === 1 ? newImages : [...prevState.images, ...newImages],
        status: 'success',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  onLoadMoreClick = event => {
    event.preventDefault();
    this.setState({ page: this.state.page + 1 });
  };

  openModal = profileId => {
    // console.log(profileId); // ------------------------------------------------------------------------------------------ LOG
    const selectedImage = this.state.images.find(
      image => image.id === profileId
    );
    //  console.log(selectedImage); // ------------------------------------------------------------------------------------------ LOG
    this.setState({ isModalOpen: true, modalData: selectedImage });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />

        {this.state.status === 'pending' && <Loader />}
        {this.state.status === 'error' && (
          <ErrorMessage error={this.state.status.error} />
        )}

        {/* {this.state.status === 'success' && (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )} */}

        {this.state.status === 'success' && (
          <div>
            {this.state.images.length > 0 ? (
              <ImageGallery
                images={this.state.images}
                openModal={this.openModal}
              />
            ) : (
              <NoImages />
            )}
          </div>
        )}

        {this.state.status === 'success' && this.state.images.length > 0 && (
          <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}
        {this.state.isModalOpen && (
          <Modal
            modalData={this.state.modalData}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
