import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const AccountPreference = () => {
  return (
    <DeskPageHoc title='Account preference' activeSide={{ active: ['account-preference'], open: [] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default AccountPreference;