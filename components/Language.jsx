import React from 'react';
import { useRouter } from 'next/router';
import { Menu, Dropdown, Button, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
export const Language = () => {
  const router = useRouter();
  const languageList = [
    {
      shortName:'en',
      fullName:'English'
    },
    {
      shortName:'fr',
      fullName:'Français'
    },
    {
      shortName:'es',
      fullName:'Español'
    }
  ];
  const menu = (
    <Menu>
      {
        languageList.map((languageItem, index) => {
          return (
            <Menu.Item key={index}>
              <Link href={router.pathname} locale={languageItem.shortName} >
                <Space align='start'>
                  <Image
                    src={`/images/lang-flags/${languageItem.shortName}_64.png`}
                    width={20}
                    height={20}
                  />
                  {languageItem.fullName}
                </Space>
              </Link>
            </Menu.Item>
          );
        })
      }
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <Button shape="round" className="lang-btn">
          <Space align='end'>
            <Image
              src={`/images/lang-flags/${router.locale}_64.png`}
              width={20}
              height={20}
            />
            {languageList.filter((item)=>item.shortName === router.locale)[0].fullName}
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};
