import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const Contacts = () => {
  return (
    <DeskPageHoc title='Contacts' activeSide='contacts'>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Contacts;