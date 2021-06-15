import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const Activities = () => {
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Activities;