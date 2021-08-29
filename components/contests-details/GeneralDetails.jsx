import React from 'react';
import { Row, Col, Menu, Dropdown, Button, Modal, Space } from 'antd';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { API, primaryColor } from '../../constants';
import { fetchJson } from '../../utils';

export const GeneralDetails = props => {
  const [like, setLike] = React.useState('');
  const [contest, setContest] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  React.useEffect(() => {
    setContest(props.data);
  }, [props.data]);
  React.useEffect(() => {
    if (contest) {
      let likeItem = -1, like = contest.like;
      like.map((item, index) => {
        if (item === props.auth.id) likeItem = index;
      });
      likeItem >= 0 ? setLike(primaryColor) : setLike('');
    }
  }, [contest, props.auth.id]);
  const product = (
    <Menu>
      {
        contest && contest.products.map((item, index) => {
          return <Menu.Item key={index}>{item.name}</Menu.Item>;
        })
      }
    </Menu>
  );
  const innovation = (
    <Menu>
      {
        contest && contest.innovations.map((item, index) => {
          return <Menu.Item key={index}>{item.name}</Menu.Item>;
        })
      }
    </Menu>
  );
  const geography = (
    <Menu>
      {
        contest && contest.country.map((item, index) => {
          return <Menu.Item key={index}>{item.name}</Menu.Item>;
        })
      }
    </Menu>
  );
  const handleLike = () => {
    fetchJson(`${API.CONTEST_API}/like/${props.data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: props.auth.id })
    }).then(res => {
      if (res.success === true) {
        setContest(res.result);
      }
    });
  };
  const showModal = (role) => {
    setIsModalVisible(true);
    setRole(role);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    fetchJson(`${API.CONTEST_MEMBER_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: props.auth.id,
        contestId: contest.id,
        role
      })
    }).then(res => {
      if (res.status === 200) {
        setContest(res.data);
      }
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <Row style={{ color: 'gray', padding: '0 24px', backgroundColor: 'rgb(255 252 247)' }}>
        <Col lg={12} xs={24}>
          <Row>
            <Col span={8} className="py-3">
              <Dropdown overlay={product} arrow>
                <div className="d-flex f-align-center" style={{ cursor: 'pointer' }}>
                  <Image width={24} height={24} alt='' src="/images/icons/product.png" />&nbsp;&nbsp;PRODUCT
                </div>
              </Dropdown>
            </Col>
            <Col span={8} className="pt-3">
              <Dropdown overlay={innovation} arrow>
                <div className="d-flex f-align-center" style={{ cursor: 'pointer' }}>
                  <Image width={18} height={24} alt='' src="/images/icons/innovation.png" />&nbsp;&nbsp;INNOVATION
                </div>
              </Dropdown>
            </Col>
            <Col span={8} className="pt-3">
              <Dropdown overlay={geography} arrow>
                <div className="d-flex f-align-center" style={{ cursor: 'pointer' }}>
                  <Image width={24} height={24} alt='' src="/images/icons/geography.png" />{props.isGlobal ? <span>&nbsp;&nbsp;GEOGRAPHY</span> : <span>&nbsp;&nbsp;GLOBAL</span>}
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Col>
        <Col lg={12} xs={24} className="d-flex fjc-end">
          <p className="pt-3 mb-0">CONTESTANTS&nbsp;&nbsp;<label style={{ color: '#75ac2a', fontWeight: 'bold' }}>{contest && contest.nbContestant}</label></p>
          <p className="pt-3 pl-4 mb-0">JUDGES&nbsp;&nbsp;<label style={{ color: '#75ac2a', fontWeight: 'bold' }}>{contest && contest.nbJudge}</label></p>
        </Col>
      </Row>
      <Row style={{ paddingBottom: '20px' }}>
        <Col
          lg={12}
          xs={24}
          style={{
            position: 'relative',
            backgroundColor: '#333',
            backgroundImage: `url(${contest && contest.featuredImageUrl})`,
            width: '100%',
            height: '25rem',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="p-abs l-0 b-0 w-100 p-4 fc-white contest-detail-gray" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
            <label><EyeOutlined />&nbsp;&nbsp;{contest && contest.view.length}</label>
            <label className="px-4" onClick={handleLike} style={{ color: [like] }}><HeartOutlined />&nbsp;&nbsp;{contest && contest.like.length}</label>
            <label><ShareAltOutlined />&nbsp;&nbsp;{0}</label>
          </div>
        </Col>
        <Col lg={12} xs={24} style={{ backgroundColor: '#333', textAlign: 'center', position: 'relative' }}>
          <h1 className="pt-5 fc-white">PRIZES</h1>
          <Row className="px-4 pt-3">
            {
              contest && contest.prize.map((item) =>
                <Col span={8} key={item.standing}>
                  <Image width={60} height={82} src={`/images/prize${item.standing}.png`} />
                  <p style={{ color: 'gray' }}>{item.name.toUpperCase()}</p>
                  <h1 className="fc-white">{item.prize} USD</h1>
                  <p className="fc-white" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </Col>
              )
            }
          </Row>
          {
            !props.contestStatus
              ?
              <div className="p-abs l-0 b-0 w-100 d-flex py-3" style={{ borderTop: '1px solid #bbb', justifyContent: 'space-around' }}>
                <Button type="hbs-primary" size="large" shape="round" onClick={() => showModal('contestant')}>BECOME A CONTESTANT</Button>
                <Button type="hbs-primary" size="large" shape="round" onClick={() => showModal('judge')}>BECOME A JUDGE</Button>
                <Modal
                  title={props.role === 'contestant' ? 'CONTESTANT USER’S DISCLAIMER OF USE:' : 'AWARDS JUDGE USER’S DISCLAIMER OF USE:'}
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={700}
                  footer={
                    <React.Fragment>
                      <Button onClick={handleOk} style={{ backgroundColor: primaryColor }}>
                        I Agree
                      </Button>
                      <Button onClick={handleCancel}>
                        Deline
                      </Button>
                    </React.Fragment>
                  }
                >
                  <p>
                    You are submitting an entry to a product innovation contest. By doing so you might be allowed to use https://hubbers.io website as a “Contestant”. By clicking “I agree”, you agree to be unconditionally bound to Hubbers’s Innovation Contest Policy , Hubbers Terms of use and Hubbers Privacy Policy .
                  </p>
                  <p>
                    By clicking “I agree”, you agree to be unconditionally bound to Hubbers’s Innovation <Link href="#"><a style={{ color: `${primaryColor}` }}>Contest Policy</a></Link> , Hubbers <Link href="#"><a style={{ color: `${primaryColor}` }}>Terms of use</a></Link> and Hubbers <Link href="#"><a style={{ color: `${primaryColor}` }}>Privacy Policy</a></Link>.
                  </p>
                  <p>
                    In particular, by clicking “I agree” you agree that :
                  </p>
                  <ul>
                    <li>
                      The contest is subject to hubbers&apos; Terms of Use. If you do not agree with the terms in any way, please do not use hubbers&apos;s website.
                    </li>
                    <li>
                      You have carefully read the Contest Rules and the <Link href="#"><a style={{ color: `${primaryColor}` }}>Tips for contestants</a></Link>.
                    </li>
                    <li>
                      You might be granting, waiving or releasing important legal rights (as per above documents). In particular, you are aware that prizes are granted to the winners on the condition that he/she agrees and signs a licence agreement with Hubbers to develop, produce and sell the proposed product. Please read Article 3 of Hubbers Contest policy.
                    </li>
                    <li>
                      Your entry does not infringe any intellectual property rights, or any pre-existing licensing or commercial rights. Please read Article 9 of Hubbers Contest policy.
                    </li>
                  </ul>
                </Modal>
              </div>
              :
              props.contestStatus === 1
                ?
                <div className="p-abs fw-6 l-0 b-0 w-100 p-3" style={{ backgroundColor: primaryColor, color: 'white', borderTop: '1px solid #bbb', justifyContent: 'space-around' }}>
                  <Space>
                    <Image width={20} height={20} src="/images/icons/clock_icon.png" />
                    <span>{props.role === 'contestant' ?
                      <span>YOUR APPLICATION FOR CONTESTANT BEING PROCESSED.</span> :
                      <span>YOUR APPLICATION FOR JUDGE BEING PROCESSED.</span>
                    }
                    </span>
                  </Space>
                  <div>It will take maximum 23 hours</div>
                </div>
                :
                <div className="p-abs fw-6 l-0 b-0 w-100 p-3" style={{ backgroundColor: 'rgb(51 51 51)', color: primaryColor, justifyContent: 'space-around' }}>
                  <p className="fs-4 mb-1">
                    <Image width={30} height={30} src={props.role === 'contestant' ? '/images/contestant-accepted-icon.png' : '/images/judge-accepted-icon.png'} />{props.role === 'contestant' ? 'CONTESTANT' : 'JUDGE'}</p>
                  <div>You&apos;re a Contestant on this contest</div>
                </div>
          }
        </Col>
      </Row>
      <div
        className=" mb-3 w-100 p-3 fs-1"
        dangerouslySetInnerHTML={{ __html: contest.description }}
        style={{
          backgroundColor: 'white',
          boxShadow: '3px 3px 8px rgba(0,0,0,0.2)'
        }}
      ></div>
    </React.Fragment>
  );
};