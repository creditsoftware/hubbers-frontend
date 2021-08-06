import React from 'react';
import { Select, Form, Switch, Slider } from 'antd';
import { Container } from '../Container';
import { SettingDrawer } from '../community';
import Checkbox from 'antd/lib/checkbox/Checkbox';
const { Option } = Select;

export const ContestDrawer = ({ visible, onHide, editable = true, content, ...props }) => {
  const [isGlobal, setIsGlobal] = React.useState(false);
  const [someDesignerDisable, setSomeDesignerDisable] = React.useState(false);
  const [form] = Form.useForm();
  const contestType = ['Product Design', 'Logo/icon desing', 'Product packaging/packing design', 'UI/UX for website/app'];
  const industryItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const countryItems = ['Italy', 'Paris', 'United Kingdom', 'United State'];
  const handleIndustryChange = (value) => {
    console.log(value);
  };
  const handleLocationChange = (value) => {
    console.log(value);
  };
  const handleSomeDesignerChange = (disabled) => {
    console.log(disabled);
    setSomeDesignerDisable(disabled);
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Contest'
    submitBtn={(!content && editable) || (content && editable)}
    submitBtnLabel={!content && editable ? 'Create' : content && editable ? 'Save' : 'Save'}
    form={form}
    {...props}
  >
    <Form
      name='group-edit'
      form={form}
    >
      <Container>
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
            <Select defaultValue={contestType[props.contestTypeName]}>
              {
                contestType.map((name, index) =>
                  <Option key={index}>{name}</Option>
                )
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
              onChange={handleIndustryChange}
            >
              {
                industryItems.map((product, index) =>
                  <Option key={index}>{product}</Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item
            name='isGlobal'
            label={<b>Global/Local</b>}
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
                  onChange={handleLocationChange}
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
          <Form.Item
            name='designers'
          >
            <Slider
              defaultValue={0}
              min={0}
              max={50}
              trackStyle={{ backgroundColor: '#75AC2A' }}
              handleStyle={{ borderColor: '#75AC2A' }}
              disabled={someDesignerDisable}
            />
            <div className="mt-3 mb-2">
              <Checkbox onChange={(e) => handleSomeDesignerChange(e.target.checked)}>Everyone can participate</Checkbox>
            </div>
          </Form.Item>
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};