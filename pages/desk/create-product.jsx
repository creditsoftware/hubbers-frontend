import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { API } from '../../constants/index';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';
import { fetchJson, slugify } from '../../utils';
import { withSession } from '../../utils/withSession';
import { jwtDecode } from '../../utils/jwt';
import { fetcher } from '../../utils/fetcher';
import { Modal, Form, Image, Input, Button } from 'antd';

const CreateProduct = ({ ...props }) => {
  
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = React.useState(false);

  const setModal = () => {
    form.resetFields();
    setModalVisible(!modalVisible);
  };

  const onSubmit = (value) => {
    fetchJson(`${API.CREATE_PRODUCT_API}/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...value}),
    }).then((response) => {
      if(response.success){
        setModal();
      }
    });
  };

  return (
    <DeskPageHoc title='Create Product' activeSide={{ active: ['create-product'], open: [] }} auth={{ ...data }} query={{...props.query}}>
      <Container className="py-5 text-center">
        <React.Fragment>
          <h1 className="fw-6 fs-6 pt-5 mb-5">Start your project!</h1>
          <p className="fw-5 fs-3 mb-1">Have an amazing product to launch?</p>
          <p className="fw-5 fs-3 mb-4">Just click on start a project and get access to great experts & resources</p>
          <Image width={250} alt='' height={150} src="/images/activity/activity1.png" preview={false} />
          <p className="fs-1 max-w-40 m-auto py-5">
            Hubbers community is all about creating new products, find experts for your projects,
            get resources in a framework that has been thought BY and FOR innovators.
            <br/>
            Want to know more about it, just read&nbsp;
            <Link href="https://hubbers.tawk.help/article/starting-a-new-product-project">
              <a className="fc-primary">
                launch a product with Hubbers.
              </a>
            </Link>
            <br/>
            Questions about how your data confidentiality is protected, it is here.
          </p>
          <Button type="hbs-primary" size="large" shape="round" onClick={setModal}>START YOUR PROJECT</Button>
          <Modal
            visible={modalVisible}
            onCancel={setModal}
            footer={null}
          >
            <Form
              form={form}
              onFinish={onSubmit}
              className="text-center"
            >
              <h1>All start with a name</h1>
              <p>You can change later.</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the product name'
                  }
                ]}>
                <Input
                  type="text"
                  className="mb-2"
                  placeholder="Enter a project name for your product."
                  onChange={(e)=> form.setFieldsValue({ slug: slugify(e.target.value) })}
                />
              </Form.Item>
              <Form.Item name="slug" hidden={true}>
                <Input type="text" />
              </Form.Item>
              <Button type="hbs-primary" shape="round" className="mt-1" htmlType="submit">CREATE</Button>
            </Form>
          </Modal>
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
export default CreateProduct;