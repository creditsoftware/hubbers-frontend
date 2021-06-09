import React from 'react';
import {MainPageHoc} from '../../containers';
const ProductDevelopmentTools = () => {
  return (
    <MainPageHoc title='Product Development Tools'>
      <React.Fragment>

      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default ProductDevelopmentTools;