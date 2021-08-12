import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
const { TextArea } = Input;

export const ContestCriterias = () => {
  return (
    <React.Fragment>
      <p className='mb-2 mt-3 fw-6'>Description</p>
      <Form.Item
        name="generaldescription"
        rules={[
          {
            required: true,
            message: 'Please input the description'
          }
        ]}
      >
        <TextArea rows='5' placeholder='description'></TextArea>
      </Form.Item>
      <p className='mt-3 mb-2 fw-6'>Official Rules</p>
      <Form.Item
        name='officialRules'
        rules={[
          {
            required: true,
            message: 'Please input the official rules!',
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <p className='mt-3 mb-2 fw-6'>Market Rules</p>
      <Form.Item
        name='marketRules'
        rules={[
          {
            required: true,
            message: 'Please input the market rules!',
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Criterias</p>
      <Form.List name="criterias">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <React.Fragment key={field.key}>
                <Row>
                  <Col md={11}>
                    <p className='mb-2 mt-4 fw-6'>Title</p>
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={[{ required: true, message: 'Title is required' }]}
                    >
                      <Input placeholder='criterias title'/>
                    </Form.Item>
                  </Col>
                  <Col lg={2} md={2} sm={2} />
                  <Col md={11}>
                    <p className='mb-2 mt-4 fw-6'>Description</p>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      fieldKey={[field.fieldKey, 'description']}
                    >
                      <TextArea rows='3' placeholder='description' />
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
                          <Input placeholder='prize name'/>
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
                          <Input type='number' placeholder='prize standing'/>
                        </Form.Item>
                      </Col>
                      <Col lg={1} md={1} sm={1} />
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Amount</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'amount']}
                          fieldKey={[field.fieldKey, 'amount']}
                          rules={[{ required: true, message: 'amount is required' }]}
                        >
                          <Input type='number' placeholder='prize amount'/>
                        </Form.Item>
                      </Col>
                      <Col lg={1} md={1} sm={1} />
                      <Col md={4}>
                        <p className='mb-2 mt-4 fw-6'>Currency</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'currency']}
                          fieldKey={[field.fieldKey, 'currency']}
                          rules={[{ required: true, message: 'currency is required' }]}
                        >
                          <Input placeholder='prize currency'/>
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
                          <Input type='number' placeholder='prize royalty'/>
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
                      <TextArea placeholder='description' />
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