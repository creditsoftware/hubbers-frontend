import React from 'react';
import { Radio, Tooltip } from 'antd';
import {useWindowSize} from '../hooks';
import { primaryColor } from '../constants/color';
import Link from 'next/link';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export const ChooseYourLaunchSelector = () => {
  const size = useWindowSize();
  return <RadioGroup defaultValue="a" className='choose-your-launch-selector'>
    <Tooltip title='Already clear about it. Start worked about it.' color={primaryColor}>
      <RadioButton value="a">
        <div className="status"></div>
        <div className="text">
          <h2 className="fs-3 fw-5">
            You are a business or self-employed.
          </h2>
          {
            size.width > 767 &&
            <h3 className="fs-1 fw-6">
              Already clear about it. Start worked about it.
            </h3>
          }
        </div>
      </RadioButton>
    </Tooltip>
    <Tooltip title='You have a great product idea but needed fundings and mentoring.' color={primaryColor}>
      <RadioButton value="b">
        <div className="status"></div>
        <div className="text">
          <h2 className="fs-3 fw-5">
            Hubbers Accelerator.
          </h2>
          {
            size.width > 767 &&
            <React.Fragment>
              <h3 className="fs-1 fw-6">
                You have a great product idea but needed fundings and mentoring.
              </h3>
              <Link href='#'>
                <a className='primary-link'>
                  Apply to our community accelerator. Know more about it.
                </a>
              </Link>
            </React.Fragment>
          }
        </div>
      </RadioButton>
    </Tooltip>
  </RadioGroup>;
};