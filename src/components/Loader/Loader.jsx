import React from 'react';
import css from './Loader.module.css';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.load}>
      <Circles
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} // 3 секунди
      />
    </div>
  );
};

export { Loader };

// import React from 'react';
// import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'; // Це важливо для стилізації

// const CustomLoader = () => {
//   return (
//     <div className="your-custom-loader-container">
//       <Loader
//         type="Puff"
//         color="#00BFFF"
//         height={100}
//         width={100}
//         timeout={3000} // 3 секунди
//       />
//     </div>
//   );
// };

// export { CustomLoader };
