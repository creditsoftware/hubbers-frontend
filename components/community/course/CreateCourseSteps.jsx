import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

export const CreateCourseSteps = ({ current }) => {
  return <Steps progressDot current={current}>
    <Step title="Basic" description="" />
    <Step title="Structure" description="" />
    <Step title="Instructors" description="" />
    <Step title="Done" description="" />
  </Steps>;
};