import React from 'react';
import {
  Button,
  Drawer,
  Row,
  Col,
  Input,
  Select,
  Space,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
  Divider,
  Form
} from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { Container } from '../../Container';
import { useWindowSize } from '../../../hooks';
import {
  EventRepeatPeriod,
  timezoneList,
  EventOnlineType,
  EventRepeatPeriodCustomUnit,
  WeekDays,
  API
} from '../../../constants';
import { UploadImage } from '../../UploadImage';
import { fetchJson, getRandomInt, openNotificationWithIcon, slugify } from '../../../utils';
import { useRouter } from 'next/router';
const { Option } = Select;
const { TextArea } = Input;

export const EditEventDrawer = ({ visible, onHide }) => {
  const size = useWindowSize();
  const router = useRouter();
  const formRef = React.createRef();
  const [fullWidth, setFullWidth] = React.useState(false);
  const [dateTime, setDateTime] = React.useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    customRepeatPeriod: {
      // date: ''
    }
  });
  const [communityList, setCommunityList] = React.useState(null);
  const [topicList, setTopicList] = React.useState(null);
  const [allTopicList, setAllTopicList] = React.useState(null);
  const [selectedCommunity, setSelectedCommunity] = React.useState(null);
  const [isRepeat, setIsRepeat] = React.useState(false);
  const [isGlobal, setIsGlobal] = React.useState(false);
  const [rsvp, setRsvp] = React.useState(false);
  const [repeatPeriod, setRepeatPeriod] = React.useState();
  const [endType, setEndType] = React.useState('date');
  const [eventType, setEventType] = React.useState('online');
  const [eventOnlineType, setEventOnlineType] = React.useState('meeting');

  React.useEffect(() => {
    if (selectedCommunity) {
      let t = allTopicList.filter((topic) => topic.communityId === selectedCommunity);
      setTopicList(t);
    } else {
      setTopicList(allTopicList);
    }
  }, [selectedCommunity]);

  React.useEffect(() => {
    //get community list
    fetchJson(`${API.LOCAL_GET_COMMUNITY_LIST_API}`)
      .then((response) => {
        console.log(response);
        setCommunityList(response.data.data);
      })
      .catch(() => {
        setCommunityList([]);
      });
    //get topic list
    fetchJson(`${API.GET_ALL_TOPIC_LIST_API}`)
      .then((response) => {
        setTopicList(response.data);
        setAllTopicList(response.data);
      })
      .catch(() => {
        setTopicList([]);
      });
  }, []);

  const createEvent = async (values) => {
    const response = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
    let data = {
      ...values,
      ...dateTime,
      customRepeatPeriod:
      {
        ...values.customRepeatPeriod,
        ...dateTime.customRepeatPeriod
      },
      createdBy: response.communityMember.filter((c) => c.communityId === parseInt(router.query.community, 10))[0].id
    };
    fetchJson(`${API.CREATE_EVENT_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.success) {
          openNotificationWithIcon('success', 'Success!', response.message);
        } else {
          openNotificationWithIcon('error', 'Something went wrong!', response.message ? response.message : response.errors[0]?.message);
        }
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Something went wrong!', 'Faild to create event');
      });
  };

  return <Drawer
    title={
      <Row className='px-3 py-2'>
        <Col lg={14} md={14} sm={14}>
          <p className='mb-0 fw-6 fc-3 fs-3'>Create Event</p>
        </Col>
        <Col lg={10} md={10} sm={10} className='text-right'>
          <Space align='center' className='h-100'>
            <Button type='hbs-link' onClick={() => setFullWidth(!fullWidth)}>
              <ArrowsAltOutlined style={{ fontSize: '26px', fontWeight: '600', color: '#c4c4c4' }} />
            </Button>
            <Button type='hbs-primary' onClick={() => { document.getElementById('event-form-submit-btn').click(); }} shape='round'>Post</Button>
            <Button type='hbs-dashed' shape='round' onClick={onHide}>&times;&nbsp;Close</Button>
          </Space>
        </Col>
      </Row>
    }
    closable={false}
    visible={visible}
    onClose={onHide}
    key='1'
    width={fullWidth || size.width <= 1024 ? '100%' : 1024}
  >
    <Container>
      <Form
        name='eventForm'
        onFinish={createEvent}
        ref={formRef}
        initialValues={{
          isGlobal: isGlobal,
          isRepeat: isRepeat,
          rsvp: rsvp,
          restrictEventLink: false,
          closeRsvps: false,
          eventType: eventType,
          repeatEndType: endType,
          onlineType: eventOnlineType,
          customRepeatPeriod: { repeatEndType: 'date' }
        }}
      >
        <React.Fragment>
          <Form.Item
            style={{ display: 'none' }}
          >
            <Button type='text' htmlType='submit' id='event-form-submit-btn' />
          </Form.Item>
          <Form.Item
            name='isGlobal'
            label={<b>Global</b>}
            colon={false}
            style={{ float: 'right' }}
            valuePropName='checked'
          >
            <Switch onChange={(v) => { setIsGlobal(v); formRef.current.setFieldsValue({ communityId: null }); }} />
          </Form.Item>
          <p className='fw-6 fc-3 fs-2'>Event Setting</p>
          <p className='mb-2 mt-4 fw-6'>Post to event in</p>
          <Row>
            <Col lg={11} md={11} sm={11}>
              <Form.Item
                name='communityId'
                rules={!isGlobal ? [{ required: true, message: 'Please select!' }] : []}
              >
                <Select
                  allowClear
                  disabled={isGlobal}
                  style={{ width: '100%' }}
                  placeholder='Community'
                  onChange={(v) => { setSelectedCommunity(v); formRef.current.setFieldsValue({ topicId: null }); }}
                >
                  {
                    communityList &&
                    communityList.map((community) => {
                      return <Option key={community.id} value={community.id}>{community.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col lg={2} md={2} sm={2} />
            <Col lg={11} md={11} sm={11}>
              <Form.Item
                name='topicId'
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder='Topic'
                  allowClear
                >
                  {
                    topicList &&
                    topicList.map((topic) => {
                      return <Option key={topic.id} value={topic.id}>{topic.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col lg={11} md={11}>
              <p className='mb-2 mt-4 fw-6'>Event title</p>
              <Form.Item
                name='title'
                rules={[
                  { required: true, message: 'Please input event title!' }
                ]}
              >
                <Input type='text' placeholder='Add a title' onChange={(v) => formRef.current.setFieldsValue({ slug: `${slugify(v.target.value)}-${getRandomInt(100000, 999999)}` })} />
              </Form.Item>
            </Col>
            <Col lg={2} md={2} />
            <Col lg={11} md={11}>
              <p className='mb-2 mt-4 fw-6'>Event slug</p>
              <Form.Item
                name='slug'
                rules={[
                  { required: true, message: 'Please input event slug!' }
                ]}
              >
                <Input type='text' disabled placeholder='event slug' />
              </Form.Item>
            </Col>
          </Row>
          <p className="mb-2 mt-4 fw-6">Timezone</p>
          <Form.Item
            name='timezone'
            rules={[
              { required: true, message: 'Please set timezone!' }
            ]}
          >
            <Select placeholder='Timezone' allowClear>
              {
                timezoneList.map((zone, index) => {
                  return <Option value={zone.value} key={index}>{zone.abbr}({zone.value})</Option>;
                })
              }
            </Select>
          </Form.Item>
          <Row>
            <Col lg={11} md={11} sm={11}>
              <p className='mb-2 fw-6'>Start</p>
              <Row>
                <Col lg={12} md={12}>
                  <Form.Item
                    name='startDate'
                    rules={[
                      { required: true, message: 'Please set start date!' }
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} onChange={(date, ds) => setDateTime({ ...dateTime, startDate: ds })} />
                  </Form.Item>
                </Col>
                <Col lg={2} md={2} />
                <Col lg={10} md={10}>
                  <Form.Item
                    name='startTime'
                    rules={[
                      { required: true, message: 'Please set start time!' }
                    ]}
                  >
                    <TimePicker style={{ width: '100%' }} onChange={(time, ts) => setDateTime({ ...dateTime, startTime: ts })} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col lg={2} md={2} sm={2} />
            <Col lg={11} md={11} sm={11}>
              <p className='mb-2 fw-6'>End</p>
              <Row>
                <Col lg={12} md={12}>
                  <Form.Item
                    name='endDate'
                    rules={[
                      { required: true, message: 'Please set end date!' }
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} onChange={(date, ds) => setDateTime({ ...dateTime, endDate: ds })} />
                  </Form.Item>
                </Col>
                <Col lg={2} md={2} />
                <Col lg={10} md={10}>
                  <Form.Item
                    name='endTime'
                    rules={[
                      { required: true, message: 'Please set end time!' }
                    ]}
                  >
                    <TimePicker style={{ width: '100%' }} onChange={(time, ts) => setDateTime({ ...dateTime, endTime: ts })} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="mt-4">
            <Form.Item
              name='isRepeat'
              label={<b>Repeat Event</b>}
              colon={false}
              valuePropName='checked'
            >
              <Switch onChange={(v) => setIsRepeat(v)} />
            </Form.Item>
          </div>
          {
            isRepeat
              ? <div className='bg-hbx-sixth p-3 mt-4 br-1'>
                <p className='mb-2 fw-6'>Repeat period</p>
                <Form.Item
                  name='repeatPeriod'
                  rules={[{ required: true, message: 'Please select repeat period!' }]}
                >
                  <Select onChange={(v) => setRepeatPeriod(v)} style={{ width: '100%' }}>
                    {
                      EventRepeatPeriod.map((item) => {
                        return <Option key={item.value} value={item.value}>{item.name}</Option>;
                      })
                    }
                  </Select>
                </Form.Item>
                {
                  repeatPeriod === 'custom' &&
                  <React.Fragment>
                    <p className='mb-2 mt-4 fw-6'>Occurs Every</p>
                    <Row>
                      <Col lg={11} md={11} sm={11}>
                        <Form.Item
                          name={['customRepeatPeriod', 'number']}
                          rules={[{ required: true, message: 'Please enter!' }]}
                        >
                          <Input type='number' />
                        </Form.Item>
                      </Col>
                      <Col lg={2} md={2} sm={2} />
                      <Col lg={11} md={11} sm={11}>
                        <Form.Item
                          name={['customRepeatPeriod', 'unit']}
                          rules={[{ required: true, message: 'Please select!' }]}
                        >
                          <Select style={{ width: '100%' }}>
                            {
                              EventRepeatPeriodCustomUnit.map((item) =>
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                              )
                            }
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <p className='mb-2 mt-4 fw-6'>Repeat On</p>
                    <Form.Item
                      name={['customRepeatPeriod', 'weekDays']}
                      rules={[{ required: true, message: 'Please select!' }]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select"
                        style={{ width: '100%' }}
                      >
                        {
                          WeekDays.map((item) =>
                            <Option key={item.shortName} value={item.shortName}>{item.name}</Option>
                          )
                        }
                      </Select>
                    </Form.Item>
                    <p className='mb-2 mt-4 fw-6'>Repeat Ends</p>
                    <Form.Item
                      name={['customRepeatPeriod', 'repeatEndType']}
                      rules={[{ required: true, message: 'Please select!' }]}
                    >
                      <Radio.Group onChange={(e) => setEndType(e.target.value)}>
                        <Radio value='date'>On Date</Radio>
                        <Radio value='after'>After</Radio>
                        <Radio value='never'>Never</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <div className='mt-2'>
                      {
                        endType === 'date' &&
                        <Form.Item
                          name={['customRepeatPeriod', 'date']}
                          rules={[{ required: true, message: 'Please enter the date!' }]}
                        >
                          <DatePicker onChange={(date, ds) => setDateTime({ ...dateTime, customRepeatPeriod: { date: ds } })} />
                        </Form.Item>
                      }
                      {
                        endType === 'after' &&
                        <Space align='center'>
                          <Form.Item
                            name={['customRepeatPeriod', 'occurences']}
                            label={<b>Occurrences</b>}
                            colon={false}
                            rules={[{ required: true, message: 'Please enter the number of the occurences!' }]}
                          >
                            <Input type='number' />
                          </Form.Item>
                        </Space>
                      }
                      {
                        endType === 'never' &&
                        <p>
                          All instances of the event will be visible in the calendar view, but a maximum of 32 at a time will display on the Events list.
                        </p>
                      }
                    </div>
                  </React.Fragment>
                }
              </div>
              : ''
          }
          <Row>
            <Col lg={12} md={12} sm={12}>
              <p className='mb-2 mt-4 fw-6'>Event type</p>
            </Col>
            <Col className='text-right' lg={12} md={12} sm={12}>
              <Space>
                <Form.Item
                  name='eventType'
                  className='mt-4 mb-2'
                  rules={[{ required: true, message: 'Please select!' }]}
                >
                  <Radio.Group onChange={(e) => setEventType(e.target.value)}>
                    <Radio value='online'>Online</Radio>
                    <Radio value='local'>Local</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <div>
            {
              eventType === 'online' &&
              <React.Fragment>
                <Form.Item
                  name='onlineType'
                  rules={[{ required: true, message: 'Please select!' }]}
                >
                  <Select
                    placeholder="Please select"
                    onChange={(e) => setEventOnlineType(e)}
                    style={{ width: '100%' }}
                  >
                    {
                      EventOnlineType.map((item) => {
                        if (item.value === 'zoom') {
                          return <Option disabled key={item.value} value={item.value}>{item.label}</Option>;
                        }
                        return <Option key={item.value} value={item.value}>{item.label}</Option>;
                      }
                      )
                    }
                  </Select>
                </Form.Item>
                <div className='bg-hbx-sixth p-3 mt-4 br-1'>
                  {
                    eventOnlineType === 'zoom' &&
                    <React.Fragment>
                      <p className='mb-2 text-center fs-4 fw-6'>Zoom</p>
                      <p className='fw-5 fs-2 text-center'>
                        Sign into your Zoom account to start creating Zoom meetings and webinars right here in Topper.
                      </p>
                      <div className='w-100 text-center'>
                        <Button type='hbs-primary' shape='round'>Sign in</Button>
                        <span> - or - </span>
                        <Button type='hbs-outline-primary' shape='round'>Create an account</Button>
                      </div>
                    </React.Fragment>
                  }
                  {
                    eventOnlineType === 'meeting' &&
                    <React.Fragment>
                      <p className='mb-2 fw-6'>Link to your Meeting</p>
                      <Form.Item
                        name='onlineUrl'
                        rules={[{ required: true, message: 'Please enter the link for the meeting!' }]}
                      >
                        <Input type='text' placeholder='e.g. https://gotomeeting.com/join/yourmeeting' />
                      </Form.Item>
                      <p className='mt-2'>
                        Host an Online Meeting by directing members to a link of your choice. Simply copy the meeting URL and add it here. Some of our favorite services are GoToMeeting, Join.me, or Google Meet. If you prefer <b>Zoom</b>, we recommend using the Zoom Event Type.
                      </p>
                    </React.Fragment>
                  }
                  {
                    eventOnlineType === 'webinar' &&
                    <React.Fragment>
                      <p className='mb-2 fw-6'>Link to your Webinar</p>
                      <Form.Item
                        name='onlineUrl'
                        rules={[{ required: true, message: 'Please enter the link for the webinar!' }]}
                      >
                        <Input type='text' placeholder='e.g. https://www.crowdcast.io/yourwebinar' />
                      </Form.Item>
                      <p className='mt-2'>
                        Host a Webinar by directing members to a link of your choice. Simply copy the webinar URL and add it here. Some of our favorite services are Crowdcast, WebinarNinja, GoToWebinar, or Zoho Meeting. If you prefer <b>Zoom</b>, we recommend using the Zoom Event Type.
                      </p>
                    </React.Fragment>
                  }
                  {
                    eventOnlineType === 'live_video' &&
                    <React.Fragment>
                      <p className='mb-2 fw-6'>Link to your Live Video</p>
                      <Form.Item
                        name='onlineUrl'
                        rules={[{ required: true, message: 'Please enter the link for video!' }]}
                      >
                        <Input type='text' placeholder='e.g. https://www.youtube.com/watchyourvideo' />
                      </Form.Item>
                      <p className='mt-2'>
                        Host a Live Video Event by directing members to an external streaming service of your choice. Simply copy the video URL and add it here. Some of our favorites are Crowdcast, Vimeo Livestream, or YouTube Live. If you prefer <b>Zoom</b>, we recommend using the Zoom Event Type.
                      </p>
                    </React.Fragment>
                  }
                  {
                    eventOnlineType === 'text_chat' &&
                    <React.Fragment>
                      <p className='mt-2'>
                        Host a Text Chat Event for all members of Topper. When it???s time for the event to start, members can click on a link that will open up All Member Chat. Note that if you have All Member Chat turned off by default in Topper, you???ll need to enable this feature before the event begins.
                      </p>
                    </React.Fragment>
                  }
                </div>
              </React.Fragment>
            }
            {
              eventType === 'local' &&
              <div className='bg-hbx-sixth p-3 mt-4 br-1'>
                <p className='mb-2 fw-6'>Location</p>
                <Form.Item
                  name={['localContent', 'location', 'name']}
                  fieldKey={['name']}
                  rules={[{ required: true, message: 'Please enter the location name!' }]}
                >
                  <Input type='text' className='mb-2' placeholder='Venue Name' />
                </Form.Item>
                <Form.Item
                  name={['localContent', 'location', 'streetAddress']}
                  fieldKey={['streetAddress']}
                  rules={[{ required: true, message: 'Please enter the street address!' }]}
                >
                  <Input type='text' className='mb-2' placeholder='Street Address' />
                </Form.Item>
                <Form.Item
                  name={['localContent', 'location', 'city']}
                  fieldKey={['city']}
                  rules={[{ required: true, message: 'Please enter the city name!' }]}
                >
                  <Input type='text' className='mb-2' placeholder='City, State, Zip Code' />
                </Form.Item>
                <p className='mb-2 fw-6 mt-2'>Add an optional link</p>
                <Form.Item
                  name={['localContent', 'url']}
                  fieldKey={['url']}
                >
                  <Input type='text' placeholder='e.g. https://www.eventbrite.com/events/163537' />
                </Form.Item>
              </div>
            }
          </div>
          <div className="mt-4">
            <Form.Item
              name='rsvp'
              valuePropName='checked'
              rules={[{ required: true, message: 'Please select!' }]}
              label={<b>RSVPs</b>}
              colon={false}
            >
              <Switch onChange={(v) => setRsvp(v)} />
            </Form.Item>
          </div>
          {
            rsvp &&
            <div className='bg-hbx-sixth p-3 mt-4 br-1'>
              <div className="mt-4">
                <Form.Item
                  name='restrictEventLink'
                  valuePropName='checked'
                  rules={[{ required: true, message: 'Please select!' }]}
                  label={<b>Restrict Event Link</b>}
                  colon={false}
                >
                  <Switch />
                </Form.Item>
              </div>
              <div className="mt-4">
                <Form.Item
                  name='closeRsvps'
                  valuePropName='checked'
                  rules={[{ required: true, message: 'Please select!' }]}
                  label={<b>Close RSVPs</b>}
                  colon={false}
                >
                  <Switch />
                </Form.Item>
              </div>
            </div>
          }
          <Divider />
          <p className='fw-6 fc-3 fs-2'>About Event</p>
          <p className='mb-2 mt-4 fw-6'>Header Image or Video</p>
          <Form.Item
            name='headerImageUrl'
          >
            <UploadImage />
          </Form.Item>
          <p className='mb-2 mt-4 fw-6'>Description</p>
          <Form.Item
            name='description'
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea type='text' placeholder='decribe your new event' />
          </Form.Item>
        </React.Fragment>
      </Form>
    </Container>
  </Drawer>;
};