import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const ChooseYourLaunch = () => {
  return (
    <DeskPageHoc title='Choose your launch' activeSide='choose-your-launch'>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default ChooseYourLaunch;