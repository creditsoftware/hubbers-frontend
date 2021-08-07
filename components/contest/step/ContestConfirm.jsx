import React from 'react';
import { Select, Form, Switch, Slider, Checkbox, Row, Col, Input } from 'antd';
import { primaryColor } from '../../../constants';
const { Option } = Select;

export const ContestConfirm = ({ handleCheck, designerDisable }) => {
  const [isGlobal, setIsGlobal] = React.useState(false);
  const contestType = ['Product Design', 'Logo/icon desing', 'Product packaging/packing design', 'UI/UX for website/app'];
  const industryItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const innovationItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const techItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const countryItems = ['Italy', 'Paris', 'United Kingdom', 'United State'];
  return (
    <React.Fragment>
      <p className='mb-2 mt-3 fw-6'>Contest Type</p>
      <Form.Item
        name='contestType'
        rules={[
          {
            required: true,
            message: 'Please input the contest type!',
          },
        ]}
      >
        <Select>
          {
            contestType &&
            contestType.map((name, index) => {
              return <Option key={index} value={index}>{name}</Option>;
            })
          }
        </Select>
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Industry</p>
      <Form.Item
        name='industry'
        rules={[
          {
            required: true,
            message: 'Please input the contest industry!',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
        >
          {
            industryItems.map((product, index) =>
              <Option key={index}>{product}</Option>
            )
          }
        </Select>
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Innovations</p>
      <Form.Item
        name='innovation'
        rules={[
          {
            required: true,
            message: 'Please input the contest innovation!',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
        >
          {
            innovationItems.map((product, index) =>
              <Option key={index}>{product}</Option>
            )
          }
        </Select>
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Tech</p>
      <Form.Item
        name='tech'
        rules={[
          {
            required: true,
            message: 'Please input the contest tech!',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
        >
          {
            techItems.map((product, index) =>
              <Option key={index}>{product}</Option>
            )
          }
        </Select>
      </Form.Item>
      <Form.Item
        name='isGlobal'
        label={<b>Global/Local</b>}
        valuePropName='checked'
      >
        <Switch onChange={(e) => setIsGlobal(e)} />
      </Form.Item>
      {
        isGlobal ? (
          <Form.Item
            name='location'
            rules={[
              {
                required: true,
                message: 'Please input the area or country!',
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
            >
              {
                countryItems.map((country, index) =>
                  <Option key={index}>{country}</Option>
                )
              }
            </Select>
          </Form.Item>
        ) : ''
      }
      <p className='mb-2 mt-3 fw-6'>How many designers would you like to participate in your product competition?</p>
      <Row>
        <Col sm={12} md={15} lg={18} className="pr-3">
          <Form.Item
            name='designers'
            rules={[
              {
                required: true,
                message: 'Please input the Designers!',
              },
            ]}
          >
            <Slider
              defaultValue={0}
              min={0}
              max={50}
              trackStyle={{ backgroundColor: primaryColor }}
              handleStyle={{ borderColor: primaryColor }}
              disabled={designerDisable}
            />
          </Form.Item>
        </Col>
        <Col sm={12} md={9} lg={6} className="pl-3">
          <Form.Item
            name='alldesigners'
            valuePropName='checked'
          >
            <Checkbox onChange={handleCheck}>Everyone can participate</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <p className='mb-2 mt-3 fw-6'>Experience and talents of designers</p>
      <Row>
        <Col className="pt-1">
          <span>Minimum</span>
        </Col>
        <Col sm={2} className="px-2">
          <Form.Item
            name="designerpoint"
            rules={[
              {
                required: true,
                message: 'Please input the designer point!',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="pt-1">
          <span>points in the Hubbers  product competion</span>
        </Col>
      </Row>
      <p className='mb-2 mt-3 fw-6'>How many judges will participate from your side?</p>
      <Form.Item
        name='judges'
        rules={[
          {
            required: true,
            message: 'Please input the judges!',
          },
        ]}
      >
        <Slider
          defaultValue={5}
          min={5}
          max={50}
          trackStyle={{ backgroundColor: primaryColor }}
          handleStyle={{ borderColor: primaryColor }}
        />
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>If you don t have enough, you can choose experienced judge from our community.</p>
      <Form.Item
        name='restjudges'
        label={<span>Number of extra judge needed:</span>}
        rules={[
          {
            required: false,
          }
        ]}
      >
        <Input />
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>How many revisions do you want to allow designers to provide (up to 3).</p>
      <Form.Item
        name='revisions'
        rules={[
          {
            required: true,
            message: 'Please input the revisions!',
          },
        ]}
      >
        <Slider
          defaultValue={0}
          min={0}
          max={3}
          trackStyle={{ backgroundColor: primaryColor }}
          handleStyle={{ borderColor: primaryColor }}
        />
      </Form.Item>
    </React.Fragment>
  );
};