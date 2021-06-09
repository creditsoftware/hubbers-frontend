import React from 'react';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
const Product = () => {
  return (
    <DeskPageHoc title='Product' activeSide={{ active: ['my-product'], open: ['my-product'] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Product;