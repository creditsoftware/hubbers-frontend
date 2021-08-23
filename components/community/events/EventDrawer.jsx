import React from 'react';
import {
  Button,
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
import { Container } from '../../Container';
import {
  EventRepeatPeriod,
  timezoneList,
  EventOnlineType,
  EventRepeatPeriodCustomUnit,
  WeekDays,
  API
} from '../../../constants';
import {
  PlusOutlined
} from '@ant-design/icons';
import { UploadImage } from '../../UploadImage';
import { fetchJson, getRandomInt, openNotificationWithIcon, slugify, socket } from '../../../utils';
import { useRouter } from 'next/router';
import { SettingDrawer } from '../global';
import { useEventList } from '../../../hooks';
import moment from 'moment';
import { useTopicDetail } from '../../../hooks/useSWR/community/useTopicDetail';
import { useGroupDetail } from '../../../hooks/useSWR/community/useGroupDetail';
const { Option } = Select;
const { TextArea } = Input;

export const EventDrawer = ({ visible, onHide, editable = true, content, ...props }) => {
  const router = useRouter();
  const [form] = Form.useForm();
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
  const { mutate } = useEventList(props.query.community);
  const { mutate: mutateTDetail } = useTopicDetail(props.query.topic);
  const { mutate: mutateGDetail } = useGroupDetail(props.query.group);

  React.useEffect(() => {
    if (selectedCommunity && allTopicList) {
      let t = allTopicList.filter((topic) => topic.communityId === selectedCommunity);
      setTopicList(t);
    } else {
      setTopicList(allTopicList);
      if (props.query?.community) {
        setSelectedCommunity(Number(props.query.community));
        form.setFieldsValue({ communityId: Number(props.query.community) });
      }
      if (props.query?.group) {
        setSelectedCommunity(Number(props.query.group));
        form.setFieldsValue({ communityId: Number(props.query.group) });
      }
      if (props.query?.topic) {
        form.setFieldsValue({ topicId: Number(props.query.topic) });
      }
      if (content) {
        if (content?.communityId) {
          setSelectedCommunity(content.communityId);
          form.setFieldsValue({ communityId: Number(content.communityId) });
        }
        if (content?.topicId) {
          form.setFieldsValue({ topicId: Number(content.topicId) });
        }
      }
    }
  }, [selectedCommunity, allTopicList, props.query, content, form]);

  React.useEffect(() => {
    if (content) {
      let schedules = [];
      if (content.schedules) {
        schedules = [...content.schedules];
        schedules = schedules.map((s) => {
          return { ...s, time: s.time ? moment(s.time, 'HH:mm:ss') : '' };
        });
        delete content.schedules;
      }
      form.setFieldsValue({
        ...content,
        schedules: [...schedules],
        startDate: moment(content.startDate),
        endDate: moment(content.endDate),
        startTime: moment(content.startTime),
        endTime: moment(content.endTime),
        customRepeatPeriod: {
          ...content.customRepeatPeriod,
          date: content.customRepeatPeriod?.date ? moment(content.customRepeatPeriod?.date) : ''
        }
      });
      if (content.onlineType) {
        setEventOnlineType(content.onlineType);
      }
      if (content.eventType) {
        setEventType(content.eventType);
      }
      if (content.endType) {
        setEventType(content.endType);
      }
      if (content.repeatPeriod) {
        setRepeatPeriod(content.repeatPeriod);
      }
      if (content.rsvp) {
        setRsvp(content.rsvp);
      }
      if (content.isGlobal) {
        setIsGlobal(content.isGlobal);
      }
      if (content.isRepeat) {
        setIsRepeat(content.isRepeat);
      }
    }
    //get community list
    fetchJson(`${API.GET_MY_COMMUNITY_AND_GROUP_LIST_API}/${props.auth?.id}`)
      .then((response) => {
        setCommunityList(response.data);
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
    let data = {
      ...values,
      ...dateTime,
      customRepeatPeriod:
      {
        ...values.customRepeatPeriod,
        ...dateTime.customRepeatPeriod
      },
      createdBy: props.auth?.communityMember?.filter((c) => c.communityId === parseInt(router.query.community, 10))[0].id
    };
    if (props.query?.group) {
      data = { ...data, communityId: props.query?.group };
    }
    if (data.schedules) {
      let schedules = [...data.schedules];
      schedules = schedules.map((s) => {
        return { ...s, time: s.time.format('HH:mm:ss') };
      });
      delete data.schedules;
      data = { ...data, schedules: [...schedules] };
    }
    fetchJson(`${API.CREATE_EVENT_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.success) {
          openNotificationWithIcon('success', 'Success!', response.message);
          socket.emit('create-community-event', {
            category: props.query.group ? 'group' : 'community',
            categoryId: !data.isGlobal ? props.query.group ? props.query.group : props.query.community : 0,
            userId: props.auth.id,
            content: 'created new event!'
          });
          onHide();
          if (props.query.topic) {
            mutateTDetail();
            return;
          }
          if (props.query.group) {
            mutateGDetail();
            return;
          }
          mutate();
        } else {
          openNotificationWithIcon('error', 'Something went wrong!', response.message ? response.message : response.errors[0]?.message);
        }
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Something went wrong!', 'Faild to create event');
      });
  };
  return <SettingDrawer
    {...props}
    visible={visible}
    onHide={onHide}
    title='Event'
    submitBtn={(!content && editable) || (content && editable)}
    submitBtnLabel={!content && editable ? 'Create' : content && editable ? 'Save' : 'Save'}
    form={form}
  >
    <Container>
      <Form
        name='eventForm'
        onFinish={createEvent}
        form={form}
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
            name='isGlobal'
            label={<b>Global</b>}
            colon={false}
            style={{ float: 'right' }}
            valuePropName='checked'
          >
            <Switch disabled={!editable} onChange={(v) => { setIsGlobal(v); form.setFieldsValue({ communityId: null }); }} />
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
                  disabled={isGlobal || !editable}
                  style={{ width: '100%' }}
                  placeholder='Community'
                  onChange={(v) => { setSelectedCommunity(v); form.setFieldsValue({ topicId: null }); }}
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
                  disabled={!editable}
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
                <Input type='text' disabled={!editable} placeholder='Add a title' onChange={(v) => form.setFieldsValue({ slug: `${slugify(v.target.value)}-${getRandomInt(100000, 999999)}` })} />
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
            <Select disabled={!editable} placeholder='Timezone' allowClear>
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
                    <DatePicker disabled={!editable} style={{ width: '100%' }} onChange={(date, ds) => setDateTime({ ...dateTime, startDate: ds })} />
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
                    <TimePicker disabled={!editable} style={{ width: '100%' }} onChange={(time, ts) => setDateTime({ ...dateTime, startTime: ts })} />
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
                    <DatePicker disabled={!editable} style={{ width: '100%' }} onChange={(date, ds) => setDateTime({ ...dateTime, endDate: ds })} />
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
                    <TimePicker disabled={!editable} style={{ width: '100%' }} onChange={(time, ts) => setDateTime({ ...dateTime, endTime: ts })} />
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
              <Switch disabled={!editable} onChange={(v) => setIsRepeat(v)} />
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
                  <Select disabled={!editable} onChange={(v) => setRepeatPeriod(v)} style={{ width: '100%' }}>
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
                          <Input disabled={!editable} type='number' />
                        </Form.Item>
                      </Col>
                      <Col lg={2} md={2} sm={2} />
                      <Col lg={11} md={11} sm={11}>
                        <Form.Item
                          name={['customRepeatPeriod', 'unit']}
                          rules={[{ required: true, message: 'Please select!' }]}
                        >
                          <Select disabled={!editable} style={{ width: '100%' }}>
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
                        disabled={!editable}
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
                      <Radio.Group disabled={!editable} onChange={(e) => setEndType(e.target.value)}>
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
                          <DatePicker disabled={!editable} onChange={(date, ds) => setDateTime({ ...dateTime, customRepeatPeriod: { date: ds } })} />
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
                            <Input disabled={!editable} type='number' />
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
                  <Radio.Group disabled={!editable} onChange={(e) => setEventType(e.target.value)}>
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
                    disabled={!editable}
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
                        <Input disabled={!editable} type='text' placeholder='e.g. https://gotomeeting.com/join/yourmeeting' />
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
                        <Input disabled={!editable} type='text' placeholder='e.g. https://www.crowdcast.io/yourwebinar' />
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
                        <Input disabled={!editable} type='text' placeholder='e.g. https://www.youtube.com/watchyourvideo' />
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
                        Host a Text Chat Event for all members of Topper. When it’s time for the event to start, members can click on a link that will open up All Member Chat. Note that if you have All Member Chat turned off by default in Topper, you’ll need to enable this feature before the event begins.
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
                  <Input disabled={!editable} type='text' className='mb-2' placeholder='Venue Name' />
                </Form.Item>
                <Form.Item
                  name={['localContent', 'location', 'streetAddress']}
                  fieldKey={['streetAddress']}
                  rules={[{ required: true, message: 'Please enter the street address!' }]}
                >
                  <Input disabled={!editable} type='text' className='mb-2' placeholder='Street Address' />
                </Form.Item>
                <Form.Item
                  name={['localContent', 'location', 'city']}
                  fieldKey={['city']}
                  rules={[{ required: true, message: 'Please enter the city name!' }]}
                >
                  <Input disabled={!editable} type='text' className='mb-2' placeholder='City, State, Zip Code' />
                </Form.Item>
                <p className='mb-2 fw-6 mt-2'>Add an optional link</p>
                <Form.Item
                  name={['localContent', 'url']}
                  fieldKey={['url']}
                >
                  <Input disabled={!editable} type='text' placeholder='e.g. https://www.eventbrite.com/events/163537' />
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
              <Switch disabled={!editable} onChange={(v) => setRsvp(v)} />
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
                  <Switch disabled={!editable} />
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
                  <Switch disabled={!editable} />
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
            <UploadImage disabled={!editable} />
          </Form.Item>
          <p className='mb-2 mt-4 fw-6'>Description</p>
          <Form.Item
            name='description'
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea disabled={!editable} type='text' placeholder='decribe your new event' />
          </Form.Item>
          <Form.List name="speakers">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <React.Fragment key={field.key}>
                    <Row>
                      <Col md={11}>
                        <p className='mb-2 mt-4 fw-6'>Name</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          rules={[{ required: true, message: 'Name is required' }]}
                        >
                          <Input disabled={!editable} type='text' placeholder='Name' />
                        </Form.Item>
                      </Col>
                      <Col lg={2} md={2} sm={2} />
                      <Col md={11}>
                        <p className='mb-2 mt-4 fw-6'>Position</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'position']}
                          fieldKey={[field.fieldKey, 'position']}
                          rules={[{ required: true, message: 'Position is required' }]}
                        >
                          <Input disabled={!editable} type='text' placeholder='position' />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={11}>
                        <p className='mb-2 mt-4 fw-6'>Bio</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'bio']}
                          fieldKey={[field.fieldKey, 'bio']}
                        >
                          <TextArea disabled={!editable} placeholder='bio' />
                        </Form.Item>
                      </Col>
                      <Col lg={2} md={2} sm={2} />
                      <Col md={11}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'imageUrl']}
                          fieldKey={[field.fieldKey, 'imageUrl']}
                        >
                          <UploadImage disabled={!editable} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="text-right mb-3">
                      <Button danger disabled={!editable} onClick={() => remove(field.name)}>Remove</Button>
                    </div>
                  </React.Fragment>
                ))}

                <Form.Item>
                  <Button disabled={!editable} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Speaker
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="schedules">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <React.Fragment key={field.key}>
                    <Row>
                      <Col md={11}>
                        <p className='mb-2 mt-4 fw-6'>Time</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'time']}
                          fieldKey={[field.fieldKey, 'time']}
                          rules={[{ required: true, message: 'Name is required' }]}
                        >
                          <TimePicker disabled={!editable} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col lg={2} md={2} sm={2} />
                      <Col md={11}>
                        <p className='mb-2 mt-4 fw-6'>Description</p>
                        <Form.Item
                          {...field}
                          name={[field.name, 'description']}
                          fieldKey={[field.fieldKey, 'description']}
                        >
                          <TextArea disabled={!editable} placeholder='description' />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="text-right mb-3">
                      <Button danger disabled={!editable} onClick={() => remove(field.name)}>Remove</Button>
                    </div>
                  </React.Fragment>
                ))}

                <Form.Item>
                  <Button disabled={!editable} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Schedule
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </React.Fragment>
      </Form>
    </Container>
  </SettingDrawer>;
};