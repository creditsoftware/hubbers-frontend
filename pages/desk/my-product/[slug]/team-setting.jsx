import React from 'react';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
const TeamSetting = () => {
  return (
    <DeskPageHoc title='Team Setting' activeSide={{ active: ['team-setting'], open: ['my-product', 'product1'] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default TeamSetting;