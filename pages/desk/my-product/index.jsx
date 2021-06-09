import React from 'react';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
const MyProduct = () => {
  return (
    <DeskPageHoc title='My Product' activeSide={{ active: ['my-product'], open: ['my-product'] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default MyProduct;