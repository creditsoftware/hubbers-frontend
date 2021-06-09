import React from 'react';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
const Expertise = () => {
  return (
    <DeskPageHoc title='Expertise' activeSide={{ active: ['expertise1'], open: ['my-expertise'] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Expertise;