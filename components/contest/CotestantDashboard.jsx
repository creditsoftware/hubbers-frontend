import React from 'react';
import { Badge, Button, Card, Col, Menu, Row, Image } from 'antd';
// import Image from 'next/image';
import { API, primaryColor, secondaryBgColor } from '../../constants';
import Modal from 'antd/lib/modal/Modal';
import EntryDetail from './contestdashboard/EntryDetail';
import EntryUpload from './contestdashboard/EntryUpload';
import EntryPublish from './contestdashboard/EntryPublish';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../utils';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../constants/etc';
import { EntryMarkModal } from './judgedashboard/EntryMarkModal';

const ContestantDashboard = (props) => {
  const [revision, setRevision] = React.useState(true); 
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState('detail');
  const [entryId, setEntryId] = React.useState(-1);
  const [draft, setDraft] = React.useState(true);
  const [evisible, setEvisible] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [entryList, setEntryList] = React.useState(null);
  const [averageSum, setAverageSum] = React.useState(null);
  const [entryMarksNum, setEntryMarksNum] = React.useState(0);
  const { data: entry, mutate } = useSWR(`${API.CONTEST_ENTRY_LIST_API}/${props.auth.id}/${props.data.id}`, fetcher);
  const { data: nbJudge } = useSWR(`${API.CONTEST_MEMBER_API}/role/judge`, fetcher);
  React.useEffect(() => {
    if(entry) {
      setEntryList(entry.data);
      if(entry.data.length-1 > props.data.nbRevision){
        setRevision(false);
      }
    }
  },[entry]);
  React.useEffect(() => {
    if(entryList) {
      let average = [], s = 0;
      entryList.map((m) => {
        let sum = 0;
        m.entryMarks.map((a) => {
          sum += a.averageMark;
        })
        sum = sum/m.entryMarks.length;
        average = [...average, sum];
        if(m.entryMarks.length > 0) s++;
      })
      setAverageSum(average);
      setEntryMarksNum(s);
    }
  },[entryList])
  React.useEffect(() => {
    const v = entryList && entryList.filter((entryitem) => entryitem.id === entryId)[0];
    if(v) {
      if(v.stepOne && v.stepSec) setDisable(false);
      else setDisable(true);
    }
  },[entryId])
  const handleChangeEntry = (idx, isDraft = true) => {
    if(!isDraft) {
      setDraft(isDraft);
      setEvisible(!evisible);
    } else {
      if(idx < 0 ) setCurrent('detail');
      setVisible(true);
      setDraft(isDraft);
    }
    setEntryId(idx);
  }
  const handleStep = (str, entryid=null) => {
    if(str === 'end'){
      fetch(`${API.CONTEST_ENTRY_LIST_API}/${entryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({isDraft: false})
      }).then(res => {
      })
      setCurrent('detail');
      setVisible(false);
    } else if(str === 'publish') {
      fetch(`${API.CONTEST_ENTRY_LIST_API}/${entryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({stepSec: true})
      }).then(res => {
      })
    }
    setCurrent(str);
    setEntryId(entryid);
    mutate();
  }
  const handleClick = e => {
    setCurrent(e.key);
  };
  const toggoleModal = () => {
    setEvisible(!evisible);
  }
  return (
    <React.Fragment>
      <div>
        <Card
          className="mb-5 contest-member-dashboard"
          bordered={false}
          title={
            <div>
              <p className="fw-6">CONTESTANT DASHBOARD</p>
              <Row className="mb-4">
                <Col lg={18} md={24} sm={24}>
                  <span>This area is created to help you view all the contests and contestants at one place. Track the activity of the contestants, see new entries, and give your marks.</ span>
                </Col>
                <Col lg={6} md={24} sm={24} className="text-center">
                  <Button block shape="round" type="hbs-primary" size="large" onClick={() => props.pageKeyChange('contestants')}>LEADERBOARD</Button>
                </Col>
              </Row>
              <Row>
                <div className="mr-3">
                  <span className="fs-6 fw-6 mr-1">{entryList && entryList.length}</span>
                  Revisions
                </div>
                <div>
                  <span className="fs-6 fw-6 mr-1">{entryMarksNum}</span>
                  Rating Given
                </div>
              </Row>
            </div>
          }
        >
          {
            entryList && entryList.map((entry, index) =>
              <Row align="middle" onClick={() => handleChangeEntry(entry.id, entry.isDraft)} style={{cursor:'pointer'}}>
                <Col lg={4}>
                  <Image preview={false} width={150} height={100} src={entry.fileList.length>0 ? entry.fileList[0].url : DEFAULT_COMMUNITY_TOPIC_IMAGE } />
                </Col>
                <Col lg={20}>
                  <Row>
                    <Col lg={12}>
                      <p>{`Revision ${index+1}`}</p>
                      <p>{entry.description}</p>
                    </Col>
                    <Col lg={4}>
                    {
                      entry.isDraft && <Badge style={{backgroundColor:secondaryBgColor, color:primaryColor}} count="Draft" />
                    }
                    </Col>
                    <Col lg={4}>
                      <p className="text-center">{`Ratings Given`}</p>
                      <p className="text-center"><b>{`${entry.entryMarks.length}/${nbJudge && nbJudge.data.length}`}</b></p>
                    </Col>
                    <Col lg={4}>
                      <p className="text-center">{`Average`}</p>
                      <p className="text-center"><b>{
                        entry.entryMarks.length && averageSum ? averageSum[index] : '-'
                      }</b></p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }
          <div className="text-center">
            {revision ? <Button shape="round" type="hbs-primary" size="large" onClick={() => handleChangeEntry(-1)}>ADD REVISION</Button> : ''}
          </div>
        </Card>
        {
          draft ? 
            <Modal
              centered
              footer={null}
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1000}
              bodyStyle={{
                padding: '0',
                minHeight: '530px'
              }}
              title= {
                <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
                  <Menu.Item key="detail" style={{width: '32%', textAlign: 'center'}}>
                    <div className="d-flex fjc-center">
                      <Image preview={false} width={50} height={50} src={current === 'detail' ? `/images/contest/define-icon-active.png` : `/images/contest/define-icon.png`} />
                    </div>
                    <span>DESCRIBE YOUR ENTRY</span>
                  </Menu.Item>
                  <Menu.Item key="upload" style={{width: '32%', textAlign: 'center'}}>
                    <div className="d-flex fjc-center">
                      <Image preview={false} width={50} height={50} src={current === 'upload' ? `/images/contest/upload-icon-active.png` : `/images/contest/upload-icon.png`} />
                    </div>
                    Upload
                  </Menu.Item>
                  <Menu.Item key="publish" style={{width: '33.33%', textAlign: 'center'}}>
                    <div className="d-flex fjc-center">
                      <Image preview={false} width={50} height={50} src={current === 'publish' ? `/images/contest/publish-icon-active.png` : `/images/contest/publish-icon.png`} />
                    </div>
                    Publish
                  </Menu.Item>
                </Menu>
              }
            >
              {
                current === 'detail' ?
                  <EntryDetail handleStep={handleStep} entryList={entryList} entryId={entryId} {...props} /> :
                    current === 'upload' ?
                      <EntryUpload handleStep={handleStep} entryList={entryList} entryId={entryId} {...props} /> : <EntryPublish disable={disable} handleStep={handleStep} />
              }
            </Modal> : 
            <EntryMarkModal toggoleShow={toggoleModal} visible={evisible} entryList={entryList} entryId={entryId} {...props} />
        }
      </div>
    </React.Fragment>
  )
}

export default ContestantDashboard;