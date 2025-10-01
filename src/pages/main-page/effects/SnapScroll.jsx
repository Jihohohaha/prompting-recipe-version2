// SnapScroll.jsx
import React, { forwardRef } from 'react';

const SnapScroll = forwardRef(({ snaps }, ref) => (
  <div
    ref={ref}
    className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}
  >
    {snaps.map((text, index) => (
      <div key={index} className="h-full flex items-center justify-center text-center snap-center">
        <p className="text-[#f5f5f5] text-xl font-bold px-4 leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      </div>
    ))}
  </div>
));

export default SnapScroll;