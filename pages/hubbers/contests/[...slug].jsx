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
import moment from 'moment';
import ContestantDashboard from '../../../components/contest/CotestantDashboard';
import JudgeDashboard from '../../../components/contest/JudgeDashboard';

const ContestsDetail = ({ ...props }) => {
  // const router = useRouter();
  const [pageKey, setPageKey] = React.useState('general');
  const [contest, setContest] = React.useState(null);
  const [role, setRole] = React.useState('');
  const [contestStatus, setContestStatus] = React.useState(0);
  const pageKeyChange = (key) => {
    setPageKey(key);
  };
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: product } = useSWR(`${API.CONTEST_API}/slug/${props.query.slug[0]}`);
  React.useEffect(() => {
    if (product && product.result) {
      setContest(product);
    }
  }, [product]);
  React.useEffect(() => {
    if (contest) {
      contest.result.contestMembers.map((v) => {
        if (v.userId === props.auth.id) {
          if (v.isActive === true) setContestStatus(2);
          else setContestStatus(1);
          setRole(v.role);
        }
      });
    }
  }, [contest]);
  return (
    <MainPageHoc title='Hubers events' auth={{ ...data }} query={{ ...props.query }}>
      {
        contest && contest.result &&
        <Container className="contests-detail pt-4">
          <React.Fragment>
            <div className="details-header">
              <h1 className="fs-5 fw-6">{contest.result.name}</h1>
              <p style={{ color: 'gray' }}>
                {
                  moment(contest.result.createdAt).isBefore(moment()) && moment(contest.result.startTime).isAfter(moment()) ?
                    <p className="fc-black">Pushed {moment().diff(moment(contest.result.createdAt), 'days')} days ago.</p> :
                    moment(contest.result.startTime).isBefore(moment()) && moment(contest.result.endTime).isAfter(moment()) ?
                      <p className="fc-black">Started {moment().diff(moment(contest.result.startTime), 'days')} days ago.</p> : <p className="fc-black">Ended {moment().diff(moment(props.endTime), 'days')} days ago.</p>
                }
              </p>
              <div className="details-time">
                <div>
                  <Image width={24} height={24} src="/images/icons/start-time.png" />
                  <label>&nbsp;&nbsp;Start Time:&nbsp;&nbsp;</label>
                  <label style={{ color: 'gray' }}>{moment(contest.result.startTime).format('MMMM, Do HH:mm a')}</label>
                </div>
                <div className="ml-4">
                  <Image width={24} height={24} src="/images/icons/end-time.png" />
                  <label>&nbsp;&nbsp;Finish Time:&nbsp;&nbsp;</label>
                  <label style={{ color: 'gray' }}>{moment(contest.result.endTime).format('MMMM, Do HH:mm a')}</label>
                </div>
              </div>
            </div>
            <div className="details-nav">
              <div
                className={pageKey == 'general' ? 'nav-item nav-active' : 'nav-item'}
                onClick={() => { pageKeyChange('general'); }}
              >
                GENERAL
              </div>
              <div
                className={pageKey == 'criteria' ? 'nav-item nav-active' : 'nav-item'}
                onClick={() => { pageKeyChange('criteria'); }}
              >
                CRITERIA
              </div>
              <div
                className={pageKey == 'contestants' ? 'nav-item nav-active' : 'nav-item'}
                onClick={() => { pageKeyChange('contestants'); }}
              >
                CONTESTANTS
              </div>
              <div
                className={pageKey == 'award-judges' ? 'nav-item nav-active' : 'nav-item'}
                onClick={() => { pageKeyChange('award-judges'); }}
              >
                AWARD JUDGES
              </div>
              <div
                className={pageKey == 'contest-rules' ? 'nav-item nav-active' : 'nav-item'}
                onClick={() => { pageKeyChange('contest-rules'); }}
              >
                CONTEST RULES
              </div>
            </div>
            <div className="details-content">
              {pageKey == 'general' ? <GeneralDetails pageKeyChange={pageKeyChange} role={role} contestStatus={contestStatus} data={contest.result} {...props} /> : null}
              {pageKey == 'criteria' ? <CriteriaDetails data={contest.result} /> : null}
              {pageKey == 'contestants' ? <ContestantsDetails data={contest.result} {...props} /> : null}
              {pageKey == 'award-judges' ? <AwardJudgesDetails data={contest.result} {...props} /> : null}
              {pageKey == 'contest-rules' ? <ContestRulesDetails data={contest.result} /> : null}
              {
                role === 'contestant' && contestStatus && contestStatus === 2 && <ContestantDashboard data={contest.result} {...props} />
              }
              {
                role === 'judge' && contestStatus && contestStatus === 2 && <JudgeDashboard data={contest.result} {...props} />
              }
            </div>
          </React.Fragment>
        </Container>
      }
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default ContestsDetail;