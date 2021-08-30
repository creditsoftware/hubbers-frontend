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

export const ContestDescription = ({ childrenVisible, onChildrenShow, onChildrenClose, form }) => {
  const { data: currency } = useSWR(API.GET_CURRENCY_API, fetcher);
  const { data: description } = useSWR(`${API.GET_CONTEST_DESCRITION_API}/description`, fetcher);
  const [btn, setBtn] = React.useState(false);
  const [template, setTemplate] = React.useState();
  const [value, setValue] = React.useState(0);
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value) {
      setBtn(true);
    } else {
      setBtn(false);
      form.setFieldsValue({ description: '' });
    }
  };
  const handleClick = (idx) => {
    setTemplate(description.data[idx].description);
  };
  const handleChoose = () => {
    form.setFieldsValue({ description: template });
    onChildrenClose();
  };
  return (
    <React.Fragment>
      <Row justify='space-between' align="middle">
        <Col lg={10} md={12}>
          <p className='mb-2 mt-3 fw-6'>Description</p>
        </Col>
        <Col lg={12} md={12}>
          <Radio.Group
            value={value}
            onChange={handleChange}
          >
            <Radio value={0}>Write yours</Radio>
            <Radio value={1}>Use an existing template</Radio>
          </Radio.Group>
          {btn && <Button type="hbs-primary" shape="round" onClick={() => onChildrenShow()}>Templates</Button>}
        </Col>
      </Row>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input the description'
          }
        ]}
      >
        <CKEditor5 />
      </Form.Item>
      <Drawer
        title="Templates"
        width={800}
        closable={false}
        onClose={onChildrenClose}
        visible={childrenVisible}
      >
        <div style={{ height: '400px', overflow: 'auto' }}>
          {
            description && description.data && description.data.map((val, index) =>
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
      <p className='mb-2 mt-3 fw-6'>Criterias</p>
      <Form.List name="criterias">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <React.Fragment key={field.key}>
                <Row>
                  <Col md={24}>
                    <p className='mb-2 mt-4 fw-6'>Title</p>
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={[{ required: true, message: 'Title is required' }]}
                    >
                      <Input placeholder='criterias title' />
                    </Form.Item>
                  </Col>
                  <Col md={24}>
                    <p className='mb-2 fw-6'>Description</p>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      fieldKey={[field.fieldKey, 'description']}
                    >
                      <CKEditor5 />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-right mb-3">
                  <Button danger onClick={() => remove(field.name)}>Remove</Button>
                </div>
              </React.Fragment>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Criteria
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <p className='mb-2 mt-3 fw-6'>Marks</p>
      <Form.List name="prize">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <React.Fragment key={field.key}>
                <Row>
                  <Col md={24}>
                    <Row>
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Name</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          rules={[{ required: true, message: 'name is required' }]}
                        >
                          <Input placeholder='prize name' />
                        </Form.Item>
                      </Col>
                      <Col lg={1} md={1} sm={1} />
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Standing</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'standing']}
                          fieldKey={[field.fieldKey, 'standing']}
                          rules={[{ required: true, message: 'standing is required' }]}
                        >
                          <Input type='number' placeholder='prize standing' />
                        </Form.Item>
                      </Col>
                      <Col lg={1} md={1} sm={1} />
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Amount</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'prize']}
                          fieldKey={[field.fieldKey, 'prize']}
                          rules={[{ required: true, message: 'amount is required' }]}
                        >
                          <Input type='number' placeholder='prize amount' />
                        </Form.Item>
                      </Col>
                      <Col lg={1} md={1} sm={1} />
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Currency</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'currencyId']}
                          fieldKey={[field.fieldKey, 'currencyId']}
                          rules={[{ required: true, message: 'currency is required' }]}
                        >
                          <Select>
                            {
                              currency && currency.result &&
                              currency.result.map((currency, index) => {
                                return <Option key={index} value={currency.id}>{currency.name}</Option>;
                              })
                            }
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={1} md={1} sm={1} />
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Royalty</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'royalty']}
                          fieldKey={[field.fieldKey, 'royalty']}
                          rules={[{ required: true, message: 'royalty is required' }]}
                        >
                          <Input type='number' placeholder='prize royalty' />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={24}>
                    <p className='mb-2 mt-4 fw-6'>Description</p>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      fieldKey={[field.fieldKey, 'description']}
                    >
                      <CKEditor5 />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-right mb-3">
                  <Button danger onClick={() => remove(field.name)}>Remove</Button>
                </div>
              </React.Fragment>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Prize
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </React.Fragment>
  );
};