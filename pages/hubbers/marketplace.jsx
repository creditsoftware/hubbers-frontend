import React from 'react';
import { MainPageHoc } from '../../containers';
const Marketplace = () => {
  return (
    <MainPageHoc title='Marketplace'>
      <React.Fragment>

      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Marketplace;