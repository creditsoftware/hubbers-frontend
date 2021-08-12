import React from 'react';
import { Container } from '../Container';
import { Testimonial } from './Testimonial';
import { API } from '../../constants/index';
import { fetchJson } from '../../utils';

export const Testimonials = () => {

  const [testimonials, setTestimonials] = React.useState(null);
  React.useEffect(() => {
    fetchJson(`${API.GET_TESTIMONIALS_API}`).then((response) => {
      setTestimonials(response.data);
    });
  }, []);
  
  return (
    <Container className={testimonials?.length && 'py-4'}>
      <React.Fragment>
        {
          testimonials?.length ? <h1 className="fw-6 fs-5">Testimonials</h1> : null
        }
        {
          testimonials?.map(testimonial => <Testimonial key={testimonial.id} {...testimonial} />)
        }
      </React.Fragment>
    </Container>
  );
};
