import React from 'react';
import { Table, Input, Button, Space, Avatar } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { denisAvatar } from '../../constants/etc';

const data = [
  {
    key: '1',
    firstName:'Jomarie',
    lastName:'Janner',
    email:'jomariejaner258@gmail.com',
    invitedBy:<React.Fragment>
      <Space>
        <Avatar src={<Image src={denisAvatar} width={100} height={100}/>}/>
        <span className="fw-6">Denis Kravchenko</span>
      </Space>
    </React.Fragment>,
    lastUpdated:'	Fri, Apr 23, 2021, 3:17pm',
    status:<span className='fw-6 fc-primary'>Joined!</span>
  },
  {
    key: '2',
    firstName:'Jomarie',
    lastName:'Janner',
    email:'jomariejaner258@gmail.com',
    invitedBy:<React.Fragment>
      <Space>
        <Avatar src={<Image src={denisAvatar} width={100} height={100}/>}/>
        <span className="fw-6">Denis Kravchenko</span>
      </Space>
    </React.Fragment>,
    lastUpdated:'	Fri, Apr 23, 2021, 3:17pm',
    status:<span className='fw-6 fc-primary'>Joined!</span>
  },
  // {
  //   key: '3',
  //   firstName:'Jomarie',
  //   lastName:'Janner',
  //   email:'jomariejaner258@gmail.com',
  //   invitedBy:<React.Fragment>
  //     <Space>
  //       <Avatar src={<Image src={denisAvatar} width={100} height={100}/>}/>
  //       <span className="fw-6">Denis Kravchenko</span>
  //     </Space>
  //   </React.Fragment>,
  //   lastUpdated:'	Fri, Apr 23, 2021, 3:17pm',
  //   status:<span className='fw-6 fc-primary'>Joined!</span>
  // },
  // {
  //   key: '4',
  //   firstName:'Jomarie',
  //   lastName:'Janner',
  //   email:'jomariejaner258@gmail.com',
  //   invitedBy:<React.Fragment>
  //     <Space>
  //       <Avatar src={<Image src={denisAvatar} width={100} height={100}/>}/>
  //       <span className="fw-6">Denis Kravchenko</span>
  //     </Space>
  //   </React.Fragment>,
  //   lastUpdated:'	Fri, Apr 23, 2021, 3:17pm',
  //   status:<span className='fw-6 fc-primary'>Joined!</span>
  // },
  // {
  //   key: '5',
  //   firstName:'Jomarie',
  //   lastName:'Janner',
  //   email:'jomariejaner258@gmail.com',
  //   invitedBy:<React.Fragment>
  //     <Space>
  //       <Avatar src={<Image src={denisAvatar} width={100} height={100}/>}/>
  //       <span className="fw-6">Denis Kravchenko</span>
  //     </Space>
  //   </React.Fragment>,
  //   lastUpdated:'	Fri, Apr 23, 2021, 3:17pm',
  //   status:<span className='fw-6 fc-primary'>Joined!</span>
  // },
];

export const CommunityMembersTable = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const getColumnSearchProps = (dataIndex) => ({
    // eslint-disable-next-line react/display-name
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>;
    },
    // eslint-disable-next-line react/display-name
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }}/>,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    // eslint-disable-next-line react/display-name
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  }); 
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '20%',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Invited By',
      dataIndex: 'invitedBy',
      key: 'invitedBy',
      ...getColumnSearchProps('invitedBy'),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      ...getColumnSearchProps('lastUpdated'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};