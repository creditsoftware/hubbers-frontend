import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const Modules = () => {
  return (
    <DeskPageHoc title='Modules' activeSide={{ active: ['modules'], open: [] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Modules;