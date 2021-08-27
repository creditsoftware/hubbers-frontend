import React from 'react';
import { Row, Col } from 'antd';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

export const ProductDetailHeader = ({ current, changePage, data }) => {
  
  return <React.Fragment>
    <h1 className="fs-5 fw-5 pt-5">{data?.name}</h1>
    <p>a few seconds ago</p>
    <Row>
      <Col lg={12} sm={24} style={{
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${data?.featuredImageUrl})`,
        backgroundColor: 'lightgrey',
      }}
      />
      <Col lg={12} sm={24} className="px-5 py-3">
        <div style={{ color: 'grey' }}>
          <label className="mr-3"><EyeOutlined />&nbsp;&nbsp;{data?.view?.length ?? 0}</label>
          <label className="ml-3 mr-3"><HeartOutlined />&nbsp;&nbsp;{data?.like?.length ?? 0}</label>
          <label className="ml-3"><ShareAltOutlined />&nbsp;&nbsp;{data?.share?.length ?? 0}</label>
        </div>
        <div className="mt-4">
          <p className="fs-1 mb-1 text-upper" style={{ color: 'grey' }}>projet status</p>
          <p className="fs-2">Step 1 - Project Details</p>
        </div>
      </Col>
    </Row>
    <div className="d-flex pt-4 fs-1" style={{ borderBottom: '1px solid grey', color: 'grey' }}>
      <div
        className="p-2"
        onClick={()=>changePage('details')}
        style={{ cursor: 'pointer', borderBottom: current === 'details' ? '2px solid green' : 'none' }}
      >
        DETAILS
      </div>
      <div
        className="p-2 mx-4"
        onClick={()=>changePage('assessment')}
        style={{ cursor: 'pointer', borderBottom: current === 'assessment' ? '2px solid green' : 'none' }}
      >
        ASSESSMENT
      </div>
      <div
        className="p-2"
        onClick={()=>changePage('business')}
        style={{ cursor: 'pointer', borderBottom: current === 'business' ? '2px solid green' : 'none' }}
      >
        BUSINESS NEEDS
      </div>
    </div>
  </React.Fragment>;
};