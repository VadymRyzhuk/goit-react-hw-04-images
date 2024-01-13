// const ImageGalleryItem = ({ image, openModal }) => {
//   return (
//     <li onClick={openModal}>
//       <img src={image.webformatURL} alt={image.tags} width={200} height={150} />
//     </li>
//   );
// };

// export { ImageGalleryItem };

import React from 'react';

const ImageGalleryItem = ({ image, openModal }) => {
  const handleItemClick = () => {
    openModal(image.id);
  };

  return (
    <li onClick={handleItemClick}>
      <img src={image.webformatURL} alt={image.tags} width={300} height={200} />
    </li>
  );
};

export { ImageGalleryItem };
