import React from 'react';
import { Form, Switch, Input } from 'antd';
import { UploadImage } from '../../UploadImage';

export const ContestIdentify = () => {
  const [isCompany, setIsCompany] = React.useState(false);
  return (
    <React.Fragment>
      <p className='mt-3 mb-2 fw-6'></p>
      <Form.Item
        name='isCompany'
        label={<b>Do you organize this contest for your company?</b>}
        valuePropName='checked'
      >
        <Switch onChange={(e) => setIsCompany(e)} />
      </Form.Item>
      {
        isCompany ? (
          <React.Fragment>
            <p className='mb-2 mt-3 fw-6'>Your company details</p>
            <Form.Item
              name='companyname'
              label={<span className='px-1 mr-1'>name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the your company name',
                },
              ]}
            >
              <Input placeholder='your company name' />
            </Form.Item>
            <Form.Item
              name='companyaddress'
              label={<span>address</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the your company address',
                },
              ]}
            >
              <Input placeholder='your company address' />
            </Form.Item>
            <Form.Item
              name="companycountry"
              label={<span>country</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the country'
                }
              ]}
            >
              <Input placeholder='your company country' />
            </Form.Item>
            <Form.Item
              name="companycity"
              label={<span className='px-2 mr-2'>city</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the city'
                }
              ]}
            >
              <Input  placeholder='your company city'/>
            </Form.Item>
            <Form.Item
              name="companycode"
              label={<span className='px-1 mr-1'>code</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the code'
                }
              ]}
            >
              <Input placeholder='your company code' />
            </Form.Item>
            <Form.Item
              name="companystate"
              label={<span className='px-2'>state</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the state'
                }
              ]}
            >
              <Input placeholder='your company state' />
            </Form.Item>
            <Form.Item
              name='companywebsite'
              label={<span>website</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the your company website',
                },
              ]}
            >
              <Input placeholder='your company website' />
            </Form.Item>
            <p className='mt-3 mb-2'>Logo of your company</p>
            <Form.Item
              name='companyLogoImgUrl'
              rules={[
                {
                  required: true,
                  message: 'Please upload the logo!',
                },
              ]}
            >
              <UploadImage />
            </Form.Item>
          </React.Fragment>
        ) : ''
      }
      <Form.Item
        name='isOrganizeRight'
        label={<b>Do you have the right to organize a contest on behalf of your company?</b>}
        valuePropName='checked'
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name='isCoOrganize'
        label={<b>Do you want to add some co_organizer to help you follow up this product competition?</b>}
        valuePropName='checked'
      >
        <Switch />
      </Form.Item>
    </React.Fragment>
  );
};