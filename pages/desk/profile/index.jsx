import React from 'react';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
const Profile = () => {
  return (
    <DeskPageHoc title='Profile' activeSide='profile'>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Profile;