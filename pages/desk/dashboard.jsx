import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const Dashboard = () => {
  return (
    <DeskPageHoc title='Dashboard' activeSide='dashboard'>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Dashboard;