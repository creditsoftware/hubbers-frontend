import React from 'react';
import { Container } from '../Container';
import { Testimonial } from './Testimonial';
const testimonials = [
  {
    name: 'Frank Peng Ren',
    role: 'Chief Advisor, DMS Consulting',
    imageUrl: 'https://hubbers-files-storage.s3.amazonaws.com/frank.png',
    content: 'I joined Hubbers as the Shanghai Community Leader because I find the opportunities to build and nurture my business network invaluable. I want to connect with creative people and leverage the latest trends and ideas towards my manufacturing partners in lifestyle and housewares products.',
    linkedinUrl: ''
  },
  {
    name: 'Hans Uitdenhouwen',
    role: 'Managing Director at Reality',
    imageUrl: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/BJrzd35o4.jpg',
    content: 'Through the help of the Hubbers team, I was able to connect with the right investor for my project, and I secured funding for OCHO, a media-sharing platform for professional photographers.',
    linkedinUrl: 'https://www.linkedin.com/company/reality-china'
  }
];
export const MembershipBanner10 = () => {
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 fs-5">
          Testimonials
        </h1>
        {
          testimonials.map(testimonial => <Testimonial key={testimonial.name} {...testimonial} />)
        }
      </React.Fragment>
    </Container>
  );
};
