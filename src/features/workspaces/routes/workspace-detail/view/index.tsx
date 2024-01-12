import { ProjectOutlined } from '@ant-design/icons';
import { App as AntdApp, Avatar, List, Tabs } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useLoaderData, useRevalidator } from 'react-router-dom';

import { IProfile } from '@/features/profile/types';
import { ISimplifiedProject } from '@/features/projects/types';
import { InviteWorkspaceModal } from '@/features/workspaces/components/Modal/InviteWorkspaceModal';
import { axios } from '@/libs/axios';
import { formatDate } from '@/utils/format';

import { LoaderData } from '../interfaces';

interface IAvatar {
  [key: string]: string;
}

export const WorkspaceDetailPage = () => {
  const { workspace, projects } = useLoaderData() as LoaderData;
  const revalidator = useRevalidator();
  const { notification } = AntdApp.useApp();
  const [avatars, setAvatars] = useState<IAvatar>({});

  useEffect(() => {
    for (const member of [...workspace.members, ...workspace.invitations]) {
      if (avatars[member.id]) {
        continue;
      }

      axios
        .get(`/web-apigw/personal/api/PersonalData/avatar/${member.id}`, {
          responseType: 'arraybuffer'
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: response.headers['content-type'] });

          avatars[member.id] = URL.createObjectURL(blob);
          setAvatars({
            ...avatars
          });
        });
    }
  }, []);

  const tabItems = [
    {
      label: `Members (${workspace.members.length})`,
      key: 'members',
      children: (
        <List
          className={clsx('mx-1')}
          itemLayout="horizontal"
          dataSource={workspace.members}
          renderItem={(item: IProfile, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large" src={avatars[item.id]} />}
                title={`${item.firstName} ${item.lastName}`}
                description={item.email}
              />
            </List.Item>
          )}
        />
      )
    },
    {
      label: `Pending invitations (${workspace.invitations.length})`,
      key: 'invitations',
      children: (
        <>
          <InviteWorkspaceModal
            workspaceId={workspace.id}
            onRefreshList={() => {
              revalidator.revalidate();
            }}
          />
          {workspace.invitations.length > 0 ? (
            <List
              className={clsx('mx-1')}
              itemLayout="horizontal"
              dataSource={workspace.invitations}
              renderItem={(item: IProfile, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size="large" src={avatars[item.id]} />}
                    title={`${item.firstName} ${item.lastName}`}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          ) : (
            <div className={clsx('h-full bg-white p-10 text-center')}>
              <p className={clsx('mb-5 text-2xl font-bold')}>No Pending Invitation</p>
              <p className={clsx('text-base')}>
                You don't have any invitation in this section yet.
              </p>
            </div>
          )}
        </>
      )
    },
    {
      label: `Projects (${projects.length})`,
      key: 'projects',
      children:
        projects.length > 0 ? (
          <List
            className={clsx('mx-1')}
            itemLayout="horizontal"
            dataSource={projects}
            renderItem={(item: ISimplifiedProject, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size="large" icon={<ProjectOutlined />} />}
                  title={<Link to={`/app/projects/detail/${item.id}`}>{item.name}</Link>}
                  description={`Created on ${formatDate(item.createdOn)}`}
                />
              </List.Item>
            )}
          />
        ) : (
          <div className={clsx('h-full bg-white p-10 text-center')}>
            <p className={clsx('mb-5 text-2xl font-bold')}>No Projects</p>
            <p className={clsx('text-base')}>You don't have any projects in this section yet.</p>
          </div>
        )
    }
  ];

  return (
    <div className={clsx('flex h-full flex-col p-5')}>
      <h1 className={clsx('my-5 px-2 text-2xl font-bold')}>
        <Link className={clsx('mr-2 text-gray-400 hover:text-black')} to={'/app/workspaces'}>
          Your Workspaces |
        </Link>
        {workspace.name}
      </h1>
      <Tabs
        className={clsx('my-3 h-full')}
        defaultActiveKey="members"
        type="card"
        size="large"
        items={tabItems}
      />
    </div>
  );
};
