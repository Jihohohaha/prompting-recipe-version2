import React, { useState, useEffect } from 'react';
import { vw, vh } from './assetData';

function bezier(t, p0, p1, p2, p3) {
  return (
    Math.pow(1 - t, 3) * p0 +
    3 * Math.pow(1 - t, 2) * t * p1 +
    3 * (1 - t) * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3
  );
}

const FlyingAsset = ({ asset, type, delay, duration, from, to, style, children }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf;
    let start;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      if (elapsed < delay) {
        setProgress(0);
        raf = requestAnimationFrame(animate);
        return;
      }
      const t = Math.min((elapsed - delay) / duration, 1);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [delay, duration]);

  const curveSeed = (asset.x || (asset.text ? asset.text.charCodeAt(0) : 0)) * 0.1;
  const x = bezier(progress, from.x, from.x + (to.x - from.x) * 0.2 + 100 * Math.sin(curveSeed), to.x - 100 * Math.cos(curveSeed), to.x);
  const y = bezier(progress, from.y, from.y - 200 * Math.abs(Math.sin(curveSeed)), to.y + 100 * Math.cos(curveSeed), to.y);
  const opacity = progress;

  return type === 'img' ? (
    <img
      src={asset.src}
      alt="flying-asset"
      style={{
        position: 'absolute',
        left: vw(x),
        top: vh(y),
        width: vw(asset.width),
        height: vh(asset.height),
        opacity,
        transform: `rotate(${asset.rotate || 0}deg)` + (style?.transform ? ' ' + style.transform : ''),
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'opacity 0.2s',
        ...style,
      }}
      draggable={false}
    />
  ) : (
    <span
      style={{
        position: 'absolute',
        left: vw(x),
        top: vh(y),
        width: vw(asset.width),
        height: vh(asset.height),
        fontFamily: 'Watermelon, sans-serif',
        fontSize: vh(asset.height),
        lineHeight: 1,
        transform: `rotate(${asset.rotate || 0}deg)` + (style?.transform ? ' ' + style.transform : ''),
        color: '#222',
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        letterSpacing: 0,
        opacity,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default FlyingAsset;
