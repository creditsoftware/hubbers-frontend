import React from 'react';
import { MainPageHoc } from '../../../containers';
import { Container, GeneralDetails, CriteriaDetails, ContestantsDetails, AwardJudgesDetails, ContestRulesDetails } from '../../../components';
// import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import Image from 'next/image';
import { jwtDecode } from '../../../utils/jwt';
const ContestsDetail = ({ ...props }) => {
  // const router = useRouter();
  const [pageKey, setPageKey] = React.useState('general');
  const pageKeyChange = (key) => {
    setPageKey(key);
  };
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const product = {
    image: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/6V1GLLP2-.png',
    title: 'Scooter Delivery Case',
    date: 'Ended 92 days ago',
    view: 181,
    like: 3,
    share: 0,
    slug: 'asdfasd-asdf-asdf',
    startTime: 'July, 8th 03:21 pm',
    finishTime: 'August, 17th 03:21 pm',
    product: ['Clothing and aparel', 'Fitness', 'Household'],
    innovation: ['Low cost', 'Article'],
    geography: ['item1', 'item2'],
    criteria: [{
      title: 'CRITERIA TITLE 1',
      description: 'criteria description'
    },{
      title: 'CRITERIA TITLE 2',
      description : 'asdf ad fasd fasd fasdf asdf asdf'
    }],
    contestants: [{
      id: '1',
      avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJH6dR7r4.jpeg',
      firstname: 'Benjamin',
      lastname: 'Vignon',
      rank: '',
      design: '',
      functionality: '',
      usability: '',
      marketPotential: '',
      average: ''
    }],
    judges: [{
      avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJH6dR7r4.jpeg',
      name: 'Benjamin Vignon'
    }],
    rules: 'asfddfaf'
  };
  return (
    <MainPageHoc title='Hubers events' auth={{ ...data }}>
      <Container className="contests-detail pt-4">
        <React.Fragment>
          <div className="details-header">
            <h1 className="fs-5 fw-6">{product.title}</h1>
            <p style={{ color: 'gray' }}>{product.date}</p>
            <div className="details-time">
              <div>
                <Image width={24} height={24} src="/images/icons/start-time.png" />
                <label>&nbsp;&nbsp;Start Time:&nbsp;&nbsp;</label>
                <label style={{ color: 'gray' }}>{product.startTime}</label>
              </div>
              <div className="ml-4">
                <Image width={24} height={24} src="/images/icons/end-time.png" />
                <label>&nbsp;&nbsp;Finish Time:&nbsp;&nbsp;</label>
                <label style={{ color: 'gray' }}>{product.finishTime}</label>
              </div>
            </div>
          </div>
          <div className="details-nav">
            <div
              className={pageKey == 'general' ? 'nav-item nav-active' : 'nav-item'}
              onClick={()=>{pageKeyChange('general');}}
            >
              GENERAL
            </div>
            <div
              className={pageKey == 'criteria' ? 'nav-item nav-active' : 'nav-item'}
              onClick={()=>{pageKeyChange('criteria');}}
            >
              CRITERIA
            </div>
            <div
              className={pageKey == 'contestants' ? 'nav-item nav-active' : 'nav-item'}
              onClick={()=>{pageKeyChange('contestants');}}
            >
              CONTESTANTS
            </div>
            <div
              className={pageKey == 'award-judges' ? 'nav-item nav-active' : 'nav-item'}
              onClick={()=>{pageKeyChange('award-judges');}}
            >
              AWARD JUDGES
            </div>
            <div
              className={pageKey == 'contest-rules' ? 'nav-item nav-active' : 'nav-item'}
              onClick={()=>{pageKeyChange('contest-rules');}}
            >
              CONTEST RULES
            </div>
          </div>
          <div className="details-content">
            { pageKey == 'general' ? <GeneralDetails data={product} /> : null }
            { pageKey == 'criteria' ? <CriteriaDetails data={product} /> : null }
            { pageKey == 'contestants' ? <ContestantsDetails data={product} /> : null }
            { pageKey == 'award-judges' ? <AwardJudgesDetails data={product} /> : null }
            { pageKey == 'contest-rules' ? <ContestRulesDetails data={product} /> : null }
          </div>
        </React.Fragment>
      </Container>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default ContestsDetail;