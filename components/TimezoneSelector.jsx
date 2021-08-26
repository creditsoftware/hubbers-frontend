import React from 'react';
import { Select } from 'antd';
import { fetchJson } from '../utils';
import { API } from '../constants';

const { Option } = Select;

export const TimezoneSelector = ({ ...props }) => {
  const [list, setList] = React.useState([]);
  const [timezoneList, setTimezoneList] = React.useState([]);

  React.useEffect(() => {
    fetchJson(`${API.GET_TIMEZONE_LIST_API}`).then((response) => {
      setTimezoneList(response.data);
      setList(response.data);
    });
  }, []);

  const onSearchTimezone = (v) => {
    const u = [...timezoneList];
    if (v) {
      setList([
        ...u.filter(
          (c) => (c?.abbr?.toLowerCase().indexOf(v.toLowerCase()) > -1) || (c?.utc?.toLowerCase().indexOf(v.toLowerCase()) > -1)
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
      onSearch={onSearchTimezone}
      placeholder="Please choose the timezone"
      {...props}
    >
      {list &&
        list.map((item) => {
          return (
            <Option value={item.id} key={item.id}>
              {item.abbr} ( {item.utc} )
            </Option>
          );
        })}
    </Select>
  );
};
