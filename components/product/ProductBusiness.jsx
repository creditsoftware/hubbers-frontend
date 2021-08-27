import React from 'react';
import { useRouter } from 'next/router';
import { Modal, Form, Row, Col, Slider, Input, Select, Button, Image } from 'antd';
import { fetchJson } from '../../utils';
import { API } from '../../constants';

const { TextArea } = Input;
const { Option } = Select;

export const ProductBusiness = () => {

  const router = useRouter();
  const [businessForm] = Form.useForm();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expertiseCategoryList, setExpertiseCategoryList] = React.useState([]);
  const [businessNeedList, setBusinessNeedList] = React.useState([]);
  const [projectTagsList, setProjectTagsList] = React.useState([]);

  React.useEffect(() => {
    fetchJson(`${API.GET_ALL_EXPERTISE_CATEGORY_API}`).then((response) => {
      setExpertiseCategoryList(response.data);
    });
    fetchJson(`${API.GET_PROJECT_TAGS_LIST}`).then((response) => {
      setProjectTagsList(response.data);
    });
    fetchJson(`${API.GET_BUSINESS_NEED_LIST}/${router.query.slug}`).then((response) => {
      setBusinessNeedList(response.data);
    });
  }, []);

  const setModal = () => {
    businessForm.resetFields();
    businessForm.setFieldsValue({ budget: [5000, 10000] });
    setModalVisible(!modalVisible);
  };

  const onBusinessSubmit = (values) => {
    fetchJson(`${API.CREATE_BUSINESS_NEED}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, projectId: Number(router.query.slug) })
    }).then(res => {
      fetchJson(`${API.GET_PROJECT_TAGS_LIST}`).then((response) => {
        setProjectTagsList(response.data);
      });
      fetchJson(`${API.GET_BUSINESS_NEED_LIST}/${router.query.slug}`).then((response) => {
        setBusinessNeedList(response.data);
        setModalVisible(!modalVisible);
      });
    })
  };

  const limitTags = (value) => {
    if (value.length > 5) {
      businessForm.setFieldsValue({ tags: value.slice(0, 5) });
    }
  };

  return <React.Fragment>
    <div className="text-center max-w-40 pb-5">
      {
        businessNeedList?.length > 0 &&
        <Row className="pt-5 pb-3" style={{ borderBottom: '1px solid grey' }}>
          <Col span={8}>ACTIVE BUSINESS NEED</Col>
          <Col span={4}>BIDS</Col>
          <Col span={5}>AVG AMOUNT</Col>
          <Col span={7}>AVG DELIVERY TIME</Col>
        </Row>
      }
      {
        businessNeedList?.map((item) => {
          return <Row key={item.key} className="py-3" style={{ borderBottom: '1px solid grey' }}>
            <Col span={2}>
              <Image width={42} height={42} src={item.expertiseCategory.icon} preview={false} />
            </Col>
            <Col span={6}>
              <p className="mb-0 p-3" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.description}</p>
            </Col>
            <Col span={4} className="p-3">{item.bid ?? '-'}</Col>
            <Col span={5} className="p-3">{item.avgAmount ?? '-'}</Col>
            <Col span={7} className="p-3">{item.avgDeliveryTime ?? '-'}</Col>
          </Row>
        })
      }
      <h1 className="fs-3 pt-5">POST A BUSINESS NEED</h1>
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
        onFinish={onBusinessSubmit}
      >
        <h1 className="fs-2 pt-3 text-center">CREATE A BUSINESS NEED</h1>
        <Form.Item
          name="expertiseCategoryId"
          rules={[
            {
              required: true,
              message: 'Please choose a category'
            }
          ]}
        >
          <Select placeholder="Please select a category.">
            {
              expertiseCategoryList?.map((item) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>;
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="description">
          <TextArea rows={3} placeholder="Description" />
        </Form.Item>
        <label>BUDGET</label>
        <Form.Item name="budget">
          <Slider range defaultValue={[5000, 10000]} min={0} max={20000} />
        </Form.Item>
        <Form.Item name="tags">
          <Select mode="tags" placeholder="Enter up to 5 tags" onChange={limitTags}>
            {
              projectTagsList?.map((item) => {
                return <Option key={item.id} value={item.name}>{item.name}</Option>;
              })
            }
          </Select>
        </Form.Item>
        <Button type="hbs-primary" shape="round" className="mt-1" htmlType="submit">CREATE</Button>
      </Form>
    </Modal>
  </React.Fragment >;
};