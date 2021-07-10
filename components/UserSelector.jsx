import React from 'react';
import { Select } from 'antd';
import { fetchJson } from '../utils';
import { API } from '../constants';

const { Option } = Select;

export const UserSelector = ({ ...props }) => {
  const [list, setList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  React.useEffect(async () => {
    const data = await fetchJson(`${API.GET_USER_LIST_API}`);
    setUserList([...data]);
    setList([...data]);
  }, []);
  const onSearchUser = (v) => {
    const u = [...userList];
    if (v) {
      setList([
        ...u.filter(
          (c) => c?.email?.toLowerCase().indexOf(v.toLowerCase()) > -1
        ),
      ]);
    } else {
      setList(u);
    }
  };
  return (
    <Select
      filterOption={false}
      showSearch
      mode='multiple'
      onSearch={onSearchUser}
      placeholder="Please choose the user"
      {...props}
    >
      {list &&
        list.map((item) => {
          return (
            <Option value={item.email} key={item.id}>
              {item.email}
            </Option>
          );
        })}
    </Select>
  );
};
