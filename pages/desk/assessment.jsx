import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const Assessment = () => {
  return (
    <DeskPageHoc title='Assessment' activeSide='assessment'>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Assessment;