import React from 'react';

const UniversalLoader = () => (
  <div
    style={{
      position: 'fixed',
      zIndex: 99999,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div className='loader' />
  </div>
);

export default UniversalLoader;
