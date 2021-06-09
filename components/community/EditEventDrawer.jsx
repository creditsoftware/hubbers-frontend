import React from 'react';
import { Button, Drawer, Row, Col, Input, Select, Space, DatePicker, TimePicker, Switch, Radio, Divider } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { Container } from '../Container';
import useWindowSize from '../../hooks/useWindowSize';
import { EventRepeatPeriod } from '../../constants/eventRepeatPeriod';
import { EventRepeatPeriodCustomUnit } from '../../constants/eventRepeatPeriodCustomUnit';
import { WeekDays } from '../../constants/weekDays';
import { EventOnlineType } from '../../constants/eventOnlineType';
import { UploadImage } from '../UploadImage';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

export const EditEventDrawer = ({ visible, onHide }) => {
  const [fullWidth, setFullWidth] = React.useState(false);
  const size = useWindowSize();
  const [isRepeat, setIsRepeat] = React.useState(false);
  const [rsvp, setRsvp] = React.useState(false);
  const [repeatPeriod, setRepeatPeriod] = React.useState();
  const [endType, setEndType] = React.useState('date');
  const [eventType, setEventType] = React.useState('online');
  const [eventOnlineType, setEventOnlineType] = React.useState('zoom');
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
            <Button type='hbs-primary' shape='round'>Post</Button>
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
      <React.Fragment>
        <p className='fw-6 fc-3 fs-2'>Event Setting</p>
        <p className='mb-2 mt-4 fw-6'>Post to event in</p>
        <Row>
          <Col lg={11} md={11} sm={11}>
            <Select style={{ width: '100%' }} placeholder='Hubbers'>
              <Option value='hubbers'>Hubbers</Option>
            </Select>
          </Col>
          <Col lg={2} md={2} sm={2} />
          <Col lg={11} md={11} sm={11}>
            <Input type='text' placeholder='Topic tag' />
          </Col>
        </Row>
        <p className='mb-2 mt-4 fw-6'>Event title</p>
        <Input type='text' placeholder='Add a title' />
        <div className="text-right mt-4 fw-6 text-uppper">
          <Select placeholder='Timezone'>
            <Option value='eet'>EET</Option>
          </Select>
        </div>
        <Row>
          <Col lg={11} md={11} sm={11}>
            <p className='mb-2 fw-6'>Start</p>
            <Space>
              <DatePicker />
              <TimePicker />
            </Space>
          </Col>
          <Col lg={2} md={2} sm={2} />
          <Col lg={11} md={11} sm={11}>
            <p className='mb-2 fw-6'>End</p>
            <Space>
              <DatePicker />
              <TimePicker />
            </Space>
          </Col>
        </Row>
        <div className="mt-4">
          <Switch defaultChecked={isRepeat} onChange={(v) => setIsRepeat(v)} />
          <b className='ml-2'>
            Repeat Event
          </b>
        </div>
        {
          isRepeat
            ? <div className='bg-hbx-sixth p-3 mt-4 br-1'>
              <Select onChange={(v) => setRepeatPeriod(v)} style={{ width: '100%' }}>
                {
                  EventRepeatPeriod.map((item) =>
                    <Option key={item} value={item}>{item}</Option>
                  )
                }
              </Select>
              {
                repeatPeriod === 'custom' &&
                <React.Fragment>
                  <p className='mb-2 mt-4 fw-6'>Occurs Every</p>
                  <Row>
                    <Col lg={11} md={11} sm={11}>
                      <Input type='number' />
                    </Col>
                    <Col lg={2} md={2} sm={2} />
                    <Col lg={11} md={11} sm={11}>
                      <Select style={{ width: '100%' }}>
                        {
                          EventRepeatPeriodCustomUnit.map((item) =>
                            <Option key={item} value={item}>{item}</Option>
                          )
                        }
                      </Select>
                    </Col>
                  </Row>
                  <p className='mb-2 mt-4 fw-6'>Repeat On</p>
                  <Select
                    mode="multiple"
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    // onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    {
                      WeekDays.map((item) =>
                        <Option key={item.shortName} value={item.shortName}>{item.name}</Option>
                      )
                    }
                  </Select>
                  <p className='mb-2 mt-4 fw-6'>Repeat Ends</p>
                  <Radio.Group onChange={(e) => setEndType(e.target.value)} defaultValue={endType}>
                    <Radio value='date'>On Date</Radio>
                    <Radio value='after'>After</Radio>
                    <Radio value='never'>Never</Radio>
                  </Radio.Group>
                  <div className='mt-2'>
                    {
                      endType === 'date' &&
                      <DatePicker />
                    }
                    {
                      endType === 'after' &&
                      <Space align='center'>
                        <Input type='number' />
                        <p className='m-0'>
                          Occurrences
                        </p>
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
              <Radio.Group onChange={(e) => setEventType(e.target.value)} defaultValue={eventType}>
                <Radio value='online'>Online</Radio>
                <Radio value='local'>Local</Radio>
              </Radio.Group>
            </Space>
          </Col>
        </Row>
        <div>
          {
            eventType === 'online' &&
            <React.Fragment>
              <Select
                placeholder="Please select"
                onChange={(e) => setEventOnlineType(e)}
                style={{ width: '100%' }}
                defaultValue={eventOnlineType}
              >
                {
                  EventOnlineType.map((item) =>
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  )
                }
              </Select>
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
                    <Input type='text' placeholder='e.g. https://gotomeeting.com/join/yourmeeting' />
                    <p className='mt-2'>
                      Host an Online Meeting by directing members to a link of your choice. Simply copy the meeting URL and add it here. Some of our favorite services are GoToMeeting, Join.me, or Google Meet. If you prefer <b>Zoom</b>, we recommend using the Zoom Event Type.
                    </p>
                  </React.Fragment>
                }
                {
                  eventOnlineType === 'webinar' &&
                  <React.Fragment>
                    <p className='mb-2 fw-6'>Link to your Webinar</p>
                    <Input type='text' placeholder='e.g. https://www.crowdcast.io/yourwebinar' />
                    <p className='mt-2'>
                      Host a Webinar by directing members to a link of your choice. Simply copy the webinar URL and add it here. Some of our favorite services are Crowdcast, WebinarNinja, GoToWebinar, or Zoho Meeting. If you prefer <b>Zoom</b>, we recommend using the Zoom Event Type.
                    </p>
                  </React.Fragment>
                }
                {
                  eventOnlineType === 'live_video' &&
                  <React.Fragment>
                    <p className='mb-2 fw-6'>Link to your Live Video</p>
                    <Input type='text' placeholder='e.g. https://www.youtube.com/watchyourvideo' />
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
              <Input type='text' className='mb-2' placeholder='Venue Name' />
              <Input type='text' className='mb-2' placeholder='Street Address' />
              <Input type='text' className='mb-2' placeholder='City, State, Zip Code' />
              <p className='mb-2 fw-6 mt-2'>Add an optional link</p>
              <Input type='text' placeholder='e.g. https://www.eventbrite.com/events/163537' />
            </div>
          }
        </div>
        <div className="mt-4">
          <Switch defaultChecked={rsvp} onChange={(v) => setRsvp(v)} />
          <b className='ml-2'>
            RSVPs
          </b>
        </div>
        {
          rsvp &&
          <div className='bg-hbx-sixth p-3 mt-4 br-1'>
            <div className="mt-4">
              <Switch defaultChecked={rsvp} onChange={(v) => setRsvp(v)} />
              <b className='ml-2'>
                Restrict Event Link
              </b>
            </div>
            <div className="mt-4">
              <Switch defaultChecked={rsvp} onChange={(v) => setRsvp(v)} />
              <b className='ml-2'>
                Close RSVPs
              </b>
            </div>
          </div>
        }
        <Divider />
        <p className='fw-6 fc-3 fs-2'>About Event</p>
        <p className='mb-2 mt-4 fw-6'>Header Image or Video</p>
        <UploadImage />
        <p className='mb-2 mt-4 fw-6'>Description</p>
        <TextArea type='text' placeholder='decribe your new event' />
      </React.Fragment>
    </Container>
  </Drawer>;
};