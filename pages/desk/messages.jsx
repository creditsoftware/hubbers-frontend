import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const Messages = () => {
  return (
    <DeskPageHoc title='Messages' activeSide={{ active: ['messages'], open: [] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Messages;