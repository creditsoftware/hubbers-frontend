import React from 'react';
import { Button, Form, Space, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Container } from '../Container';
import { SettingDrawer } from '../community/global/SettingDrawer';
import { ContestConfirm } from './step/ContestConfirm';
import { ContestIdentify } from './step/ContestIdentify';
import { ContestDescription } from './step/ContestDescription';
import { fetcher, fetchJson } from '../../utils';
import { API } from '../../constants';
import { ContestCriterias } from './step/ContestCriterias';
import { ContestCheckout } from './step/ContestCheckout';
import useSWR from 'swr';

export const ContestDrawer = ({ visible, childrenVisible, onChildrenShow, onChildrenClose, onHide, editable = true, content, contestType, ...props }) => {
  const [step, setStep] = React.useState(0);
  const [form] = Form.useForm();
  const [someDesignerDisable, setSomeDesignerDisable] = React.useState(false);
  const [contestId, setContestId] = React.useState();
  const { data: contest } = useSWR(API.CONTEST_API, fetcher);
  React.useEffect(() => {
    if (form && props.contestTypeId !== undefined) {
      form.setFieldsValue({
        contestTypeId: props.contestTypeId
      });
    }
    if(contest && contest.result) {
      const v = contest.result.filter((d) => d.createdBy === props.auth.id && d.isDraft === true)[0];
      if(v){
        setContestId(v.id);
        let productId = [];
        v.products.map((val) => {
          productId = [...productId,val.id];
        });
        let innovationId = [];
        v.innovations.map((val) => {
          innovationId = [...innovationId,val.id];
        });
        let techId = [];
        v.techs.map((val) => {
          techId = [...techId,val.id];
        });
        let countryId = [];
        v.country.map((val) => {
          countryId = [...countryId,val.id];
        });
        form.setFieldsValue({
          ...v,
          productId,
          innovationId,
          techId,
          countryId
        });
      }
    }
  }, [props.contestTypeId, form, contest]);
  const handleSomeDesignerChange = (e) => {
    setSomeDesignerDisable(e.target.checked);
    form.setFieldsValue({
      allnbContestant: e.target.checked,
      nbContestant: 0
    });
  };
  const handleStepNextClick = (values) => {
    if(step === 0) {
      contestId === undefined ? fetchJson(`${API.CONTEST_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...values, createdBy: props.auth.id})
      }).then(res => {
        setContestId(res.result.id);
      }) : fetchJson(`${API.CONTEST_API}/${contestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then(res => {
        setContestId(res.result.id);
      });
      setStep(step + 1);
    } else if(step === 1 || step === 2 || step === 3) {
      fetchJson(`${API.CONTEST_API}/${contestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      setStep(step + 1);
    } else if(step === 4) {
      onHide();
      setStep(0);
    }
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
    submitBtnLabel={step !== 4 ? 'Next' : 'Save'}
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
                <ContestIdentify form={form} {...props} />
              ) : (
                step === 2 ? (
                  <ContestDescription childrenVisible={childrenVisible} onChildrenShow={onChildrenShow} onChildrenClose={onChildrenClose} form={form} />
                ) : (
                  step === 3 ? (
                    <ContestCriterias childrenVisible={childrenVisible} onChildrenShow={onChildrenShow} onChildrenClose={onChildrenClose} form={form} />
                  ) : (
                    step === 4 ? (
                      <ContestCheckout />
                    ) : ''
                  )
                )
              )
            )
          }
          <Row justify='space-between' align="middle">
            <Col lg={5}>
              {
                step ?
                  <Button type='dashed' shape='round' onClick={handleStepPrevClick}>
                    Prev
                  </Button> : ''
              }
            </Col>
            <Col lg={5} className='text-right mt-4'>
              <Button type='dashed' shape='round' onClick={()=>form.submit()}>
                {step !== 4 ? <span>Next</span> : <span>Save</span>}
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};