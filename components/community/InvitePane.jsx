import React from 'react';
import ReactTagInput from 'next-js-suggest-input';
import { AvatarTextarea } from '../AvatarTextarea';
import { denisAvatar } from '../../constants/etc';
import { Button, Card, Col, Row, Select, Space } from 'antd';
import { LinkCopy } from '../LinkCopy';
const { Option } = Select;
export const InvitePane = () => {
  const [tags, setTags] = React.useState([]);
  const suggestions = [];
  const [msg, setMsg] = React.useState(`Hello!

I’d like to invite you to our community, hubby.

https://media1-production-mightynetworks.imgix.net/asset/22361108/Untitled-3.png?ixlib=rails-0.3.0&auto=format&w=42&h=42&fit=crop&crop=facesIt takes less than a minute to join and together we’re sharing our stories, experiences, and ideas.

I know you’ll love it.

See you here!
Denis Kravchenko`);
  return <React.Fragment>
    <h1 className="fw-6 fs-4 text-center">
      Let&apos;s Invite!
    </h1>
    <React.Fragment>
      <ReactTagInput
        tags={tags}
        placeholder="Enter emails"
        maxTags={100}
        editable={false}
        readOnly={false}
        removeOnBackspace={true}
        suggestions={suggestions}
        onChange={(newTags) => setTags(newTags)}
      />
      <AvatarTextarea
        avatar={denisAvatar}
        placeholder='Hello!

I’d like to invite you to our community, hubby.

https://media1-production-mightynetworks.imgix.net/asset/22361108/Untitled-3.png?ixlib=rails-0.3.0&auto=format&w=42&h=42&fit=crop&crop=facesIt takes less than a minute to join and together we’re sharing our stories, experiences, and ideas.

I know you’ll love it.

See you here!
Denis Kravchenko'
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Card
        title='More Options'
        className='mt-3'
      >
        <p className="fw-6">
          Network Permissions
        </p>
        <p>
          Choose what permissions these members will have hubby.
        </p>
        <Select defaultValue="member" size='large' style={{ width: '100%' }} allowClear>
          <Option value="host">Host</Option>
          <Option value="moderator">Morderator</Option>
          <Option value="member">Member</Option>
        </Select>
      </Card>
      <Row className='mt-4 mx-4'>
        <Col span={16}>
          <Space>
            <Button type='hbs-outline-primary' size='large'>Import Contacts</Button>
            <Button type='hbs-outline-primary' size='large'>Upload CSV</Button>
          </Space>
        </Col>
        <Col span={8} className='text-right'>
          <Button type='hbs-primary' size='large'>Send</Button>
        </Col>
      </Row>
      <Card
        className='mt-5'
        title={
          <React.Fragment>
            <p className='fw-6 m-0'>
              Send a Share link
            </p>
            <p className='mb-0'>
              Invite people to hubby as members using this share link
            </p>
          </React.Fragment>
        }
      >
        <LinkCopy value='https://hubbers.io/community/hubby/000' />
      </Card>
    </React.Fragment>
  </React.Fragment>;
};