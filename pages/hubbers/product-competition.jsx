import React from 'react';
import { MainPageHoc } from '../../containers';
const ProductCompetition = () => {
  return (
    <MainPageHoc title='Product Competition'>
      <React.Fragment>

      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default ProductCompetition;