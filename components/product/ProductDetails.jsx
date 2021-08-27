import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Form, Input, Select } from 'antd';
import { fetchJson, slugify } from '../../utils';
import { UploadImage } from '../../components';
import { API } from '../../constants';
import { useProductData } from '../../hooks/useSWR/product/useProductData';

const { TextArea } = Input;
const { Option } = Select;

export const ProductDetails = () => {

  const router = useRouter();
  const { data: productData, mutate: mutatePDetails } = useProductData(router.query.slug);
  const [form] = Form.useForm();
  const [productCategory, setProductCategory] = React.useState([]);
  const [innovationCategory, setInnovationCategory] = React.useState([]);
  const [techCategory, setTechCategory] = React.useState([]);
  const [countryList, setCountryList] = React.useState([]);
  const [languageList, setLanguageList] = React.useState([]);

  React.useEffect(() => {
    fetchJson(`${API.GET_PRODUCT_CATTEGORY_API}`).then((response) => {
      setProductCategory(response.data);
    });
    fetchJson(`${API.GET_INNOVATION_CATTEGORY_API}`).then((response) => {
      setInnovationCategory(response.data);
    });
    fetchJson(`${API.GET_TECH_CATTEGORY_API}`).then((response) => {
      setTechCategory(response.data);
    });
    fetchJson(`${API.GET_COUNTRY_LIST_API}`).then((response) => {
      setCountryList(response.data);
    });
    fetchJson(`${API.GET_LANGUAGE_LIST_API}`).then((response) => {
      setLanguageList(response.data);
    });
  }, []);

  React.useEffect(() => {
    form.setFieldsValue({
      ...productData?.data,
      productCategory: productData?.data?.productCategory?.map((item) => item.productCategoryId),
      innovationCategory: productData?.data?.innovationCategory?.map((item) => item.innovationCategoryId),
      techCategory: productData?.data?.techCategory?.map((item) => item.techCategoryId)
    });
  }, [productData]);

  const onSubmit = (values) => {
    fetchJson(`${API.UPDATE_PRODUCT_DETAIL_API}/${router.query.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values }),
    }).then(() => {
      mutatePDetails();
    });
  };

  return <React.Fragment>
    <Form form={form} onFinish={onSubmit}>
      <Row wrap={false}>
        <Col flex="auto" className="pt-5 pr-5" style={{ borderRight: '1px solid grey' }}>
          <h1>YOUR GREATE IDEA NAME</h1>
          <p>Your project name is the first thing that outside world will see. make it attractive, descriptive, mysterious, easy to remember and short. Keep it under 100 characters.</p>
          <Form.Item name="name">
            <Input
              type="text"
              placeholder="Enter a project name for your product."
              onChange={(e) => form.setFieldsValue({ slug: slugify(e.target.value) })}
              onBlur={() => form.submit()}
            />
          </Form.Item>
          <Form.Item name="slug" hidden={true}>
            <Input type="text" />
          </Form.Item>
          <h1>DESCRIBE YOUR IDEA</h1>
          <p>Here you have to be more specific about your product. Give details about your product features, size, colors. Tell how you think your product will change the world or what you are going to bring that is different.</p>
          <Form.Item name="description">
            <TextArea rows={3} onBlur={() => form.submit()} />
          </Form.Item>
          <h1>PRODUCT CATEGORY</h1>
          <p>Please pick up the category that matches best your product idea. Select several categories if you think it fits to several product universe.</p>
          <Form.Item name="productCategory">
            <Select mode="multiple" onChange={() => form.submit()}>
              {
                productCategory?.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
          <h1>INNOVATION CATEGORY</h1>
          <p>Innovation is where you are here. Select what type of innovation your product idea brings.</p>
          <Form.Item name="innovationCategory">
            <Select mode="multiple" onChange={() => form.submit()}>
              {
                innovationCategory?.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
          <h1>TECH CATEGORY</h1>
          <p>Please pick up the category that matches best your product idea. Select several categories if you think it fits to several product universe.</p>
          <Form.Item name="techCategory">
            <Select mode="multiple" onChange={() => form.submit()}>
              {
                techCategory?.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
          <h1>MARKET</h1>
          <p>Here you describe the people who according to you will say 'whoaou' to your project. How you see them: Age, gender, occupations. Reasons they will like it.</p>
          <Form.Item name="market">
            <TextArea rows={3} onBlur={() => form.submit()} />
          </Form.Item>
          <h1>PRICE (USD)</h1>
          <p>Here you can make some assumptions about what would look like a good market price for your target audience.</p>
          <Form.Item name="price">
            <Input type="number" min={0} onBlur={() => form.submit()} />
          </Form.Item>
          <h1>COUNTRY</h1>
          <p>Please pick up the category that matches best your product idea. Select several categories if you think it fits to several product universe.</p>
          <Form.Item name="country">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={() => form.submit()}
            >
              {
                countryList?.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
          <h1>LANGUAGE</h1>
          <p>Please pick up the category that matches best your product idea. Select several categories if you think it fits to several product universe.</p>
          <Form.Item name="language">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={() => form.submit()}
            >
              {
                languageList?.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
        </Col>
        <Col flex="none" className="pt-5 pl-5">
          <h1>FEATURED IMAGE</h1>
          <Form.Item name="featuredImageUrl">
            <UploadImage />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </React.Fragment>;
};
