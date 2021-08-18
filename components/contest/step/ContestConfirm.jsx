import React from 'react';
import { Select, Form, Switch, Slider, Checkbox, Row, Col, Input, DatePicker } from 'antd';
import { API, primaryColor } from '../../../constants';
import useSWR from 'swr';
import { fetcher, getRandomInt, slugify } from '../../../utils';
import { UploadImage } from '../../UploadImage';
const { Option } = Select;
const { RangePicker } = DatePicker;

export const ContestConfirm = ({ handleCheck, designerDisable, contestType, form }) => {
  const [isGlobal, setIsGlobal] = React.useState(form.getFieldsValue(true).isGlobal);
  const { data: industryItems } = useSWR(API.GET_PRODUCT_CATTEGORY_API, fetcher);
  const { data: innovationItems } = useSWR(API.GET_INNOVATION_CATTEGORY_API, fetcher);
  const { data: techItems } = useSWR(API.GET_TECH_CATTEGORY_API, fetcher);
  const { data: countryItems } = useSWR(API.GET_COUNTRY_LIST_API, fetcher);
  return (
    <React.Fragment>
      <p className='mb-2 mt-3 fw-6'>Title</p>
      <Form.Item
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input the contest title!',
          },
        ]}
      >
        <Input onChange={(e)=>form.setFieldsValue({slug:`${slugify(e.target.value)}-${getRandomInt(100000, 999999)}`})} />
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Slug</p>
      <Form.Item
        name='slug'
      >
        <Input disabled />
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Contest Type</p>
      <Form.Item
        name='contestTypeId'
        rules={[
          {
            required: true,
            message: 'Please input the contest type!',
          },
        ]}
      >
        <Select>
          {
            contestType && contestType.data &&
            contestType.data.map((product, index) => {
              return <Option key={index} value={product.id}>{product.name}</Option>;
            })
          }
        </Select>
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Industry</p>
      <Form.Item
        name='productId'
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
            industryItems && industryItems.data &&
            industryItems.data.map((product, index) =>
              <Option key={index} value={product.id}>{product.name}</Option>
            )
          }
        </Select>
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Innovations</p>
      <Form.Item
        name='innovationId'
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
            innovationItems && innovationItems.data &&
            innovationItems.data.map((product, index) =>
              <Option key={index} value={product.id}>{product.name}</Option>
            )
          }
        </Select>
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>Tech</p>
      <Form.Item
        name='techId'
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
            techItems && techItems.data &&
            techItems.data.map((product, index) =>
              <Option key={index} value={product.id}>{product.name}</Option>
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
            name='countryId'
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
                countryItems && countryItems.data &&
                countryItems.data.map((country, index) =>
                  <Option key={index} value={country.id}>{country.name}</Option>
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
            name='nbContestant'
            rules={[
              {
                required: !designerDisable,
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
            name='allnbContestant'
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
            name="minPoints"
            rules={[
              {
                required: true,
                message: 'required',
              },
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>
        <Col className="pt-1">
          <span>points in the Hubbers  product competion</span>
        </Col>
      </Row>
      <p className='mb-2 mt-3 fw-6'>How many judges will participate from your side?</p>
      <Form.Item
        name='nbJudge'
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
        name='extraNbJudge'
        label={<span>Number of extra judge needed</span>}
      >
        <Input type='number' min={0} />
      </Form.Item>
      <p className='mb-2 mt-3 fw-6'>How many revisions do you want to allow designers to provide (up to 3).</p>
      <Form.Item
        name='nbRevision'
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
      <p className='mt-3 mb-2 fw-6'>Image of your Contest</p>
      <Form.Item
        name='featuredImageUrl'
        rules={[
          {
            required: true,
            message: 'Please upload the image!',
          },
        ]}
      >
        <UploadImage />
      </Form.Item>
      <p className="mt-2 mb-3 fw-6">Start and End Date</p>
      <Form.Item
        name='date'
        rules={[
          {
            required: true,
            message: 'Please input the date'
          }
        ]}
      >
        <RangePicker showTime style={{ width: '100%' }} onChange={(ds) => {
          let duration = ds[1].diff(ds[0], 'days');
          form.setFieldsValue({
            startTime:ds[0].format(),
            endTime:ds[1].format(),
            duration: duration
          });
        }} />
      </Form.Item>
      <Form.Item
        name='startTime'
        hidden
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='endTime'
        hidden
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='duration'
        hidden
      >
        <Input />
      </Form.Item>
    </React.Fragment>
  );
};