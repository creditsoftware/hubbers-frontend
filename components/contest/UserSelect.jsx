import React from 'react';
import { Select } from 'antd';
import { API } from '../../constants';
import Avatar from 'antd/lib/avatar/avatar';
import useSWR from 'swr';
import { fetcher } from '../../utils';
const { Option } = Select;

export const UserSelect = ({...props}) => {
  const [searchValue, setSearchValue] = React.useState(null);
  const [state, setState] = React.useState([]);
  const { data: users, mutate } = useSWR(searchValue ? `${API.GET_USER_LIST_SEARCH_API}/search/${searchValue}` : null, fetcher);
  const handleChange = (value) => {
    setSearchValue(value);
  }
  React.useEffect(() => {
    if (searchValue) {
      mutate();
    }
  }, [searchValue]);
  React.useEffect(() => {
    if (users) {
      setState(users);
    }
  }, [users])
  return (
    <Select
      mode="multiple"
      showSearch
      filterOption={false}
      placeholder="Please select"
      onSearch={handleChange}
      {...props}
    >
      {
        state && state.map((user) =>
          <Option key={user.id} value={user.id}>
            <div className="demo-option-label-item">
              <Avatar size='small' src={user.avatar}></Avatar>
              <span>{' ' + user.email}</span>
            </div>
          </Option>
        )
      }
    </Select>
  );
};