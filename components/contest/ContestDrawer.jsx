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
  const contestType = [{id:0, name:'Product Design'},{id:1, name:'Logo/icon desing'}, {id:2, name:'Product packaging/packing design'},{id:3, name:'UI/UX for website/app'} ];
  const industryItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const innovationItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const techItems = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'];
  const countryItems = ['Italy', 'Paris', 'United Kingdom', 'United State'];
  React.useEffect(() => {
    if(form && props.contestTypeName) {
      form.setFieldsValue({
        contestType: props.contestTypeName
      });
    }
  }, [props.contestTypeName, form]);
  const handleSomeDesignerChange = (disabled) => {
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
            <Select>
              {
                contestType &&
                contestType.map((name) => {
                  return <Option key={name.id} value={name.id}>{name.name}</Option>;
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
          </Form.Item>
          <Form.Item
            name='alldesigners'
            valuePropName='checked'
          >
            <Checkbox onChange={(e) => handleSomeDesignerChange(e.target.checked)}>Everyone can participate</Checkbox>
          </Form.Item>
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};