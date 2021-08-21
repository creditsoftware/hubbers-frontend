import React from 'react';
import { Form, Switch, Input, Select } from 'antd';
import { UploadImage } from '../../UploadImage';
import { UserSelect } from '../UserSelect';
import useSWR from 'swr';
import { fetcher } from '../../../utils';
import { API } from '../../../constants';
const { Option } = Select;

export const ContestIdentify = ({form, ...props}) => {
  const [isCompany, setIsCompany] = React.useState(form.getFieldsValue(true).isCompany);
  const [coOrganize, setCoOrganize] = React.useState(form.getFieldsValue(true).isCoOrganizer);
  const { data: countryItems } = useSWR(API.GET_COUNTRY_LIST_API, fetcher);
  const { data: contest } = useSWR(API.CONTEST_API, fetcher);
  React.useEffect(() => {
    if (form && props.contestTypeId !== undefined) {
      form.setFieldsValue({
        contestTypeId: props.contestTypeId
      });
    }
    console.log(contest);
    if(contest && contest.result) {
      const v = contest.result.filter((d) => d.createdBy === props.auth.id && d.isDraft === true)[0];
      if(v) {
        let userId = [];
        v.coOrganizer.map((val) => {
          userId = [...userId,val.id];
        });
        form.setFieldsValue({
          ...v,
          ...v.company,
          userId
        });
      }
    }
  }, [props.contestTypeId, form, contest]);
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
              name='companyName'
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
              name='address'
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
              name='companyCountryId'
              label={<span>country</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the area or country!',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Please select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {
                  countryItems && countryItems.data &&
                  countryItems.data.map((country, index) =>
                    <Option key={index} value={country.id}>{country.name}</Option>
                  )
                }
              </Select>
            </Form.Item>
            <Form.Item
              name="city"
              label={<span className='px-2 mr-2'>city</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input the city'
                }
              ]}
            >
              <Input placeholder='your company city' />
            </Form.Item>
            <Form.Item
              name="code"
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
              name="state"
              label={<span className='px-2'>state</span>}
            >
              <Input placeholder='your company state' />
            </Form.Item>
            <Form.Item
              name='website'
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
              name='logoImage'
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
        name='isCoOrganizer'
        label={<b>Do you want to add some co_organizer to help you follow up this product competition?</b>}
        valuePropName='checked'
      >
        <Switch onChange={(e) => setCoOrganize(e)} />
      </Form.Item>
      {
        coOrganize &&
        <Form.Item
          name='userId'
          rules={[
            {
              required: true,
              message: 'Please input the co organizer!',
            },
          ]}
        >
          <UserSelect />
        </Form.Item>
      }
    </React.Fragment>
  );
};