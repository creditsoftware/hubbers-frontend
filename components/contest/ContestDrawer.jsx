import React from 'react';
import { Button, Form, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Container } from '../Container';
import { SettingDrawer } from '../community/global/SettingDrawer';
import { ContestConfirm } from './step/ContestConfirm';
import { ContestIdentify } from './step/ContestIdentify';
import { ContestCriterias } from './step/ContestCriterias';
import { fetchJson } from '../../utils';
import { API } from '../../constants';

export const ContestDrawer = ({ visible, onHide, editable = true, content, contestType, ...props }) => {
  const [step, setStep] = React.useState(0);
  const [form] = Form.useForm();
  const [someDesignerDisable, setSomeDesignerDisable] = React.useState(false);
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
      fetchJson(`${API.CREATE_CONTEST_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          countryId: JSON.stringify(values.countryId),
          productId: JSON.stringify(values.productId),
          innovationId: JSON.stringify(values.innovationId),
          techId: JSON.stringify(values.techId),
        })
      });
    }
    setStep(step + 1);
  };
  const handleStepPrevClick = () => {
    step-1 <0 ? setStep(0) : setStep(step - 1);
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title={
      <Space>
        {
          step ? (
            <Button type='link' size='small' onClick={handleStepPrevClick}>
              <ArrowLeftOutlined style={{ color: 'black' }} />
            </Button>
          ) : ''
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
                  <ContestCriterias />
                ) : ''
              )
            )
          }
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};