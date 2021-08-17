import React from 'react';
import { Button, Form, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Container } from '../Container';
import { SettingDrawer } from '../community/global/SettingDrawer';
import { ContestConfirm } from './step/ContestConfirm';
import { ContestIdentify } from './step/ContestIdentify';
import { ContestDescription } from './step/ContestDescription';
import { fetchJson } from '../../utils';
import { API } from '../../constants';
import { ContestCriterias } from './step/ContestCriterias';

export const ContestDrawer = ({ visible, childrenVisible, onChildrenShow, onChildrenClose, onHide, editable = true, content, contestType, ...props }) => {
  const [step, setStep] = React.useState(0);
  const [form] = Form.useForm();
  const [someDesignerDisable, setSomeDesignerDisable] = React.useState(false);
  const [contestId, setContestId] = React.useState();
  React.useEffect(() => {
    if (form && props.contestTypeId !== undefined) {
      form.setFieldsValue({
        contestTypeId: props.contestTypeId
      });
    }
  }, [props.contestTypeId, form]);
  const handleSomeDesignerChange = (e) => {
    setSomeDesignerDisable(e.target.checked);
    form.setFieldsValue({
      allnbContestant: e.target.checked,
      nbContestant: 0
    });
  };
  const handleStepNextClick = (values) => {
    if(step === 0) {
      contestId === undefined ? fetchJson(`${API.CREATE_CONTEST_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then(res => {
        setContestId(res.result.id);
      }) : fetchJson(`${API.UPDATE_CONTEST_API}/${contestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then(res => {
        setContestId(res.result.id);
      });
    }
    if(step === 1 || step === 2 || step === 3) {
      fetchJson(`${API.UPDATE_CONTEST_API}/${contestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
    }
    setStep(step + 1);
  };
  const handleStepPrevClick = () => {
    step - 1 < 0 ? setStep(0) : setStep(step - 1);
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title={
      <Space>
        {
          step ?
            <div className="d-flex">
              <Button type='link' size='small' onClick={handleStepPrevClick}>
                <ArrowLeftOutlined style={{ color: 'black' }} />
              </Button>
            </div>
            : ''
        }
        Contest
      </Space>
    }
    submitBtn={(!content && editable) || (content && editable)}
    submitBtnLabel={!content && editable ? 'Next' : content && editable ? 'Save' : 'Save'}
    form={form}
    {...props}
  >
    <Form
      name='group-edit'
      form={form}
      onFinish={handleStepNextClick}
    >
      <Container>
        <React.Fragment>
          {
            !step ? (
              <ContestConfirm handleCheck={handleSomeDesignerChange} designerDisable={someDesignerDisable} contestType={contestType} form={form} />
            ) : (
              step === 1 ? (
                <ContestIdentify />
              ) : (
                step === 2 ? (
                  <ContestDescription childrenVisible={childrenVisible} onChildrenShow={onChildrenShow} onChildrenClose={onChildrenClose} form={form} />
                ) : (
                  step === 3 ? (
                    <ContestCriterias childrenVisible={childrenVisible} onChildrenShow={onChildrenShow} onChildrenClose={onChildrenClose} form={form} />
                  ) : ''
                )
              )
            )
          }
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};