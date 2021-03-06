import React from 'react';
import { Table, Input, Button, Space, Avatar, Image } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useInvitedList } from '../../../hooks/useSWR/community/useInvitedList';

export const CommunityMembersTable = ({ ...props }) => {
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const router = useRouter();
  const [invitationData, setInvitationData] = React.useState(null);
  const { data: result } = useInvitedList(props.gid ?? router.query.community);
  React.useEffect(() => {
    if (result && result.success) {
      let d = [];
      if (result.data) {
        result.data.map((item, index) => {
          d.push({
            key: index,
            firstName: item?.user?.firstname,
            lastName: item?.user?.lastname,
            email: item?.user?.email,
            invitedBy: <React.Fragment>
              <Space>
                <Avatar size={40} src={<Image src={item?.fromMember?.user?.avatar} width={40} height={40} alt='' />} />
                <span className="fw-6">{item?.fromMember?.user?.firstname + ' ' + item?.fromMember?.user?.lastname}</span>
              </Space>
            </React.Fragment>,
            lastUpdated: item?.invitedAt,
            status: <span className={`fw-6 fc-${item?.status.toLowerCase()}`}>{item?.status}</span>
          });
        });
      }
      setInvitationData(d);
    }
  }, [result]);
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
  return <Table columns={columns} dataSource={invitationData ? invitationData : []} />;
};