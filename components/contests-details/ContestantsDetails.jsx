import React from 'react';
import { Row, Col } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
export const ContestantsDetails = props => {
  return (
    <React.Fragment>
      <Row className="p-3" style={{ backgroundColor: 'rgb(255 252 247)' }}>
        <Col className="text-center" span={2}>RANK</Col>
        <Col span={7}></Col>
        <Col className="text-center" span={2}>DESIGN</Col>
        <Col className="text-center" span={3}>FUNCTIONALITY</Col>
        <Col className="text-center" span={3}>USABILITY</Col>
        <Col className="text-center" span={4}>MARKET POTENTIAL</Col>
        <Col className="text-center" span={3}>AVERAGE</Col>
      </Row>
      {
        props.data.contestants.map((item, index) => {
          return <Row key={index} className="p-3 my-2 bg-white">
            <Col className="d-flex fjc-center f-align-center" span={2}>-</Col>
            <Col span={7} className="d-flex f-align-center">
              <Avatar size={42} src={item.avatar} />
              <p className="mb-0 px-4">{item.name}</p>
            </Col>
            <Col className="d-flex fjc-center f-align-center" span={2}>-</Col>
            <Col className="d-flex fjc-center f-align-center" span={3}>-</Col>
            <Col className="d-flex fjc-center f-align-center" span={3}>-</Col>
            <Col className="d-flex fjc-center f-align-center" span={4}>-</Col>
            <Col className="d-flex fjc-center f-align-center" span={3}>-</Col>
          </Row>;
        })
      }
    </React.Fragment>
  );
};