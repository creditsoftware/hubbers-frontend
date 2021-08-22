import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

export const SingupProgress = ({ current, percent }) => {
  return <Steps current={current} percent={percent}>
    <Step title="Basic Information" />
    <Step title="Community" />
    <Step title="Profile" />
  </Steps>;
};