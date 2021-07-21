import React from 'react';
import { Select } from 'antd';
import { API } from '../constants/index';
import { fetchJson } from '../utils';

const { Option } = Select;

export const CountrySelect = ({ idValue = true, ...props }) => {
  const [countryList, setCountryList] = React.useState([]);
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetchJson(`${API.GET_COUNTRY_LIST_API}`).then((response) => {
      setCountryList(response.data);
      setList(response.data);
    });
  }, []);
  const onSearchCountry = (v) => {
    const countries = [...countryList];
    if (v) {
      setList([
        ...countries.filter(
          (c) => c?.name?.toLowerCase().indexOf(v.toLowerCase()) > -1
        ),
      ]);
    } else {
      setList(countries);
    }
  };
  return (
    <Select
      filterOption={false}
      showSearch
      onSearch={onSearchCountry}
      {...props}
    >
      {list &&
        list.map((item) => {
          return (
            <Option value={idValue ? item.id : item.name} key={item.id}>
              {item.name}
            </Option>
          );
        })}
    </Select>
  );
};
