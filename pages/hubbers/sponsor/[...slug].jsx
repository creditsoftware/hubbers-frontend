import React from 'react';
import useSWR from 'swr';
import { fetchJson } from '../../../utils';
import { fetcher } from '../../../utils/fetcher';
import { useRouter } from 'next/router';
import { Image, Avatar, Col, Row, Space, Form, Input, Button } from 'antd';
import { Container, GlobalPartnerSlider } from '../../../components';
import { MainPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { API } from '../../../constants/index';

const { TextArea } = Input;

const SponsorDetail = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [sponsorData, setSponsorData] = React.useState({});
  const [form] = Form.useForm();
  React.useEffect(() => {
    fetchJson(`${API.GET_PARTNER_DETAIL_API}/${router.query.slug[0]}`).then((response) => {
      setSponsorData(response);
    });
  }, []);
  const onFinish = (values) => {
    fetchJson(`${API.CONTACT_PARTNER_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...values, id: router.query.slug[0], contacts: sponsorData.contacts.map((item)=>item.user.email)}),
    });
  };
  return (
    <MainPageHoc title={`Sponsor - ${sponsorData.name}`} auth={{ ...data }}>
      <Container className="py-4">
        <React.Fragment>
          <h1 className="text-center fs-5 fw-6">{sponsorData.name}</h1>
          <Row>
            <Col span={12}>
              <Image width={250} height={180} src={sponsorData.featuredImageUrl} preview={false} />
              <h1 className="fs-5 mt-5 mb-4">Your Partner Contact</h1>
              <Space wrap size={42}>
                {
                  sponsorData.contacts?.map((item)=>{
                    return <div key={item.id} className="user-box text-center m-auto">
                      <Avatar src={ <Image width={100} height={100} src={item.user.avatar} alt='' /> } size={100} style={{cursor: 'pointer'}} preview={false} />
                      <h3
                        className="mt-2 mb-0 fw-6 fs-2"
                        title={`${item.user.firstname ? item.user.firstname : ''} ${item.user.lastname ? item.user.lastname : ''}`}
                      >
                        {`${item.user.firstname ? item.user.firstname : ''} ${item.user.lastname ? item.user.lastname : ''}`}
                      </h3>
                      <span className="user-country">{item.user.detail.location.country}</span>
                    </div>;
                  })
                }
              </Space>
              <div className="mt-5 pt-5">{sponsorData.description}</div>
            </Col>
            <Col span={12}>
              <h1 className="fs-5 mt-5 mb-4">Contact {sponsorData.name} for:</h1>
              <ul className="fs-2">
                <li>get a quotation in China</li>
                <li>manufacture in China</li>
              </ul>
              <h1 className="fs-5 mt-5 mb-4">Send your message to {sponsorData.name}</h1>
              <Form
                name='send-message'
                form={form}
                onFinish={onFinish}
              >
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                  className="mt-3"
                >
                  <Input type='text' placeholder='Your name' bordered={false} style={{ borderBottom: '1px solid grey' }} />
                </Form.Item>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                  className="mt-3"
                >
                  <Input type='text' placeholder='Your email' bordered={false} style={{ borderBottom: '1px solid grey' }} />
                </Form.Item>
                <Form.Item
                  name='content'
                  rules={[
                    {
                      required: true,
                      message: 'Please input the content!',
                    },
                  ]}
                  className="mt-3"
                >
                  <TextArea rows={3} type='text' placeholder='Your question' bordered={false} style={{ borderBottom: '1px solid grey' }} />
                </Form.Item>
                <Button className="mt-3" type="hbs-primary" size='large' htmlType="submit" shape="round">Send Message</Button>
              </Form>
            </Col>
          </Row>
          <GlobalPartnerSlider />
        </React.Fragment>
      </Container>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default SponsorDetail;