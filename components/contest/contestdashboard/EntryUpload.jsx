import React from 'react';
import { Col, Row, Button } from 'antd';
import Link from 'next/link';
import { primaryColor } from '../../../constants';
import { MultipleImgUpload } from '../../multipleUpload';

const EntryUpload = (props) => {
  const [entryId, setEntryId] = React.useState(-1);
  const handleClick = () => {
    props.handleStep('publish', entryId);
  };
  const handleFetch = (entryid) => {
    setEntryId(entryid);
  };
  return (
    <React.Fragment>
      <Row>
        <Col lg={16} md={12} sm={24} className="p-4">
          <MultipleImgUpload handleFetch={handleFetch} {...props} />
          <div className="text-center">
            <Button type="hbs-primary" shape="round" onClick={handleClick}>SAVE AND CONTINUE</Button>
          </div>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <div className="contestant-tip">
            <p>TIPS FOR CONTESTANTS</p>
            <p>Each contest has been designed to respond to an existing market need, and potential businesses or investors may have proposed the specific contest topic. Take your time to ensure you have understood all the requirements that must be fulfilled, as well as where you can add your own creativity.</p>
            <p>- The most important aspect of a new product is how useful it is. Before thinking about solutions, think about an issue to solve: does your product idea answers to an existing problem? What is the issue that this new product will address?</p>
            <p>Prepare your product idea: create a strong proposal. Ask yourself what the Awards Judges will expect, and get familiar with Hubbers assessment method. You can read here the<Link href="#"><a style={{ color: primaryColor }}>“Tip for Awards Judges”.</a></Link>Use pictures, drawings to be clear and straightforward.</p>
            <p>Fill contest entry completely: Obviously, completeness of the proposal is critical. Make sure that you answer each part of the entry form.</p>
            <p>As each contestant can submit only one idea, make sure you send your best one! You can modify an entry 3 times, hence if you think there is a better way to present your submission, go ahead and modify it.</p>
            <p>Before you submit your entry, use the checklist below to make sure that it is as completed according to the expectations of the Awards Judges and Hubbers standards.</p>
            <Link href="#"><a style={{ color: primaryColor }}>https://hubbers.io/hubbers/tips-for-contestants</a></Link>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EntryUpload;