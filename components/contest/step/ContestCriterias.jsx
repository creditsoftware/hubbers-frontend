import React from 'react';
import { Form, Row, Col, Button, Drawer, Radio } from 'antd';
import useSWR from 'swr';
import { API } from '../../../constants';
import { fetcher } from '../../../utils';
import { CKEditor5 } from '../../CKEditor5';

export const ContestCriterias = ({ childrenVisible, onChildrenShow, onChildrenClose, form }) => {
  const [rule, setRule] = React.useState(null);
  const [state, setState] = React.useState();
  const [officialBtn, setOfficialBtn] = React.useState(false);
  const [marketBtn, setMarketBtn] = React.useState(false);
  const [template, setTemplate] = React.useState();
  const { data: official } = useSWR(`${API.GET_CONTEST_DESCRITION_API}/official`, fetcher);
  const { data: market } = useSWR(`${API.GET_CONTEST_DESCRITION_API}/market`, fetcher);
  const [officialValue, setOfficialValue] = React.useState(0);
  const [marketValue, setMarketValue] = React.useState(0);
  const handleOfficialChange = (e) => {
    if (e.target.value === 1) {
      setRule(official.data);
      setState(0);
      setOfficialBtn(true);
    } else {
      form.setFieldsValue({ officialRules: '' });
      setOfficialBtn(false);
    }
    setOfficialValue(e.target.value);
  };
  const handleMarketChange = (e) => {
    if (e.target.value === 1) {
      setRule(market.data);
      setState(1);
      setMarketBtn(true);
    } else {
      form.setFieldsValue({ marketRules: '' });
      setMarketBtn(false);
    }
    setMarketValue(e.target.value);
  };
  const handleChoose = () => {
    if (state) {
      form.setFieldsValue({ marketRules: template });
    } else {
      form.setFieldsValue({ officialRules: template });
    }
    onChildrenClose();
  };
  const handleClick = (idx) => {
    setTemplate(rule[idx].description);
  };
  return (
    <React.Fragment>
      <Drawer
        title="Templates"
        width={800}
        closable={false}
        onClose={onChildrenClose}
        visible={childrenVisible}
      >
        <div style={{ height: '400px', overflow: 'auto' }}>
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
        </div>
        <div className='mt-3 p-3' style={{ border: '1px solid #c4c4c4', height: '350px', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: template }}></div>
        <div className="text-right mt-3"><Button shape='round' type='hbs-primary' onClick={handleChoose}>Choose</Button></div>
      </Drawer>
      <Row justify='space-between' align="middle">
        <Col lg={10} md={12}>
          <p className='mb-2 mt-3 fw-6'>Official Rules</p>
        </Col>
        <Col lg={12} md={12}>
          <Radio.Group
            value={officialValue}
            onChange={handleOfficialChange}
          >
            <Radio value={0}>Write yours</Radio>
            <Radio value={1}>Use an existing template</Radio>
          </Radio.Group>
          {officialBtn && <Button type="hbs-primary" shape="round" onClick={() => onChildrenShow()}>Templates</Button>}
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
        <Col lg={12} md={12}>
          <Radio.Group
            value={marketValue}
            onChange={handleMarketChange}
          >
            <Radio value={0}>Write yours</Radio>
            <Radio value={1}>Use an existing template</Radio>
          </Radio.Group>
          {marketBtn && <Button type="hbs-primary" shape="round" onClick={() => onChildrenShow()}>Templates</Button>}
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