import React from 'react';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
const Detail = () => {
  return (
    <DeskPageHoc title='Project Detail' activeSide={{ active: ['product-detail'], open: ['my-product', 'product1'] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Detail;