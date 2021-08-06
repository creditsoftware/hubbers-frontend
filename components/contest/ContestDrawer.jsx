import React from 'react';
import { Form } from 'antd';
import { Container } from '../Container';
import { SettingDrawer } from '../community/global/SettingDrawer';
import { ContestConfirm } from './step/ContestConfirm';
import { ContestIdentify } from './step/ContestIdentify';
import { ContestCriterias } from './step/ContestCriterias';

export const ContestDrawer = ({ visible, onHide, editable = true, content, ...props }) => {
  const [step, setStep] = React.useState(0);
  const [form] = Form.useForm();
  const [someDesignerDisable, setSomeDesignerDisable] = React.useState(false);
  React.useEffect(() => {
    if (form && props.contestTypeName !== undefined) {
      form.setFieldsValue({
        contestType: props.contestTypeName
      });
    }
  }, [props.contestTypeName, form]);
  const handleSomeDesignerChange = (e) => {
    setSomeDesignerDisable(e.target.checked);
    form.setFieldsValue({ alldesigners: e.target.checked });
  };
  const handleStepClick = () => {
    setStep(step + 1);
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Contest'
    submitBtn={(!content && editable) || (content && editable)}
    // submitBtnLabel={!content && editable ? 'Next' : content && editable ? 'Save' : 'Save'}
    form={form}
    {...props}
  >
    <Form
      name='group-edit'
      form={form}
      onFinish={handleStepClick}
    >
      <Container>
        <React.Fragment>
          {
            !step ? (
              <ContestConfirm handleCheck={handleSomeDesignerChange} designerDisable={someDesignerDisable} />
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