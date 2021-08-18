import React from 'react';
import { API } from '../../constants/index';
import { fetchJson } from '../../utils';
import { Select } from 'antd';

const { Option } = Select;

export const ExpertProfileSkillSelect = ({ expertiseCategoryId, isArray, ...props }) => {
  const [list, setList] = React.useState({});
  React.useEffect(() => {
    if (isArray) {
      fetchJson(`${API.GET_SKILL_BY_CATEGORIES_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expertiseCategoryId),
      }).then((response) => {
        setList(response.data); 
      });
    }
    else {
      fetchJson(`${API.GET_SKILL_BY_CATEGORY_API}/${expertiseCategoryId}`).then((response) => {
        setList(response.data);
      });
    }
  }, [expertiseCategoryId]);  

  return <Select mode="multiple" bordered={false} style={{ width: '100%', borderBottom: '1px solid black' }} {...props} >
    {
      list?.length && list.map((item) => {
        return <Option key={item.id} value={item.id}>{item.name}</Option>;
      })
    }
  </Select>;
};