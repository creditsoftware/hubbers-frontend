import React from 'react';
import { MainPageHoc } from '../../containers';
const Community = () => {
  return (
    <MainPageHoc title='Community'>
      <React.Fragment>

      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Community;