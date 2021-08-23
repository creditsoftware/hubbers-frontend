import React from 'react';
import { Button, Form, Space } from 'antd';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { CreateCourseSteps } from './CreateCourseSteps';
import { CreateCourseBasic } from './CreateCourseBasic';
import { CreateCourseStructure } from './CreateCourseStructure';
import { CreateCourseInstructor } from './CreateCourseInstructor';
import { CreateCourseDone } from './CreateCourseDone';
import { fetchJson, openNotificationWithIcon } from '../../../utils';
import { API } from '../../../constants';
import { useGetDraftedCourse } from '../../../hooks/useSWR/community/useGetDraftedCourse';

export const CourseDrawer = ({ visible, onHide, ...props }) => {
  const [progress, setProgress] = React.useState(0);
  const [form] = Form.useForm();
  const {data: draftedCourse} = useGetDraftedCourse(props.query.community, props.auth.id);
  React.useEffect(() => {
    console.log(draftedCourse);
    if(draftedCourse && form) {
      form.setFieldsValue({...draftedCourse.data});
    }
  },[draftedCourse, form]);
  const onFinish = (values) => {
    let d = {
      ...values,
      communityId: props.query.community,
      isGlobal: false,
      createdBy: props.auth.id
    };
    if(draftedCourse) {
      d = {
        ...draftedCourse.data,
        ...d
      };
    }
    switch (progress) {
      case 0:
        fetchJson(`${API.CREATE_COURSE_BASIC_DATA_API}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...d })
        }).then(() => {
          onNext();
        }).catch((error) => {
          console.log(error);
          openNotificationWithIcon('error', 'Something went wrong!');
        });
        break;
      case 1:
        fetchJson(`${API.CREATE_COURSE_BASIC_DATA_API}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...d })
        }).then(() => {
          onNext();
        }).catch((error) => {
          console.log(error);
          openNotificationWithIcon('error', 'Something went wrong!');
        });
        break;
      default:
        break;
    }
    if (progress < 3) {
      onNext();
    } else {
      onHide();
    }
  };
  const onNext = () => {
    setProgress(progress + 1);
  };
  const onPrev = () => {
    if (progress === 0) {
      onHide();
    } else {
      setProgress(progress - 1);
    }
  };
  const renderContent = () => {
    switch (progress) {
      case 0:
        return <CreateCourseBasic form={form} />;
      case 1:
        return <CreateCourseStructure />;
      case 2:
        return <CreateCourseInstructor />;
      case 3:
        return <CreateCourseDone />;
      default:
        return null;
    }
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title={
      <Space>
        {
          progress > 0 ?
            <div className='d-flex'>
              <Button type='link' size='small' onClick={onPrev}>
                <ArrowLeftOutlined style={{ color: 'black' }} />
              </Button>
            </div>
            : ''
        }
        Course
      </Space>
    }
    submitBtn={progress < 3}
    submitBtnLabel={progress < 2 ? 'Next' : 'Finish'}
    form={form}
    {...props}
  >
    <Container className="pt-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {
          renderContent()
        }
        <div className="pt-5 max-w-40 pb-5 m-auto">
          <CreateCourseSteps current={progress} />
        </div>
        <div className='text-right'>
          <Form.Item>
            <Button type="hbs-primary" htmlType="submit">
              {progress < 2 ? 'Next' : 'Finish'}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Container>
  </SettingDrawer>;
};