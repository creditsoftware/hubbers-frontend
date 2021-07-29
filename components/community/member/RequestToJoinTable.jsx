import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { fetchJson } from '../../../utils/fetchJson';
import { API, REQUEST_TYPE } from '../../../constants';
import { useRouter } from 'next/router';
import { ApproveStatus } from '../../../constants/status';

export const RequestToJoinTable = () => {
  const [searchText, setSearchText] = React.useState('');
  const [approveLoadingId, setApproveLoadingId] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const router = useRouter();
  const [invitationData, setInvitationData] = React.useState(null);
  const onApprove = (id) => {
    setApproveLoadingId(id);
    fetchJson(`${API.GET_REQUEST_TO_JOIN_LIST_API}/${id}/${ApproveStatus.APPROVE}`, {
      method:REQUEST_TYPE.PUT
    }).then(() => {
      setApproveLoadingId(null);
      getData();
    }).catch(() => {
      setApproveLoadingId(null);
    });
  };
  const getData = React.useCallback(async () => {
    let result = await fetchJson(`${API.GET_REQUEST_TO_JOIN_LIST_API}/${router.query.community}`);
    if (result && result.success) {
      let d = [];
      if (result.data) {
        await result.data.map((item, index) => {
          console.log(item);
          d.push({
            key: index,
            firstName: item?.user?.firstname,
            lastName: item?.user?.lastname,
            email: item?.user?.email,
            lastUpdated: item?.updatedAt,
            status: item?.status === 'PENDING' ? <Button loading={approveLoadingId === item.id} onClick={()=>onApprove(item.id)} type='hbs-outline-primary' shape='round' size='small'>Approve</Button> : <span className={`fw-6 fc-${item?.status.toLowerCase()}`}>{item?.status}</span>
          });
        });
      }
      setInvitationData(d);
    }
  }, []);
  React.useEffect(() => {
    getData();
  }, [getData]);
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