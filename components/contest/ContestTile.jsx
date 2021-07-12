import React from 'react';
import Link from 'next/link';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

export const ContestTile = ({ ...props }) => {
  return <Link href={`contests/${props.slug}`}>
    <a className="contest-tile">
      <div className="contest-tile-img" style={{ backgroundImage: `url(${props.image})` }}></div>
      <div className="contest-tile-content">
        <h1 className="fw-6">{props.title}</h1>
        <p className="fc-black">{props.date}</p>
        <div className="green-text">
          <label>{props.contestants}&nbsp;&nbsp;CONTESTANTS</label>
          <label className="pl-4">{props.judges}&nbsp;&nbsp;JUDGES</label>
        </div>
        <div className="gray-text">
          <label><EyeOutlined />&nbsp;&nbsp;{props.view}</label>
          <label className="px-4"><HeartOutlined />&nbsp;&nbsp;{props.like}</label>
          <label><ShareAltOutlined />&nbsp;&nbsp;{props.share}</label>
        </div>
      </div>
    </a>
  </Link>;
};