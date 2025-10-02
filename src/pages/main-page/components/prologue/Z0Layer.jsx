import React from 'react';

const Z0_BACKGROUND_URL = '/images/main-page/Z0Background.png';

const Z0Layer = () => {
  return (
    <div
      className="
      relative
      w-screen h-screen
      "
      style={{
        backgroundImage: `url(${Z0_BACKGROUND_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    </div>
  );
};

export default Z0Layer;


// import React from 'react';

// const Z0Layer = ({ debug = 0 }) => {
//   return (
//     <div 
//       className="
//       relative
//       flex justify-center
//       w-screen h-screen
//       bg-[#F5F5F5]"
//     >
//       {/* 검은색 div w:500 h:80 top:100 가운데 정렬 */}
//       <div 
//         className={`
//           absolute
//           w-[500px] h-[80px]
//           bg-black rounded-lg
//           top-[100px] left-1/2 -translate-x-1/2
//           ${debug === 1 ? 'border-2 border-red-500' : ''}
//         `}
//       />
//     </div>
//   );
// };

// export default Z0Layer;