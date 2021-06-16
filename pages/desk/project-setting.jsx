import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
const ProjectSetting = () => {
  return (
    <DeskPageHoc title='Project Setting' activeSide={{ active: ['project-setting'], open: [] }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default ProjectSetting;