import React from 'react';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
const Workspace = () => {
  return (
    <DeskPageHoc title='Workspace' activeSide={{ active: ['workspace'], open: ['my-product', 'product1'] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Workspace;