import React from 'react';
import { Form, Row, Col } from 'antd';
import { MaskedInput } from 'antd-mask-input';

export const ContestPayment = () => {
  return (
    <React.Fragment>
      <p className="mt-3 mb-2">Card Number</p>
      <Form.Item
        name="cardNumber"
        rules={[
          {
            required: true,
            message: 'Please input the card number'
          }
        ]}
      >
        <MaskedInput mask="1111 1111 1111 1111" placeholder="1111 1111 1111 1111" name="cardNumber" size="20" />
      </Form.Item>
      <Row justify='space-between' align="middle">
        <Col lg={11}>
          <p className='mb-2 mt-3 fw-6'>Date</p>
          <Form.Item
            name='creditDate'
            rules={[
              {
                required: true,
                message: 'Please input the date!',
              },
            ]}
          >
            <MaskedInput mask="11/1111" placeholder="mm/yyyy" name="date" />
          </Form.Item>
        </Col>
        <Col lg={2}></Col>
        <Col lg={11}>
          <p className='mb-2 mt-3 fw-6'>Cvv</p>
          <Form.Item
            name='cvvNumber'
            rules={[
              {
                required: true,
                message: 'Please input the cvv number!',
              },
            ]}
          >
            <MaskedInput mask="1111" placeholder='1111' name="cvv" />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};