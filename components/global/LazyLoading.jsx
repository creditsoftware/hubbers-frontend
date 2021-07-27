import React from 'react';
export const LazyLoading = () => <p style={{
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  <img src='/images/favicon.png' alt='loading...' />
</p>;