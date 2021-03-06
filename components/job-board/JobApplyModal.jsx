import React from 'react';
import { Button, Col, Input, Modal, Row, Form } from 'antd';
import Image from 'next/image';
import { API } from '../../constants/index';
import { fetchJson } from '../../utils';
import Link from 'next/link';
export const JobApplyModal = ({data, auth}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [applyState, setApplyState] = React.useState(null);
  React.useEffect(() => {
    fetchJson(`${API.CHECK_APPLY_STATE_API}/${data.id}/${auth.id}`).then((response) => {
      setApplyState(response);
    });
  }, []);
  const showModal = () => {
    form.setFieldsValue({
      message: applyState.message,
      name: auth.lastname? (auth.firstname + ' ' + auth.lastname): auth.firstname,
      email: auth.email
    });
    setVisible(true);
  };
  const onFinish = (values) => {
    fetchJson(`${API.CREATE_JOB_APPLICATION_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...values, jobId:data.id, userId:auth.id}),
    }).then((response)=>{
      setApplyState(response.result);
    });
    setVisible(false);
  };
  return <React.Fragment>
    {
      auth.isLoggedIn ? <Button type='hbs-primary' className='w-100 my-3' shape='round' onClick={showModal}>Apply</Button>
        : <Link href={`/auth/signin?redirect=/hubbers/hubbers-job-board/${data.slug}`}><a><Button type='hbs-primary' className='w-100 my-3' shape='round'>Apply</Button></a></Link>
    }
    <Modal
      title={<React.Fragment>
        <p className="fw-6 text-center mt-4">
          You have decided to apply to join us as
        </p>
        <h1 className="fw-6 text-center max-w-50 m-auto lh-1">
          “Community growth & networking & local Event coordinator.”
        </h1>
      </React.Fragment>}
      centered
      visible={visible}
      onCancel={()=>setVisible(false)}
      width={1000}
      footer={<></>}
    >
      <p className="text-center">
        Thanks for your interest of our great community. Your application to Hubbers is one step away !
      </p>
      <Form
        form={form}
        name='job-apply'
        layout='vertical'
        onFinish={onFinish}
      >
        <Row>
          <Col lg={12} md={12} sm={24}>
            <p>
              To make the hiring process smoother, we rely on your Linkedin profile information, so make sure that your profile is up to date.
            </p>
            <Form.Item name='linkedinUrl' label='Your linkedin url:'>
              <Input placeholder=''/>
            </Form.Item>
            <Form.Item name='message' label='So please just copy paste your linkedin url below and explain us why you want to join us in less than 800 words :'>
              <Input.TextArea rows={5} placeholder=''/>
            </Form.Item>
            <p>
              800 words to convince us to put your application on the top of the list.
            </p>
            <p className="fw-5">
              Also please leave your name and you email address so we can get in touch with you!
            </p>
            <Form.Item name='name' label='Your name:'>
              <Input placeholder=''/>
            </Form.Item>
            <Form.Item name='email' label='Your email address:'>
              <Input placeholder=''/>
            </Form.Item>
            <p>
              Keep in mind that Hubbers is a very open-minded community and an equal opportunity employer.
            </p>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <div className="d-flex fd-vertical fjc-center f-align-center h-100">
              <Image width={400} height={300} src='/images/job-board/job-board.png'/>
              <div className="text-center">
                <Button type='hbs-primary' htmlType="submit" shape='round' size='large' disabled={applyState}>
                  Apply Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  </React.Fragment>;
};