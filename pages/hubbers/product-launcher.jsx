import React from 'react';
import { MainPageHoc } from '../../containers';
const ProductLauncher = () => {
  return (
    <MainPageHoc title='Product Launcher'>
      <React.Fragment>

      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default ProductLauncher;