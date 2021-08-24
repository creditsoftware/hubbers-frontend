import React from 'react';
import { Row, Col, Menu, Dropdown, Button } from 'antd';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { API, primaryColor } from '../../constants';
import { fetchJson } from '../../utils';
export const GeneralDetails = props => {
  const [like, setLike] = React.useState('');
  const [contest, setContest] = React.useState(null);
  React.useEffect(() => {
    setContest(props.data);
  },[props.data])
  React.useEffect(() => {
    if(contest) {
      let likeItem = -1, like = contest.like;
      like.map((item, index) => {
        if(item === props.auth.id) likeItem = index;
      })
      likeItem >= 0 ? setLike(primaryColor) : setLike('');
    }
  },[contest])
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
    fetchJson(`${API.CONTEST_API}/like/${props.auth.id}`,{
      method: 'PUT'
    }).then(res => {
      if(res.success === true) {
        setContest(res.result);
      }
    });
  }
  return (
    <React.Fragment>
      <Row style={{ color: 'gray', padding: '0 24px', backgroundColor: 'rgb(255 252 247)' }}>
        <Col lg={12} xs={24}>
          <Row>
            <Col span={8} className="py-3">
              <Dropdown overlay={product} arrow>
                <div className="d-flex f-align-center" style={{ cursor: 'pointer' }}>
                  <Image width={24} height={24} src="/images/icons/product.png" />&nbsp;&nbsp;PRODUCT
                </div>
              </Dropdown>
            </Col>
            <Col span={8} className="pt-3">
              <Dropdown overlay={innovation} arrow>
                <div className="d-flex f-align-center" style={{ cursor: 'pointer' }}>
                  <Image width={18} height={24} src="/images/icons/innovation.png" />&nbsp;&nbsp;INNOVATION
                </div>
              </Dropdown>
            </Col>
            <Col span={8} className="pt-3">
              <Dropdown overlay={geography} arrow>
                <div className="d-flex f-align-center" style={{ cursor: 'pointer' }}>
                  <Image width={24} height={24} src="/images/icons/geography.png" />{props.isGlobal ? <span>&nbsp;&nbsp;GEOGRAPHY</span> : <span>&nbsp;&nbsp;GLOBAL</span>}
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
            <label className="px-4" onClick={handleLike} style={{color: [like]}}><HeartOutlined />&nbsp;&nbsp;{contest && contest.like.length}</label>
            <label><ShareAltOutlined />&nbsp;&nbsp;{0}</label>
          </div>
        </Col>
        <Col lg={12} xs={24} style={{ backgroundColor: '#333', textAlign: 'center', position: 'relative' }}>
          <h1 className="pt-5 fc-white">PRIZES</h1>
          <Row className="px-4 pt-3">
            {
              contest && contest.prize.map((item, index) => 
                <Col span={8}>
                  <Image width={60} height={82} src={`/images/prize${item.standing}.png`} />
                  <p style={{ color: 'gray' }}>{item.name}</p>
                  <h1 className="fc-white">{item.prize} USD</h1>
                  <p className="fc-white" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </Col>
              )
            }
          </Row>
          <div className="p-abs l-0 b-0 w-100 d-flex py-3" style={{ borderTop: '1px solid #bbb', justifyContent: 'space-around' }}>
            <Button type="hbs-primary" size="large" shape="round">BECOME A CONTESTANT</Button>
            <Button type="hbs-primary" size="large" shape="round">BECOME A JUDGE</Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};