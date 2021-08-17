import React from 'react';
import { Form, Input, Row, Col, Button, Select, Drawer, Radio } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import useSWR from 'swr';
import { API } from '../../../constants';
import { fetcher } from '../../../utils';
import { CKEditor5 } from '../../CKEditor5';
const { Option } = Select;

export const ContestCriterias = ({ childrenVisible, onChildrenShow, onChildrenClose, form }) => {
  const { data: currency } = useSWR(API.GET_CURRENCY_API, fetcher);
  const [rule, setRule] = React.useState(null);
  const [state, setState] = React.useState();
  const { data: official } = useSWR(`${API.GET_CONTEST_DESCRITION_API}/official`, fetcher);
  const { data: market } = useSWR(`${API.GET_CONTEST_DESCRITION_API}/market`, fetcher);
  const [officialValue, setOfficialValue] = React.useState(0);
  const [marketValue, setMarketValue] = React.useState(0);
  const handleOfficialChange = (e) => {
    if (e.target.value === 1) {
      setRule(official.data);
      setState(0);
      onChildrenShow();
    } else {
      form.setFieldsValue({ official: '' })
    }
    setOfficialValue(e.target.value);
  }
  const handleMarketChange = (e) => {
    if (e.target.value === 1) {
      setRule(market.data);
      setState(1);
      onChildrenShow();
    } else {
      form.setFieldsValue({ market: '' })
    }
    setMarketValue(e.target.value);
  }
  const handleClick = (idx, e) => {
    if(state) {
      form.setFieldsValue({ marketRules: rule[idx].description })
    } else {
      form.setFieldsValue({ officialRules: rule[idx].description })
    }
    onChildrenClose();
  }
  return (
    <React.Fragment>
      <Drawer
        title="Templates"
        width={320}
        closable={false}
        onClose={onChildrenClose}
        visible={childrenVisible}
      >
        {
          rule && rule.map((val, index) =>
            <Button
              key={index}
              block
              type='dashed'
              className='mt-2'
              onClick={(e) => handleClick(index, e)}
            >
              {val.title}
            </Button>
          )
        }
      </Drawer>
      <Row justify='space-between' align="middle">
        <Col lg={10} md={12}>
          <p className='mb-2 mt-3 fw-6'>Official Rules</p>
        </Col>
        <Col lg={10} md={12}>
          <Radio.Group
            value={officialValue}
            onChange={handleOfficialChange}
          >
            <Radio value={0}>Write yours</Radio>
            <Radio value={1}>Use an existing template</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Form.Item
        name='officialRules'
        rules={[
          {
            required: true,
            message: 'Please input the official rules!',
          },
        ]}
      >
        <CKEditor5 />
      </Form.Item>
      <Row justify='space-between' align="middle">
        <Col lg={10} md={12}>
          <p className='mb-2 mt-3 fw-6'>Market Rules</p>
        </Col>
        <Col lg={10} md={12}>
          <Radio.Group
            value={marketValue}
            onChange={handleMarketChange}
          >
            <Radio value={0}>Write yours</Radio>
            <Radio value={1}>Use an existing template</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Form.Item
        name='marketRules'
        rules={[
          {
            required: true,
            message: 'Please input the market rules!',
          },
        ]}
      >
        <CKEditor5 />
      </Form.Item>
    </React.Fragment>
  );
};