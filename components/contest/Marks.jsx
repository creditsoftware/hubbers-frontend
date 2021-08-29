import React from 'react';
import { Button, Slider, Form, Menu, Input } from 'antd';
import { API, primaryColor } from '../../constants';
import { fetchJson } from '../../utils';

export const Marks = (props) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState('comment');
  const [entryMarkId, setEntryMarkId] = React.useState();
  const saveMarks = (values) => {
    let averageMark = (values.designMark + values.functionalityMark + values.manuFacturabilityMark + values.marketPotentialMark) / 4;
    fetchJson(`${API.CONTEST_ENTRY_MARK_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, entryId: props.entryList.id, userId: props.userId, contestId: props.entryList.contest.id, averageMark })
    }).then(res => {
      if (res.success) {
        setEntryMarkId(res.data.id);
        form.resetFields();
        setCurrent('feedback');
      }
    });
  };
  const saveFeedback = (values) => {
    fetchJson(`${API.CONTEST_ENTRY_MARK_API}/${entryMarkId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }).then(res => {
      if (res.success) {
        form.resetFields();
        setCurrent('comment');
        props.toggoleShow();
      }
    });
  };
  return (
    <div>
      <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={current} mode="horizontal">
        <Menu.Item key="comment" style={{ width: '46%', textAlign: 'center' }}>
          <span>COMMENT</span>
        </Menu.Item>
        <Menu.Item key="feedback" style={{ width: '47%', textAlign: 'center' }}>
          <span>FEEDBACK</span>
        </Menu.Item>
      </Menu>
      <div className="px-3" style={{ height: '500px', overflow: 'auto' }}>
        {
          current === 'comment' ?
            <Form
              form={form}
              layout="vertical"
              onFinish={saveMarks}
            >
              <Form.Item
                name="designMark"
                label={
                  <span>
                    <p className="mb-1"><b>DESIGN</b></p>
                    <p className="mb-1">Is it innovative? Is it beautiful and interesting?</p>
                  </span>
                }
              >
                <Slider
                  defaultValue={0}
                  min={0}
                  max={10}
                  trackStyle={{ backgroundColor: primaryColor }}
                  handleStyle={{ borderColor: primaryColor }}
                />
              </Form.Item>
              <Form.Item
                name="functionalityMark"
                label={
                  <span>
                    <p className="mb-1"><b>FUNCTIONALITY</b></p>
                    <p className="mb-1">Is it functional? Are all critical components in place?</p>
                  </span>
                }
              >
                <Slider
                  defaultValue={0}
                  min={0}
                  max={10}
                  trackStyle={{ backgroundColor: primaryColor }}
                  handleStyle={{ borderColor: primaryColor }}
                />
              </Form.Item>
              <Form.Item
                name="manuFacturabilityMark"
                label={
                  <span>
                    <p className="mb-1"><b>MANUFACTURABILITY</b></p>
                    <p className="mb-1">Is this product easy and feasible to manufacture?</p>
                  </span>
                }
              >
                <Slider
                  defaultValue={0}
                  min={0}
                  max={10}
                  trackStyle={{ backgroundColor: primaryColor }}
                  handleStyle={{ borderColor: primaryColor }}
                />
              </Form.Item>
              <Form.Item
                name="marketPotentialMark"
                label={
                  <span>
                    <p className="mb-1"><b>MARKET POTENTIAL</b></p>
                    <p className="mb-1">Do you see a potential for selling it on a specific market?</p>
                  </span>
                }
              >
                <Slider
                  defaultValue={0}
                  min={0}
                  max={10}
                  trackStyle={{ backgroundColor: primaryColor }}
                  handleStyle={{ borderColor: primaryColor }}
                />
              </Form.Item>
            </Form> :
            <Form
              form={form}
              layout="vertical"
              onFinish={saveFeedback}
            >
              <Form.Item
                name="designFeedback"
                label={<b>DESIGN</b>}
              >
                <Input.TextArea rows={3} placeholder="Is it innovative? Is it beautiful and interesting?" />
              </Form.Item>
              <Form.Item
                name="functionalityFeedback"
                label={<b>FUNCTIONALITY</b>}
              >
                <Input.TextArea rows={3} placeholder="Is it functional? Are all critical components in place?" />
              </Form.Item>
              <Form.Item
                name="manufacturabilityFeedback"
                label={<b>MANUFACTURABILITY</b>}
              >
                <Input.TextArea rows={3} placeholder="Is this product easy and feasible to manufacture?" />
              </Form.Item>
              <Form.Item
                name="marketPotentialFeedback"
                label={<b>MARKET POTENTIAL</b>}
              >
                <Input.TextArea rows={3} placeholder="Do you see a potential for selling it on a specific market?" />
              </Form.Item>
            </Form>
        }
      </div>
      {
        current === 'comment' ? <div>
          <Button type="hbs-primary" shape="round" block onClick={() => form.submit()}>Save Mark</Button>
        </div> :
          <div>
            <Button type="hbs-primary" shape="round" block onClick={() => form.submit()}>Save Feedback</Button>
          </div>
      }
    </div>
  );
};