import React from 'react';
import Link from 'next/link';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import moment from 'moment';
import { API } from '../../constants';
import { Col, Image, Row } from 'antd';

export const ContestTile = ({ ...props }) => {
  const [member, setMember] = React.useState('');
  React.useEffect(() => {
    if (props && props.contestMembers) {
      let m = props.contestMembers.filter((i) => i.userId === props.auth.id)[0];
      if (m) {
        if (m.role === 'contestant') {
          setMember('contestant');
        } else if (m.role === 'judge') {
          setMember('judge');
        } else {
          setMember('');
        }
      }
    }
  }, [props]);
  const addView = () => {
    fetch(`${API.ADD_CONTEST_VIEW_API}/${props.auth.id}/${props.slug}`, {
      method: 'PUT'
    });
  };
  return <Link href={`contests/${props.slug}`}>
    <a onClick={addView}>
      <div className="contest-tile">
        <div className="contest-tile-img" style={{ backgroundImage: `url(${props.featuredImageUrl})` }}></div>
        <div className="contest-tile-content">
          <h1 className="fw-6">{props.name}</h1>
          {
            moment(props.createdAt).isBefore(moment()) && moment(props.startTime).isAfter(moment()) ?
              <p className="fc-black">Pushed {moment().diff(moment(props.createdAt), 'days')} days ago.</p> :
              moment(props.startTime).isBefore(moment()) && moment(props.endTime).isAfter(moment()) ?
                <p className="fc-black">Started {moment().diff(moment(props.startTime), 'days')} days ago.</p> : <p className="fc-black">Ended {moment().diff(moment(props.endTime), 'days')} days ago.</p>
          }
          <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
              <div className="green-text">
                <label>{props.nbContestant}&nbsp;&nbsp;CONTESTANTS</label>
                <label className="pl-4">{props.nbJudge}&nbsp;&nbsp;JUDGES</label>
              </div>
              <div className="gray-text">
                <label><EyeOutlined />&nbsp;&nbsp;{props.view.length}</label>
                <label className="px-4"><HeartOutlined />&nbsp;&nbsp;{props.like.length}</label>
                <label><ShareAltOutlined />&nbsp;&nbsp;0</label>
              </div>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24} className="text-right">
              {
                member === 'contestant' ?
                  <Image preview={false} src="/images/contest/contest-participating.png" width={50} /> :
                  member === 'judge' ? <Image preview={false} src="/images/contest/contest-judging.png" width={50} /> : ''
              }
            </Col>
          </Row>
        </div>
      </div>
    </a>
  </Link>;
};