import React from 'react';
import { Row, Button, Card, Col } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import useSWR from 'swr';
import { API, primaryColor } from '../../constants';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import { EntryMarkModal } from './judgedashboard/EntryMarkModal';

const JudgeDashboard = (props) => {
  const [entryList, setEntryList] = React.useState(null);
  const [entryId, setEntryId] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [myRating, setMyRating] = React.useState();
  const [totalRating, setTotalRating] = React.useState();
  const { data: entry } = useSWR(`${API.CONTEST_ENTRY_LIST_API}/${props.data.id}`);
  React.useEffect(() => {
    if(entry) setEntryList(entry.data);
  },[entry])
  const toggoleModal = (idx = null) => {
    console.log(idx)
    let r, t, sum=0;
    r = props.data.entryMarks.filter((i) => i.entryId === idx && i.userId === props.auth.id)[0];
    t = props.data.entryMarks.filter((i) => i.entryId === idx);
    t.map((i) => {
      sum += i.averageMark;
    })
    sum = sum/t.length;
    if(r){
      setTotalRating(sum);
      setMyRating(r.averageMark);
    }
    setEntryId(idx);
    setVisible(!visible);
  }
  return(
    <React.Fragment>
      <div>
        <Card
          className="mb-5 contest-member-dashboard"
          bordered={false}
          title={
            <div>
              <p className="fw-6">JUDGE DASHBOARD</p>
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
                  <span className="fs-6 fw-6 mr-1">{props.data.entry.length - props.data.entryMarks.length}</span>
                  Unmarked Entries
                </div>
                <div>
                  <span className="fs-6 fw-6 mr-1">{props.data.entry.length}</span>
                  Total Entries
                </div>
              </Row>
            </div>
          }
        >
          <Swiper
            modules={[Scrollbar]}
            spaceBetween={5}
            slidesPerView={5}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {
              entryList && entryList.map((item, index) =>
              <SwiperSlide style={{width: "20%"}}>
                <div className="text-center">
                  <Avatar
                    size={150}
                    style={{border: `4px solid ${primaryColor}`, cursor: 'pointer'}}
                    shape="circle"
                    src={item.user.avatar}
                    onClick={() => toggoleModal(item.id)}
                  />
                  <p className="fs-1 mt-2"><b>{item.user.firstname} {item.user.lastname}</b></p>
                  <p className="fs-1 mt-2"><b>{moment().diff(moment(item.createdAt),'days') ? `${moment().diff(moment(item.createdAt),'days')} days` : `${moment().diff(moment(item.createdAt),'hours')} hours`}</b></p> 
                </div>
              </SwiperSlide>
              )
            }
          </Swiper>
          <EntryMarkModal toggoleShow={toggoleModal} visible={visible} entryList={entryList} entryId={entryId} totalRating={totalRating} myRating={myRating} {...props}/>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default JudgeDashboard;