import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../../utils/withSession';
import { jwtDecode } from '../../../../utils/jwt';
import { fetcher } from '../../../../utils/fetcher';
import { Container, ProductDetailHeader, ProductDetails, ProductBusiness } from '../../../../components';
import { API } from '../../../../constants';
import { useProductData } from '../../../../hooks/useSWR/product/useProductData';

const Details = ({ ...props }) => {

  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: productData } = useProductData(router.query.slug);
  const [currentPage, setCurrentPage] = React.useState('details');

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <DeskPageHoc title='Product Details' activeSide={{ active: ['my-product'], open: ['my-product'] }} auth={{ ...data }} query={{ ...props.query }}>
      <Container>
        <React.Fragment>
          <ProductDetailHeader current={currentPage} changePage={onChangePage} data={productData?.data} />
          {
            currentPage === 'details' ? <ProductDetails />
            : currentPage === 'business' ? <ProductBusiness />
            : null
          }
        </React.Fragment>
      </Container>
    </DeskPageHoc>
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

export default Details;