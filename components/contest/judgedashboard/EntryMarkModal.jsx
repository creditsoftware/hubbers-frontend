import React from 'react';
import { Col, Row, Image, Button, Card, Modal } from 'antd';
import { Swiper, SwiperSlide, Pagination } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { primaryColor } from '../../../constants';
import Avatar from 'antd/lib/avatar/avatar';
import { Marks } from '../Marks';

export const EntryMarkModal = (props) => {
  const [entryList, setEntryList] = React.useState(null);
  const [mark, setMark] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [member, setMember] = React.useState();
  React.useEffect(() => {
    if(props.entryList) {
      let v = props.entryList.filter((item) => item.id === props.entryId)[0];
      if(v) {
        let m = v.entryMarks.filter((item) => item.entryId === props.entryId && item.userId === props.auth.id)[0];
        if(m) setStatus(true);
      }
      setEntryList(v);
    }
  },[props])
  React.useEffect(() => {
    if(entryList) {
      let m = props.data.contestMembers.filter((item) => item.userId === props.auth.id)[0];
      setMember(m)
    }
  },[entryList])
  return (
    <React.Fragment>
      <Modal
        centered
        footer={null}
        visible={props.visible}
        onOk={props.toggoleShow}
        onCancel={props.toggoleShow}
        width={1000}
        bodyStyle={{
          padding: '0px',
          minHeight: '600px'
        }}
      >
        <Row>
          <Col lg={15} md={12} sm={24} sm={24}>
            <Swiper
              modules={[Scrollbar, Pagination]}
              spaceBetween={5}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {
                entryList && entryList.fileList && entryList.fileList.map((item, index) =>
                <SwiperSlide style={{width: "100%", margin: '0px!important'}}>
                  <div className="text-center p-rel">
                    <Image preview={false} src={item.url} style={{width: '100%', minHeight: '600px'}} />
                    <div className="p-abs fw-6 b-0 w-100 p-3" style={{ backgroundColor: 'rgba(51,51,51,0.75)',color: 'white', borderTop: '1px solid #bbb', justifyContent: 'space-around', boxSizing: 'border-box' }}>
                      <Row justify="space-between" align="middle">
                        <span className="fs-2">{item.name}</span>
                        <Button href={item.url} download shape="round" type="hbs-primary">DOWNLOAD</Button>
                      </Row>
                    </div>
                  </div>
                </SwiperSlide>
                )
              }
            </Swiper>
          </Col>
          <Col lg={9} md={12} sm={24} sm={24}>
          <Card
            className="contest-member-dashboard"
            bordered={false}
            title={
              !mark &&
              <Row align="middle">
                <Col lg={8} md={12} sm={24} xs={24}>
                  <Avatar 
                    size={80}
                    style={{border: `3px solid ${primaryColor}`}}
                    shape="circle"
                    src={entryList && entryList.user.avatar}
                  />
                </Col>
                <Col lg={16} md={12} sm={24} xs={24}>
                  <p className="mb-0 fw-6 fs-2">{entryList && `${entryList.user.firstname} ${entryList.user.lastname}`}</p>
                  { props.totalRating && <p className="mb-0 fs-1">{`Average Rating: ${props.totalRating}`}</p> }
                  { props.myRating && <p className="mb-0 fs-1">{`My Rating: ${props.myRating}`}</p> }
                  
                </Col>
              </Row>
            }
            bodyStyle={{
              padding: '12px 24px'
            }}
          >
            {
              mark ? <Marks entryList={entryList} userId={props.auth.id} toggoleShow={props.toggoleShow} /> :
              <div>
                <div style={{minHeight: '435px', overflow: 'auto'}}>
                  <div>
                    <label className="fw-6">DESCRIPTION</label>
                    <p>{entryList && entryList.description}</p>
                  </div>
                  <div>
                    <label className="fw-6">DESIGN</label>
                    <p>{entryList && entryList.design}</p>
                  </div>
                  <div>
                    <label className="fw-6">FUNCTIONALITY</label>
                    <p>{entryList && entryList.functionality}</p>
                  </div>
                  <div>
                    <label className="fw-6">MANUFACTURABILITY</label>
                    <p>{entryList && entryList.manuFacturability}</p>
                  </div>
                  <div>
                    <label className="fw-6">MARKET POTENTIAL</label>
                    <p>{entryList && entryList.marketPotential}</p>
                  </div>
                </div>
                {/* <div>
                  <Button type="hbs-primary" shape="round" block onClick={() => setMark(!mark)}>Start Mark</Button>
                </div> */}
                {
                  member && member.role === 'judge' && !status && <div>
                  <Button type="hbs-primary" shape="round" block onClick={() => setMark(!mark)}>Start Mark</Button>
                </div>
                }
              </div>
            }
          </Card>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  )
}