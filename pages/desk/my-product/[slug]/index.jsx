import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Row, Col, Modal, Form, Slider, Input, Select, Button } from 'antd';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../../utils/withSession';
import { jwtDecode } from '../../../../utils/jwt';
import { fetcher } from '../../../../utils/fetcher';
import { fetchJson, slugify } from '../../../../utils';
import { Container, ProductDetailHeader, UploadImage } from '../../../../components';
import { API } from '../../../../constants/index';
import { useProductData } from '../../../../hooks/useSWR/product/useProductData';

const { TextArea } = Input;
const { Option } = Select;

const Details = ({ ...props }) => {

  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: productData, mutate: mutatePDetails } = useProductData(router.query.slug);
  const [form] = Form.useForm();
  const [businessForm] = Form.useForm();
  const [currentPage, setCurrentPage] = React.useState('details');
  const [productCategory, setProductCategory] = React.useState([]);
  const [innovationCategory, setInnovationCategory] = React.useState([]);
  const [techCategory, setTechCategory] = React.useState([]);
  const [countryList, setCountryList] = React.useState([]);
  const [languageList, setLanguageList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

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
    }).then((response) => {
      mutatePDetails();
    });
  };

  const setModal = () => {
    businessForm.resetFields();
    setModalVisible(!modalVisible);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <DeskPageHoc title='Product Details' activeSide={{ active: ['my-product'], open: ['my-product'] }} auth={{ ...data }} query={{ ...props.query }}>
      <Container>
        <React.Fragment>
          <ProductDetailHeader current={currentPage} changePage={onChangePage} data={productData?.data} />
          {
            currentPage === 'details' ?
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
              : currentPage === 'business' ?
                <React.Fragment>
                  <div className="text-center max-w-40 py-5">
                    <h1 className="fs-3">POST A BUSINESS NEED</h1>
                    <p className="fs-1">Post your business needs and receive customized quotations from experts around the world.</p>
                    <Button type="hbs-primary" shape="round" size="large" onClick={setModal}>POST A BUSINESS NEED</Button>
                  </div>
                  <Modal
                    centered
                    visible={modalVisible}
                    onCancel={setModal}
                    footer={null}
                  >
                    <Form
                      form={businessForm}
                      onFinish={onSubmit}
                    >
                      <h1 className="fs-2 pt-3 text-center">CREATE A BUSINESS NEED</h1>
                      <Form.Item
                        name="category"
                        rules={[
                          {
                            required: true,
                            message: 'Please choose a category'
                          }
                        ]}
                      >
                        <Select
                          className="mb-2"
                          placeholder="Pleae select a category"
                        />
                      </Form.Item>
                      <Form.Item name="description">
                        <TextArea rows={3} placeholder="Description" />
                      </Form.Item>
                      <label>BUDGET</label>
                      <Form.Item name="budget">
                        <Slider range defaultValue={[5000, 10000]} min={0} max={20000} thumbTintColor="#44B38A" />
                      </Form.Item>
                      <Button type="hbs-primary" shape="round" className="mt-1" htmlType="submit">CREATE</Button>
                    </Form>
                  </Modal>
                </React.Fragment>
                : null
          }
        </React.Fragment>
      </Container>
    </DeskPageHoc>
  );
};

export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});

export default Details;