import React from 'react';
import { Button, Drawer, Row, Col, Avatar, Space, PageHeader } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { defaultAvatar } from '../../../constants/etc';
import { Container } from '../../Container';
import { useWindowSize } from '../../../hooks';

export const SettingDrawer = ({
  visible,
  onHide,
  content,
  headerActions,
  title = 'Title',
  showExpand = true,
  showClose = true,
  form,
  submitBtn = false,
  submitBtnLabel = 'Submit',
  onCourseNext = null,
  onCoursePrev = null,
  type,
  ...props
}) => {
  const [fullWidth, setFullWidth] = React.useState(false);
  const size = useWindowSize();
  return <Drawer
    title={
      <Row className='px-3 py-2'>
        <Col lg={14} md={14} sm={14}>
          <Row className='f-align-center'>
            <Avatar size={50} icon={<Image width={100} height={100} src={props.auth?.avatar ?? defaultAvatar} alt='' />} />
            <div className='ml-4'>
              <p className='mb-1 fw-6 fc-primary'>Hubbers</p>
              <p className='mb-1 fw-6 fc-3 fs-3'>Network Setting</p>
            </div>
          </Row>
        </Col>
        <Col lg={10} md={10} sm={10} className='text-right'>
          <Space align='center' className='h-100'>
            {
              showExpand &&
              <Button type='hbs-link' onClick={() => setFullWidth(!fullWidth)}>
                <ArrowsAltOutlined style={{ fontSize: '26px', fontWeight: '600', color: '#c4c4c4' }} />
              </Button>
            }
            {
              headerActions
            }
            {
              showClose &&
              <Button type='hbs-dashed' shape='round' onClick={onHide}>&times;&nbsp;Close</Button>
            }
          </Space>
        </Col>
      </Row>
    }
    closable={false}
    visible={visible}
    onClick={(e) => e.preventDefault()}
    onClose={onHide}
    key='1'
    width={fullWidth || size.width <= 1024 ? '100%' : 1024}
  >
    <PageHeader
      title={title}
      className='bg-primary'
      style={{
        margin: '-24px -24px 24px -24px'
      }}
      onBack={onCoursePrev}
      extra={
        type === 'course' && submitBtn ? <Button type='hbs-dashed' shap='round' onClick={onCourseNext}>{submitBtnLabel}</Button> :
          form && submitBtn ?
            <Button type='hbs-dashed' shape='round' onClick={() => {
              if (form.submit) {
                form.submit();
              }
            }}>{submitBtnLabel}</Button>
            : null
      }
    />
    <Container>
      <React.Fragment>
        {
          content
        }
        {
          props.children
        }
      </React.Fragment>
    </Container>
  </Drawer>;
};