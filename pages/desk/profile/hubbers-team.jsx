import React from 'react';
import useSWR from 'swr';
import { API } from '../../../constants/index';
import { Input, Row, Col, Form, Image } from 'antd';
import { MainProfile, ProfileNavbar } from '../../../components/profile';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { Container } from '../../../components/Container';
import { fetcher } from '../../../utils/fetcher';
import { fetchJson } from '../../../utils';
import { UploadImage } from '../../../components';
const { TextArea } = Input;

const HubbersTeam = ({ ...props }) => {
  const [form] = Form.useForm();
  const [hubbersTeamData, setHubbersTeamData] = React.useState({});
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  React.useEffect(() => {
    if (data) {
      fetchJson(`${API.GET_HUBBERS_TEAM_PROFILE_API}/${data.id}`).then((response) => {
        setHubbersTeamData(response.data);
      });
    }
  }, [data]);
  React.useEffect(() => {
    if(form && hubbersTeamData) {
      form.setFieldsValue({
        ...hubbersTeamData,
        avatar: hubbersTeamData.user?.avatar,
        firstname: hubbersTeamData.user?.firstname,
        lastname: hubbersTeamData.user?.lastname
      });
    }
  }, [hubbersTeamData, form]);
  const onChange = () => {
    form.submit();
  };
  const onSubmit = (values) => {
    fetchJson(`${API.UPDATE_HUBBERS_TEAM_PROFILE_API}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((response) => {
      setHubbersTeamData(response.data);
    });
  };
  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }} query={{ ...props.query }}>
      <React.Fragment>
        <MainProfile auth={data} />
        <Container className="mt-4">
          <React.Fragment>
            <ProfileNavbar auth={data} actived='hubbers-team' />
            <div className="bg-white p-5">
              <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                onChange={onChange}
                onFinish={onSubmit}
              >
                <Row>
                  <Col sm={18} xs={24}>
                    <Row className="d-flex f-align-center px-5">
                      <Form.Item
                        name="avatar"
                      >
                        <UploadImage />
                      </Form.Item>
                      <p className="pl-5 fs-2">Add image you want to<br />show to your community.</p>
                    </Row>
                    <Row className="mt-5 px-5">
                      <Col span={12} className="pr-2">
                        <Form.Item name="firstname" label="First Name">
                          <Input type="text" className="profile-input p-2 mt-1" style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />
                        </Form.Item>
                      </Col>
                      <Col span={12} className="pl-2">
                        <Form.Item name="lastname" label="Last Name">
                          <Input type="text" className="profile-input p-2 mt-1" style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row className="mt-4 px-5">
                      <Col span={24}>
                        <Form.Item
                          name="title"
                          label="Title"
                        >
                          <Input type="text" className="profile-input p-2 mt-1" style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row className="mt-4 px-5">
                      <Col span={24}>
                        <Form.Item
                          name="description"
                          label="Description"
                        >
                          <TextArea rows={3} className="profile-input mt-3 p-2" style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <Row className="fjc-center">
                      <Button type="hbs-primary" size="large" shape="round">Active</Button>
                    </Row> */}
                  </Col>
                  <Col sm={6} xs={24} className="d-flex fjc-center f-align-center" >
                    <div className="p-4 text-center" style={{ borderRadius: '12px', border: '1px solid green' }}>
                      <Image width={200} height={200} src={hubbersTeamData.user?.avatar} preview={false} style={{ borderRadius: '12px' }} alt='' />
                      <h1 className="mt-4">{`${hubbersTeamData.user?.firstname ? hubbersTeamData.user?.firstname : ''} ${hubbersTeamData.user?.lastname ? hubbersTeamData.user?.lastname : ''}`}</h1>
                      <p>{hubbersTeamData.user?.detail?.location?.country}</p>
                      <p>{hubbersTeamData.title}</p>
                      <p>{hubbersTeamData.description}</p>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </React.Fragment>
        </Container>
      </React.Fragment>
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
export default HubbersTeam;