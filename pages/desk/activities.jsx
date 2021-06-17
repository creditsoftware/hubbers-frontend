import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container, ActivityCards } from '../../components';

const Activities = () => {
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }}>
      <Container className="py-5">
        <React.Fragment>
          <p className="max-w-40 m-auto fw-6 fs-1 text-center pt-5">
            Hubbers is a hub of creators, innovators that work together to launch and work on new products. Now you are part of us, time to select what you want to do next.
          </p>
          <ActivityCards />
        </React.Fragment>
      </Container>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Activities;