import { InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Image, List, Row, Typography } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { axios } from '@/libs/axios';
import { formatDate } from '@/utils/format';

import { AvatarUpload } from '../../../components';
import { LoaderData } from '../interfaces';

export const MePage = () => {
  const { myProfile } = useLoaderData() as LoaderData;

  const profileData: Array<{ title: string; value: string }> = [
    {
      title: 'First Name',
      value: myProfile.firstName
    },
    {
      title: 'Last Name',
      value: myProfile.lastName
    },
    {
      title: 'Email',
      value: myProfile.email
    },
    {
      title: 'Joined Date',
      value: formatDate(myProfile.createdOn)
    },
    {
      title: 'Last Modified',
      value: myProfile.lastModifiedOn ? formatDate(myProfile.lastModifiedOn) : 'N/A'
    }
  ];

  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    axios
      .get('/web-apigw/personal/api/PersonalData/avatar', {
        responseType: 'arraybuffer'
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        setAvatar(URL.createObjectURL(blob));
      });
  }, [myProfile]);

  return (
    <div className="m-10">
      <div className={clsx('mb-2')}>
        <h1 className={clsx('text-2xl font-bold')}>
          <Link className={clsx('mr-2 text-gray-400 hover:text-black')} to={'/app'}>
            Home |
          </Link>
          My Profile
        </h1>
      </div>
      <Divider />
      <Row>
        <Col span={6} className={clsx('px-5')}>
          <Image className={clsx('mb-5')} placeholder={true} src={avatar} />
          <AvatarUpload />
        </Col>
        <Col span={1}>
          <Divider type="vertical" className={clsx('h-full')} />
        </Col>
        <Col span={17} className={clsx('p-5')}>
          <List
            itemLayout="horizontal"
            dataSource={profileData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Typography.Title level={4}>{item.title}</Typography.Title>}
                  description={<Typography.Text>{item.value}</Typography.Text>}
                  avatar={
                    <Avatar
                      icon={<InfoCircleOutlined />}
                      className={clsx('bg-gray-500 align-text-bottom')}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
